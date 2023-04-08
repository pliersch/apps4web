import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTooltip } from "@angular/material/tooltip";
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
  styleUrls: ['./widget-player.component.scss']
})
export class WidgetPlayerComponent implements OnInit {

  @ViewChild('tooltip')
  tooltip: MatTooltip

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
    this.radios = radioFile.radiostations;
    this.playerService.on("play", (radio) => {
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
    this.playerService.pause();
    this.widgetService.removeWidget(WidgetPlayerComponent);
  }

  onClickPlay(radio: RadioStation) {
    this.playerService.play(radio);
  }
}
