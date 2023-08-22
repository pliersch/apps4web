// import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
// import { loadGltfObject, loadHdrEnvironment } from "@modules/three/factories/asset.loader";
// import { createWebGlRenderer } from "@modules/three/factories/renderer";
// import * as THREE from "three";
// import { Raycaster } from "three";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
//
// @Injectable()
// export class ThreeService implements OnDestroy {
//   private canvas: HTMLCanvasElement;
//   private renderer: THREE.WebGLRenderer;
//   private camera: THREE.PerspectiveCamera;
//   private scene: THREE.Scene;
//   private light: THREE.AmbientLight;
//   private controls: PointerLockControls;
//   private frameId = 0;
//
//   private velocity = new THREE.Vector3(1, 1, 1);
//   private direction = new THREE.Vector3();
//   private moveForward = false;
//   private moveBackward = false;
//   private moveLeft = false;
//   private moveRight = false;
//   private raycaster: Raycaster;
//   private prevTime = performance.now();
//   private objects = [];
//   private readonly assetPath = '/assets/3d/';
//
//   public constructor(public ngZone: NgZone) {}
//
//   ngOnDestroy(): void {
//     if (this.frameId != null) {
//       cancelAnimationFrame(this.frameId);
//     }
//     this.renderer.dispose();
//   }
//
//   public createScene(htmlCanvas: ElementRef<HTMLCanvasElement>): void {
//     this.canvas = htmlCanvas.nativeElement;
//
//     this.renderer = createWebGlRenderer(htmlCanvas)
//     this.scene = new THREE.Scene();
//     this.scene.fog = new THREE.Fog(0xffffff, 0, 750);
//
//     loadHdrEnvironment(this.scene, this.assetPath, 'aristea_wreck_2k.hdr');
//     loadGltfObject(this.scene, this.assetPath, 'home.glb');
//
//     // this.scene.background = new THREE.Color(0x000000)
//     // let aspectRatio = this.htmlCanvas.clientWidth / this.htmlCanvas.clientHeight;
//
//     this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
//
//     this.camera.position.y = 0;
//     this.camera.position.z = 200;
//
//     this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
//     this.renderer.setPixelRatio(devicePixelRatio);
//     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
//     this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
//
//     // const blocker = document.getElementById( 'blocker' );
//     // const instructions = document.getElementById( 'instructions' );
//     //
//     // instructions.addEventListener( 'click', function () {
//     //
//     // 	controls.lock();
//     //
//     // } );
//     //
//     // controls.addEventListener( 'lock', function () {
//     //
//     // 	instructions.style.display = 'none';
//     // 	blocker.style.display = 'none';
//     //
//     // } );
//     //
//     // controls.addEventListener( 'unlock', function () {
//     //
//     // 	blocker.style.display = 'block';
//     // 	instructions.style.display = '';
//     //
//     // } );
//
//     this.scene.add(this.controls.getObject());
//
//     this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
//
//     document.addEventListener('keydown', (e) => this.onKeyDown(e));
//     document.addEventListener('keyup', (e) => this.onKeyUp(e));
//
//   }
//
//   private onKeyDown(event: KeyboardEvent): void {
//     switch (event.code) {
//
//       case 'ArrowUp':
//       case 'KeyW':
//         this.moveForward = true;
//         break;
//
//       case 'ArrowLeft':
//       case 'KeyA':
//         this.moveLeft = true;
//         break;
//
//       case 'ArrowDown':
//       case 'KeyS':
//         this.moveBackward = true;
//         break;
//
//       case 'ArrowRight':
//       case 'KeyD':
//         this.moveRight = true;
//         break;
//     }
//   }
//
//   private onKeyUp(event: KeyboardEvent): void {
//     switch (event.code) {
//
//       case 'ArrowUp':
//       case 'KeyW':
//         this.moveForward = false;
//         break;
//
//       case 'ArrowLeft':
//       case 'KeyA':
//         this.moveLeft = false;
//         break;
//
//       case 'ArrowDown':
//       case 'KeyS':
//         this.moveBackward = false;
//         break;
//
//       case 'ArrowRight':
//       case 'KeyD':
//         this.moveRight = false;
//         break;
//
//     }
//   }
//
//   public animate(): void {
//     // We have to run this outside angular zones,
//     // because it could trigger heavy changeDetection cycles.
//     this.ngZone.runOutsideAngular(() => {
//       if (document.readyState !== 'loading') {
//         this.render();
//       } else {
//         window.addEventListener('DOMContentLoaded', () => {
//           this.render();
//         });
//       }
//
//       window.addEventListener('resize', () => {
//         this.resize();
//       });
//     });
//   }
//
//   public render(): void {
//     this.frameId = requestAnimationFrame(() => {
//       this.render();
//     });
//     const time = performance.now();
//
//     if (!this.controls.isLocked) {
//
//       this.raycaster.ray.origin.copy(this.controls.getObject().position);
//       this.raycaster.ray.origin.y -= 10;
//
//       // const intersections = this.raycaster.intersectObjects(this.objects, false);
//
//       // const onObject = intersections.length > 0;
//
//       const delta = (time - this.prevTime) / 1000;
//
//       this.velocity.x -= this.velocity.x * 10.0 * delta;
//       this.velocity.z -= this.velocity.z * 10.0 * delta;
//
//       this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
//
//       this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
//       this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
//       this.direction.normalize(); // this ensures consistent movements in all directions
//
//
//       if (this.moveForward || this.moveBackward) {
//         this.velocity.z -= this.direction.z * 400.0 * delta;
//       }
//       if (this.moveLeft || this.moveRight) {
//         this.velocity.x -= this.direction.x * 400.0 * delta;
//       }
//
//       // if (onObject) {
//       //   this.velocity.y = Math.max(0, this.velocity.y);
//       // }
//
//       this.controls.moveRight(-this.velocity.x * delta);
//       this.controls.moveForward(-this.velocity.z * delta);
//
//       this.controls.getObject().position.y += (this.velocity.y * delta); // new behavior
//
//       if (this.controls.getObject().position.y < 10) {
//
//         this.velocity.y = 0;
//         this.controls.getObject().position.y = 10;
//       }
//
//     }
//
//     this.prevTime = time;
//     this.renderer.render(this.scene, this.camera);
//   }
//
//   public resize(): void {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//
//     this.camera.aspect = width / height;
//     this.camera.updateProjectionMatrix();
//
//     this.renderer.setSize(width, height);
//   }
// }


import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { loadGltfObject, loadHdrEnvironment } from "@modules/three/factories/asset.loader";
import { createPerspectiveCamera } from "@modules/three/factories/camera";
import { createOrbitControls } from "@modules/three/factories/controls";
import { createWebGlRenderer } from "@modules/three/factories/renderer";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

@Injectable()
export class ThreeService implements OnDestroy {
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private controls: OrbitControls;
  private frameId = 0;

  private readonly assetPath = '/assets/3d/';

  public constructor(public ngZone: NgZone) {}

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
    this.renderer.dispose();
  }

  public createScene(htmlCanvas: ElementRef<HTMLCanvasElement>): void {
    this.renderer = createWebGlRenderer(htmlCanvas);
    this.scene = new THREE.Scene();
    loadHdrEnvironment(this.scene, this.assetPath, 'aristea_wreck_2k.hdr');
    loadGltfObject(this.scene, this.assetPath, 'home.glb');
    this.camera = createPerspectiveCamera(htmlCanvas);
    // no effect if using hdr (only light and disable image is possible )
    // this.scene.background = new THREE.Color(0x000000)
    this.controls = createOrbitControls(this.camera, this.renderer);
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
