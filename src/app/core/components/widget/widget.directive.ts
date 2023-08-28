import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appWidgetHost]',
    standalone: true
})
export class WidgetDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
