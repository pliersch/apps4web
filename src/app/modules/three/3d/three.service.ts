// import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
// import * as THREE from "three";
// import { Raycaster } from "three";
// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
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
//   private moveForward = false;
//   private moveBackward = false;
//   private moveLeft = false;
//   private moveRight = false;
//   private raycaster: Raycaster;
//   private prevTime = performance.now();
//   private objects = [];
//
//   public constructor(public ngZone: NgZone) {}
//
//   ngOnDestroy(): void {
//     console.log('ThreeService ngOnDestroy: ',)
//     // if (this.frameId != null) {
//     //   cancelAnimationFrame(this.frameId);
//     // }
//   }
//
//   public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
//
//     // The first step is to get the reference of the canvas element from our HTML document
//     this.canvas = canvas.nativeElement;
//
//     this.renderer = new THREE.WebGLRenderer({
//       canvas: this.canvas,
//       alpha: true,    // transparent background
//       antialias: true // smooth edges
//     });
//     // this.renderer.setSize(this.canvas.width, this.canvas.height);
//     this.scene = new THREE.Scene();
//     this.scene.fog = new THREE.Fog(0xffffff, 0, 750);
//
//     new RGBELoader()
//       .setPath('/assets/3d/')
//       // .load('epping_forest_02_4k.hdr', (texture) => {
//       .load('aristea_wreck_2k.hdr', (texture) => {
//         texture.mapping = THREE.EquirectangularReflectionMapping;
//         // this.scene.background = texture;
//         this.scene.environment = texture;
//       });
//
//     new GLTFLoader().load('/assets/3d/home.gltf', (gltf) => {
//       gltf.scene.scale.set(10, 10, 10);
//       this.scene.add(gltf.scene);
//       this.objects.push(gltf.scene.children)
//       // gltf.scene.getObjectByName()
//     }, undefined, (error) => {
//       console.error(error);
//     });
//
//     // this.scene.background = new THREE.Color(0x000000)
//     this.scene.background = new THREE.Color(0x777777)
//     // let aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;
//
//     this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
//
//     this.camera.position.y = 60;
//     this.camera.position.z = 200;
//
//     this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
//     this.renderer.setPixelRatio(devicePixelRatio);
//     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
//
//     // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
//     // const c = this.controls;
//     // c.target.set(0, 0, 0);
//     //
//     // // c.minPolarAngle = Math.PI / 2;
//     // // c.maxPolarAngle = Math.PI / 2;
//     //
//     // c.rotateSpeed = 5.0;
//     // c.zoomSpeed = 1.2;
//     // c.panSpeed = 0.01;
//
//     // c.noZoom = false;
//     // c.noPan = false;
//
//     const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
//     light.position.set(0.5, 1, 0.75);
//     this.scene.add(light);
//
//     this.controls = new PointerLockControls(this.camera, document.body);
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
//     document.addEventListener('keydown', this.onKeyDown);
//     document.addEventListener('keyup', this.onKeyUp);
//
//   }
//
//   private onKeyDown(event: Event): void {
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
//   private onKeyUp(event: Event): void {
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
//     if (this.controls.isLocked) {
//
//       this.raycaster.ray.origin.copy(this.controls.getObject().position);
//       this.raycaster.ray.origin.y -= 10;
//
//       const intersections = this.raycaster.intersectObjects(this.objects, false);
//
//       const onObject = intersections.length > 0;
//
//       const delta = (time - this.prevTime) / 1000;
//
//       velocity.x -= velocity.x * 10.0 * delta;
//       velocity.z -= velocity.z * 10.0 * delta;
//
//       velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
//
//       direction.z = Number(moveForward) - Number(moveBackward);
//       direction.x = Number(moveRight) - Number(moveLeft);
//       direction.normalize(); // this ensures consistent movements in all directions
//
//       if (moveForward || moveBackward) {
//         velocity.z -= direction.z * 400.0 * delta;
//       }
//       if (moveLeft || moveRight) {
//         velocity.x -= direction.x * 400.0 * delta;
//       }
//
//       if (onObject === true) {
//
//         velocity.y = Math.max(0, velocity.y);
//         canJump = true;
//
//       }
//
//       controls.moveRight(-velocity.x * delta);
//       controls.moveForward(-velocity.z * delta);
//
//       controls.getObject().position.y += (velocity.y * delta); // new behavior
//
//       if (controls.getObject().position.y < 10) {
//
//         velocity.y = 0;
//         controls.getObject().position.y = 10;
//
//         canJump = true;
//
//       }
//
//     }
//
//     prevTime = time;
//
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
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

@Injectable()
export class ThreeService implements OnDestroy {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;
  private controls: OrbitControls;
  private frameId = 0;

  public constructor(public ngZone: NgZone) {}

  ngOnDestroy(): void {
    console.log('ThreeService ngOnDestroy: ',)
    // if (this.frameId != null) {
    //   cancelAnimationFrame(this.frameId);
    // }
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {

    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    // this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.scene = new THREE.Scene();

    new RGBELoader()
      .setPath('/assets/3d/')
      // .load('epping_forest_02_4k.hdr', (texture) => {
      .load('aristea_wreck_2k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        // this.scene.background = texture;
        this.scene.environment = texture;
      });

    new GLTFLoader().load('/assets/3d/home.gltf', (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      this.scene.add(gltf.scene);
      // gltf.scene.getObjectByName()
    }, undefined, (error) => {
      console.error(error);
    });

    // const ambientLight = new THREE.AmbientLight(0xcccccc);
    // this.scene.add(ambientLight);
    //
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    // directionalLight.position.set(1, 1, 0.5).normalize();
    // this.scene.add(directionalLight);


    // this.scene.background = new THREE.Color(0x000000)
    this.scene.background = new THREE.Color(0x777777)
    // this.scene.add(this.cube);
    //*Camera
    // let aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;

    // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    // this.camera = new THREE.PerspectiveCamera(
    //   this.fieldOfView,
    //   aspectRatio,
    //   this.nearClippingPlane,
    //   this.farClippingPlane
    // )

    this.camera.position.y = 60;
    this.camera.position.z = 200;

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    const c = this.controls;
    c.target.set(0, 0, 0);

    // c.minPolarAngle = Math.PI / 2;
    // c.maxPolarAngle = Math.PI / 2;

    c.rotateSpeed = 5.0;
    c.zoomSpeed = 1.2;
    c.panSpeed = 0.01;

    // c.noZoom = false;
    // c.noPan = false;

    // c.staticMoving = false;
    // c.dynamicDampingFactor = 0.15;
    // c.keys = ['KeyA', 'KeyS', 'KeyD']; not working
    const spotLight = new THREE.SpotLight(0xffffff, 10);
    spotLight.position.set(2, 5, 2);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 1;
    spotLight.decay = 2;
    spotLight.distance = 100;
    // spotLight.map = textures[ 'disturb.jpg' ];

    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.focus = 1;
    this.scene.add(spotLight);

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
