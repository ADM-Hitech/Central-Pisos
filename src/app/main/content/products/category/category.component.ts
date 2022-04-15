import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivationEnd, Params, Router } from '@angular/router';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { AttributeModel } from 'src/app/core/models/attribute.model';
import { CategoryModel } from 'src/app/core/models/category.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { TermModel } from 'src/app/core/models/term.model';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import { appAnimations } from '../../../../core/animations';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class CategoryComponent {

    public perpage: number = 20;
    public orderby = 'popularity';
    public currentCategory: CategoryModel = CategoryModel.fromJson({});
    public currentNameCategory: number = 0;
    public products: Array<ProductModel> = [];
    public attributes: Array<AttributeModel> = [];
    public loadingAttributes: boolean = false;
    public loadingProducts: boolean = false;
    public listAttributesLoading: Array<number> = [];
    public listFilter: Array<{ attribute: string, terms: Array<number> }> = [];
    public currentPage: number = 1;
    public totalRecord: number = 1;
    public totalPages: number = 1;
    public currentCategoryId: number = 0;

    constructor(
        public service: ProductService,
        private route: ActivatedRoute,
        private cartService: CartShopService,
        private router: Router,
        private snakBar: MatSnackBar
    ) {
        this.route.params.subscribe((params) => {
            const idCategory = parseInt(params.category, 10);
            if (this.cartService.categories.length > 0) {
                this.currentCategory = this.cartService.categories.find(category => category.id == idCategory) ?? CategoryModel.fromJson({});
            } else {
                this.service.getCategoryById(idCategory).subscribe((response) => {
                    this.currentCategory = CategoryModel.fromJson(response);
                });
            }

            this.currentCategoryId = idCategory;
            this.currentPage = 1;
            this.totalRecord = 1;
            this.totalPages = 1;

            this.route.queryParamMap.subscribe((query: any) => {
                this.currentPage = parseInt(query.params.page, 10) > 0 ? parseInt(query.params.page, 10) : 1;
                this.orderby = typeof query.params.orderby === 'undefined' ? 'popularity' : query.params.orderby;
                this.perpage = parseInt(query.params.perpage, 10) > 0 ? parseInt(query.params.perpage, 10) : 20;

                this.getProducts(idCategory);
            });
        });

        this.getAttributes();
    }

    public getAttributes(): any {
        this.loadingAttributes = true;

        this.service.getAttributes().subscribe((response) => {
            this.attributes = response.map(attribute => AttributeModel.fromJson(attribute));
        }, (error) => {
            console.log('error');
        }, () => {
            this.loadingAttributes = false;
        });
    }

    public cleanNameAttribute(name: string): string {
        var split = name.split(':');
        if(split.length > 1) {
            return split[1];
        }

        return name;
    }

    public getTermsByAttribute(attribute: AttributeModel): any {

        if (attribute.terms.length > 0) {
            return;
        }

        const index = this.listAttributesLoading.push(attribute.id);

        this.service.getTermsByAttribute(attribute.id).subscribe((response) => {
            attribute.terms = response.map((term) => TermModel.fromJson(term));
        }, (error) => {
            console.log('error');
        }, () => {
            this.listAttributesLoading.splice((index - 1), 1);
        });
    }

    public getLoadingAttribute(id: number): boolean {
        return !!this.listAttributesLoading.find(item => item === id);
    }

    public getProducts(id: number): any {
        this.loadingProducts = true;

        document.querySelector('app-content').scroll(0,0);

        let order: 'desc' | 'asc' = 'desc';

        if (this.orderby.includes('asc')) {
            order = 'asc';

            const splitOrderBy = this.orderby.split('-');
            this.orderby = splitOrderBy[0];
        }

        this.service.getByCategory(id, order, this.orderby, this.perpage, this.currentPage).subscribe((response) => {
            this.products = Array.from(response.body ?? []).map((product) => ProductModel.fromJson(product));

            if (this.products.length <= 0) {
                this.snakBar.openFromComponent(SnakBarAlertComponent, {
                    data: {
                        message: 'SIN RESULTADOS',
                        subMessage: 'No se han encontrado resultados',
                        type: 'warning'
                    },
                    panelClass: 'snack-message',
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 3500
                });
            }

            this.totalRecord = response.headers.get('X-WP-Total');
            this.totalPages = response.headers.get('X-WP-TotalPages');

            document.querySelector('app-content').scroll(0,0);
        }, (error) => {

        }, () => {
            this.loadingProducts = false;
        });
    }

    public addFilter(event: any, attribute: string, value: number): void {
        const index = this.listFilter.findIndex(filter => filter.attribute === attribute);
        if (index >= 0) {
            const indexValue = this.listFilter[index].terms.findIndex(term => term === value);

            if (indexValue >= 0 && !event.checked) {
                this.listFilter[index].terms.splice(indexValue, 1);

                if (this.listFilter[index].terms.length <= 0) {
                    this.listFilter.splice(index, 1);
                }

            } else if (event.checked) {
                this.listFilter[index].terms.push(value);
            }
        } else if (event.checked) {
            this.listFilter.push({
                attribute,
                terms: [value]
            });
        }
    }

    public applyFilter(): void {
        let values = [];
        this.loadingProducts = true;
        
        const first = Object.entries(this.listFilter).map(([i, v]) => `attribute_multi[${i}]=${v.attribute}` );
        const second = this.listFilter.map((v, i) => `attribute_term_multi[${i}]=${v.terms.join(',')}`);
        values = values.concat((first as any).flat());
        values = values.concat((second as any).flat());

        let order: 'desc' | 'asc' = 'desc';

        if (this.orderby.includes('asc')) {
            order = 'asc';

            const splitOrderBy = this.orderby.split('-');
            this.orderby = splitOrderBy[0];
        }

        this.service.getByCategory(this.currentCategory.id, order, this.orderby, this.perpage, this.currentPage, values.join('&')).subscribe((response) => {
            this.products = Array.from(response.body ?? []).map((product) => ProductModel.fromJson(product));

            if (this.products.length <= 0) {
                this.snakBar.openFromComponent(SnakBarAlertComponent, {
                    data: {
                        message: 'SIN RESULTADOS',
                        subMessage: 'No se han encontrado resultados',
                        type: 'warning'
                    },
                    panelClass: 'snack-message',
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    duration: 3500
                });
            }
        }, (err) => {

        }, () => {
            this.loadingProducts = false;
        });
    }

    public changePage(page: number): void {
        this.currentPage = page;
        const queryParams: Params = { page };

        this.router.navigate(
            [], 
            {
                relativeTo: this.route,
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            }
        );
    }

    public changeOrderBy(orderby: string): void {
        const queryParams: Params = { orderby };

        this.router.navigate(
            [], 
            {
                relativeTo: this.route,
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            }
        );
    }

    public changePerPage(perpage: number): void {
        const queryParams: Params = { perpage };

        this.router.navigate(
            [], 
            {
                relativeTo: this.route,
                queryParams: queryParams,
                queryParamsHandling: 'merge'
            }
        );
    }

    public get allPage(): Array<number> {
        return Array.from({ length: this.totalPages }, (v, i) => i + 1);
    }
}