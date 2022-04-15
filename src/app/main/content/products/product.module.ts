import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { ProductRouting } from './product.routing';
import { ProductService } from './product.service';
import { ContentPrincipalComponent } from './content-principal/content-principal.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ProductRouting
    ],
    declarations: [
        ContentPrincipalComponent,
        DetailsProductComponent,
        CategoryComponent
    ],
    providers: [
        ProductService
    ]
})
export class ProductModule {}
