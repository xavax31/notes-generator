var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "jx/core/presets/StageGameModule", "screens/Screen00"], function (require, exports, StageGameModule_1, Screen00_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainCtrl = /** @class */ (function (_super) {
        __extends(MainCtrl, _super);
        function MainCtrl(dataObject) {
            return _super.call(this, Object.assign({
                stageWidth: 1280,
                ratio: 16 / 9,
                screen: "screen00",
                helper: false,
                blockMobileScroll: false,
                blockMobileContextualMenu: false,
                delayAfterClick: false,
                flashQuality: "good",
                commonFlaLib: false,
            }, dataObject)) || this;
        }
        MainCtrl.prototype._onBeforeLoad = function (callback) {
            callback();
        };
        /*******************************************************************************
         * INIT
         */
        MainCtrl.prototype.init = function (onInitialised) {
            var _this = this;
            this._configure(this.dataObject);
            this.ccid({
                id: "screens",
                type: "ScreensManager",
                stage: this.stage,
                defaultTransition: "FadeBlackInOut",
            });
            this.screens.add({
                id: "intro",
                type: "ScreenVideo",
                rid: "INTRO",
                bgMusicVolPC: 0,
                stage: this.stage,
                onfinished: function (evt) {
                    _this.jx.dj.music.play({ id: "MUSIC" });
                    _this.screens.go("screen00");
                },
            });
            this.screens.add({
                id: "screen00",
                type: Screen00_1.default,
                stage: this.stage,
                onfinished: function (evt) { },
            });
            this.comps.initChildren(onInitialised);
        };
        /*******************************************************************************
         * START
         */
        MainCtrl.prototype.start = function () {
            this.screens.go(this.firstScreen);
            // this.jx.dj.music.play({id:"MUSIC"});
        };
        MainCtrl.prototype._configure = function (_a) {
            var _b = _a.helper, helper = _b === void 0 ? false : _b, _c = _a.blockMobileScroll, blockMobileScroll = _c === void 0 ? false : _c, _d = _a.blockMobileContextualMenu, blockMobileContextualMenu = _d === void 0 ? false : _d, _e = _a.delayAfterClick, delayAfterClick = _e === void 0 ? false : _e, _f = _a.flashQuality, flashQuality = _f === void 0 ? "good" : _f, _g = _a.commonFlaLib, commonFlaLib = _g === void 0 ? false : _g, _h = _a.screen, screen = _h === void 0 ? "intro" : _h;
            if (helper)
                this.jx.helper = this.cc({ type: Helper, stage: this.stage });
            if (blockMobileContextualMenu)
                $("body").css("-webkit-touch-callout", "none");
            if (blockMobileScroll) {
                document.ontouchmove = function (e) {
                    e.preventDefault();
                };
            }
            if (delayAfterClick)
                this.jx.config.app.lockDelayAfterClick = 250;
            this.jx.config.flashOptimizer.quality = flashQuality;
            this.stage.ratio = this.dataObject.ratio;
            if (commonFlaLib)
                this.commonLib = this.jx.db.findOne({
                    id: "COMMON_LIB.SCREEN",
                }).data;
            this._getFirstScreenAndPhase({ firstScreen: screen });
        };
        /**
         * get the first screen and phase
         */
        MainCtrl.prototype._getFirstScreenAndPhase = function (_a) {
            var firstScreen = _a.firstScreen;
            var screenShortcut = (this.jx.config.urlParams.screen || firstScreen).split("."); // priority to screen passed as argument in url (&screen="screenID");
            this.firstScreen = screenShortcut[0];
            this.firstPhase = screenShortcut.length > 1 ? screenShortcut[1] : null;
        };
        return MainCtrl;
    }(StageGameModule_1.default));
    exports.default = MainCtrl;
});
//# sourceMappingURL=index.js.map