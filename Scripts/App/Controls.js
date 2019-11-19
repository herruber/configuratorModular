

function Controls(settings) {

    var self = this;
    if (settings === null) return this;
    this.raycaster = settings.raycaster;
    this.screenPos = new THREE.Vector3();
    this.clipPos = new THREE.Vector3();
    this.intersects = [];
    this.target = undefined;
    this.indicator = settings.indicator;


    //Used to determine if user is inside an object
    this.isInside = false;

    this.rayCast = function (channel) {

    
        if (!channel) channel = "default";

        var scene = session.activeMode.scene;
        objects = scene.userData.channels[channel];

        // update the picking ray with the camera and mouse position
        self.raycaster.setFromCamera(self.clipPos, session.activeMode.camera);

        // calculate objects intersecting the picking ray
        var intersects = self.raycaster.intersectObjects(objects);

        this.intersects = intersects;

        if (intersects.length == 0) return null;

        return intersects[0];
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
                session.SetMode("2d");
                break;
            case "1":
                session.SetMode("3d");
                break;
            case "2":

                buildManager.Instantiate(
                    {
                        url: "/Content/Meshes/barack.glb",
                        position: buildManager.position,
                        rotation: new THREE.Quaternion(),
                        parent: null,
                        channel: "castable",
                        events: {
                            "onSelect": function (owner) {

                                owner.traverse(function (light) {

                                    if (light.type === "PointLight") {
                                        light.visible = true;
                                    }
                                });
                                
                                //self.indicator.position.set(owner.position.x, owner.position.y + owner.userData.size.getSize().y / 2.0, owner.position.z);
                            },
                            "onDeselect": function (owner) {
                                debugger;
                                owner.traverse(function (light) {

                                    if (light.type === "PointLight") {
                                        light.visible = false;
                                    }
                                });
                            }
                        }
                    });
                buildManager.position.x += buildManager.settings.size.x;
                break;
            case "3":
                break;
            case "ArrowUp":
                buildManager.position.add(0, buildManager.settings.size.y, 0);
                break;
            case "ArrowDown":
                buildManager.position.subtract(0, buildManager.settings.size.y, 0);
                break;
            case "ArrowLeft":
                buildManager.position.subtract(buildManager.settings.size.x, 0, 0);
                break;
            case "ArrowRight":
                buildManager.position.add(buildManager.settings.size.x10, 0, 0);
                break;
            default:

        }

    }

    this.onPointerMove = function (event) {
        self.UpdateMousePosition(event);
    }

    this.ExecuteEvent = function (object, name) {

        var events = object.userData.events;
        if (events && events[name]) events[name]();

    }

    this.onLeftClick = function (event) {


        var hit = self.rayCast("castable");

        if (hit) {

            var oldhit = self.target;
            self.target = hit;

            if(oldhit) self.ExecuteEvent(oldhit.object, "onDeselect");
            self.ExecuteEvent(hit.object, "onSelect");
         
          
        }
        else self.target = null;

    }

    return this;
}
