import { Component, Input, ViewEncapsulation } from "@angular/core";
import { CuponModel } from "../../models/cupon.model";
import { OrderModel } from "../../models/order.model";
import { ProductVariationModel } from "../../models/product-variation.model";
import { ProductModel } from "../../models/product.model";
import { WCBillingOrder } from "../../models/woocommerce/billing-order.model";
import { WCShippingOrder } from "../../models/woocommerce/shipping-order.model";

@Component({
    selector: 'app-receipt-of-payment-card',
    templateUrl: './receipt-of-payment-card.component.html',
    styleUrls: ['./receipt-of-payment-card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReceiptOfPaymentCardComponent {
    @Input() totalPay: number;
    @Input() totalShipping: number;
    @Input() billing: WCBillingOrder;
    @Input() shipping: WCShippingOrder;
    @Input() order: OrderModel;
    @Input() cupons: Array<CuponModel>;
    @Input() products: Array<ProductModel | ProductVariationModel>;

    public get subTotal(): number {
        return this.order.lineItems.reduce((pv, cv) => pv + cv?.total || 0, 0);
    }

    public get discountByCupons(): number {
        var total = 0;

        this.cupons.forEach((cupon) => {
            if (cupon.discountType == 'fixed_cart') {
                total += parseFloat(cupon.amount.toString());
            }

            if (cupon.discountType == 'percent') {
                total += this.subTotal * (cupon.amount / 100);
            }

            if (cupon.discountType == 'fixed_product') {
                total += this.products.length * cupon.amount;
            }

        });

        return total;
    }
}