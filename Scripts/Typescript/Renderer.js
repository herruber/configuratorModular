define(["require", "exports", "three/src/three"], function (require, exports, THREE) {
    "use strict";
    var Renderer = (function () {
        function Renderer(element) {
            this.element = element;
            var renderer = new THREE.WebGLRenderer();
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.setClearColor(new THREE.Color(1, 1, 1), 1);
            element.appendChild(renderer.domElement);
            this.renderer = renderer;
        }
        Renderer.prototype.Render = function () {
            for (var e in session.events) {
                session.events[e].forEach(function (o) {
                    o();
                });
            }
            this.renderer.render(session.activeMode.scene, session.activeMode.camera);
            requestAnimationFrame(this.Render);
        };
        return Renderer;
    }());
    exports.Renderer = Renderer;
});
//# sourceMappingURL=Renderer.js.map