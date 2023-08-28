import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from "@angular/material/button-toggle";
import { ThreeEventHandler, ThreeService } from "@modules/three/serivce/three.service";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.scss'],
    providers: [ThreeService],
    standalone: true,
    imports: [NgIf, MatButtonToggleModule]
})
export class HouseComponent implements AfterViewInit, ThreeEventHandler {

  camera = 'bird'
  showInstruction = true;

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor(private three: ThreeService) { }

  ngAfterViewInit(): void {
    this.three.createScene(this, this.canvasRef);
    this.three.animate();
  }

  toggleCamera($event: MatButtonToggleChange): void {
    console.log('Camera: ', $event.value);
    // this.three
  }

  lockControls(): void {
    this.three.lockControls()
  }

  onControlsLock(): void {
    this.showInstruction = false;
  }

  onControlsUnlock(): void {
    this.showInstruction = true;
  }
}
