import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// https://devblogs.microsoft.com/premier-developer/angular-how-to-simplify-components-with-typescript-inheritance/
export class AppInjectorService {

  private static injector: Injector;

  static setInjector(injector: Injector): void {
    AppInjectorService.injector = injector;
  }

  static getInjector(): Injector {
    return AppInjectorService.injector;
  }
}
