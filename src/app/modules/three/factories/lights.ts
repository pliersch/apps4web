import * as THREE from "three";

export function setupLights(scene: THREE.Scene) {
  // const ambientLight = new THREE.AmbientLight(0xcccccc);
  // this.scene.add(ambientLight);
  //
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  // directionalLight.position.set(1, 1, 0.5).normalize();
  // this.scene.add(directionalLight);

  // const spotLight = new THREE.SpotLight(0xffffff, 10);
  // spotLight.position.set(2, 5, 2);
  // spotLight.angle = Math.PI / 6;
  // spotLight.penumbra = 1;
  // spotLight.decay = 2;
  // spotLight.distance = 100;
  // // spotLight.map = textures[ 'disturb.jpg' ];
  //
  // spotLight.castShadow = true;
  // spotLight.shadow.mapSize.width = 1024;
  // spotLight.shadow.mapSize.height = 1024;
  // spotLight.shadow.camera.near = 10;
  // spotLight.shadow.camera.far = 200;
  // spotLight.shadow.focus = 1;
  // this.scene.add(spotLight);

  // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
  // hemiLight.color.setHSL(0.6, 1, 0.6);
  // hemiLight.groundColor.setHSL(0.095, 1, 0.75);
  // hemiLight.position.set(0, 50, 0);
  // this.scene.add(hemiLight);
  //
  // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
  // this.scene.add(hemiLightHelper);

  // const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  // dirLight.color.setHSL(0.1, 1, 0.95);
  // dirLight.position.set(-1, 1.75, 1);
  // dirLight.position.multiplyScalar(30);
  // this.scene.add(dirLight);
  //
  // dirLight.castShadow = true;
  //
  // dirLight.shadow.mapSize.width = 2048;
  // dirLight.shadow.mapSize.height = 2048;
  //
  // const d = 50;
  //
  // dirLight.shadow.camera.left = -d;
  // dirLight.shadow.camera.right = d;
  // dirLight.shadow.camera.top = d;
  // dirLight.shadow.camera.bottom = -d;
  //
  // dirLight.shadow.camera.far = 3500;
  // dirLight.shadow.bias = -0.0001;
  //
  // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
  // this.scene.add(dirLightHelper);
}
