import { Owner } from "./owner.model";
import { Plan } from "./plan.models";

export interface Policy {
    owner: Owner;
    plan: Plan;
    lastname: string;
    email: string;
    ssn: string;
    dob: string;
    income: string;
    phone: string;
}