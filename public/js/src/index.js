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
define(["require", "exports", "jx/core/presets/GameModule", "jx/comps/StageView", "screens/Screen00"], function (require, exports, GameModule_1, StageView_1, Screen00_1) {
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
            // this._configure(this.dataObject);
            // this.stage = this.cc({ type: "SimpleDOMView" });
            // this.stage.width = 300;
            // this.stage.view.addClass("main-dom-view");
            // var background = this.cc({
            // 	id: "BACKGROUND",
            // 	render: "DOM",
            // 	resourceID: "BACKGROUND",
            // });
            //this.stage.addChild(background);
            // this.menu = this.cc({ type: UserMenu, width: 500, height: 700 });
            // this.stage.addChild(this.menu);
            // this.hoursNum = this.cc({
            // 	type: "InputNumber",
            // 	render: "DOM",
            // 	y: 100,
            // 	description: "Nombre d'heures d'utilisation. (24h x 365 j = 8760)",
            // });
            // this.hoursNum.value = 9000;
            // this.hoursNum.onchange.add((evt) => {
            // 	this._formule();
            // });
            // this.stage.addChild(this.hoursNum);
            // this.hoursNum.width = 100;
            this.canvas1 = this.cc({
                type: StageView_1.default,
                width: 200,
                height: 100,
                ratio: 16 / 9,
                fixedStageScale: false,
            });
            this.ccid({
                id: "screens",
                type: "ScreensManager",
                stage: this.canvas1,
                defaultTransition: "FadeBlackInOut",
            });
            // this.screens.add({
            // 	id: "intro",
            // 	type: "ScreenVideo",
            // 	rid: "INTRO",
            // 	bgMusicVolPC: 0,
            // 	stage: this.stage,
            // 	onfinished: (evt) => {
            // 		this.jx.dj.music.play({ id: "MUSIC" });
            // 		this.screens.go("screen00");
            // 	},
            // });
            this.screens.add({
                id: "screen00",
                type: Screen00_1.default,
                stage: this.canvas1,
                onfinished: function (evt) { },
            });
            this.comps.initChildren(onInitialised);
        };
        /*******************************************************************************
         * START
         */
        MainCtrl.prototype.start = function () {
            this.canvas1.canvasHolder.addClass("partition");
            this.canvas1.canvasHolder.css({ position: "inherit" });
            this.screens.go("screen00");
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
            // this.stage.ratio = this.dataObject.ratio;
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
    }(GameModule_1.default));
    exports.default = MainCtrl;
});
//# sourceMappingURL=index.js.map