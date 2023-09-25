import { NgFor } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { WidgetService } from "@app/core/components/widget/widget.service";
import radioFile from "@assets/json/radio.json";
import { WidgetPlayerComponent } from "@modules/radio/components/widget-player/widget-player.component";
import { PlayerService } from "@modules/radio/service/player.service";
import { NgScrollbar } from 'ngx-scrollbar';

export interface RadioStation {
  name: string;
  logoUrl: string;
  stream: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatTabsModule, NgScrollbar, NgFor, MatButtonModule, MatIconModule]
})
export class PlayerComponent implements OnInit, OnDestroy {

  current: RadioStation | null;
  favorites: RadioStation[] = []
  classic: RadioStation[] = []
  icon = 'pause';

  constructor(private playerService: PlayerService,
              private widgetService: WidgetService,) { }

  ngOnInit(): void {
    this.favorites = radioFile.favorites;
    this.classic = radioFile["classic-radio"];
    this.current = null;
    if (this.playerService.isPlaying()) {
      this.current = this.playerService.getRadioStation();
    }
    this.playerService.on("play", (radio) => this.handlePlay(radio))
    this.playerService.on("pause", () => this.handlePause())
    this.playerService.on("stop", () => this.handleStop())
  }

  ngOnDestroy(): void {
    this.playerService.off("play", this.handlePlay);
    this.playerService.off("pause", this.handlePause);
    this.playerService.off("stop", this.handleStop);
  }

  private playRadio(radio: RadioStation): void {
    if (!this.current) {
      this.widgetService.setWidget(WidgetPlayerComponent);
    }
    this.current = radio;
    this.playerService.play(radio);
  }

  toggleCurrentRadio(radio: RadioStation): void {
    switch (this.playerService.state) {
      case "play":
        this.playerService.stop();
        break;
      case "pause":
      case "stop":
        this.playerService.play(radio);
        break;
    }
  }

  onClickPlay(radio: RadioStation): void {
    radio !== this.current
      ? this.playRadio(radio)
      : this.toggleCurrentRadio(radio);
  }

  private handlePlay(radio: RadioStation): void {
    this.current = radio;
    this.icon = 'pause'
  }

  private handlePause(): void {
    this.icon = 'play_arrow'
  }

  private handleStop(): void {
    this.current = null;
    this.widgetService.removeWidget(WidgetPlayerComponent);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.code === 'Space' && this.current) {
      this.playerService.togglePlayPause();
    }
  }
}
