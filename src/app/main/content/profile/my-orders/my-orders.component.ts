import { Component, ViewEncapsulation } from '@angular/core';
import { OrderModel } from 'src/app/core/models/order.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { appAnimations } from '../../../../core/animations';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class MyOrdersComponent {

    public listOrder: Array<OrderModel> = [];
    public loading: boolean = true;

    constructor(
        private auth: AuthService,
        private profileService: ProfileService
    ) {
        this.getMyOders();
    }

    public getMyOders(): any {
        this.profileService.getOrderByCustomer(this.auth.id).subscribe(response => {
            this.listOrder = Array.from(response).map((order) => OrderModel.fromJson(order));
            this.loading = false;
        }, (error) => {
            
        });
    }
}