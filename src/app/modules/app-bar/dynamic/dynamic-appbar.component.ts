import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {DynamicAppbarDirective} from "./dynamic-appbar.directive";
import {DynamicAppbar} from "@modules/share/dynamic-appbar";
import {GalleryToolbarComponent} from "@gallery/components/core/gallery-toolbar/gallery-toolbar.component";

@Component({
  selector: 'app-dynamic-appbar',
  template: `
    <ng-template appDynamicAppbarHost></ng-template>
  `,
})

export class DynamicAppbarComponent implements OnInit {
  @ViewChild(DynamicAppbarDirective, {static: true})
  host: DynamicAppbarDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  // loadComponent(): void {
  //   const viewContainerRef = this.host.viewContainerRef;
  //   viewContainerRef.clear();
  //   const dynamicAppbar = new DynamicAppbar(GalleryToolbarComponent);
  //   viewContainerRef.createComponent<DynamicAppbar>(dynamicAppbar.component);
  //   // const componentRef = viewContainerRef.createComponent<DynamicAppbar>(componentFactory);
  // }

  loadComponent(): void {
    const dynamicAppbar = new DynamicAppbar(GalleryToolbarComponent);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicAppbar.component);

    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicAppbar>(componentFactory);
    // const componentRef = viewContainerRef.createComponent<DynamicAppbar>(componentFactory);
  }

}
