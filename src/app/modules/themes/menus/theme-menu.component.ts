import { Component, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MediaMatcher } from '@angular/cdk/layout';
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss']
})
export class ThemeMenuComponent implements OnInit {
  @Input() menuTrigger: MatButton | undefined;

  darkMode = false;

  constructor(private readonly themeService: ThemeService,
              private mediaMatcher: MediaMatcher) {
  }

  ngOnInit(): void {
    this.detectOsTheme();
  }

  changeTheme(themeToSet: string): void {
    this.themeService.setTheme(themeToSet);
    localStorage.setItem('theme', themeToSet);
  }

  detectOsTheme(): void {
    const theme: string | null = localStorage.getItem('theme');
    if (theme) {
      this.changeTheme(theme);
      console.log('storage: ', theme);
    }
    if (this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.darkMode = true;
      const theme = this.darkMode ? 'dark' : 'light';
      console.log('os theme mode: ' + theme);

    }
  }
}
