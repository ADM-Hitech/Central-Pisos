import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ProductReviewComponent } from 'src/app/core/components/product-review/product-review.component';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { ImageModel } from 'src/app/core/models/image.model';
import { ProductVariationModel } from 'src/app/core/models/product-variation.model';
import { ProductModel } from 'src/app/core/models/product.model';
import { ReviewModel } from 'src/app/core/models/review.model';
import { Tag } from 'src/app/core/models/tag.model';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import { environment } from 'src/environments/environment';
import { appAnimations } from '../../../../core/animations';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-details-product',
    templateUrl: './details-product.component.html',
    styleUrls: ['./details-product.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DetailsProductComponent implements OnDestroy {

    public product: ProductVariationModel = ProductVariationModel.fromJson({});
    public productVariation: Array<ProductVariationModel> = [];
    public reviews: Array<ReviewModel> = [];
    public loading: boolean = true;
    public currentSize: number = 0;
    public currentColor: number = 0;
    public currentImage: number = 0;
    public images: Array<ImageModel> = [];
    public loadingRelations: boolean = true;
    public relations: Array<ProductVariationModel> = [];
    public m2: number = 0;
    public totalM2: number = 0;
    public navigationSubscription: Subscription;

    constructor(
        private cartService: CartShopService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private snakBar: MatSnackBar,
        private dialog: MatDialog,
        private meta: Meta,
        private router: Router
    ) {
        const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

        this.getData(id);

        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                this.loading = true;
                this.loadingRelations = true;
                this.getData(parseInt(this.route.snapshot.paramMap.get('id'), 10));
            }
        });
    }

    ngOnDestroy(): void {
        this.meta.updateTag({
            property: 'og:url', content: `${environment.url}`
        }, 'property="og:url"');

        this.meta.updateTag({
            property: 'og:type', content: 'product'
        }, 'property="og:type"');

        this.meta.updateTag({
            property: 'og:title', content: 'Central de Pisos'
        }, 'property="og:title"');

        this.meta.updateTag({
            property: 'og:description', content: 'Los mejores pisos y azulejos están en Central de Pisos'
        }, 'property="og:description"');

        this.meta.updateTag({
            property: 'og:image', content: 'https://centraldepisos.com.mx/assets/images/backgrounds/banner-top-sucursales.png'
        }, 'property="og:image"');

        this.navigationSubscription?.unsubscribe();
    }

    public get Color() {
        return this.product.colors[this.currentColor];
    }

    private getData(id: number): void {
        forkJoin([this.productService.getById(id), this.productService.getVariationsForProduct(id), this.productService.getReviewForProduct(id)]).subscribe((response) => {
            this.product = ProductModel.fromJson(response[0]);
            this.images = this.product.images;
            this.productVariation = Array.from(response[1]).map(p => ProductVariationModel.fromJson(p));
            this.reviews = Array.from(response[2]).map(review => ReviewModel.fromJson(review));

            this.changeCurrentProduct();

            this.getRelations();

            this.meta.updateTag({
                property: 'og:url', content: `${environment.url}productos/${this.product.id}`
            }, 'property="og:url"');

            this.meta.updateTag({
                property: 'og:type', content: 'product'
            }, 'property="og:type"');

            this.meta.updateTag({
                property: 'og:title', content: this.product.name
            }, 'property="og:title"');

            this.meta.updateTag({
                property: 'og:description', content: this.product.description
            }, 'property="og:description"');

            this.meta.updateTag({
                property: 'og:image', content: this.images[this.currentImage]?.src || this.product.firtsImage
            }, 'property="og:image"');

            this.loading = false;
        });
    }

    public quantity(add: boolean): void {
        if ((this.product.quantityCart == 1 && !add) || (this.product.quantityCart == this.product.stockQuantity && add)) {
            return;
        }

        if (add) {
            this.product.quantityCart++;
        } else {
            this.product.quantityCart--;
        }
    }

    public addToCart(): void {
        const variation = this.getVaritationByAttribute();
        /*if (variation === null || variation.stockQuantity <= 0 || variation.stockQuantity < this.product.quantityCart) {
            this.snakBar.openFromComponent(SnakBarAlertComponent, {
                data: {
                    message: 'AGOTADO',
                    subMessage: 'Lo sentimos el producto se encuentra agotado',
                    type: 'warning'
                },
                panelClass: 'snack-message',
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 3500
            });

            return;
        }*/

        this.cartService.addItem(this.product);
    }

    public changeCurrentColor(index: number): void {
        this.currentColor = index;
        this.changeCurrentProduct();
    }

    public changeCurrentSize(index: number): void {
        this.currentSize = index;
        this.changeCurrentProduct();
    }

    public changeCurrentImage = (index: number) => this.currentImage = index;

    public getVaritationByAttribute(): ProductVariationModel | null {
        let currentSize = this.product.sizes[this.currentSize] ?? '';
        let currentColor = `${this.product.colors[this.currentColor]?.value}:${this.product.colors[this.currentColor]?.label}` ?? '';

        let countVariation = 0;

        if (currentSize != '' && currentColor != '') {
            countVariation = 1;
        }

        const filter = this.productVariation.filter(variation => 
            variation.attributes.filter( 
                attribute => (attribute.name === "Tamaño" && attribute.option.toLowerCase() === currentSize.toLowerCase()) || (attribute.name === "Color" && attribute.option.toLowerCase() === currentColor.toLowerCase())
            ).length > countVariation
        );

        if (filter.length > 0) {
            return filter[0];
        }

        return null; 
    }

    private changeCurrentProduct(): void {
        var product = this.getVaritationByAttribute() != null ? this.getVaritationByAttribute() : this.product;
        this.currentImage = 0;
        this.images = product.images;
    }

    public addReview(rating: number): void {
        this.product.averageRating = rating;

        var result = this.dialog.open(ProductReviewComponent, {
            data: {
                name: this.product.name,
                productid: this.product.id,
                rating
            }
        });

        result.afterClosed().subscribe((response) => {
            this.product.averageRating = response.rating ?? rating;
        });
    }

    public getRelations(): void {
        var caterogyId = this.product.categories.length > 0 ? this.product.categories[0] : null;
        if (caterogyId != null) {
            this.productService.getByCategory(caterogyId.id).subscribe((response) => {
                this.relations = Array.from(response.body ?? []).map((product) => ProductModel.fromJson(product)).splice(0, 4);
                this.loadingRelations = false;
            }, (err) => {
                console.log(err);
                this.loadingRelations = false;
            });
        } else {
            this.loadingRelations = false;
        }
    }

    public get requireCalculate(): boolean {
        const categories = ['pisos', 'muros', 'fachadas', 'mallas'];
        const isCategory = this.product.categories.filter((category) => categories.some((cat) => cat === category.slug.toLowerCase())).length > 0;
        const haveMetrosPorCaja = parseFloat(this.mtperbox);
        return isCategory && haveMetrosPorCaja > 0;
    }

    public calculateBoxs(): void {
        const quantityPerBox = this.product.quantityPerBox;
        const width = this.product.dimensions.width;
        const height = this.product.dimensions.height;
        const requirem2 = parseInt(this.m2.toString(), 10);

        this.totalM2 = Math.ceil(requirem2 / parseFloat(this.mtperbox));
        //this.totalM2 = Math.ceil((requirem2 * 10000) / (width * height) / quantityPerBox) ?? 1;
    }

    public get contentColor(): boolean {

        if (this.product.colors.length === 1) {
            return this.product.colors[0] !== null;
        }

        return this.product.colors.length > 0;
    }

    public get marca(): string {
        return this.getAttribute('MARCA');
    }

    public get linea(): string {
        return this.getAttribute('LINEA');
    }

    public get garantia(): string {
        return this.getAttribute('GARANTIA');
    }

    public get peso(): string {
        return this.getAttribute('Peso');
    }

    public get pzperbox(): string {
        return this.getAttribute('cantidad por caja');
    }

    public get calidad(): string {
        return this.getAttribute('CALIDAD');
    }

    public get mtperbox(): string {
        return this.getAttribute('Metros por caja');
    }

    private getAttribute(name: string): string {
        const attribute = this.product.attributes.filter(a => a.name === name);
        if (attribute.length <= 0) {
            return '';
        }

        const options = attribute[0].options;

        if (options.length <= 0) {
            return '';
        }

        return options[0];
    }

    public get tags(): Array<Tag> {
        return this.product.tags.filter((item) => item.slug === 'bano' || item.slug === 'interior');
    }
}
