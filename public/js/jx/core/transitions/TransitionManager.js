define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var TransitionManager = function () {
        function TransitionManager(jx) {
            _classCallCheck(this, TransitionManager);

            this.jx = jx;
        }

        _createClass(TransitionManager, [{
            key: "create",
            value: function create(params) {
                var cl = this.jx.db.classFromID(params.type);
                params.jx = this.jx;
                return new cl(params);
            }
        }], [{
            key: "getInstance",
            value: function getInstance() {
                if (!this[instance]) {
                    this[instance] = new TransitionManager(singletonEnforcer);
                }return this[instance];
            }
        }]);

        return TransitionManager;
    }();

    exports.default = TransitionManager;
});
//# sourceMappingURL=TransitionManager.js.map