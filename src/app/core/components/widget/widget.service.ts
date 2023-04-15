import { Injectable, Type } from '@angular/core';
import { WidgetComponent } from "@app/core/components/widget/widget.component";

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private widgetHost: WidgetComponent;
  private widget: any;

  setWidgetHost(component: WidgetComponent): void {
    this.widgetHost = component;
  }

  setWidget(widget: Type<any>): void {
    // if (this.widget != widget) {
    this.widget = widget;
    this.widgetHost.loadWidget(widget);
    // }
  }

  removeWidget(widget: Type<any>): void {
    this.widgetHost.removeWidget(widget);
  }

}
