export class CustomerInfoModel {
    email: string;
    phone: string;
    name: string;
    object: string;

    constructor() {}

    public static fromJson(object: any): CustomerInfoModel {
        const customer: CustomerInfoModel = new CustomerInfoModel();

        customer.email = 'email' in object ? object.email : '';
        customer.phone = 'phone' in object ? object.phone : '';
        customer.name = 'name' in object ? object.name : '';
        customer.object = 'object' in object ? object.object : '';

        return customer;
    }
}