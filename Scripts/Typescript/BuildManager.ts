import * as THREE from "three/src/three";
import * as GLTFLoader from "three/examples/jsm/loaders/GLTFLoader";

export class BuildManager {


    LoadMesh(url: string, onLoaded: any) {
        let loader = new GLTFLoader.GLTFLoader();

        loader.load(url, onLoaded);
    }


}