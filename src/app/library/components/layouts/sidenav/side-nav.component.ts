import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, DOCUMENT, NgFor } from "@angular/common";
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EventBusService } from "@app/common/services/event-bus.service";
import { WidgetDirective } from "@app/core/components/widget/widget.directive";
import { constants } from "@app/core/const/const";
import { Route, RouterState } from "@app/core/stores/routes/router.state";
import { DynamicComponent } from "@modules/playground/components/dynamic-component/dynamic.component";
import { DynamicDirective } from "@modules/playground/components/dynamic-component/dynamic.directive";
import { ThemeState } from "@modules/themes/stores/theme-state";
import { Select, Store } from "@ngxs/store";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav-layout',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  standalone: true,
  imports: [MatSidenavModule, MatListModule, NgFor, RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe, WidgetDirective, DynamicDirective, DynamicComponent]
})

export class SideNavComponent implements OnInit {

  @ViewChild(MatSidenav)
  drawer!: MatSidenav;

  @ViewChild('themeRef')
  themeRef: ElementRef;

  @Select(RouterState.getAccessibleRoutes)
  routes$: Observable<Route[]>;

  appName = constants.APP_NAME;
  // todo use store value, remove prop
  theme = 'dark-theme';

  constructor(private breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
              private eventBus: EventBusService,
              private store: Store) {
  }

  ngOnInit(): void {
    // todo don't switch theme here, set store value
    this.eventBus.on('switch-theme', () => this.switchTheme(''))
    this.store.select(ThemeState.theme).subscribe((theme) => {
      this.theme = theme;
      // todo problem site-build vs. final. use "config.theme-root: 'document'" for build!?
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

  switchTheme($event: string): void {
    this.renderer.removeClass(this.themeRef.nativeElement, this.theme);
    this.theme = this.theme == 'dark-theme' ? 'light-theme' : 'dark-theme'
    this.renderer.addClass(this.themeRef.nativeElement, this.theme);
    // this.theme = $event;
  }

}
