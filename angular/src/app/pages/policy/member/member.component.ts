import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { Member } from "src/app/models/member.model";

@Component({
    selector: "policy-member",
    templateUrl: "member.component.html",
    imports: [CommonModule],
    standalone: true
})
export class MemberInfoComponent {
    columns = [
        { key: 'id', label: 'ID' },
        { key: 'firstname', label: 'Firstname' },
        { key: 'lastname', label: 'Lastname' },
        { key: 'dob', label: 'DOB' },
        { key: 'ssn', label: 'SSN' },
        { key: 'email', label: 'Email' },
        { key: 'income', label: 'Income' },
        { key: 'phone', label: 'Phone' }
    ];

    members = input<Array<Member>>()
}