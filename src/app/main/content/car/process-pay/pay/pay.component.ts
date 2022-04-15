import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { FormPay } from 'src/app/core/models/conekta/form-pay.model';
import { ProcessPayModel } from 'src/app/core/models/conekta/process-pay.model';
import { TokenErrorConektaModel } from 'src/app/core/models/conekta/token-error-conekta.model';
import { TokenParamConektaModel } from 'src/app/core/models/conekta/token-param-conekta.model';
import { TokenResultConektaModel } from 'src/app/core/models/conekta/token-result-conekta.model';
import { CuponModel } from 'src/app/core/models/cupon.model';
import { OrderModel } from 'src/app/core/models/order.model';
import { WCBillingOrder } from 'src/app/core/models/woocommerce/billing-order.model';
import { WCFormOrder } from 'src/app/core/models/woocommerce/form-order.model';
import { WCShippingLineOrder } from 'src/app/core/models/woocommerce/shipping-line-order.model';
import { WCShippingOrder } from 'src/app/core/models/woocommerce/shipping-order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import { ConektaService } from 'src/app/core/services/conekta.service';
import { appAnimations } from '../../../../../core/animations';
import { CarService } from '../../car.service';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PayComponent {

    public formCard: FormGroup;
    public loading = false;
    
    @Input() metodPay = 1;
    @Input() formShipping: FormGroup;
    @Input() cupons: Array<CuponModel>;
    @Input() totalPay: number = 0;
    @Output() onCompletePay: EventEmitter<{
        order: OrderModel,
        pay: ProcessPayModel
    }> = new EventEmitter();

    constructor(
        private formBuild: FormBuilder,
        private conektaService: ConektaService,
        private snakBar: MatSnackBar,
        private cartService: CartShopService,
        private authService: AuthService,
        private carService: CarService
    ) {
        this.formCard = this.formBuild.group({
            number: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
            name: ['', Validators.required],
            exp_year: [''],
            exp_month: ['', [Validators.required, Validators.pattern('^[0-9]{2}'), Validators.min(1), Validators.max(12)]],
            cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3}')]]
        });

        const currentDate = new Date();

        this.formCard.get('exp_year').setValidators([Validators.required, Validators.pattern('^[0-9]{4}'), Validators.min(currentDate.getFullYear())]);
    }

    public get validForm(): boolean {

        if (this.metodPay == 1) {
            return this.formCard.invalid;
        }

        return false;
    }

    public processPay(): void {
        const formPay = new FormPay();
        const wcOrder = new WCFormOrder();

        this.loading = true;
        formPay.token_card = '';
        formPay.email = this.authService.email ?? this.formShipping?.get('shipping')?.get('email')?.value;
        formPay.first_name = this.formShipping?.get('shipping')?.get('first_name')?.value;
        formPay.last_name = this.formShipping?.get('shipping')?.get('last_name')?.value;
        formPay.type_pay = 'card';
        formPay.line_items = this.cartService.products.value.map((product) => ({
            id: product.id,
            quantity: product.quantityCart
        }));

        if (this.authService.id > 0) {
            wcOrder.customer_id = this.authService.id;
        }

        wcOrder.payment_method = 'conekta_card';
        wcOrder.payment_method_title = 'Coneckta Pay Card';
        wcOrder.set_paid = false;
        wcOrder.billing = WCBillingOrder.fromJson(this.formShipping.get('billing').value);
        wcOrder.shipping = WCShippingOrder.fromJson(this.formShipping.get('shipping').value);
        wcOrder.billing.email = wcOrder.billing.email == '' ? wcOrder.shipping.email : wcOrder.billing.email;
        wcOrder.line_items = [];

        this.cartService.products.value.forEach((product) => {
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
                key: 'shipping_phone',
                value: this.formShipping.get('shipping').get('phone').value
            },
            {
                key: 'required_invoice',
                value: this.formShipping.get('required_invoice').value
            },
            {
                key: 'rfc',
                value: this.formShipping.get('rfc').value
            },
            {
                key: 'business_name',
                value: this.formShipping.get('business_name').value
            },
            {
                key: 'shipping_colony',
                value: this.formShipping.get('shipping').get('colony').value
            },
            {
                key: 'shipping_number_ext',
                value: this.formShipping.get('shipping').get('number_ext').value
            },
            {
                key: 'shipping_number_int',
                value: this.formShipping.get('shipping').get('number_int').value
            },
            {
                key: 'shipping_reference',
                value: this.formShipping.get('shipping').get('reference').value
            },
            {
                key: 'shipping_receiver',
                value: this.formShipping.get('shipping').get('receiver').value
            },
            {
                key: 'billing_colony',
                value: this.formShipping.get('billing').get('colony').value
            },
            {
                key: 'billing_number_ext',
                value: this.formShipping.get('billing').get('number_ext').value
            },
            {
                key: 'billing_number_int',
                value: this.formShipping.get('billing').get('number_int').value
            },
            {
                key: 'brand_office_id',
                value: this.carService.brand
            }
        ];

        const shippingMethod = new WCShippingLineOrder();
        shippingMethod.method_id = this.cartService.shippingMethod.id;
        shippingMethod.method_title = this.cartService.shippingMethod.title;
        shippingMethod.total = this.cartService.shippingMethod.cost.toString();
        formPay.total_shipping = this.cartService.shippingMethod.cost;
        formPay.cuponts = this.processCuponts(this.cartService.products.value.map((product) => ({
            id: product.id,
            quantity: product.quantityCart,
            price: product.price
        })), this.cupons.length > 0 ? this.cupons : []);

        wcOrder.shipping_lines = [ shippingMethod ];

        wcOrder.coupon_lines = this.cupons.length > 0 ? this.cupons.map((cupon) => ({
            code: cupon.code
        })) : [];

        if (this.metodPay == 1) {
            const tokenParam = new TokenParamConektaModel();
            const address = {
                address: {
                    street1: this.formShipping?.get('shipping')?.get('address_1')?.value,
                    street2: this.formShipping?.get('shipping')?.get('number_ext')?.value 
                        + ', int. ' + 
                        this.formShipping?.get('shipping')?.get('number_int')?.value
                        + ', col. ' +
                        this.formShipping?.get('shipping')?.get('colony')?.value,
                    city: this.formShipping?.get('shipping')?.get('city')?.value,
                    state: this.formShipping?.get('shipping')?.get('state')?.value,
                    zip: this.formShipping?.get('shipping')?.get('postcode')?.value,
                    country: this.formShipping?.get('shipping')?.get('country')?.value
                }
            };

            tokenParam.card = Object.assign(address, this.formCard.value);

            this.conektaService.generateToken(tokenParam).subscribe((responseToken) => {
                const tokenResult = TokenResultConektaModel.fromJson(responseToken);

                formPay.token_card = tokenResult.id;

                this.carService.processPay(formPay).subscribe((response) => {
                    const processPay = ProcessPayModel.fromJson(response.order ?? {});
                
                    wcOrder.meta_data.push({
                        key: 'id_reference_pay',
                        value: processPay.id
                    });

                    if (tokenParam.card.number[0] == 4) {
                        wcOrder.meta_data.push({
                            key: 'company_card',
                            value: 'visa'
                        });
                    }

                    if (tokenParam.card.number[0] == 5) {
                        wcOrder.meta_data.push({
                            key: 'company_card',
                            value: 'mastercard'
                        });
                    }

                    if (tokenParam.card.number[0] == 3) {
                        wcOrder.meta_data.push({
                            key: 'company_card',
                            value: 'amex'
                        });
                    }

                    this.storeOrderWC(wcOrder, processPay);

                }, (err) => {
                    this.showAlert(err.code, err.message, 'error');
                    this.loading = false;
                });

            }, (err) => {
                const tokenError = TokenErrorConektaModel.fromJson(err);

                this.showAlert(tokenError.clearCode, tokenError.messageToPurchaser, 'error');
                this.loading = false;
            });
        } else {
            formPay.type_pay = 'oxxo';

            this.carService.processPay(formPay).subscribe((response) => {
                const processPay = ProcessPayModel.fromJson(response.order ?? {});
                
                wcOrder.meta_data.push({
                    key: 'id_reference_pay',
                    value: processPay.id
                });

                wcOrder.payment_method = 'conekta_oxxo';
                wcOrder.payment_method_title = 'Coneckta Pay OXXO';

                this.storeOrderWC(wcOrder, processPay);

            }, (err) => {
                this.showAlert(err.code, err.message, 'error');
                this.loading = false;
            });
        }
    }

    private showAlert(message: string, subMessage: string, type: string): void {
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

    private storeOrderWC(order: WCFormOrder, pay: ProcessPayModel): void {
        this.carService.storeOrderWC(order).subscribe((response) => {
            this.loading = false;
            const order = OrderModel.fromJson(response);
            this.onCompletePay.next({ order, pay});
        }, (err) => {
            this.loading = false;
            this.showAlert(err.code, err.message, 'error');
        });
    }

    private processCuponts(
        items: Array<{
            id: number,
            quantity: number,
            price: number
        }>,
        cuponts: Array<CuponModel>
    ): Array<{
        code: string,
        amount: number
    }> {
        const response = [];

        cuponts.forEach((cupon) => {
            if (cupon.discountType == 'fixed_cart') {
                response.push({
                    code: cupon.code,
                    amount: parseFloat(cupon.amount.toString())
                });
            }

            if (cupon.discountType == 'fixed_cart') {
                response.push({
                    code: cupon.code,
                    amount: this.subTotal * (cupon.amount / 100)
                });
            }

            if (cupon.discountType == 'fixed_product') {
                if (cupon.amount > 1) {
                    response.push({
                        code: cupon.code,
                        amount: items.filter(item => !cupon.excludeProductIds.includes(item.id)).length * cupon.amount
                    });
                } else {
                    response.push({
                        code: cupon.code,
                        amount: items.filter(item => !cupon.excludeProductIds.includes(item.id)).reduce((p, c) => p + ((c.price * cupon.amount) * c.quantity), 0)
                    });
                }
            }
        });

        return response;
    }

    public get subTotal(): number {
        return this.cartService.products.value.reduce((pv, cv) => pv + cv.price * cv.quantityCart, 0);
    }
}
