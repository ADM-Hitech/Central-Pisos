import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../core/modules/shared.module';
import { ContentBranchOfficessComponent } from './content-branch-offices/content-branch-offices.component';
import { BranchOfficesRouting } from './branch-offices.routing';
import { BranchOfficesService } from './branch-offices.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BranchOfficesRouting
    ],
    declarations: [
        ContentBranchOfficessComponent
    ],
    providers: [
        BranchOfficesService
    ]
})
export class BranchOfficesModule {}
