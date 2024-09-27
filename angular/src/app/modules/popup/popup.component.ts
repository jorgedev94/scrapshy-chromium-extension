import { CommonModule } from '@angular/common'
import { Component, Inject, signal } from '@angular/core'
import { TAB_ID } from 'src/app/app.config'
import { Scrapshy } from '../../services/scrap.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
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
    /* chrome.tabs.sendMessage(this.tabId, 'request', (msg) => {
      this.message.set(
        chrome.runtime.lastError
          ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
          : msg
      )
    }) */
      this.sc.scrap().then((data: string) => {
      //this.scrapper.set(data);
      this.message.set(JSON.stringify(data));
    })
  }
}
