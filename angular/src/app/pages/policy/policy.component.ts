import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterOutlet } from "@angular/router";
import { OwnerInfoComponent } from "./owner/owner.component";
import { PolicyService } from "src/app/services/policy.service";
import { MemberInfoComponent } from "./member/member.component";
import { PlanInfoComponent } from "./plan/plan.component";
import { Panel } from "src/app/pages/policy/models/panel.model";
import { Policy } from "src/app/models/policy.model";

@Component({
		selector: "page-policy",
		templateUrl: "policy.component.html",
		styleUrl: "policy.component.scss",
		imports: [CommonModule, MatTabsModule, MatExpansionModule, RouterOutlet, OwnerInfoComponent],
		standalone: true
})
export class PolicyComponent {
	
	get policy(): Policy {
			return this.ps.policySignal()
	}

	get isDisabled(): boolean {
		return this.ps.isDisabledSignal()
	}

	errors = signal("")

	constructor(
		private ps: PolicyService
	) {}
	
	createPanels = () => Panel.fromJSON([
		{
			id: 1,
			title: "Owner's information",
			component: OwnerInfoComponent,
			data: {
				owner: this.policy.owner,
			},
		},
		{
			id: 2,
			title: "Member's information",
			component: MemberInfoComponent,
			data: {
				members: this.policy.members,
			},
		},
		{
			id: 3,
			title: "Plan's information",
			component: PlanInfoComponent,
			data: {
				plans: this.policy.plans,
			},
		},
	]);
  
	panels = computed<Array<Panel>>(this.createPanels);

}