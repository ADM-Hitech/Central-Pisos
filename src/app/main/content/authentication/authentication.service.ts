import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        private http: HttpClient
    ) {}

    public login(form: { username: string, password: string } ): Observable<any> {
        return this.http.post(`${environment.api}wp-json/wp/login`, form);
    }

    /**
     * forgorPassword
     */
    public forgorPassword(email: string): Observable<any> {
        return this.http.post(`${environment.api}wp-json/wp/forgot-password`, { email });
    }
}
