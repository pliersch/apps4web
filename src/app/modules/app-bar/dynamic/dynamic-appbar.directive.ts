import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicAppbarHost]'
})
export class DynamicAppbarDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
