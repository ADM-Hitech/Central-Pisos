import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appWidgetToggle]'
})
export class AppWidgetToggleDirective {

  constructor(public el: ElementRef) { }

}
