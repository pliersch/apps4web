import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { EventBusService } from "@app/common/services/event-bus.service";
import { DynamicComponentService } from "@modules/playground/components/dynamic-component/dynamic-component.service";
import { DynamicComponent } from "@modules/playground/components/dynamic-component/dynamic.component";
import { NgScrollbar } from "ngx-scrollbar";
import { Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-layout-wrapper',
  standalone: true,
  imports: [CommonModule, DynamicComponent, MatButtonModule, NgScrollbar],
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements AfterViewInit, OnDestroy {

  hostNames: string[] = [];
  count = 0;

  private inEmitted = false;
  private outEmitted = false;

  scrollSubscription = Subscription.EMPTY;

  @ViewChild(NgScrollbar)
  scrollbarRef: NgScrollbar;

  constructor(private eventBus: EventBusService,
              private dynamicService: DynamicComponentService) { }

  ngAfterViewInit(): void {
    this.scrollSubscription = this.scrollbarRef.scrolled.pipe(
      map((e: any) => e.target.scrollTop > 50),
      tap((reached: boolean) => this.onScroll(reached))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

  onClickAddComponent(): void {
    const hostName = 'dyn' + this.count++;
    this.hostNames.push(hostName);
    this.dynamicService.setActiveHost(hostName);
    this.eventBus.emit('show-component-browser');
  }

  onScroll(reached: boolean): void {
    if (!this.inEmitted && reached) {
      this.eventBus.emit('scrolled-appbar', 'in');
      this.inEmitted = true;
      this.outEmitted = false;
    } else if (!this.outEmitted && !reached) {
      this.eventBus.emit('scrolled-appbar', 'out');
      this.outEmitted = true;
      this.inEmitted = false;
    }
  }

  onDelete(hostName: string): void {
    this.hostNames = this.hostNames.filter(item => item !== hostName);
    console.log('LayoutWrapperComponent onDelete: ', this.hostNames)
  }

}
