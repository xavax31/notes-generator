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

    var StageView = function (_Component) {
        _inherits(StageView, _Component);

        function StageView(dataObject) {
            _classCallCheck(this, StageView);

            return _possibleConstructorReturn(this, (StageView.__proto__ || Object.getPrototypeOf(StageView)).call(this, Object.assign({
                renderMode: "canvas",
                framerate: null,
                ratio: null,
                width: null,
                height: null,
                autoUpdate: true,
                fixedStageScale: false,
                autoResize: true,
                forceIOSStageResize: true
            }, dataObject)));
        }

        _createClass(StageView, [{
            key: "_create",
            value: function _create() {
                var _this2 = this;

                _get(StageView.prototype.__proto__ || Object.getPrototypeOf(StageView.prototype), "_create", this).call(this);
                this.addEventDispatcher("onmousedown");
                this.render = "CJS";
                this.view = null;
                this.canvas = null;
                this._stage = null;
                this._renderMode = this.dataObject.renderMode;
                this._scale = 1;
                this.framerate = this.dataObject.framerate || this.jx.config.app.framerate;
                this.fixedStageScale = this.dataObject.fixedStageScale;
                this._autoResize = this.dataObject.autoResize;

                if (this.dataObject.ratio) {
                    this._ratio = this.dataObject.ratio;
                    if (this.dataObject.width) {
                        this._width = this.dataObject.width;
                        this._height = this._width / this._ratio;
                    } else if (this.dataObject.height) {
                        this._height = this.dataObject._height;
                        this._width = this._height * this._ratio;
                    } else {
                        this._width = this.jx.config.app.width;
                        this._height = this._width / this._ratio;
                    }
                } else if (this.dataObject.width && this.dataObject.height) {
                    this._width = this.dataObject.width;
                    this._height = this.dataObject.height;
                    this._ratio = this._width / this._height;
                } else if (this.dataObject.width) {
                    this._ratio = this.jx.config.app.ratio;
                    this._width = this.dataObject.width;
                    this._height = this._width / this._ratio;
                } else if (this.dataObject.height) {
                    this._ratio = this.jx.config.app.ratio;
                    this._height = this.dataObject._height;
                    this._width = this._height * this._ratio;
                } else {
                    this._width = this.jx.config.app.width;
                    this._ratio = this.jx.config.app.ratio;
                    this._height = this._width / this._ratio;
                }
                this._width = Math.min(this._width, 1280, Math.max(this.jx.config.system.screen.resolution.width * this.jx.config.system.screen.pixelRatio, this.jx.config.system.screen.resolution.height * this.jx.config.system.screen.pixelRatio));
                this._height = this._width / this._ratio;
                this.addEventDispatcher("onclick");
                this._allowZIndex = true;
                this._enabled = true;
                this.children = [];
                createjs.Sprite.prototype.initialize = createjs.Sprite;
                this.canvasHolder = $("<div id=" + this.id + " class=\"canvasHolder\" ></div>");
                this.canvasHolder.css("position", "absolute");
                this.canvasHolder.css("width", this._width + "px");
                this.canvasHolder.css("height", this._height + "px");
                this.canvasHolder.css("top", "0px");
                this.canvasHolder.css("left", "0px");
                this.canvasHolder.css("bottom", "0px");
                this.canvasHolder.css("right", "0px");
                this.canvasHolder.css("margin", "0px");
                this.canvasHolder.css("padding", "0px");
                this.canvasHolder.css(" box-sizing", "border-box");

                var canvas = $("<canvas/>");
                canvas.prop("id", "canvas");
                canvas.prop("width", this._width);
                canvas.prop("height", this._height);
                canvas.css("position", "absolute");

                canvas.css("box-sizing", "border-box");

                canvas.css("background-color", "transparent");
                this.allowZIndex = this._allowZIndex;
                canvas.css("-webkit-tap-highlight-color", "rgba(255,0,0,0)");
                this.view = this.canvasHolder[0];
                this.canvas = canvas.get(0);
                this.canvasHolder[0].style.msTransformOrigin = "0px 0px";
                this.canvasHolder[0].style.webkitTransformOrigin = "0px 0px";
                this.canvasHolder[0].style.MozTransformOrigin = "0px 0px";
                this.canvasHolder[0].style.transformOrigin = "0px 0px";
                this.canvas.style.msTransformOrigin = "0px 0px";
                this.canvas.style.webkitTransformOrigin = "0px 0px";
                this.canvas.style.MozTransformOrigin = "0px 0px";
                this.canvas.style.transformOrigin = "0px 0px";
                this.canvasHolder.append(canvas);
                $("body").append(this.canvasHolder);

                if (this._renderMode == "canvas") {
                    this._stage = new createjs.Stage(this.canvas);
                } else if (this._renderMode == "webgl") {
                    if (createjs.StageGL) {
                        this._stage = new createjs.StageGL(this.canvas);
                    } else {
                        console.error("WebGL lib not available. Easeljs and Tweenjs libraries are too olds, you need to update them to NEXT versions");
                    }
                } else {
                    console.error("render mode  unknown");
                }
                this._stage.scaleX = 1;
                this._stage.scaleY = 1;
                this._stage.update();

                if (true) {
                    this._stage.enableMouseOver();
                } else {
                    this._stage.enableMouseOver(0);
                }
                if (createjs.Touch.isSupported()) {
                    createjs.Touch.enable(this._stage);
                }

                createjs.Ticker.setFPS(this.framerate);
                this._updateStage = function (evt) {
                    return _this2._stage.update(evt);
                };
                this.autoUpdate = this.dataObject.autoUpdate;
                if (typeof window.orientation !== 'undefined') {
                    var onOrientationChange = function onOrientationChange() {
                        setTimeout(function (e) {
                            return _this2.onResize(e);
                        }, 100);
                    };
                    $(window).on("orientationchange", onOrientationChange);
                    this.onResize();
                } else {
                    this._onResizeListener = function (evt) {
                        return _this2.onResize();
                    };
                    $(window).on("resize", this._onResizeListener);
                    this.onResize();
                }

                $("body").append(this.canvasHolder);
                this._addListeners();

                if (this.dataObject.forceIOSStageResize) {}
            }
        }, {
            key: "_addListeners",
            value: function _addListeners() {
                var _this3 = this;

                this._listenersRef = this._listenersRef || {};
                this._listenersRef.mousedown = this._stage.on("mousedown", function (evt) {
                    if (_this3._enabled) {
                        _this3.onmousedown.dispatch({ target: _this3, details: evt });
                    }
                });
            }
        }, {
            key: "_removeListeners",
            value: function _removeListeners() {
                if (!this._stage) return;
                this._listenersRef = this._listenersRef || {};
                this.view.off("mousedown", this._listenersRef.onmousedown);
            }
        }, {
            key: "appFreeze",
            value: function appFreeze() {
                if (this._appFreezed) return false;
                this._stateBeforeFreeze = { autoUpdate: this._autoUpdate };
                this.autoUpdate = false;
                _get(StageView.prototype.__proto__ || Object.getPrototypeOf(StageView.prototype), "appFreeze", this).call(this);
            }
        }, {
            key: "appUnfreeze",
            value: function appUnfreeze() {
                if (!this._appFreezed) return false;
                this.autoUpdate = this._stateBeforeFreeze.autoUpdate;
                _get(StageView.prototype.__proto__ || Object.getPrototypeOf(StageView.prototype), "appUnfreeze", this).call(this);
            }
        }, {
            key: "pause",
            value: function pause() {
                if (_get(StageView.prototype.__proto__ || Object.getPrototypeOf(StageView.prototype), "pause", this).call(this)) {
                    createjs.Ticker.removeEventListener("tick", this._stage);
                }
            }
        }, {
            key: "resume",
            value: function resume() {
                if (_get(StageView.prototype.__proto__ || Object.getPrototypeOf(StageView.prototype), "resume", this).call(this)) {
                    createjs.Ticker.addEventListener("tick", this._stage);
                }
            }
        }, {
            key: "close",
            value: function close() {
                if (_get(StageView.prototype.__proto__ || Object.getPrototypeOf(StageView.prototype), "close", this).call(this)) {}
            }
        }, {
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                this.removeAllChildren();
                this.autoUpdate = false;
                this.canvasHolder.remove();
                this._stage = null;
                window.onorientationchange = null;
                if (this._onResizeListener) {
                    $(window).off("resize", this._onResizeListener);
                    this._onResizeListener = null;
                }
                _get(StageView.prototype.__proto__ || Object.getPrototypeOf(StageView.prototype), "kill", this).call(this);
            }
        }, {
            key: "update",
            value: function update() {
                var evt = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                this._stage.update(evt);
            }
        }, {
            key: "getBounds",
            value: function getBounds() {
                return { x: this.x, y: this.y, width: this.width, height: this.height };
            }
        }, {
            key: "addChild",
            value: function addChild() {
                for (var _len = arguments.length, child = Array(_len), _key = 0; _key < _len; _key++) {
                    child[_key] = arguments[_key];
                }

                var result = [];
                var argumentsLength = arguments.length;
                for (var i = 0; i < argumentsLength; i++) {
                    var _child = arguments[i];
                    _child = _child.isJXComponent ? _child : this.cc(_child);
                    if (_child.view == undefined) {
                        console.warn("Could not Add child as it does not have a view", _child);
                        break;
                    }
                    if (_child.render == "DOM") {
                        if (this._allowZIndex) {
                            var children = this.canvasHolder.children();
                            var maxZ = 0;
                            for (var j = 0; j < children.length; j++) {
                                maxZ = Math.max(maxZ, $(children[j]).css("z-index"));
                            }
                            ;
                            this.canvasHolder.append(_child.view);
                            _child.view.css("z-index", maxZ + 1);
                        } else {
                            this.canvasHolder.append(_child.view);
                        }
                    } else {
                        this._stage.addChild(_child.view);
                        if (_child.domView) {
                            this.addChild(_child.domView);
                        }
                        ;
                    }
                    _child.parent = this;
                    this.children.push(_child);
                    result.push(_child);
                    _child.parent = this;
                }
                ;

                return result.pop();
            }
        }, {
            key: "hasChild",
            value: function hasChild(child) {
                return this.children.indexOf(child) != -1;
            }
        }, {
            key: "removeChild",
            value: function removeChild(child) {
                if (!this._killed) {
                    if (child.render == "DOM") {
                        child.view.remove();
                    } else {
                        this._stage.removeChild(child.view);
                    }
                    this.children.splice(this.children.indexOf(child), 1);
                }
                ;
                child.parent = null;
            }
        }, {
            key: "removeAllChildren",
            value: function removeAllChildren() {
                var child;
                for (var i = 0; i < this.children.length; i++) {
                    child = this.children[i];
                    if (child.render == "DOM") {
                        child.view.remove();
                        child.parent = null;
                    } else {
                        this._stage.removeChild(child.view);
                        child.parent = null;
                    }
                }
                ;
                this.children.length = 0;
            }
        }, {
            key: "localToGlobal",
            value: function localToGlobal() {
                var _stage;

                return (_stage = this._stage).localToGlobal.apply(_stage, arguments);
            }
        }, {
            key: "globalToLocal",
            value: function globalToLocal() {
                var _stage2;

                return (_stage2 = this._stage).globalToLocal.apply(_stage2, arguments);
            }
        }, {
            key: "localToLocal",
            value: function localToLocal() {
                var _stage3;

                return (_stage3 = this._stage).localToLocal.apply(_stage3, arguments);
            }
        }, {
            key: "takeSnapshot",
            value: function takeSnapshot(_ref) {
                var _ref$x = _ref.x;
                var x = _ref$x === undefined ? null : _ref$x;
                var _ref$y = _ref.y;
                var y = _ref$y === undefined ? null : _ref$y;
                var _ref$width = _ref.width;
                var width = _ref$width === undefined ? null : _ref$width;
                var _ref$height = _ref.height;
                var height = _ref$height === undefined ? null : _ref$height;
                var _ref$outputWidth = _ref.outputWidth;
                var outputWidth = _ref$outputWidth === undefined ? null : _ref$outputWidth;

                if (x === null) {
                    this._stage.cache(0, 0, this.width, this.height, outputWidth ? outputWidth / this.width : 1);
                } else {
                    var coords = this._stage.globalToLocal(x, y);
                    var size = this._stage.globalToLocal(width, height);
                    this._stage.cache(coords.x, coords.y, size.x, size.y, outputWidth ? outputWidth / size.x : 1);
                }
                var snapshot = this._stage.getCacheDataURL();
                this._stage.uncache();
                return snapshot;
            }
        }, {
            key: "onResize",
            value: function onResize() {
                var evt = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                if (!this._autoResize) return;
                $("body").css("display", "none");
                var w = this._width,
                    h = this._height;
                var iw = $(window).width(),
                    ih = $(window).height();
                var pRatio = window.devicePixelRatio || 1;
                var xRatio = iw / w,
                    yRatio = ih / h,
                    sRatio = 1;
                sRatio = Math.min(xRatio, yRatio);
                var pos = { x: iw / 2 - w * sRatio / 2, y: ih / 2 - h * sRatio / 2 };
                $("body").css("display", "block");
                this.canvasHolder.css("left", Number(pos.x) + "px");
                this.canvasHolder.css("top", Number(pos.y) + "px");
                if (!this.fixedStageScale) {
                    this._stage.scaleX = pRatio * sRatio;
                    this._stage.scaleY = pRatio * sRatio;
                    $(this.canvas).prop("width", w * pRatio * sRatio);
                    $(this.canvas).prop("height", h * pRatio * sRatio);
                }
                ;
                this.canvas.style.width = w * sRatio + 'px';
                this.canvas.style.height = h * sRatio + 'px';
                var width = Number(this.canvasHolder.css("width").replace("px", ""));
                var ratio = (iw - pos.x * 2) / width;
                this._scale = ratio;
                this._scaleCorrection = 1 / (ratio * pRatio);
                var scaleStr = "scale(" + ratio + ")";
                this.canvasHolder[0].style.msTransform = scaleStr;
                this.canvasHolder[0].style.webkitTransform = scaleStr;
                this.canvasHolder[0].style.MozTransform = scaleStr;
                this.canvasHolder[0].style.transform = scaleStr;
                scaleStr = "scale(" + 1 / ratio + ")";
                this.canvas.style.msTransform = scaleStr;
                this.canvas.style.webkitTransform = scaleStr;
                this.canvas.style.MozTransform = scaleStr;
                this.canvas.style.transform = scaleStr;
                this.update();
                if (this._renderMode == "webgl") {
                    this._stage.updateViewport(this.canvas.width, this.canvas.height);
                }
            }
        }, {
            key: "allowZIndex",
            set: function set(value) {
                this._allowZIndex = value;
                $(this.canvas).css("z-index", value ? 1 : "auto");
            }
        }, {
            key: "autoUpdate",
            set: function set(value) {
                if (this._autoUpdate == value) return;
                this._autoUpdate = value;
                if (this._autoUpdate) {
                    createjs.Ticker.addEventListener("tick", this._updateStage);
                } else {
                    createjs.Ticker.removeEventListener("tick", this._updateStage);
                }
            }
        }, {
            key: "ratio",
            set: function set(value) {
                this._ratio = value;
                this._height = this._width / this._ratio;

                this.onResize();
            },
            get: function get() {
                return this._ratio;
            }
        }, {
            key: "enabled",
            get: function get() {
                return this._enabled;
            },
            set: function set(value) {
                this._enabled = value;
            }
        }, {
            key: "x",
            get: function get() {
                return 0;
            }
        }, {
            key: "y",
            get: function get() {
                return 0;
            }
        }, {
            key: "width",
            get: function get() {
                return this._width;
            }
        }, {
            key: "height",
            get: function get() {
                return this._height;
            }
        }, {
            key: "visible",
            set: function set(value) {
                this.canvasHolder.css("display", value ? "initial" : "none");
            },
            get: function get() {
                return this.canvasHolder.css("display") != "none";
            }
        }, {
            key: "mouseCanvasX",
            get: function get() {
                return this._stage.mouseX;
            }
        }, {
            key: "mouseCanvasY",
            get: function get() {
                return this._stage.mouseY;
            }
        }, {
            key: "mouseX",
            get: function get() {
                return this._stage.mouseX * this._scaleCorrection;
            }
        }, {
            key: "mouseY",
            get: function get() {
                return this._stage.mouseY * this._scaleCorrection;
            }
        }, {
            key: "scale",
            get: function get() {
                return this._scale;
            }
        }]);

        return StageView;
    }(_Component3.default);

    exports.default = StageView;
});
//# sourceMappingURL=StageView.js.map