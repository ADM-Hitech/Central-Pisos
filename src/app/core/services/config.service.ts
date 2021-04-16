import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ISettingsApp } from '../models/settings-app';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public settings: ISettingsApp;
  public defaultSettings: ISettingsApp;
  public onSettingsChanged: BehaviorSubject<any>;

constructor(
  private router: Router,
  public platform: Platform
) {
    this.defaultSettings = {
      layout: {
        navigation: 'left',
        navigationFolded: false,
        toolbar: 'below',
        footer: 'none',
        mode: 'fullwidth'
      },
      colorClasses: {
        toolbar: 'mat-white-500-bg',
        navbar: 'mat-app-900-bg',
        footer: 'mat-fuse-dark-900-bg'
      },
      customScrollbars: true,
      routerAnimation: 'fadeIn'
    };

    /**
     * Disable Custom Scrollbars if Browser is Mobile
     */
    if ( this.platform.ANDROID || this.platform.IOS ) {
        this.defaultSettings.customScrollbars = false;
    }

    // Set the settings from the default settings
    this.settings = Object.assign({}, this.defaultSettings);

    // Reload the default settings on every navigation start
    this.router.events.subscribe(
        (event) => {
            if ( event instanceof NavigationStart ) {
                this.setSettings({layout: this.defaultSettings.layout});
            }
        }
    );

    // Create the behavior subject
    this.onSettingsChanged = new BehaviorSubject(this.settings);
  }

  setSettings(settings): void {
      // Set the settings from the given object
      this.settings = Object.assign({}, this.settings, settings);

      // Trigger the event
      this.onSettingsChanged.next(this.settings);
  }

}
