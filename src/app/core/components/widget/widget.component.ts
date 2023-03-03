import { AfterContentInit, Component, ElementRef, OnInit, Type, ViewChild } from '@angular/core';
import { WidgetDirective } from "@app/core/components/widget/widget.directive";
import { WidgetService } from "@app/core/components/widget/widget.service";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, AfterContentInit {

  @ViewChild('mount')
  mount!: ElementRef;

  @ViewChild(WidgetDirective, {static: true})
  appWidgetHost!: WidgetDirective;

  constructor(private widgetService: WidgetService) { }

  ngOnInit(): void {
    this.widgetService.setWidgetHost(this);
  }

  loadWidget(component: Type<any>): void {
    const viewContainerRef = this.appWidgetHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<typeof component>(component);
    // componentRef.instance.data = adItem.data;
  }

  removeWidget(component: Type<any>): void {
    this.appWidgetHost.viewContainerRef.clear();
  }

  ngAfterContentInit(): void {
    // this.widgetService.setWidgetHost(this);
  }

}
