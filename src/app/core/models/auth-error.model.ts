export class AuthErrorModel {
    code: string;
    message: string;
    data: any;

    constructor() {}

    static fromJson(object: any): AuthErrorModel {
        const error = new AuthErrorModel();

        error.code = 'code' in object ? object.code : '';
        error.message = 'message' in object ? object.message : '';
        error.data = 'data' in object ? object.data : {};

        return error;
    }

    public get clearCode(): string {
        return this.code.replace(/_/g, ' ');
    }
}