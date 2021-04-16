import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../core/modules/shared.module';
import { AppMainComponent } from './main.component';
import { ContentComponent } from './content/content.component';
import { FootterComponent } from './footter/footter.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavigationModule } from '../core/components/navigation/navigation.module';
import { NavbarToggleDirective } from '../core/directives/navbar-toggle.directive';
import { QuickPanelComponent } from './quick-panel/quick-panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ContentComponent,
        FootterComponent,
        AppMainComponent,
        NavbarComponent,
        ToolbarComponent,
        NavbarToggleDirective,
        QuickPanelComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        NavigationModule,
        CommonModule
    ],
    exports: [
        AppMainComponent
    ],
    providers: []
})
export class AppMainModule { }
