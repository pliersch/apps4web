import { Injectable, Type } from '@angular/core';
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicService {
  private dynamicHost: DynamicComponent;
  private hosts: DynamicComponent[] = [];
  private activeHostName: string;

  // private component: any;

  addHost(component: DynamicComponent): void {
    this.hosts.push(component);
  }

  setActiveHostName(name: string): void {
    this.activeHostName = name;
  }

  setComponent(/*hostName: string, */component: Type<any>): void {
    const host = this.hosts.find(host => host.componentName == this.activeHostName);
    if (host) {
      host.loadComponent(component);
    }
  }

  // removeComponent(component: Type<any>): void {
  //   this.dynamicHost.removeComponent(component);
  // }

}
