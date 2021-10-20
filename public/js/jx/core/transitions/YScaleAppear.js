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

    function _objectDestructuringEmpty(obj) {
        if (obj == null) throw new TypeError("Cannot destructure undefined");
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

    var YScaleAppear = function (_JXObject) {
        _inherits(YScaleAppear, _JXObject);

        function YScaleAppear(_ref) {
            _objectDestructuringEmpty(_ref);

            _classCallCheck(this, YScaleAppear);

            return _possibleConstructorReturn(this, (YScaleAppear.__proto__ || Object.getPrototypeOf(YScaleAppear)).call(this));
        }

        _createClass(YScaleAppear, [{
            key: "run",
            value: function run(_ref2) {
                var _this2 = this;

                var parent = _ref2.parent;
                var item = _ref2.item;
                var _ref2$onFinished = _ref2.onFinished;
                var onFinished = _ref2$onFinished === undefined ? function (e) {} : _ref2$onFinished;
                var _ref2$onChanging = _ref2.onChanging;
                var onChanging = _ref2$onChanging === undefined ? function (e) {} : _ref2$onChanging;
                var _ref2$typeTransition = _ref2.typeTransition;
                var typeTransition = _ref2$typeTransition === undefined ? "elasticOut" : _ref2$typeTransition;

                createjs.Tween.get(item.view, { override: true }).to({ scaleY: 1 }, 500, createjs.Ease[typeTransition]).call(function (e) {
                    return onFinished(e);
                }, undefined, this).addEventListener("change", function (e) {
                    return onChanging({ target: item, currentTarget: _this2 });
                });
            }
        }]);

        return YScaleAppear;
    }(_JXObject3.default);

    exports.default = YScaleAppear;
});
//# sourceMappingURL=YScaleAppear.js.map