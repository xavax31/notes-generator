define(["exports", "jx/core/transitions/TransitionManager", "jx/core/particles/ParticlesManager", "jx/core/filters/Filters"], function (exports, _TransitionManager, _ParticlesManager, _Filters) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _TransitionManager2 = _interopRequireDefault(_TransitionManager);

    var _ParticlesManager2 = _interopRequireDefault(_ParticlesManager);

    var _Filters2 = _interopRequireDefault(_Filters);

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

    var FXManager = function () {
        function FXManager(_ref) {
            var jx = _ref.jx;

            _classCallCheck(this, FXManager);

            this.jx = jx;
            this.transitions = new _TransitionManager2.default(this.jx);
            this.particles = new _ParticlesManager2.default(this.jx);
            this.filters = _Filters2.default;
        }

        _createClass(FXManager, [{
            key: "createTransition",
            value: function createTransition(params) {
                return this.transitions.create(params);
            }
        }, {
            key: "createParticle",
            value: function createParticle(params) {
                return this.particles.create(params);
            }
        }]);

        return FXManager;
    }();

    exports.default = FXManager;
});
//# sourceMappingURL=FXManager.js.map