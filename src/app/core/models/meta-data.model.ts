export class MetaData {
    id: number;
    key: string;
    value: string;
    displayValue: string;

    constructor() {}

    static fromJson(object: any): MetaData {
        const meta = new MetaData();

        meta.id = 'id' in object ? object.id : 0,
        meta.key = 'key' in object ? object.key : '';
        meta.value = 'value' in object ? object.value : '';
        meta.displayValue = 'display_value' in object ? object.display_value : '';

        return meta;
    }
}