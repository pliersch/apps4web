import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { EventBusService } from "@app/common/services/event-bus.service";
import { SideNavComponent } from "@app/library/components/layouts/sidenav/side-nav.component";
import { ComponentBrowserComponent } from "@modules/playground/components/browser/component-browser.component";
import { ControlComponent } from "@modules/playground/control/control.component";
import { NgScrollbar } from "ngx-scrollbar";

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, NgScrollbar, ControlComponent, SideNavComponent, MatSidenavModule, ComponentBrowserComponent],
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
    this.eventBus.on('show-component-browser', () => this.toggleDrawer())
  }

  toggleDrawer(): void {
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
