import { Owner } from "./owner.model";
import { Plan } from "./plan.models";

export class Policy {
    constructor(
        public owner: Owner = new Owner(),
        public plan: Plan = new Plan(),
    ) {}
}