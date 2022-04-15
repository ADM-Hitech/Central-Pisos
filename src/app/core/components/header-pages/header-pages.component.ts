import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-header-pages',
    templateUrl: './header-pages.component.html',
    styleUrls: ['./header-pages.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderPagesComponent {

    @Input() image: any;
    @Input() namePage: string;

    constructor() {}
}
