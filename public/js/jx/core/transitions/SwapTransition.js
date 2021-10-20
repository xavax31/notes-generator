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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var SwapTransitionStyle = function SwapTransitionStyle(styleData) {
        _classCallCheck(this, SwapTransitionStyle);

        this.type = "SwapTransition", this.item1Style = {
            "typeTransition": "quadOut",
            "properties": {
                "scaleY": 0
            },
            "duration": 100
        };
        this.item2Style = {
            "typeTransition": "elasticOut",
            "properties": {
                "scaleY": 1
            },
            "duration": 500
        };
    };

    var SwapTransition = function (_VisualComponent) {
        _inherits(SwapTransition, _VisualComponent);

        function SwapTransition(dataObject) {
            _classCallCheck(this, SwapTransition);

            var _this = _possibleConstructorReturn(this, (SwapTransition.__proto__ || Object.getPrototypeOf(SwapTransition)).call(this, dataObject));

            _this.dataObject = _this.jx.tools.mergeObject(_this.dataObject, new SwapTransitionStyle());
            _this.tempData = {};
            _this.onFinished = new signals.Signal();
            _this.onItem1Changing = new signals.Signal();
            _this.onItem1Finished = new signals.Signal();
            _this.onItem2Changing = new signals.Signal();
            _this.item1Style = _this.dataObject.item1Style;
            _this.item2Style = _this.dataObject.item2Style;
            return _this;
        }

        _createClass(SwapTransition, [{
            key: "play",
            value: function play(_ref) {
                var _this2 = this;

                var referenceElement = _ref.referenceElement;
                var item1 = _ref.item1;
                var item2 = _ref.item2;

                item1.saveBounds();
                item2.saveBounds();
                this.tempData.item1 = item1;
                this.tempData.item2 = item2;
                this.tempData.referenceElement = referenceElement;
                this.running = true;
                createjs.Tween.get(item1.view, { override: true }).to(this.item1Style.properties, this.item1Style.duration, createjs.Ease[this.item1Style.typeTransition]).call(function (e) {
                    item1.visible = false;
                    item2.visible = true;

                    item2.view.scaleY = 0;
                    _this2.onItem1Finished.dispatch({ item1: item1, item2: item2, currentTarget: _this2 });
                    createjs.Tween.get(item2.view, { override: true }).to(_this2.item2Style.properties, _this2.item2Style.duration, createjs.Ease[_this2.item2Style.typeTransition]).call(function (e) {
                        _this2.finish();
                    }, undefined, _this2).addEventListener("change", function (e) {
                        item2.y = referenceElement.height - item2.height;
                        _this2.onItem2Changing.dispatch({ item1: item1, item2: item2, currentTarget: _this2 });
                    });
                }, undefined, this).addEventListener("change", function (e) {
                    item1.y = referenceElement.height - item1.height;
                    _this2.onItem1Changing.dispatch({ item1: item1, item2: item2, currentTarget: _this2 });
                });
            }
        }, {
            key: "stop",
            value: function stop() {
                if (!this.running) return;
                this.running = false;
                createjs.Tween.removeTweens(this.tempData.item1.view);
                createjs.Tween.removeTweens(this.tempData.item2.view);
            }
        }, {
            key: "finish",
            value: function finish() {
                console.log("finish");
                if (!this.running) return;
                this.running = false;
                createjs.Tween.removeTweens(this.tempData.item1.view);
                createjs.Tween.removeTweens(this.tempData.item2.view);

                this.onFinished.dispatch({ item1: this.tempData.item1, item2: this.tempData.item2, currentTarget: this });
            }
        }]);

        return SwapTransition;
    }(_VisualComponent3.default);

    exports.default = SwapTransition;
});
//# sourceMappingURL=SwapTransition.js.map