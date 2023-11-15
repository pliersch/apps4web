import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Route } from "@app/core/stores/routes/router.state";
import { Observable } from "rxjs";

@Component({
  selector: 'lib-simple-appbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLinkActive, RouterLink],
  templateUrl: './simple-app-bar.component.html',
  styleUrls: ['./simple-app-bar.component.scss']
})
export class SimpleAppBarComponent {

  @Input() appName: string;
  @Input() isHandset$: Observable<boolean>;
  @Output() toggleNavEvent = new EventEmitter<string>();

  // @Select(RouterState.getAccessibleRoutes)
  routes$: Observable<Route[]>;

  // protected readonly isDevMode = isDevMode;

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

}
