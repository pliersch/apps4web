import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from "@angular/cdk/overlay";
import { Themes } from "@modules/themes/themes";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-theme-menu',
    templateUrl: './theme-menu.component.html',
    styleUrls: ['./theme-menu.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatIconModule]
})
export class ThemeMenuComponent implements OnInit {

  @Input() menuTrigger: MatButton | undefined;

  @Output()
  switchThemeEvent = new EventEmitter<string>();

  constructor(private overlayContainer: OverlayContainer,
              private mediaMatcher: MediaMatcher) {
  }

  ngOnInit(): void {
    localStorage.setItem('theme', this.detectTheme());
  }

  toggleTheme(): void {
    let theme;
    if (this.detectTheme() === Themes.Light) {
      theme = Themes.Dark;
      this.overlayContainer.getContainerElement().classList.add(Themes.Dark);
    } else {
      theme = Themes.Light;
      this.overlayContainer.getContainerElement().classList.remove(Themes.Dark);
    }
    this.switchThemeEvent.emit(theme);
    localStorage.setItem('theme', theme);
  }

  detectTheme(): string {
    const theme: string | null = localStorage.getItem('theme');
    if (theme) {
      return theme;
    }
    if (this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches) {
      return Themes.Dark;
    }
    return Themes.Light;
  }
}
