import { Component } from '@angular/core';
import { ScrollSpyDirective } from "@app/common/directives/scroll-spy.directive";
import { WindowScrollSpyDirective } from "@app/common/directives/window-scroll-spy.directive";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [
    ScrollSpyDirective,
    WindowScrollSpyDirective
  ]
})

export class LandingComponent {

  testScrollSpy(event: string): void {
    console.log('LandingComponent switchControlbarDesign: ', event)
  }
}
