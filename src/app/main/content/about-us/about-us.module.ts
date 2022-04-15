import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { AboutUsRouting } from './about-us.routing';
import { AboutUsService } from './about-us.service';
import { ContentAboutUsComponent } from './content-about-us/content-about-us.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        AboutUsRouting
    ],
    declarations: [
        ContentAboutUsComponent
    ],
    providers: [
        AboutUsService
    ]
})
export class AboutUsModule {}
