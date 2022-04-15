import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-receipt-of-payment',
    templateUrl: './receipt-of-payment.component.html',
    styleUrls: ['./receipt-of-payment.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReceiptOfPaymentComponent {
    
    @Input() totalPay: number;
    @Input() reference: string;
}