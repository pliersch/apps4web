import { CdkScrollable, ScrollDispatcher } from "@angular/cdk/overlay";
import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]',
  hostDirectives: [CdkScrollable],
  standalone: true
})
export class ScrollSpyDirective implements OnInit {

  // @Input() appScrollSpy: string[] = [];
  @Input() appScrollSpy: number = 0;

  @Output() reachedEvent: EventEmitter<string> = new EventEmitter();

  constructor(private el: ElementRef,
              private scrollDispatcher: ScrollDispatcher) { }

  ngOnInit(): void {
    const nativeElement = this.el.nativeElement;
    let inside = nativeElement.getBoundingClientRect().top + this.appScrollSpy <= 0;
    let outside = nativeElement.getBoundingClientRect().top + this.appScrollSpy >= 0;

    this.scrollDispatcher.scrolled().subscribe(() => {
      if (nativeElement.getBoundingClientRect().top + this.appScrollSpy <= 0) {
        // console.log('ScrollSpyDirective in: ',)
        if (!inside) {
          this.reachedEvent.emit('in');
          inside = true;
          outside = false;
        }
      } else {
        // console.log('ScrollSpyDirective out: ',)
        if (!outside) {
          this.reachedEvent.emit('out');
          outside = true;
          inside = false;
        }
      }
    });

    // const querySelector = this.el.nativeElement.querySelector('.spy');
    // console.log('ScrollSpyDirective clientHeight: ', querySelector.clientHeight)
    // console.log('ScrollSpyDirective scrollTop: ', querySelector.scrollTop)
    // console.log('ScrollSpyDirective offsetTop: ', querySelector.offsetTop)
    // console.log('ScrollSpyDirective offsetTop: ', querySelector.getBoundingClientRect().top)
    // console.log('ScrollSpyDirective document: ', document.documentElement.scrollTop)
  }

}
