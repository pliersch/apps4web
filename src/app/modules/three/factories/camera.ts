import { ElementRef } from "@angular/core";
import * as THREE from "three";
import { PerspectiveCamera } from "three";

export function createPerspectiveCamera(position: THREE.Vector3, canvas: ElementRef<HTMLCanvasElement>): PerspectiveCamera {
  const aspect = canvas.nativeElement.clientWidth / canvas.nativeElement.clientHeight;
  const camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
  camera.updateProjectionMatrix();
  camera.position.x = position.x;
  camera.position.y = position.y;
  camera.position.z = position.z;
  return camera;
}
