import { Component } from '@angular/core';
import { SafePipe } from '@app/common/pipes/safe.pipe';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    SafePipe
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {

}
