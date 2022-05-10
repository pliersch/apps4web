import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {trigger, transition, state, animate, style} from '@angular/animations';

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  animations: [
    trigger('childAnimation', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1.0,
        border: 1.0
      })),
      state('closed', style({
        height: '200px',
        opacity: 0,
        border: 0
      })),
      transition('* => *', [
        animate('0.1s')
      ]),
    ]),
  ],
})
export class AppBarComponent implements OnInit {
  @ViewChild('background') background: ElementRef;
  @ViewChild('menuBtn') menuBtn: ElementRef;
  @Input() appName: string | undefined;
  @Output() toggleNavEvent = new EventEmitter<string>();
  @Output() switchThemeEvent = new EventEmitter<string>();

  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  constructor(private renderer: Renderer2) {
  }

  emitNavToggle(): void {
    this.toggleNavEvent.emit('toggle');
  }

  onSwitchTheme($event: string): void {
    this.switchThemeEvent.emit($event);
  }

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: PointerEvent) => {
      const element = this.background.nativeElement;
      const isMouseBelow = e.clientY > element.offsetTop + element.offsetHeight;
      if (e.target !== this.background.nativeElement && isMouseBelow) {
        this.isOpen = false;
      }
    });
  }

  onClickGoogle(): void {
    console.log('AppBarComponent onClickGoogle: ',)
  }
}
