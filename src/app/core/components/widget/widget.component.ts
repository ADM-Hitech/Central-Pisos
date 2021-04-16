import { AfterContentInit, Component, ContentChildren, ElementRef, HostBinding, OnInit, QueryList, Renderer2 } from '@angular/core';
import { AppWidgetToggleDirective } from '../../directives/app-widget-toggle.directive';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, AfterContentInit {

  @HostBinding('class.flipped') flipped = false;
  @ContentChildren(AppWidgetToggleDirective, {descendants: true}) toggleButtons: QueryList<AppWidgetToggleDirective>;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.toggleButtons.forEach(flipButton => {
        this.renderer.listen(flipButton.el.nativeElement, 'click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.toggle();
        });
      });
    });
  }

  toggle(): void {
    this.flipped = !this.flipped;
  }
}
