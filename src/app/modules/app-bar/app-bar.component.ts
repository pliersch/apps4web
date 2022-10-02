import {
  AfterViewInit,
  Compiler,
  Component, createNgModuleRef,
  EventEmitter, Injector,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable } from "rxjs";
import { constants } from "@app/const/const";
import { AuthMenuComponent } from "@modules/auth/components/auth-menu/auth-menu.component";
import { Type } from "@angular/compiler";

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements AfterViewInit {

  @Input() appName: string;
  @Input() isHandset$: Observable<boolean>;
  @Output() toggleNavEvent = new EventEmitter<string>();
  @Output() switchThemeEvent = new EventEmitter<string>();

  @ViewChild("authMenuPlaceHolder", {read: ViewContainerRef})
  authMenuPlaceHolder!: ViewContainerRef;

  routes = constants.routes;

  constructor(
    private compiler: Compiler, // fixme
    private injector: Injector
  ) { }

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  onSwitchTheme($event: string): void {
    this.switchThemeEvent.emit($event);
    // this.loadFeature()
    // this.loadForm()
  }

  async loadForm() {
    const {AuthMenuComponent} = await import("../auth/components/auth-menu/auth-menu.component");
    this.authMenuPlaceHolder.clear();
    this.authMenuPlaceHolder.createComponent(AuthMenuComponent);
  }

  ngAfterViewInit(): void {
    void this.loadFeature()
  }

  async loadFeature(): Promise<void> {
    const {AuthModule} = await import('../auth/auth.module');
    /*const ngModuleRef = */
    createNgModuleRef(AuthModule, this.injector);

    const {instance} = this.authMenuPlaceHolder.createComponent(AuthMenuComponent);
    // you have to manually call ngOnChanges for dynamically created components
    instance.ngOnChanges();

    // const {AuthMenuComponent} = await import("../auth/components/auth-menu/auth-menu.component");
    // this.authMenuPlaceHolder.clear();

    // this.authMenuPlaceHolder.createComponent(AuthMenuComponent);


    /*    import('../auth/auth.module').then((AuthModule) => {
          const moduleRef = createNgModuleRef(AuthModule, this.injector);
          // Compile the module
          this.compiler.compileModuleAsync(AuthModule).then(moduleFactory => {
            const {instance} = this.authMenuPlaceHolder.createComponent(AuthMenuComponent);
            // you have to manually call ngOnChanges for dynamically created components
            instance.ngOnChanges();
          });
        });*/
  }

}
