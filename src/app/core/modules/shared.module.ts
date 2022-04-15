import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { AppIfOnDomDirective } from '../directives/app-if-on-dom.directive';
import { AppMatSidenavHelperDirective } from '../directives/app-mat-sidenav-helper.directive';
import { AppMatSidenavTogglerDirective } from '../directives/app-mat-sidenav-toggler.directive';
import { AppPerfectScrollbarDirective } from '../directives/app-perfect-scrollbar.directive';
import { AppPipeModule } from '../pipes/pipes.modules';
import { AppMatSidenavHelperService } from '../services/app-mat-sidenav-helper.service';
import { AppMatchMediaService } from '../services/app-match-media.service';
import { NavbarService } from '../services/navbar.service';
import { MaterialModule } from './material.module';
import {
    StyleUtils,
    StylesheetMap,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    PrintHook,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    ShowHideStyleBuilder,
    FlexOrderStyleBuilder,
    MediaObserver,
    LayoutAlignStyleBuilder,
    FlexFillStyleBuilder
} from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardCategoryComponent } from '../components/card-category/card-category.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CardProductComponent } from '../components/card-product/card-product.component';
import { HeaderPagesComponent } from '../components/header-pages/header-pages.component';
import { CardBranchOfficeComponent } from '../components/card-branch-office/card-branch-office.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { WoocommerceService } from '../services/woocommerce.service';
import { SnakBarAlertComponent } from '../components/snak-bar-alert/snak-bar-alert.component';
import { ConektaService } from '../services/conekta.service';
import { ItemOrderComponent } from '../components/item-order/item-order.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductReviewComponent } from '../components/product-review/product-review.component';
import { ReceiptOfPaymentComponent } from '../components/receipt-of-payment/receipt-of-payment.component';
import { AlertShippingComponent } from '../components/alert-shipping/alert-shipping.component';
import { ReceiptOfPaymentCardComponent } from '../components/receipt-of-payment-card/receipt-of-payment-card.component';

@NgModule({
    declarations: [
        AppMatSidenavHelperDirective,
        AppMatSidenavTogglerDirective,
        AppIfOnDomDirective,
        AppPerfectScrollbarDirective,
        CardCategoryComponent,
        CardProductComponent,
        HeaderPagesComponent,
        CardBranchOfficeComponent,
        SnakBarAlertComponent,
        ItemOrderComponent,
        ProductReviewComponent,
        ReceiptOfPaymentComponent,
        AlertShippingComponent,
        ReceiptOfPaymentCardComponent
    ],
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        AppPipeModule,
        ReactiveFormsModule,
        NgxDnDModule,
        NgxDatatableModule,
        NgbModule,
        IvyCarouselModule,
        AgmCoreModule.forRoot({apiKey: 'AIzaSyBxyqx1ovc98MV7imdwemTz421H_VsCBrM', libraries: ['places']}),
        FontAwesomeModule
    ],
    exports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        AppMatSidenavHelperDirective,
        AppMatSidenavTogglerDirective,
        AppPipeModule,
        AppPerfectScrollbarDirective,
        ReactiveFormsModule,
        NgxDnDModule,
        NgxDatatableModule,
        AppIfOnDomDirective,
        NgbModule,
        CardCategoryComponent,
        IvyCarouselModule,
        CardProductComponent,
        HeaderPagesComponent,
        CardBranchOfficeComponent,
        AgmCoreModule,
        ItemOrderComponent,
        FontAwesomeModule,
        ReceiptOfPaymentComponent,
        ReceiptOfPaymentCardComponent
    ],
    entryComponents: [
        // component modals
        SnakBarAlertComponent,
        ProductReviewComponent,
        AlertShippingComponent
    ],
    providers: [
        AppMatchMediaService,
        NavbarService,
        AppMatSidenavHelperService,
        GoogleMapsAPIWrapper,
        StyleUtils,
        StylesheetMap,
        MediaMarshaller,
        ɵMatchMedia,
        BreakPointRegistry,
        PrintHook,
        LayoutStyleBuilder,
        FlexStyleBuilder,
        ShowHideStyleBuilder,
        FlexOrderStyleBuilder,
        MediaObserver,
        LayoutAlignStyleBuilder,
        FlexFillStyleBuilder,
        WoocommerceService,
        ConektaService
    ]
})
export class SharedModule {}
