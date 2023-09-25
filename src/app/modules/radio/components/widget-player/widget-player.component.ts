import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { WidgetService } from "@app/core/components/widget/widget.service";
import radioFile from "@assets/json/radio.json";
import { RadioStation } from "@modules/radio/components/player/player.component";
import { PlayerService } from "@modules/radio/service/player.service";

interface PlayerActionItem {
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-widget-player',
  templateUrl: './widget-player.component.html',
  styleUrls: ['./widget-player.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, NgFor]
})
export class WidgetPlayerComponent implements OnInit {

  radios: RadioStation[] = [];
  current: RadioStation;
  playToggleAction: PlayerActionItem;

  playAction: PlayerActionItem = {
    name: 'Play',
    symbol: 'play_arrow'
  }

  pauseAction: PlayerActionItem = {
    name: 'Pause',
    symbol: 'pause'
  }

  exitAction: PlayerActionItem = {
    name: 'Exit',
    symbol: 'close'
  }

  constructor(private playerService: PlayerService,
              private widgetService: WidgetService) { }

  ngOnInit(): void {
    this.radios = radioFile.favorites;
    this.playerService.on("play", (radio: RadioStation) => {
      this.current = radio;
      this.playToggleAction = this.pauseAction;
    })
    this.playerService.on("pause", () => {
      this.playToggleAction = this.playAction;
    })
    this.playerService.isPlaying() ?
      this.playToggleAction = this.pauseAction :
      this.playToggleAction = this.playAction;
  }

  onClickTogglePlay(): void {
    this.playerService.togglePlayPause();
  }

  onClickClose(): void {
    this.playerService.stop();
    this.widgetService.removeWidget(WidgetPlayerComponent);
  }

  onClickPlay(radio: RadioStation): void {
    this.playerService.play(radio);
  }

}
