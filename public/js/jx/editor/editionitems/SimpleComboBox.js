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

    var _template = "\n    <div class='form-group text-center'>\n        <div id=\"title\"></div>\n        <select class=\"form-control input-sm\" id=\"selector\">\n    </div>\n";

    var SimpleComboBox = function (_VisualComponent) {
        _inherits(SimpleComboBox, _VisualComponent);

        function SimpleComboBox(dataObject) {
            _classCallCheck(this, SimpleComboBox);

            var _this = _possibleConstructorReturn(this, (SimpleComboBox.__proto__ || Object.getPrototypeOf(SimpleComboBox)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            var item = $(_template);
            item.prop("id", _this.data.id);
            item.find("#title").html(_this.data.title || "");
            var options = typeof _this.data.options == "string" ? _this.jx.editor.getOptionsList(_this.data.options) : _this.data.options;
            var value = _this.data.value == undefined || _this.data.value == "" ? options[0] : _this.data.value;
            for (var i = 0; i < options.length; i++) {
                var opt = options[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                $(el).attr("selected", opt == value);
                item.find("#selector").append(el);
            }
            _this.onChanged = new signals.Signal();
            item.find("#selector").on("change", function (event) {
                _this.onChanged.dispatch({ target: _this });
            });
            if (_this.data.onChanged) {
                _this.onChanged.add(_this.data.onChanged);
            }
            ;
            item.data("controller", _this);
            _this.item = item;
            _this.view = _this.item;
            return _this;
        }

        _createClass(SimpleComboBox, [{
            key: "value",
            get: function get() {
                return this.view.find("#selector")[0].value;
            },
            set: function set(val) {
                this.view.find("#selector")[0].value = val;
            }
        }, {
            key: "visible",
            set: function set(val) {
                this.view.css("display", val ? "inline" : "none");
            }
        }]);

        return SimpleComboBox;
    }(_VisualComponent3.default);

    exports.default = SimpleComboBox;
});
//# sourceMappingURL=SimpleComboBox.js.map