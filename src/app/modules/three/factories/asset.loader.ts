import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export function loadHdrEnvironment(scene: THREE.Scene, assetPath: string, hdrFileName: string): void {
  new RGBELoader()
    .setPath(assetPath)
    .load(hdrFileName, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
    });
}

export function loadGltfObject(scene: THREE.Scene, assetPath: string, objFileName: string): void {
  new GLTFLoader()
    .setPath(assetPath)
    .load(objFileName, (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      scene.add(gltf.scene);
    }, undefined, (error) => {
      console.error(error);
    });
}
