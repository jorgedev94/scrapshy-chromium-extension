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
        console.log(result);
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

    scrapPolicy(document): Policy {
        const ffm_id = this.get_owner(document)
        
        const address = new Address()
        const owner_member = new Member(1, ffm_id[0], "Devia", "dantedevenir@outlook.com", "545-54-4554", "1994-03-29", "54789", "7863124654")
        const owner = new Owner(address, ...Object.values(owner_member))
        const plans = [new Plan()]
        const members = [new Member()]
        return new Policy(owner, plans, members)
    }


        /* const changeImage = (company: string[]): void => {
        const image = document.getElementById('dynamicImage') as HTMLImageElement;        
        if (image) {
            const lowerCaseCompany = company[0].toLowerCase();
    
            if (lowerCaseCompany === 'aetna') {
                image.src = 'assets/aetna.png';
            } else if (lowerCaseCompany === 'oscar') {
                image.src = 'assets/oscar.png'; 
            } else if (lowerCaseCompany === 'ambetter') {
                image.src = 'assets/Ambetter.png'; z
            } else if (lowerCaseCompany === 'molina') {
                image.src = 'assets/molina.png'; 
            } else if (lowerCaseCompany === 'ambetter') {
                image.src = 'assets/Ambetter.png'; 
            } else if (lowerCaseCompany === 'blue') {
                image.src = 'assets/bc bs.png'; 
            } else if (lowerCaseCompany === 'florida') {
                image.src = 'assets/florida blue.png'; 
            }
        }
    };
    
    changeImage(object_json.company);   */

    
    /* scrap(tabId): Promise<ScrapData | null> {
        return new Promise((resolve) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabId },
                        func: () => {
                            // Definimos ambas funciones en el mismo contexto
                            function getSpanTexts(texts: string[]) {
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

                            function initial() {
                                const texts = ['Miembros', 'Members'];
                                const texts2 = ['Vigente', 'Effective'];
                                const texts3 = ['Vencimiento', 'Expiration'];
                                const texts4 = ['ID de subscritor', 'Subscriber ID'];
                                const texts5 = ['Nro. de identificación de la póliza', 'Policy ID'];
                                const texts6 = ['ID de FFM', 'FFM ID'];
                                const texts7 = ['Email']
                                const texts8 = ['Phone']
                                const texts9 = ['Address']
                                const texts10 = ['Estado', 'Status']

                                const aplicantes = getSpanTexts(texts);
                                const efectividad = getSpanTexts(texts2);
                                const terminacion = getSpanTexts(texts3);
                                const subscriber_id = getSpanTexts(texts4);
                                const policy_id = getSpanTexts(texts5);
                                const ffm_id = getSpanTexts(texts6);
                                const owner_name = document.querySelector('.css-1ahwws6').textContent.trim()
                                const table_depends = document.querySelectorAll('.table-module__greyHeader___wgjY5 tbody tr')
                                const table_subsidio = document.querySelectorAll('#aca-app-app-history table tbody tr')     

                                const deducibles = document.querySelectorAll('.layouts-module__my15___zruiT span div .row div .typography-module__avenir20___P6Onc span');
                                const deducible = Array.from(deducibles).map(el => el.textContent.trim());

                                const max_desembolsos = document.querySelectorAll('.layouts-module__my15___zruiT span div .row div:nth-child(3) .typography-module__avenir20___P6Onc');
                                const max_desem = Array.from(max_desembolsos).map(el => el.textContent.trim());

                                const plan_names = document.querySelectorAll('.layouts-module__my15___zruiT span div .box-module__header___ZQaCf div .layouts-module__pb0____S1ng span')
                                const plan_name = Array.from(plan_names).map(el => el.textContent.trim());

                                const email = getSpanTexts(texts7)
                                const phone = getSpanTexts(texts8)
                                const address = getSpanTexts(texts9)
                                const status = getSpanTexts(texts10)   
                                
                                const primas = document.querySelectorAll('.layouts-module__my15___zruiT span div .row div .typography-module__avenir20___P6Onc strong');
                                const prima = Array.from(primas).map(el => el.textContent.trim());

                                const companys = document.querySelectorAll('.layouts-module__my15___zruiT span div .box-module__header___ZQaCf div div div .issuer-logo')
                                const altTexts = [];
                                
                                companys.forEach(img => {
                                    const altText = img.getAttribute('alt');
                                    altTexts.push(altText);
                                });

                                const company = altTexts.map(item => item.split(' ')[0])
                                
                                let data = {                                    
                                    aplicantes: aplicantes,
                                    efectividad: efectividad,
                                    terminacion: terminacion,
                                    subscriber_id: subscriber_id,
                                    policy_id: policy_id,
                                    ffm_id: ffm_id,
                                    owner: owner_name,         
                                    email: email, // Añadir si es necesario
                                    phone: phone,
                                    firstname: '',
                                    lastname: '',
                                    middlename: '',
                                    owner_ssn: '',
                                    owner_dob: '',
                                    address: address,
                                    status: status,
                                    broker: '',
                                    prima : prima,
                                    deducible: deducible,
                                    max_desem: max_desem,
                                    subsidio: '',
                                    plan_name: plan_name,
                                    miembros: [],
                                    rows: 0,
                                    company: company,
                                };

                                if (data) {
                                    const addressArray = data.address[0].split(',').map((name) => name.trim());                                    
                                    const nombreCompleto = data.owner.split(' ');
                                    const cantidadnombres = nombreCompleto.length;
                                    data.firstname = nombreCompleto[0]
                                    
                                    if(cantidadnombres>0 && cantidadnombres<2 && nombreCompleto[1].length<2 || cantidadnombres>3){
                                        const secondname = nombreCompleto[1]
                                        data.middlename = secondname
                                        if(cantidadnombres>2){
                                            const apellido = (nombreCompleto[2]+' '+nombreCompleto[3])
                                            data.lastname = apellido
                                        }else{
                                            const apellido = nombreCompleto[2]
                                            data.lastname = apellido
                                        }
                                    }else if(cantidadnombres>0 && cantidadnombres<=2){
                                        const apellido = nombreCompleto[1]
                                        data.lastname = apellido
                                    }else{
                                        const apellido = (nombreCompleto[1]+' '+nombreCompleto[2])
                                        data.lastname = apellido
                                    }

                                    table_depends.forEach((fila) => {
                                        const celdas = fila.querySelectorAll('td');                                                                            
                                        // Verifica si hay celdas y si la primera celda contiene el nombre buscado
                                        if (celdas.length > 0 && celdas[0].textContent.trim() === data.owner) {
                                            // Supongamos que el SSN está en la segunda celda (índice 1)
                                            const ssn = celdas[4].textContent.trim();
                                            const dob = celdas[3].textContent.trim();
                                            data.owner_ssn = ssn
                                            data.owner_dob = dob
                                        }
                                    });

                                    table_subsidio.forEach((fila) => {
                                        const celdas = fila.querySelectorAll('td')

                                        if(celdas){
                                            const subsidio = celdas[2].textContent.trim()
                                            data.subsidio = subsidio                                            
                                        }
                                    })

                                    const tabla = document.querySelector('.table-module__greyHeader___wgjY5');
                                    const filas = tabla.querySelectorAll('tbody tr');

                                    const datos = [];

                                    filas.forEach(fila => {
                                        const celdas = fila.querySelectorAll('td');
                                        const valores = Array.from(celdas).map(celda => celda.textContent.trim());
                                        datos.push(valores);
                                        data.miembros = datos;
                                        data.rows = datos.length
                                    });

                                    data.owner = nombreCompleto[0]
                                    data.address = addressArray;
                                }
                                return data;
                            }

                            return initial(); // Llamamos a initial y devolvemos el resultado
                        },
                    },
                    (results) => {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                            resolve(null); // Resuelve con null si hay un error
                        } else {
                            const spanText = results[0].result;
                            //console.log('Este es el resultado:' + JSON.stringify(spanText));
                            resolve(spanText); // Resuelve con el resultado                            
                        }
                    },
                )
            })
    } */
}
