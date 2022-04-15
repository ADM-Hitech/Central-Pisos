import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(
        private http: HttpClient,
        private wcService: WoocommerceService
    ) {}

    public get(order: 'desc' | 'asc', orderby: string, perPage: number, page: number, filter = ''): Observable<any> {

        var parameter = {
            order,
            orderby,
            per_page: perPage ?? 20,
            page: page ?? 1,
            search: encodeURIComponent(filter)
        };

        if (filter === '') {
            delete parameter.search;
        }

        const link = this.wcService.encodeUrl('GET', 'wp-json/wc/v3/products', parameter);
        return this.http.get(link, { observe: 'response' });
    }

    public getById(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', `wp-json/wc/v3/products/${id}`, {});

        return this.http.get(link);
    }

    public getVariationsForProduct(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', `wp-json/wc/v3/products/${id}/variations`, {});

        return this.http.get(link);
    }

    public getByCategory(id: number, order: 'desc' | 'asc' = 'desc', orderby: string = '', perPage: number = 20, page: number = 1, filters: string = ''): Observable<any> {
        var parameter = {
            order,
            orderby,
            per_page: perPage ?? 20,
            page: page ?? 1,
            search: '',
            category: id
        };

        if (orderby === '') {
            delete parameter.orderby;
        }

        if (filters === '') {
            delete parameter.search;
        }

        if (parameter.search === '') {
            delete parameter.search;
        }

        var params = Object.entries(parameter).map(([i, v]) => `${i}=${v}`).join('&');

        if (filters !== '') {
            params += '&'+filters
        }

        return this.wcService.getUrl(`wp-json/wc/v3/products?${params}`);

        const link = this.wcService.encodeUrl('GET', 'wp-json/wc/v3/products', parameter, filters);

        
        return this.http.get(link, { observe: 'response' });
    }

    public getCategories(): Observable<any> {
        const link = this.wcService.encodeUrl('GET', 'wp-json/wc/v3/products/categories', { per_page: 100 });

        return this.http.get(link);
    }

    public getCategoryById(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', `wp-json/wc/v3/products/categories/${id}`, { });

        return this.http.get(link);
    }

    public getAttributes(): Observable<any> {
        const link = this.wcService.encodeUrl('GET', 'wp-json/wc/v3/products/attributes', { per_page: 100 });

        return this.http.get(link);
    }

    public getTermsByAttribute(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', `wp-json/wc/v3/products/attributes/${id}/terms`, { per_page: 100 });

        return this.http.get(link);
    }

    public getReviewForProduct(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', `wp-json/wc/v3/products/reviews`, { product: id });

        return this.http.get(link);
    }
}
