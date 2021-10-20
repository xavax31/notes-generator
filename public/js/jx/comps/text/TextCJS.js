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

    var TextCJS = function (_VisualComponentCJS) {
        _inherits(TextCJS, _VisualComponentCJS);

        function TextCJS(dataObject) {
            _classCallCheck(this, TextCJS);

            var _this = _possibleConstructorReturn(this, (TextCJS.__proto__ || Object.getPrototypeOf(TextCJS)).call(this, Object.assign({
                text: " ",
                maxWidth: null,
                style: null
            }, dataObject)));

            _this.render = "CJS";
            return _this;
        }

        _createClass(TextCJS, [{
            key: "_create",
            value: function _create() {
                _get(TextCJS.prototype.__proto__ || Object.getPrototypeOf(TextCJS.prototype), "_create", this).call(this);
                if (this.dataObject.text == "") this.dataObject.text = " ";
                this._style = {
                    fontFamily: "Arial",
                    fontSize: 12,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    color: "#000000",
                    textAlign: "left",
                    borderColor: "#000000",
                    borderStyle: null
                };
                if (this.dataObject.view) {
                    this.view = this.dataObject.view;
                    this.dataObject.x = this.view.x;
                    this.dataObject.y = this.view.y;
                    this.dataObject.anchorX = this.view.regX;
                    this.dataObject.anchorY = this.view.regY;
                    this.dataObject.rotation = this.view.rotation;

                    if (this.dataObject.resourceID != null) {
                        var resource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                        this.text = resource.data;
                    } else if (this.dataObject.text) {
                        this.text = this.dataObject.text;
                    }
                    var bounds = { x: this.view.x, y: this.view.y, width: this.view.lineWidth, height: this.view.lineHeight };
                    if (this.dataObject.width == undefined) this.dataObject.width = bounds.width * this.view.scaleX;
                    if (this.dataObject.height == undefined) this.dataObject.height = bounds.height * this.view.scaleX;
                    this.dataObject.visible = this.dataObject.visible == undefined ? this.view.visible : this.dataObject.visible;
                } else {
                    this.view = new createjs.Text();

                    if (this.dataObject.resourceID != null) {
                        var resource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                        this.text = resource.data;
                    } else if (this.dataObject.text) {
                        this.text = this.dataObject.text;
                    }
                }
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(TextCJS.prototype.__proto__ || Object.getPrototypeOf(TextCJS.prototype), "_initSync", this).call(this);
                this._offsetAlign = 0;
                this.style = this.dataObject.style || this._style;
                this._ready = true;
            }
        }, {
            key: "style",
            get: function get() {
                return Object.assign({}, this._style);
            },
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

                this.view.font = this._style.fontStyle + " " + this._style.fontWeight + " " + this._style.fontSize + "px " + this._style.fontFamily;
                this.view.color = this._style.color;
                this._style.textAlign = ["left", "center", "right"].indexOf(this._style.textAlign) == -1 ? "left" : this._style.textAlign;
                this.view.textAlign = this._style.textAlign;
                this.x = this.view.x;
            }
        }, {
            key: "text",
            set: function set(value) {
                this.view.text = value;
                this.style = this._style;
            },
            get: function get() {
                return this.view.text;
            }
        }, {
            key: "x",
            set: function set(value) {
                switch (this._style.textAlign) {
                    case "left":
                        this.view.x = value;
                        break;
                    case "center":
                        this.view.x = value + this.width / 2;
                        break;
                    case "right":
                        this.view.x = value + this.width;
                        break;
                    default:
                        console.warn("Style align type", this._style.textAlign, "not accepted for CJS Text");
                        this.view.x = value;
                }
            },
            get: function get() {
                switch (this._style.textAlign) {
                    case "left":
                        return this.view.x;
                        break;
                    case "center":
                        return this.view.x - this.width / 2;
                        break;
                    case "right":
                        return this.view.x - this.width;
                        break;
                    default:
                        console.warn("Style align type", this._style.textAlign, "not accepted for CJS Text");
                        return this.view.x;
                }
            }
        }, {
            key: "width",
            set: function set(value) {
                this.view.lineWidth = value;
            },
            get: function get() {
                return this.view.getBounds() === null ? { x: 0, y: 0, width: 0, height: 0 } : this.view.getBounds().width;
            }
        }, {
            key: "height",
            set: function set(value) {},
            get: function get() {
                return this.view.getBounds() === null ? { x: 0, y: 0, width: 0, height: 0 } : this.view.getBounds().height;
            }
        }]);

        return TextCJS;
    }(_VisualComponentCJS3.default);

    exports.default = TextCJS;
});
//# sourceMappingURL=TextCJS.js.map