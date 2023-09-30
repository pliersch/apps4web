import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { EventBusService } from "@app/common/services/event-bus.service";
import { ComponentBrowserComponent } from "@modules/playground/components/browser/component-browser.component";
import { SideNavWrapperComponent } from "@modules/playground/components/sidenav/side-nav-wrapper.component";
import { ControlComponent } from "@modules/playground/control/control.component";
import { NgScrollbar } from "ngx-scrollbar";

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, NgScrollbar, ControlComponent, MatSidenavModule, ComponentBrowserComponent, SideNavWrapperComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  @ViewChild('fullScreen')
  divRef: ElementRef;

  @ViewChild('drawer')
  drawer: MatDrawer;

  constructor(private eventBus: EventBusService) {}

  ngOnInit(): void {
    this.eventBus.on('show-component-browser', () => this.toggleComponentBrowser());
  }

  toggleComponentBrowser(): void {
    void this.drawer.toggle();
  }

  toggleFullScreen(): void {
    const elem = this.divRef.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }
}
