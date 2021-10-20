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
var ScreenFlashBase_1 = require("src/screens/ScreenFlashBase");
/**
 */
var Screen00 = /** @class */ (function (_super) {
    __extends(Screen00, _super);
    function Screen00(dataObject) {
        return _super.call(this, Object.assign({ screenName: "SCREEN_00" }, dataObject)) || this;
    }
    Screen00.prototype.init = function (callback) {
        _super.prototype.init.call(this, function () {
            callback();
        });
    };
    Screen00.prototype._initScreen = function () {
        _super.prototype._initScreen.call(this);
    };
    Screen00.prototype.show = function (callback, data) {
        var _this = this;
        _super.prototype.show.call(this, function () {
            callback({ target: _this });
        }, data);
    };
    Screen00.prototype.kill = function () {
        if (this._killed)
            return;
        _super.prototype.kill.call(this);
    };
    return Screen00;
}(ScreenFlashBase_1.default));
exports.default = Screen00;
//# sourceMappingURL=Screen00.js.map