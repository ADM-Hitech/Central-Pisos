import { Injectable } from '@angular/core';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';
import { environment } from '../../../environments/environment';
import * as OAuth from 'oauth-1.0a';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WoocommerceService {
    private nonce: string = '';
    private currentTimestamp: number = 0;
    private customerKey: string = environment.customerKey;
    private customerSecret: string = environment.customerSecret;

    constructor(private http: HttpClient) {}

    public encodeUrl(method: 'POST' | 'GET' | 'PUT', url: string, params: object, extParameter: string = null): string {
        url = environment.api+url;
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        this.currentTimestamp = Math.floor(new Date().getTime() / 1000);
        this.nonce ='';
        let signatureStr:string = '';
        let paramStr:string = '';

        for(var i = 0; i < 6; i++) {
            this.nonce += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    
        let authParam: object = {
            oauth_consumer_key : this.customerKey,
            oauth_nonce : this.nonce,
            oauth_signature_method : 'HMAC-SHA1',
            oauth_timestamp : this.currentTimestamp,
            oauth_version : '1.0',
        }

        let parameters = Object.assign({}, authParam, params);
        
        if (extParameter !== null) {
            signatureStr += extParameter;
        }

        Object.keys(parameters).sort().forEach(function(key) {
            if(signatureStr == '') {
                signatureStr += key+'='+parameters[key];
            } else {
                signatureStr += '&'+key+'='+parameters[key];
            }
        });

        if (extParameter !== null) {
            paramStr += '&'+extParameter;
        }
        
        Object.keys(params).sort().forEach(function(key) {
            paramStr += '&'+key+'='+parameters[key];
        });

        const oauthSignature = Base64.stringify(hmacSHA1(method+'&'+encodeURIComponent(url)+'&'+encodeURIComponent(signatureStr),this.customerSecret+'&'));

        
        return url+'?oauth_consumer_key='+this.customerKey+'&oauth_nonce='+this.nonce+'&oauth_signature_method=HMAC-SHA1&oauth_timestamp='+this.currentTimestamp+'&oauth_version=1.0&oauth_signature='+oauthSignature+paramStr;
        
    }

    public request(form: any, url: string): Observable<any> {
        const oauth = new OAuth({
            consumer: { key: this.customerKey, secret: this.customerSecret},
            signature_method: 'HMAC-SHA1',
            version: '1.0',
            hash_function(base_string, key) {
                return Base64.stringify(hmacSHA1(base_string, key));
            }
        });

        const oautHeader = oauth.toHeader(oauth.authorize({
            url: `${environment.api}${url}`,
            method: 'POST'
        }));

        const header = new HttpHeaders().set('Authorization', oautHeader.Authorization).set('Content-Type', 'application/json');

        return this.http.post(`${environment.api}${url}`, form, { headers: header });
    }

    public getUrl(url: string): Observable<any> {
        const oauth = new OAuth({
            consumer: { key: this.customerKey, secret: this.customerSecret},
            signature_method: 'HMAC-SHA1',
            version: '1.0',
            hash_function(base_string, key) {
                return Base64.stringify(hmacSHA1(base_string, key));
            }
        });

        const oautHeader = oauth.toHeader(oauth.authorize({
            url: `${environment.api}${url}`,
            method: 'GET'
        }));

        const header = new HttpHeaders().set('Authorization', oautHeader.Authorization).set('Content-Type', 'application/json');

        return this.http.get(`${environment.api}${url}`, { 
            headers: header,
            observe: 'response'
        });
    }
}