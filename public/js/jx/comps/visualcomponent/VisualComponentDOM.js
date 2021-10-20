define(['exports', 'jx/core/comps/VisualComponent'], function (exports, _VisualComponent2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

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

    var VisualComponentDOM = function (_VisualComponent) {
        _inherits(VisualComponentDOM, _VisualComponent);

        function VisualComponentDOM(dataObject) {
            _classCallCheck(this, VisualComponentDOM);

            return _possibleConstructorReturn(this, (VisualComponentDOM.__proto__ || Object.getPrototypeOf(VisualComponentDOM)).call(this, dataObject));
        }

        _createClass(VisualComponentDOM, [{
            key: '_create',
            value: function _create() {
                jQuery.fn.rotate = function (degrees) {
                    $(this).css({ '-webkit-transform': 'rotate(' + degrees + 'deg)',
                        '-moz-transform': 'rotate(' + degrees + 'deg)',
                        '-ms-transform': 'rotate(' + degrees + 'deg)',
                        'transform': 'rotate(' + degrees + 'deg)' });

                    var percentAnchorX = 0;
                    var percentAnchorY = 0;
                    $(this).css({ '-webkit-transform-origin': percentAnchorX + '% ' + percentAnchorY + '%',
                        '-moz-transform-origin': percentAnchorX + '% ' + percentAnchorY + '%',
                        '-ms-transform-origin': percentAnchorX + '% ' + percentAnchorY + '%',
                        '-o-transform-origin': percentAnchorX + '% ' + percentAnchorY + '%',
                        'transform-origin': percentAnchorX + '% ' + percentAnchorY + '%' });
                    return $(this);
                };
                _get(VisualComponentDOM.prototype.__proto__ || Object.getPrototypeOf(VisualComponentDOM.prototype), '_create', this).call(this);
            }
        }, {
            key: '_initSync',
            value: function _initSync() {
                _get(VisualComponentDOM.prototype.__proto__ || Object.getPrototypeOf(VisualComponentDOM.prototype), '_initSync', this).call(this);
                this._addListeners();
            }
        }, {
            key: 'kill',
            value: function kill() {
                if (this._killed) return;
                if (this.view) {
                    this._removeListeners();
                }
                ;
                _get(VisualComponentDOM.prototype.__proto__ || Object.getPrototypeOf(VisualComponentDOM.prototype), 'kill', this).call(this);
            }
        }, {
            key: 'transform',
            value: function transform(par) {
                this.view.x = par.x || this.view.x;
                this.view.y = par.y || this.view.y;
            }
        }, {
            key: '_addListeners',
            value: function _addListeners() {
                var _this2 = this;

                if (this.jx.config.useClickOnTouchScreens) {
                    this.view.on("click", function (evt) {
                        _this2._clicked(evt);
                    });
                    this.view.on("mousedown", $.proxy(this._mousedown, this));
                } else {
                    this.view.on("touchend", function (evt) {
                        _this2._clicked(evt);
                    });
                    this.view.on("touchstart", $.proxy(this._mousedown, this));
                }
                this.view.on("mouseup", $.proxy(this._mouseup, this));
                this.view.on("mouseenter", $.proxy(this._rollover, this));
                this.view.on("mouseout", $.proxy(this._rollout, this));
                this.view.on("mousemove", $.proxy(this._mousemove, this));
            }
        }, {
            key: '_removeListeners',
            value: function _removeListeners() {
                if (!this.view) return;
                if (this.jx.config.useClickOnTouchScreens) {
                    this.view.off("click");
                    this.view.off("mousedown");
                } else {
                    this.view.off("touchend");
                    this.view.off("touchstart");
                }
                this.view.off("mouseup");
                this.view.off("mouseenter");
                this.view.off("mouseout");
                this.view.off("mousemove");
            }
        }, {
            key: 'saveBounds',
            value: function saveBounds() {
                this.savedBounds = {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
            }
        }, {
            key: 'cache',
            value: function cache() {}
        }, {
            key: 'restoreBounds',
            value: function restoreBounds() {
                this.width = this.savedBounds.width;
                this.height = this.savedBounds.height;
                this.x = this.savedBounds;
                this.y = this.savedBounds;
            }
        }, {
            key: 'bringToFront',
            value: function bringToFront() {
                console.warn("BRINGTOFRONT", this.view, this.view.parent());
                if (this.view.parent()) {
                    this.view.parent().append(this.view);
                }
            }
        }, {
            key: 'bringToBack',
            value: function bringToBack() {
                if (this.view.parent()) {
                    this.view.parent().prepend(this.view);
                }
            }
        }, {
            key: 'visible',
            set: function set(value) {
                this.view.css("display", value ? "inline" : "none");
            },
            get: function get() {
                return this.view.css("display") != "none";
            }
        }, {
            key: 'alpha',
            set: function set(value) {
                this.view.css("opacity", value);
            }
        }, {
            key: 'x',
            set: function set(value) {
                this.view.css("left", value + "px");
            },
            get: function get() {
                return Number(this.view.css("left").replace("px", "").replace(",", "."));
            }
        }, {
            key: 'y',
            set: function set(value) {
                this.view.css("top", value + "px");
            },
            get: function get() {
                return Number(this.view.css("top").replace("px", "").replace(",", "."));
            }
        }, {
            key: 'scaleX',
            set: function set(value) {},
            get: function get() {
                return null;
            }
        }, {
            key: 'scaleY',
            set: function set(value) {},
            get: function get() {
                return null;
            }
        }, {
            key: 'width',
            set: function set(value) {
                this.view.width(value);
            },
            get: function get() {
                return this.view.width();
            }
        }, {
            key: 'height',
            set: function set(value) {
                this.view.height(value);
            },
            get: function get() {
                return this.view.height();
            }
        }, {
            key: 'rotation',
            set: function set(deg) {
                this._degrees = deg;
                this.view.rotate(deg);
            },
            get: function get() {
                return this._degrees;
            }
        }, {
            key: 'cursor',
            set: function set(value) {
                this._cursorOnRoll = value;
                if (this._enabled) {
                    this.view.css("cursor", value);
                } else {
                    this.view.css("cursor", this._cursorOnDisabled);
                }
            },
            get: function get() {
                return this._cursorOnRoll;
            }
        }], [{
            key: 'initialiseMod',
            value: function initialiseMod(mod) {
                mod.mixin(["x", "y", "width", "height", "scaleX", "scaleY", "rotation", "alpha", "visible", "saveBounds", "cache"], VisualComponentDOM, "VisualComponent");
                mod.mixin(["_create"], VisualComponentDOM, "MixIn");
            }
        }]);

        return VisualComponentDOM;
    }(_VisualComponent3.default);

    exports.default = VisualComponentDOM;
});
//# sourceMappingURL=VisualComponentDOM.js.map