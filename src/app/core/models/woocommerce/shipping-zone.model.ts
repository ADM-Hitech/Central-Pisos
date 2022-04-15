import { ShippingMethodModel } from "./shipping-method.model";
import { ZoneLocationModel } from "./zone-location.model";

export class ShippingZoneModel {
    id: number;
    zoneName: string;
    zoneOrder: number;
    zoneLocations: Array<any>;
    formattedZoneLocation: string;
    shippingMethods: Array<any>;

    constructor() {}

    public static fromJson(object: any): ShippingZoneModel {
        const shippingZone = new ShippingZoneModel();

        shippingZone.id = object.id ?? 0;
        shippingZone.zoneName = object.zone_name ?? '';
        shippingZone.zoneOrder = object.zone_order ?? 0;
        shippingZone.zoneLocations = Array.from(object.zone_locations ?? []).map((location) => ZoneLocationModel.fromJson(location));
        shippingZone.formattedZoneLocation = object.formatted_zone_location ?? '';
        shippingZone.shippingMethods = Array.from(object.shipping_methods ?? []).map((method) => ShippingMethodModel.fromJson(method));

        return shippingZone;
    }
}