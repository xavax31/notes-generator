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

    var JSONLoader = function () {
        function JSONLoader(resource, onFinished, jx) {
            _classCallCheck(this, JSONLoader);

            this.jx = jx;
            this.resource = resource;
            this.onFinished = onFinished;
            this.success = false;
        }

        _createClass(JSONLoader, [{
            key: "load",
            value: function load() {
                $.getJSON(this.resource.src).done($.proxy(this._jsonLoaded, this)).fail($.proxy(this._jsonFailed, this)).always($.proxy(this._always, this));
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

        return JSONLoader;
    }();

    exports.default = JSONLoader;
});
//# sourceMappingURL=JSONLoader.js.map