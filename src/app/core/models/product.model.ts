import { DimensionModel } from "./dimension.model";
import { CategoryModel } from './category.model';
import { ImageModel } from './image.model';
import { AttributeModel } from "./attribute.model";
import { Tag } from "./tag.model";
import { AttributeVariationModel } from "./attribute-variation.model";

export class ProductModel {
    id: number;
    name: string;
    slug: string;
    dateCreated: Date;
    dateModified: Date;
    type: string;
    status: string;
    featured: boolean;
    description: string;
    shortDescription: string;
    sku: string;
    price: number;
    regularPrice: number;
    salePrice: number;
    onSale: boolean;
    purchasable: boolean;
    totalSale: number;
    manageStock: boolean;
    stockQuantity: number;
    weight: number;
    dimensions: DimensionModel;
    shippingRequired: boolean;
    shippingTaxable: boolean;
    categories: Array<CategoryModel>
    images: Array<ImageModel>
    attributes: Array<AttributeVariationModel>
    stockStatus: string;
    quantityCart: number;
    tags: Array<Tag>;
    averageRating: number;
    variation: boolean;

    constructor() {}

    public static fromJson(object: any): ProductModel {
        const product = new ProductModel();
        product.id = 'id' in object ? object.id : 0;
        product.name = 'name' in object ? object.name : '';
        product.slug = 'slug' in object ? object.slug : '';
        product.dateCreated = 'date_created' in object ? object.date_created : Date.now();
        product.dateModified = 'date_modified' in object ? object.date_modified : Date.now();
        product.type = 'type' in object ? object.type : '';
        product.status = 'status' in object ? object.status : '';
        product.featured = 'featured' in object ? object.featured : false;
        product.description = 'description' in object ? object.description.replace(/<p>/g, '').replace(/<\/p>/g, '') : '';
        product.shortDescription = 'short_description' in object ? object.short_description.replace(/<p>/g, '').replace(/<\/p>/g, '') : '';
        product.sku = 'sku' in object ? object.sku : '';
        product.price = 'price' in object ? parseFloat(object.price ?? 0) : 0;
        product.regularPrice = 'regular_price' in object ? parseFloat(object.regular_price ?? 0) : 0;
        product.salePrice = 'sale_price' in object ? parseFloat(object.sale_price ?? 0) : 0;
        product.onSale = 'on_sale' in object ? object.on_sale : true;
        product.purchasable = 'purchasable' in object ? object.purchasable : true;
        product.totalSale = 'total_sale' in object ? object.total_sale : 0;
        product.manageStock = 'manage_stock' in object ? object.manage_stock : false;
        product.stockQuantity = 'stock_quantity' in object ? parseFloat(object.stock_quantity ?? 0) : 0;
        product.weight = 'weight' in object ? parseFloat(object.weight ?? 0) : 0;
        product.dimensions = 'dimensions' in object ? DimensionModel.fromJson(object.dimensions ?? {}) : DimensionModel.fromJson({});
        product.shippingRequired = 'shipping_required' in object ? object.shipping_required : true;
        product.shippingTaxable = 'shipping_taxable' in object ? object.shipping_taxable : true;
        product.categories = 'categories' in object ? Array.from(object.categories ?? []).map(categorie => CategoryModel.fromJson(categorie)) : [];
        product.images = 'images' in object ? Array.from(object.images ?? []).map(image => ImageModel.fromJson(image)) : [];
        product.attributes = 'attributes' in object ? Array.from(object.attributes ?? []).map(attribute => AttributeVariationModel.fromJson(attribute)) : [];
        product.stockStatus = 'stock_status' in object ? object.stock_status : 'instock';
        product.quantityCart = 1;
        product.tags = 'tags' in object ? Array.from(object.tags ?? []).map(tag => Tag.fromJson(tag)) : [];
        product.averageRating = 'average_rating' in object ? parseInt(object.average_rating, 10) : 0;

        return product;
    }

    public get porcentDiscount(): number {
        if (this.price == this.regularPrice) return 0;

        return Math.round(((this.regularPrice - this.salePrice) / this.regularPrice) * 100);
    }

    public get withDiscount(): boolean {
        return this.porcentDiscount > 0;
    }

    public get size(): string {
        const index = this.attributes.findIndex(attribute => attribute.name === 'Tamaño');

        if (index >= 0) {
            return this.attributes[index].options[0];
        }

        return '';
    }

    public get quantityPerBox(): number {
        const index = this.attributes.findIndex(attribute => attribute.name === 'cantidad por caja');

        if (index >= 0) {
            return this.attributes[index].options.length > 0 ? parseInt(this.attributes[index].options[0].toString(), 10) : 1;
        }

        return 1;
    }

    public get sizes(): Array<string> {
        const index = this.attributes.findIndex(attribute => attribute.name === 'Tamaño');

        if (index >= 0) {
            return this.attributes[index].options;
        }

        return [];
    }

    public get colors(): Array<{ label: string, value: string }> {
        const index = this.attributes.findIndex(attribute => attribute.name === 'Color');

        if (index >= 0) {
            return this.attributes[index].options.map((value) => value.split(':').length > 1 ?
                ({ label: value.split(':')[1], value: value.split(':')[0] }) : ({ label: value, value: 'none' }) );
        }

        return [];
    }

    public get firstColor(): { label: string, value: string } | null {
        return this.colors.length > 0 ? this.colors[0] : null;
    }

    public get firtsImage(): string {
        return this.images.length > 0 ? this.images[0].src : 'assets/images/products/default_product.png';
    }

    public get dimension(): string {

        let height = this.dimensions.height > 0 ? `${this.dimensions.height}` : '';
        let width = this.dimensions.width > 0 ? ` x ${this.dimensions.width}` : '';
        let length = this.dimensions.length > 0 ? ` x ${this.dimensions.length}` : '';

        return `${height}${width}${length}`;
    }
}