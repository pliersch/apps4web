import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgFor } from "@angular/common";
import { Component, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Route, RouterState } from "@app/core/stores/routes/router.state";
import { Select } from "@ngxs/store";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [AppBarComponent, MatSidenavModule, MatListModule, NgFor, RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe]
})
export class DefaultLayoutComponent {

  @ViewChild(MatSidenav) drawer!: MatSidenav;

  @Select(RouterState.getAccessibleRoutes)
  routes$: Observable<Route[]>;

  constructor(private breakpointObserver: BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  toggleNav(): void {
    void this.drawer.toggle();
  }

}
