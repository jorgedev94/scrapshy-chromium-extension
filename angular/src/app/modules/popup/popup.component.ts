import { Component } from '@angular/core'
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