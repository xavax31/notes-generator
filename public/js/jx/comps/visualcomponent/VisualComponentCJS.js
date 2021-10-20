define(["exports", "jx/core/comps/VisualComponent"], function (exports, _VisualComponent2) {
    "use strict";

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

    var _set = function set(object, property, value, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent !== null) {
                set(parent, property, value, receiver);
            }
        } else if ("value" in desc && desc.writable) {
            desc.value = value;
        } else {
            var setter = desc.set;

            if (setter !== undefined) {
                setter.call(receiver, value);
            }
        }

        return value;
    };

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

    var VisualComponentCJS = function (_VisualComponent) {
        _inherits(VisualComponentCJS, _VisualComponent);

        function VisualComponentCJS(dataObject) {
            _classCallCheck(this, VisualComponentCJS);

            return _possibleConstructorReturn(this, (VisualComponentCJS.__proto__ || Object.getPrototypeOf(VisualComponentCJS)).call(this, dataObject));
        }

        _createClass(VisualComponentCJS, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;

                if (this.view) {
                    this._removeListeners();
                    if (this.view.cacheCanvas) {
                        this.view.uncache();
                    }
                    ;
                }
                ;
                _get(VisualComponentCJS.prototype.__proto__ || Object.getPrototypeOf(VisualComponentCJS.prototype), "kill", this).call(this);
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(VisualComponentCJS.prototype.__proto__ || Object.getPrototypeOf(VisualComponentCJS.prototype), "_initSync", this).call(this);
                if (!this.view) return;
                this.view._jxClip = this;
                this._addListeners();
            }
        }, {
            key: "getLimits",
            value: function getLimits() {
                return this.view.getTransformedBounds();
            }
        }, {
            key: "transform",
            value: function transform(par) {
                this.view.x = par.x || this.view.x;
                this.view.y = par.y || this.view.y;
            }
        }, {
            key: "_addListeners",
            value: function _addListeners() {
                var _this2 = this;

                if (!this.view) return;
                this._basicsListeners = this._basicsListeners || {};
                this._removeListeners();
                this._basicsListeners.onclick = this.view.on("click", function (evt) {
                    return _this2._clicked(evt);
                });
                this._basicsListeners._rollover = this.view.on("rollover", function (evt) {
                    return _this2._rollover(evt);
                });
                this._basicsListeners._rollout = this.view.on("rollout", function (evt) {
                    return _this2._rollout(evt);
                });
                this._basicsListeners._mouseup = this.view.on("pressup", function (evt) {
                    return _this2._mouseup(evt);
                });
                this._basicsListeners._mousedown = this.view.on("mousedown", function (evt) {
                    return _this2._mousedown(evt);
                });
                this._basicsListeners._mousemove = this.view.on("pressmove", function (evt) {
                    return _this2._mousemove(evt);
                });
            }
        }, {
            key: "_removeListeners",
            value: function _removeListeners() {
                if (!this.view) return;
                this._basicsListeners = this._basicsListeners || {};
                this.view.off("click", this._basicsListeners.onclick);
                this.view.off("rollover", this._basicsListeners.onrollover);
                this.view.off("rollout", this._basicsListeners.onrollout);
                this.view.off("pressup", this._basicsListeners.onmouseup);
                this.view.off("mousedown", this._basicsListeners.onmousedown);
                this.view.off("pressmove", this._basicsListeners.onmousemove);
            }
        }, {
            key: "makeRotationOffset",
            value: function makeRotationOffset() {
                return Math.cos(this.rotation % 90 * (Math.PI / 180));
            }
        }, {
            key: "cache",
            value: function cache() {
                var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref$scale = _ref.scale;
                var scale = _ref$scale === undefined ? 1 : _ref$scale;
                var _ref$quality = _ref.quality;
                var quality = _ref$quality === undefined ? this.jx.config.flashOptimizer.quality : _ref$quality;

                if (scale === "fixe") {
                    var resScreen = this.jx.config.system.screen.resolutionUser;
                    var visualBounds = this.view.getBounds();
                    var stage = this.jx.app.stage || resScreen;
                    var scaleW = this.width * resScreen.width / (visualBounds.width * stage.width);
                    var scaleH = this.height * resScreen.height / (visualBounds.height * stage.height);
                    scale = Math.min(scaleW, scaleH);
                    console.log(stage, scale);
                }
                scale = Math.abs(scale);
                var scaleFactor = this.jx.config.urlParams.scaleFactor != undefined ? this.jx.config.urlParams.scaleFactor : 1;
                var bounds = this.view.getBounds() || this.view.nominalBounds || { x: 0, y: 0, width: 1, height: 1 };
                var qualityFactor = quality == "best" ? window.devicePixelRatio : 1;
                var ratio = Math.max(this.jx.config.system.screen.resolution.width, this.jx.config.system.screen.resolution.height) / Math.max(bounds.width * this.view.scaleX, bounds.height * this.view.scaleY);
                ratio = ratio < 1 ? ratio : 1;
                if (this.id == 1) {}
                ;
                var scaleTotal = Math.max(this.view.scaleX, this.view.scaleY) * ratio * scaleFactor * qualityFactor * scale;
                if (bounds.width * scaleTotal > 2048 || bounds.height * scaleTotal > 2048) {
                    console.warn("Image Cache reaches max limits 2048 and has been reduced to fit in limits", this.id, this.view);
                    scaleTotal = Math.min(2048 / bounds.width, 2048 / bounds.height);
                }
                ;
                this.view.cache(bounds.x, bounds.y, bounds.width, bounds.height, scaleTotal);
                if (this.view.cacheCanvas.width > 2048 || this.view.cacheCanvas.height > 2048) {
                    console.error("Image Cache reaches max limits 2048 (reduction auto has not working)", this.view.cacheCanvas, this.view);
                } else {}
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
                if (this.view.parent) this.view.parent.setChildIndex(this.view, this.view.parent.numChildren - 1);
            }
        }, {
            key: "bringToBack",
            value: function bringToBack() {
                if (this.view.parent) this.view.parent.setChildIndex(this.view, 0);
            }
        }, {
            key: "realWidth",
            get: function get() {
                var oldRotation = this.rotation;
                this.rotation = 0;
                var width = this.width;
                this.rotation = oldRotation;
                return width;
            },
            set: function set(value) {
                var oldRotation = this.rotation;
                this.rotation = 0;
                this.width = value;
                this.rotation = oldRotation;
            }
        }, {
            key: "realHeight",
            get: function get() {
                var oldRotation = this.rotation;
                this.rotation = 0;
                var height = this.height;
                this.rotation = oldRotation;
                return height;
            },
            set: function set(value) {
                var oldRotation = this.rotation;
                this.rotation = 0;
                this.height = value;
                this.rotation = oldRotation;
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
            },
            get: function get() {
                if (this.view.getTransformedBounds()) {
                    return this.view.getTransformedBounds().height;
                }
                return 0;
            }
        }, {
            key: "enabled",
            set: function set(value) {
                _set(VisualComponentCJS.prototype.__proto__ || Object.getPrototypeOf(VisualComponentCJS.prototype), "enabled", value, this);
                this.view.mouseEnabled = value;
            },
            get: function get() {
                return _get(VisualComponentCJS.prototype.__proto__ || Object.getPrototypeOf(VisualComponentCJS.prototype), "enabled", this);
            }
        }, {
            key: "anchorX",
            set: function set(value) {
                this._anchorX = value;
                this.view.regX = this._anchorX;
            },
            get: function get() {
                return this._anchorX;
            }
        }, {
            key: "anchorY",
            set: function set(value) {
                this._anchorY = value;
                this.view.regY = this.anchorY;
            },
            get: function get() {
                return this._anchorY;
            }
        }, {
            key: "anchor",
            set: function set(value) {
                this.anchorY = value;
                this.anchorX = value;
            },
            get: function get() {
                return { anchorX: this.anchorX, anchorY: this.anchorY };
            }
        }, {
            key: "cursor",
            set: function set(value) {
                this._cursorOnRoll = value;
                if (this._enabled) {
                    this.view.cursor = value;
                } else {
                    this.view.cursor = this._cursorOnDisabled;
                }
            },
            get: function get() {
                return this._cursorOnRoll;
            }
        }, {
            key: "parent",
            get: function get() {
                if (this.view.parent && this.view.parent._jxClip) {
                    return this.view.parent._jxClip;
                } else {
                    return null;
                }
            },
            set: function set(value) {
                this._parent = value;
            }
        }], [{
            key: "initialiseMod",
            value: function initialiseMod(mod) {
                mod.mixin(["_addListeners", "_removeListeners", "width", "height", "saveBounds", "cache", "localToGlobal", "globalToLocal", "localToLocal"], VisualComponentCJS, "VisualComponent");
            }
        }]);

        return VisualComponentCJS;
    }(_VisualComponent3.default);

    exports.default = VisualComponentCJS;
});
//# sourceMappingURL=VisualComponentCJS.js.map