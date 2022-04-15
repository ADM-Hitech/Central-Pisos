import { ImageModel } from "./image.model";

export class CategoryModel {
    id: number;
    name: string;
    slug: string;
    count: number;
    image: ImageModel;

    constructor() {}

    static fromJson(object: any): CategoryModel {
        const category = new CategoryModel();
        category.id = 'id' in object ? object.id : 0;
        category.name = 'name' in object ? object.name : '';
        category.slug = 'slug' in object ? object.slug : '';
        category.count = 'count' in object ? parseFloat(object.count) : 0
        category.image = ImageModel.fromJson(object.image ?? {});
        category.name = category.name.toUpperCase();

        return category;
    }
}