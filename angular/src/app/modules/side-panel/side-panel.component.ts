import { Component } from '@angular/core'
import { FooterComponent } from 'src/app/core/footer/footer.component'
import { HeaderComponent } from 'src/app/core/header/header.component'
import { PageComponent } from 'src/app/pages/page.component'

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [PageComponent, HeaderComponent, FooterComponent],
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.scss']
})
export class SidePanelComponent {}
