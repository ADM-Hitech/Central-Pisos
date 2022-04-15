import { Injectable } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakBarAlertComponent } from '../components/snak-bar-alert/snak-bar-alert.component';
import { IndexDBService } from './index-db.service';
import { ShippingMethodModel } from '../models/woocommerce/shipping-method.model';

@Injectable({
    providedIn: 'root'
})
export class CartShopService {

    public categories: Array<CategoryModel> = [];
    public categoriesSub: BehaviorSubject<Array<CategoryModel>> = new BehaviorSubject([]);
    public products: BehaviorSubject<Array<ProductModel>> = new BehaviorSubject([]);
    public zipCode: string;
    public shippingMethod: ShippingMethodModel;

    constructor(private snakBar: MatSnackBar, private indexDBService: IndexDBService) {

        this.indexDBService.readyDb.subscribe((ready) => {
            if (ready) {
                this.indexDBService.getAllCategories().subscribe((response) => {
                    this.categories = response.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) return -1;

                        return 0;
                    });

                    this.categoriesSub.next(this.categories);
                });

                this.indexDBService.getAllItems().subscribe((response) => {
                    this.products.next(response.map(product => {
                        const parseProduct = new ProductModel();
                        Object.keys(product).forEach((key) => {
                            parseProduct[key] = product[key];
                        });

                        return parseProduct;
                    }));
                }, (error) => {
                    console.log(error);
                });

                this.indexDBService.zipCode('0');

            }
        });
    }

    public addItem(product: ProductModel): void {
        const items = this.products.value;
        const index = items.findIndex(p => p.id === product.id);
        if (index >= 0) {
            if (items[index].quantityCart < product.stockQuantity) {
                items[index].quantityCart++;

                this.indexDBService.updateItem(items[index]);
            }
        } else {
            items.push(product);
            this.indexDBService.addItem(product);
        }

        this.snakBar.openFromComponent(SnakBarAlertComponent, {
            data: {
                message: 'AGREGADO',
                subMessage: 'El producto se a agregado en su carrito',
                type: 'success'
            },
            panelClass: 'snack-message',
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 1500
        });

        this.products.next(items);
    }

    public addCategory(category: CategoryModel): void {
        const items = this.categories;
        const index = items.findIndex((cat) => cat.id === category.id);

        if (index >= 0) {
            this.indexDBService.updateCategory(category);
        } else {
            this.indexDBService.addCategory(category);
        }
    }

    public removeItem(product: ProductModel): void {
        const items = this.products.value;
        const index = items.findIndex(p => p.id === product.id);
        if (index >= 0) {

            this.indexDBService.deleteItem(items[index]);

            items.splice(index, 1);
            this.products.next(items);
        }
    }

    public clear(): void {
        const products = this.products.value;

        products.forEach((product) => {
            this.removeItem(product);
        });
    }

    public setZipCode(code: string): void {
        this.zipCode = code;
        this.indexDBService.zipCode(code);
    }
}