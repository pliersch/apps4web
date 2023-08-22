import * as THREE from "three";
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
