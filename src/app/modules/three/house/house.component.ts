import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ThreeService } from "@modules/three/3d/three.service";

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  providers: [ThreeService]
})
export class HouseComponent implements AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor(private three: ThreeService) {
  }

  ngAfterViewInit(): void {
    this.three.createScene(this.canvasRef);
    this.three.animate();
  }

}
