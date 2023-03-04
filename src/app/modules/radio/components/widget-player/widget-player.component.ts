import { Component, OnInit } from '@angular/core';
import { WidgetService } from "@app/core/components/widget/widget.service";
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

  onClickTogglePlay(): void {
    this.playerService.togglePlayPause();
  }

  onClickClose(): void {
    this.playerService.pause();
    this.widgetService.removeWidget(WidgetPlayerComponent);
  }

  ngOnInit(): void {
    this.playerService.on("play", () => {
      this.playToggleAction = this.pauseAction;
    })
    this.playerService.on("pause", () => {
      this.playToggleAction = this.playAction;
    })
    this.playerService.isPlaying() ?
      this.playToggleAction = this.pauseAction :
      this.playToggleAction = this.playAction;
  }
}
