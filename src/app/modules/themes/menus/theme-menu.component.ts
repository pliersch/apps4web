import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MediaMatcher} from '@angular/cdk/layout';
import {ThemeService} from "@modules/themes/services/theme.service";
import {OverlayContainer} from "@angular/cdk/overlay";
import {Themes} from "@modules/themes/themes";

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss']
})
export class ThemeMenuComponent implements OnInit {

  @Input() menuTrigger: MatButton | undefined;

  @Output()
  switchThemeEvent = new EventEmitter<string>();

  constructor(private readonly themeService: ThemeService,
              private overlayContainer: OverlayContainer,
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
    this.themeService.toggleTheme(theme);
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
