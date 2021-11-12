import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {
  @Input() appName: string | undefined;
  @Output() toggleNavEvent = new EventEmitter<string>();

  constructor() {
  }

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  openThemeMenu(): void {
  }
}
