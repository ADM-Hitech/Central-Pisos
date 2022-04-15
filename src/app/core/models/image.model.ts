export class ImageModel {
    id: number;
    dateCreated: Date;
    dateModified: Date;
    src: string;
    name: string;
    alt: string;

    constructor() {}

    static fromJson(object: any): ImageModel {
        const image = new ImageModel();
        image.id = 'id' in object ? object.id : 0;
        image.dateCreated = 'date_created' in object ? object.date_created : Date.now();
        image.dateModified = 'date_modified' in object ? object.date_modified : Date.now();
        image.src = 'src' in object ? object.src : 'assets/images/products/default_product.png';
        image.name = 'name' in object ? object.name : '';
        image.alt = 'alt' in object ? object.alt : '';

        return image;
    }
}