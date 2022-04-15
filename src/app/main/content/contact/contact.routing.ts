import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { ContentContactComponent } from './content-contact/content-contact.component';

const routes: Routes = [
    {
        path: '',
        component: ContentContactComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRouting {}
