import { WCShippingOrder } from "./shipping-order.model";

export class WCBillingOrder extends WCShippingOrder {
    phone: string;

    constructor() {
        super();
    }

    public static fromJson(object: any): WCBillingOrder {
        const billing = new WCBillingOrder();
        billing.first_name = object.first_name ?? '';
        billing.last_name = object.last_name ?? '';
        billing.address_1 = object.address_1 ?? '';
        billing.address_2 = `#${object?.number_ext} int. ${object?.number_int}, col. ${object?.colony}`;
        billing.city = object.city ?? '';
        billing.state = object.state ?? '';
        billing.postcode = object.postcode ?? '';
        billing.country = object.country ?? 'MX';
        billing.email = object.email ?? '';
        billing.phone = object.phone ?? '';

        return billing;
    }
}