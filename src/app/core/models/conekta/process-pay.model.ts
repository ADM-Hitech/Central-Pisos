import { ChargeModel } from "./charge.model";
import { CustomerInfoModel } from "./customer-info.model";

export class ProcessPayModel {
    livemode: boolean;
    amount: number;
    currency: string;
    paymentStatus: string;
    amountRefunded: number;
    customerInfo: CustomerInfoModel;
    object: string;
    id: string;
    createdAt: Date;
    charges: ChargeModel;

    constructor() {}

    public static fromJson(object: any): ProcessPayModel {
        const process = new ProcessPayModel();

        process.livemode = 'livemode' in object ? object.livemode : false;
        process.amount = parseInt(object.amount ?? '0', 10) / 100;
        process.currency = 'currency' in object ? object.currency : 'MXN';
        process.paymentStatus = 'payment_status' in object ? object.payment_status : '';
        process.amountRefunded = parseInt(object.amount_refunded ?? '0', 10);
        process.customerInfo = CustomerInfoModel.fromJson(object.customer_info ?? {});
        process.object = 'object' in object ? object.object : '';
        process.id = 'id' in object ? object.id : '';
        process.createdAt = 'created_at' in object ? new Date(object.created_at) : new Date();
        process.charges = ChargeModel.fromJson(object.charges ?? {});

        return process;
    }
}