"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ScreenBase_1 = require("src/screens/ScreenBase");
/**
* **Events:**
* - onfinished : fired when screen is completed.
 */
var ScreenFlashBase = /** @class */ (function (_super) {
    __extends(ScreenFlashBase, _super);
    function ScreenFlashBase(dataObject) {
        var _this = _super.call(this, Object.assign({
            stage: null,
            screenManager: null,
            screenName: null
        }, dataObject)) || this;
        _this._config.rid = _this._screenName + ".FLASHSCREEN.CONFIG";
        return _this;
    }
    ScreenFlashBase.prototype.kill = function () {
        if (this._killed)
            return;
        if (this.screen) {
            this.hide();
            this.screen = null;
        }
        this._lib = null;
        window[this._screenName] = null;
        window[this._screenName + "_images"] = null;
        _super.prototype.kill.call(this);
    };
    /**
     * init (async) screen (clipcjs)
     * @param  {Function} callback
     */
    ScreenFlashBase.prototype.init = function (callback) {
        var _this = this;
        this.jx.db.load({ id: this._screenName + ".FLASHSCREEN.SCREEN" }, function () {
            _this._lib = _this.cc({ rid: _this._config.rid, stage: _this.stage, exclude: [],
                toFreeze: [], visible: false });
            _super.prototype.init.call(_this, callback);
        });
    };
    /**
     * initScreen after this._lib (ClipCJS) is ready.
     */
    ScreenFlashBase.prototype._initScreen = function () {
        this.ccid({ id: "screen", type: "Clip", view: this._lib.getMC("SCREEN") });
    };
    /**
     * show screen
     * @param  {Function} callback fired when screen is really displayed.
     * @param  {any}   data     data to transmit to screen
     */
    ScreenFlashBase.prototype.show = function (callback, data) {
        var _this = this;
        _super.prototype.show.call(this, function () {
            _this.stage.addChild(_this._lib);
            _this._lib.visible = true;
            _this._lib.unfreeze();
            callback({ target: _this });
        });
    };
    /**
     * hide screen
     */
    ScreenFlashBase.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this._lib.visible = false;
        this._lib.freeze();
        this.stage.removeChild(this._lib);
    };
    return ScreenFlashBase;
}(ScreenBase_1.default));
exports.default = ScreenFlashBase;
//# sourceMappingURL=ScreenFlashBase.js.map