import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Location } from "@angular/common";
import { AppInjectorService } from "@app/common/services/app-injector.service";
import { ActionBarService } from "@modules/action-bar/action-bar.service";
import { Action } from "@modules/action-bar/actions";

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
      this.service.setActions(this.getActions());
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
