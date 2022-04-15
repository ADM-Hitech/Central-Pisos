export class ShippingModel {

    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
    colony: string;
    numExt: string;
    numInt: string;
    reference: string;

    constructor() {}

    static fromJson(object: any): ShippingModel {
        const billing = new ShippingModel();

        billing.firstName = 'first_name' in object ? object.first_name : '';
        billing.lastName = 'last_name' in object ? object.last_name : '';
        billing.company = 'company' in object ? object.company : '';
        billing.address1 = 'address_1' in object ? object.address_1 : '';
        billing.address2 = 'address_2' in object ? object.address_2 : '';
        billing.city = 'city' in object ? object.city : '';
        billing.state = 'state' in object ? object.state : '';
        billing.postcode = 'postcode' in object ? object.postcode : '';
        billing.country = 'country' in object ? object.country : '';
        billing.email = 'email' in object ? object.email : '';
        billing.phone = 'phone' in object ? object.phone : '';
        billing.colony = 'colony' in object ? object.colony : '';
        billing.numExt = 'number_ext' in object ? object.number_ext : '';
        billing.numInt = 'number_int' in object ? object.number_int : '';
        billing.reference = 'reference' in object ? object.reference : '';

        return billing;
    }

    public get fullAddress(): string {
        return `${this.address1} ${this.address2}, ${this.city}, CP ${this.postcode}, ${this.state}, ${this.country}`;
    }
}