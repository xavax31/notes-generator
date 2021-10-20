define(["exports", "jx/core/comps/Component", "jx/core/loaders/SoundLoaderMediaElement", "jx/projecttypes/simplejson/Importer"], function (exports, _Component2, _SoundLoaderMediaElement, _Importer) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

    var _SoundLoaderMediaElement2 = _interopRequireDefault(_SoundLoaderMediaElement);

    var _Importer2 = _interopRequireDefault(_Importer);

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

    var GameModule = function (_Component) {
        _inherits(GameModule, _Component);

        function GameModule(dataObject) {
            _classCallCheck(this, GameModule);

            var _this = _possibleConstructorReturn(this, (GameModule.__proto__ || Object.getPrototypeOf(GameModule)).call(this, Object.assign({
                plugs: []
            }, dataObject)));

            _this.importData = null;
            _this.jx.playComment = function (params) {
                return _this.playComment(params);
            };
            _this.jx.saveImageToGallery = function (params) {
                return _this.saveImageToGallery(params);
            };
            return _this;
        }

        _createClass(GameModule, [{
            key: "kill",
            value: function kill() {
                this.jx.playComment = null;
                this.jx.saveImageToGallery = null;
                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "kill", this).call(this);
            }
        }, {
            key: "initialise",
            value: function initialise(callback) {
                var _this2 = this;

                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "initialise", this).call(this, function (evt) {
                    _this2.jx.debug.info("------- GameModule initialised -------");

                    _this2._logTiming();

                    callback({ target: _this2 });
                });
                return this;
            }
        }, {
            key: "_preInit",
            value: function _preInit(callback) {
                var _this3 = this;

                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "_preInit", this).call(this, function (evt) {
                    _this3.jx.loadPlugs([], function (evt) {
                        return _this3._importConfig(function (evt) {
                            return _this3.initBayam(function (evt) {
                                return _this3._jxInit(function (evt) {
                                    return _this3._loadResources(function (evt) {
                                        return callback();
                                    });
                                });
                            });
                        });
                    });
                });
            }
        }, {
            key: "init",
            value: function init(callback) {
                callback();
            }
        }, {
            key: "_postInit",
            value: function _postInit(callback) {
                var _this4 = this;

                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "_postInit", this).call(this, function (evt) {
                    window["jxTiming"].push({ moduleReady: Date.now() });
                    var startbtnInfos = {
                        show: _this4.jx.config.app.startButton,
                        heightPercent: _this4.jx.config.app.startButtonHeightPercent + "%"
                    };
                    console.log("STARTBTN", startbtnInfos, _this4.jx.config.system.needUserActionToWork);
                    if (startbtnInfos.show == "yes" || startbtnInfos.show == "auto" && _this4.jx.config.system.needUserActionToWork) {
                        _this4.jx.loadingScreen.hideSpinner();
                        if (_this4.onStartBtn) {
                            _this4.jx.loadingScreen.showStartButton({ height: startbtnInfos.heightPercent, onclick: function onclick() {
                                    _this4.onStartBtn();
                                    _this4.jx.wait(0, function (evt) {
                                        return _this4.jx.loadingScreen.hide();
                                    });
                                } });
                            callback();
                        } else if (_this4.screens) {
                            if (_this4.screens.give(_this4.firstScreen).type == "video") {
                                _this4.jx.loadingScreen.showStartButton({ height: startbtnInfos.heightPercent, onclick: function onclick() {
                                        _this4.screens.give(_this4.firstScreen).view.play();
                                        _this4.jx.wait(0, function (evt) {
                                            return _this4.jx.loadingScreen.hide();
                                        });
                                    } });
                                callback();
                            } else {
                                _this4.jx.loadingScreen.showStartButton({ height: startbtnInfos.heightPercent, onclick: function onclick() {
                                        _this4.jx.wait(0, function (evt) {
                                            return _this4.jx.loadingScreen.hide();
                                        });
                                        callback();
                                    } });
                            }
                        }
                    } else {
                        _this4.jx.wait(0, function (evt) {
                            return _this4.jx.loadingScreen.hide();
                        });
                        callback();
                    }
                });
            }
        }, {
            key: "_importConfig",
            value: function _importConfig(callback) {
                var _this5 = this;

                window["jxTiming"].push({ configLoad: Date.now() });
                new _Importer2.default(this.jx, null).importConfig(function (importData) {
                    window["jxTiming"].push({ configLoaded: Date.now() });
                    _this5.importData = importData;

                    callback();
                });
            }
        }, {
            key: "_jxInit",
            value: function _jxInit(callback) {
                var _this6 = this;

                window["jxTiming"].push({ jx_initialise: Date.now() });
                this.jx._initialise({
                    plugs: ["CJS", "DOM"].concat(this.dataObject.plugs),
                    moduleData: this.importData
                }, function (evt) {
                    window["jxTiming"].push({ jx_Initialised: Date.now() });
                    _this6.jx.memo.addMemo({ id: "global" });
                    _this6.jx.memo.addMemo({ id: "cookie", type: "Cookie", autosave: true });
                    callback();
                });
            }
        }, {
            key: "_loadResources",
            value: function _loadResources(callback) {
                var _this7 = this;

                this._debugStartTime = Date.now();

                window["jxTiming"].push({ loadResources: Date.now() });
                for (var i = 0; i < this.importData.resources.length; i++) {
                    if (this.importData.resources[i].id == "Langues") {
                        var lang = this.importData.resources[i];
                        var langs = lang.value.split(",");
                        for (var i = 0; i < langs.length; i++) {
                            langs[i] = langs[i].trim();
                        }
                        ;
                        if (langs.length > 0) {
                            this.jx.config.langs = langs;
                            this.jx.config.lang = langs[0];
                        }
                        ;
                        break;
                    }
                }
                ;

                this.jx.db.addResources(this.importData.resources);
                this._onBeforeLoad(function () {
                    _this7.jx.db.load({ "type": "class" }, function () {
                        _this7.jx.db.load({ "preload": true }, function () {
                            _this7.jx.config.init();

                            window["jxTiming"].push({ resourcesLoaded: Date.now() });
                            callback();
                        });
                    });
                });
            }
        }, {
            key: "_onBeforeLoad",
            value: function _onBeforeLoad(callback) {
                callback();
            }
        }, {
            key: "pause",
            value: function pause() {
                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "pause", this).call(this);
            }
        }, {
            key: "resume",
            value: function resume() {
                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "resume", this).call(this);
            }
        }, {
            key: "close",
            value: function close() {
                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "close", this).call(this);
            }
        }, {
            key: "onPause",
            value: function onPause() {}
        }, {
            key: "onResume",
            value: function onResume() {}
        }, {
            key: "onClose",
            value: function onClose() {
                this.jx.closeApplication();
            }
        }, {
            key: "appFreeze",
            value: function appFreeze() {
                if (this._appFreezed) return false;
                this._stateBeforeFreeze = {};
                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "appFreeze", this).call(this);
            }
        }, {
            key: "appUnfreeze",
            value: function appUnfreeze() {
                if (!this._appFreezed) return false;
                _get(GameModule.prototype.__proto__ || Object.getPrototypeOf(GameModule.prototype), "appUnfreeze", this).call(this);
            }
        }, {
            key: "initBayam",
            value: function initBayam(onInitialised) {
                var _this8 = this;

                this.id = this.id || "Module1";
                if (this.jx.config.system.container.type == "bayam") {
                    var onReady = function onReady(event) {
                        console.log("onReady", event);
                        var clientContext = event.data;
                    };

                    var onVolumeChange = function onVolumeChange(event) {
                        alert("onVolumeChange");
                        console.log("onVolumeChange", event.data);
                        var volume = event.data;
                    };

                    this._bayamFrontCom = new BayamFrontCom(this.id);
                    this._bayamFrontCom.onPause(function () {
                        return _this8.jx.pauseApplication();
                    });
                    this._bayamFrontCom.onResume(function () {
                        return _this8.jx.resumeApplication();
                    });

                    this._bayamFrontCom.onClose(function () {
                        console.log("OnClose");
                        _this8.onClose();
                    });

                    this._bayamFrontCom.onReady(onReady);

                    this._bayamFrontCom.onVolumeChange(onVolumeChange);
                    this.jx._bayamFrontCom = this._bayamFrontCom;
                }
                onInitialised();
            }
        }, {
            key: "saveSnapshot",
            value: function saveSnapshot(_ref) {
                var _ref$x = _ref.x;
                var x = _ref$x === undefined ? 0 : _ref$x;
                var _ref$y = _ref.y;
                var y = _ref$y === undefined ? 0 : _ref$y;
                var width = _ref.width;
                var height = _ref.height;
                var outputWidth = _ref.outputWidth;
                var _ref$onfinished = _ref.onfinished;
                var onfinished = _ref$onfinished === undefined ? function (evt) {} : _ref$onfinished;

                this.stage._stage.cache(x, y, width, height, outputWidth ? outputWidth / width : 1);
                if (this.jx.config.system.container.type === "bayam") {
                    this.jx.saveImageToGallery({ img: this.stage._stage.getCacheDataURL(),
                        onsuccess: function onsuccess(evt) {
                            console.log("onsuccess", evt);
                            onfinished({ success: true });
                        },
                        onfail: function onfail(evt) {
                            console.log("onfail", evt);
                            onfinished({ success: false });
                        }
                    });
                    this.stage._stage.uncache();
                } else {
                    window.open(this.stage._stage.getCacheDataURL(), "");
                    this.stage._stage.uncache();
                    onfinished({ success: true });
                }
            }
        }, {
            key: "saveImageToGallery",
            value: function saveImageToGallery(_ref2) {
                var img = _ref2.img;
                var _ref2$desc = _ref2.desc;
                var desc = _ref2$desc === undefined ? null : _ref2$desc;
                var _ref2$onfinished = _ref2.onfinished;
                var onfinished = _ref2$onfinished === undefined ? function (evt) {} : _ref2$onfinished;

                if (this.jx.config.system.container.type === "bayam") {
                    this._bayamFrontCom.sendCreation(img, desc, function (evt) {
                        onfinished({ success: true });
                    }, function (evt) {
                        onfinished({ success: true });
                    });
                } else if (this.jx.config.system.container.type === "azoomee") {
                    var imageData = img.replace(/^data:image\/(png|jpg);base64,/, '');
                    parent.postMessage({ method: "saveImage", responseID: "optionnalID", imageData: imageData }, "*");
                } else {
                    var iframe = "<iframe frameBorder='0' width='2000px' height='2000px' onload='this.style.height=this.contentDocument.body.scrollHeight +\'px\';' src='" + img + "'></iframe>";
                    var x = window.open();
                    x.document.open();
                    x.document.write(iframe);
                    x.document.close();
                    onfinished({ success: true });
                }
            }
        }, {
            key: "save",
            value: function save() {}
        }, {
            key: "load",
            value: function load() {}
        }, {
            key: "preloadSound",
            value: function preloadSound(_ref3) {
                var id = _ref3.id;
                var _ref3$onfinished = _ref3.onfinished;
                var onfinished = _ref3$onfinished === undefined ? function (evt) {} : _ref3$onfinished;

                var resource = this.jx.db.findOne({ id: id });
                if (resource.data != null) {
                    onfinished({ resource: resource });
                } else if (resource.loader != null) {
                    resource.loader.onloaded.addOnce(function (evt) {
                        return onfinished({ resource: resource });
                    });
                } else {
                    var loader = new _SoundLoaderMediaElement2.default(resource, function (evt) {
                        onfinished({ resource: resource });
                    }, this.jx);
                    loader.load();
                }
            }
        }, {
            key: "playSound",
            value: function playSound(_ref4) {
                var _this9 = this;

                var id = _ref4.id;
                var _ref4$zap = _ref4.zap;
                var zap = _ref4$zap === undefined ? false : _ref4$zap;
                var _ref4$onfinished = _ref4.onfinished;

                var _onfinished = _ref4$onfinished === undefined ? function (evt) {} : _ref4$onfinished;

                this.preloadSound({ id: id, onfinished: function onfinished(_ref5) {
                        var resource = _ref5.resource;

                        var player = _this9.jx.dj.createPlayer({ id: resource.id, streaming: true });
                        player.play({ id: resource.id, onfinished: _onfinished });
                        var endFunc = function endFunc(evt) {
                            player.cancel();
                            _this9.jx.unblockInteractivity();
                            _onfinished();
                        };
                        if (zap) {
                            _this9.jx.blockInteractivity(endFunc);
                        }
                    } });
            }
        }, {
            key: "playComment",
            value: function playComment(_ref6) {
                var _this10 = this;

                var id = _ref6.id;
                var _ref6$zap = _ref6.zap;
                var zap = _ref6$zap === undefined ? false : _ref6$zap;
                var _ref6$onfinished = _ref6.onfinished;
                var onfinished = _ref6$onfinished === undefined ? function (evt) {} : _ref6$onfinished;

                var endFunc = function endFunc(evt) {
                    _this10.jx.dj.voice.cancel();
                    if (zap) _this10.jx.unblockInteractivity();
                    onfinished();
                };
                this.jx.dj.voice.play({ id: id, onfinished: endFunc });
                if (zap) {
                    this.jx.blockInteractivity(endFunc);
                }
            }
        }, {
            key: "_logTimingHTML",
            value: function _logTimingHTML() {
                var result = "<br> >> TIMING LOG << <br>";
                var firstTime, lastTime;
                for (var i = 0; i < window.jxTiming.length; i++) {
                    for (var prop in window.jxTiming[i]) {
                        if (i == 0) {
                            firstTime = lastTime = window.jxTiming[i][prop];
                        }
                        result += "<br>" + prop + ": " + (window.jxTiming[i][prop] - firstTime) / 1000 + " (" + (window.jxTiming[i][prop] - lastTime) / 1000 + ")";
                        lastTime = window.jxTiming[i][prop];
                        break;
                    }
                }
                result += "<br> >>>>>>>><<<<<<<< <br>";
                console.log(result);
                return result;
            }
        }, {
            key: "_logTiming",
            value: function _logTiming() {
                var result = "\n >> TIMING LOG << \n";
                var firstTime, lastTime;
                for (var i = 0; i < window.jxTiming.length; i++) {
                    for (var prop in window.jxTiming[i]) {
                        if (i == 0) {
                            firstTime = lastTime = window.jxTiming[i][prop];
                        }
                        result += "\n" + prop + ": " + (window.jxTiming[i][prop] - firstTime) / 1000 + " (" + (window.jxTiming[i][prop] - lastTime) / 1000 + ")";
                        lastTime = window.jxTiming[i][prop];
                        break;
                    }
                }
                result += "\n >>>>>>>><<<<<<<< \n";
                console.log(result);
                return result;
            }
        }]);

        return GameModule;
    }(_Component3.default);

    exports.default = GameModule;
});
//# sourceMappingURL=GameModule.js.map