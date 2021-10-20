define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Screen Interface. MUST NOT be used by prog, it only describe the members that each screen Class must implement to work well with ScreenManager.
     */
    var IScreen = /** @class */ (function () {
        function IScreen(dataObject) {
            _this = _super.call(this, Object.assign({}, dataObject)) || this;
        }
        /**
         * Initialise the screen (automatically called by ScreenManager.go)
         * @param  {Function} callback
         */
        IScreen.prototype.init = function (callback) { };
        /**
         * Shows screen.
         * @param  {Function} callback
         * @param  {any}   data
         */
        IScreen.prototype.show = function (callback, data) { };
        /**
         * Hide screen.
         */
        IScreen.prototype.hide = function () { };
        /**
         * Kill screen.
         */
        IScreen.prototype.kill = function () {
            //... stuff here
            _super.prototype.kill.call(this); // call super at last.
        };
        return IScreen;
    }());
    exports.default = IScreen;
});
//# sourceMappingURL=IScreen.js.map