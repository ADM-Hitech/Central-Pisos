import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constant } from '../../../core/constant';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    constructor(
        private http: HttpClient
    ) {}

    public contact(form: { name: string, email: string, telephone: string, message: string } ): Observable<any> {
        return this.http.post(`${environment.api}wp-json/wp/contact`, form);
    }
}