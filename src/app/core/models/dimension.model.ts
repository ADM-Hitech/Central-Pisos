export class DimensionModel {
    length: number;
    width: number;
    height: number;

    constructor() {}

    static fromJson(object: any): DimensionModel {
        const dimension = new DimensionModel();
        dimension.length = 'length' in object ? parseFloat(object.length ?? 0) : 1;
        dimension.width = 'width' in object ? parseFloat(object.width ?? 0) : 1;
        dimension.height = 'height' in object ? parseFloat(object.height ?? 0) : 1;

        return dimension;
    }
}