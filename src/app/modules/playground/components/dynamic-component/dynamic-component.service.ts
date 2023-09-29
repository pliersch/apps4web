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

  setActiveHost(name: string): void {
    // console.log('DynamicComponentService setActiveHost: ', name)
    this.activeHostName = name;
  }

  setComponent(component: Type<any>): void {
    const host =
      this.hosts.find(host => host.componentName == this.activeHostName);
    if (host) {
      host.loadComponent(component);
    }
  }

  removeHost(host: /*Type<any>*/DynamicComponent): void {
    this.hosts = this.hosts.filter(item => item !== host);
    console.log('DynamicComponentService removeHost: ', this.hosts)
  }

}
