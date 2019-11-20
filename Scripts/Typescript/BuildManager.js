define(["require", "exports", "three/examples/jsm/loaders/GLTFLoader"], function (require, exports, GLTFLoader) {
    "use strict";
    var BuildManager = (function () {
        function BuildManager() {
        }
        BuildManager.prototype.LoadMesh = function (url, onLoaded) {
            var loader = new GLTFLoader.GLTFLoader();
            loader.load(url, onLoaded);
        };
        return BuildManager;
    }());
    exports.BuildManager = BuildManager;
});
//# sourceMappingURL=BuildManager.js.map