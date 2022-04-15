export class Tag {
    id: number;
    name: string;
    slug: string;

    constructor() {}

    public static fromJson(object: any): Tag {
        const tag = new Tag();
        tag.id = 'id' in object ? object.id : 0;
        tag.name = 'name' in object ? object.name : '';
        tag.slug = 'slug' in object ? object.slug : '';

        return tag;
    }
}