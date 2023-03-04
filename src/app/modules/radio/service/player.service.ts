import { Injectable } from '@angular/core';
import { EventEmitter } from "@app/common/base/event-emitter";
import { RadioStation } from "@modules/radio/components/player/player.component";
import { Subscription } from "rxjs";

export type PlayerState = 'play' | 'pause'

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private eventEmitter: EventEmitter = new EventEmitter();
  private radioStation: RadioStation;

  constructor() {
    this.audio = document.createElement("audio");
    this.audio.addEventListener('play', () => {
      this.eventEmitter.emit('play')
    });
    this.audio.addEventListener('pause', () => {
      this.eventEmitter.emit('pause')
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

  on(eventName: PlayerState, callback: () => void): Subscription {
    return this.eventEmitter.on(eventName, callback)
  }
}
