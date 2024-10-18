import { Component, Inject, signal } from '@angular/core'
import { TAB_ID } from 'src/app/app.config'
import { Scrapshy } from 'src/app/services/scrap.service';
import { PageComponent } from 'src/app/pages/page.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';


@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [PageComponent, HeaderComponent, FooterComponent],
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss']
})
export class PopupComponent {}