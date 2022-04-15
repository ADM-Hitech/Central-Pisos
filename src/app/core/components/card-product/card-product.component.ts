import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ProductModel } from "../../models/product.model";
import { CartShopService } from "../../services/cart-shop.service";

@Component({
    selector: 'app-card-product',
    templateUrl: './card-product.component.html',
    styleUrls: ['./card-product.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CardProductComponent implements OnInit {

    @Input() product: ProductModel;
    @Input() withBorder: boolean = false;

    constructor(
        private cartService: CartShopService,
        private route: Router
    ) {}

    ngOnInit() {}

    public get category(): string {
        if (this.product.categories.length <= 0) return 'Sin Categoria';

        return this.product.categories[0].name;
    }

    public get withDiscount(): boolean {
        return this.product.porcentDiscount > 0;
    }

    public addToCart(): void {
        this.cartService.addItem(this.product);
    }

    public details(id: number): void {
        this.route.navigate([`/productos/${id}`]);
    }
}