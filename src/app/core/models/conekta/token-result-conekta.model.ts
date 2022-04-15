export class TokenResultConektaModel {
    id: string;
    livemode: boolean;
    object: string;
    used: boolean;
    expire: Date;

    constructor() {}

    static fromJson(object: any): TokenResultConektaModel {
        const result = new TokenResultConektaModel();
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 1);

        result.id = 'id' in object ? object.id : '';
        result.livemode = 'livemode' in object ? object.livemode : false;
        result.object = 'object' in object ? object.object : '';
        result.used = 'used' in object ? object.used : false;
        result.expire = currentDate;
        return result;
    }
}

// numero de autorizacion 

