export class PaymentMethodCardModel {
    name: string;
    expMonth: number;
    expYear: number;
    authCode: string;
    object: string;
    type: string;
    last4: number;
    brand: string;
    issuer: string;
    accountType: string;
    country: string;

    constructor() {}

    public static fromJson(object: any): PaymentMethodCardModel {
        const card = new PaymentMethodCardModel();
        card.name = 'name' in object ? object.name : '';
        card.expMonth = parseInt(object.exp_month ?? '0', 10); 
        card.expYear = parseInt(object.exp_year ?? '0', 10);
        card.authCode = 'auth_code' in object ? object.auth_code : '';
        card.object = 'object' in object ? object.object : 'card_payment';
        card.type = 'type' in object ? object.type : 'credit';
        card.last4 = parseInt(object.last4 ?? '0', 10);
        card.brand = 'brand' in object ? object.brand : '';
        card.issuer = 'issuer' in object ? object.issuer : '';
        card.accountType = 'account_type' in object ? object.account_type : '';
        card.country = 'country' in object ? object.country : '';

        return card;
    }
}