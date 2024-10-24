import { Component } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { PolicyService } from "src/app/services/policy.service";

@Component({
	selector: 'core-footer',
	standalone: true,
	templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss'],
    imports: [MatMenuModule]
})
export class FooterComponent {

    constructor(private ps: PolicyService) {

    }

    onClick() {
        this.ps.onClick()
    }

    clean() {
        this.ps.clean()
    }

    OpenGithub(){
        const url = 'https://github.com/smoncada19/scrapshy-chromium-extension';
        window.open(url, '_blank')
    }

    OpenBootstrap(){
        const url = 'https://getbootstrap.com/';
        window.open(url, '_blank')
    }

    OpenAngular(){
        const url = 'https://angular.dev/';
        window.open(url, '_blank')
    }
}