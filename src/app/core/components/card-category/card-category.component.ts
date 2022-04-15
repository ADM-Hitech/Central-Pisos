import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-card-category',
    templateUrl: './card-category.component.html',
    styleUrls: ['./card-category.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CardCategoryComponent implements OnInit {

    @Input() category: string;
    @Input() image: any;

    constructor() { }

    ngOnInit() { }
}