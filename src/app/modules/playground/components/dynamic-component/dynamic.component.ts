import { NgIf } from "@angular/common";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Type, ViewChild } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ImageFallbackDirective } from "@app/common/directives/image-fallback-directive";
import { EventBusService } from "@app/common/services/event-bus.service";
import { DynamicComponentService } from "@modules/playground/components/dynamic-component/dynamic-component.service";
import { DynamicDirective } from "@modules/playground/components/dynamic-component/dynamic.directive";

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  standalone: true,
  imports: [DynamicDirective, ImageFallbackDirective, MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule, NgIf]
})
export class DynamicComponent implements OnInit, OnDestroy {

  @ViewChild(DynamicDirective, {static: true})
  appDynamicHost!: DynamicDirective;

  @Input({required: true})
  componentName!: string;

  @Output()
  deleteEvent = new EventEmitter<DynamicComponent>();

  currentComponent: Type<Component>;

  constructor(private dynamicService: DynamicComponentService,
              private eventBus: EventBusService) { }

  ngOnInit(): void {
    this.dynamicService.addHost(this);
  }

  ngOnDestroy(): void {
    this.dynamicService.removeHost(this);
  }

  loadComponent(component: Type<Component>): void {
    const viewContainerRef = this.appDynamicHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(component);
    this.currentComponent = component;
    // this.eventBus.emit('component-added');
  }

  removeComponent(component: Type<Component>): void {
    if (component.name !== this.currentComponent.name) {
      // todo remove log when stable
      console.log('DynamicComponent removeComponent not possible: ',
        component.name, this.currentComponent.name)
      return;
    }
    this.appDynamicHost.viewContainerRef.clear();
  }

  onClickConfigure(): void {

  }

  onClickSwitch(): void {

  }

  onClickDelete(): void {
    console.log('DynamicComponent onClickDelete: ', this.componentName)
    this.deleteEvent.emit(this);
    // this.removeComponent(this.currentComponent);
  }

}
