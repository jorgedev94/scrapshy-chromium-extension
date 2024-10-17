import { Member } from "./member.model";
import { Owner } from "./owner.model";
import { Plan } from "./plan.model";

export class Policy {
    constructor(
        public owner: Owner = new Owner(),
        public plans: Array<Plan> = [new Plan()],
        public members: Array<Member> = [new Member()]
    ) {}
}