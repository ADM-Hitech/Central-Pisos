import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public navBarRef;

  constructor() { }

  setNavBar(ref): void {
    this.navBarRef = ref;
  }

  getNavBar(): any {
    return this.navBarRef;
  }

}
