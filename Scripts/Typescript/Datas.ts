import * as THREE from "three/src/three";

export interface SceneData {

    events: {

    };

    channels: {
        "default": Array<THREE.Object3D>,
        "castable": Array<THREE.Object3D>
    }


}