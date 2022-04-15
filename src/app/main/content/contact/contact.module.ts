import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { ContactRouting } from './contact.routing';
import { ContactService } from './contact.service';
import { ContentContactComponent } from './content-contact/content-contact.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ContactRouting
    ],
    declarations: [
        ContentContactComponent
    ],
    providers: [
        ContactService
    ]
})
export class ContactModule {}
