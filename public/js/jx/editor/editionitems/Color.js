define(["exports", "jx/editor/editionitems/BasicItem"], function (exports, _BasicItem2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _BasicItem3 = _interopRequireDefault(_BasicItem2);

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

    var Color = function (_BasicItem) {
        _inherits(Color, _BasicItem);

        function Color(dataObject) {
            _classCallCheck(this, Color);

            var _this = _possibleConstructorReturn(this, (Color.__proto__ || Object.getPrototypeOf(Color)).call(this, Object.assign({
                icoTitle: "",
                icoSymbol: "gear",
                actions: [],
                informations: [],
                backgroundColor: "#EEEEEE"
            }, dataObject)));

            _this.content = $("<input  id=\"value\" class=\"form-control\" type=\"color\" name=\"favcolor\"  value=\"#000000\">");
            _this.view.find("#content").html(_this.content);
            _this.view.find("#value").prop('readonly', !_this.editable);
            _this.view.find("#value").prop('value', _this.data.value || "");
            _this.view.on("change", function (event) {
                if (_this.autoRefresh) _this._refreshData();
                _this.onchanged.dispatch({ target: _this });
            });
            return _this;
        }

        _createClass(Color, [{
            key: "_refreshData",
            value: function _refreshData() {
                this.data.value = this.value;
            }
        }, {
            key: "_refreshView",
            value: function _refreshView() {
                this.data.value = this.value;
            }
        }, {
            key: "value",
            get: function get() {
                return this.view.find("#value")[0].value;
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (!value) {
                    this.view.find("#value").prop('disabled', !this.editable);
                } else {
                    this.view.find("#value").prop('disabled', true);
                }
            }
        }]);

        return Color;
    }(_BasicItem3.default);

    exports.default = Color;
});
//# sourceMappingURL=Color.js.map