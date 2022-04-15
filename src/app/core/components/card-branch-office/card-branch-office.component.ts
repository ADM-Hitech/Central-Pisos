import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-card-branch-office',
    templateUrl: './card-branch-office.component.html',
    styleUrls: ['./card-branch-office.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CardBranchOfficeComponent {

    @Input() state: string;
    @Input() isPrincipal: boolean;
    @Input() address: string;
    @Input() telephones: Array<string> = [];
    @Output() clickBotton: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    public get telephonesSplit(): string {
        return this.telephones?.join('・');
    }

    public pressButton(): void {
        this.clickBotton.emit();
    }
}