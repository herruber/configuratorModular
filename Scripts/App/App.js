
var renderManager;
var buildManager;
var controlManager;
var session;


function Init() {

    buildManager = new BuildManager({
      size: new THREE.Vector3(2.95, 3, 8.65)
    });

    var element = document.getElementById("renderview");

    var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1));
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

    var light = new THREE.HemisphereLight(0xe8e7da, 0xaaaaaa, 0.7);
    light.rotation.set(0, 0, 0);
    directionalLight.add(light)

    var sceneA = new THREE.Scene();
    sceneA.userData.channels = {
        "default": [],
        "castable": []
    }

    var sceneB = new THREE.Scene();
    sceneB.userData.channels = {
        "default": [],
        "castable": []
    }

    var aspect = element.clientWidth / element.clientHeight;
    var osize = 5;

    var renderModeSettings2d = {
        position: new THREE.Vector3(0, 5, 0),
        camera: new THREE.OrthographicCamera(-osize * aspect, osize * aspect, osize, -osize, 0.1, 100),
        scene: sceneA,
        element: element,
        enableRotation: false,
        enablePanning: true,
        wireframe: true,
        grid: true
    }

    var renderModeSettings3d = {
        position: new THREE.Vector3(0, 1, -10),
        camera: new THREE.PerspectiveCamera(60, aspect, 0.1, 100),
        scene: sceneB,
        element: element,
        enableRotation: true,
        enablePanning: true
    }

    session = new Session({
        modes: {
            "2d": new RenderMode(renderModeSettings2d),
            "3d": new RenderMode(renderModeSettings3d)
        }
    });

    session.activeMode = session.modes["2d"];

    var gridhelper = new THREE.GridHelper(100, 100, new THREE.Color(0, 0, 0), new THREE.Color(0, 0, 0));
    gridhelper.material.opacity = 0.25;
    gridhelper.material.transparent = true;
    session.Add(gridhelper, null, ["2d"]);
    session.Add(directionalLight, null, ["3d"]);

    var material = new THREE.MeshBasicMaterial();

    var indicator = new THREE.LineSegments(
        new THREE.EdgesGeometry(
        new THREE.BoxBufferGeometry(buildManager.settings.size.x, buildManager.settings.size.y, buildManager.settings.size.z), 30),
        new THREE.LineBasicMaterial({ color: new THREE.Color(0, 1, 0) }));

    indicator.userData.events = {
        "onUpdate": function () {
            console.log("updating...");

            if (!controlManager.target) {
                indicator.visible = false;
                return;
            }

            indicator.visible = true;
            session.activeMode.scene.add(indicator);
            indicator.position = controlManager.target.position;
        }
    }

    session.Add(indicator, "default", ["2d"]);

    controlManager = new Controls({
        raycaster: new THREE.Raycaster(),
        indicator: indicator
    });

    renderManager = new Renderer(element);
    renderManager.Render();

    document.addEventListener("keydown", function (event) {
        controlManager.onKeyDown(event);
    })

    document.addEventListener("change", function (event) {

    })

    document.addEventListener("pointermove", function (event) {

        controlManager.onPointerMove(event);
        controlManager.rayCast("castable");

    })

    document.addEventListener("mousedown", function (event) {

    });

    document.addEventListener("click", function (event) {
        controlManager.onLeftClick(event);
    })

    document.addEventListener("touchstart", function (event) {

    });

    document.addEventListener("touchend", function (event) {

    });

    document.addEventListener("mouseup", function (event) {

    });

    window.addEventListener("resize", function () {

    });

}

window.onload = Init;