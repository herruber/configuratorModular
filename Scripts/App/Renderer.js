

function Renderer(element) {

    var self = this;
    if (element === null) return this;
    
    var _renderer = new THREE.WebGLRenderer();
    _renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer = _renderer;
    this.cleanUpTime = 1000;
    this.fsQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial());
    this.renderView = element;
    this.renderer.setSize(element.clientWidth, element.clientHeight);
    this.renderer.domElement.id = "canvas";
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(new THREE.Color(1, 1, 1), 1);

    element.appendChild(this.renderer.domElement);

    this.Render = function () {

        for (var e in session.events) {

            session.events[e].forEach(function (o) {
                o();
            })

        }

        self.renderer.render(session.activeMode.scene, session.activeMode.camera);

        requestAnimationFrame(self.Render);
    }

    return this;
}
