import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuCollapseInterface } from '../../models/menu-collapse.interface';
import { MenuGroupInterface } from '../../models/menu-group.interface';
import { MenuIntemInterface } from '../../models/menu-intem.interface';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnDestroy {

  public navigationModel: (MenuGroupInterface | MenuCollapseInterface | MenuIntemInterface)[];
  public navigationModelChangeSubscription: Subscription;

  // tslint:disable-next-line:no-input-rename
  @Input('layout') layout = 'vertical';

  constructor(private navigationService: NavigationService) {
    this.navigationModelChangeSubscription = this.navigationService.onNavigationModelChange.subscribe((navigationModel) => {
      this.navigationModel = navigationModel;
    });
  }

  ngOnDestroy(): void {
    this.navigationModelChangeSubscription.unsubscribe();
  }

}
