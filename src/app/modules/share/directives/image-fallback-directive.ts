import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]'
})
export class ImageFallbackDirective {

  constructor(private eRef: ElementRef) { }

  @HostListener('error')
  loadFallbackOnError(): void {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = '/assets/svg/broken_image.svg';
  }

}
