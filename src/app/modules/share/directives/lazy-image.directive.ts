import { Directive, ElementRef, Injector } from '@angular/core';
import { LazyImageService } from "@modules/share/services/lazy-image.service";

@Directive({
  selector: 'img[appImgLazyLoad]'
})
export class LazyImageDirective {

  constructor(private injector: Injector,
              private ref: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (!supports) {
      const lazyService = this.injector.get(LazyImageService);
      lazyService.observe(this.ref.nativeElement);
    }
  }

}
