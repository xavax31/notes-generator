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

    var Resource = function Resource(_ref) {
        var id = _ref.id;
        var type = _ref.type;
        var src = _ref.src;

        _classCallCheck(this, Resource);

        this.ready = false;
        this.id = "";
        this.type = "";
        this.src = "";
        this.preload = false;
        this.data = null;
        for (var prop in arguments[0]) {
            this[prop] = arguments[0][prop];
        }
    };

    exports.default = Resource;
});
//# sourceMappingURL=Resource.js.map