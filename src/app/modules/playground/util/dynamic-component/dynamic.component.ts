import { NgIf } from "@angular/common";
import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ImageFallbackDirective } from "@app/common/directives/image-fallback-directive";
import { DynamicDirective } from "@modules/playground/util/dynamic-component/dynamic.directive";
import { DynamicService } from "@modules/playground/util/dynamic-component/dynamic.service";

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  standalone: true,
  imports: [DynamicDirective, ImageFallbackDirective, MatButtonModule, MatIconModule, MatCardModule, MatTooltipModule, NgIf]
})
export class DynamicComponent implements OnInit {

  @ViewChild(DynamicDirective, {static: true})
  appDynamicHost!: DynamicDirective;

  @Input({required: true})
  componentName!: string;

  currentComponent: Type<Component>;

  constructor(private dynamicService: DynamicService) { }

  ngOnInit(): void {
    this.dynamicService.addHost(this);
  }

  loadComponent(component: Type<Component>): void {
    const viewContainerRef = this.appDynamicHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(component);
    this.currentComponent = component;
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
    this.removeComponent(this.currentComponent);
  }
}
