import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';
import { Constant } from '../../../core/constant';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(
        private http: HttpClient,
        private wcService: WoocommerceService
    ) {}

    public topProductSale(): Observable<any> {
        const link = this.wcService.encodeUrl('GET', 'wp-json/wc/v3/products', { orderby: 'popularity', per_page: 5});

        return this.http.get(link);
    }
}
