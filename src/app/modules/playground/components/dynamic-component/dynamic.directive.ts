import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicHost]',
  standalone: true
})
export class DynamicDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
