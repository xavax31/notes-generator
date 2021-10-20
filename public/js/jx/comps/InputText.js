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

    var textInput = "\n<div class=\"form-group row\">\n   <div class=\"col-xs-6\">\n        <textarea id=\"value\" type=\"textarea\" style=\"resize:vertical\" spellcheck=\"true\"  rows=\"1\" class=\"form-control\">$VALUE</textarea>\n   </div>\n   <div class=\"col-xs-6\" id=\"description\">\n   </div>\n </div>\n";

    var InputText = function (_VisualComponentDOM) {
        _inherits(InputText, _VisualComponentDOM);

        function InputText(dataObject) {
            _classCallCheck(this, InputText);

            return _possibleConstructorReturn(this, (InputText.__proto__ || Object.getPrototypeOf(InputText)).call(this, dataObject));
        }

        _createClass(InputText, [{
            key: "_create",
            value: function _create() {
                _get(InputText.prototype.__proto__ || Object.getPrototypeOf(InputText.prototype), "_create", this).call(this);
                this.addEventDispatcher("onchange");
                this.view = $(textInput);
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                var _this2 = this;

                _get(InputText.prototype.__proto__ || Object.getPrototypeOf(InputText.prototype), "_initSync", this).call(this);
                this.view.find("#value").prop('readonly', this.view.editable != undefined ? !this.view.editable : false);
                this.view.find("#description").html(this.dataObject.description || "");
                this.view.find("#value").html(this.view.value || "");
                this.view.on("change", function (event) {
                    _this2.text = _this2.text;
                    _this2.onchange.dispatch({ target: _this2 });
                });
            }
        }, {
            key: "text",
            set: function set(value) {
                this.view.find("#value").html(value);
            },
            get: function get() {
                return this.view.find("#value")[0].value;
            }
        }]);

        return InputText;
    }(_VisualComponentDOM3.default);

    exports.default = InputText;
});
//# sourceMappingURL=InputText.js.map