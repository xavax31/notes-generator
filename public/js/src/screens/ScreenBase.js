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
define(["require", "exports", "jx/core/comps/Component"], function (require, exports, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
    * **Events:**
    * - onfinished : fired when screen is completed.
     */
    var ScreenBase = /** @class */ (function (_super) {
        __extends(ScreenBase, _super);
        function ScreenBase(dataObject) {
            var _this = _super.call(this, Object.assign({
                stage: null,
                screenManager: null,
                screenName: null
            }, dataObject)) || this;
            /** @type {StageView} */
            _this.stage = _this.dataObject.stage || _this.jx.app.stage;
            /** @type {ScreenManager} */
            _this.screenManager = _this.dataObject.screenManager || _this.jx.app.screens;
            /** @type {String} */
            _this._screenName = _this.dataObject.screenName;
            _this.notInit = true;
            _this.addEventDispatcher("onfinished");
            if (_this.dataObject.onfinished)
                _this.onfinished.add(_this.dataObject.onfinished);
            _this._config = {};
            //-- get screen config in json
            var jsonConfig = _this.jx.db.getParameter(_this._screenName + ".Configuration");
            if (jsonConfig)
                Object.assign(_this._config, jsonConfig);
            _this._declareProperties();
            return _this;
        }
        ScreenBase.prototype._declareProperties = function () {
        };
        ScreenBase.prototype.kill = function () {
            if (this._killed)
                return;
            if (this.screen) {
                this.hide();
                this.screen = null;
            }
            ;
            this.onfinished.removeAll();
            this.stage = null;
            this.onfinished = null;
            this.screenManager = null;
            _super.prototype.kill.call(this);
        };
        /**
         * init (async) screen (clipcjs)
         * @param  {Function} callback
         */
        ScreenBase.prototype.init = function (callback) {
            var _this = this;
            this.comps.initChildren(function () {
                _this._initScreen();
                callback();
            });
        };
        /**
         * initScreen after this._lib (ClipCJS) is ready.
         */
        ScreenBase.prototype._initScreen = function () {
        };
        /**
         * show screen
         * @param  {Function} callback fired when screen is really displayed.
         * @param  {any}   data     data to transmit to screen
         */
        ScreenBase.prototype.show = function (callback, data) {
            callback({ target: this });
        };
        /**
         * hide screen
         */
        ScreenBase.prototype.hide = function () {
        };
        return ScreenBase;
    }(Component_1.default));
    exports.default = ScreenBase;
});
//# sourceMappingURL=ScreenBase.js.map