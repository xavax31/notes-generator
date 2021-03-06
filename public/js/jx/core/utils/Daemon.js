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

    var Daemon = function (_Component) {
        _inherits(Daemon, _Component);

        function Daemon(dataObject) {
            _classCallCheck(this, Daemon);

            return _possibleConstructorReturn(this, (Daemon.__proto__ || Object.getPrototypeOf(Daemon)).call(this, Object.assign({
                interval: 30000,
                autoStart: false,
                func: function func(evt) {}
            }, dataObject)));
        }

        _createClass(Daemon, [{
            key: "_create",
            value: function _create() {
                _get(Daemon.prototype.__proto__ || Object.getPrototypeOf(Daemon.prototype), "_create", this).call(this);
                this.intID = null;
                this._ready = true;
            }
        }, {
            key: "start",
            value: function start() {
                this.stop();
                this.intID = setInterval(this.dataObject.func, this.dataObject.interval);
                this.dataObject.func({ target: this });
            }
        }, {
            key: "stop",
            value: function stop() {
                if (this.intID) {
                    clearInterval(this.intID);
                    this.intID = null;
                }
            }
        }]);

        return Daemon;
    }(_Component3.default);

    exports.default = Daemon;
});
//# sourceMappingURL=Daemon.js.map