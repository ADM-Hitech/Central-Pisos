import { Component } from '@angular/core';
import { AppNavigationModel } from './core/models/navigation.model';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private navigationService: NavigationService,
  ) {
    this.navigationService.setNavigationModel(new AppNavigationModel());
  }
}
