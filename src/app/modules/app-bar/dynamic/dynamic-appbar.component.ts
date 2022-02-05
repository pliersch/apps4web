import {Component, OnInit, Type, ViewChild} from '@angular/core';
import {DynamicAppbarDirective} from "./dynamic-appbar.directive";
import {DynamicAppbar} from "@modules/share/dynamic-appbar";
import {DynamicAppbarHost} from "@modules/app-bar/dynamic/dynamic-appbar-host";
import {DynamicAppbarService} from "@modules/app-bar/dynamic/dynamic-appbar.service";

@Component({
  selector: 'app-dynamic-appbar',
  template: `
    <ng-template appDynamicAppbarHost></ng-template>
  `,
})

export class DynamicAppbarComponent implements OnInit, DynamicAppbarHost {

  @ViewChild(DynamicAppbarDirective, {static: true})
  host: DynamicAppbarDirective;

  constructor(private appbarService: DynamicAppbarService) {
  }

  ngOnInit(): void {
    this.appbarService.setAppbarHost(this);
  }

  loadComponent(toolbar: Type<any>): void {
    const viewContainerRef2 = this.host.viewContainerRef;
    viewContainerRef2.clear();
    const componentRef = viewContainerRef2.createComponent<DynamicAppbar>(toolbar);
    // componentRef.instance.data = adItem.data;
  }

  switchAppbar(appbar: Type<any>): void {
    console.log('DynamicAppbarComponent switchAppbar: ', appbar.name)
    this.loadComponent(appbar)
  }

  removeAppbar(): void {
    const viewContainerRef2 = this.host.viewContainerRef;
    viewContainerRef2.clear();
  }
}
