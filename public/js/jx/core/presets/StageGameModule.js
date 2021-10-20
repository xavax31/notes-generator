define(["exports", "jx/core/presets/GameModule"], function (exports, _GameModule) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _GameModule2 = _interopRequireDefault(_GameModule);

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

    var StageGameModule = function (_ModuleType) {
        _inherits(StageGameModule, _ModuleType);

        function StageGameModule(dataObject) {
            _classCallCheck(this, StageGameModule);

            return _possibleConstructorReturn(this, (StageGameModule.__proto__ || Object.getPrototypeOf(StageGameModule)).call(this, Object.assign({
                renderMode: "canvas",
                stageWidth: null,
                stageHeight: null,
                ratio: null,
                forceIOSStageResize: true
            }, dataObject)));
        }

        _createClass(StageGameModule, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                this.jx.playVideo = null;
                _get(StageGameModule.prototype.__proto__ || Object.getPrototypeOf(StageGameModule.prototype), "kill", this).call(this);
                this.stage = null;
            }
        }, {
            key: "appFreeze",
            value: function appFreeze() {
                if (this._appFreezed) return false;
                this._stateBeforeFreeze = {};
                _get(StageGameModule.prototype.__proto__ || Object.getPrototypeOf(StageGameModule.prototype), "appFreeze", this).call(this);
            }
        }, {
            key: "appUnfreeze",
            value: function appUnfreeze() {
                if (!this._appFreezed) return false;
                _get(StageGameModule.prototype.__proto__ || Object.getPrototypeOf(StageGameModule.prototype), "appUnfreeze", this).call(this);
            }
        }, {
            key: "_preInit",
            value: function _preInit(callback) {
                var _this2 = this;

                _get(StageGameModule.prototype.__proto__ || Object.getPrototypeOf(StageGameModule.prototype), "_preInit", this).call(this, function (evt) {
                    _this2.stage = _this2.cc({ type: "StageView",
                        renderMode: _this2.dataObject.renderMode,
                        width: _this2.dataObject.stageWidth || _this2.jx.config.app.defaultStageResolution.width,
                        height: _this2.dataObject.stageHeight || _this2.jx.config.app.defaultStageResolution.height,
                        ratio: _this2.dataObject.ratio,
                        forceIOSStageResize: _this2.dataObject.forceIOSStageResize,
                        fixedStageScale: _this2.dataObject.fixedStageScale !== undefined ? _this2.dataObject.fixedStageScale : false
                    });
                    _this2.jx.playVideo = function (params) {
                        return _this2.playVideo(params);
                    };
                    callback();
                });
            }
        }, {
            key: "playVideo",
            value: function playVideo(_ref) {
                var _this3 = this;

                var id = _ref.id;
                var _ref$loops = _ref.loops;
                var loops = _ref$loops === undefined ? 0 : _ref$loops;
                var _ref$zap = _ref.zap;
                var zap = _ref$zap === undefined ? true : _ref$zap;
                var _ref$zapMarkers = _ref.zapMarkers;
                var zapMarkers = _ref$zapMarkers === undefined ? null : _ref$zapMarkers;
                var _ref$bgMusicVolPC = _ref.bgMusicVolPC;
                var bgMusicVolPC = _ref$bgMusicVolPC === undefined ? 40 : _ref$bgMusicVolPC;
                var onfinished = _ref.onfinished;
                var onready = _ref.onready;
                var _ref$layerLevel = _ref.layerLevel;
                var layerLevel = _ref$layerLevel === undefined ? "front" : _ref$layerLevel;
                var _ref$autoplay = _ref.autoplay;
                var autoplay = _ref$autoplay === undefined ? true : _ref$autoplay;

                this.jx._videosList = this.jx._videosList || {};

                var rid = this.choosenResolution ? id.toUpperCase() + ".VIDEO_" + this.choosenResolution.str : id.toUpperCase() + ".VIDEO";
                var resource = this.jx.db.findOne({ id: rid });
                if (!resource) {
                    rid = id;
                    resource = this.jx.db.findOne({ id: id });
                }
                if (!resource) {
                    console.error("Video resource", id, "not found");
                    return;
                }

                var video = this.cc({ id: id, type: "Video", loops: loops, render: "DOM", rid: rid, visible: false });
                this.stage.addChild(video);
                var view = $(video.view);
                console.log("PARENT", view.parent());

                var finished = function finished(evt) {
                    video.onclick.removeAll();
                    video.onfinished.removeAll();
                    if (!video.view[0].paused) video.view[0].pause();
                    _this3.jx.dj.music.volume = _this3.jx.dj.music.volumeOld;
                    onfinished({ target: video });
                };
                video.onfinished.addOnce(finished);
                video.hasBeginPlay = false;
                video.onplaying.add(function (evt) {
                    video.onplaying.removeAll();
                    video.hasBeginPlay = true;
                    _this3.jx.loadingScreen.hide();
                    _this3.jx.dj.music.volumeOld = _this3.jx.dj.music.volume;
                    _this3.jx.dj.music.volume = _this3.jx.dj.music.volume * bgMusicVolPC / 100;
                    video.fitIn({ x: 0, y: 0, width: _this3.stage.width, height: _this3.stage.height, alignV: "middle" });
                    onready({ target: video });
                });
                video.onwaiting.add(function (evt) {
                    _this3.jx.wait(800, function (evt) {
                        if (!video.hasBeginPlay) _this3.jx.loadingScreen.show();
                    });
                });
                video.killme = function () {
                    _this3.stage.removeChild(video);
                    _this3.comps.remove(video);
                    video.kill(false);
                };
                var onClicZap = function onClicZap() {
                    if (zapMarkers) {
                        var currentTime = video.currentTime;
                        var distance = void 0,
                            lastDistance = void 0,
                            marker = void 0,
                            nearMarker = void 0;
                        for (var i = 0; i < zapMarkers.length; i++) {
                            marker = zapMarkers[i];
                            distance = marker - currentTime;
                            if (distance > 0 && (!lastDistance || distance < lastDistance)) {
                                lastDistance = distance;
                                nearMarker = marker;
                            }
                        }
                        if (nearMarker) {
                            video.currentTime = nearMarker;
                        } else {
                            finished({ target: video });
                        }
                    } else {
                        finished({ target: video });
                    }
                };
                if (zap) {
                    if (layerLevel == "front") {
                        video.onclick.add(onClicZap);
                    } else if (layerLevel == "back") {
                        this.jx.blockInteractivity(function () {
                            _this3.jx.unblockInteractivity();
                            onClicZap();
                        });
                    }
                }
                ;
                if (autoplay) video.play();
                return video;
            }
        }]);

        return StageGameModule;
    }(_GameModule2.default);

    exports.default = StageGameModule;
});
//# sourceMappingURL=StageGameModule.js.map