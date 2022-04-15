import { MetaData } from "./meta-data.model";
import { TaxModel } from "./tax.model";

export class LineItemsModel {
    id: number;
    name: string;
    productId: number;
    variationId: number;
    quantity: number;
    taxClass: string;
    subtotal: number;
    subtotalTax: number;
    total: number;
    totalTax: number;
    taxes: Array<TaxModel>;
    metaData: Array<MetaData>;
    sku: string;
    price: number;
    image: string;

    constructor() {
        this.image = 'assets/images/products/default_product.png';
    }

    static fromJson(object: any): LineItemsModel {
        const line = new LineItemsModel();

        line.id = 'id' in object ? object.id : 0;
        line.name = 'name' in object ? object.name : 'name';
        line.productId = 'product_id' in object ? object.product_id : 0;
        line.variationId = 'variation_id' in object ? object.variation_id : 0;
        line.quantity = 'quantity' in object ? object.quantity : 0;
        line.taxClass = 'tax_class' in object ? object.tax_class : '';
        line.subtotal = 'subtotal' in object ? object.subtotal : 0;
        line.subtotalTax = 'subtotal_tax' in object ? object.subtotal_tax : 0;
        line.total = 'total' in object ? object.total : 0;
        line.totalTax = 'total_tax' in object ? object.total_tax : 0;
        line.taxes = Array.from(object.taxes ?? []).map((tax) => TaxModel.fromJson(tax));
        line.metaData = Array.from(object.meta_data ?? []).map((meta) => MetaData.fromJson(meta));
        line.sku = 'sku' in object ? object.sku : '';
        line.price = 'price' in object ? object.price : 0;

        return line;
    }

    public get color(): string {
        if (this.metaData.length > 0) {
            const metaColor = this.metaData.find((meta) => meta.key === 'pa_color');
            return !!metaColor ? metaColor.displayValue : '';
        }

        return '';
    }

    public get size(): string {
        if (this.metaData.length > 0) {
            const metaSize = this.metaData.find((meta) => meta.key === 'pa_size');
            return !!metaSize ? metaSize.displayValue : '';
        }

        return '';
    }
}