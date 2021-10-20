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

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ImportData = function () {
        function ImportData() {
            _classCallCheck(this, ImportData);

            this.projectInformations = null;
            this.modulePath = null;
            this.moduleClass = null;
            this.resources = null;
            this.styles = null;
            this.gabarit = [];
        }

        _createClass(ImportData, [{
            key: "check",
            value: function check() {
                for (var prop in this) {
                    if (this[prop] == null) {
                        return false;
                    }
                    ;
                }
                return true;
            }
        }]);

        return ImportData;
    }();

    exports.default = ImportData;
});
//# sourceMappingURL=ImportData.js.map