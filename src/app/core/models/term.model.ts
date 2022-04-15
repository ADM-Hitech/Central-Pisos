export class TermModel {
    id: number;
    name: string;
    slug: string;
    description: string;
    menuOrder: number;
    count: number;

    constructor() {}

    static fromJson(object: any): TermModel {
        const term = new TermModel();
        term.id = 'id' in object ? object.id : 0;
        term.name = 'name' in object ? object.name : '';
        term.slug = 'slug' in object ? object.slug : '';
        term.description = 'description' in object ? object.description : '';
        term.menuOrder = 'menu_order' in object ? object.menu_order : 0;
        term.count = 'count' in object ? object.count : 0;

        return term;
    }
}