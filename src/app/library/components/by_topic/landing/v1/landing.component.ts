import { Component } from '@angular/core';
import { EventBusService } from "@app/common/services/event-bus.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
})

export class LandingComponent {

  constructor(private eventBus: EventBusService) { }

  toggle() {
    this.eventBus.emit('scrolled-appbar')
  }
}
