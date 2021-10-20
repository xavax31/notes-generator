define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var instance = null;
    var singletonEnforcer = function SingetonEnforcer() {
        _classCallCheck(this, SingetonEnforcer);
    };

    var BusyScreen = function () {
        function BusyScreen(_ref) {
            var jx = _ref.jx;

            _classCallCheck(this, BusyScreen);

            this.jx = jx;

            this.onclick = new signals.Signal();
            this._spinner = window["JXLoadAnim"];
            this._splashscreen = $("body").find('#splashscreen');
        }

        _createClass(BusyScreen, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                this._killed = true;
                this._spinner = window["JXLoadAnim"] = null;
                this.jx = null;
            }
        }, {
            key: "initialize",
            value: function initialize() {
                var opts = {
                    lines: 12,
                    length: 10,
                    width: 5,
                    radius: 10,
                    scale: 3,
                    corners: 2,
                    color: '#eee',
                    opacity: 0,
                    rotate: 0,
                    direction: 1,
                    speed: 1,
                    trail: 60,
                    fps: 20,
                    zIndex: 2e9,
                    className: 'spinner',
                    top: '50%',
                    left: '50%',
                    shadow: false,
                    hwaccel: false,
                    position: 'absolute' };
                var target = document.body;
                this._spinner = new Spinner(opts);
            }
        }, {
            key: "show",
            value: function show() {
                this._spinner.spin(document.body);
            }
        }, {
            key: "showSplashScreen",
            value: function showSplashScreen() {
                this._spinner.spin(document.body);
            }
        }, {
            key: "hideSpinner",
            value: function hideSpinner() {
                console.log("hidespinner", this._spinner === window["JXLoadAnim"]);
                this._spinner.stop();
            }
        }, {
            key: "showStartButton",
            value: function showStartButton(_ref2) {
                var _ref2$height = _ref2.height;
                var height = _ref2$height === undefined ? "80%" : _ref2$height;
                var onclick = _ref2.onclick;

                this._splashscreen.find('#startBTN').find('#image').css("height", height);
                this._splashscreen.find('#startBTN').css("display", "inline");
                this._splashscreen.find('#startBTN').css("cursor", "pointer");
                this._splashscreen.css("cursor", "pointer");
                this._splashscreen.mousedown(onclick);
            }
        }, {
            key: "hide",
            value: function hide() {
                this._spinner.stop();
                this._splashscreen.remove();
            }
        }], [{
            key: "getInstance",
            value: function getInstance() {
                if (!this[instance]) {
                    this[instance] = new BusyScreen(singletonEnforcer);
                }return this[instance];
            }
        }]);

        return BusyScreen;
    }();

    exports.default = BusyScreen;
});
//# sourceMappingURL=BusyScreen.js.map