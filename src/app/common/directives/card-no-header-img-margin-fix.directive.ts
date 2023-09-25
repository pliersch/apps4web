import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[appCardNoHeaderImgFix]',
    standalone: true
})
export class CardNoHeaderImgMarginFixDirective implements OnInit {

  constructor(private eleRef: ElementRef) {
  }

  ngOnInit(): void {
    this.eleRef.nativeElement.children[0].style.margin = 0;
  }
}
