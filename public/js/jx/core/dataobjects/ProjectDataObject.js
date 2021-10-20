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

    var ProjectDataObject = function ProjectDataObject() {
        _classCallCheck(this, ProjectDataObject);

        this.id = null;
        this.title = null, this.url = null;
        this.gabarit = null;
        this.engine = null;
        this.editorTemplate = "TemplateEdition";
        this.assetsDir = "public/assets";
    };

    exports.default = ProjectDataObject;
});
//# sourceMappingURL=ProjectDataObject.js.map