define(["exports", "jx/core/JXObject"], function (exports, _JXObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Minimal = function (_JXObject) {
        _inherits(Minimal, _JXObject);

        function Minimal(_ref) {
            var onInitialised = _ref.onInitialised;

            _classCallCheck(this, Minimal);

            var _this = _possibleConstructorReturn(this, (Minimal.__proto__ || Object.getPrototypeOf(Minimal)).call(this));

            _this.onInitialised = onInitialised;
            setTimeout($.proxy(_this.onInitialised, _this), 0);
            return _this;
        }

        return Minimal;
    }(_JXObject3.default);

    exports.default = Minimal;
});
//# sourceMappingURL=Minimal.js.map