import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { MatTabsModule } from "@angular/material/tabs";
import { Plan } from "src/app/models/plan.model";

@Component({
    selector: "policy-plan",
    templateUrl: "plan.component.html",
    imports: [CommonModule, MatTabsModule, MatListModule],
    standalone: true
})
export class PlanInfoComponent {
    plans = input<Array<Plan>>([new Plan()])
}