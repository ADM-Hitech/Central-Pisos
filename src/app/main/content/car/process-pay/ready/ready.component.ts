import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { OrderModel } from 'src/app/core/models/order.model';
import { appAnimations } from '../../../../../core/animations';

@Component({
    selector: 'app-ready',
    templateUrl: './ready.component.html',
    styleUrls: ['./ready.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ReadyComponent {

    @Input() order: OrderModel;
    @Output() onPrint: EventEmitter<void> = new EventEmitter<void>();

    public iconTruck = faTruck;

    constructor() {}

    public get companyCard(): string {
        const meta = this.order.metaData.find((meta) => meta.key == 'company_card');

        return meta.value ?? 'visa';
    }

    public get subTotal(): number {
        return this.order.total - (this.order.shippingTotal ?? 0 + this.order.discountTotal ?? 0);
    }

    public get totalShipping(): number {
        return this.order.shippingTotal ?? 0;
    }

    public print(): void {
        this.onPrint.emit();
    }

    public oxxopayment(): boolean {
        return this.order.paymentMethod === 'conekta_oxxo';
    }
}