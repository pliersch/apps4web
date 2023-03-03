import { Component, Input } from '@angular/core';
import { RadioStation } from "@modules/radio/components/player/player.component";

@Component({
  selector: 'app-widget-player',
  templateUrl: './widget-player.component.html',
  styleUrls: ['./widget-player.component.scss']
})
export class WidgetPlayerComponent {

  @Input()
  radio: RadioStation;

  isPlaying = false;

  onClickPlay(radio: RadioStation): void {
    this.isPlaying = !this.isPlaying;
  }
}
