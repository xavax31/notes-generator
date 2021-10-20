define(["exports", "jx/core/styles/ShapeStyle"], function (exports, _ShapeStyle) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ShapeStyle2 = _interopRequireDefault(_ShapeStyle);

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

    var ShapeDom = function (_VisualComponentDom) {
        _inherits(ShapeDom, _VisualComponentDom);

        function ShapeDom(dataObject) {
            _classCallCheck(this, ShapeDom);

            var _this = _possibleConstructorReturn(this, (ShapeDom.__proto__ || Object.getPrototypeOf(ShapeDom)).call(this, { dataObject: dataObject, styleDataType: _ShapeStyle2.default }));

            console.error("TODO ShapeDom", ShapeDom);
            return _this;
        }

        return ShapeDom;
    }(VisualComponentDom);

    exports.default = ShapeDom;
});
//# sourceMappingURL=ShapeDom.js.map