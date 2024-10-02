import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { HomeComponent } from 'src/app/pages/home/home.component'

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.scss']
})
export class SidePanelComponent {}
