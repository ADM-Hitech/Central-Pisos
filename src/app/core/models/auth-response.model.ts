export class AuthResponseModel {
    nicename: string;
    email: string;
    status: string;
    displayName: string;
    token: string;

    constructor() {}

    static fromJson(object: any): AuthResponseModel {
        const auth = new AuthResponseModel();

        const data = 'data' in object ? object.data : {};

        auth.nicename = 'user_nicename' in data ? data.user_nicename : '';
        auth.email = 'user_email' in data ? data.user_email : '';
        auth.status = 'user_status' in data ? data.user_status : '0';
        auth.displayName = 'display_name' in data ? data.display_name : '';
        auth.token = 'token' in data ? data.token : null;

        return auth;
    }
}