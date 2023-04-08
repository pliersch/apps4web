import { Injectable } from '@angular/core';
import { EventEmitter } from "@app/common/base/event-emitter";
import { RadioStation } from "@modules/radio/components/player/player.component";

export type PlayerState = 'play' | 'pause'

@Injectable({
  providedIn: 'root'
})

export class PlayerService extends EventEmitter {

  private radioStation: RadioStation;

  constructor() {
    super();
    this.audio = document.createElement("audio");
    this.audio.addEventListener('play', () => {
      this.emit('play', this.radioStation)
    });
    this.audio.addEventListener('pause', () => {
      this.emit('pause')
    });
  }

  private audio: HTMLMediaElement;

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

  togglePlayPause(): PlayerState {
    if (this.isPlaying()) {
      this.pause();
      return "pause"
    } else {
      this.play(this.radioStation);
      return "play";
    }
  }

  isPlaying(): boolean {
    return !this.audio.paused
  }

  getRadioStation(): RadioStation {
    return this.radioStation;
  }

  private _play(): void {
    void this.audio.play();
  }

}
