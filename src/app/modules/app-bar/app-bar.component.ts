import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from "@ngxs/store";
import {LoginAction} from "@app/stores/auth/login-action";

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {
  @Input() appName: string | undefined;
  @Output() toggleNavEvent = new EventEmitter<string>();
  @Output() switchThemeEvent = new EventEmitter<string>();

  constructor(private store: Store) {
  }

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  onSwitchTheme($event: string): void {
    this.switchThemeEvent.emit($event);
  }

  onClickLogin(): void {
    this.store.dispatch(new LoginAction({username: 'name', password: 'pw'}));
  }
}
