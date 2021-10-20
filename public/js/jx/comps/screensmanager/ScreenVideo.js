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

    var ScreenVideo = function (_Component) {
        _inherits(ScreenVideo, _Component);

        function ScreenVideo(dataObject) {
            _classCallCheck(this, ScreenVideo);

            return _possibleConstructorReturn(this, (ScreenVideo.__proto__ || Object.getPrototypeOf(ScreenVideo)).call(this, Object.assign({
                zap: true,
                zapMarkers: null,
                layerLevel: 100,
                autoStart: false
            }, dataObject)));
        }

        _createClass(ScreenVideo, [{
            key: "_create",
            value: function _create() {
                _get(ScreenVideo.prototype.__proto__ || Object.getPrototypeOf(ScreenVideo.prototype), "_create", this).call(this);
                this.addEventDispatcher("onfinished");
                this.type = "video";
                this.needUserClickToStart = true;
                this.no = this.dataObject.no !== undefined ? this.dataObject.no : this.no;
                this.rid = this.dataObject.rid || this.dataObject.resourceID;
                this.zap = this.dataObject.zap;
                this.zapMarkers = this.dataObject.zapMarkers;
                this.layerLevel = this.dataObject.layerLevel;
                this.nextScreenID = this.dataObject.nextScreenID;
                this.bgMusicVolPC = this.dataObject.bgMusicVolPC;
                if (this.dataObject.onfinished) {
                    this.onfinished.add(this.dataObject.onfinished);
                }
                ;
                this._ready = true;
            }
        }, {
            key: "show",
            value: function show() {
                var _this2 = this;

                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];
                var _ref = arguments[1];
                var _ref$autoplay = _ref.autoplay;
                var autoplay = _ref$autoplay === undefined ? true : _ref$autoplay;

                this.view = this.jx.playVideo({
                    id: this.rid,
                    autoplay: autoplay,
                    zap: this.zap,
                    zapMarkers: this.zapMarkers,
                    bgMusicVolPC: this.bgMusicVolPC,
                    onfinished: function onfinished(evt) {
                        _this2.onfinished.dispatch({ target: _this2 });
                        if (_this2.nextScreenID) {
                            _this2.jx.app.screens.go(_this2.nextScreenID);
                        }
                    },
                    onready: function onready(evt) {
                        console.log("ON READY");
                        _this2.jx.wait(50, function () {
                            return callback(evt);
                        });
                    }
                });

                this.layerLevel = this._layerLevel;
            }
        }, {
            key: "showScreen",
            value: function showScreen() {
                this.view.visible = true;
            }
        }, {
            key: "hide",
            value: function hide(evt) {
                if (this.view) {
                    this.view.killme();
                    this.view = null;
                }
            }
        }, {
            key: "kill",
            value: function kill() {
                if (this.view) {
                    this.view.killme();
                    this.view.kill(true);
                    this.view = null;
                }
                _get(ScreenVideo.prototype.__proto__ || Object.getPrototypeOf(ScreenVideo.prototype), "kill", this).call(this);
            }
        }, {
            key: "layerLevel",
            set: function set(value) {
                this._layerLevel = value;
                if (this.view) {
                    this.view.view.css("z-index", this._layerLevel);
                }
                ;
            }
        }]);

        return ScreenVideo;
    }(_Component3.default);

    exports.default = ScreenVideo;
});
//# sourceMappingURL=ScreenVideo.js.map