import { Injectable, Type } from '@angular/core';
import { WidgetComponent } from "@app/core/components/widget/widget.component";

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private widgetHost: WidgetComponent;

  setWidgetHost(component: WidgetComponent): void {
    this.widgetHost = component;
  }

  setWidget(widget: Type<any>): void {
    this.widgetHost.loadWidget(widget);
  }

  removeWidget(widget: Type<any>): void {
    this.widgetHost.removeWidget(widget);
  }

}
