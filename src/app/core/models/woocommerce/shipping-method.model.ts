export class ShippingMethodModel {
    id: string;
    title: string;
    taxStatus: string;
    cost: number;
    requires: string;
    minAmount: number;
 
    constructor() {}

    public static fromJson(object: any): ShippingMethodModel {
        const method = new ShippingMethodModel();

        method.id = object.id ?? '';
        method.title = object.title ?? '';
        method.taxStatus = object.tax_status ?? '';
        method.cost = parseFloat(object.cost ?? 0);
        method.requires = object.requires ?? '';
        method.minAmount = parseFloat(object.min_amount ?? 0);

        return method;
    }
}