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

    var TextLoader = function () {
        function TextLoader(resource, onFinished, jx) {
            _classCallCheck(this, TextLoader);

            this.jx = jx;
            this.resource = resource;
            this.onFinished = onFinished;
            this.success = false;
        }

        _createClass(TextLoader, [{
            key: "load",
            value: function load() {
                var _this = this;

                $.ajax(this.resource.src).fail(function (evt) {
                    return _this._jsonFailed();
                }).done(function (data) {
                    return _this._jsonLoaded(data);
                }).always(function (evt) {
                    return _this._always();
                });
            }
        }, {
            key: "kill",
            value: function kill() {
                if (!this.jx) return;
                this.onFinished = null;
                this.resource = null;
                this.jx = null;
            }
        }, {
            key: "_jsonLoaded",
            value: function _jsonLoaded(data) {
                this.resource.data = data;
                this.resource.ready = true;
                if (this.onFinished) this.onFinished({ target: this, resource: this.resource, success: true });
            }
        }, {
            key: "_jsonFailed",
            value: function _jsonFailed() {
                if (this.onFinished) this.onFinished({ target: this, resource: this.resource, success: false });
            }
        }, {
            key: "_always",
            value: function _always() {}
        }]);

        return TextLoader;
    }();

    exports.default = TextLoader;
});
//# sourceMappingURL=TextLoader.js.map