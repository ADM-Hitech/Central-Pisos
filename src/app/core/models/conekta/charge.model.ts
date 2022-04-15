import { ChargeDataModel } from "./charge-data.model";

export class ChargeModel {
    object: string;
    hasMore: boolean;
    total: number;
    data: Array<ChargeDataModel>;

    constructor() {}

    public static fromJson(object: any): ChargeModel {
        const charge = new ChargeModel();

        charge.object = 'object' in object ? object.object : '';
        charge.hasMore = 'has_more' in object ? object.has_more : false;
        charge.total = parseInt(object.total ?? '0', 10);
        charge.data = [];

        const keyItems = Object.keys(object.data ?? {});

        keyItems.forEach((key) => {
            charge.data.push(ChargeDataModel.fromJson(object.data[key]));
        })

        return charge;
    }
}