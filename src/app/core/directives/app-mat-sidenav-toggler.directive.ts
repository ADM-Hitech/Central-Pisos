import { Directive, HostListener, Input } from '@angular/core';
import { AppMatSidenavHelperService } from '../services/app-mat-sidenav-helper.service';

@Directive({
  selector: '[appMatSidenavToggler]'
})
export class AppMatSidenavTogglerDirective {

  @Input('appMatSidenavToggler') id;

  constructor(private appMatSidenavService: AppMatSidenavHelperService) { }

  @HostListener('click')
  onClick(): void {
    this.appMatSidenavService.getSidenav(this.id).toggle();
  }

}
