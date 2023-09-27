import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Type } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { EventBusService } from "@app/common/services/event-bus.service";
import { LandingComponent } from "@app/library/components/by_topic/landing/v1/landing.component";
import { ComponentChooserService } from "@modules/playground/common/services/component-chooser.service";

@Component({
  selector: 'app-component-browser',
  standalone: true,
  imports: [CommonModule, LandingComponent, MatButtonModule],
  templateUrl: './component-browser.component.html',
  styleUrls: ['./component-browser.component.scss']
})
export class ComponentBrowserComponent {

  @Output()
  selectEvent = new EventEmitter<void>();

  constructor(private eventBus: EventBusService,
              private componentService: ComponentChooserService) {
  }

  // maybe classname as arg
  select(component: Type<any>): void {
    // this.eventBus.emit('current-asset', component);
// todo hard coded. make generic!
    this.componentService.setComponent(component);
    this.selectEvent.emit();
  }


  protected readonly LandingComponent = LandingComponent;
}
