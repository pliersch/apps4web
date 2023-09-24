import { Injectable, Type } from '@angular/core';
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  private dynamicHost: DynamicComponent;
  private hosts: DynamicComponent[] = [];

  // private component: any;

  addHost(component: DynamicComponent): void {
    this.hosts.push(component);
  }

  setComponent(hostName: string, component: Type<any>): void {
    const host = this.hosts.find(host => host.componentName == hostName);
    if (host) {
      host.loadComponent(component);
    }
  }

  // removeComponent(component: Type<any>): void {
  //   this.dynamicHost.removeComponent(component);
  // }

}
