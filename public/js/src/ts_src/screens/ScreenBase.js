define(["exports", "jx/core/comps/Component"], function (exports, _Component2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

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

    var ScreenBase = function (_Component) {
        _inherits(ScreenBase, _Component);

        function ScreenBase(dataObject) {
            _classCallCheck(this, ScreenBase);

            var _this = _possibleConstructorReturn(this, (ScreenBase.__proto__ || Object.getPrototypeOf(ScreenBase)).call(this, Object.assign({
                stage: null,
                screenManager: null,
                screenName: null
            }, dataObject)));

            _this.stage = _this.dataObject.stage || _this.jx.app.stage;

            _this.screenManager = _this.dataObject.screenManager || _this.jx.app.screens;

            _this._screenName = _this.dataObject.screenName;
            _this.notInit = true;
            _this.addEventDispatcher("onfinished");
            if (_this.dataObject.onfinished) _this.onfinished.add(_this.dataObject.onfinished);
            _this._config = {};

            var jsonConfig = _this.jx.db.getParameter(_this._screenName + ".Configuration");
            if (jsonConfig) Object.assign(_this._config, jsonConfig);
            _this._declareProperties();
            return _this;
        }

        _createClass(ScreenBase, [{
            key: "_declareProperties",
            value: function _declareProperties() {}
        }, {
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                if (this.screen) {
                    this.hide();
                    this.screen = null;
                }
                ;
                this.onfinished.removeAll();
                this.stage = null;
                this.onfinished = null;
                this.screenManager = null;
                _get(ScreenBase.prototype.__proto__ || Object.getPrototypeOf(ScreenBase.prototype), "kill", this).call(this);
            }
        }, {
            key: "init",
            value: function init(callback) {
                var _this2 = this;

                this.comps.initChildren(function () {
                    _this2._initScreen();
                    callback();
                });
            }
        }, {
            key: "_initScreen",
            value: function _initScreen() {}
        }, {
            key: "show",
            value: function show(callback, data) {
                callback({ target: this });
            }
        }, {
            key: "hide",
            value: function hide() {}
        }]);

        return ScreenBase;
    }(_Component3.default);

    exports.default = ScreenBase;
});
//# sourceMappingURL=ScreenBase.js.map