import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';
import {Store} from "@ngxs/store";
import {ThemeState} from "@modules/themes/stores/theme-state";

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  @ViewChild(MatSidenav) drawer!: MatSidenav;

  theme: string = 'dark-theme';
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

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
