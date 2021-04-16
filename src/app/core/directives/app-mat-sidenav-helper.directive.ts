import { Directive, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppMatSidenavHelperService } from '../services/app-mat-sidenav-helper.service';
import { AppMatchMediaService } from '../services/app-match-media.service';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';

@Directive({
  selector: '[appMatSidenavHelper]'
})
export class AppMatSidenavHelperDirective implements OnInit, OnDestroy {

  public matchMediaSubscription: Subscription;

  @HostBinding('class.mat-is-locked-open') isLockedOpen = true;
  @Input('appMatSidenavHelper') id: string;
  // tslint:disable-next-line:no-input-rename
  @Input('mat-is-locked-open') matIsLockedOpenBreakpoint: string;

  constructor(
    private appMatSidenavService: AppMatSidenavHelperService,
    private appMatchMedia: AppMatchMediaService,
    private matSidenav: MatSidenav,
    private observableMedia: MediaObserver
  ) { }

  ngOnInit(): void {
    this.appMatSidenavService.setSidenav(this.id, this.matSidenav);

    if (this.observableMedia.isActive(this.matIsLockedOpenBreakpoint)) {
      this.isLockedOpen = true;
      this.matSidenav.mode = 'side';
      this.matSidenav.toggle(true);
    } else {
      this.isLockedOpen = false;
      this.matSidenav.mode = 'over';
      this.matSidenav.toggle(false);
    }

    this.matchMediaSubscription = this.appMatchMedia.onMediaChange.subscribe(() => {
      if (this.observableMedia.isActive(this.matIsLockedOpenBreakpoint)) {
        this.isLockedOpen = true;
        this.matSidenav.mode = 'side';
        this.matSidenav.toggle(true);
      } else {
        this.isLockedOpen = false;
        this.matSidenav.mode = 'over';
        this.matSidenav.toggle(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.matchMediaSubscription.unsubscribe();
  }
}
