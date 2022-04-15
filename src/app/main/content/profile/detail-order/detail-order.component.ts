import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from 'src/app/core/models/order.model';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-detail-order',
    templateUrl: './detail-order.component.html',
    styleUrls: ['./detail-order.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DetailOrderComponent {

    public id: number = 0;
    public order: OrderModel = OrderModel.fromJson({});
    public loading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private service: ProfileService
    ) {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);

        this.getOrder(this.id);
    }

    public get folio(): string {
        return this.order.id.toString().padStart(12, '0');
    }

    public getOrder(id: number): void {
        this.service.getOrderById(id).subscribe((response) => {
            this.order = OrderModel.fromJson(response);
            this.loading = false;
            console.log(this.order);
        });
    }
}