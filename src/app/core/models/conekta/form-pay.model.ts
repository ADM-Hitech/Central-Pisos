import { CuponModel } from '../cupon.model';

export class FormPay {
    token_card: string;
    first_name: string;
    last_name: string;
    email: string;
    type_pay: 'oxxo' | 'card';
    line_items: Array<{
        id: number,
        quantity: number
    }>;
    total_shipping: number;
    cuponts: Array<CuponModel | {
        code: string,
        amount: number
    }>;
}