import { CommonModule } from "@angular/common";
import { Component, computed, OnInit, signal } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from "@angular/router";
import { OwnerInfoComponent } from "./owner/owner.component";
import { PolicyService } from "src/app/services/policy.service";
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
export class PolicyComponent {
    policy = this.ps.policySignal
    errors = signal("")
    isDisabled = signal(true);

    panels = computed<Array<Panel>>(() => [
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
        private ps: PolicyService
    ) {}

}