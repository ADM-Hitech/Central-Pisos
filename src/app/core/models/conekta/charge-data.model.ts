import { PaymentMethodCardModel } from "./payment-method-card.model";
import { PaymentMethodOxxoModel } from "./payment-method-oxxo.model";

export class ChargeDataModel {
    id: string;
    livemode: boolean;
    createdAt: Date;
    currency: string;
    paymentMethod: PaymentMethodCardModel | PaymentMethodOxxoModel;
    object: string;
    description: string;
    status: string;
    amount: number;
    fee: number;
    customerId: number;
    orderId: string;

    constructor() {}

    public static fromJson(object: any): ChargeDataModel {
        const chargedata = new ChargeDataModel();

        chargedata.id = 'id' in object ? object.id : '';
        chargedata.livemode = 'livemode' in object ? object.livemode : false;
        chargedata.createdAt = 'created_at' in object ? new Date(object.created_at) : new Date();
        chargedata.currency = 'currency' in object ? object.currency : 'MXN';

        chargedata.paymentMethod = PaymentMethodCardModel.fromJson(object.payment_method ?? {});

        if ('payment_method' in object) {
            if (object.payment_method.type === 'oxxo') {
                chargedata.paymentMethod = PaymentMethodOxxoModel.fromJson(object.payment_method);
            } 
        }

        chargedata.object = 'object' in object ? object.object : '';
        chargedata.description = 'description' in object ? object.description : '';
        chargedata.status = 'status' in object ? object.status : '';
        chargedata.amount = parseInt(object.amount ?? '0', 10) / 100;
        chargedata.fee = parseInt(object.fee ?? '0', 10);
        chargedata.orderId = 'order_id' in object ? object.order_id : '';

        return chargedata;
    }
}