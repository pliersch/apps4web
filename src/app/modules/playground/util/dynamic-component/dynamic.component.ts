import { AfterViewInit, Component, OnInit, Type, ViewChild } from '@angular/core';
import { DynamicDirective } from "@modules/playground/util/dynamic-component/dynamic.directive";
import { DynamicService } from "@modules/playground/util/dynamic-component/dynamic.service";

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  standalone: true,
  imports: [DynamicDirective]
})
export class DynamicComponent implements OnInit, AfterViewInit {

  @ViewChild(DynamicDirective, {static: true})
  appDynamicHost!: DynamicDirective;

  private currentComponent: Type<Component>;

  constructor(private dynamicService: DynamicService) { }

  ngOnInit(): void {
    // this.dynamicService.setComponentHost(this);
  }

  ngAfterViewInit(): void {
    this.dynamicService.setComponentHost(this);
  }

  loadComponent(component: Type<Component>): void {
    const viewContainerRef = this.appDynamicHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(component);
    this.currentComponent = component;
  }

  removeComponent(component: Type<Component>): void {
    if (component.name !== this.currentComponent.name) {
      console.log('DynamicComponent removeComponent not possible: ',
        component.name, this.currentComponent.name)
      return;
    }
    this.appDynamicHost.viewContainerRef.clear();
  }

}
