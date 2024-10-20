import { MemberInfoComponent } from "../member/member.component";
import { OwnerInfoComponent } from "../owner/owner.component";
import { PlanInfoComponent } from "../plan/plan.component";
import { Policy } from "../../../models/policy.model";
import { Owner } from "../../../models/owner.model";
import { Member } from "../../../models/member.model";
import { Plan } from "../../../models/plan.model";

export class Panel {
    constructor(
        public id: number = 0,
        public title: string = '',
        public component: 
            typeof OwnerInfoComponent | 
            typeof MemberInfoComponent | 
            typeof PlanInfoComponent | 
            undefined = undefined,
        public data: { 
            [key: string]: Policy | Owner | Array<Member> | Array<Plan>
        } = {},
    ) {}

    static fromJSON(json: any): Panel[] {
        const jsonArray = Array.isArray(json) ? json : [json];

        return jsonArray.map((item) => new Panel(
            item.id,
            item.title,
            item.component,
            item.data
        ));
    }
}