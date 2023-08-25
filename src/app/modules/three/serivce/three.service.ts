import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { loadGltfObject, loadHdrEnvironment } from "@modules/three/factories/asset.loader";
import { createPerspectiveCamera } from "@modules/three/factories/camera";
import { PersonController } from "@modules/three/factories/personController";
import { createWebGlRenderer } from "@modules/three/factories/renderer";
import * as THREE from "three";
import { Vector3 } from "three";


export interface ThreeEventHandler {
  onControlsLock(): void;
  onControlsUnlock(): void;
}

export interface ThreeObject {
  // getObject3D(): THREE.Object3D;
  lock(): void;
  render(timeDelta: number): void;
  destroy(): void;
}

@Injectable()
export class ThreeService implements OnDestroy {
  private handler: ThreeEventHandler;
  // private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  // private light: THREE.AmbientLight;
  // private controls: PointerLockControls;
  private frameId = 0;
  // private raycaster: Raycaster;
  private prevTime = performance.now();
  private objects: ThreeObject[] = [];
  private readonly assetPath = '/assets/3d/';
  private readonly objStore = {
    Person: PersonController
  };

  public constructor(public ngZone: NgZone) {}

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
    this.renderer.dispose();
  }

  public createScene(handler: ThreeEventHandler, htmlCanvas: ElementRef<HTMLCanvasElement>): void {
    this.handler = handler;
    // this.canvas = htmlCanvas.nativeElement;

    this.renderer = createWebGlRenderer(htmlCanvas)
    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog(0xffffff, 0, 750);

    loadHdrEnvironment(this.scene, this.assetPath, 'aristea_wreck_2k.hdr');
    loadGltfObject(this.scene, this.assetPath, 'home.glb');

    this.camera = createPerspectiveCamera(new Vector3(40, 14, 20), htmlCanvas);
    this.renderer = createWebGlRenderer(htmlCanvas);
    this.addObject('Person')
    // this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
  }

  public switchControl(camera: string): void {
    if (camera == 'person') {
      const controller = new PersonController(this.camera, this.renderer.domElement);
      controller.controls.addEventListener('lock', () => this.handler.onControlsLock());
      controller.controls.addEventListener('unlock', () => this.handler.onControlsUnlock());
      //not necessary
      // this.scene.add(controller.getObject());
      this.objects.push(controller)
    }
  }

  public addObject(className: any): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const threeObject = this.objStore[className];
    if (!threeObject) {
      throw new Error(`Unknown ThreeObject '${className}'.`);
    }
    const controller = new threeObject(this.camera, this.renderer.domElement);
    controller.controls.addEventListener('lock', () => this.handler.onControlsLock());
    controller.controls.addEventListener('unlock', () => this.handler.onControlsUnlock());
    //not necessary
    // this.scene.add(controller.getObject());
    this.objects.push(controller)
  }

  public lockControls(): void {
    for (const object of this.objects) {
      object.lock()
    }
  }

  public animate(): void {
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
    const time = performance.now();
    const delta = (time - this.prevTime) / 1000;
    for (const object of this.objects) {
      object.render(delta)
    }
    this.renderer.render(this.scene, this.camera);
    this.prevTime = time;
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}


// import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
// import { loadGltfObject, loadHdrEnvironment } from "@modules/three/factories/asset.loader";
// import { createPerspectiveCamera } from "@modules/three/factories/camera";
// import { createOrbitControls } from "@modules/three/factories/controls";
// import { PersonController } from "@modules/three/factories/personController";
// import { createWebGlRenderer } from "@modules/three/factories/renderer";
// import * as THREE from "three";
// import { Vector3 } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//
// @Injectable()
// export class ThreeService implements OnDestroy {
//   private renderer: THREE.WebGLRenderer;
//   private camera: THREE.PerspectiveCamera;
//   private scene: THREE.Scene;
//   private controls: OrbitControls;
//   private frameId = 0;
//
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
//     this.renderer = createWebGlRenderer(htmlCanvas);
//     this.scene = new THREE.Scene();
//     loadHdrEnvironment(this.scene, this.assetPath, 'aristea_wreck_2k.hdr');
//     loadGltfObject(this.scene, this.assetPath, 'home.glb');
//     this.camera = createPerspectiveCamera(new Vector3(10, 30, 50), htmlCanvas);
//     // no effect if using hdr (only light and disable image is possible )
//     // this.scene.background = new THREE.Color(0x000000)
//     this.controls = createOrbitControls(this.camera, this.renderer);
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
//     this.controls.update();
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
