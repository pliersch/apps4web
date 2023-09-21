import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Route, RouterState } from "@app/core/stores/routes/router.state";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: 'lib-appbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLinkActive, RouterLink],
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {

  @Input() appName: string;
  @Input() isHandset$: Observable<boolean>;
  @Output() toggleNavEvent = new EventEmitter<string>();
  @Output() switchThemeEvent = new EventEmitter<string>();

  @Select(RouterState.getAccessibleRoutes)
  routes$: Observable<Route[]>;
  protected readonly isDevMode = isDevMode;

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  onSwitchTheme($event: string): void {
    this.switchThemeEvent.emit($event);
  }

}
