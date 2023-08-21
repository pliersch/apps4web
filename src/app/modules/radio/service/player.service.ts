import { Injectable } from '@angular/core';
import { TypedEventEmitter } from "@app/common/base/typed-event-emitter";
import { VisibilityStateService } from "@app/common/services/visibility-state.service";
import { RadioStation } from "@modules/radio/components/player/player.component";

export type PlayerState = 'play' | 'pause' | 'stop'

export type RadioEventTypes = {
  'play': RadioStation;
  'pause': undefined;
  'stop': undefined;
}

@Injectable({
  providedIn: 'root'
})

export class PlayerService extends TypedEventEmitter<RadioEventTypes> {

  private radioStation: RadioStation | null;
  private audio: HTMLMediaElement;
  private _state: PlayerState = "stop";
  public get state(): PlayerState {
    return this._state;
  }

  constructor(private visibilityService: VisibilityStateService) {
    super();
    this.initAudio();
    this.listenVisibilityChange();
  }

  private initAudio(): void {
    this.audio = document.createElement("audio");
    this.audio.addEventListener('play', () => {
      this.emit('play', this.radioStation!);
      this._state = 'play';
    });
    this.audio.addEventListener('pause', () => {
      this.emit('pause');
    });
  }

  play(radioStation: RadioStation): void {
    this.radioStation = radioStation;
    this.audio.addEventListener('canplay', () => {
      void this.audio.play();
    }, {once: true});
    this.audio.src = radioStation.stream;
  }

  pause(): void {
    this.audio.pause();
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

  private listenVisibilityChange(): void {
    this.visibilityService.on("visible", () => {
      if (this._state === 'play' && this.audio.paused) {
        this.play(this.radioStation!)
      }
    });
  }
}
