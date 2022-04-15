import { AddressConektaModel } from "./address-conekta.model";

export class CardConektaModel {
    number: number;
    name: string;
    exp_year: number;
    exp_month: number;
    cvc: number;
    address: AddressConektaModel;
}