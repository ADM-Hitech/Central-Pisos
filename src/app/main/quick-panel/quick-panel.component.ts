import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ISettingsApp } from 'src/app/core/models/settings-app';

@Component({
  selector: 'app-quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit {

  public date: Date;
  public settings: any;
  public notes: Array<any> = [];
  public events: Array<any> = [];

  constructor() {
    this.date = new Date();
    this.settings = {
      notify: true,
      cloud: false,
      retro: true
    };
  }

  ngOnInit() {
  }

}
