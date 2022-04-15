import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ContentPrincipalComponent } from './content-principal/content-principal.component';
import { DetailsProductComponent } from './details-product/details-product.component';

const routes: Routes = [
    {
        path: '',
        component: ContentPrincipalComponent
    },
    {
        path: ':id',
        component: DetailsProductComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'categoria/:category',
        component: CategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRouting {}
