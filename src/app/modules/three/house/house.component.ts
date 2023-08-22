import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThreeService } from "@modules/three/serivce/three.service";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  providers: [ThreeService]
})
export class HouseComponent implements AfterViewInit {

  currentCamera = 'bird'

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor(private three: ThreeService) {
  }

  ngAfterViewInit(): void {
    this.three.createScene(this.canvasRef);
    this.three.animate();
  }

  testBtn(): void {
    console.log('HouseComponent testBtn: ',)
  }
}
