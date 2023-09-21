import { Injectable, Type } from '@angular/core';
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  private dynamicHost: DynamicComponent;
  private component: any;

  setComponentHost(component: DynamicComponent): void {
    this.dynamicHost = component;
  }

  setComponent(component: Type<any>): void {
    // if (this.component != component) {
    this.component = component;
    this.dynamicHost.loadComponent(component);
    // }
  }

  removeComponent(component: Type<any>): void {
    this.dynamicHost.removeComponent(component);
  }

}
