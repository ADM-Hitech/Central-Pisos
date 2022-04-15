import { WCBillingOrder } from './billing-order.model';
import { WCLineItemOrder } from './line-item-order.model';
import { WCShippingLineOrder } from './shipping-line-order.model';
import { WCShippingOrder } from './shipping-order.model';
import { WCMetaDataOrder } from './meta-data-order.model';

export class WCFormOrder {
    payment_method: string;
    payment_method_title: string;
    set_paid: boolean;
    billing: WCBillingOrder;
    shipping: WCShippingOrder;
    line_items: Array<WCLineItemOrder>;
    shipping_lines: Array<WCShippingLineOrder>;
    meta_data: Array<WCMetaDataOrder>;
    coupon_lines: Array<{
        code: string
    }>;
    customer_id: number;
    status: string = 'processing';
}