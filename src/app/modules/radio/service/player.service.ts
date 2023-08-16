import { Injectable } from '@angular/core';
import { EventEmitter } from "@app/common/base/event-emitter";
import { VisibilityStateService } from "@app/common/services/visibility-state.service";
import { RadioStation } from "@modules/radio/components/player/player.component";

export type PlayerState = 'play' | 'pause' | 'stop'

@Injectable({
  providedIn: 'root'
})

export class PlayerService extends EventEmitter {

  private _state: PlayerState = "stop";
  public get state(): PlayerState {
    return this._state;
  }

  private radioStation: RadioStation | null;
  private audio: HTMLMediaElement;

  constructor(private visibilityService: VisibilityStateService) {
    super();
    this.listenVisibilityChange();
    this.audio = document.createElement("audio");
    // this.audio.addEventListener('play', () => {
    //   this._state = 'play';
    //   this.emit('play', this.radioStation);
    // });
    // this.audio.addEventListener('pause', () => {
    //   this.emit('pause');
    // });
  }

  play(radioStation: RadioStation): void {
    this.radioStation = radioStation;
    this.audio.addEventListener('canplay', () => {
      this._play();
      this.audio.removeEventListener('canplay', this._play);
      this.emit('play', this.radioStation);
      this._state = 'play';
    });
    this.audio.src = radioStation.stream;
  }

  pause(): void {
    this.audio.pause();
    this._state = 'pause';
    this.emit('pause');
  }

  stop(): void {
    this._state = 'stop';
    this.audio.pause();
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
  }

  private listenVisibilityChange(): void {
    this.visibilityService.on(VisibilityStateService.VISIBLE, () => {
      if (this._state === 'play' && this.audio.paused) {
        this._play()
      }
    });
  }
}
