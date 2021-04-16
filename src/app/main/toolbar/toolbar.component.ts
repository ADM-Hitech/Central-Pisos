import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  public userStatusOptions: any[];
  public languages: any;
  public selectedLanguage: any;
  public showLoadingBar: boolean;
  public horizontalNav: boolean;
  public loggedUser: string;

  constructor(
    private router: Router
  ) {
    this.userStatusOptions = [
      {
          title: 'Online',
          icon: 'icon-checkbox-marked-circle',
          color: '#4CAF50'
      },
      {
          title: 'Away',
          icon: 'icon-clock',
          color: '#FFC107'
      },
      {
          title: 'Do not Disturb',
          icon: 'icon-minus-circle',
          color: '#F44336'
      },
      {
          title: 'Invisible',
          icon: 'icon-checkbox-blank-circle-outline',
          color: '#BDBDBD'
      },
      {
          title: 'Offline',
          icon: 'icon-checkbox-blank-circle-outline',
          color: '#616161'
      }
    ];

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
    this.router.navigate(['/login']);
  }
}
