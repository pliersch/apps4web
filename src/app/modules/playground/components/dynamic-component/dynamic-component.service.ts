import { Injectable, Type } from '@angular/core';
import { DynamicComponent } from "@modules/playground/components/dynamic-component/dynamic.component";

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {
  private hosts: DynamicComponent[] = [];
  private activeHostName: string;

  addHost(host: DynamicComponent): void {
    this.hosts.push(host);
  }

  setActiveHostName(name: string): void {
    console.log('DynamicComponentService setActiveHostName: ', name)
    this.activeHostName = name;
  }

  setComponent(component: Type<any>): void {
    const host =
      this.hosts.find(host => host.componentName == this.activeHostName);
    if (host) {
      host.loadComponent(component);
    }
  }

  removeHost(hostName: /*Type<any>*/string): void {
    console.log('DynamicComponentService removeHost componentName: ', this.hosts[0].componentName)
    console.log('DynamicComponentService removeHost hostName: ', hostName)
    // const host =
    //   this.hosts.find(host => host.componentName == hostName);
    // if (host) {
    //   host.removeComponent(component);
    // }

  }

}
