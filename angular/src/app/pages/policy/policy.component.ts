import { CommonModule } from "@angular/common";
import { Component, Inject, signal } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from "@angular/router";
import { OwnerInfoComponent } from "./owner/owner.component";
import { TAB_ID } from "src/app/app.config";
import { Scrapshy } from "src/app/services/scrap.service";
import { MemberInfoComponent } from "./member/member.component";
import { PlanInfoComponent } from "./plan/plan.component";

@Component({
    selector: "page-policy",
    templateUrl: "policy.component.html",
    styleUrl: "policy.component.scss",
    imports: [CommonModule, MatTabsModule, MatExpansionModule, RouterOutlet, OwnerInfoComponent],
    standalone: true
})
export class PolicyComponent {
    constructor(
        @Inject(TAB_ID) readonly tabId: number,
        private sc: Scrapshy
    ) {}
    isDisabled = signal(true);
    policy = {
        "contacts": [
            {
                "firstname" : "Jorge",
                "lastname" : "Devia",
                "dob" : "03/29/1994",
                "ssn" : "000-54-5451",
                "type": "owner"        
            },
            {
                "firstname" : "Santiago",
                "lastname" : "Moncada",
                "dob" : "01/01/2000",
                "ssn" : "547-58-4654",
                "type": "spouse"        
            },
            {
                "firstname" : "Karol",
                "lastname" : "G",
                "dob" : "01/01/2004",
                "ssn" : "245-54-5945",
                "type": "dependent_1"        
            }
        ],
        "address" : {
        "address" : "Avenida Siempre Viva",
        "city" : "Miami",
        "state": "FL",
        "zipcode" : "33054"
        },
        "email" : "jorged94@mabecenter.org",
        "phone" : "7865412356",
        "income" : "15000",
        "plan_info": {
            "plan_name" : [],
            "efectividad" : [],
            "terminacion": [],
            "plan_id" : '',
            "max_desem" : [],
            "family" : '',
            "prima" : [],
            "subsidio" : '',
            "deducible" : [],
            "mp_id" : '',
            "broker" : '',
            "company": [],
            "sub_id" : [],
            "aplicantes": []
        }
    }
  
    scrapper = signal('');
    isSecondPanelOpen = false; // Estado del Panel 2
    isThirdPanelOpen = false;
    filas_content: any[] = []
    rows: number = 0
    tabs: number = 5;
    listaApli: number
    cont: number = 0

    panels = [
        {
            id: 1,
            title: "Owner's information",
            component: OwnerInfoComponent,
            data: {
                owner: {
                    id: 1,
                    firstname: "Jorge",
                    lastname: "Devia",
                    email: "juan.perez@example.com",
                    ssn: "123-45-6789",
                    dob: "1990-01-01",
                    income: "50000",
                    address: {
                        address: "Calle Falsa 123",
                        city: "Ciudad",
                        state: "Estado",
                        zipcode: "12345"
                    },
                    phone: "555-1234"
                }
            }
        },
        {
            id: 2,
            title: "Member's information",
            component: MemberInfoComponent,
            data: {
                members: [
                    {
                        id: 1,
                        firstname: "Pepito",
                        lastname: "Perez",
                        email: "test@test.com",
                        ssn: "546-55-5445",
                        dob: "03/29/1994",
                        income: "10000",
                        phone: "786-546-5464"
                    },
                    {
                        id: 2,
                        firstname: "Maria",
                        lastname: "Socorro",
                        email: "test@test.com",
                        ssn: "546-55-5445",
                        dob: "03/29/1994",
                        income: "10000",
                        phone: "786-546-5464"
                    }
                ]
            }
        },
        {
            id: 3,
            title: "Plan's information",
            component: PlanInfoComponent
        }
    ]

    async onClick() {
        this.isDisabled.set(false)
        
        const object_json = await this.sc.scrap(this.tabId);
        console.log(object_json)

        const countSubarraysWithNoAplica = (array: string[]): number => {
            return array.filter(subarray => subarray.includes('No aplica')).length;
        };    
        const cantidadConNoAplica = countSubarraysWithNoAplica(object_json.miembros);
        const family = object_json.miembros.length-cantidadConNoAplica

        const changeImage = (company: string[]): void => {
            const image = document.getElementById('dynamicImage') as HTMLImageElement;        
            if (image) {
                const lowerCaseCompany = company[0].toLowerCase();
        
                if (lowerCaseCompany === 'aetna') {
                    image.src = 'assets/aetna.png';
                } else if (lowerCaseCompany === 'oscar') {
                    image.src = 'assets/oscar.png'; 
                } else if (lowerCaseCompany === 'ambetter') {
                    image.src = 'assets/Ambetter.png'; 
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
        
        changeImage(object_json.company);    

        this.policy = {
            "contacts": [
                {
                    "firstname" : (object_json.firstname+' '+object_json.middlename) || object_json.firstname,
                    "lastname" : object_json.lastname,
                    "dob" : object_json.owner_dob,
                    "ssn" : object_json.owner_ssn,
                    "type": "owner"        
                },
                {
                    "firstname" : "Santiago",
                    "lastname" : "Moncada",
                    "dob" : "01/01/2000",
                    "ssn" : "547-58-4654",
                    "type": "spouse"        
                },
                {
                    "firstname" : "Karol",
                    "lastname" : "G",
                    "dob" : "01/01/2004",
                    "ssn" : "245-54-5945",
                    "type": "dependent_1"
                }
            ],
            "address" : {
                "address" : object_json.address[0],
                "city" : object_json.address[1],
                "state": object_json.address[2],
                "zipcode" : object_json.address[3]
            },
            "email" : object_json.email[0],
            "phone" : object_json.phone[0],
            "income" : "15000",
            "plan_info": {
                "plan_name" : object_json.plan_name,
                "efectividad" : object_json.efectividad,
                "terminacion": object_json.terminacion,
                "plan_id" : '',
                "max_desem" : object_json.max_desem,
                "family" : (object_json.miembros.length)+'x'+(family),
                "prima" : object_json.prima,
                "subsidio" : object_json.subsidio,
                "deducible" : object_json.deducible,
                "mp_id" : object_json.ffm_id[0],
                "broker" : object_json.broker[0],
                "company": object_json.company,
                "sub_id": object_json.subscriber_id,
                "aplicantes" : object_json.aplicantes
            }            
        }

        this.listaApli = object_json.aplicantes.length
        
        this.tabs = object_json.efectividad.length
        this.filas_content = object_json.miembros
        this.rows = object_json.rows
        return this.policy, this.rows
    }

    

    get filasLimitadas() {
        return this.filas_content.slice(0, this.rows);
    }
}