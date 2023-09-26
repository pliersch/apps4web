import { Injectable, Type } from '@angular/core';
import { DefaultAppBarComponent } from "@app/library/components/toolbars/appbar/default-app-bar.component";
import { DynamicService } from "@modules/playground/util/dynamic-component/dynamic.service";

@Injectable({
  providedIn: 'root'
})
export class ComponentChooserService {

  constructor(private dynamicService: DynamicService) { }

  setAppbar(): void {
    this.dynamicService.setComponent('appbar', DefaultAppBarComponent)
    // this.dynamicService.setComponent('bar', SimpleAppBarComponent)
  }

  setComponent(component: Type<any>): void {
    this.dynamicService.setComponent('c0', component)
    // this.dynamicService.setComponent('bar', SimpleAppBarComponent)
  }

}
