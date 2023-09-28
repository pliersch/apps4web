import { Injectable, Type } from '@angular/core';
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  private hosts: DynamicComponent[] = [];
  private activeHostName: string;

  addHost(component: DynamicComponent): void {
    this.hosts.push(component);
  }

  setActiveHostName(name: string): void {
    this.activeHostName = name;
  }

  setComponent(component: Type<any>): void {
    const host =
      this.hosts.find(host => host.componentName == this.activeHostName);
    if (host) {
      host.loadComponent(component);
    }
  }

  // removeComponent(component: Type<any>): void {
  //   this.dynamicHost.removeComponent(component);
  // }

}
