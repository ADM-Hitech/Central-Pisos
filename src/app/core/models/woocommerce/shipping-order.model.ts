export class WCShippingOrder {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;

    constructor() {}

    public static fromJson(object: any): WCShippingOrder {
        const shipping = new WCShippingOrder();
        shipping.first_name = object.first_name ?? '';
        shipping.last_name = object.last_name ?? '';
        shipping.address_1 = object.address_1 ?? '';
        shipping.address_2 = `#${object?.number_ext} int. ${object?.number_int}, col. ${object?.colony}`;
        shipping.city = object.city ?? '';
        shipping.state = object.state ?? '';
        shipping.postcode = object.postcode ?? '';
        shipping.country = object.country ?? 'MX';
        shipping.email = object.email ?? '';

        return shipping;
    }
}