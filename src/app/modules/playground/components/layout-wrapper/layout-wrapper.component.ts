import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { ScrollSpyDirective } from "@app/common/directives/scroll-spy.directive";
import { EventBusService } from "@app/common/services/event-bus.service";
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";
import { DynamicService } from "@modules/playground/util/dynamic-component/dynamic.service";

@Component({
  selector: 'app-layout-wrapper',
  standalone: true,
  imports: [CommonModule, DynamicComponent, MatButtonModule, ScrollSpyDirective],
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent {

  // todo try to use dynamicComponent direct
  dynamicComponentNames: string[] = [];
  count = 0;

  constructor(private eventBus: EventBusService,
              private dynamicService: DynamicService) {
  }

  onClickAddComponent(): void {
    const hostName = 'dyn' + this.count++;
    this.dynamicComponentNames.push(hostName);
    this.dynamicService.setActiveHostName(hostName);
    this.eventBus.emit('show-component-browser')
  }

  onScrollSpy($event: string): void {
    console.log('LayoutWrapperComponent onScrollSpy: ',)
    this.eventBus.emit('scrolled-appbar', $event);
  }
}
