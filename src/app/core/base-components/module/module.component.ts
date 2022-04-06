import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Action} from "@app/models/actions";
import {ActionBarService} from "@app/services/action-bar.service";
import {Location} from "@angular/common";
import {AppInjectorService} from "@app/services/app-injector.service";

@Component({
  selector: 'app-module',
  template: `
    <div></div>
  `,
})

export abstract class ModuleComponent implements AfterViewInit, OnDestroy {

  protected location: Location;
  protected service: ActionBarService

  protected constructor() {
    const injector = AppInjectorService.getInjector();
    this.location = injector.get(Location);
    this.service = injector.get(ActionBarService);
    this.initialize();
  }

  initialize(): void {
    this.location.onUrlChange(url => {
      // if (url.startsWith('/gallery')) {
      this.service.setActions(this.getActions());
      // }
      console.log('ActionBarService: ', url)
    });
  }

  protected abstract getActions(): Action[];

  ngAfterViewInit(): void {
    console.log('ModuleComponent ngAfterViewInit: ',)
  }

  ngOnDestroy(): void {
    console.log('ModuleComponent ngOnDestroy: ',)
  }

}
