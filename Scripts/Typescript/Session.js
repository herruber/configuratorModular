define(["require", "exports"], function (require, exports) {
    "use strict";
    var Session = (function () {
        function Session(modes) {
            this.modes = modes;
        }
        Session.prototype.add = function (object, mode) {
            var scene = this.modes[mode].scene;
            scene.add(object);
        };
        return Session;
    }());
    exports.Session = Session;
});
//# sourceMappingURL=Session.js.map