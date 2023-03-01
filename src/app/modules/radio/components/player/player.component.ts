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

  onClickPlay(radio: RadioStation): void {
    if (this.current === radio) {
      this.audio.src = ''
      this.audio.load();
      this.current = this.empty;
    } else {
      this.current = radio;
      this.audio.addEventListener('canplay', () => {
        this.play();
        this.audio.removeEventListener('canplay', this.play);
      });
      this.audio.src = radio.stream;
    }
  }

  play(): void {
    void this.audio.play();
  }

  onScroll($event: WheelEvent): void {
    // const scrollLeft = this.scrollbar.viewport.scrollLeft;
    // if ($event.deltaY > 0) {
    //   this.scrollToPosition(scrollLeft + 600);
    // } else {
    //   this.scrollToPosition(scrollLeft - 600);
    // }
    // $event.preventDefault();
  }

}
