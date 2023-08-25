import { ThreeObject } from "@modules/three/serivce/three.service";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createOrbitControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.target.set(0, 0, 0);

  // controls.minPolarAngle = Math.PI / 2;
  // controls.maxPolarAngle = Math.PI / 2;

  controls.rotateSpeed = 5.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.01;

  // controls.noZoom = false;
  // controls.noPan = false;

  // controls.staticMoving = false;
  // controls.dynamicDampingFactor = 0.15;
  // controls.keys = ['KeyA', 'KeyS', 'KeyD']; not working
  return controls;

}

export class OrbitController implements ThreeObject {

  private readonly _controls: OrbitControls;
  public get controls(): OrbitControls {
    return this._controls
  }

  constructor(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
    this._controls = new OrbitControls(camera, domElement);
  }

  destroy(): void {
  }

  // getObject3D(): Object3D {
  //    return null
  // }

  lock(): void {
    console.log('OrbitController lock: not impl',)
  }

  render(timeDelta: number): void {
  }

}
