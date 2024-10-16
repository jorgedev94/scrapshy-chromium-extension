import { Address } from "./address.model";
import { Member } from "./member.model";

export interface Owner extends Member {
    address: Address
}