import { Address } from "./address.model";
import { Member } from "./member.model";

export class Owner extends Member {
    constructor(
        public address: Address = new Address(),
        public email: string = "juan.perez@example.com",
        public income: string = "50000",
        public phone:string = "555-1234",
        ...memberArgs: ConstructorParameters<typeof Member>
    ) {
        super(...memberArgs);
    }
}
  