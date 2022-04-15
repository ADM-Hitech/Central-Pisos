import { BillingModel } from './billing.model';
import { LineItemsModel } from './line-items.model';
import { MetaData } from './meta-data.model';
import { ShippingModel } from './shipping.model';

export class OrderModel {
    id: number;
    parentId: number;
    number: number;
    orderKey: string;
    createdVia: string;
    version: string;
    status: string;
    currency: string;
    dateCreated: Date;
    dateModified: Date;
    discountTotal: number;
    discountTax: number;
    shippingTotal: number;
    shippingTax: number;
    cartTax: number;
    total: number;
    totalTax: number;
    priceIncludeTax: boolean;
    customerId: number;
    customerIpAddress: string;
    customerUserAgent: string;
    customerNote: string;
    billing: BillingModel;
    shipping: ShippingModel;
    paymentMethod: string;
    paymentMethodTitle: string;
    transactionId: number;
    datePaid: Date;
    dateCompleted: Date;
    cartHash: string;
    metaData: Array<MetaData>;
    lineItems: Array<LineItemsModel>;

    constructor() {}

    static fromJson(object: any): OrderModel {
        const order = new OrderModel();

        order.id = 'id' in object ? object.id : 0,
        order.parentId = 'parent_id' in object ? object.parent_id : 0;
        order.number = 'number' in object ? object.number : 0;
        order.orderKey = 'order_key' in object ? object.order_key : '';
        order.createdVia = 'created_via' in object ? object.created_via : '';
        order.version = 'version' in object ? object.version : '';
        order.status = 'status' in object ? object.status : '';
        order.currency = 'currency' in object ? object.currency : '';
        order.dateCreated = 'date_created' in object ? object.date_created : new Date();
        order.dateModified = 'date_modified' in object ? object.date_modified : new Date();
        order.discountTotal = 'discount_total' in object ? object.discount_total : 0;
        order.discountTax = 'discount_tax' in object ? object.discount_tax : 0;
        order.shippingTotal = 'shipping_total' in object ? object.shipping_total : 0;
        order.shippingTax = 'shipping_tax' in object ? object.shipping_tax : 0;
        order.cartTax = 'cart_tax' in object ? object.cart_tax : 0;
        order.total = 'total' in object ? object.total : 0;
        order.totalTax = 'total_tax' in object ? object.total_tax : 0;
        order.priceIncludeTax = 'prices_include_tax' in object ? object.prices_include_tax : false;
        order.customerId = 'customer_id' in object ? object.customer_id : 0;
        order.customerIpAddress = 'customer_ip_address' in object ? object.customer_ip_address : '';
        order.customerUserAgent = 'customer_user_agent' in object ? object.customer_user_agent : '';
        order.customerNote = 'customer_note' in object ? object.customer_note : '';
        order.billing = 'billing' in object ? BillingModel.fromJson(object.billing) : BillingModel.fromJson({});
        order.shipping = 'shipping' in object ? ShippingModel.fromJson(object.shipping) : ShippingModel.fromJson({});
        order.paymentMethod = 'payment_method' in object ? object.payment_method : '';
        order.paymentMethodTitle = 'payment_method_title' in object ? object.payment_method_title : '';
        order.transactionId = 'transaction_id' in object ? object.transaction_id : 0;
        order.datePaid = 'date_paid' in object ? object.date_paid : new Date();
        order.dateCompleted = 'date_completed' in object ? object.date_completed : new Date();
        order.cartHash = 'cart_hash' in object ? object.cart_hash : '';
        order.metaData = Array.from(object.meta_data ?? []).map(meta => MetaData.fromJson(meta));
        order.lineItems = Array.from(object.line_items ?? []).map(line => LineItemsModel.fromJson(line));

        return order;
    }
}