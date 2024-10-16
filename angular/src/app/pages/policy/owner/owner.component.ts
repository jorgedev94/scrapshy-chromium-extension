import { Component, input } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { Owner } from "src/app/models/owner.model"; 

@Component({
    selector: "policy-owner",
    templateUrl: "owner.component.html",
    imports: [MatListModule],
    standalone: true
})
export class OwnerInfoComponent {
    owner = input<Owner>(
        {
            id: 1,
            firstname: "Juan",
            lastname: "Pérez",
            email: "juan.perez@example.com",
            ssn: "123-45-6789",
            dob: "1990-01-01",
            income: "50000",
            address: {
                address: "Calle Falsa 123",
                city: "Ciudad",
                state: "Estado",
                zipcode: "12345"
            },
            phone: "555-1234"
        }
    )
}