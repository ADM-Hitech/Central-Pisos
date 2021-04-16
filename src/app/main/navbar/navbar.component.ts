import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../core/services/navbar.service';
import { AppPerfectScrollbarDirective } from '../../core/directives/app-perfect-scrollbar.directive';
import { AppMatchMediaService } from '../../core/services/app-match-media.service';
import { NavigationService } from '../../core/services/navigation.service';
import { AppMainComponent } from '../main.component';
import { NavigationEnd, Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:variable-name
  private _backdropElement: HTMLElement | null = null;
  // tslint:disable-next-line:variable-name
  private _folded = false;

  @HostBinding('class.close') isClosed: boolean;
  @HostBinding('class.folded') isFoldedActive: boolean;
  @HostBinding('class.folded-open') isFoldedOpen: boolean;
  @HostBinding('class.initialized') initialized: boolean;
  @ViewChild(AppPerfectScrollbarDirective, { static: false }) appPerfectScrollbarDirective;

  @Input()
  set folded(value: boolean) {
    this._folded = value;

    if (this._folded) {
      this.activateFolded();
    } else {
      this.deActivateFolded();
    }
  }

  get folded(): boolean {
    return this._folded;
  }

  public matchMediaWatcher: Subscription;
  public navigationServiceWatcher: Subscription;
  public appPerfectScrollbarUpdateTimeout;
  public player: AnimationPlayer;

  constructor(
    private appMainComponent: AppMainComponent,
    private appMatchMedia: AppMatchMediaService,
    private appNavigationService: NavigationService,
    private navbarService: NavbarService,
    private router: Router,
    private render: Renderer2,
    private elementRef: ElementRef,
    private animationBuilder: AnimationBuilder,
    private media: MediaObserver
  ) {
    this.navbarService.setNavBar(this);

    this.navigationServiceWatcher = this.appNavigationService.onNavCollapseToogle.subscribe(() => {
      this.appPerfectScrollbarUpdateTimeout = setTimeout(() => {
        this.appPerfectScrollbarDirective.update();
      }, 310);
    });

    this.matchMediaWatcher = this.appMatchMedia.onMediaChange.subscribe((mediaStep) => {
      setTimeout(() => {
         if (this.media.isActive('lt-lg')) {
           this.closeBar();
           this.deActivateFolded();
         } else {
          this.openBar();
          this.detachBackdrop();
         }
      });
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.media.isActive('lt-lg')) {
          setTimeout(() => {
             this.closeBar();
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.isClosed = false;
    this.isFoldedActive = this._folded;
    this.isFoldedOpen = false;
    this.initialized = false;
    this.updateCssClasses();

    setTimeout(() => {
      this.initialized = true;
    });

    if (this.media.isActive('lt-lg')) {
      this.closeBar();
      this.deActivateFolded();
    } else {
      if (this._folded) {
        this.deActivateFolded();
      } else {
        this.activateFolded();
      }
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.appPerfectScrollbarUpdateTimeout);
    this.matchMediaWatcher.unsubscribe();
    this.navigationServiceWatcher.unsubscribe();
  }

  openBar(): void {
    if (!this.isClosed) {
      return;
    }

    this.isClosed = false;
    this.updateCssClasses();

    if (this.media.isActive('lt-lg')) {
      this.attachBackdrop();
    }
  }

  closeBar(): void {
    if (this.isClosed) {
      return;
    }

    this.isClosed = true;
    this.updateCssClasses();
    this.detachBackdrop();
  }

  toggleBar(): void {
    if (this.isClosed) {
      this.openBar();
    } else {
      this.closeBar();
    }
  }

  toggleFold(): void {
    if (!this.isFoldedActive) {
      this.activateFolded();
    } else {
      this.deActivateFolded();
    }
  }

  activateFolded(): void {
    this.isFoldedActive = true;
    this.appMainComponent.addClass('app-nav-bar-folded');
    this.isFoldedOpen = false;
  }

  deActivateFolded(): void {
    this.isFoldedActive = false;
    this.appMainComponent.removeClass('app-nav-bar-folded');
    this.isFoldedOpen = false;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isFoldedOpen = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isFoldedOpen = false;
  }

  updateCssClasses(): void {
    if (!this.isClosed) {
      this.appMainComponent.addClass('app-navbar-opened');
      this.appMainComponent.removeClass('app-navbar-closed');
    } else {
      this.appMainComponent.addClass('app-navbar-closed');
      this.appMainComponent.removeClass('app-navbar-opened');
    }
  }

  private attachBackdrop(): void {
    this._backdropElement = this.render.createElement('div');
    this._backdropElement.classList.add('app-navbar-backdrop');
    this.render.appendChild(this.elementRef.nativeElement.parentElement, this._backdropElement);
    this.player = this.animationBuilder.build([
      animate('400ms ease', style({opacity: 1}))
    ]).create(this._backdropElement);

    this.player.play();

    this._backdropElement.addEventListener('click', () => {
      this.closeBar();
    });
  }

  private detachBackdrop(): void {
    if (this._backdropElement) {
      this.player = this.animationBuilder.build([
        animate('400ms cubic-bezier(.25,.8,.25,1)', style({opacity: 0}))
      ]).create(this._backdropElement);

      this.player.play();

      this.player.onDone(() => {
        if (this._backdropElement) {
          this._backdropElement.parentNode.removeChild(this._backdropElement);
          this._backdropElement = null;
        }
      });
    }
  }

}
