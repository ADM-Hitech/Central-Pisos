import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { appAnimations } from 'src/app/core/animations';
import { CategoryModel } from 'src/app/core/models/category.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import { HomeService } from '../home.service';

@Component({
    selector: 'app-content-home',
    templateUrl: './content-home.component.html',
    styleUrls: ['./content-home.component.scss'],
    animations: appAnimations,
    host: {
        '(window:resize)': 'onResize()'
    }
})
export class ContentHomeComponent implements OnInit {

    public totalShowCategory = 3;
    public topProductSale: Array<ProductModel> = [];
    public categories: Array<CategoryModel> = [];
    public viewcategories = true;

    constructor(private cartShop: CartShopService, private homeService: HomeService) {
        this.onResize();
        this.getTopProductSale();
    }

    ngOnInit() {
        this.categories = this.cartShop.categories;
        this.cartShop.categoriesSub.subscribe((categories) => {
            this.viewcategories = false;
            this.categories = categories;
            setTimeout(() => {
                this.viewcategories = true;
            }, 700);
        });
    }

    slideActivate(ngbSlideEvent: NgbSlideEvent) {}

    public onResize(): void {
        this.totalShowCategory = 1;

        if (document.body.offsetWidth >= 768) {
            this.totalShowCategory = 2;
        }

        if (document.body.offsetWidth >= 1024) {
            this.totalShowCategory = 4;
        }

        if (document.body.offsetWidth >= 1050) {
            this.totalShowCategory = 4;
        }
    }

    public get floor(): CategoryModel {
        return this.categories.find((cat) => cat.slug.includes('piso')) ?? CategoryModel.fromJson({}); 
    }

    public get tile(): CategoryModel {
        return this.categories.find((cat) => cat.slug.includes('azulejo')) ?? CategoryModel.fromJson({});
    }

    public get categoriesfilter(): Array<CategoryModel> {
        return this.categories.filter((cat) => !cat.slug.includes('piso') && !cat.slug.includes('azulejo') && cat.slug !== 'uncategorized');
    }

    public getTopProductSale(): void {
        this.homeService.topProductSale().subscribe((response) => {
            this.topProductSale = response.map((product) => ProductModel.fromJson(product));
        });
    }
}
