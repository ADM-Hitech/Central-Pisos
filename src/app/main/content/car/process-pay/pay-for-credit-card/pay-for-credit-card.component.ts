import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { appAnimations } from '../../../../../core/animations';

@Component({
    selector: 'app-pay-for-credit-card',
    templateUrl: './pay-for-credit-card.component.html',
    styleUrls: ['./pay-for-credit-card.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PayForCreditCardComponent {

    @Input() form: FormGroup;

    constructor() {}

    public isValidForShipping(control: string): boolean {
        return this.form?.get(control)?.valid;
    }

}