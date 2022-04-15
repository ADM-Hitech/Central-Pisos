import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { ProfileRouting } from './profile.routing';
import { ProfileService } from './profile.service';
import { DetailsProfileComponent } from './details-profile/details-profile.component';
import { ContentProfileComponent } from './content-profile/content-profile.component';
import { AddressComponent } from './address/address.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ProfileRouting
    ],
    declarations: [
        DetailsProfileComponent,
        ContentProfileComponent,
        AddressComponent,
        ChangePasswordComponent,
        MyOrdersComponent,
        AddAddressComponent,
        DetailOrderComponent
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule {}
