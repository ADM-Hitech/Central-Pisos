import { AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, ElementRef, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { CuponModel } from 'src/app/core/models/cupon.model';
import { OrderModel } from 'src/app/core/models/order.model';
import { ProductVariationModel } from 'src/app/core/models/product-variation.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { StateModel } from 'src/app/core/models/states.model';
import { ShippingMethodModel } from 'src/app/core/models/woocommerce/shipping-method.model';
import { ShippingZoneModel } from 'src/app/core/models/woocommerce/shipping-zone.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import { appAnimations } from '../../../../core/animations';
import { CarService } from '../car.service';
import { DomPortalOutlet, CdkPortal, ComponentPortal} from '@angular/cdk/portal';
import { ReceiptOfPaymentComponent } from 'src/app/core/components/receipt-of-payment/receipt-of-payment.component';
import { ProcessPayModel } from 'src/app/core/models/conekta/process-pay.model';
import { PaymentMethodOxxoModel } from 'src/app/core/models/conekta/payment-method-oxxo.model';
import { ReceiptOfPaymentCardComponent } from 'src/app/core/components/receipt-of-payment-card/receipt-of-payment-card.component';
import { WCBillingOrder } from 'src/app/core/models/woocommerce/billing-order.model';
import { WCShippingOrder } from 'src/app/core/models/woocommerce/shipping-order.model';

@Component({
    selector: 'app-process-pay',
    templateUrl: './process-pay.component.html',
    styleUrls: ['./process-pay.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ProcessPayComponent implements AfterViewInit {

    @ViewChild('contentSteps') contentSteps: ElementRef;

    public currentStep: number = 1;
    public cupon: string = '';
    public cupons: Array<CuponModel> = [];
    public loadingCupon: boolean = false;
    public form: FormGroup;
    public listStates: Array<StateModel> = [];
    public minWidthForm: number = 0;
    public loading = true;
    public order = OrderModel.fromJson({});
    private infopay: ProcessPayModel;
    public metodPay = 1;

    constructor(
        private carService: CarService,
        private snakBar: MatSnackBar,
        private cartShop: CartShopService,
        private formBuild: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef,
        private injector: Injector
    ) {
        this.form = this.formBuild.group({
            payment_method: [''],
            payment_method_title: [''],
            set_paid: [''],
            billing: this.formBuild.group({
                first_name: [''],
                last_name: [''],
                address_1: [''],
                address_2: [''],
                city: [''],
                state: [''],
                postcode: [this.cartShop.zipCode ?? ''],
                country: ['MX'],
                email: ['', [Validators.email]],
                phone: [''],
                colony: [''],
                number_ext: [''],
                number_int: ['']
            }),
            shipping: this.formBuild.group({
                first_name: ['', Validators.required],
                last_name: ['', Validators.required],
                address_1: ['', Validators.required],
                address_2: [''],
                city: ['', Validators.required],
                state: ['', Validators.required],
                postcode: ['', Validators.required],
                country: ['MX'],
                colony: ['', Validators.required],
                number_ext: [''],
                number_int: [''],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', Validators.required],
                reference: [''],
                receiver: ['']
            }),
            line_items: this.formBuild.array([]),
            shipping_lines: this.formBuild.array([]),
            required_invoice: [false, Validators.required],
            rfc: [''],
            business_name: [''],
            copy_shipping_to_billing: [true]
        });

        this.form.valueChanges.pipe(debounceTime(800)).subscribe((val) => {
            this.getShippingMethod(val.shipping.postcode);
        });

        if (this.cartShop.products.value.length <= 0) {
            this.router.navigate(['/productos']);
        }
    }

    public ngAfterViewInit(): void {
        const width = this.contentSteps.nativeElement.offsetWidth;
        const fullWidth = this.contentSteps.nativeElement.offsetWidth * 100 / 60;
        this.minWidthForm = (fullWidth * .55) - 24;

        forkJoin([
            this.carService.getStates(), 
            this.carService.getCustomer(this.authService.id)
        ]).subscribe(response => {
            this.getStates(response[0]);
            
            if (!!this.cartShop.zipCode) {
                this.form.get('shipping').get('postcode').setValue(this.cartShop.zipCode);
            }

            if (this.authService.id > 0) {
                this.getCustomer(response[1]);
            }
        }, (err) => {}, () => {
            this.loading = false;
        });
    }

    public applyCupon(): void {

        if (this.cupon == '') return;

        this.loadingCupon = true;

        this.carService.getCuponByCode(this.cupon).subscribe((response) => {
            const listCupons = Array.from(response ?? []).map((cup) => CuponModel.fromJson(cup));

            if (listCupons.length > 0) {
                if (!listCupons[0].expired) {
                    var index = this.cupons.findIndex((cupon) => cupon.id == listCupons[0].id);

                    if (index < 0) {
                        const existIndividual = this.cupons.filter((cupon) => cupon.individualUse);

                        if (existIndividual.length > 0 && listCupons[0].individualUse) {
                            this.showAlert('ERROR', 'Uno o mas cupones no se permite utilizar con otro cupon', 'error');
                            return;
                        }

                        if (listCupons[0].minimunAmount > 0 && listCupons[0].minimunAmount > this.subTotal) {
                            this.showAlert('ERROR', `El cupon solo aplica en compras mayores a ${listCupons[0].minimunAmount}`, 'error');
                            return;
                        }

                        if (listCupons[0].maximunAmount > 0 && this.subTotal > listCupons[0].maximunAmount) {
                            this.showAlert('ERROR', `El cupon solo aplica en compras menores a ${listCupons[0].maximunAmount}`, 'error');
                            return;
                        }

                        this.cupons.push(listCupons[0]);
                        this.cupon = '';

                    } else {
                        this.showAlert('ERROR', 'El cupon ya se encuentra agregado','error');
                    }

                } else {
                    this.showAlert('ERROR', 'El cupon a expirado','error');
                }
            } else {
                this.showAlert('ERROR', 'No se a encontrado el cupón','error');
            }
        }, (err) => {

        }, () => {
            this.loadingCupon = false;
        });
    }

    public get discountByCupons(): number {
        var total = 0;

        this.cupons.forEach((cupon) => {
            if (cupon.discountType == 'fixed_cart') {
                total += parseFloat(cupon.amount.toString());
            }

            if (cupon.discountType == 'percent') {
                total += this.subTotal * (cupon.amount / 100);
            }

            if (cupon.discountType == 'fixed_product') {
                if (cupon.amount > 1) {
                    total += this.cartShop.products.value.filter(item => !cupon.excludeProductIds.includes(item.id)).length * cupon.amount;
                } else {
                    this.cartShop.products.value.forEach((item) => {
                        if (!cupon.excludeProductIds.includes(item.id)) {
                            total += (item.price * cupon.amount) * item.quantityCart;
                        }
                    });
                }
            }

        });

        return total;
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

    public get subTotal(): number {
        return this.products.reduce((pv, cv) => pv + cv.price * cv.quantityCart, 0);
    }

    public removeCupon(index: number) {
        this.cupons.splice(index, 1);
    }

    public get products(): Array<ProductModel | ProductVariationModel> {
        return this.cartShop.products.value;
    }

    private get formLineItems(): FormArray {
        return this.form.get('line_items') as FormArray;
    }

    private get formShippingLines(): FormArray {
        return this.form.get('shipping_lines') as FormArray;
    }

    public addLineItem(productId: number,quantity: number): void {
        this.formLineItems.push(this.formBuild.group({
            product_id: [productId],
            quantity: [quantity]
        }));
    }

    public addShippingLine(methodId: number, methodTitle: string, total: number): void {
        this.formShippingLines.push(this.formBuild.group({
            method_id: [methodId],
            method_title: [methodTitle],
            total: [total]
        }));
    }

    private getStates(response: any): void {
        this.listStates = Array.from(response ?? []).map((state) => StateModel.fromJson(state));
            this.listStates.sort((a, b) => {
                if (a.value > b.value) {
                    return 1;
                }

                return 0;
            });
    }

    public changeRequiredInvoice(event: boolean): void {
        const billing = this.form.get('billing');

        this.form.get('billing').clearAsyncValidators();
        this.form.get('rfc').clearAsyncValidators();
        this.form.get('business_name').clearAsyncValidators();

        this.form.get('billing').get('first_name').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('last_name').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('address_1').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('city').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('state').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('postcode').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('email').setValidators(event ? [Validators.required, Validators.email] : []);
        this.form.get('billing').get('phone').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('colony').setValidators(event ? [Validators.required] : []);
        this.form.get('billing').get('number_ext').setValidators(event ? [Validators.required] : []);

        if (billing.get('number_ext').value === '') {
            billing.get('number_ext').setValue('');
        }

        if (billing.get('postcode').value === '') {
            billing.get('postcode').setValue('');
        }

        if (billing.get('state').value === '') {
            billing.get('state').setValue('');
        }

        if (billing.get('city').value === '') {
            billing.get('city').setValue('');
        }

        if (billing.get('address_1').value === '') {
            billing.get('address_1').setValue('');
        }

        if (billing.get('email').value === '') {
            billing.get('email').setValue('');
        }

        if (billing.get('phone').value === '') {
            billing.get('phone').setValue('');
        }

        if (billing.get('colony').value === '') {
            billing.get('colony').setValue('');
        }


        this.form.get('rfc').setValidators(event ? [Validators.required] : []);
        this.form.get('business_name').setValidators(event ? [Validators.required] : []);
        
        if (this.form.get('rfc').value == '') {
            this.form.get('rfc').setValue('');
        }

        if (this.form.get('business_name').value == '') {
            this.form.get('business_name').setValue('');
        }

        this.form.get('billing').updateValueAndValidity();
        this.form.updateValueAndValidity();

        console.log(this.form);
    }

    public changeStep(index: number): void {
        this.currentStep = index;
    }

    public getCustomer(response: any): void {
        this.form.get('billing').get('first_name').setValue(response?.billing?.first_name);
        this.form.get('billing').get('last_name').setValue(response?.billing?.last_name);
        this.form.get('billing').get('address_1').setValue(response?.billing?.address_1);
        this.form.get('billing').get('city').setValue(response?.billing?.city);
        this.form.get('billing').get('postcode').setValue(response?.billing?.postcode);
        this.form.get('billing').get('country').setValue(response?.billing?.country);
        this.form.get('billing').get('state').setValue(response?.billing?.state);
        this.form.get('billing').get('email').setValue(response?.billing?.email);
        this.form.get('billing').get('phone').setValue(response?.billing?.phone);
    
        this.form.get('shipping').get('first_name').setValue(response?.shipping?.first_name);
        this.form.get('shipping').get('last_name').setValue(response?.shipping?.last_name);
        this.form.get('shipping').get('address_1').setValue(response?.shipping?.address_1);
        this.form.get('shipping').get('city').setValue(response?.shipping?.city);
        this.form.get('shipping').get('postcode').setValue(response?.shipping?.postcode);
        this.form.get('shipping').get('country').setValue(response?.shipping?.country);
        this.form.get('shipping').get('state').setValue(response?.shipping?.state);

        if (!!this.cartShop.zipCode) {
            this.form.get('shipping').get('postcode').setValue(this.cartShop.zipCode);
        }

        response.meta_data.forEach(meta => {
            switch(meta.key) {
                case 'shipping_colony':
                    this.form.get('shipping').get('colony').setValue(meta.value);
                    break;
                case 'shipping_number_ext':
                    this.form.get('shipping').get('number_ext').setValue(meta.value);
                    break;
                case 'shipping_number_int':
                    this.form.get('shipping').get('number_int').setValue(meta.value);
                    break;
                case 'shipping_email':
                    this.form.get('shipping').get('email').setValue(meta.value);
                    break;
                case 'shipping_phone':
                    this.form.get('shipping').get('phone').setValue(meta.value);
                    break;
                case 'shipping_reference':
                    this.form.get('shipping').get('reference').setValue(meta.value);
                    break;
                case 'billing_colony':
                    this.form.get('billing').get('colony').setValue(meta.value);
                    break;
                case 'billing_number_ext':
                    this.form.get('billing').get('number_ext').setValue(meta.value);
                    break;
                case 'billing_number_int':
                    this.form.get('billing').get('number_int').setValue(meta.value);
                    break;
            }
        });
    }

    public completePay(data: {order: OrderModel, pay: ProcessPayModel}): void {
        this.order = data.order;
        this.infopay = data.pay;
        this.currentStep = 3;

        this.order.lineItems = this.order.lineItems.map((item) => {
            const product = this.products.find((pro) => pro.id == item.productId);

            if (product) {
                item.image = product.firtsImage;
            }
            
            return item;
        });

        this.cartShop.clear();
    }

    public get costShipping(): number {
        return this.cartShop?.shippingMethod?.cost ?? 0;
    }

    public getShippingMethod(zipcode: string): void {

        if (this.cartShop.zipCode == zipcode) return;

        this.cartShop.setZipCode(zipcode);

        this.carService.getShippingZone(zipcode).subscribe((response) => {
            let shippingZone = ShippingZoneModel.fromJson(response);

            const freeShipping = shippingZone.shippingMethods.find((method) => method.id === 'free_shipping') as ShippingMethodModel;

            if (!!freeShipping && this.subTotal >= freeShipping.minAmount) {
                this.cartShop.shippingMethod = freeShipping;
            } else {
                const flatShipping = shippingZone.shippingMethods.find((methid) => methid.id === 'flat_rate') as ShippingMethodModel;

                if (!!flatShipping) {
                    this.cartShop.shippingMethod = flatShipping;
                }
            }
        });
    }

    public get totalPay(): number {
        return (this.subTotal - this.discountByCupons) + this.costShipping;
    }

    public showReceiptOfPayment(): void {
        if (this.metodPay == 1) {
            this.showPayCard();
            return;
        }

        const newWindow = window.open('', '', 'width=500,height=700');
        const host = new DomPortalOutlet(
            newWindow.document.body,
            this.componentFactoryResolver,
            this.applicationRef,
            this.injector
        );

        const componentRef = host.attach(new ComponentPortal(ReceiptOfPaymentComponent));
        componentRef.instance.totalPay = this.order.total - this.order.totalTax;
        componentRef.instance.reference = (this.infopay.charges.data[0].paymentMethod as PaymentMethodOxxoModel).reference;
    }

    public showPayCard(): void {
        const newWindow = window.open('', '', 'width=500,height=700');
        const host = new DomPortalOutlet(
            newWindow.document.body,
            this.componentFactoryResolver,
            this.applicationRef,
            this.injector
        );

        const componentRef = host.attach(new ComponentPortal(ReceiptOfPaymentCardComponent));
        componentRef.instance.totalPay = this.order.total - this.order.totalTax;
        componentRef.instance.totalShipping = this.costShipping;
        componentRef.instance.billing = WCBillingOrder.fromJson(this.form.get('billing').value);
        componentRef.instance.shipping = WCShippingOrder.fromJson(this.form.get('shipping').value);
        componentRef.instance.order = this.order;
        componentRef.instance.cupons = this.cupons;
        componentRef.instance.products = this.products;
    }
}