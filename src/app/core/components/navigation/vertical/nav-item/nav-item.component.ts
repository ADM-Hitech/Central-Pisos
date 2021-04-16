import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MenuIntemInterface } from '../../../../../core/models/menu-intem.interface';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {

  @HostBinding('class') classes = 'nav-item';
  @Input() item: MenuIntemInterface;

  constructor() { }

}
