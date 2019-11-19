
var BuildManager = function (settings) {

    var self = this;
    if (settings === null) return this;
    this.settings = settings;
    this.position = new THREE.Vector3();
    this.selectedBarack = null;

    this.InstantiateObject = function (data, settings) {

        var pos = settings.position || new THREE.Vector3();
        var rot = settings.rotation || new THREE.Euler();
        var channel = settings.channel || "default";
        var modes = settings.modes || session.modes;

        data.scene.children.forEach(function (child) {

            var size = new THREE.Box3().setFromObject(child);
            var scope = this;

            for (var mode in modes) {

                var scope = this;
                var cmode = session.modes[mode];
                var obj = child.clone();

                obj.userData.size = size;
                obj.userData.owner = obj;
                obj.userData.events = {
                    owner: obj,
                    "onSelect": function () {
                        settings.events.onSelect(this.owner);
                    },
                    "onDeselect": function () {
                        debugger;
                        settings.events.onDeselect(this.owner);
                    }
                };
               
                if (cmode.wireframe) {
                    obj = new THREE.LineSegments(new THREE.EdgesGeometry(obj.geometry, 30), new THREE.LineBasicMaterial({color: new THREE.Color(0, 0, 0)}));
                }
                else {
                    obj.material = new THREE.MeshStandardMaterial();

                    obj.traverse(function (light) {

                        if (light.name.toLowerCase().indexOf("light") > -1) {
                            var pointlight = new THREE.PointLight(0xffffff, 0.5, 6, 3);
                            pointlight.visible = false;
                            pointlight.castShadow = true;
                            light.add(pointlight);
                            light.add(new THREE.PointLightHelper(pointlight, 0.5, 0x00ff00));
                        }
                    })
                }

                obj.userData.originalColor = obj.material.color.clone();
                obj.rotation.set(rot.x, rot.y, rot.z);

                cmode.scene.add(obj);
                cmode.scene.userData.channels[channel].push(obj);

                obj.castShadow = settings.castShadow || true;
                obj.receiveShadow = settings.receiveShadow || true;
                obj.position.set(pos.x, pos.y, pos.z);

            }

        })
    }

    this.AddToBarack = function (loadSettings, fn) {

        if (!self.selectedBarack) {
            console.warn("No barack is selected");
            return;
        }

        LoadMesh(loadSettings.url, new function (data) {
            fn(data, loadSettings)
        });

    }

    this.Instantiate = function (settings) {

        var loader = new THREE.GLTFLoader();

        loader.load(settings.url, function (data) {
            self.InstantiateObject(data, settings);
            self.column++;

        });

    }

    return self;
}
