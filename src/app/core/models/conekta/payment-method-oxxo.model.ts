export class PaymentMethodOxxoModel {
    serviceName: string;
    barcodeUrl: string;
    object: string;
    type: string;
    expiresAt: Date;
    storeName: string;
    reference: string;

    constructor() {}

    public static fromJson(object: any): PaymentMethodOxxoModel {
        const payment = new PaymentMethodOxxoModel();

        payment.serviceName = 'service_name' in object ? object.service_name : '';
        payment.barcodeUrl = 'barcode_url' in object ? object.barcode_url : '';
        payment.object = 'object' in object ? object.object : 'cash_payment';
        payment.type = 'type' in object ? object.type : 'oxxo';
        payment.expiresAt = 'expires_at' in object ? new Date(object.expires_at) : new Date();
        payment.storeName = 'store_name' in object ? object.store_name : '';
        payment.reference = 'reference' in object ? object.reference : '';

        return payment;
    }
}