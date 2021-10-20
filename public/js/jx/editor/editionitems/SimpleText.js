define(["exports", "jx/core/comps/VisualComponent", "jx/editor/editionitems/Common"], function (exports, _VisualComponent2, _Common) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

    var _Common2 = _interopRequireDefault(_Common);

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

    var textInput = "\n<div class=\"form-group row\">\n\n   <div class=\"col-xs-12\">\n    <div id=\"id\"></div>\n        <textarea id=\"value\" type=\"textarea\" style=\"resize:vertical\"  spellcheck=\"true\"  rows=\"1\" class=\"form-control\">$VALUE</textarea>\n   </div>\n</div>\n";

    var SimpleText = function (_VisualComponent) {
        _inherits(SimpleText, _VisualComponent);

        function SimpleText(dataObject) {
            _classCallCheck(this, SimpleText);

            var _this = _possibleConstructorReturn(this, (SimpleText.__proto__ || Object.getPrototypeOf(SimpleText)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(textInput);
            item.prop('id', _this.data.id);
            item.find("#value").prop('readonly', _this.data.editable != undefined ? !_this.data.editable : false);
            item.find("#value").html(_this.data.value || "");
            item.find("#id").html("<b>" + _this.data.id + "</b>" || "");
            item[0].addEventListener("change", function (event) {
                _this.onchanged.dispatch(event);
            });

            item.data("controller", _this);
            _this.item = item;
            _this.view = _this.item;
            return _this;
        }

        _createClass(SimpleText, [{
            key: "value",
            get: function get() {
                return this.item.find("#value")[0].value;
            }
        }]);

        return SimpleText;
    }(_VisualComponent3.default);

    exports.default = SimpleText;
});
//# sourceMappingURL=SimpleText.js.map