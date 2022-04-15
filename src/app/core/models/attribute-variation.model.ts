import { AttributeModel } from "./attribute.model";

export class AttributeVariationModel extends AttributeModel {
    option: string

    constructor() {
        super();
    }

    static fromJson(object: any): AttributeVariationModel {
        const attribute = new AttributeVariationModel();

        attribute.id = 'id' in object ? parseInt(object.id, 10) : 0;
        attribute.name = 'name' in object ? object.name : '';
        attribute.option = 'option' in object ? object.option : '';
        attribute.slug = 'slug' in object ? object.slug : '';
        attribute.position = 'position' in object ? object.position : 0;
        attribute.visible = 'visible' in object ? object.visible : true;
        attribute.variation = 'variation' in object ? object.variation : false;
        attribute.options = 'options' in object ? object.options ?? [] : [];
        attribute.terms = 'terms' in object ? Array.from(object.terms ?? []) : [];

        return attribute;
    }
}