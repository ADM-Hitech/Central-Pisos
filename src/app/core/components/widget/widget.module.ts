import { NgModule } from '@angular/core';
import { AppWidgetToggleDirective } from '../../directives/app-widget-toggle.directive';
import { SharedModule } from '../../modules/shared.module';
import { WidgetComponent } from './widget.component';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        WidgetComponent,
        AppWidgetToggleDirective
    ],
    declarations: [
        WidgetComponent,
        AppWidgetToggleDirective
    ]
})
export class appWidgetModule {}
