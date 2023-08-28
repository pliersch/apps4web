import { SigninComponent } from '@account/components/signin-menu/signin.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, isDevMode, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Route, RouterState } from "@app/core/stores/routes/router.state";
import { ThemeMenuComponent } from '@modules/themes/menus/theme-menu.component';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  standalone: true,
  imports: [NgIf, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, WidgetComponent, ThemeMenuComponent, SigninComponent, NgFor, RouterLinkActive, AsyncPipe]
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
