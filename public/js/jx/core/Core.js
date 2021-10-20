define(["exports", "jx/core/DBManager", "jx/core/Factory", "jx/core/Config", "jx/core/utils/Tools"], function (exports, _DBManager, _Factory, _Config, _Tools) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _DBManager2 = _interopRequireDefault(_DBManager);

    var _Factory2 = _interopRequireDefault(_Factory);

    var _Config2 = _interopRequireDefault(_Config);

    var _Tools2 = _interopRequireDefault(_Tools);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var instance = null;
    var singletonEnforcer = function SingetonEnforcer() {
        _classCallCheck(this, SingetonEnforcer);
    };
    var version = "1.0.0";
    var plugs = {
        core: [{ "id": "Component", "src": "jx/core/comps/Component" }, { "id": "BusyScreen", "src": "jx/comps/BusyScreen" }, { "id": "SoundManager", "src": "jx/core/sound/SoundManager" }, { "id": "BatchLoader", "src": "jx/core/BatchLoader" }, { "id": "FXManager", "src": "jx/core/FXManager" }, { "id": "MemoManager", "src": "jx/core/memos/MemoManager" }, { "id": "MemoLocalStorage", "src": "jx/core/memos/MemoLocalStorage" }, { "id": "MemoCookie", "src": "jx/core/memos/MemoCookie" }, { "id": "TransitionManager", "src": "jx/core/transitions/TransitionManager" }, { "id": "Layout", "src": "jx/core/layout/Layout" }, { "id": "Request", "src": "jx/core/Request" }, { "id": "Debugger", "src": "jx/core/Debugger" }, { "id": "List", "src": "jx/core/utils/List" }, { "id": "GroupList", "src": "jx/comps/GroupList" }, { "id": "JSONLoader", "src": "jx/core/loaders/JSONLoader" }, { "id": "ImageLoader", "src": "jx/core/loaders/ImageLoader" }, { "id": "SoundLoader", "src": "jx/core/loaders/SoundLoader" }, { "id": "SoundLoaderMediaElement", "src": "jx/core/loaders/SoundLoaderMediaElement" }, { "id": "TextLoader", "src": "jx/core/loaders/TextLoader" }, { "id": "JSONLoader", "src": "jx/core/loaders/JSONLoader" }, { "id": "FlashtmlLoader", "src": "jx/core/loaders/FlashtmlLoader" }, { "id": "ImageSequenceLoader", "src": "jx/core/loaders/ImageSequenceLoader" }, { "id": "SpriteSheetLoader", "src": "jx/core/loaders/SpriteSheetLoader" }, { "id": "SwapTransition", "src": "jx/core/transitions/SwapTransition" }, { "id": "FlashLib", "src": "jx/comps/flashlib/FlashLib" }, { "id": "StartButton", "src": "jx/comps/StartButton" }, { "id": "ScreensManager", "src": "jx/comps/screensmanager/ScreensManager" }, { "id": "ScreenVideo", "src": "jx/comps/screensmanager/ScreenVideo" }, { "id": "ScreenPhoto", "src": "jx/comps/screensmanager/ScreenPhoto" }],
        CJS: [{ "id": "VisualComponentCJS", "src": "jx/comps/visualcomponent/VisualComponentCJS" }, { "id": "StageView", "src": "jx/comps/StageView" }, { "id": "ShapeCJS", "src": "jx/comps/shape/ShapeCJS" }, { "id": "ImageCJS", "src": "jx/comps/image/ImageCJS" }, { "id": "TextCJS", "src": "jx/comps/text/TextCJS" }, { "id": "TextMultiRender", "src": "jx/comps/text/TextMultiRender" }, { "id": "ContainerCJS", "src": "jx/comps/container/ContainerCJS" }, { "id": "ImageSequenceCJS", "src": "jx/comps/imagesequence/ImageSequenceCJS" }, { "id": "ClipCJS", "src": "jx/comps/clip/ClipCJS" }, { "id": "SimpleButtonCJS", "src": "jx/comps/simplebutton/SimpleButtonCJS" }],
        DOM: [{ "id": "VisualComponentDOM", "src": "jx/comps/visualcomponent/VisualComponentDOM" }, { "id": "TextDOM", "src": "jx/comps/text/TextDOM" }, { "id": "InputText", "src": "jx/comps/InputText" }, { "id": "InputNumber", "src": "jx/comps/InputNumber" }, { "id": "ImageDOM", "src": "jx/comps/image/ImageDOM" }, { "id": "ContainerDOM", "src": "jx/comps/container/ContainerDOM" }, { "id": "ImageSequenceDOM", "src": "jx/comps/imagesequence/ImageSequenceDOM" }, { "id": "VideoDOM", "src": "jx/comps/video/VideoDOM" }, { "id": "SimpleButtonDOM", "src": "jx/comps/simplebutton/SimpleButtonDOM" }, { "id": "SimpleDOMView", "src": "jx/comps/SimpleDOMView" }]
    };
    /**
     * JX Engine v 1.0
     * @license: MIT
     */

    var Core = function () {
        function Core(app) {
            var _this = this;

            _classCallCheck(this, Core);

            this.ticker = createjs.Ticker;
            this.editor = null;

            window["jx" + version] = window["jx" + version] || this;
            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            this.tick = function (args) {
                return window.requestAnimationFrame(args);
            };

            this._setTimeoutIDs = [];
            this._setIntervalIDs = [];
            this.onappfreeze = new signals.Signal();
            this.onappunfreeze = new signals.Signal();
            this.loadedPlugs = [];

            this.global = window["jx"];
            this.debug = this.global.debug;

            this.app = app;
            this.comp = {};

            this.tools = new _Tools2.default();

            if (!(Object.assign instanceof Function)) {
                Object.assign = this.tools.mergeObject;
            }

            this.config = new _Config2.default(this);

            this.db = new _DBManager2.default(this);

            this.factory = new _Factory2.default(this);

            this.cc = function (p) {
                return _this.factory.createComp(p);
            };
            this.syslog = this.debug.debugging ? console.log.bind(console) : function () {};
            this.sysinfo = this.debug.debugging ? console.info.bind(console) : function () {};
            this.syswarn = this.debug.debugging ? console.warn.bind(console) : function () {};
            this.syserror = this.debug.debugging ? console.error.bind(console) : function () {};
            this.log = window["jxAppDebug"] ? console.log.bind(console) : function () {};
            this.info = window["jxAppDebug"] ? console.info.bind(console) : function () {};
            this.warn = window["jxAppDebug"] ? console.warn.bind(console) : function () {};
            this.error = window["jxAppDebug"] ? console.error.bind(console) : function () {};
        }

        _createClass(Core, [{
            key: "closeApplication",
            value: function closeApplication() {
                try {
                    if (this.app) this.app.kill();
                } catch (err) {
                    console.warn("errors while killing application");
                }
                this.app = null;
                this.kill();
                if (this._bayamFrontCom) {
                    this._bayamFrontCom.sendCloseFinalizedRequest();
                }
            }
        }, {
            key: "restartApplication",
            value: function restartApplication() {
                this.kill();
                window.self.location.reload();
            }
        }, {
            key: "blockInteractivity",
            value: function blockInteractivity() {
                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                this.clipZap.clickHandler.add(callback);
                $("body").append(this.clipZap);
                this.clipZap.css("display", "inline");
            }
        }, {
            key: "unblockInteractivity",
            value: function unblockInteractivity() {
                this.clipZap.css("display", "none");
                this.clipZap.detach();
                this.clipZap.clickHandler.removeAll();
            }
        }, {
            key: "pauseApplication",
            value: function pauseApplication() {
                if (this._freezed) return;
                this._freezed = true;
                console.log("JX Pause");
                this.appFreezeClipZap = this._clipZapInit({ zIndex: 10000, opacity: 0.0 });
                $("body").append(this.appFreezeClipZap);
                this.appFreezeClipZap.css("display", "inline");
                this._stateBeforeFreeze = {
                    framerate: createjs.Ticker.framerate
                };
                this.onappfreeze.dispatch();

                this.dj.appFreeze();
            }
        }, {
            key: "resumeApplication",
            value: function resumeApplication() {
                if (!this._freezed) return;
                this._freezed = false;
                console.log("JX Resume");
                this.onappunfreeze.dispatch();

                this.dj.appUnfreeze();
                this.appFreezeClipZap.remove;
                this.appFreezeClipZap.detach();
                this.appFreezeClipZap = null;
            }
        }, {
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                this._killed = true;
                console.info("killing", this);
                try {
                    this.clearAllIntervals();
                    this.dj.kill();
                    this.dj = null;
                    this.db.kill();
                    this.db = null;
                    this.config.kill();
                    this.config = null;
                    this.factory.kill();
                    this.factory = null;
                    this.loadingScreen.kill();
                    this.loadingScreen = null;
                    this.debug.kill();
                    this.debug = null;
                    this.comp = null;
                    this.ticker = null;
                    this.memo = null;
                    this.layout = null;
                    this.fx = null;
                    this.log = null;
                    this.tools = null;
                    window["jx" + version] = null;
                    this.onappfreeze.removeAll();
                    this.onappunfreeze.removeAll();
                    this.onappfreeze = null;
                    this.onappunfreeze = null;
                } catch (err) {
                    console.warn("errors while killing engine");
                }
                this.global.kill();
                this.global = null;
                console.info("killed", this);
            }
        }, {
            key: "_initialise",
            value: function _initialise(_ref, callback) {
                var _ref$plugs = _ref.plugs;
                var plugs = _ref$plugs === undefined ? [] : _ref$plugs;
                var _ref$moduleData = _ref.moduleData;
                var moduleData = _ref$moduleData === undefined ? {} : _ref$moduleData;

                this.loadingScreen = new (this.db.findOne({ "id": "BusyScreen" }).data)({ jx: this });
                this.ticker = createjs.Ticker;

                this.memo = new (this.db.findOne({ "id": "MemoManager" }).data)({ jx: this });

                this.layout = new (this.db.findOne({ "id": "Layout" }).data)({ jx: this });

                this.fx = new (this.db.findOne({ "id": "FXManager" }).data)({ jx: this });

                this.dj = new (this.db.findOne({ "id": "SoundManager" }).data)({ jx: this });
                this.clipZap = this._clipZapInit();
                this.config.setProjectInfo(moduleData.projectInformations);
                this.loadPlugs(plugs, callback);
            }
        }, {
            key: "loadPlugs",
            value: function loadPlugs() {
                var plugsArr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                var callback = arguments[1];

                window["jxTiming"].push({ jxPlugsLoad: Date.now() });

                if (!this.comp.Component) {
                    plugsArr = this.tools.arrayRemoveDouble(["core"].concat(plugsArr));
                }
                var packages = [];
                for (var i = 0; i < plugsArr.length; i++) {
                    if (this.tools.instanceType(plugsArr[i]) == "string") {
                        packages = packages.concat(plugs[plugsArr[i]]);
                    } else {
                        packages.push(plugsArr[i]);
                    }
                }
                for (var i = 0; i < packages.length; i++) {
                    packages[i].type = packages[i].type || "class";
                    packages[i].preload = true;
                }
                ;
                this.loadedPlugs = this.loadedPlugs.concat(packages);
                this.db.addResources(packages);
                this.db.load({ "type": "class" }, function (evt) {
                    window["jxTiming"].push({ jxPlugsLoaded: Date.now() });
                    callback(evt);
                });
            }
        }, {
            key: "_clipZapInit",
            value: function _clipZapInit() {
                var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref2$zIndex = _ref2.zIndex;
                var zIndex = _ref2$zIndex === undefined ? 1000 : _ref2$zIndex;
                var _ref2$opacity = _ref2.opacity;
                var opacity = _ref2$opacity === undefined ? 0 : _ref2$opacity;

                var clipZap = $("<div/>");
                clipZap.prop("id", "clipzap");
                clipZap.prop("class", "canvasHolder");
                clipZap.css("background-color", "#ff0000");
                clipZap.css("position", "absolute");
                clipZap.css("opacity", opacity);

                clipZap.css("top", "0px");
                clipZap.css("left", "0px");
                clipZap.css("bottom", "0px");
                clipZap.css("right", "0px");
                clipZap.css("margin", "0px");
                clipZap.css("padding", "0px");
                clipZap.css("display", "none");
                clipZap.css("z-index", zIndex);
                clipZap.addClass("child");
                clipZap.clickHandler = new signals.Signal();
                clipZap.setConfig = function (_ref3) {
                    var opacity = _ref3.opacity;
                    var eventType = _ref3.eventType;

                    if (opacity) clipZap.css("opacity", opacity);
                    if (eventType) {
                        clipZap.off();
                        clipZap.on(eventType, function (evt) {
                            console.log("clickzap clicked", evt.type);
                            setTimeout(function (evt) {
                                return clipZap.clickHandler.dispatch();
                            }, 1);
                        });

                        clipZap.on('touchmove', function (e) {
                            e.preventDefault();
                        }, false);
                    }
                };
                var eventType = this.config.system.device.support !== "mobile" ? "mousedown" : "touchstart";
                clipZap.setConfig({ opacity: opacity, eventType: eventType });
                return clipZap;
            }
        }, {
            key: "toString",
            value: function toString() {
                return "JXCore v" + version;
            }
        }, {
            key: "wait",
            value: function wait() {
                var delay = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                var _intID = setTimeout(callback, delay);
                this._setTimeoutIDs.push(_intID);
                return _intID;
            }
        }, {
            key: "waitReset",
            value: function waitReset(waitID) {
                if (waitID) clearTimeout(waitID);
                this._setTimeoutIDs.splice(this._setTimeoutIDs.indexOf(waitID), 1);
            }
        }, {
            key: "setInterval",
            value: function (_setInterval) {
                function setInterval() {
                    return _setInterval.apply(this, arguments);
                }

                setInterval.toString = function () {
                    return _setInterval.toString();
                };

                return setInterval;
            }(function () {
                var delay = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                var _intID = setInterval(callback, delay);
                this._setIntervalIDs.push(_intID);
                return _intID;
            })
        }, {
            key: "clearInterval",
            value: function (_clearInterval) {
                function clearInterval(_x) {
                    return _clearInterval.apply(this, arguments);
                }

                clearInterval.toString = function () {
                    return _clearInterval.toString();
                };

                return clearInterval;
            }(function (intervalID) {
                if (intervalID) clearInterval(intervalID);
                this._setIntervalIDs.splice(this._setIntervalIDs.indexOf(intervalID), 1);
            })
        }, {
            key: "clearAllIntervals",
            value: function clearAllIntervals() {
                for (var i = 0; i < this._setIntervalIDs.length; i++) {
                    clearInterval(this._setIntervalIDs[i]);
                }
                this._setIntervalIDs.length = 0;
                for (var i = 0; i < this._setTimeoutIDs.length; i++) {
                    clearTimeout(this._setTimeoutIDs[i]);
                }
                this._setTimeoutIDs.length = 0;
            }
        }, {
            key: "merge",
            value: function merge() {
                var arg;
                var result = {};

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                for (var i = 0; i < args.length; i++) {
                    arg = args[i];
                    if (this.tools.instanceType(arg) == "string") {
                        arg = this.db.findOne({ id: arg }).data;
                    }
                    this.tools.mergeObjectIn(result, arg);
                }
                return result;
            }
        }, {
            key: "freezed",
            get: function get() {
                return this._freezed;
            }
        }, {
            key: "version",
            get: function get() {
                return version;
            }
        }]);

        return Core;
    }();

    exports.default = Core;
});
//# sourceMappingURL=Core.js.map