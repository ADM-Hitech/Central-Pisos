export class ZoneLocationModel {
    code: string;
    type: string;

    constructor() {}

    public static fromJson(object: any): ZoneLocationModel {
        const zone = new ZoneLocationModel();

        zone.code = object.code ?? '';
        zone.type = object.type ?? '';

        return zone;
    }
}