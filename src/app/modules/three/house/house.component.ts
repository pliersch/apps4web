import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  // //* Cube Properties
  //
  // @Input() public rotationSpeedX = 0.005;
  // @Input() public rotationSpeedY = 0.003;
  // @Input() public size = 200;
  // @Input() public texture = "/assets/texture.jpg";

  //* Stage Properties
  // @Input() public cameraZ = 15;
  @Input() public fieldOfView = 1;
  @Input('nearClipping') public nearClippingPlane = 1;
  @Input('farClipping') public farClippingPlane = 1000;

  //? Helper Properties (Private Properties);
  private camera!: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  // private loader = new THREE.TextureLoader();
  // private geometry = new THREE.BoxGeometry(1, 1, 1);
  // private material = new THREE.MeshBasicMaterial({map: this.loader.load(this.texture)});

  // private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  ngOnInit(): void {
    new RGBELoader()
      .setPath('/assets/3d/')
      .load('studio_small_01_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = texture;
        this.scene.environment = texture;
      });
    new GLTFLoader().load('/assets/3d/export01.gltf', (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      this.scene.add(gltf.scene);
      // gltf.scene.getObjectByName()
    }, undefined, (error) => {
      console.error(error);
    });
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.animate();
  }

  // private animateCube(): void {
  //   this.cube.rotation.x += this.rotationSpeedX;
  //   this.cube.rotation.y += this.rotationSpeedY;
  // }

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
    this.camera.position.y = 4;
    this.camera.position.z = 10;

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

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    this.render();
  }

  private render(): void {
    // component.animateCube();
    this.renderer.render(this.scene, this.camera);
  }

}
