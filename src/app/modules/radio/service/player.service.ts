import { Injectable } from '@angular/core';
import { EventEmitter } from "@app/common/base/event-emitter";
import { VisibilityStateService } from "@app/common/services/visibility-state.service";
import { RadioStation } from "@modules/radio/components/player/player.component";

export type PlayerState = 'play' | 'pause' | 'stop'

@Injectable({
  providedIn: 'root'
})

export class PlayerService extends EventEmitter {

  private radioStation: RadioStation | null;
  private audio: HTMLMediaElement;
  // need to reactivate after device sleep
  private shouldPlaying = false;

  constructor(private visibilityService: VisibilityStateService) {
    super();
    this.listenVisibilityChange();
    this.audio = document.createElement("audio");
    this.audio.addEventListener('play', () => {
      this.emit('play', this.radioStation);
    });
    this.audio.addEventListener('pause', () => {
      this.emit('pause');
    });
  }

  play(radioStation: RadioStation): void {
    this.radioStation = radioStation;
    this.audio.addEventListener('canplay', () => {
      this._play();
      this.audio.removeEventListener('canplay', this._play);
    });
    this.audio.src = radioStation.stream;
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.shouldPlaying = false;
    this.radioStation = null;
    this.emit('stop');
  }

  togglePlayPause(): PlayerState {
    if (this.isPlaying()) {
      this.pause();
      return "pause"
    } else {
      this.play(this.radioStation!);
      return "play";
    }
  }

  isPlaying(): boolean {
    return !this.audio.paused
  }

  getRadioStation(): RadioStation | null {
    return this.radioStation;
  }

  private _play(): void {
    void this.audio.play();
    this.shouldPlaying = true;
  }

  private listenVisibilityChange(): void {
    this.visibilityService.on(VisibilityStateService.VISIBLE, () => {
      if (this.shouldPlaying && this.audio.paused) {
        this._play()
      }
    });
  }
}
