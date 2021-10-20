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

    var StartButton = function (_Component) {
        _inherits(StartButton, _Component);

        function StartButton(dataObject) {
            _classCallCheck(this, StartButton);

            return _possibleConstructorReturn(this, (StartButton.__proto__ || Object.getPrototypeOf(StartButton)).call(this, Object.assign({
                resourceID: "START_BUTTON",
                target: null,
                onstarted: function onstarted(evt) {}
            }, dataObject)));
        }

        _createClass(StartButton, [{
            key: "_create",
            value: function _create() {
                var _this2 = this;

                _get(StartButton.prototype.__proto__ || Object.getPrototypeOf(StartButton.prototype), "_create", this).call(this);
                this.target = this.dataObject.target;
                this.addEventDispatcher("onstarted");
                this.onstarted.addOnce(this.dataObject.onstarted);
                if (this.jx.config.system.needUserActionToWork) {
                    this.view = this.cc({ type: "Container", render: "DOM" });

                    var ipadStartButton = this.cc({ type: "Visual", render: "DOM", id: this.dataObject.resourceID, resourceID: this.dataObject.resourceID });
                    ipadStartButton.x = this.target.width / 2 - ipadStartButton.width / 2;
                    ipadStartButton.y = this.target.height / 2 - ipadStartButton.height / 2;
                    this.view.addChild(ipadStartButton);

                    this.view.onclick.addOnce(function (event) {
                        _this2.target.removeChild(_this2.view);
                        createjs.WebAudioPlugin.playEmptySound();
                        _this2.onstarted.dispatch();
                    });
                    this.target.addChild(this.view);
                } else {
                    this.onstarted.dispatch();
                }
            }
        }]);

        return StartButton;
    }(_Component3.default);

    exports.default = StartButton;
});
//# sourceMappingURL=StartButton.js.map