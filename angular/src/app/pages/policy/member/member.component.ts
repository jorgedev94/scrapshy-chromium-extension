import { CommonModule } from "@angular/common";
import { Component, computed, input, OnInit } from "@angular/core";
import { Member } from "src/app/models/member.model";

@Component({
    selector: "policy-member",
    templateUrl: "member.component.html",
    imports: [CommonModule],
    standalone: true
})
export class MemberInfoComponent implements OnInit {
    members = input<Array<Member>>()
    capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    columns = computed(() => 
        Object.keys(this.members()[0]).map((key) => (
            {
                key: key as keyof Member,
                label: this.capitalizeFirstLetter(key)
            }
        ))
    )
    ngOnInit() {
        console.log(this.columns())
    }
}