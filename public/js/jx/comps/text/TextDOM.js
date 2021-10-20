define(["exports", "jx/comps/visualcomponent/VisualComponentDOM"], function (exports, _VisualComponentDOM2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponentDOM3 = _interopRequireDefault(_VisualComponentDOM2);

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

    var TextDOM = function (_VisualComponentDOM) {
        _inherits(TextDOM, _VisualComponentDOM);

        function TextDOM(dataObject) {
            _classCallCheck(this, TextDOM);

            return _possibleConstructorReturn(this, (TextDOM.__proto__ || Object.getPrototypeOf(TextDOM)).call(this, Object.assign({
                text: "",
                style: null
            }, dataObject)));
        }

        _createClass(TextDOM, [{
            key: "_create",
            value: function _create() {
                _get(TextDOM.prototype.__proto__ || Object.getPrototypeOf(TextDOM.prototype), "_create", this).call(this);
                this._containerBounds = null;
                this._style = {
                    fontFamily: "Arial",
                    fontSize: 12,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    color: "#000000",
                    textAlign: "left",
                    alignV: "top",
                    borderColor: "#000000",
                    borderStyle: null,
                    overflow: "visible"
                };
                this.view = $("<div id='hold'><div id='text'></div></div>");

                this.view.css("position", "absolute");
                var textDiv = this.view.find("#text");
                textDiv.css("position", "relative");
                textDiv.css("word-wrap", "normal");
                textDiv.css("min-width", "1em");
                textDiv.css("min-height", "1em");
                this.style = this.dataObject.style || this._style;
                if (this.dataObject.resourceID != null) {
                    var resource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                    this.text = resource.data;
                } else if (this.dataObject.text) {
                    this.text = this.dataObject.text;
                }
                this._ready = true;
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(TextDOM.prototype.__proto__ || Object.getPrototypeOf(TextDOM.prototype), "_initSync", this).call(this);
                this._ready = true;
            }
        }, {
            key: "fitIn",
            value: function fitIn() {
                var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref$target = _ref.target;
                var target = _ref$target === undefined ? null : _ref$target;
                var _ref$x = _ref.x;
                var x = _ref$x === undefined ? 0 : _ref$x;
                var _ref$y = _ref.y;
                var y = _ref$y === undefined ? 0 : _ref$y;
                var _ref$width = _ref.width;
                var width = _ref$width === undefined ? 0 : _ref$width;
                var _ref$height = _ref.height;
                var height = _ref$height === undefined ? 0 : _ref$height;
                var _ref$alignH = _ref.alignH;
                var alignH = _ref$alignH === undefined ? "left" : _ref$alignH;
                var _ref$alignV = _ref.alignV;
                var alignV = _ref$alignV === undefined ? "top" : _ref$alignV;
                var _ref$auto = _ref.auto;
                var auto = _ref$auto === undefined ? false : _ref$auto;

                if (arguments.length == 0) {
                    if (this._containerBounds) {
                        this.fitIn(this._containerBounds);
                    }
                    return;
                }
                if (target) {
                    var targetCoord = this.jx.tools.obj.filter(target, { x: x, y: y, width: width, height: height });
                    x = targetCoord.x;
                    y = targetCoord.y;
                    width = targetCoord.width;
                    height = targetCoord.height;
                }
                if (auto) {
                    this._containerBounds = { x: x, y: y, width: width, height: height, alignH: alignH, alignV: alignV, auto: auto };
                }
                ;
                this.width = width;

                switch (alignH) {
                    case "left":
                        this.x = x;
                        break;
                    case "center":
                        this.x = x + width / 2 - this.width / 2;
                        break;
                    case "right":
                        this.x = x + width - this.width;
                        break;
                }
                switch (alignV) {
                    case "top":
                        this.y = y;
                        break;
                    case "middle":
                        this.y = y + height / 2 - this.height / 2;
                        break;
                    case "bottom":
                        this.y = y + height - this.height;
                        break;
                }
            }
        }, {
            key: "style",
            set: function set(styleObject) {
                if (this.jx.tools.instanceType(styleObject) == "string") {
                    var styleResource = this.jx.db.findOne({ "id": styleObject });
                    if (styleResource) {
                        styleObject = styleResource.data;
                    }
                }

                this._style = Object.assign(this._style, styleObject);

                if (styleObject.bold != undefined) this._style.fontWeight = styleObject.bold ? "bold" : "normal";
                if (styleObject.italic != undefined) this._style.fontStyle = styleObject.italic ? "italic" : "normal";

                var textDiv = this.view.find("#text");
                textDiv.css("pointer-events", "none");

                this.view.css("font-family", this._style.fontFamily);
                this.view.css("font-size", this._style.fontSize + "px");
                this.view.css("text-align", this._style.textAlign);

                if (this._style.alignV == "top") {
                    textDiv.css("top", "0px");
                } else if (this._style.alignV == "center") {
                    console.log(this._style);
                    console.log(textDiv.height());
                    textDiv.css("top", this.height / 2 - textDiv.height() / 2 + "px");
                } else if (this._style.alignV == "bottom") {
                    textDiv.css("top", this.height - textDiv.height() + "px");
                }
                ;
                this.view.css("font-weight", this._style.fontWeight);
                this.view.css("font-style", this._style.fontStyle);
                this.view.css("color", this._style.color);
                this.view.css("border-style", this._style.borderStyle);
                this.view.css("border-color", this._style.borderColor);
                this.view.css("overflow", this._style.overflow);
                if (this._containerBounds) this.fitIn(this._containerBounds);
            }
        }, {
            key: "width",
            set: function set(value) {
                this.view.width(value);
            },
            get: function get() {
                return this.view.width();
            }
        }, {
            key: "height",
            set: function set(value) {
                this.view.height(value);
            },
            get: function get() {
                return this.view.height();
            }
        }, {
            key: "text",
            set: function set(value) {
                this.view.find("#text").html(value);
                this.style = this._style;
            },
            get: function get() {
                return this.view.find("#text").html();
            }
        }]);

        return TextDOM;
    }(_VisualComponentDOM3.default);

    exports.default = TextDOM;
});
//# sourceMappingURL=TextDOM.js.map