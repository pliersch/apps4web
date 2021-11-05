import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {StyleManagerService} from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {
  }

  setTheme(themeToSet : string): void {
    this.styleManager.setStyle(
      'theme',
      `assets/configs/${themeToSet}.css`
    );
  }
}
