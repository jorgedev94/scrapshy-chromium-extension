import { Component, Inject, signal } from '@angular/core'
import { TAB_ID } from 'src/app/app.config'
import { Scrapshy } from '../../services/scrap.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'pages-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, MatMenuModule, MatListModule, MatCardModule,MatExpansionModule,MatIconModule, FormsModule,MatTabsModule],
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [Scrapshy]
})
export class HomeComponent {


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
            "company": '',
            "sub_id" : [],
            "aplicantes": []
        }
    }
  
    scrapper = signal('');
    isSecondPanelOpen = false; // Estado del Panel 2
    isThirdPanelOpen = false;
    isDisabled = signal(true);
    filas_content: any[] = []
    rows: number = 0
    tabs: number = 5;

    constructor(
        @Inject(TAB_ID) readonly tabId: number,
        private sc: Scrapshy
    ) {}

    closeExtension(){
        window.close()
    }
    

    async onClick() {
        this.isDisabled.set(false)
        
        const object_json = await this.sc.scrap(this.tabId);
        console.log(object_json)

        const countSubarraysWithNoAplica = (array: string[]): number => {
            return array.filter(subarray => subarray.includes('No aplica')).length;
        };    
        const cantidadConNoAplica = countSubarraysWithNoAplica(object_json.miembros);
        const family = object_json.miembros.length-cantidadConNoAplica        

        const changeImage = (company: string): void => {
            const image = document.getElementById('dynamicImage') as HTMLImageElement;        
            if (image) {
                const lowerCaseCompany = company.toLowerCase();
        
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

        this.tabs = object_json.efectividad.length
        this.filas_content = object_json.miembros
        this.rows = object_json.rows
        return this.policy, this.rows
    }

    clean(){
    this.policy = {
        "contacts": [
            {
                "firstname" : "",
                "lastname" : "",
                "dob" : "",
                "ssn" : "",
                "type": ""        
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
            "address" : "",
            "city" : "",
            "state": "",
            "zipcode" : ""
        },
        "email" : "",
        "phone" : "",
        "income" : "",
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
            "company": '',
            "sub_id" : [],
            "aplicantes" : []
        }
    }
    this.isSecondPanelOpen = false;
    this.isThirdPanelOpen = false;
    this.isDisabled.set(true)

    return this.policy
    }

    get filasLimitadas() {
        return this.filas_content.slice(0, this.rows);
    }    
}