define(["exports", "jx/core/presets/StageGameModule", "src/screens/Screen00"], function (exports, _StageGameModule, _Screen) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _StageGameModule2 = _interopRequireDefault(_StageGameModule);

    var _Screen2 = _interopRequireDefault(_Screen);

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

    var MainCtrl = function (_ModuleType) {
        _inherits(MainCtrl, _ModuleType);

        function MainCtrl(dataObject) {
            _classCallCheck(this, MainCtrl);

            return _possibleConstructorReturn(this, (MainCtrl.__proto__ || Object.getPrototypeOf(MainCtrl)).call(this, Object.assign({
                stageWidth: 1280,
                ratio: 16 / 9,
                screen: "screen00",
                helper: false,
                blockMobileScroll: false,
                blockMobileContextualMenu: false,
                delayAfterClick: false,
                flashQuality: "good",
                commonFlaLib: false
            }, dataObject)));
        }

        _createClass(MainCtrl, [{
            key: "_onBeforeLoad",
            value: function _onBeforeLoad(callback) {
                callback();
            }
        }, {
            key: "init",
            value: function init(onInitialised) {
                var _this2 = this;

                this._configure(this.dataObject);
                this.ccid({ id: "screens", type: "ScreensManager", stage: this.stage, defaultTransition: "FadeBlackInOut" });
                this.screens.add({ id: "intro", type: "ScreenVideo", rid: "INTRO", bgMusicVolPC: 0, stage: this.stage,
                    onfinished: function onfinished(evt) {
                        _this2.jx.dj.music.play({ id: "MUSIC" });
                        _this2.screens.go("screen00");
                    }
                });
                this.screens.add({ id: "screen00", type: _Screen2.default, stage: this.stage,
                    onfinished: function onfinished(evt) {}
                });
                this.comps.initChildren(onInitialised);
            }
        }, {
            key: "start",
            value: function start() {
                this.screens.go(this.firstScreen);
            }
        }, {
            key: "_configure",
            value: function _configure(_ref) {
                var _ref$helper = _ref.helper;
                var helper = _ref$helper === undefined ? false : _ref$helper;
                var _ref$blockMobileScrol = _ref.blockMobileScroll;
                var blockMobileScroll = _ref$blockMobileScrol === undefined ? false : _ref$blockMobileScrol;
                var _ref$blockMobileConte = _ref.blockMobileContextualMenu;
                var blockMobileContextualMenu = _ref$blockMobileConte === undefined ? false : _ref$blockMobileConte;
                var _ref$delayAfterClick = _ref.delayAfterClick;
                var delayAfterClick = _ref$delayAfterClick === undefined ? false : _ref$delayAfterClick;
                var _ref$flashQuality = _ref.flashQuality;
                var flashQuality = _ref$flashQuality === undefined ? "good" : _ref$flashQuality;
                var _ref$commonFlaLib = _ref.commonFlaLib;
                var commonFlaLib = _ref$commonFlaLib === undefined ? false : _ref$commonFlaLib;
                var _ref$screen = _ref.screen;
                var screen = _ref$screen === undefined ? "intro" : _ref$screen;

                if (helper) this.jx.helper = this.cc({ type: Helper, stage: this.stage });
                if (blockMobileContextualMenu) $("body").css("-webkit-touch-callout", "none");
                if (blockMobileScroll) {
                    document.ontouchmove = function (e) {
                        e.preventDefault();
                    };
                }
                if (delayAfterClick) this.jx.config.app.lockDelayAfterClick = 250;
                this.jx.config.flashOptimizer.quality = flashQuality;
                this.stage.ratio = this.dataObject.ratio;
                if (commonFlaLib) this.commonLib = this.jx.db.findOne({ id: "COMMON_LIB.SCREEN" }).data;
                this._getFirstScreenAndPhase({ firstScreen: screen });
            }
        }, {
            key: "_getFirstScreenAndPhase",
            value: function _getFirstScreenAndPhase(_ref2) {
                var firstScreen = _ref2.firstScreen;

                var screenShortcut = (this.jx.config.urlParams.screen || firstScreen).split(".");
                this.firstScreen = screenShortcut[0];
                this.firstPhase = screenShortcut.length > 1 ? screenShortcut[1] : null;
            }
        }]);

        return MainCtrl;
    }(_StageGameModule2.default);

    exports.default = MainCtrl;
});
//# sourceMappingURL=index.js.map