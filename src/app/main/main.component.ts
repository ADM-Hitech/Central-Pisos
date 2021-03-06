import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISettingsApp } from '../core/models/settings-app';
import { ConfigService } from '../core/services/config.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppMainComponent implements OnDestroy {

    public onSettingsChanged: Subscription;
    public appSettings: ISettingsApp;
    private navigationSubscription: Subscription;
    @HostBinding('attr.app-layout-mode') layoutMode;

    constructor(
        private render: Renderer2,
        private elementRef: ElementRef,
        private appConfig: ConfigService,
        private platform: Platform,
        private router: Router,
        @Inject(DOCUMENT) private document: any
    ) {
        this.onSettingsChanged = this.appConfig.onSettingsChanged.subscribe((newSettings) => {
            this.appSettings = newSettings;
            this.layoutMode = this.appSettings.layout.mode;
        });

        if (this.platform.ANDROID || this.platform.IOS) {
            this.document.body.className += ' is-mobile';
        }

        this.navigationSubscription = this.router.events.subscribe((e: any) => {
            if (e instanceof NavigationEnd) {
                document.getElementById('content-router').scroll(0, 0);
            }
        });
    }

    ngOnDestroy(): void {
        this.onSettingsChanged.unsubscribe();
        this.navigationSubscription.unsubscribe();
    }

    addClass(className: string): void {
        this.render.addClass(this.elementRef.nativeElement, className);
    }

    removeClass(className: string): void {
        this.render.removeClass(this.elementRef.nativeElement, className);
    }
}
