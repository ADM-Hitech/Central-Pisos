import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryModel } from 'src/app/core/models/category.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { appAnimations } from '../../../../core/animations';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-content-principal',
    templateUrl: './content-principal.component.html',
    styleUrls: ['./content-principal.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ContentPrincipalComponent {

    public perpage: number = 20;
    public orderby = 'popularity';
    public products: Array<ProductModel> = [];
    public loadingCategories: boolean = true;
    public loadingProducts: boolean = true;
    public categories: Array<CategoryModel> = [];
    public currentPage: number = 1;
    public totalRecord: number = 1;
    public totalPages: number = 1;
    private filter: string; 

    constructor(
        private service: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.route.queryParamMap.subscribe((query: any) => {
            this.filter = typeof query.params.s === 'undefined' ? '' : query.params.s;
            this.currentPage = parseInt(query.params.page, 10) > 0 ? parseInt(query.params.page, 10) : 1;
            this.orderby = typeof query.params.orderby === 'undefined' ? 'popularity' : query.params.orderby;
            this.perpage = parseInt(query.params.perpage, 10) > 0 ? parseInt(query.params.perpage, 10) : 20;
            
            this.getProduct(this.perpage, this.orderby, this.filter);
        });

        this.getCategories();
    }

    public getCategories(): any {
        this.loadingCategories = true;

        this.service.getCategories().subscribe((response) => {
            this.categories = response.map(category => CategoryModel.fromJson(category));
        }, (error) => {
            console.log('error');
        }, () => {
            this.loadingCategories = false;
        });
    }

    public getProduct(perPage: number, orderBy: string, filter: string = ''): void {
        this.loadingProducts = true;

        document.querySelector('app-content').scroll(0,0);

        let order: 'desc' | 'asc' = 'desc';

        if (orderBy.includes('asc')) {
            order = 'asc';

            const splitOrderBy = orderBy.split('-');
            orderBy = splitOrderBy[0];
        }

        this.service.get(order, orderBy, perPage, this.currentPage, filter).subscribe(response => {
            const products = response.body.map(product => ProductModel.fromJson(product));
            this.products = products;

            this.totalRecord = response.headers.get('X-WP-Total');
            this.totalPages = response.headers.get('X-WP-TotalPages');

            document.querySelector('app-content').scroll(0,0);
        }, (error) => {

        }, () => {
            this.loadingProducts = false;
        });
    }

    public get allPage(): Array<number> {
        return Array.from({ length: this.totalPages }, (v, i) => i + 1);
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
}
