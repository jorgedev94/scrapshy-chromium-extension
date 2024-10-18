import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Policy } from '../models/policy.model';
import { TAB_ID } from '../app.config';
import { Owner } from '../models/owner.model';
import { Plan } from '../models/plan.model';
import { Member } from '../models/member.model';
import { Address } from '../models/address.model';

@Injectable({
    providedIn: 'root',
})
export class Scrapshy {
    private _policy = signal(new Policy());

    get policySignal(): WritableSignal<Policy> {
        return this._policy;
    }

    constructor(
        @Inject(TAB_ID) readonly tabId: number,
    ) {}

    async onClick() {
        const document = await this.get_dom()
            .then((domString) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(domString, 'text/html');
                return doc
            })
            .catch((error) => {
                console.error('Error al obtener el DOM:', error);
            });
        console.log(document);
        this._policy.set(this.scrapPolicy(document))
    }

    get_dom(): Promise<string> {
        return new Promise((resolve, reject) => {
            // Capturamos las referencias de resolve y reject
            const resolveRef = resolve;
            const rejectRef = reject;
    
            chrome.scripting.executeScript(
                {
                    target: { tabId: this.tabId },
                    func: () => {
                        return document.documentElement.outerHTML;
                    },
                },
                (injectionResults) => {
                    if (chrome.runtime.lastError) {
                        rejectRef(chrome.runtime.lastError);
                    } else if (injectionResults && injectionResults[0] && injectionResults[0].result) {
                        resolveRef(injectionResults[0].result);
                    } else {
                        rejectRef(new Error('No se obtuvo el DOM.'));
                    }
                }
            );
        });
    }

    getSpanTexts(document, texts: string[]) {
        const textConditions = texts.map((text) => `text()="${text}"`).join(' or ');
        const xpath = `//tr/td[span[${textConditions}]]/following-sibling::td/span`;

        const result = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null,
        );
        
        const values: string[] = [];

        for (let i = 0; i < result.snapshotLength; i++) {
            const span = result.snapshotItem(i) as HTMLElement;
            if (span) {
                values.push(span.textContent || '');
            }
        }

        return values;
    }
    
    get_owner(document) {
        const texts = ['ID de FFM', 'FFM ID']
        return this.getSpanTexts(document ,texts);
    }

    get_application(document, xpath, context = null) {
        // XPath para seleccionar todas las filas excepto la fila de encabezado (usamos tbody/tr para excluir th)
        
        const result = document.evaluate(
            xpath,
            document,
            context,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null,
        );
    
        // Array para almacenar las filas
        const tableData: string[][] = [];
    
        for (let i = 0; i < result.snapshotLength; i++) {
            const row = result.snapshotItem(i) as HTMLElement;
            if (row) {
                // Extraer todas las celdas de esta fila
                const cells = row.querySelectorAll('td');
                const rowData: string[] = [];
    
                // Iterar sobre las celdas y extraer su contenido
                cells.forEach((cell) => {
                    rowData.push(cell.textContent?.trim() || '');
                });
    
                // Agregar esta fila al array de la tabla
                tableData.push(rowData);
            }
        }
    
        console.log(tableData);
    }
    
    get_data_table(document, xpath, context = null, resolver= null, result = null) {
        const resultEval = document.evaluate(xpath, context == null ? document : context, resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, result);
    
        const tableDataHorizontal: string[][] = [];
        const tableDataVertical: string[][] = [];
        
        for (let i = 0; i < resultEval.snapshotLength; i++) {
            const row = resultEval.snapshotItem(i) as HTMLElement;
            const cells = row.querySelectorAll('td');
            const cols = row.querySelectorAll('tr');
            
            let rowData: string[] = [];
            cells.forEach((cell, index) => {
                const content = cell.textContent?.trim() || '';
                if (cells.length / cols.length !== 2) {
                    rowData.push(content);
                    if ((index + 1) % 6 === 0) {
                        tableDataHorizontal.push([...rowData]);
                        rowData = [];
                    }
                } else if ((index + 1) % 2 === 0) {
                    rowData.push(content);
                }
            });
            
            if (rowData.length > 0) {
                tableDataVertical.push(rowData);
            }       
        }
        
        return [tableDataHorizontal, tableDataVertical];
    }   

    extractPlanData(planRow) {
        let planName = planRow.querySelector('span[role="button"]').textContent.trim();
        planName = planName.replace(/\s*\(.*?\)\s*/g, '').trim();
    
        const premiumElement = planRow.querySelectorAll('.col-xs-4')[0];
        const premium = premiumElement.querySelector('strong').textContent.trim();
        
        const premiumWasElement = premiumElement.querySelector('span.effects-module__strikethrough___AxSwd');
        const premiumWas = premiumWasElement ? premiumWasElement.textContent.trim() : '';
    
        const deductibleElement = planRow.querySelectorAll('.col-xs-4')[1];
        const deductible = deductibleElement.querySelector('span').textContent.trim();
    
        const oopMaxElement = planRow.querySelectorAll('.col-xs-4')[2];
        const oopMax = oopMaxElement.querySelector('span').textContent.trim();

        const imageElement = planRow.querySelector('img');
        let imageAlt = imageElement ? imageElement.getAttribute('alt').trim() : '';
        imageAlt = imageAlt.replace(/\s*\(.*?\)\s*/g, '').trim();
    
        return {
            planName: planName,
            premium: premium,
            premiumWas: premiumWas,
            deductible: deductible,
            oopMax: oopMax,
            company: imageAlt
        };
    }

    scrapPlan(document) {
        let plans: Array<Plan> = []
        const planRows = document.querySelectorAll('#aca-app-coverage-details .row');
        planRows.forEach((plan) => {
            const divs = plan.querySelectorAll(':scope > div');
            if (divs.length > 1) {
                const tableExists = divs[1].querySelector('table') !== null;
                if (tableExists) {
                    //const [] = this.get_data_card(document)
                    const plan_details = this.extractPlanData(divs[0])
                    const [_, plan_info] = this.get_data_table(document, './/table', divs[1]);
                    const status = plan_info[0][0]
                    const ffm_id = Number(plan_info[0][6])
                    const hios_id = ""
                    const subscriber_id = plan_info[0][4]
                    const policy_id = plan_info[0][5]
                    const name = plan_details.planName
                    const effective = plan_info[0][1]
                    const termination = plan_info[0][2]
                    const premium = plan_details.premium
                    const deductible = plan_details.deductible
                    const opp_max = plan_details.oopMax
                    const dependents = plan_info[0][3].split(',')
                    const premium_total = plan_details.premiumWas
                    const carrier_phone = plan_info[0][7]
                    const company = plan_details.company
                    let payment_phone = ''
                    let agent_record = ''
                    if (plan_info[0].length > 8) {
                        payment_phone = plan_info[0][8]
                        agent_record = plan_info[0][9]
                    } else {
                        payment_phone = ''
                        agent_record = plan_info[0][8]
                    }
                    
                    plans.push(
                        new Plan(status, ffm_id, hios_id, subscriber_id, policy_id, name, effective, termination, premium, deductible, opp_max, premium_total, dependents, carrier_phone, payment_phone, agent_record, company)
                    )
                }
            }
        })

        return plans
    }
    
    scrapMember(document: Document): [Array<any>, any] {
        const xpath_application = "//div[@data-analytics-area='application-card']//table";
        const [_members, _owner] = this.get_data_table(document, xpath_application);
    
        const processedMembers = _members.map((member) => {
            let updatedMember = [...member];
                const fullName = updatedMember[0];
    
            if (fullName && typeof fullName === 'string') {
                const nameParts = fullName.split(' ');
    
                if (nameParts.length > 1) {
                    updatedMember[0] = nameParts[0]; 
                    updatedMember.splice(1, 0, nameParts.slice(1).join(' ')); 
                }
            }
    
            return updatedMember;
        });
    
        return [processedMembers, _owner];
    }    

    parseAddress(addressString: string): Address {
        const regex = /^(.*?),\s*(.*?),\s*([A-Z]{2}),\s*(\d{5})/;
        const match = addressString.match(regex);
    
        const [ , address, city, state, zipcode ] = match;
        return new Address(address.trim(), city.trim(), state.trim(), zipcode.trim());
    }

    scrapPolicy(document): Policy {
        const [_members, _owner] = this.scrapMember(document)
        let members: Array<Member> = []
        _members.forEach((member)  => {
            members.push(new Member(member[0], member[1], member[2], member[3], member[4], member[5].slice(-4), member[6]))
        })
        
        const address = this.parseAddress(_owner[0][2])
        const owner_member = new Member(members[0].firstname, members[0].lastname, members[0].gender, members[0].tobacco, members[0].dob, members[0].ssn, members[0].eligibility)
        console.log(members[0])
        console.log(owner_member)
        const owner = new Owner(address, _owner[0][0], "", _owner[0][1], ...Object.values(owner_member))
        
        const plans: Array<Plan> = this.scrapPlan(document)
        
        const policy = new Policy(owner, plans, members)
        console.log(policy)
        return policy
    }
}
