define(["exports", "jx/core/comps/VisualComponent"], function (exports, _VisualComponent2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

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

    var defaultValues = {
        render: null,
        quality: 1,
        x: 0,
        y: 0,
        width: undefined,
        height: undefined,
        ratioWidth: undefined,
        ratioHeight: undefined,
        alpha: 1,
        anchor: null,
        anchorX: 0,
        anchorY: 0,
        enabled: true,
        visible: true,
        rotation: 0
    };

    var Animation = function (_VisualComponent) {
        _inherits(Animation, _VisualComponent);

        function Animation(dataObject) {
            _classCallCheck(this, Animation);

            var _this = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this, Object.assign({
                framerate: 24
            }, dataObject)));

            _this.implements("Animation");

            _this.onplaying = new signals.Signal();
            _this.onfinished = new signals.Signal();
            return _this;
        }

        _createClass(Animation, [{
            key: "_firstInit",
            value: function _firstInit() {
                _get(Animation.prototype.__proto__ || Object.getPrototypeOf(Animation.prototype), "_firstInit", this).call(this);
            }
        }, {
            key: "play",
            value: function play(playParams) {
                this.view.play(playParams);
            }
        }, {
            key: "stop",
            value: function stop() {
                this.view.stop();
            }
        }, {
            key: "cancel",
            value: function cancel() {
                this.view.cancel();
            }
        }, {
            key: "goto",
            value: function goto(gotoParams) {
                this.view.goto(gotoParams);
            }
        }, {
            key: "duration",
            get: function get() {
                return this.view.duration;
            }
        }, {
            key: "currentTime",
            get: function get() {
                return this.view.currentTime;
            },
            set: function set(value) {
                this.view.currentTime = value;
            }
        }, {
            key: "framerate",
            get: function get() {
                return this.view.frameRate;
            },
            set: function set(value) {
                this.view.frameRate = value;
            }
        }]);

        return Animation;
    }(_VisualComponent3.default);

    exports.default = Animation;
});
//# sourceMappingURL=Animation.js.map