import { CommonModule } from "@angular/common";
import { Component, computed, OnInit, signal } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from "@angular/router";
import { OwnerInfoComponent } from "./owner/owner.component";
import { Scrapshy } from "src/app/services/scrap.service";
import { MemberInfoComponent } from "./member/member.component";
import { PlanInfoComponent } from "./plan/plan.component";
import { Plan } from "src/app/models/plan.model";
import { Panel } from "src/app/pages/policy/models/panel.model";

@Component({
    selector: "page-policy",
    templateUrl: "policy.component.html",
    styleUrl: "policy.component.scss",
    imports: [CommonModule, MatTabsModule, MatExpansionModule, RouterOutlet, OwnerInfoComponent],
    standalone: true
})
export class PolicyComponent implements OnInit {
    policy = this.sc.policySignal
    errors = signal("")
    isDisabled = signal(true);
    panels = computed(() => [
        {
          id: 1,
          title: "Owner's information",
          component: OwnerInfoComponent,
          data: {
            owner: this.policy().owner,
          },
        },
        {
          id: 2,
          title: "Member's information",
          component: MemberInfoComponent,
          data: {
            members: this.policy().members,
          },
        },
        {
          id: 3,
          title: "Plan's information",
          component: PlanInfoComponent,
          data: {
            plans: this.policy().plans,
          },
        },
    ]);
    
    constructor(
        private sc: Scrapshy
    ) {

    }

    ngOnInit(): void {
        
    }
    
    async onClick() {
        this.isDisabled.set(false)

        try {
            const plans_json = [
                {
                    ffm_id: 12345678901,
                    hios_id: "45456FL546544",
                    name: "Silver 5",
                    effective: "01-01-2024",
                    termination: "12-31-2024",
                    premium: "4554.54",
                    deductible: "0",
                    max_payout: "1500",
                    dependents: "Jorge, Andrés",
                },
                {
                    ffm_id: 1234567899,
                    hios_id: "45459FL546544",
                    name: "Silver 6",
                    effective: "01-01-2024",
                    termination: "12-31-2024",
                    premium: "4554.54",
                    deductible: "0",
                    max_payout: "1500",
                    dependents: "Devia, Mosquera",
                }
            ]

            const plansInstances = Plan.fromJSON(plans_json)
            /* this.policy.update(policy => {
                policy.plans = plansInstances
                return policy
            }) */  
        }
        catch (error: any) {
            // Capturar y almacenar el mensaje de error
            this.errors.set(error.message);
        }
    }

    /* async onClick2() {
        this.isDisabled.set(false)
        
        const object_json = await this.sc.scrap(this.tabId);
        console.log(object_json)

        const countSubarraysWithNoAplica = (array: string[]): number => {
            return array.filter(subarray => subarray.includes('No aplica')).length;
        };    
        const cantidadConNoAplica = countSubarraysWithNoAplica(object_json.miembros);
        const family = object_json.miembros.length-cantidadConNoAplica  

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
    } */

}