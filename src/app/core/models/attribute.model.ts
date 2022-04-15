import { TermModel } from "./term.model";

export class AttributeModel {
    id: number;
    name: string;
    slug: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: Array<string>;
    terms: Array<TermModel>;

    constructor() {}

    static fromJson(object: any): AttributeModel {
        const attribute = new AttributeModel();
        attribute.id = 'id' in object ? object.id : 0;
        attribute.name = 'name' in object ? object.name : '';
        attribute.slug = 'slug' in object ? object.slug : '';
        attribute.position = 'position' in object ? object.position : 0;
        attribute.visible = 'visible' in object ? object.visible : true;
        attribute.variation = 'variation' in object ? object.variation : false;
        attribute.options = 'options' in object ? object.options ?? [] : [];
        attribute.terms = 'terms' in object ? Array.from(object.terms ?? []) : [];

        return attribute;
    }
}