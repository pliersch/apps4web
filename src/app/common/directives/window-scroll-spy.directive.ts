import { ScrollDispatcher } from "@angular/cdk/overlay";
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appWindowScrollSpy]',
  standalone: true
})
export class WindowScrollSpyDirective {

  @Input() appWindowScrollSpy: number = 0;

  @Output() changeEvent: EventEmitter<string> = new EventEmitter();

  constructor(private scrollDispatcher: ScrollDispatcher) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let inside = window.scrollY > this.appWindowScrollSpy;
    let outside = window.scrollY < this.appWindowScrollSpy;

    // console.log('WindowScrollSpyDirective ngOnInit: ', inside)
    // console.log('WindowScrollSpyDirective ngOnInit: ', outside)

    this.scrollDispatcher.scrolled().subscribe(() => {
      // console.log('WindowScrollSpyDirective : ', window.scrollY)
      if (window.scrollY > this.appWindowScrollSpy) {
        // console.log('window ScrollSpyDirective in: ',)
        if (!inside) {
          this.changeEvent.emit('in');
          inside = true;
          outside = false;
        }
      } else {
        // console.log('window ScrollSpyDirective out: ',)
        if (!outside) {
          this.changeEvent.emit('out');
          outside = true;
          inside = false;
        }
      }

    });
  }

}
