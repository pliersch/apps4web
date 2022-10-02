import {
  AfterViewInit,
  Compiler,
  Component,
  EventEmitter, Injector,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable } from "rxjs";
import { constants } from "@app/const/const";

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
    // this.switchThemeEvent.emit($event);
    // this.loadFeature()
    this.loadForm()
  }

  async loadForm() {
    const {AuthMenuComponent} = await import("../auth/components/auth-menu/auth-menu.component");
    this.authMenuPlaceHolder.clear();
    this.authMenuPlaceHolder.createComponent(AuthMenuComponent);
  }

  ngAfterViewInit(): void {
    // this.loadFeature()
  }

  loadFeature() {
    // Dynamic import, activate code splitting and on demand loading of feature module
    import('../auth/auth.module').then(({AuthModule}) => {
      // Compile the module
      this.compiler.compileModuleAsync(AuthModule).then(moduleFactory => {
        // Create a moduleRef, resolve an entry component, create the component
        const moduleRef = moduleFactory.create(this.injector);
        const componentFactory = moduleRef.instance.resolveComponent();
        const {instance} = this.authMenuPlaceHolder.createComponent(componentFactory);

        // set component Input() property
        // instance.title = 'foo';

        // you have to manually call ngOnChanges for dynamically created components
        instance.ngOnChanges();
      });
    });
  }

}
