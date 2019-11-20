import * as THREE from "three/src/three";
import {Session} from "./Session";

declare var session: Session;

export class Renderer {

    

    renderer: THREE.WebGLRenderer;
    element: HTMLElement;

    constructor(element: HTMLElement) {

        this.element = element;
        let renderer = new THREE.WebGLRenderer();

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setClearColor(new THREE.Color(1, 1, 1), 1);

        element.appendChild(renderer.domElement);
        this.renderer = renderer;
    }

    Render() {
        for (var e in session.events) {

            session.events[e].forEach(function (o) {
                o();
            })

        }

        this.renderer.render(session.activeMode.scene, session.activeMode.camera);

        requestAnimationFrame(this.Render);
    }

}
