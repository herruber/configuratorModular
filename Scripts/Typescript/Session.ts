import * as THREE from "three/src/three";
import {Rendermode} from "./Rendermode";


interface Modes {
    [key: string]: Rendermode;
}

export class Session {

    modes: Modes;
    activeMode: Rendermode;

    constructor(modes: Modes) {

        this.modes = modes;

    }

    add(object: THREE.Object3D, mode: string) {

        let scene = this.modes[mode].scene;

        scene.add(object);
       



    }

}