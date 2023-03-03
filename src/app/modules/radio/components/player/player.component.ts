import { Component, OnInit } from '@angular/core';
import { WidgetService } from "@app/core/components/widget/widget.service";
import radioFile from "@assets/json/radio.json";
import { WidgetPlayerComponent } from "@modules/radio/components/widget-player/widget-player.component";
import { PlayerService } from "@modules/radio/service/player.service";

export interface RadioStation {
  name: string;
  logoUrl: string;
  stream: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  current: RadioStation;
  empty: RadioStation;
  favorites: RadioStation[] = []

  playing = false;
  // widget:HTMLElement;

  // classic: RadioStation[] = []

  constructor(private widgetService: WidgetService,
              private playerService: PlayerService) { }

  ngOnInit(): void {
    this.favorites = radioFile.radiostations;
    this.empty = {name: '', logoUrl: '', stream: ''};
    this.current = this.empty;
    if (this.playerService.isPlaying()) {
      this.playing = true;
      this.current = this.playerService.getRadioStation();
    }
    this.playerService.on("play", () => {
      this.playing = true;
    })
    this.playerService.on("pause", () => {
      this.playing = false;
    })
  }

  onClickPlay(radio: RadioStation): void {
    if (this.current === radio) {
      this.playerService.pause();
      this.current = this.empty;
      this.widgetService.removeWidget(WidgetPlayerComponent);
    } else {
      this.current = radio;
      this.playerService.play(radio);
      this.widgetService.setWidget(WidgetPlayerComponent);
    }
  }

}
