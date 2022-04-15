export class TokenErrorConektaModel {
    code: string;
    message: string;
    messageToPurchaser: string;
    object: string;
    param: string;
    validationError: any;

    constructor() {}

    static fromJson(object: any): TokenErrorConektaModel {
        const tokenError = new TokenErrorConektaModel();
        tokenError.code = 'code' in object ? object.code : '';
        tokenError.message = 'message' in object ? object.message : '';
        tokenError.messageToPurchaser = 'message_to_purchaser' in object ? object.message_to_purchaser : '';
        tokenError.object = 'object' in object ? object.object : '';
        tokenError.param = 'param' in object ? object.param : '';
        tokenError.validationError = 'validation_error' in object ? object.validation_error : '';

        return tokenError;
    }

    public get clearCode(): string {
        return this.code.replace(/_/g, ' ');
    }
}