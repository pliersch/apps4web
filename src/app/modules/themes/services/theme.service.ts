import {Injectable} from '@angular/core';

import {StyleManagerService} from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    /*private http: HttpClient,*/
    private styleManager: StyleManagerService
  ) {
  }

  toggleTheme(theme: string) {
    console.log('ThemeService', theme)
  }

  setTheme(themeToSet: string): void {
    this.styleManager.setStyle(
      'theme',
      `assets/configs/${themeToSet}.css`
    );
  }
}
