import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { appAnimations } from '../../../../core/animations';

@Component({
    selector: 'app-content-profile',
    templateUrl: './content-profile.component.html',
    styleUrls: ['./content-profile.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ContentProfileComponent {

    constructor(private router: Router,) {}

    logOut(): void {
        localStorage.clear();
        this.router.navigate(['/']);
      }
}