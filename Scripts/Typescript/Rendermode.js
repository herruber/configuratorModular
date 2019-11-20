define(["require", "exports", "three/examples/jsm/controls/OrbitControls"], function (require, exports, OrbitControls_1) {
    "use strict";
    var Rendermode = (function () {
        function Rendermode(scene, camera, element) {
            this.scene = scene;
            this.camera = camera;
            this.scene.add(camera);
            this.controller = new OrbitControls_1.OrbitControls(this.camera, element);
            this.element = element;
        }
        return Rendermode;
    }());
    exports.Rendermode = Rendermode;
});
//# sourceMappingURL=Rendermode.js.map