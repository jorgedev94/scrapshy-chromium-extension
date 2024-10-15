import { Component } from "@angular/core";

@Component({
	selector: 'core-header',
	standalone: true,
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.scss'],
})
export class HeaderComponent {
	closeExtension(){
        window.close()
    }
}
	  