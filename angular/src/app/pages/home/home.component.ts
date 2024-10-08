import { Component, Inject, signal } from '@angular/core'
import { TAB_ID } from 'src/app/app.config'
import { Scrapshy } from '../../services/scrap.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'pages-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, MatMenuModule, MatListModule, MatCardModule,MatExpansionModule,MatIconModule],
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  providers: [Scrapshy]
})
export class HomeComponent {
  message = {
    "contacts": [
        {
            "firstname" : "Jorge",
            "lastname" : "Devia",
            "dob" : "03/29/1994",
            "ssn" : "000-54-5451",
            "type": "owner"        
        },
        {
            "firstname" : "Santiago",
            "lastname" : "Moncada",
            "dob" : "01/01/2000",
            "ssn" : "547-58-4654",
            "type": "spouse"        
        },
        {
            "firstname" : "Karol",
            "lastname" : "G",
            "dob" : "01/01/2004",
            "ssn" : "245-54-5945",
            "type": "dependent_1"        
        }
    ],
    "address" : {
      "address" : "Avenida Siempre Viva",
      "address_2": "Apt 201",
      "city" : "Miami",
      "state": "FL",
      "zipcode" : "33054"
    },
    "email" : "jorged94@mabecenter.org",
    "phone" : "7865412356",
    "income" : "15000"
}
  
  scrapper = signal('');
  panelOpenState = signal(false);
  panelOpenState1 = signal(false);
  isSecondPanelOpen = false; // Estado del Panel 2
  isDisabled = signal(true)

  constructor(
    @Inject(TAB_ID) readonly tabId: number,
    private sc: Scrapshy
  ) {}

  closeExtension(){
    window.close()
  }

  onClick() {
    this.isDisabled.set(false)

    this.message = {
      "contacts": [
          {
              "firstname" : "Jorge",
              "lastname" : "Devia",
              "dob" : "03/29/1994",
              "ssn" : "000-54-5451",
              "type": "owner"        
          },
          {
              "firstname" : "Santiago",
              "lastname" : "Moncada",
              "dob" : "01/01/2000",
              "ssn" : "547-58-4654",
              "type": "spouse"        
          },
          {
              "firstname" : "Karol",
              "lastname" : "G",
              "dob" : "01/01/2004",
              "ssn" : "245-54-5945",
              "type": "dependent_1"        
          }
      ],
      "address" : {
        "address" : "Avenida Siempre Viva",
        "address_2": "Apt 201",
        "city" : "Miami",
        "state": "FL",
        "zipcode" : "33054"
      },
      "email" : "jorged94@mabecenter.org",
      "phone" : "7865412356",
      "income" : "15000"
  }
    return this.message
  }

  clean(){
    this.message = {
      "contacts": [
          {
              "firstname" : "",
              "lastname" : "",
              "dob" : "",
              "ssn" : "",
              "type": ""        
          },
          {
              "firstname" : "Santiago",
              "lastname" : "Moncada",
              "dob" : "01/01/2000",
              "ssn" : "547-58-4654",
              "type": "spouse"        
          },
          {
              "firstname" : "Karol",
              "lastname" : "G",
              "dob" : "01/01/2004",
              "ssn" : "245-54-5945",
              "type": "dependent_1"        
          }
      ],
      "address" : {
        "address" : "",
        "address_2": "",
        "city" : "",
        "state": "",
        "zipcode" : ""
      },
      "email" : "",
      "phone" : "",
      "income" : ""
  }
  this.isSecondPanelOpen = false;
  this.isDisabled.set(true)

  return this.message
  }

}