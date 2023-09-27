import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { ScrollSpyDirective } from "@app/common/directives/scroll-spy.directive";
import { EventBusService } from "@app/common/services/event-bus.service";
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";

@Component({
  selector: 'app-layout-wrapper',
  standalone: true,
  imports: [CommonModule, DynamicComponent, MatButtonModule, ScrollSpyDirective],
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent {

  dynamicComponentNames: string[] = [];
  count = 0;
  locked = false;

  constructor(private eventBus: EventBusService) { }

  onClickAddComponent(): void {
    this.locked = true;
    this.dynamicComponentNames.push('dyn' + this.count++);
    this.eventBus.emit('show-component-browser')

  }

  onScrollSpy($event: string): void {
    this.eventBus.emit('scrolled-appbar', $event);
  }
}
