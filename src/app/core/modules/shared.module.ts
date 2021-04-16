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

@NgModule({
    declarations: [
        AppMatSidenavHelperDirective,
        AppMatSidenavTogglerDirective,
        AppIfOnDomDirective,
        AppPerfectScrollbarDirective
    ],
    imports: [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        AppPipeModule,
        ReactiveFormsModule,
        NgxDnDModule,
        NgxDatatableModule
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
        AppIfOnDomDirective
    ],
    entryComponents: [
        // component
    ],
    providers: [
        AppMatchMediaService,
        NavbarService,
        AppMatSidenavHelperService,

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
    ]
})
export class SharedModule {}
