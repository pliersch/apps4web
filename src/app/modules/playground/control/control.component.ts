import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { EventBusService } from "@app/common/services/event-bus.service";
import { ComponentChooserService } from "@modules/playground/common/services/component-chooser.service";

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

  constructor(private componentService: ComponentChooserService,
              private eventBus: EventBusService) { }

  setAppbar(): void {
    this.componentService.setAppbar();
  }

  setComp1(): void {
    this.componentService.setComp1();
  }

  setComp2(): void {
    this.componentService.setComp2();
  }

  toggleFullscreen(): void {
    this.toggleFullscreenEvent.emit();
  }

  switchTheme(): void {
    // todo use store value as payload
    this.eventBus.emit('switch-theme');
  }
}
