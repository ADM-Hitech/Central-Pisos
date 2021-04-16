import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { NavGroupComponent } from './vertical/nav-group/nav-group.component';
import { NavItemComponent } from './vertical/nav-item/nav-item.component';
import { NavCollapseComponent } from './vertical/nav-collapse/nav-collapse.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ],
  declarations: [
    NavigationComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent
  ]
})
export class NavigationModule { }
