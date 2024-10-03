import { Component } from '@angular/core'
import { HomeComponent } from 'src/app/pages/home/home.component'

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.scss']
})
export class SidePanelComponent {}
