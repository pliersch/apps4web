import { ElementRef } from "@angular/core";
import * as THREE from "three";
import { WebGLRenderer } from "three";

export function createWebGlRenderer(htmlCanvas: ElementRef<HTMLCanvasElement>): WebGLRenderer {
  const canvas: HTMLCanvasElement = htmlCanvas.nativeElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,    // transparent background
    antialias: true // smooth edges
  });
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(devicePixelRatio);
  return renderer;
}
