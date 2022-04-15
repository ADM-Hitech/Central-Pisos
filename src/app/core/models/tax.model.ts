export class TaxModel {
    id: number;
    total: number;
    subtotal: number;
    
    constructor() {}

    static fromJson(object: any): TaxModel {
        const tax = new TaxModel();

        tax.id = 'id' in object ? object.id : 0;
        tax.total = 'total' in object ? object.total : 0;
        tax.subtotal = 'subtotal' in object ? object.subtotal : 0;

        return tax;
    }
}