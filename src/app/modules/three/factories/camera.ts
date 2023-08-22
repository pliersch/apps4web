import { ElementRef } from "@angular/core";
import * as THREE from "three";
import { PerspectiveCamera } from "three";

export function createPerspectiveCamera(htmlCanvas: ElementRef<HTMLCanvasElement>): PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.aspect = htmlCanvas.nativeElement.clientWidth / htmlCanvas.nativeElement.clientHeight;
  camera.updateProjectionMatrix();
  camera.position.y = 60;
  camera.position.z = 200;
  return camera;
}
