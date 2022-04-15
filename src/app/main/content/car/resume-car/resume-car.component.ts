import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from 'src/app/core/models/product.model';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import { ConektaService } from 'src/app/core/services/conekta.service';
import { appAnimations } from '../../../../core/animations';
import { CarService } from '../car.service';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { ShippingZoneModel } from 'src/app/core/models/woocommerce/shipping-zone.model';
import { ShippingMethodModel } from 'src/app/core/models/woocommerce/shipping-method.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertShippingComponent } from 'src/app/core/components/alert-shipping/alert-shipping.component';
declare var Conekta:any;

@Component({
    selector: 'app-resume-car',
    templateUrl: './resume-car.component.html',
    styleUrls: ['./resume-car.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ResumeCarComponent {

    public listProduct: MatTableDataSource<ProductModel> = new MatTableDataSource([]);
    public columnTable: Array<String> = ['delete', 'product', 'price', 'quantity', 'subtotal'];
    public iconTruck = faTruck;
    public editZipCode = true;
    public zipCode: string = '';
    public loadingZipCode = false;
    public shippingZone: ShippingZoneModel = ShippingZoneModel.fromJson({});
    public costShipping: number = 0;
    public loadingShipping: boolean = false;

    constructor(
        private cartService: CartShopService,
        private carService: CarService,
        private dialog: MatDialog
    ) {
        this.listProduct.data = this.cartService.products.value;
        this.cartService.products.subscribe((data) => {
            this.listProduct.data = data;
        });
    }

    public getWithDiscount(product: ProductModel): boolean {
        return product.porcentDiscount > 0;
    }

    public quantity(add: boolean, product: ProductModel): void {
        if ((product.quantityCart == 1 && !add) || (product.quantityCart == product.stockQuantity && add)) {
            return;
        }

        if (add) {
            product.quantityCart++;
        } else {
            product.quantityCart--;
        }

        this.applyZipCode();
    }

    public get subTotal(): number {
        return this.listProduct.data.reduce((pv, cv) => pv + cv.price * cv.quantityCart, 0)
    }

    public get total(): number {
        return this.subTotal + this.costShipping;
    }

    public getColor(product: ProductModel): string {
        const index = product.attributes.findIndex(attribute => attribute.name === 'Color');

        if (index >= 0) {
            const color = product.attributes[index].options[0];
            const moreone = color.split(':').length > 1;
            return color.split(':')[moreone ? 1 : 0];
        }

        return '';
    }

    public getSize(product: ProductModel): string {
        const index = product.attributes.findIndex(attribute => attribute.name === 'Tamaño');

        if (index >= 0) {
            return product.attributes[index].options[0];
        }

        return '';
    }

    public deleteItem(product: ProductModel): void {
        this.cartService.removeItem(product);
        this.listProduct.data = this.cartService.products.value;
    }

    public changeZipCode(): void {
        this.editZipCode = true;
    }

    public applyZipCode(): void {
        this.editZipCode = false;

        this.loadingShipping = true;

        setTimeout(() => {
            this.cartService.setZipCode(this.zipCode);

            this.carService.getShippingZone(this.zipCode).subscribe((response) => {
                this.shippingZone = ShippingZoneModel.fromJson(response);

                const freeShipping = this.shippingZone.shippingMethods.find((method) => method.id === 'free_shipping') as ShippingMethodModel;

                if (!!freeShipping && this.subTotal >= freeShipping.minAmount) {
                    this.cartService.shippingMethod = freeShipping;
                    this.costShipping = 0;
                } else {
                    const flatShipping = this.shippingZone.shippingMethods.find((methid) => methid.id === 'flat_rate') as ShippingMethodModel;

                    if (!!flatShipping) {
                        this.costShipping = flatShipping.cost;
                        this.cartService.shippingMethod = flatShipping;
                    }
                }

                this.loadingShipping = false;

                if (this.costShipping == -1) {
                    this.dialog.open(AlertShippingComponent);
                }
            }, err => {
                this.loadingShipping = false;
                this.editZipCode = true
            });
        }, 500);
    }
}
