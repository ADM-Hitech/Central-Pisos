import { ShippingModel } from './shipping.model';

export class BillingModel extends ShippingModel {

    email: string;
    phone: string;

    constructor() {
        super();
    }

    static fromJson(object: any): BillingModel {
        const billing = super.fromJson(object);

        billing.email = 'email' in object ? object.email : '';
        billing.phone = 'phone' in object ? object.phone : '';

        return billing;
    }
}