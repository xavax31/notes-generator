define(["exports", "src/screens/ScreenBase"], function (exports, _ScreenBase2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ScreenBase3 = _interopRequireDefault(_ScreenBase2);

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var ScreenFlashBase = function (_ScreenBase) {
        _inherits(ScreenFlashBase, _ScreenBase);

        function ScreenFlashBase(dataObject) {
            _classCallCheck(this, ScreenFlashBase);

            var _this = _possibleConstructorReturn(this, (ScreenFlashBase.__proto__ || Object.getPrototypeOf(ScreenFlashBase)).call(this, Object.assign({
                stage: null,
                screenManager: null,
                screenName: null
            }, dataObject)));

            _this._config.rid = _this._screenName + ".FLASHSCREEN.CONFIG";
            return _this;
        }

        _createClass(ScreenFlashBase, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                if (this.screen) {
                    this.hide();
                    this.screen = null;
                }
                this._lib = null;
                window[this._screenName] = null;
                window[this._screenName + "_images"] = null;
                _get(ScreenFlashBase.prototype.__proto__ || Object.getPrototypeOf(ScreenFlashBase.prototype), "kill", this).call(this);
            }
        }, {
            key: "init",
            value: function init(callback) {
                var _this2 = this;

                this.jx.db.load({ id: this._screenName + ".FLASHSCREEN.SCREEN" }, function () {
                    _this2._lib = _this2.cc({ rid: _this2._config.rid, stage: _this2.stage, exclude: [],
                        toFreeze: [], visible: false });
                    _get(ScreenFlashBase.prototype.__proto__ || Object.getPrototypeOf(ScreenFlashBase.prototype), "init", _this2).call(_this2, callback);
                });
            }
        }, {
            key: "_initScreen",
            value: function _initScreen() {
                this.ccid({ id: "screen", type: "Clip", view: this._lib.getMC("SCREEN") });
            }
        }, {
            key: "show",
            value: function show(callback, data) {
                var _this3 = this;

                _get(ScreenFlashBase.prototype.__proto__ || Object.getPrototypeOf(ScreenFlashBase.prototype), "show", this).call(this, function () {
                    _this3.stage.addChild(_this3._lib);
                    _this3._lib.visible = true;
                    _this3._lib.unfreeze();
                    callback({ target: _this3 });
                });
            }
        }, {
            key: "hide",
            value: function hide() {
                _get(ScreenFlashBase.prototype.__proto__ || Object.getPrototypeOf(ScreenFlashBase.prototype), "hide", this).call(this);
                this._lib.visible = false;
                this._lib.freeze();
                this.stage.removeChild(this._lib);
            }
        }]);

        return ScreenFlashBase;
    }(_ScreenBase3.default);

    exports.default = ScreenFlashBase;
});
//# sourceMappingURL=ScreenFlashBase.js.map