import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT, NgFor, AsyncPipe } from "@angular/common";
import { Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { constants } from "@app/core/const/const";
import { Route, RouterState } from "@app/core/stores/routes/router.state";
import { ThemeState } from "@modules/themes/stores/theme-state";
import { Select, Store } from "@ngxs/store";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
    standalone: true,
    imports: [AppBarComponent, MatSidenavModule, MatListModule, NgFor, RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe]
})
// todo https://trello.com/c/SYgHLOUC/79-theme-switch-%C3%BCber-store-oder-komplett-ohne-mischmasch-zzt
export class DefaultLayoutComponent implements OnInit {

  @ViewChild(MatSidenav) drawer!: MatSidenav;

  @Select(RouterState.getAccessibleRoutes)
  routes$: Observable<Route[]>;

  appName = constants.APP_NAME;
  theme = 'dark-theme';

  constructor(private breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
              private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(ThemeState.theme).subscribe((theme) => {
      this.theme = theme;
      this.renderer.addClass(this.document.body, theme);
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
    this.renderer.addClass(this.document.body, $event);
    this.renderer.removeClass(this.document.body, this.theme);
    this.theme = $event;
  }
}
