import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuCollapseInterface } from '../models/menu-collapse.interface';
import { MenuGroupInterface } from '../models/menu-group.interface';
import { MenuIntemInterface } from '../models/menu-intem.interface';
import { AppNavigationModel } from '../models/navigation.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public onNavCollapseToogle: EventEmitter<MenuCollapseInterface | MenuGroupInterface | MenuIntemInterface> = new EventEmitter();
  public onNavCollapseToogled = new EventEmitter();
  public onNavigationModelChange: BehaviorSubject<(MenuGroupInterface | MenuCollapseInterface | MenuIntemInterface)[]> =
    new BehaviorSubject([]);
  public navigationModel: AppNavigationModel;
  public flatNavigation: Array<any> = [];

  constructor() { }

  getNavigationModel(): Array<any> {
    return this.navigationModel.model;
  }

  setNavigationModel(model: {model: Array<any>}): void {
    this.navigationModel = model;
    this.onNavigationModelChange.next(this.navigationModel.model);
  }

  addNavigationItem(location, item): void {
    // Parse the location
    const locationArr = location.split('.');

    if ( locationArr.length === 0 ) {
        return;
    }

    // Find the navigation item
    const navItem = this.findNavigationItemById(locationArr);

    // Act according to the item type
    switch ( navItem.type ) {
        case 'item':

            // Create a children array
            navItem.children = [];

            // Push the item
            navItem.children.push(item);

            // Change the item type to collapsable
            navItem.type = 'collapse';

            break;

        case 'collapse':

            // Push the item
            navItem.children.push(item);

            break;

        case 'group':

            // Push the item
            navItem.children.push(item);

            break;

        default:
            break;
    }
  }

  getNavigationItem(location): void {
    // Parse the location
    const locationArr = location.split('.');

    if ( locationArr.length === 0 ) {
        return;
    }

    // Find and return the navigation item
    return this.findNavigationItemById(locationArr);
  }

  findNavigationItemById(location, navigation?): any {
    if ( !navigation ) {
        navigation = this.navigationModel.model;
    }

    // Iterate through the given navigation
    for ( const navItem of navigation ) {
        // If the nav item id equals the first location...
        if ( navItem.id === location[0] ) {
            // If there is more location to look at...
            if ( location.length > 1 ) {
                // Remove the first item of the location
                location.splice(0, 1);

                // Go nested...
                return this.findNavigationItemById(location, navItem.children);
            } else { // Otherwise just return the nav item
                return navItem;
            }
        }
    }
  }

  getFlatNavigation(navigationItems?): any[] {
    // If navigation items not provided,
    // that means we are running the function
    // for the first time...
    if ( !navigationItems ) {
        // Reset the flat navigation
        this.flatNavigation = [];

        // Get the entire navigation model
        navigationItems = this.navigationModel.model;
    }

    for ( const navItem of navigationItems ) {
        if ( navItem.type === 'subheader' ) {
            continue;
        }

        if ( navItem.type === 'item' ) {
            this.flatNavigation.push({
                title: navItem.title,
                type : navItem.type,
                icon : navItem.icon || false,
                url  : navItem.url
            });

            continue;
        }

        if ( navItem.type === 'collapse' || navItem.type === 'group' ) {
            if ( navItem.children ) {
                this.getFlatNavigation(navItem.children);
            }
        }
    }

    return this.flatNavigation;
  }
}
