define(["exports", "jx/core/JXCore", "jx/polyfill.min"], function (exports, _JXCore) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXCore2 = _interopRequireDefault(_JXCore);

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

    var Launcher = function () {
        function Launcher(dataObject) {
            var _this = this;

            _classCallCheck(this, Launcher);

            window["jxTiming"].push({ launcher: Date.now() });

            console.log("\n\t\t     ___  __  _____ _   _  ____ ___ _   _ _____ \n\t\t    | \\ \\/ / | ____| \\ | |/ ___|_ _| \\ | | ____|\n\t\t _  | |\\  /  |  _| |  \\| | |  _ | ||  \\| |  _|  \n\t\t| |_| |/  \\  | |___| |\\  | |_| || || |\\  | |___ \n\t\t \\___//_/\\_\\ |_____|_| \\_|\\____|___|_| \\_|_____|\n\t\t                                                   1.0\t\t                                                  \n\t\t");
            this.dataObject = dataObject;
            var core = new _JXCore2.default({ debug: this.dataObject.debug });

            window["jx"] = core;
            if (this.dataObject.mode) {
                core.tools.mergeObjectIn(this.dataObject, this.dataObject.modes[this.dataObject.mode]);
            }
            var presetParams = this.dataObject;
            this.onInitialised = presetParams.onInitialised;
            presetParams.onInitialised = function (evt) {
                window["jxTiming"].push({ moduleInitialised: Date.now() });
                if (_this.onInitialised !== undefined) {
                    _this.onInitialised(evt);
                }
            };

            window.addEventListener("message", function (event) {
                return;
                if (event.data.type == "containerInfo") {} else if (event.data.type == "evtReady") {} else if (event.data.method == "requestAzoomeeVersion" && event.data.response) {
                    window["overrideJXConfig"].context = "azoomee";
                }
                if (_this.alreadyLaunch) return;
                _this.alreadyLaunch = true;
                _this._launchModule(presetParams);
            }, false);

            this._launchModule(presetParams);
        }

        _createClass(Launcher, [{
            key: "_launchModule",
            value: function _launchModule(presetParams) {
                var _this2 = this;

                var core = window["jx"];
                if (core.config.urlParams.rid != undefined) {
                    core.db.importClass(["jx/core/presets/Preview"], function (Preview) {
                        _this2.mainCtrl = new Preview(presetParams);
                        _this2.mainCtrl.initialise(presetParams.onInitialised);
                    });
                } else if (this.dataObject.preset != undefined) {
                    core.db.importClass(["jx/core/presets/" + this.dataObject.preset], function (Preset) {
                        _this2.mainCtrl = new Preset(presetParams);
                        _this2.mainCtrl.initialise(presetParams.onInitialised);
                    });
                } else if (this.dataObject.src != undefined) {
                    window["jxTiming"].push({ moduleLoad: Date.now() });
                    core.db.addResources({ id: "Module1", type: "class", src: this.dataObject.src });
                    core.db.load({ id: "Module1" }, function (evt) {
                        window["jxTiming"].push({ moduleLoaded: Date.now() });
                        var mainCtrlClass = core.db.findOne({ id: "Module1" }).data;

                        _this2.mainCtrl = new mainCtrlClass(presetParams);
                        window["jxTiming"].push({ moduleInstancied: Date.now() });
                        _this2.mainCtrl.initialise(presetParams.onInitialised);
                    });
                }
            }
        }]);

        return Launcher;
    }();

    exports.default = Launcher;
});
//# sourceMappingURL=Launcher.js.map