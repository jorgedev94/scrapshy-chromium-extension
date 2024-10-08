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
  //message = signal('')
  message = {
    name : 'Santiago',
    lastname : 'Moncada Peña',
    dob : '10-19-2001',
    ssn : '1193113161',
    address : {
      address : 'Villa verde',
      city : 'Pereira',
      county : 'Ri',
      zipcode : '66000'
    },
    email : 'Prueba@hotmail.com',
    phone : '1234567890',
    income : '15000'
  }
  scrapper = signal('');
  readonly panelOpenState = signal(false);
  readonly panelOpenState1 = signal(false);

  constructor(
    @Inject(TAB_ID) readonly tabId: number,
    private sc: Scrapshy
  ) {}

  closeExtension(){
    window.close()
  }

  onClick() {
    this.sc.scrap(this.tabId).then(
      data => {
        this.message
      }
    )
  }
}