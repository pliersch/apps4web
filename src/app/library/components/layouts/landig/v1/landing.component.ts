import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [
    ScrollSpyDirective
  ]
})

export class LandingComponent {

  testScrollSpy(event: string): void {
    // console.log('LandingComponent switchControlbarDesign: ', event)
  }
}
