define(["exports", "jx/comps/visualcomponent/VisualComponentDOM"], function (exports, _VisualComponentDOM2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponentDOM3 = _interopRequireDefault(_VisualComponentDOM2);

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

    var NumberItemDOM = function (_VisualComponentDOM) {
        _inherits(NumberItemDOM, _VisualComponentDOM);

        function NumberItemDOM(dataObject) {
            _classCallCheck(this, NumberItemDOM);

            var _this = _possibleConstructorReturn(this, (NumberItemDOM.__proto__ || Object.getPrototypeOf(NumberItemDOM)).call(this, Object.assign({ id: "", min: 0, max: null, step: null }, dataObject)));

            _this.onchange = new signals.Signal();
            _this.onchanged = new signals.Signal();
            _this._createView();
            _this._firstInit();
            return _this;
        }

        _createClass(NumberItemDOM, [{
            key: "_createView",
            value: function _createView() {
                this.view = $('<input type="number" id=""/>');
                this.view.prop("id", this.dataObject.id);
                if (this.dataObject.min) this.view.prop("min", this.dataObject.min);
                if (this.dataObject.max) this.view.prop("max", this.dataObject.max);
                if (this.dataObject.step) this.view.prop("step", this.dataObject.step);

                $(this.view).css("position", "absolute");
                $(this.view).css("left", this.dataObject.x + "px");
                $(this.view).css("top", this.dataObject.y + "px");
                this._enabled = this.dataObject.enabled;
                if (this.dataObject.width) {
                    $(this.view).css("width", this.dataObject.width + "px");
                }
                if (this.dataObject.height) {
                    $(this.view).css("height", this.dataObject.width + "px");
                }
                $(this.view).on("input", $.proxy(this._change, this));
                $(this.view).on("change", $.proxy(this._changed, this));
                $(this.view).on("click", $.proxy(this._clicked, this));
                $(this.view).on("mousedown", $.proxy(this._mousedown, this));
                $(this.view).on("mouseup", $.proxy(this._mouseup, this));
                $(this.view).on("mouseenter", $.proxy(this._rollover, this));
                $(this.view).on("mouseout", $.proxy(this._rollout, this));
                $(this.view).on("mousemove", $.proxy(this._mousemove, this));
            }
        }, {
            key: "_change",
            value: function _change() {
                if (this.enabled) {
                    this.onchange.dispatch({ target: this });
                }
            }
        }, {
            key: "_changed",
            value: function _changed() {
                if (this.enabled) {
                    this.onchanged.dispatch({ target: this });
                }
            }
        }, {
            key: "value",
            set: function set(itemValue) {
                this.view.prop('value', itemValue);
            },
            get: function get() {
                return this.view.prop('value');
            }
        }]);

        return NumberItemDOM;
    }(_VisualComponentDOM3.default);

    exports.default = NumberItemDOM;
});
//# sourceMappingURL=NumberItemDOM.js.map