import { Injectable, EventEmitter } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root'
})
export class AppMatchMediaService {

  public activeMediaQuery: string;
  public onMediaChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private observableMedia: MediaObserver) {
    this.activeMediaQuery = '';
    this.observableMedia.asObservable()
      .subscribe((change: MediaChange[]) => {
        if (this.activeMediaQuery !== change[0].mqAlias) {
          this.activeMediaQuery = change[0].mqAlias;
          this.onMediaChange.emit(change[0].mqAlias);
        }
      });
  }

}
