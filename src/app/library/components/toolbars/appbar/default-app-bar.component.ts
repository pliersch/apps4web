import { transition, trigger, useAnimation } from "@angular/animations";
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { EventBusService } from "@app/common/services/event-bus.service";
import { transitionAnimation } from "@app/common/util/animations";
import { Route, RouterState } from "@app/core/stores/routes/router.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: 'lib-appbar-default',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLinkActive, RouterLink],
  templateUrl: './default-app-bar.component.html',
  styleUrls: ['./default-app-bar.component.scss'],
  animations: [
    trigger('openClose', [
      transition('open => closed', [
        useAnimation(transitionAnimation, {
          params: {
            height: 0,
            opacity: 1,
            backgroundColor: 'red',
            color: 'yellow',
            time: '1s'
          }
        })
      ])
    ])
  ],
})
export class DefaultAppBarComponent {

  @Input() appName: string;
  @Input() isHandset$: Observable<boolean>;
  @Output() toggleNavEvent = new EventEmitter<string>();
  @Output() switchThemeEvent = new EventEmitter<string>();

  @Select(RouterState.getAccessibleRoutes)
  routes$: Observable<Route[]>;
  protected readonly isDevMode = isDevMode;

  isOpen = true;

  constructor(private eventBus: EventBusService) {
    eventBus.on('scrolled-appbar', (evt: string) => this.changeBar(evt));
  }

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  onSwitchTheme($event: string): void {
    this.switchThemeEvent.emit($event);
  }

  private changeBar(evt: string): void {
    this.isOpen = !this.isOpen;
    console.log('DefaultAppBarComponent changeBar: ', evt, this.isOpen)
  }
}
