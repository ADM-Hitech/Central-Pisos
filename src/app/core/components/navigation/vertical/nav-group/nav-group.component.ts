import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MenuGroupInterface } from 'src/app/core/models/menu-group.interface';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent {

  @HostBinding('class') classes = 'nav-group nav-item';
  @Input() item: MenuGroupInterface;

  constructor() { }

}
