import { Directive, HostListener, Input } from '@angular/core';
import { NavbarComponent } from 'src/app/main/navbar/navbar.component';
import { NavbarService } from '../services/navbar.service';

@Directive({
  selector: '[appNavbarToggle]'
})
export class NavbarToggleDirective {

  @Input() appNavbarToggle: string;
  navbar: NavbarComponent;

  constructor(private navbarService: NavbarService) { }

  @HostListener('click')
  onClick(): void {
    this.navbar = this.navbarService.getNavBar();

    if (!this.navbar[this.appNavbarToggle]) {
      return;
    }

    this.navbar[this.appNavbarToggle]();
  }

}
