function ShadowSettings(bias, width, height) {

    this.bias = bias != undefined ? bias : 0.05;
    this.width = width != undefined ? width : 1024;
    this.height = height != undefined ? height : 1024;
    this.shadowType = 0;

    return this;
}

function LoadSettings(url, position, rotation, parent) {

    this.url = url;
    this.position = position;
    this.rotation = rotation;
    this.parent = parent;
    return this;

}

function RenderMode(settings) {
    
    //var set = {
    //    target: "",
    //    position: "",
    //    camera: "",
    //    element: "",
    //    enableRotation: "",
    //    enablePanning: "",
    //    scene: ""
    //}

    var target = settings.target || new THREE.Vector3();
    var pos = settings.position || new THREE.Vector3();
    settings.camera.position.set(pos.x, pos.y, pos.z);
    settings.camera.lookAt(target);
    this.element = settings.element;
    this.controller = new THREE.OrbitControls(settings.camera, settings.element);
    this.controller.enablePan = settings.enablePanning;
    this.controller.enableRotate = settings.enableRotation;
    this.scene = settings.scene;
    this.camera = settings.camera;
    this.scene.add(settings.camera);
    return this;

}