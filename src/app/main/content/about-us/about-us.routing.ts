import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentAboutUsComponent } from './content-about-us/content-about-us.component';

const routes: Routes = [
    {
        path: '',
        component: ContentAboutUsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AboutUsRouting {}
