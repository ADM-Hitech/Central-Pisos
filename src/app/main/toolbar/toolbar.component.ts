import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { CategoryModel } from 'src/app/core/models/category.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartShopService } from 'src/app/core/services/cart-shop.service';
import * as bannercupon from 'src/assets/banner-cupon';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public userStatusOptions: any[];
  public languages: any;
  public selectedLanguage: any;
  public showLoadingBar: boolean;
  public horizontalNav: boolean;
  public loggedUser: string;
  public filter: string;
  public categories: Array<CategoryModel> = [];

  constructor(
    private router: Router,
    private cartShop: CartShopService,
    private authService: AuthService
  ) {

    this.router.events.subscribe(
      (event) => {
          if ( event instanceof NavigationStart ) {
              this.showLoadingBar = true;
          }

          if ( event instanceof NavigationEnd ) {
              this.showLoadingBar = false;
          }
      });
  }

  ngOnInit() {
    this.categories = this.cartShop.categories;
    
    /*setTimeout(() => {
      this.categories = this.cartShop.categories;
    }, 700);*/

    this.cartShop.categoriesSub.subscribe((categories) => {
      this.categories = categories;
    });
  }

  getLoggedUser(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const helper = new JwtHelperService();
      const tokenPayload = helper.decodeToken(token);
      this.loggedUser = tokenPayload.name;
    }
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  get countProducts(): string {
    const count = this.cartShop.products.value.length;

    if (count > 9) {
      return '9+';
    }

    return count.toString();
  }

  public isLogged = () => this.authService.isAuthenticated;

  public get displayName(): string {
    return this.authService.isAuthenticated ? localStorage.getItem('displayName') : 'Ingresar';
  }

  public applyfilter($event?: any): void {
    if ($event && $event.keyCode !== 13) {
      return;
    }

    this.router.navigate(['/productos'], { queryParams: { s: this.filter } }).then((value) => {
      this.filter = '';
    });
  }

  public get activeBanner(): boolean {
    return moment() >= moment(bannercupon.default.initial) && moment() <= moment(bannercupon.default.final);
  }

  public get cupon(): string {
    return bannercupon.default.cupon ?? '';
  }

  public get promo(): string {
    return bannercupon.default.promo ?? '';
  }
}
