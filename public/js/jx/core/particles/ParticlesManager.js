define(["exports", "jx/core/particles/ParticlesEmitter"], function (exports, _ParticlesEmitter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ParticlesEmitter2 = _interopRequireDefault(_ParticlesEmitter);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var ParticlesManager = function () {
        function ParticlesManager(jx) {
            _classCallCheck(this, ParticlesManager);

            this.jx = jx;
        }

        _createClass(ParticlesManager, [{
            key: "create",
            value: function create(params) {
                params.jx = this.jx;
                return new _ParticlesEmitter2.default(params);
            }
        }]);

        return ParticlesManager;
    }();

    exports.default = ParticlesManager;
});
//# sourceMappingURL=ParticlesManager.js.map