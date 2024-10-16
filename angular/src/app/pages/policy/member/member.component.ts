import { CommonModule } from "@angular/common";
import { Component, computed, input, signal } from "@angular/core";
import { Member } from "src/app/models/member.model";

@Component({
    selector: "policy-member",
    templateUrl: "member.component.html",
    imports: [CommonModule],
    standalone: true
})
export class MemberInfoComponent {
    members = input<Array<Member>>()
    columns = computed(() => 
        Object.keys(this.members()[0]).map((key) => (
            {
                key: key as keyof Member,
                label: key
            }
        ))
    )
}