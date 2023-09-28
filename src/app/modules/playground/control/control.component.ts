import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { EventBusService } from "@app/common/services/event-bus.service";
import { DefaultAppBarComponent } from "@app/library/components/toolbars/appbar/default-app-bar.component";
import { DynamicComponentService } from "@modules/playground/components/dynamic-component/dynamic-component.service";

@Component({
  selector: 'lib-control',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {

  @Output()
  toggleFullscreenEvent = new EventEmitter<void>();

  constructor(private dynamicService: DynamicComponentService,
              private eventBus: EventBusService) { }

  setAppbar(): void {
    this.dynamicService.setActiveHostName('appbar');
    this.dynamicService.setComponent(DefaultAppBarComponent);
  }

  toggleFullscreen(): void {
    this.toggleFullscreenEvent.emit();
  }

  switchTheme(): void {
    // todo use store value as payload
    this.eventBus.emit('switch-theme');
  }
}
