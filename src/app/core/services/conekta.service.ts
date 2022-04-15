import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TokenParamConektaModel } from '../models/conekta/token-param-conekta.model';
import { Observable } from 'rxjs';
declare var Conekta:any;

@Injectable({
    providedIn: 'root'
})
export class ConektaService {

    constructor() {
        Conekta.setPublicKey(environment.conektaKey);
    }

    public generateToken(tokenParam: TokenParamConektaModel): Observable<any> {
        const create = new Observable((observer) => {
            Conekta.Token.create(tokenParam, (token) => {
                observer.next(token);
            }, (response) => {
                observer.error(response);
            });

            return {
                unsubscribe() {}
            }
        });

        return create;
    }
}