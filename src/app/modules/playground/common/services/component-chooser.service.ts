import { Injectable } from '@angular/core';
import { SimpleAppBarComponent } from "@app/library/components/toolbars/simple-appbar/simple-app-bar.component";
import { DynamicService } from "@modules/playground/util/dynamic-component/dynamic.service";

@Injectable({
  providedIn: 'root'
})
export class ComponentChooserService {

  constructor(private dynamicService: DynamicService) { }

  setAppbar() {
    this.dynamicService.setComponent('foo', SimpleAppBarComponent)
    this.dynamicService.setComponent('bar', SimpleAppBarComponent)
  }
}
