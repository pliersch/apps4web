import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { WidgetDirective } from "@app/core/components/widget/widget.directive";
import { WidgetService } from "@app/core/components/widget/widget.service";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @ViewChild(WidgetDirective, {static: true})
  appWidgetHost!: WidgetDirective;

  private currentWidget: Type<Component>;

  constructor(private widgetService: WidgetService) { }

  ngOnInit(): void {
    this.widgetService.setWidgetHost(this);
  }

  loadWidget(component: Type<Component>): void {
    const viewContainerRef = this.appWidgetHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(component);
    this.currentWidget = component;
  }

  removeWidget(component: Type<Component>): void {
    if (component.name !== this.currentWidget.name) {
      console.log('WidgetComponent removeWidget not possible: ',
        component.name, this.currentWidget.name)
      return;
    }
    this.appWidgetHost.viewContainerRef.clear();
  }

}
