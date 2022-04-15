import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { Constant } from 'src/app/core/constant';
import { CuponModel } from 'src/app/core/models/cupon.model';
import { StateModel } from 'src/app/core/models/states.model';
import { WCBillingOrder } from 'src/app/core/models/woocommerce/billing-order.model';
import { WCFormOrder } from 'src/app/core/models/woocommerce/form-order.model';
import { WCShippingLineOrder } from 'src/app/core/models/woocommerce/shipping-line-order.model';
import { WCShippingOrder } from 'src/app/core/models/woocommerce/shipping-order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import { Utils } from 'src/app/core/utils';
import { appAnimations } from '../../../../../core/animations';
import { CarService } from '../../car.service';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ShippingComponent {

    @Input() form: FormGroup = new FormGroup({});
    @Input() cupons: Array<CuponModel>;
    @Input() listStates: Array<StateModel> = [];
    @Output() onChangeRequireInvoice: EventEmitter<boolean> = new EventEmitter(false);
    @Output() onContinue: EventEmitter<number> = new EventEmitter();

    public loading: boolean = false;
    public constant: Constant = new Constant();

    constructor(
        private carService: CarService,
        private shopService: CartShopService,
        private snakBar: MatSnackBar,
        private authService: AuthService,
        private router: Router
    ) {}

    public changeRequireInvoice(event: any): void {
        this.onChangeRequireInvoice.emit(event.value);
    }

    public isValid(control: string): boolean {
        return this.form?.get(control)?.valid;
    }

    public isValidForShipping(control: string): boolean {
        return this.form?.get('shipping')?.get(control)?.valid;
    }

    public isValidForBilling(control: string): boolean {
        return this.form?.get('billing')?.get(control)?.valid;
    }

    public get requireInvoice(): boolean {
        return this.form?.get('required_invoice').value as boolean;
    }

    public continue(): void {
        this.loading = true;
        var shipping = this.form.get('shipping');
        var address = `${shipping.get('address_1').value} ${shipping.get('number_ext').value}, ${shipping.get('colony').value}, ${shipping.get('postcode').value} ${shipping.get('city').value}`;
        this.carService.getGeoPosition(address).subscribe((response) => {
            this.loading = false;

            if (response.status === 'ZERO_RESULTS') {
                this.showAlert('Dirección Invalida', 'Por favor ingrese una dirección valida', 'warning');
                return;
            }

            const result = response.results[0];
            this.carService.geometricposition.formattedAddress = result.formatted_address;
            this.carService.geometricposition.location = result.geometry.location;
            
            this.carService.brand = this.firstBrand(this.carService.geometricposition.location);

            if (this.shopService.shippingMethod.cost == -1) {
                this.processOrder();
            } else {
                this.onContinue.next(2);
            }
        });
    }

    public changeCopyAddress(event: any): void {
        if (!event.value) {
            this.form.get('billing').get('postcode').setValue(this.form.get('shipping').get('postcode').value);
            this.form.get('billing').get('state').setValue(this.form.get('shipping').get('state').value);
            this.form.get('billing').get('city').setValue(this.form.get('shipping').get('city').value);
            this.form.get('billing').get('colony').setValue(this.form.get('shipping').get('colony').value);
            this.form.get('billing').get('address_1').setValue(this.form.get('shipping').get('address_1').value);
            this.form.get('billing').get('number_ext').setValue(this.form.get('shipping').get('number_ext').value);
            this.form.get('billing').get('number_int').setValue(this.form.get('shipping').get('number_int').value);
            this.form.get('billing').get('email').setValue(this.form.get('shipping').get('email').value);
            this.form.get('billing').get('phone').setValue(this.form.get('shipping').get('phone').value);
        } else {
            this.form.get('billing').get('postcode').setValue('');
            this.form.get('billing').get('state').setValue('');
            this.form.get('billing').get('city').setValue('');
            this.form.get('billing').get('colony').setValue('');
            this.form.get('billing').get('address_1').setValue('');
            this.form.get('billing').get('number_ext').setValue('');
            this.form.get('billing').get('number_int').setValue('');
            this.form.get('billing').get('email').setValue('');
            this.form.get('billing').get('phone').setValue('');
        }
    }

    private firstBrand(location: { lat: number, lng: number}): number {
        let brandid = 0;
        let distancefinal;
        this.constant.branches.forEach((brand) => {
            var distance = Utils.calculateDistance(location, { lat: brand.latitud, lng: brand.longitud });

            if (distance < distancefinal || typeof distancefinal == 'undefined') {
                distancefinal = distance;
                brandid = brand.id;
            }
        });

        return brandid;
    }

    public showAlert(message: string, subMessage: string, type: 'error' | 'warning' | 'success') {
        this.snakBar.openFromComponent(SnakBarAlertComponent, {
            data: {
                message: message,
                subMessage: subMessage,
                type: type
            },
            panelClass: 'snack-message',
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3500
        });
    }

    public processOrder(): void {
        const wcOrder = new WCFormOrder();

        if (this.authService.id > 0) {
            wcOrder.customer_id = this.authService.id;
        }

        wcOrder.status = 'order-for-approve';
        wcOrder.set_paid = false;
        wcOrder.billing = WCBillingOrder.fromJson(this.form.get('billing').value);
        wcOrder.shipping = WCShippingOrder.fromJson(this.form.get('shipping').value);
        wcOrder.billing.email = wcOrder.billing.email == '' ? wcOrder.shipping.email : wcOrder.billing.email;
        wcOrder.line_items = [];

        this.shopService.products.value.forEach((product) => {
            const line = {
                product_id: product.id,
                quantity: product.quantityCart
            };

            if ('variation' in product) {
                line['variation_id'] = product['variation']
            }

            wcOrder.line_items.push(line);
        });

        wcOrder.meta_data = [
            {
                key: 'required_invoice',
                value: this.form.get('required_invoice').value
            },
            {
                key: 'rfc',
                value: this.form.get('rfc').value
            },
            {
                key: 'business_name',
                value: this.form.get('business_name').value
            },
            {
                key: 'shipping_colony',
                value: this.form.get('shipping').get('colony').value
            },
            {
                key: 'shipping_number_ext',
                value: this.form.get('shipping').get('number_ext').value
            },
            {
                key: 'shipping_number_int',
                value: this.form.get('shipping').get('number_int').value
            },
            {
                key: 'shipping_reference',
                value: this.form.get('shipping').get('reference').value
            },
            {
                key: 'shipping_receiver',
                value: this.form.get('shipping').get('receiver').value
            },
            {
                key: 'billing_colony',
                value: this.form.get('billing').get('colony').value
            },
            {
                key: 'billing_number_ext',
                value: this.form.get('billing').get('number_ext').value
            },
            {
                key: 'billing_number_int',
                value: this.form.get('billing').get('number_int').value
            },
            {
                key: 'brand_office_id',
                value: this.carService.brand
            }
        ];

        const shippingMethod = new WCShippingLineOrder();
        shippingMethod.method_id = this.shopService.shippingMethod.id;
        shippingMethod.method_title = this.shopService.shippingMethod.title;
        shippingMethod.total = this.shopService.shippingMethod.cost.toString();

        wcOrder.shipping_lines = [ shippingMethod ];

        wcOrder.coupon_lines = this.cupons.length > 0 ? this.cupons.map((cupon) => ({
            code: cupon.code
        })) : [];
        
        this.storeOrderWC(wcOrder);
    }

    private storeOrderWC(order: WCFormOrder) {
        this.loading = true;
        this.carService.storeOrderWC(order).subscribe((response) => {
            this.loading = false;
            this.showAlert('Orden Enviada', 'Su pedido fue enviado, se le notificara por correo si el pedido fue aprovado.', 'success');
            this.shopService.clear();
            this.router.navigate(['/']);
        }, (err) => {
            this.loading = false;
            this.showAlert(err.code, err.message, 'error');
        });
    }
}
