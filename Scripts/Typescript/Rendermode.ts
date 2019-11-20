
import * as THREE from "three/src/three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Rendermode {

    scene: THREE.Scene;
    camera: THREE.Camera;
    controller: OrbitControls;
    element: HTMLElement;

    constructor(scene: THREE.Scene, camera: THREE.Camera, element: HTMLElement) {
        this.scene = scene;
        this.camera = camera;
        this.scene.add(camera);
        this.controller = new OrbitControls(this.camera, element);
        this.element = element;
    }
}