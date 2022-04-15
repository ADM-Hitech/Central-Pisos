import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class AppMatSidenavHelperService {
  public sidenavInstance: MatSidenav[];

  constructor() {
    this.sidenavInstance = [];
  }

  setSidenav(id, instance): void {
    this.sidenavInstance[id] = instance;
  }

  getSidenav(id): MatSidenav {
    return this.sidenavInstance[id];
  }

}
