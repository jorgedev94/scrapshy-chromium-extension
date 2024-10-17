import { Address } from "./address.model";
import { Member } from "./member.model";

export class Owner extends Member {
    constructor(
        public address: Address = new Address(),
        ...memberArgs: ConstructorParameters<typeof Member>
    ) {
        super(...memberArgs);
    }
}
  