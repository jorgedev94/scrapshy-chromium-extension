import { Component, input } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { Owner } from "src/app/models/owner.model"; 

@Component({
    selector: "policy-owner",
    templateUrl: "owner.component.html",
    styleUrls: ['../policy.component.scss'],
    imports: [MatListModule],
    standalone: true
})
export class OwnerInfoComponent {
    owner = input<Owner>(
        {
            firstname: "Juan",
            middlename: "Angel",
            lastname: "Pérez",
            ssn: "123-45-6789",
            dob: "1990-01-01",
            gender: "Male",
            tobacco: "",
            eligibility: "",
            address: {
                address: "Calle Falsa 123",
                city: "Ciudad",
                state: "Estado",
                zipcode: "12345"
            },
            email: "juan.perez@example.com",
            income: "50000",
            phone: "555-1234"
        }
    )
}