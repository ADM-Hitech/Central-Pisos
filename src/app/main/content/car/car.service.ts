import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormPay } from 'src/app/core/models/conekta/form-pay.model';
import { Geoposition } from 'src/app/core/models/geoposition';
import { WCFormOrder } from 'src/app/core/models/woocommerce/form-order.model';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    public geometricposition: Geoposition = new Geoposition();
    public brand: number;

    constructor(
        private http: HttpClient,
        private wcService: WoocommerceService,
    ) {}

    public getCuponByCode(code: string): Observable<any> {
        const link = this.wcService.encodeUrl('GET', 'wp-json/wc/v3/coupons', { code });

        return this.http.get(link);
    }

    public getStates(): Observable<any> {
        return this.http.get(`${environment.api}wp-json/wc_custom/states`);
    }

    public processPay(form: FormPay): Observable<any> {
        return this.http.post(`${environment.api}wp-json/api_conekta/pay`, form);
    }

    public storeOrderWC(form: WCFormOrder | any): Observable<any> {
        return this.wcService.request(form, 'wp-json/wc/v3/orders');
    }

    public getCustomer(id: number): Observable<any> {
        return this.http.post(`${environment.api}wp-json/wc_custom/user`, { user_id: id });
    }

    public getShippingZone(zipCode: string): Observable<any> {
        return this.http.get(`${environment.api}wp-json/wc_custom/shipping-zone?cp=${zipCode}`);
    }

    public getGeoPosition(address: string): Observable<any> {
        return this.http.get(`${environment.apiGoogle}&address=${address}`);
    }
}
