import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { appAnimations } from 'src/app/core/animations';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { MenuCollapseInterface } from '../../../../models/menu-collapse.interface';

@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: appAnimations
})
export class NavCollapseComponent implements OnInit {

  @Input() item: MenuCollapseInterface;
  @HostBinding('class') public classes = 'nav-collapse nav-item';
  @HostBinding('class.open') public isOpen = false;

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
          this.expand();
        } else {
          this.collapse();
        }
      }
    });

    this.navigationService.onNavCollapseToogle.subscribe((clickedItem) => {
      if (clickedItem && clickedItem.children) {
        if (this.isChildrenOf(this.item, clickedItem)) {
          return;
        }

        if (this.isUrlInChildren(this.item, this.router.url)) {
          return;
        }

        if (this.item !== clickedItem) {
          this.collapse();
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.isUrlInChildren(this.item, this.router.url)) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  toggleOpen(ev): void {
    ev.preventDefault();

    this.isOpen = !this.isOpen;

    this.navigationService.onNavCollapseToogled.emit(this.item);
    this.navigationService.onNavCollapseToogle.emit();
  }

  expand(): void {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.navigationService.onNavCollapseToogle.emit();
  }

  collapse(): void {
    if (!this.isOpen) {
      return;
    }

    this.isOpen = false;
    this.navigationService.onNavCollapseToogle.emit();
  }

  isChildrenOf(parent, item): boolean {
    if (!parent.children) {
      return false;
    }

    if (parent.children.indexOf(item) !== -1) {
      return true;
    }

    for (const children of parent.children) {
      if (children.children) {
        return this.isChildrenOf(children, item);
      }
    }
  }

  isUrlInChildren(parent, url): boolean {
    if (!parent.children) {
      return false;
    }

    for (const item of parent.children) {
      if (item.children) {
        if (this.isUrlInChildren(item, url)) {
          return true;
        }
      }

      if (item.url === url || url.includes(item.url)) {
        return true;
      }
    }

    return false;
  }


}
