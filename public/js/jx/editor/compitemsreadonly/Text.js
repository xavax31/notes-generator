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

    var textInput = "\n<div class=\"form-group row\">\n    <div class=\"row\">\n      <div class=\"col-xs-5\">\n          <div class=\"input-group\">\n              <span id=\"check\" class=\"input-group-addon\"><span class=\"fa fa-font\"></span></span>\n              <input type=\"text\" class=\"form-control\" id=\"textSound\" value=\"ID\" readonly=\"true\" >\n          </div>\n      </div>\n      <div class=\"col-xs-1\">\n           <button class=\"btn btn-default\" title=\"Informations\" id=\"info\"><span class=\"fa fa-info\"></span></button>\n      </div>\n   <div class=\"col-xs-6\">\n        <div class=\"well well-sm\" id=\"value\">$VALUE</div>\n   </div>\n   </div>\n      <div  id=\"informationsPanel\" class=\"row\"  style=\"display:none;\">\n          <div class=\"col-xs-12\" id=\"informationsText\">\n          <div class\"xinputtext\" id=\"description\" ></div>\n\n          </div>\n      </div>\n</div>\n";

    var Text = function (_VisualComponent) {
        _inherits(Text, _VisualComponent);

        function Text(dataObject) {
            _classCallCheck(this, Text);

            var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            _this.view = $(textInput);
            _this.view.prop('id', _this.data.id);

            _this.view.find("#description").html(_this.data.description || "");

            _this.editable = _this.jx.editor.getBoolDependsGroup(_this.data.editable, false);
            _this.view.find("#value").prop('readonly', !_this.editable);
            _this.view.find("#value").css("word-wrap", "normal");
            _this.view.find("#value").css("font-size", "12px");

            _this.view.find("#value").html(_this.data.value.replace(new RegExp("\n", "g"), "<br>") || "");
            _this.view[0].addEventListener("change", function (event) {
                _this.controller.onChangeData(event);
            });
            _this.view.html(_this.view[0].innerHTML.replace("ID", _this.data.id).replace("$description", _this.data.description || ""));
            _this.view.find("#info").click(function (event) {
                console.log("info", event.target, item[0].id);
                var panelInfo = _this.view.find("#informationsPanel");
                panelInfo.css("display", panelInfo.css("display") == "none" ? "inline" : "none");
            });
            return _this;
        }

        _createClass(Text, [{
            key: "showInfo",
            value: function showInfo() {
                this.view.find("#informationsPanel").css("display", "inline");
            }
        }, {
            key: "hideInfo",
            value: function hideInfo() {
                this.view.find("#informationsPanel").css("display", "none");
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (!value) {
                    this.view.find("#value").prop('readonly', !this.editable);
                } else {
                    this.view.find("#value").prop('readonly', true);
                }
            }
        }]);

        return Text;
    }(_VisualComponent3.default);

    exports.default = Text;
});
//# sourceMappingURL=Text.js.map