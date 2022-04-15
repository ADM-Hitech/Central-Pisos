import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessPayComponent } from './process-pay/process-pay.component';
import { ResumeCarComponent } from './resume-car/resume-car.component';

const routes: Routes = [
    {
        path: '',
        component: ResumeCarComponent
    },
    {
        path: 'checkout',
        component: ProcessPayComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarRouting {}
