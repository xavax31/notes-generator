define(["exports", "jx/comps/visualcomponent/VisualComponentCJS"], function (exports, _VisualComponentCJS2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponentCJS3 = _interopRequireDefault(_VisualComponentCJS2);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var ShapeCJS = function (_VisualComponentCJS) {
        _inherits(ShapeCJS, _VisualComponentCJS);

        function ShapeCJS(dataObject) {
            _classCallCheck(this, ShapeCJS);

            var _this = _possibleConstructorReturn(this, (ShapeCJS.__proto__ || Object.getPrototypeOf(ShapeCJS)).call(this, Object.assign({
                shapeType: "rectangle",
                color: "rgba(0,0,0,1)",
                borderColor: null,
                borderWidth: 1,
                width: 100, height: 100
            }, dataObject)));

            _this.render = "CJS";
            return _this;
        }

        _createClass(ShapeCJS, [{
            key: "_create",
            value: function _create() {
                _get(ShapeCJS.prototype.__proto__ || Object.getPrototypeOf(ShapeCJS.prototype), "_create", this).call(this);
                this.view = new createjs.Shape();
                this.graphics = this.view.graphics;
                this["_create_" + (this.dataObject.shapeType || "rectangle").toLowerCase()]();
            }
        }, {
            key: "_create_rectangle",
            value: function _create_rectangle() {
                var cornerRadius = this.dataObject.cornerRadius || 0;
                var color = this.dataObject.color || "#000000";
                var borderColor = this.dataObject.borderColor;
                this._width = this.dataObject.width;
                this._height = this.dataObject.height;
                if (borderColor) {
                    this.view.graphics.beginStroke(borderColor);
                }
                ;
                this.view.graphics.beginFill(color).setStrokeStyle(1, "round", "round", 10, true).beginStroke(borderColor).drawRoundRectComplex(0, 0, this.dataObject.width, this.dataObject.height, cornerRadius, cornerRadius, cornerRadius, cornerRadius);
                this.view.setBounds(0, 0, this.dataObject.width, this.dataObject.height);
            }
        }, {
            key: "_create_circle",
            value: function _create_circle() {
                var color = this.dataObject.color || "#000000";
                var borderColor = this.dataObject.borderColor;
                if (borderColor) {
                    this.view.graphics.beginStroke(borderColor);
                }
                ;
                this.view.graphics.beginFill(color).setStrokeStyle(this.dataObject.borderWidth, "round", "round", 10, true).beginStroke(borderColor).drawCircle(0, 0, this.dataObject.radius);
                this.view.setBounds(0, 0, this.dataObject.width, this.dataObject.height);
            }
        }], [{
            key: "initialiseMod",
            value: function initialiseMod(mod) {
                mod.extendsFrom("VisualComponent");
                mod.mixin(["_create", "_create_rectangle"], ShapeCJS, "Shape");
                mod._initialise();
            }
        }]);

        return ShapeCJS;
    }(_VisualComponentCJS3.default);

    exports.default = ShapeCJS;
});
//# sourceMappingURL=ShapeCJS.js.map