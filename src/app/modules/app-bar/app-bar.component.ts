import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from "rxjs";
import { constants } from "@app/const/const";

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent {

  @Input() appName: string;
  @Input() isHandset$: Observable<boolean>;
  @Output() toggleNavEvent = new EventEmitter<string>();
  @Output() switchThemeEvent = new EventEmitter<string>();

  // @ViewChild("authMenuPlaceHolder", {read: ViewContainerRef})
  // authMenuPlaceHolder!: ViewContainerRef;

  routes = constants.routes;

  // constructor(/*private injector: Injector*/ ) { }

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  onSwitchTheme($event: string): void {
    this.switchThemeEvent.emit($event);
  }

  // ngAfterViewInit(): void {
  //   void this.loadFeature()
  // }

  // async loadFeature(): Promise<void> {
  //   const {AuthModule} = await import('../auth/auth.module');
  //   createNgModuleRef(AuthModule, this.injector);
  //
  //   const {instance} = this.authMenuPlaceHolder.createComponent(AuthMenuComponent);
  //   // manually call ngOnChanges for dynamically created components
  //   instance.ngOnChanges(); // necessary?
  // }

}
