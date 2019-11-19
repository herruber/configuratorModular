
function Session(settings) {
   
    var self = this;
    this.modes = settings.modes;
    this.activeMode = null;
    this.children = [];
    this.events = {
        "onUpdate":[]
    }

    this.AddToAll = function (object, channel) {

        for (var mode in self.modes) {
            var scene = self.modes[mode].scene;
            var clone = object.clone();
            scene.add(clone);
            scene.userData.channels[channel || "default"].push(clone);
        }

    }

    //Use this to add meshes and other 3d objects that need to be lined in 2d mode
    this.Add = function (object, channel, mode) {

        //If no modes provided set it to all modes and add object to all scenes
        if (!mode) return null;

        var scene = self.modes[mode].scene;

        object.traverse(function (child) {

            if (child.userData.events) {

                for (var prop in child.userData.events) {
                    self.events[prop].push(child.userData.events[prop]);
                }

            }
        })

        scene.add(object);
        scene.userData.channels[channel || "default"].push(object);
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

    return this;
}