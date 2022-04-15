import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { appAnimations } from 'src/app/core/animations';
import { BillingModel } from 'src/app/core/models/billing.model';
import { OrderModel } from 'src/app/core/models/order.model';
import { ShippingModel } from 'src/app/core/models/shipping.model';
import { StateModel } from 'src/app/core/models/states.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AddressComponent {

    public loading: boolean = false;
    public loadingData: boolean = true;
    public shipping: ShippingModel = ShippingModel.fromJson({});
    public billing: BillingModel = BillingModel.fromJson({});
    public listStates: Array<StateModel> = [];

    constructor(
        private woocommerService: WoocommerceService,
        private auth: AuthService,
        private service: ProfileService,
        private router: Router
    ) {
        forkJoin([this.service.getStates(), this.service.getCustomer(this.auth.id)]).subscribe((response) => {
            this.setCustomer(response[1]);
            this.setState(response[0]);
            this.loadingData = false;
        });
    }

    public setCustomer(response): void {
        const order = OrderModel.fromJson(response);
        this.shipping = order.shipping;
        this.billing = order.billing;

        order.metaData.forEach(meta => {
            switch(meta.key) {
                case 'shipping_colony':
                    this.shipping.colony = meta.value;
                    break;
                case 'shipping_number_ext':
                    this.shipping.numExt = meta.value;
                    break;
                case 'shipping_number_int':
                    this.shipping.numInt = meta.value;
                    break;
                case 'shipping_email':
                    this.shipping.email = meta.value;
                    break;
                case 'shipping_phone':
                    this.shipping.phone = meta.value;
                    break;
                case 'shipping_reference':
                    this.shipping.reference = meta.value;
                    break;
                case 'billing_colony':
                    this.billing.colony = meta.value;
                    break;
                case 'billing_number_ext':
                    this.billing.numExt = meta.value;
                    break;
                case 'billing_number_int':
                    this.billing.numInt = meta.value;
                    break;
                case 'billing_reference':
                    this.billing.reference = meta.value;
                    break;
            }
        });
    }

    public setState(response): void {
        this.listStates = Array.from(response ?? []).map((state) => StateModel.fromJson(state));
            this.listStates.sort((a, b) => {
                if (a.value > b.value) {
                    return 1;
                }

                return 0;
            });

        this.service.listStates = this.listStates;
    }

    public goTo(url: string): void {

        if (url == 'envio') {
            this.service.address = this.shipping;
        } else {
            this.service.address = this.billing;
        }

        this.router.navigate(['perfil/mis-direcciones', url]);
    }

    public getState(code: string): string {
        return this.listStates.find(state => state.code == code)?.value;
    }
}
