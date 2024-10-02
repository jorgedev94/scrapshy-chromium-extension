import { Component, Inject, signal } from '@angular/core'
import { TAB_ID } from 'src/app/app.config'
import { Scrapshy } from '../../services/scrap.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatButtonModule, MatMenuModule, MatListModule, MatCardModule],
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss'],
  providers: [Scrapshy]
})
export class PopupComponent {
  message = signal('')
  scrapper = signal('');

  constructor(
    @Inject(TAB_ID) readonly tabId: number,
    private sc: Scrapshy
  ) {}

  onClick() {
    chrome.scripting.executeScript(
      {
        target: { tabId: this.tabId },
        func: () => {
          return this.sc.scrap_2(document);
        }
      },
      (results) => {
        // Los resultados de la función inyectada se devuelven aquí
        if (results && results[0]) {
          console.log('Resultado del script:', results[0].result);
          //this.message.set(results[0].result); // Actualiza la señal con el resultado
        }
      }
    );

  }
}