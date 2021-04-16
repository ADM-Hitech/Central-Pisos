import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISettingsApp } from '../../core/models/settings-app';
import { ConfigService } from '../../core/services/config.service';
import { filter, map } from 'rxjs/operators';
import { appAnimations } from '../../core/animations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations : appAnimations
})
export class ContentComponent implements OnDestroy {

  public onSettingsChanged: Subscription;
  public appSettings: ISettingsApp;

  @HostBinding('@routerTransitionUp') routeAnimationUp = false;
  @HostBinding('@routerTransitionDown') routeAnimationDown = false;
  @HostBinding('@routerTransitionRight') routeAnimationRight = false;
  @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
  @HostBinding('@routerTransitionFade') routeAnimationFade = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appConfig: ConfigService
  ) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => this.activatedRoute)).subscribe((event) => {
      switch (this.appSettings.routerAnimation) {
        case 'fadeIn':
          this.routeAnimationFade = !this.routeAnimationFade;
          break;
        case 'slideUp':
            this.routeAnimationUp = !this.routeAnimationUp;
            break;
        case 'slideDown':
            this.routeAnimationDown = !this.routeAnimationDown;
            break;
        case 'slideRight':
            this.routeAnimationRight = !this.routeAnimationRight;
            break;
        case 'slideLeft':
            this.routeAnimationLeft = !this.routeAnimationLeft;
            break;
      }
    });

    this.onSettingsChanged = this.appConfig.onSettingsChanged.subscribe((newSettings) => {
      this.appSettings = newSettings;
    });
  }

  ngOnDestroy(): void {
    this.onSettingsChanged.unsubscribe();
  }

}
