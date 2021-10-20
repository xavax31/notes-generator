define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ModuleData = function ModuleData() {
        _classCallCheck(this, ModuleData);

        this.id = null;
        this.srcPath = null;
        this.configPath = null;
        this.url = null;
        this.status = "closed";
        this.build = null;
        this.moduleClass = null;
        this.resources = null;
        this.projectInformations = null;
        this.gabarit = null;
        this.gabaritJSON = null;
    };

    exports.default = ModuleData;
});
//# sourceMappingURL=ModuleData.js.map