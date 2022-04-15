import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BillingModel } from 'src/app/core/models/billing.model';
import { ShippingModel } from 'src/app/core/models/shipping.model';
import { StateModel } from 'src/app/core/models/states.model';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    public address: ShippingModel | BillingModel;
    public listStates: Array<StateModel> = [];

    constructor(
        private http: HttpClient,
        private wcService: WoocommerceService
    ) {}

    public getOrderByCustomer(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', 'wp-json/wc/v3/orders', { customer: id });

        return this.http.get(link);
    }

    public getOrderById(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', `wp-json/wc/v3/orders/${id}`, {});

        return this.http.get(link);
    }

    public getCustomer(id: number): Observable<any> {
        const link = this.wcService.encodeUrl('GET', `wp-json/wc/v3/customers/${id}`, {});

        return this.http.get(link);
    }

    public setAddress(address: any) {
        this.address = address;
    }

    public getStates(): Observable<any> {
        return this.http.get(`${environment.api}wp-json/wc_custom/states`);
    }
}
