import { Injectable } from '@angular/core';
import { DefaultAppBarComponent } from "@app/library/components/toolbars/appbar/default-app-bar.component";
import { DynamicService } from "@modules/playground/util/dynamic-component/dynamic.service";
import { PlayerComponent } from "@modules/radio/components/player/player.component";
import { PizzaComponent } from "@modules/recipes/pizza/pizza.component";

@Injectable({
  providedIn: 'root'
})
export class ComponentChooserService {

  constructor(private dynamicService: DynamicService) { }

  setAppbar(): void {
    this.dynamicService.setComponent('appbar', DefaultAppBarComponent)
    // this.dynamicService.setComponent('bar', SimpleAppBarComponent)
  }

  setComp1(): void {
    this.dynamicService.setComponent('p1', PizzaComponent)
    // this.dynamicService.setComponent('bar', SimpleAppBarComponent)
  }

  setComp2(): void {
    this.dynamicService.setComponent('p2', PlayerComponent)
    // this.dynamicService.setComponent('bar', SimpleAppBarComponent)
  }
}
