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

    var TextMultiRender = function (_VisualComponentCJS) {
        _inherits(TextMultiRender, _VisualComponentCJS);

        function TextMultiRender(dataObject) {
            _classCallCheck(this, TextMultiRender);

            return _possibleConstructorReturn(this, (TextMultiRender.__proto__ || Object.getPrototypeOf(TextMultiRender)).call(this, Object.assign({
                text: "",
                maxWidth: null,
                style: null
            }, dataObject)));
        }

        _createClass(TextMultiRender, [{
            key: "_create",
            value: function _create() {
                _get(TextMultiRender.prototype.__proto__ || Object.getPrototypeOf(TextMultiRender.prototype), "_create", this).call(this);
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
                this.view = new createjs.Shape();
                this.view.graphics.beginFill("#000000").setStrokeStyle(1, "round", "round", 10, true).beginStroke("#000000").drawRoundRectComplex(0, 0, 100, 100, 1, 1, 1, 1);
                this.view.setBounds(0, 0, 100, 100);
                this.domView = this.cc(Object.assign(this.dataObject, { render: "DOM", type: "TextDOM" }));
                console.log(this.domView);
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(TextMultiRender.prototype.__proto__ || Object.getPrototypeOf(TextMultiRender.prototype), "_initSync", this).call(this);
                this.view.alpha = 0.4;
                this.maxWidth = this.dataObject.maxWidth;
                this.view.lineWidth = this.maxWidth;

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
            key: "_addListeners",
            value: function _addListeners() {
                this.view.on("click", $.proxy(this._clicked, this));
                this.view.on("rollover", $.proxy(this._rollover, this));
                this.view.on("rollout", $.proxy(this._rollout, this));
                this.view.on("pressup", $.proxy(this._mouseup, this));
                this.view.on("mousedown", $.proxy(this._mousedown, this));
                this.view.on("pressmove", $.proxy(this._mousemove, this));
            }
        }, {
            key: "_removeListeners",
            value: function _removeListeners() {
                this.view.removeAllEventListeners();
            }
        }, {
            key: "style",
            set: function set(styleObject) {
                this.domView.style = styleObject;
            }
        }, {
            key: "text",
            set: function set(value) {
                this.domView.text = value;
            },
            get: function get() {
                return this.domView.text;
            }
        }, {
            key: "rotation",
            set: function set(value) {
                this.view.rotation = value;
                this.domView.rotation = this.rotation;
            },
            get: function get() {
                return this.view.rotation;
            }
        }, {
            key: "x",
            set: function set(value) {
                console.log(value, this.x);
                this.view.x = value;
                this.domView.x = value;
            },
            get: function get() {
                return this.view.x;
            }
        }, {
            key: "y",
            set: function set(value) {
                this.view.y = value;
                this.domView.y = value;
            },
            get: function get() {
                return this.view.y;
            }
        }, {
            key: "width",
            set: function set(value) {
                if (this.view.getTransformedBounds()) {
                    var actualWidth = this.view.getTransformedBounds().width;
                    var scaleX = this.view.scaleX;
                    var ratio = value / actualWidth;
                    this.view.scaleX *= ratio;
                }
                this.domView.width = this.width;
            },
            get: function get() {
                if (this.view.getTransformedBounds()) {
                    return this.view.getTransformedBounds().width;
                }
                return 0;
            }
        }, {
            key: "height",
            set: function set(value) {
                if (this.view.getTransformedBounds()) {
                    var actualHeight = this.view.getTransformedBounds().height;
                    var scaleY = this.view.scaleY;
                    var ratio = value / actualHeight;
                    this.view.scaleY *= ratio;
                }
                this.domView.height = this.height;
            },
            get: function get() {
                if (this.view.getTransformedBounds()) {
                    return this.view.getTransformedBounds().height;
                }
                return 0;
            }
        }, {
            key: "anchorX",
            set: function set(value) {
                this._anchorX = value;
                this.view.regX = this._anchorX;
                this.domView.anchorX = this.anchorX;
            },
            get: function get() {
                return this._anchorX;
            }
        }, {
            key: "anchorY",
            set: function set(value) {
                this._anchorY = value;
                this.view.regY = this.anchorY;
                this.domView.anchorY = this.anchorY;
            },
            get: function get() {
                return this._anchorY;
            }
        }, {
            key: "anchor",
            set: function set(value) {
                this.anchorY = value;
                this.anchorX = value;
                this.domView.anchorX = this.anchorX;
                this.domView.anchorY = this.anchorY;
            },
            get: function get() {
                return { anchorX: this.anchorX, anchorY: this.anchorY };
            }
        }], [{
            key: "initialiseMod",
            value: function initialiseMod(mod) {
                mod.extendsFrom("VisualComponent");
                mod.mixin(["_initialise", "_createView", "text", "style"], TextMultiRender, "Text");
                mod._initialise();
            }
        }]);

        return TextMultiRender;
    }(_VisualComponentCJS3.default);

    exports.default = TextMultiRender;
});
//# sourceMappingURL=TextMultiRender.js.map