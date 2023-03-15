import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { constants } from "@app/core/const/const";
import { Route, RouterState } from "@app/core/stores/routes/router.state";
import { ThemeState } from "@modules/themes/stores/theme-state";
import { Select, Store } from "@ngxs/store";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  @ViewChild(MatSidenav) drawer!: MatSidenav;

  @Select(RouterState.getAccessibleRoutes)
  routes$: Observable<Route[]>;

  appName = constants.APP_NAME;
  theme = 'dark-theme';

  constructor(private breakpointObserver: BreakpointObserver,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(ThemeState.theme).subscribe((theme) => {
      this.theme = theme;
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  toggleNav(): void {
    void this.drawer.toggle();
  }

  onSwitchTheme($event: string): void {
    this.theme = $event;
  }
}
