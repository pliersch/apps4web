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

  current: RadioStation | null;
  favorites: RadioStation[] = []
  icon = 'pause';

  constructor(private widgetService: WidgetService,
              private playerService: PlayerService) { }

  ngOnInit(): void {
    this.favorites = radioFile.radiostations;
    this.current = null;
    if (this.playerService.isPlaying()) {
      this.current = this.playerService.getRadioStation();
    }
    this.playerService.on("play", (radio) => {
      this.current = radio;
      this.icon = 'pause'
    })
    this.playerService.on("pause", () => {
      this.icon = 'play_arrow'
    })
    this.playerService.on("stop", () => {
      this.current = null;
    })
  }

  onClickPlay(radio: RadioStation): void {
    radio == this.current
      ? this.toggleCurrentRadioState(radio)
      : this.playOtherRadio(radio);
  }

  toggleCurrentRadioState(radio: RadioStation): void {
    switch (this.playerService.state) {
      case "play":
        this.playerService.stop();
        this.current = null;
        this.widgetService.removeWidget(WidgetPlayerComponent);
        break;
      case "pause":
      case "stop":
        this.playerService.play(radio);
        break;
    }
  }

  private playOtherRadio(radio: RadioStation): void {
    this.current = radio;
    this.playerService.play(radio);
    this.widgetService.setWidget(WidgetPlayerComponent);
  }
}
