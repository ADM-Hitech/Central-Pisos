import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentBranchOfficessComponent } from './content-branch-offices/content-branch-offices.component';

const routes: Routes = [
    {
        path: '',
        component: ContentBranchOfficessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BranchOfficesRouting {}
