import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { ScrollSpyDirective } from "@app/common/directives/scroll-spy.directive";
import { EventBusService } from "@app/common/services/event-bus.service";
import { DynamicComponentService } from "@modules/playground/util/dynamic-component/dynamic-component.service";
import { DynamicComponent } from "@modules/playground/util/dynamic-component/dynamic.component";
import { NgScrollbar } from "ngx-scrollbar";
import { Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-layout-wrapper',
  standalone: true,
  imports: [CommonModule, DynamicComponent, MatButtonModule, ScrollSpyDirective, NgScrollbar],
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements AfterViewInit, OnDestroy {

  // todo try to use dynamicComponent direct
  dynamicComponentNames: string[] = [];
  count = 0;

  scrollSubscription = Subscription.EMPTY;

  @ViewChild(NgScrollbar)
  scrollbarRef: NgScrollbar;

  constructor(private eventBus: EventBusService,
              private dynamicService: DynamicComponentService,
              private zone: NgZone) { }

  ngAfterViewInit(): void {
    // Subscribe to scroll event
    this.scrollSubscription = this.scrollbarRef.scrolled.pipe(
      map((e: any) => e.target.scrollTop > 50 ? 'in' : 'out'),
      tap((reached: string) => this.zone.run(() => this.eventBus.emit('scrolled-appbar', reached)))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  onClickAddComponent(): void {
    const hostName = 'dyn' + this.count++;
    this.dynamicComponentNames.push(hostName);
    this.dynamicService.setActiveHostName(hostName);
    this.eventBus.emit('show-component-browser')
  }

  onScrollSpy($event: string): void {
    console.log('LayoutWrapperComponent onScrollSpy: ',)
    this.eventBus.emit('scrolled-appbar', $event);
  }
}
