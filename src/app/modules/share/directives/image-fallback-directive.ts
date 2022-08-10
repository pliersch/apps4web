import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]'
})
export class ImageFallbackDirective {

  constructor(private eRef: ElementRef) { }

  @HostListener('error')
  loadFallbackOnError(): void {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = 'https://cdn2.iconfinder.com/data/icons/flat-mini-1/128/message_failed-512.png';
    // element.src = this.appImgFallback || 'https://via.placeholder.com/200';
  }

}
