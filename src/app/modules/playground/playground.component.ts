import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SideNavComponent } from "@app/library/components/layouts/sidenav/side-nav.component";
import { ControlComponent } from "@modules/playground/control/control.component";
import { NgScrollbar } from "ngx-scrollbar";

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, NgScrollbar, ControlComponent, SideNavComponent],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

  @ViewChild('fullScreen')
  divRef: ElementRef;

  toggleFullScreen(): void {
    const elem = this.divRef.nativeElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }
}
