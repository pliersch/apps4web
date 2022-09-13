import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  //* Cube Properties

  @Input() public rotationSpeedX: number = 0.005;

  @Input() public rotationSpeedY: number = 0.003;

  @Input() public size: number = 200;

  @Input() public texture: string = "/assets/texture.jpg";


  //* Stage Properties

  @Input() public cameraZ: number = 15;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);

  private camera!: THREE.PerspectiveCamera;
  private controls: TrackballControls;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({map: this.loader.load(this.texture)});

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  ngOnInit(): void {
    const loader = new GLTFLoader();
    loader.load('/assets/v01.glb', (gltf) => {
      this.scene.add(gltf.scene);
    }, undefined, (error) => {
      console.error(error);
    });
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.animate();
  }

  /**
   *Animate the cube
   *
   * @private
   * @memberof CubeComponent
   */
  private animateCube(): void {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene(): void {
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0x000000)
    this.scene.background = new THREE.Color(0x777777)
    this.scene.add(this.cube);
    //*Camera
    let aspectRatio = this.canvas.clientWidth / this.canvas.clientHeight;

    // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    // this.camera = new THREE.PerspectiveCamera(
    //   this.fieldOfView,
    //   aspectRatio,
    //   this.nearClippingPlane,
    //   this.farClippingPlane
    // )
    this.camera.position.z = this.cameraZ;

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    const c = this.controls;
    c.target.set(0, 0, 0);

    c.rotateSpeed = 5.0;
    c.zoomSpeed = 1.2;
    c.panSpeed = 0.01;

    c.noZoom = false;
    c.noPan = false;

    c.staticMoving = false;
    c.dynamicDampingFactor = 0.15;
    // c.keys = ['KeyA', 'KeyS', 'KeyD']; not working
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.render();
  }

  private render(): void {
    let component: HouseComponent = this;
    component.animateCube();
    component.renderer.render(component.scene, component.camera);
  }

}
