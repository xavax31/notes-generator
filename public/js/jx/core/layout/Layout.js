define(["exports", "jx/core/layout/Disposition"], function (exports, _Disposition) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Disposition2 = _interopRequireDefault(_Disposition);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var instance = null;
    var singletonEnforcer = function SingetonEnforcer() {
        _classCallCheck(this, SingetonEnforcer);
    };

    var Layout = function () {
        function Layout(_ref) {
            var jx = _ref.jx;

            _classCallCheck(this, Layout);

            this.jx = jx;

            this.disposition = new _Disposition2.default(this.jx);
        }

        _createClass(Layout, null, [{
            key: "getInstance",
            value: function getInstance(jxEngine) {
                if (!this[instance]) {
                    this[instance] = new Layout(singletonEnforcer, jxEngine);
                }return this[instance];
            }
        }]);

        return Layout;
    }();

    exports.default = Layout;
});
//# sourceMappingURL=Layout.js.map