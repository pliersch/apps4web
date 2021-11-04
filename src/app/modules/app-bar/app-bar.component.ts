import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {
  @Output() toggleNavEvent = new EventEmitter<string>();

  constructor() {
  }


  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  openThemeMenu(): void {
  }
}
