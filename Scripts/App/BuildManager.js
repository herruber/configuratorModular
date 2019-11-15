
var BuildManager = function (barackSettings) {

    var self = this;
    this.floor = 0;
    this.column = 0;
    this.barackSettings = barackSettings;
    this.selectedBarack = null;


    this.InstantiateObject = function (data, settings) {

        var pos = settings.position || new THREE.Vector3();
        var rot = settings.rotation || new THREE.Euler();

        data.scene.children.forEach(function (child) {

            for (var mode in controlManager.modes) {

                var obj = child.clone();
                obj.material = new THREE.MeshStandardMaterial();

                obj.rotation.set(rot.x, rot.y, rot.z);

                controlManager.modes[mode].scene.add(obj);
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

    this.SetFloor = function (index) {
        this.floor = index;
    }

    this.AddBarack = function (loadSettings) {

        var loader = new THREE.GLTFLoader();

        loader.load(loadSettings.url, function (data) {
            loadSettings.position = new THREE.Vector3(self.column * 3 + self.barackSettings.spacingX, self.floor * self.barackSettings.spacingY, 0);
            self.InstantiateObject(data, loadSettings);
            debugger;
            self.column++;

        });



    }

    return self;
}
