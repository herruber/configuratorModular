

function Renderer(element) {

    var self = this;
    this.element = element;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.cleanUpTime = 1000;
    this.fsQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial());
    this.renderView = element;
    this.renderer.setSize(element.clientWidth, element.clientHeight);
    this.renderer.domElement.id = "canvas";
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    element.appendChild(this.renderer.domElement);

    this.Render = function () {

        self.renderer.render(controlManager.activeMode.scene, controlManager.activeMode.camera);

        requestAnimationFrame(self.Render);
    }

    return this;
}
