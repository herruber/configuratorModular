

function Controls(settings) {

    var self = this;
    this.raycaster = settings.raycaster;
    this.modes = settings.modes;
    this.activeMode = null;
    this.screenPos = new THREE.Vector3();
    this.clipPos = new THREE.Vector3();
    
    for (var prop in this.modes) {
        this.activeMode = this.modes[prop];
        break;
    }

    this.SetMode = function (name) {

        if (this.activeMode) {
            this.activeMode.controller.enabled = false;
        }

        this.activeMode = this.modes[name];
        this.activeMode.controller.enabled = true;

        if (!this.activeMode.isRotationEnabled) this.activeMode.camera.rotation.set(0, 0, 0);

        this.activeMode.controller.update();
    }

    this.rayCast = function (objects) {

    
        var scene = self.activeMode.scene;
        objects = objects || scene.children;

        // update the picking ray with the camera and mouse position
        self.raycaster.setFromCamera(self.clipPos, self.activeMode.camera);

        // calculate objects intersecting the picking ray
        var intersects = self.raycaster.intersectObjects(objects);

        for (var i = 0; i < intersects.length; i++) {
            intersects[i].object.material.color.set(0xff0000);
        }

        //renderer.render(scene, camera);
    }

    this.UpdateMousePosition = function (event) {

        screenPos = new THREE.Vector3(event.x, event.y, 0);

        var domElement = renderManager.renderer.domElement;
        var offsetpos = domElement.getBoundingClientRect();

        var wx = ((event.x - offsetpos.left) / domElement.clientWidth) * 2 - 1;
        var wy = -((event.y - offsetpos.top) / domElement.clientHeight) * 2 + 1;
        var wz = 0.5;

        self.clipPos.x = wx;
        self.clipPos.y = wy;
    }

    this.centerToMouse = function(element) {
        var x = parseFloat(renderManager.element.clientWidth) / 2;
        var y = parseFloat(renderManager.element.clientHeight) / 2;
        var offset = new THREE.Vector2(self.screenPos.x - x, self.screenPos.y - y);
      
        element.style.left = offset.x + "px";
        element.style.top = offset.y + "px";
    }

    this.onKeyDown = function (event) {
        console.log(event.key);

        switch (event.key) {
            case "0":
                self.SetMode("2d");
                break;
            case "1":
                self.SetMode("3d");
                break;
            case "2":
                buildManager.AddBarack(new LoadSettings("/Content/Meshes/barack.glb",
                    new THREE.Vector3(),
                    new THREE.Quaternion()
                    ));
                break;
            case "3":
                break;
            case "ArrowUp":
                buildManager.floor++;
                break;
            case "ArrowDown":
                buildManager.floor--;
                break;
            case "ArrowLeft":
                buildManager.column--;
                break;
            case "ArrowRight":
                buildManager.column++;
                break;
            default:

        }

    }

    this.onPointerMove = function (event) {
        self.UpdateMousePosition(event);
    }

    return this;
}
