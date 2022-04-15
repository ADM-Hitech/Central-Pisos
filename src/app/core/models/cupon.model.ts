import * as moment from 'moment';
import { ProductVariationModel } from './product-variation.model';
import { ProductModel } from './product.model';

export class CuponModel {
    id: number;
    code: string;
    amount: number;
    dateCreated: Date;
    discountType: string;
    description: string;
    dateExpires: Date;
    usageCount: number;
    individualUse: boolean;
    productIds: Array<number>;
    excludeProductIds: Array<number>;
    usageLimit: number;
    usageLimitPerUser: number;
    limitUsageToXItems: number;
    freeShipping: boolean;
    productCategories: Array<number>;
    excludeProductCategories: Array<number>;
    excludeSaleItems: boolean;
    minimunAmount: number;
    maximunAmount: number;
    usedBy: Array<number>;

    constructor() {}

    static fromJson(object: any): CuponModel {
        const cupon = new CuponModel();

        cupon.id = 'id' in object ? parseInt(object.id, 10) : 0;
        cupon.code = 'code' in object ? object.code : '';
        cupon.amount = 'amount' in object ? object.amount : 0;
        cupon.dateCreated = 'date_created' in object ? object.date_created : new Date();
        cupon.discountType = 'discount_type' in object ? object.discount_type : 'fixed_cart';
        cupon.description = 'description' in object ? object.description : '';
        cupon.dateExpires = 'date_expires' in object ? object.date_expires : null;
        cupon.usageCount = 'usage_count' in object ? object.usage_count : 0;
        cupon.individualUse = 'individual_use' in object ? object.individual_use : false;
        cupon.productIds = Array.from(object.product_ids ?? []);
        cupon.excludeProductIds = Array.from(object.excluded_product_ids ?? []);
        cupon.usageLimit = 'usage_limit' in object ? object.usage_limit : null;
        cupon.usageLimitPerUser = 'usage_limit_per_user' in object ? object.usage_limit_per_user : null;
        cupon.limitUsageToXItems = 'limit_usage_to_x_items' in object ? object.limit_usage_to_x_items : null;
        cupon.freeShipping = 'free_shipping' in object ? object.free_shipping : false;
        cupon.productCategories = Array.from(object.product_categories ?? []);
        cupon.excludeProductCategories = Array.from(object.excluded_product_categories ?? []);
        cupon.excludeSaleItems = 'exclude_sale_items' in object ? object.exclude_sale_items : false;
        cupon.minimunAmount = 'minimum_amount' in object ? object.minimum_amount : 0;
        cupon.maximunAmount = 'maximum_amount' in object ? object.maximum_amount : 0;
        cupon.usedBy = Array.from(object.used_by ?? []);

        return cupon;
    }

    public getTotalDiscount(product: Array<ProductModel | ProductVariationModel> ): number {
        // expired
        if (moment(this.dateExpires).isBefore(new Date())) {
            return 0;
        }

        return this.amount;
    }

    public get expired(): boolean {
        return moment(this.dateExpires).isBefore(new Date());
    }
}