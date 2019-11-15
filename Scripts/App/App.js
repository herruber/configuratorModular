
var renderManager;
var buildManager;
var controlManager;


function Init() {

    buildManager = new BuildManager({
        spacingX: 3.5,
        spacingY: 3.5
    });

    var element = document.getElementById("renderview");

    var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 1));
    directionalLight.name = "sun";
    directionalLight.intensity = 1;
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = 0.000025;
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
    sceneA.add(directionalLight);

    var sceneB = new THREE.Scene();
    sceneB.add(directionalLight.clone());

    var renderModeSettings2d = {
        position: new THREE.Vector3(0, 5, 0),
        camera: new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100),
        scene: sceneA,
        element: element,
        enableRotation: false,
        enablePanning: true
    }

    var renderModeSettings3d = {
        position: new THREE.Vector3(0, 1, -10),
        camera: new THREE.PerspectiveCamera(60, element.clientWidth / element.clientHeight, 0.1, 100),
        scene: sceneB,
        element: element,
        enableRotation: true,
        enablePanning: true
    }


    controlManager = new Controls({
        modes: {
            "2d": new RenderMode(renderModeSettings2d),
            "3d": new RenderMode(renderModeSettings3d)
        },
        raycaster: new THREE.Raycaster()
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
        controlManager.rayCast();

    })

    document.addEventListener("mousedown", function (event) {

    });

    document.addEventListener("click", function (event) {

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