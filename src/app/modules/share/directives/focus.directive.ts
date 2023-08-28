import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appFocus]',
    standalone: true
})
export class FocusDirective implements AfterViewInit {

  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.element.nativeElement.focus());
  }
}
