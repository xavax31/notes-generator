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

    var ClassLoader = function () {
        function ClassLoader(resource, onFinished, jx) {
            _classCallCheck(this, ClassLoader);

            this.jx = jx;
            this.resource = resource;
            this.onFinished = onFinished;
            this.success = false;
        }

        _createClass(ClassLoader, [{
            key: "kill",
            value: function kill() {
                if (!this.jx) return;
                this.onFinished = null;
                this.resource = null;
                this.jx = null;
            }
        }, {
            key: "load",
            value: function load() {
                var _this = this;

                this.jx.db.importClass([this.resource.src], function (ClassDef) {
                    _this.resource.data = ClassDef;
                    _this.resource.ready = true;
                    _this.onFinished({ target: _this, resource: _this.resource, success: true });
                }, function (err) {
                    console.log(_this.resource.id, _this.resource.src, err);
                    _this.onFinished({ target: _this, resource: _this.resource, success: false });
                });
            }
        }]);

        return ClassLoader;
    }();

    exports.default = ClassLoader;
});
//# sourceMappingURL=ClassLoader.js.map