import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]',
  standalone: true
})
export class ScrollSpyDirective {

  @Input() appScrollSpy: number = 0;

  @Output() reachedEvent: EventEmitter<string> = new EventEmitter();

  private inEmitted = false;
  private outEmitted = false;

  constructor(private el: ElementRef) { }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(): void {
    console.log('ScrollSpyDirective onWindowScroll: ',)
    const nativeElement = this.el.nativeElement;
    const inside = nativeElement.getBoundingClientRect().top + this.appScrollSpy <= 0;

    if (!this.inEmitted && inside) {
      this.reachedEvent.emit('in');
      this.inEmitted = true;
      this.outEmitted = false;
      console.log('ScrollSpyDirective in: ',)
    } else if (!this.outEmitted && !inside) {
      this.outEmitted = true;
      this.inEmitted = false;
      this.reachedEvent.emit('out');
      console.log('ScrollSpyDirective out: ',)
    }
  }
}
