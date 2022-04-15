import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/guards/auth-guard.service';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressComponent } from './address/address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContentProfileComponent } from './content-profile/content-profile.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { DetailsProfileComponent } from './details-profile/details-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
    {
        path: '',
        component: ContentProfileComponent,
        children: [
            {
                path: 'detalles',
                component: DetailsProfileComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            },
            {
                path: 'mis-direcciones',
                component: AddressComponent
            },
            {
                path: 'mis-direcciones/:type',
                component: AddAddressComponent
            },
            {
                path: 'mis-pedidos',
                component: MyOrdersComponent
            },
            {
                path: 'mis-pedidos/:id',
                component: DetailOrderComponent
            },
            {
                path: '**',
                component: DetailsProfileComponent
            }
        ],
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRouting {}
