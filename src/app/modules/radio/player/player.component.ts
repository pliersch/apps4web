import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import radioFile from "@assets/json/radio.json";

interface RadioStation {
  name: string;
  logoUrl: string;
  stream: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('player')
  player!: ElementRef;
  private audio: HTMLMediaElement;

  current: RadioStation;
  empty: RadioStation;
  favorites: RadioStation[] = []
  classic: RadioStation[] = []

  ngOnInit(): void {
    this.favorites = radioFile.radiostations;
    this.empty = {name: '', logoUrl: '', stream: ''};
    this.current = this.empty;
  }

  ngAfterViewInit(): void {
    this.audio = this.player.nativeElement;
  }

  togglePlay(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause()
  }

  paused(): boolean {
    if (this.audio) {
      return this.audio.paused;
    } else {
      return true;
    }
  }

  isPlaying(radio: RadioStation): boolean {
    console.log('PlayerComponent isPlaying: ', radio)
    console.log('PlayerComponent isPlaying: ', radio === this.current)
    return radio === this.current;
  }

  onClickPlay(radio: RadioStation): void {
    if (this.current === radio) {
      this.audio.src = ''
      this.audio.load();
      // this.audio = null;
      this.current = this.empty;
    } else {
      this.current = radio;
      this.audio.addEventListener('canplay', () => {
        this.togglePlay()
        this.audio.removeEventListener('canplay', this.togglePlay);
      });
      this.audio.src = radio.stream;
    }
  }

  onScroll($event: WheelEvent): void {
    // const scrollLeft = this.scrollbar.viewport.scrollLeft;
    // if ($event.deltaY > 0) {
    //   this.scrollToPosition(scrollLeft + 600);
    // } else {
    //   this.scrollToPosition(scrollLeft - 600);
    // }
    $event.preventDefault();
  }

}
