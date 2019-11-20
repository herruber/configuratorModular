
import * as THREE from "three/src/three";
import {Session} from "./Session";
import {Rendermode} from "./Rendermode";
import {Renderer} from "./Renderer";
import {Datas} from "./Datas";

var session: Session;
var renderer: Renderer;

function Init() {

 
    var element = document.getElementById("renderview");

    let directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1));
    directionalLight.name = "sun";
    directionalLight.intensity = 1;
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = 0.00003;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.2;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.top = 12;
    directionalLight.shadow.camera.left = -19;
    directionalLight.shadow.camera.right = 19;

    let light = new THREE.HemisphereLight(0xe8e7da, 0xaaaaaa, 0.7);
    light.rotation.set(0, 0, 0);
    directionalLight.add(light)

    let scene2d = new THREE.Scene();
    scene2d.userData = 

    let scene3d = new THREE.Scene();
    scene3d.userData["channels"] = {
        "default": [],
        "castable": []
    }

    var aspect = element.clientWidth / element.clientHeight;
    var osize = 5;

    let camera2d = new THREE.OrthographicCamera(-osize * aspect, osize * aspect, osize, -osize, 0.1, 100);
    let camera3d = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);

    let mode2d = new Rendermode(scene2d, camera2d, element);
    let mode3d = new Rendermode(scene3d, camera3d, element);


    session = new Session({ "2d": mode2d, "3d": mode3d });
    session.activeMode = session.modes["2d"];
    renderer = new Renderer(element);


}




window.onload = Init;
