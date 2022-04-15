import { DimensionModel } from "./dimension.model";
import { ImageModel } from "./image.model";
import { AttributeVariationModel } from './attribute-variation.model';
import { ProductModel } from "./product.model";
import { Tag } from "./tag.model";
import { CategoryModel } from "./category.model";

export class ProductVariationModel extends ProductModel {

    constructor() {
        super();
    }

    static fromJson(object: any): ProductVariationModel {
        const product = new ProductVariationModel();

        product.id = 'id' in object ? parseInt(object.id, 10) : 0;
        product.name = 'name' in object ? object.name : '';
        product.slug = 'slug' in object ? object.slug : '';
        product.dateCreated = 'date_created' in object ? object.date_created : Date.now();
        product.dateModified = 'date_modified' in object ? object.date_modified : Date.now();
        product.description = 'description' in object ? object.description.replace(/<p>/g, '').replace(/<\/p>/g, '') : '';
        product.sku = 'sku' in object ? object.sku : '';
        product.price = 'price' in object ? parseFloat(object.price ?? 0) : 0;
        product.regularPrice = 'regular_price' in object ? parseFloat(object.regular_price ?? 0) : 0;
        product.salePrice = 'sale_price' in object ? parseFloat(object.sale_price ?? 0) : 0;
        product.onSale = 'on_sale' in object ? object.on_sale : false;
        product.status = 'status' in object ? object.status : '';
        product.manageStock = 'manage_stock' in object ? object.manage_stock : false;
        product.stockQuantity = 'stock_quantity' in object ? parseFloat(object.stock_quantity ?? 0) : 0;
        product.weight = 'weight' in object ? parseFloat(object.weight ?? 0) : 0;
        product.dimensions = 'dimensions' in object ? DimensionModel.fromJson(object.dimensions ?? {}) : DimensionModel.fromJson({});

        if ('images' in object) {
            product.images = Array.from(object.images ?? []).map(image => ImageModel.fromJson(image));
        } else if ('image' in object) {
            product.images = [
                ImageModel.fromJson(object.image)
            ];
        } else {
            product.images = [];
        }

        product.attributes = 'attributes' in object ? Array.from(object.attributes ?? []).map(attribute => AttributeVariationModel.fromJson(attribute)) : [];
        product.quantityCart = 1;

        product.type = 'type' in object ? object.type : '';
        product.featured = 'featured' in object ? object.featured : false;
        product.shortDescription = 'short_description' in object ? object.short_description.replace(/<p>/g, '').replace(/<\/p>/g, '') : '';
        product.purchasable = 'purchasable' in object ? object.purchasable : true;
        product.totalSale = 'total_sale' in object ? object.total_sale : 0;
        product.shippingRequired = 'shipping_required' in object ? object.shipping_required : true;
        product.shippingTaxable = 'shipping_taxable' in object ? object.shipping_taxable : true;
        product.categories = 'categories' in object ? Array.from(object.categories ?? []).map(categorie => CategoryModel.fromJson(categorie)) : [];
        product.stockStatus = 'stock_status' in object ? object.stock_status : 'instock';
        product.tags = 'tags' in object ? Array.from(object.tags ?? []).map(tag => Tag.fromJson(tag)) : [];
        product.averageRating = 'average_rating' in object ? parseInt(object.average_rating, 10) : 0;
        
        product.variation = product.type == 'variable';

        return product;
    }
}