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

    var ScreensManager = function (_Component) {
        _inherits(ScreensManager, _Component);

        function ScreensManager(dataObject) {
            _classCallCheck(this, ScreensManager);

            return _possibleConstructorReturn(this, (ScreensManager.__proto__ || Object.getPrototypeOf(ScreensManager)).call(this, Object.assign({
                defaultTransition: "none",
                forceFirstVideoAutoPlay: false
            }, dataObject)));
        }

        _createClass(ScreensManager, [{
            key: "_create",
            value: function _create() {
                _get(ScreensManager.prototype.__proto__ || Object.getPrototypeOf(ScreensManager.prototype), "_create", this).call(this);
                this._history = new History();
                this.stage = this.dataObject.stage;
                this.transitions = {
                    FadeBlackInOut: {
                        fadeValue: 400,
                        color: "#000000",
                        alpha: 1
                    },
                    none: {
                        fadeValue: 1000,
                        color: "#000000",
                        alpha: 0
                    }
                };
                this.defaultTransition = this.dataObject.defaultTransition;
                this.forceFirstVideoAutoPlay = this.dataObject.forceFirstVideoAutoPlay;
                this.screens = {};
                this.currentScreen = null;

                this.transitionScreen = this.cc({ type: "Container", render: "DOM" });
                this.transitionScreen.visible = false;
                this.stage.addChild(this.transitionScreen);
                this.transitionScreen.view.prop("id", "transitionscreen");
                this.transitionScreen.view.css("width", this.stage.width + 1);
                this.transitionScreen.view.css("height", this.stage.height + 1);
                this.transitionScreen.view.css("background-color", this.defaultTransition.color);
                this.transitionScreen.view.css("z-index", "300");
                this.transitionScreen.alpha = this.defaultTransition.alpha;
            }
        }, {
            key: "add",
            value: function add(screen) {
                screen = screen.isJXComponent ? screen : this.cc(screen);
                this.screens[screen.id] = screen;
            }
        }, {
            key: "give",
            value: function give(screenID) {
                return this.screens[screenID];
            }
        }, {
            key: "killScreen",
            value: function killScreen(screenID) {
                if (this.screens[screenID]) {
                    if (this.currentScreen === this.screens[screenID]) {
                        this.screens[screenID]._screenMarkedToDestroy = true;
                    }
                    ;
                }
            }
        }, {
            key: "_killScreen",
            value: function _killScreen(screenID) {
                this.screens[screenID].kill();
                delete this.screens[screenID];
            }
        }, {
            key: "prepare",
            value: function prepare() {
                for (var _len = arguments.length, idScreens = Array(_len), _key = 0; _key < _len; _key++) {
                    idScreens[_key] = arguments[_key];
                }

                var item;
                var itemsToInit = [];
                for (var i = 0; i < arguments.length; i++) {
                    item = this.screens[arguments[i]];
                    if (!item.ready && item.initialise) {
                        itemsToInit.push(item);
                    }
                    ;
                }
                ;
                var itemsInitialising = itemsToInit.slice();
                var oninit = function oninit(evt) {
                    itemsInitialising.splice(itemsInitialising.indexOf(evt.target), 1);
                };
                if (itemsToInit.length == 0) {
                    return;
                }
                for (var i = 0; i < itemsToInit.length; i++) {
                    itemsToInit[i].initialise(oninit);
                }
            }
        }, {
            key: "go",
            value: function go(screenID) {
                var _this2 = this;

                var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                var _ref$fx = _ref.fx;
                var fx = _ref$fx === undefined ? null : _ref$fx;
                var _ref$data = _ref.data;
                var data = _ref$data === undefined ? {} : _ref$data;

                console.log("GO");
                this.transitionScreen.alpha = 0.0;
                this.transitionScreen.visible = true;
                this.transitionScreen.view.css("z-index", 300);
                this.stage.update();
                if (screenID.search(/^\$/) != -1) {
                    var command = screenID.replace("$", "");
                    switch (command) {
                        case "previous":
                            screenID = this._history.previous();
                            break;
                        case "next":
                            screenID = this._history.next();
                            break;
                    }
                    if (screenID == null) {
                        console.warn("No more screens for requested location in history");
                        return;
                    }
                    ;
                }
                var newScreen = this.screens[screenID];
                var fade = fx != null ? fx : this._defaultTransition.fadeValue;
                if (!newScreen.ready) {
                    this.jx.loadingScreen.show();
                    this.jx.wait(0, function (evt) {
                        console.log("initialise screen", newScreen);
                        newScreen.initialise(function (evt) {
                            _this2.jx.loadingScreen.hide();
                            _this2.go(screenID, { fx: fx, data: data });
                        });
                    });
                    return;
                }
                ;
                if (newScreen.playIntroFirst) {
                    newScreen.playIntroScreen(data);
                    return;
                }
                this._history.add(screenID);
                var startbtnInfos = {
                    show: this.jx.config.app.startButton,
                    heightPercent: this.jx.config.app.startButtonHeightPercent + "%"
                };
                if (this._history.length === 1) {
                    if (startbtnInfos.show == "no") {
                        data.autoplay = true;
                    } else if (startbtnInfos.show == "yes") {
                        data.autoplay = false;
                    } else {
                        data.autoplay = this.forceFirstVideoAutoPlay || !this.jx.config.system.video.needUserActionToWork;
                    }
                }
                if (fade === 0) {
                    this.jx.loadingScreen.show();
                    this.transitionScreen.view.css("z-index", 300);
                    newScreen.show(function (evt) {
                        _this2.jx.loadingScreen.hide();
                        if (newScreen.showScreen) newScreen.showScreen();
                        if (_this2.currentScreen) {
                            if (_this2.currentScreen._screenMarkedToDestroy) {
                                _this2._killScreen(_this2.currentScreen.id);
                            } else {
                                _this2.currentScreen.hide();
                            }
                        }
                        ;
                        _this2.currentScreen = newScreen;
                        _this2.transitionScreen.visible = false;
                        if (newScreen.startScreen) newScreen.startScreen();
                    }, data);
                } else {
                    if (newScreen.needUserClickToStart && this.jx.config.system.video.needUserActionToWork) {
                        console.log("scm newScreen.needUserClickToStart && this.jx.config.system.video.needUserActionToWork", newScreen.needUserClickToStart && this.jx.config.system.video.needUserActionToWork);

                        this.transitionScreen.view.css("z-index", 300);
                        this.transitionScreen.view.fadeTo(fade, this.defaultTransition.alpha, function (evt) {});
                        console.log("SHOW SCREEN");
                        newScreen.show(function (evt) {
                            _this2.jx.loadingScreen.hide();
                            if (newScreen.showScreen) newScreen.showScreen();
                            if (_this2.currentScreen && _this2.currentScreen !== newScreen) {
                                if (_this2.currentScreen._screenMarkedToDestroy) {
                                    _this2._killScreen(_this2.currentScreen.id);
                                } else {
                                    _this2.currentScreen.hide();
                                }
                            }
                            ;
                            _this2.currentScreen = newScreen;

                            _this2.transitionScreen.view.fadeTo(fade, 0, function (evt) {
                                _this2.transitionScreen.visible = false;
                                if (newScreen.startScreen) newScreen.startScreen();
                            });
                        }, data);
                    } else {
                        this.transitionScreen.view.css("z-index", 300);
                        this.transitionScreen.view.fadeTo(fade, this.defaultTransition.alpha, function (evt) {
                            newScreen.show(function (evt) {
                                if (newScreen.showScreen) newScreen.showScreen();
                                if (_this2.currentScreen && _this2.currentScreen !== newScreen) {
                                    if (_this2.currentScreen._screenMarkedToDestroy) {
                                        _this2._killScreen(_this2.currentScreen.id);
                                    } else {
                                        _this2.currentScreen.hide();
                                    }
                                }
                                ;

                                _this2.currentScreen = newScreen;
                                _this2.transitionScreen.view.fadeTo(fade, 0, function (evt) {
                                    _this2.transitionScreen.visible = false;
                                    if (newScreen.startScreen) newScreen.startScreen();
                                });
                            }, data);
                        });
                    }
                }
            }
        }, {
            key: "hideScreens",
            value: function hideScreens() {
                for (var prop in this.screens) {
                    this.screens[prop].hide();
                }
            }
        }, {
            key: "reset",
            value: function reset() {
                for (var _len2 = arguments.length, screenID = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    screenID[_key2] = arguments[_key2];
                }

                if (screenID.length == 0) {
                    for (var prop in this.screens) {
                        this.screens[prop].reset();
                    }
                } else {
                    for (var i = 0; i < screenID.length; i++) {
                        screenID[i].reset();
                    }
                }
            }
        }, {
            key: "defaultTransition",
            set: function set(value) {
                this._defaultTransition = this.transitions[value];
            },
            get: function get() {
                return this._defaultTransition;
            }
        }]);

        return ScreensManager;
    }(_Component3.default);

    exports.default = ScreensManager;

    var History = function () {
        function History() {
            _classCallCheck(this, History);

            this._locator = -1;
            this._log = [];
        }

        _createClass(History, [{
            key: "add",
            value: function add(screenID) {
                this._log.push(screenID);
                this._locator++;
            }
        }, {
            key: "previous",
            value: function previous() {
                if (this._locator <= 0) {
                    return null;
                }
                ;
                this._locator--;
                return this._log[this._locator];
            }
        }, {
            key: "next",
            value: function next() {
                if (this._locator > this._log.length - 1) {
                    return null;
                }
                ;
                this._locator++;
                return this._log[this._locator];
            }
        }, {
            key: "length",
            get: function get() {
                return this._log.length;
            }
        }]);

        return History;
    }();
});
//# sourceMappingURL=ScreensManager.js.map