import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { HomeRouting } from './home.routing';
import { ContentHomeComponent } from './content-home/content-home.component';
import { HomeService } from './home.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        HomeRouting
    ],
    declarations: [
        ContentHomeComponent
    ],
    providers: [
        HomeService
    ]
})
export class HomeModule { }
