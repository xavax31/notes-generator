define(["exports", "jx/core/comps/Component"], function (exports, _Component2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

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

    var defaultValues = {
        render: null,
        quality: 1,
        x: 0,
        y: 0,
        width: undefined,
        height: undefined,
        ratioWidth: undefined,
        ratioHeight: undefined,
        alpha: 1,
        anchor: null,
        anchorX: 0,
        anchorY: 0,
        enabled: true,
        visible: true,
        rotation: 0
    };

    var VisualComponent = function (_Component) {
        _inherits(VisualComponent, _Component);

        function VisualComponent(dataObject) {
            _classCallCheck(this, VisualComponent);

            return _possibleConstructorReturn(this, (VisualComponent.__proto__ || Object.getPrototypeOf(VisualComponent)).call(this, Object.assign({
                render: null,
                quality: 1,
                x: 0,
                y: 0,
                width: undefined,
                height: undefined,
                ratioWidth: undefined,
                ratioHeight: undefined,
                alpha: undefined,
                anchor: null,
                anchorX: 0,
                anchorY: 0,
                enabled: true,
                visible: true,
                rotation: 0,
                cursor: "default",
                onclick: null,
                lockDelayAfterClick: null
            }, dataObject)));
        }

        _createClass(VisualComponent, [{
            key: "kill",
            value: function kill() {
                if (this.view && this.parent && this.parent.view) {
                    this.parent.removeChild(this);
                }
                ;
                if (this.view) this.view._jxClip = null;
                this.view = null;
                this.parent = null;

                _get(VisualComponent.prototype.__proto__ || Object.getPrototypeOf(VisualComponent.prototype), "kill", this).call(this);
            }
        }, {
            key: "_create",
            value: function _create() {
                _get(VisualComponent.prototype.__proto__ || Object.getPrototypeOf(VisualComponent.prototype), "_create", this).call(this);
                this._parent = null;

                this.render = this.dataObject.render;
                this.quality = this.dataObject.quality;
                this.implements("VisualComponent");
                this._cursorOnDisabled = "default";

                this._initJXVisualClipZap();
                this.click = new signals.Signal();
                this.onclick = new signals.Signal();
                this.onrollover = new signals.Signal();
                this.onrollout = new signals.Signal();
                this.onmouseup = new signals.Signal();
                this.onmousedown = new signals.Signal();
                this.onmousemove = new signals.Signal();
                if (this.dataObject.view) {
                    this.view = this.dataObject.view;
                }
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(VisualComponent.prototype.__proto__ || Object.getPrototypeOf(VisualComponent.prototype), "_initSync", this).call(this);
                if (!this.view) return;
                this.view._jxClip = this;
                this.x = this.dataObject.x;
                this.y = this.dataObject.y;
                this.rotation = 0;
                if (this.dataObject.width) this.width = this.dataObject.width;
                if (this.dataObject.height) this.height = this.dataObject.height;
                if (this.dataObject.ratioWidth) this.ratioWidth = this.dataObject.ratioWidth;
                if (this.dataObject.ratioHeight) this.ratioHeight = this.dataObject.ratioHeight;
                this.anchorX = this.dataObject.anchorX;
                this.anchorY = this.dataObject.anchorY;
                if (this.dataObject.fitIn) this.fitIn(this.dataObject.fitIn);
                this.rotation = this.dataObject.rotation;
                this.visible = this.dataObject.visible;
                if (this.dataObject.alpha != undefined) this.alpha = this.dataObject.alpha;
                this.data = this.dataObject.data;
                this.cursor = this.dataObject.cursor;
                this.enabled = this.dataObject.enabled;
                this.saveBounds();
                if (this.dataObject.onclick) this.onclick.add(this.dataObject.onclick);
                if (this.dataObject.onrollover) this.onrollover.add(this.dataObject.onrollover);
                if (this.dataObject.onrollout) this.onrollout.add(this.dataObject.onrollout);
                if (this.dataObject.onmouseup) this.onmouseup.add(this.dataObject.onmouseup);
                if (this.dataObject.onmousedown) this.onmousedown.add(this.dataObject.onmousedown);
                if (this.dataObject.onmousemove) this.onmousemove.add(this.dataObject.onmousemove);
            }
        }, {
            key: "_initJXVisualClipZap",
            value: function _initJXVisualClipZap() {
                if (!this.jx.__jxVisualClipZap) {
                    this.jx.__jxVisualClipZap = this.jx._clipZapInit({ zIndex: 1200, opacity: 0 });
                }
                this.__jxVisualClipZapInfo = {
                    delay: this.dataObject.lockDelayAfterClick === null ? this.jx.config.app.lockDelayAfterClick : this.dataObject.lockDelayAfterClick
                };
            }
        }, {
            key: "__clipZapShow",
            value: function __clipZapShow() {
                var _this2 = this;

                var delay = this.__jxVisualClipZapInfo.delay;
                if (delay === 0) return;
                this.jx.__jxVisualClipZap.clickHandler.add(function () {});
                $("body").append(this.jx.__jxVisualClipZap);
                this.jx.__jxVisualClipZap.css("display", "inline");
                this.jx.wait(delay, function () {
                    return _this2.__clipZapHide();
                });
            }
        }, {
            key: "__clipZapHide",
            value: function __clipZapHide() {
                this.jx.__jxVisualClipZap.css("display", "none");
                this.jx.__jxVisualClipZap.detach();
                this.jx.__jxVisualClipZap.clickHandler.removeAll();
            }
        }, {
            key: "close",
            value: function close() {
                _get(VisualComponent.prototype.__proto__ || Object.getPrototypeOf(VisualComponent.prototype), "close", this).call(this);
                if (this.view && this.parent) {
                    this.parent.removeChild(this);
                }
            }
        }, {
            key: "transform",
            value: function transform(transformData) {
                this.view.transform(transformData);
            }
        }, {
            key: "fitIn_old",
            value: function fitIn_old(_ref) {
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
                var _ref$center = _ref.center;
                var center = _ref$center === undefined ? true : _ref$center;

                if (target) {
                    var targetCoord = this.jx.tools.obj.filter(target, { x: x, y: y, width: width, height: height });
                    x = targetCoord.x;
                    y = targetCoord.y;
                    width = targetCoord.width;
                    height = targetCoord.height;
                }
                var ratioW = width / this.width;
                var ratioH = height / this.height;
                var ratio = Math.min(ratioW, ratioH);
                this.width *= ratio;
                this.height *= ratio;
                if (center) {
                    this.x = x + width / 2 - this.width / 2;
                    this.y = y + height / 2 - this.height / 2;
                }
            }
        }, {
            key: "fitIn",
            value: function fitIn() {
                var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref2$target = _ref2.target;
                var target = _ref2$target === undefined ? null : _ref2$target;
                var _ref2$x = _ref2.x;
                var x = _ref2$x === undefined ? 0 : _ref2$x;
                var _ref2$y = _ref2.y;
                var y = _ref2$y === undefined ? 0 : _ref2$y;
                var _ref2$width = _ref2.width;
                var width = _ref2$width === undefined ? 0 : _ref2$width;
                var _ref2$height = _ref2.height;
                var height = _ref2$height === undefined ? 0 : _ref2$height;
                var _ref2$alignH = _ref2.alignH;
                var alignH = _ref2$alignH === undefined ? "left" : _ref2$alignH;
                var _ref2$alignV = _ref2.alignV;
                var alignV = _ref2$alignV === undefined ? "top" : _ref2$alignV;
                var _ref2$auto = _ref2.auto;
                var auto = _ref2$auto === undefined ? false : _ref2$auto;
                var center = _ref2.center;

                if (center == true) {
                    alignH = "center";
                    alignV = "middle";
                }
                ;
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
                    this._containerBounds = { target: target, x: x, y: y, width: width, height: height, alignH: alignH, alignV: alignV, auto: auto, center: center };
                }
                ;
                var ratioW = width / this.width;
                var ratioH = height / this.height;
                var ratio = Math.min(ratioW, ratioH);
                this.width *= ratio;
                this.height *= ratio;
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
            key: "fitOut",
            value: function fitOut() {
                var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref3$target = _ref3.target;
                var target = _ref3$target === undefined ? null : _ref3$target;
                var _ref3$x = _ref3.x;
                var x = _ref3$x === undefined ? 0 : _ref3$x;
                var _ref3$y = _ref3.y;
                var y = _ref3$y === undefined ? 0 : _ref3$y;
                var _ref3$width = _ref3.width;
                var width = _ref3$width === undefined ? 0 : _ref3$width;
                var _ref3$height = _ref3.height;
                var height = _ref3$height === undefined ? 0 : _ref3$height;
                var _ref3$alignH = _ref3.alignH;
                var alignH = _ref3$alignH === undefined ? "left" : _ref3$alignH;
                var _ref3$alignV = _ref3.alignV;
                var alignV = _ref3$alignV === undefined ? "top" : _ref3$alignV;
                var _ref3$auto = _ref3.auto;
                var auto = _ref3$auto === undefined ? false : _ref3$auto;
                var _ref3$center = _ref3.center;
                var center = _ref3$center === undefined ? false : _ref3$center;

                if (center == true) {
                    alignH = "center";
                    alignV = "middle";
                }
                ;

                if (target) {
                    var targetCoord = this.jx.tools.obj.filter(target, { x: x, y: y, width: width, height: height });
                    x = targetCoord.x;
                    y = targetCoord.y;
                    width = targetCoord.width;
                    height = targetCoord.height;
                }

                var ratioW = width / this.width;
                var ratioH = height / this.height;
                var ratio = Math.max(ratioW, ratioH);
                this.width *= ratio;
                this.height *= ratio;
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
            key: "saveBounds",
            value: function saveBounds() {
                this.savedBounds = {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
                return this.savedBounds;
            }
        }, {
            key: "restoreBounds",
            value: function restoreBounds() {
                var savedBounds = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                savedBounds = savedBounds || this.savedBounds;
                this.width = savedBounds.width;
                this.height = savedBounds.height;
                this.x = savedBounds.x;
                this.y = savedBounds.y;
            }
        }, {
            key: "cache",
            value: function cache() {
                this.view.cache(0, 0, this.view.getBounds().width, this.view.getBounds().height);
            }
        }, {
            key: "updateCache",
            value: function updateCache() {
                this.view.updateCache();
            }
        }, {
            key: "uncache",
            value: function uncache() {
                this.view.uncache();
            }
        }, {
            key: "localToGlobal",
            value: function localToGlobal() {
                var _view;

                return (_view = this.view).localToGlobal.apply(_view, arguments);
            }
        }, {
            key: "globalToLocal",
            value: function globalToLocal() {
                var _view2;

                return (_view2 = this.view).globalToLocal.apply(_view2, arguments);
            }
        }, {
            key: "localToLocal",
            value: function localToLocal() {
                var _view3;

                return (_view3 = this.view).localToLocal.apply(_view3, arguments);
            }
        }, {
            key: "bringToFront",
            value: function bringToFront() {
                this.view.bringToFront();
            }
        }, {
            key: "bringToBack",
            value: function bringToBack() {
                this.view.bringToBack();
            }
        }, {
            key: "_clicked",
            value: function _clicked(evt) {
                if (this._enabled) {
                    this.__clipZapShow();
                    this.onclick.dispatch({ target: this, details: evt });
                }
            }
        }, {
            key: "_rollover",
            value: function _rollover(evt) {
                if (this._enabled) {
                    this.onrollover.dispatch({ target: this, details: evt });
                }
            }
        }, {
            key: "_rollout",
            value: function _rollout(evt) {
                if (this._enabled) {
                    this.onrollout.dispatch({ target: this, details: evt });
                }
            }
        }, {
            key: "_mouseup",
            value: function _mouseup(evt) {
                if (this._enabled) {
                    this.onmouseup.dispatch({ target: this, details: evt });
                }
            }
        }, {
            key: "_mousedown",
            value: function _mousedown(evt) {
                if (this._enabled) {
                    this.onmousedown.dispatch({ target: this, details: evt });
                }
            }
        }, {
            key: "_mousemove",
            value: function _mousemove(evt) {
                if (this._enabled) {
                    this.onmousemove.dispatch({ target: this, details: evt });
                }
            }
        }, {
            key: "parent",
            get: function get() {
                return this._parent;
            },
            set: function set(value) {
                this._parent = value;
            }
        }, {
            key: "render",
            get: function get() {
                return this._render;
            },
            set: function set(value) {
                this._render = value;
            }
        }, {
            key: "visible",
            set: function set(value) {
                this.view.visible = value;
            },
            get: function get() {
                return this.view.visible;
            }
        }, {
            key: "alpha",
            set: function set(value) {
                this.view.alpha = value;
            },
            get: function get() {
                return this.view.alpha;
            }
        }, {
            key: "x",
            set: function set(value) {
                this.view.x = value;
            },
            get: function get() {
                return this.view.x;
            }
        }, {
            key: "y",
            set: function set(value) {
                this.view.y = value;
            },
            get: function get() {
                return this.view.y;
            }
        }, {
            key: "width",
            set: function set(value) {
                this.view.width = value;
            },
            get: function get() {
                return this.view.width;
            }
        }, {
            key: "ratioWidth",
            set: function set(value) {
                var ratio = this.height / this.width;
                this.width = value;
                this.height = value * ratio;
            }
        }, {
            key: "ratioHeight",
            set: function set(value) {
                var ratio = this.width / this.height;
                this.height = value;
                this.width = value * ratio;
            }
        }, {
            key: "rotation",
            set: function set(value) {
                this.view.rotation = value;
            },
            get: function get() {
                return this.view.rotation;
            }
        }, {
            key: "scaleX",
            set: function set(value) {
                this.view.scaleX = value;
            },
            get: function get() {
                return this.view.scaleX;
            }
        }, {
            key: "scaleY",
            set: function set(value) {
                this.view.scaleY = value;
            },
            get: function get() {
                return this.view.scaleY;
            }
        }, {
            key: "scale",
            set: function set(value) {
                this.view.scaleX = value;
                this.view.scaleY = value;
            }
        }, {
            key: "height",
            set: function set(value) {
                this.view.height = value;
            },
            get: function get() {
                return this.view.height;
            }
        }, {
            key: "enabled",
            set: function set(value) {
                this._enabled = value;
                this.cursor = this._cursorOnRoll;
            },
            get: function get() {
                return this._enabled;
            }
        }, {
            key: "cursor",
            set: function set(value) {
                this.view.cursor = value;
            },
            get: function get() {
                return this.view.cursor;
            }
        }]);

        return VisualComponent;
    }(_Component3.default);

    exports.default = VisualComponent;
});
//# sourceMappingURL=VisualComponent.js.map