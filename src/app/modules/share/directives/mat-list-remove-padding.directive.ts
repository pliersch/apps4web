import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appNoPaddingTop]'
})
export class MatListRemovePaddingDirective {

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'padding-top', '0');
  }

}
