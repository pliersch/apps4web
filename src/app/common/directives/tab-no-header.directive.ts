import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[appNoHeader]',
    standalone: true
})
export class TabNoHeaderDirective implements OnInit {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement as HTMLElement;
    const child: HTMLElement = nativeElement.children[0] as HTMLElement;
    child.style.display = 'none';
  }
}
