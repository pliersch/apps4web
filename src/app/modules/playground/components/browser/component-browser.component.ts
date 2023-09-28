import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Type } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { EventBusService } from "@app/common/services/event-bus.service";
import { LandingComponent } from "@app/library/components/by_topic/landing/v1/landing.component";
import { LandingBgImgComponent } from "@app/library/components/by_topic/landing/v2/landing-bg-img.component";
import {
  ComponentAccordionComponent
} from "@modules/playground/components/browser/component-accordion/component-accordion.component";
import { DynamicComponentService } from "@modules/playground/util/dynamic-component/dynamic-component.service";

@Component({
  selector: 'app-component-browser',
  standalone: true,
  imports: [CommonModule, LandingComponent, MatButtonModule, ComponentAccordionComponent, LandingBgImgComponent],
  templateUrl: './component-browser.component.html',
  styleUrls: ['./component-browser.component.scss']
})
export class ComponentBrowserComponent {

  @Output()
  selectEvent = new EventEmitter<void>();

  constructor(private eventBus: EventBusService,
              private dynamicService: DynamicComponentService) {
  }

  // maybe classname as arg
  select(component: Type<any>): void {
    // this.eventBus.emit('current-asset', component);
// todo hard coded. make generic!
    this.dynamicService.setComponent(component);
    this.selectEvent.emit();
  }


  protected readonly LandingComponent = LandingComponent;
  protected readonly LandingBgImgComponent = LandingBgImgComponent;
}
