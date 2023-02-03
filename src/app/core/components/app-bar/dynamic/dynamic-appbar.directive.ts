import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicAppbarHost]'
})
export class DynamicAppbarDirective {

  constructor(private viewContainerRef: ViewContainerRef) {
  }

}
