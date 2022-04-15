export class StateModel {
    code: string;
    value: string;

    constructor() {}

    static fromJson(object: any): StateModel {
        const state = new StateModel();

        state.code = 'code' in object ? object.code : '';
        state.value = 'value' in object ? object.value : '';

        return state;
    }
}