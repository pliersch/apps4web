import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyImageService {

  private observer: IntersectionObserver;

  constructor() {
    this.init();
  }

  private init(): void {
    this.observer =
      new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          const lazyImage = entry.target as HTMLImageElement;
          const src = lazyImage.dataset.src;
          if (!src) {
            return;
          }

          lazyImage.tagName.toLowerCase() === 'img'
            ? lazyImage.src = src
            : lazyImage.style.backgroundImage = 'url(\'' + src + '\')';

          lazyImage.removeAttribute('lazy');
          imgObserver.unobserve(lazyImage);
        });
      });
  }

  observe(target: Element): void {
    this.observer.observe(target);
  }
}
