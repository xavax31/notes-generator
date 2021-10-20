define(["exports", "jx/core/DBManager", "jx/core/Factory", "jx/core/Config", "jx/core/utils/Tools", "jx/core/Debugger"], function (exports, _DBManager, _Factory, _Config, _Tools, _Debugger) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _DBManager2 = _interopRequireDefault(_DBManager);

    var _Factory2 = _interopRequireDefault(_Factory);

    var _Config2 = _interopRequireDefault(_Config);

    var _Tools2 = _interopRequireDefault(_Tools);

    var _Debugger2 = _interopRequireDefault(_Debugger);

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

    var version = "0.2.0";

    var JXCore = function () {
        function JXCore(_ref) {
            var _this = this;

            var _ref$debug = _ref.debug;
            var debug = _ref$debug === undefined ? false : _ref$debug;

            _classCallCheck(this, JXCore);

            window["jx"] = this;
            if (debug) {
                window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
                    if (errorMsg.search("afdp") == -1) {
                        alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' + errorObj);
                    }
                    ;
                };
            }
            ;
            this.comp = {};

            this.tools = new _Tools2.default();

            if (!(Object.assign instanceof Function)) {
                Object.assign = this.tools.mergeObject;
            }

            if (!Object.is) {
                Object.is = function (v1, v2) {
                    if (v1 === v2) {
                        return v1 !== 0 || 1 / v1 === 1 / v2;
                    } else {
                        return v1 !== v1 && v2 !== v2;
                    }
                };
            }
            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

            this.config = new _Config2.default(this);

            this.db = new _DBManager2.default(this);

            this.factory = new _Factory2.default(this);

            this.debug = new _Debugger2.default(this, debug);

            this.cc = function (p) {
                return _this.factory.createComp(p);
            };
            this.log = console.log.bind(console);
        }

        _createClass(JXCore, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                this._killed = true;
                try {
                    this.db.kill();
                    this.db = null;
                    this.config.kill();
                    this.config = null;
                    this.factory.kill();
                    this.factory = null;
                    this.debug.kill();
                    this.debug = null;
                    this.comp = null;
                    this.ticker = null;
                    this.memo = null;
                    this.layout = null;
                    this.fx = null;
                    this.log = null;
                    this.global = null;
                    this.tools = null;
                    this.cc = null;
                    this.log = null;
                    this._lastJX = null;
                    window["jx"] = null;
                    window["jxCore"] = null;
                    requirejs.undef("jx/core/DBManager");
                } catch (err) {
                    console.warn("errors while killing application", err);
                }
            }
        }, {
            key: "_initialise",
            value: function _initialise() {
                this.loadingScreen = new (this.db.findOne({ "id": "BusyScreen" }).data)({ jx: this });

                this.memo = new (this.db.findOne({ "id": "MemoManager" }).data)({ jx: this });

                this.layout = new (this.db.findOne({ "id": "Layout" }).data)({ jx: this });

                this.fx = new (this.db.findOne({ "id": "FXManager" }).data)({ jx: this });

                this.dj = new (this.db.findOne({ "id": "SoundManager" }).data)({ jx: this });
            }
        }, {
            key: "extendsFrom",
            value: function extendsFrom(classID) {
                console.log("extendsFrom", this._lastJX);
                if (this._lastJX) {
                    return this._lastJX.db.findOne({ id: classID + this._lastRender }).data;
                }
                return null;
            }
        }, {
            key: "toString",
            value: function toString() {
                return "JXCore v" + version;
            }
        }, {
            key: "version",
            get: function get() {
                return version;
            }
        }]);

        return JXCore;
    }();

    exports.default = JXCore;
});
//# sourceMappingURL=JXCore.js.map