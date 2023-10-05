import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from "@angular/common";
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeState } from "@modules/themes/stores/theme-state";
import { Themes } from "@modules/themes/themes";
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
})
export class ThemeMenuComponent implements OnInit {

  @Input() menuTrigger: MatButton | undefined;

  constructor(private store: Store,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
              private mediaMatcher: MediaMatcher) {
  }

  ngOnInit(): void {
    localStorage.setItem('theme', this.detectTheme());
    this.store.select(ThemeState.theme).subscribe((theme) => {
      this.renderer.addClass(this.document.body, theme);
    });
  }

  toggleTheme(): void {
    let theme;
    if (this.detectTheme() === Themes.Light) {
      theme = Themes.Dark;
      this.renderer.addClass(this.document.body, Themes.Dark);
      this.renderer.removeClass(this.document.body, Themes.Light);
    } else {
      theme = Themes.Light;
      this.renderer.addClass(this.document.body, Themes.Light);
      this.renderer.removeClass(this.document.body, Themes.Dark);
    }
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
