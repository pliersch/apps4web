import { ThreeObject } from "@modules/three/serivce/three.service";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export class PersonController implements ThreeObject {

  private readonly _controls: PointerLockControls;
  public get controls(): PointerLockControls {
    return this._controls;
  }

  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;

  private velocity = new THREE.Vector3(1, 1, 1);
  private direction = new THREE.Vector3();

  constructor(camera: PerspectiveCamera, domElement: HTMLCanvasElement) {
    this._controls = new PointerLockControls(camera, domElement);
    document.addEventListener('keydown', (e) => this.onKeyDown(e));
    document.addEventListener('keyup', (e) => this.onKeyUp(e));
  }

  lock(): void {
    this._controls.lock();
  }

  private onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true;
        break;
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false;
        break;

      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false;
        break;

      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false;
        break;
    }
  }

  public render(timeDelta: number): void {
    if (this._controls.isLocked) {

      // this.raycaster.ray.origin.copy(this._controls.getObject().position);
      // this.raycaster.ray.origin.y -= 10;

      // const intersections = this.raycaster.intersectObjects(this.objects, false);

      // const onObject = intersections.length > 0;

      this.velocity.x -= this.velocity.x * 10.0 * timeDelta;
      this.velocity.z -= this.velocity.z * 10.0 * timeDelta;
      // this.velocity.y -= 9.8 * 100.0 * timeDelta; // 100.0 = mass

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize(); // this ensures consistent movements in all directions


      if (this.moveForward || this.moveBackward) {
        this.velocity.z -= this.direction.z * 400.0 * timeDelta;
      }
      if (this.moveLeft || this.moveRight) {
        this.velocity.x -= this.direction.x * 400.0 * timeDelta;
      }

      // if (onObject) {
      //   this.velocity.y = Math.max(0, this.velocity.y);
      // }

      this._controls.moveRight(-this.velocity.x * timeDelta);
      this._controls.moveForward(-this.velocity.z * timeDelta);

      // this._controls.getObject().position.y += (this.velocity.y * delta); // new behavior

      // if (this._controls.getObject().position.y < 10) {
      //
      //   this.velocity.y = 0;
      //   this._controls.getObject().position.y = 10;
      // }

    }

  }

  // getObject3D(): THREE.Object3D<THREE.Event> {
  //   return this._controls.getObject()
  // }

  destroy(): void {
    this._controls.dispose();
    document.removeEventListener('keydown', (e) => this.onKeyDown(e));
    document.removeEventListener('keyup', (e) => this.onKeyUp(e));
  }

}
