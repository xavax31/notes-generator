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

    var Filters = function () {
        function Filters() {
            _classCallCheck(this, Filters);
        }

        _createClass(Filters, null, [{
            key: "apply",
            value: function apply(obj, params) {
                var cl = requirejs("jx/core/filters/" + params.filter);
                cl.apply(obj, params);
            }
        }, {
            key: "cancel",
            value: function cancel(obj, filterName) {
                var cl = requirejs("jx/core/filters/" + filterName);
                cl.cancel(obj);
            }
        }]);

        return Filters;
    }();

    exports.default = Filters;
});
//# sourceMappingURL=Filters.js.map