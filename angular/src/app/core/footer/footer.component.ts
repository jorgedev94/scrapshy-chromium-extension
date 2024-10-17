import { Component } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";

@Component({
	selector: 'core-footer',
	standalone: true,
	templateUrl: 'footer.component.html',
    imports: [MatMenuModule]
})
export class FooterComponent {
    onClick() {
        
    }
    clean() {
        /* this.policy = {
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
                "company": [],
                "sub_id" : [],
                "aplicantes" : []
            }
        }
        this.isSecondPanelOpen = false;
        this.isThirdPanelOpen = false;
        this.isDisabled.set(true)
    
        return this.policy */
    }
}