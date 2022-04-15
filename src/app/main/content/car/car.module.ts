import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { CarRouting } from './car.routing';
import { ResumeCarComponent } from './resume-car/resume-car.component';
import { CarService } from './car.service';
import { ProcessPayComponent } from './process-pay/process-pay.component';
import { ShippingComponent } from './process-pay/shipping/shipping.component';
import { ReadyComponent } from './process-pay/ready/ready.component';
import { PayComponent } from './process-pay/pay/pay.component';
import { PayForCreditCardComponent } from './process-pay/pay-for-credit-card/pay-for-credit-card.component';
import { PayForOxxoComponent } from './process-pay/pay-for-oxxo/pay-for-oxxo.component';
import { PayForPaypalComponet } from './process-pay/pay-for-paypal/pay-for-paypal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CarRouting
    ],
    declarations: [
        ResumeCarComponent,
        ProcessPayComponent,
        ShippingComponent,
        ReadyComponent,
        PayComponent,
        PayForCreditCardComponent,
        PayForOxxoComponent,
        PayForPaypalComponet
    ],
    providers: [
        CarService
    ]
})
export class CarModule {}
