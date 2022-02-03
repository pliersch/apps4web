import {Injectable} from '@angular/core';
import {DynamicAppbarModel} from "@modules/app-bar/dynamic-appbar.model";
import {Location} from "@angular/common";
import {DynamicAppbarHost} from "@modules/app-bar/dynamic-appbar-host";

@Injectable({
  providedIn: 'root'
})
export class DynamicAppbarService {

  private appbars: DynamicAppbarModel[] = [];
  private currentAppbarModel: DynamicAppbarModel | null;
  private host: DynamicAppbarHost;

  constructor(private location: Location) {
    location.onUrlChange(url => this.switchAppbar(url));
  }

  setAppbarHost(host: DynamicAppbarHost): void {
    this.host = host;
  }

  registerAppbar(appbar: DynamicAppbarModel): void {
    this.appbars.push(appbar);
  }

  switchAppbar(url: string): void {
    let moduleName = url.split('/')[1];
    let appbarModel = this.appbars.find((appbar) => appbar.moduleName === moduleName);

    if (!appbarModel) {
      console.log('no')
      this.currentAppbarModel = null;
      this.host.removeAppbar();
    }
    if (appbarModel && appbarModel !== this.currentAppbarModel) {
      this.currentAppbarModel = appbarModel;
      console.log(appbarModel.moduleName)
      this.host.switchAppbar(appbarModel.appbar);
    }
  }
}
