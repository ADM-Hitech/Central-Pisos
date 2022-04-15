import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LineItemsModel } from "../../models/line-items.model";
import { OrderModel } from "../../models/order.model";

@Component({
    selector: 'app-item-order',
    templateUrl: './item-order.component.html',
    styleUrls: ['./item-order.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemOrderComponent {

    @Input() order: OrderModel;
    @Input() active: boolean = false;

    constructor(
        public router: Router
    ) {}

    public get firstProduct(): LineItemsModel {
        if (!!this.order && this.order.lineItems.length > 0) {
            return this.order.lineItems[0];
        }

        return LineItemsModel.fromJson({});
    }

    public get moreProducts(): number {
        return this.order.lineItems.length - 1;
    }

    public get color(): string {
        const item = this.firstProduct;

        if (item.metaData.length > 0) {
            const metaColor = item.metaData.find((meta) => meta.key === 'pa_color');
            return !!metaColor ? metaColor.displayValue : '';
        }

        return '';
    }

    public get size(): string {
        const item = this.firstProduct;
        
        if (item.metaData.length > 0) {
            const metaSize = item.metaData.find((meta) => meta.key === 'pa_size');
            return !!metaSize ? metaSize.displayValue : '';
        }

        return '';
    }

    public get status(): string {
        let translate = '';

        switch (this.order.status) {
            case 'on-hold':
                translate = 'EN ESPERA';
                break;
            case 'pending':
                translate = 'PAGO PENDIENTE';
                break;
            case 'processing':
                translate = 'PROCESANDO';
                break;
            case 'completed':
                translate = 'COMPLETADO';
                break;
            case 'cancelled':
                translate = 'CANCELADO';
                break;
            case 'refunded':
                translate = 'REINTREGRADO';
                break;
            case 'failed':
                translate = 'FALLIDO';
                break;
            case 'shipment-approved':
                translate = 'ENVÍO APROVADO';
                break;
            case 'order-prepared':
                translate = 'PEDIDO PREPARADO';
                break;
            case 'oreder-sent':
                translate = 'PEDIDO ENVIADO';
                break;
            case 'order-delivered':
                translate = 'PEDIDO ENTREGADO';
                break;
        
            default:
                break;
        }
        return translate;
    }

    public get folio(): string {
        return this.order.id.toString().padStart(12, '0');
    }

    public goToDetail(): void {
        this.router.navigate([`/perfil/mis-pedidos/${this.order.id}`]);
    }
}