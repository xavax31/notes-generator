define(["exports", "jx/core/JXObject", "jx/editor/editionitems/Common"], function (exports, _JXObject2, _Common) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

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

    var textInput = "\n<div class=\"form-group row\">\n    <div class=\"row\">\n      <div class=\"col-xs-5\">\n          <div class=\"input-group\">\n              <span id=\"check\" class=\"input-group-addon\"><span class=\"fa fa-font\"></span></span>\n              <input type=\"text\" class=\"form-control\" id=\"textSound\" value=\"ID\" readonly=\"true\" >\n          </div>\n      </div>\n      <div class=\"col-xs-1\">\n           <button class=\"btn btn-default\" title=\"Informations\" id=\"info\"><span class=\"fa fa-info\"></span></button>\n      </div>\n   <div class=\"col-xs-6\">\n        <textarea id=\"value\" type=\"textarea\" style=\"resize:vertical\" spellcheck=\"true\"  rows=\"1\" class=\"form-control\">$VALUE</textarea>\n   </div>\n   </div>\n      <div  id=\"informationsPanel\" class=\"row\"  style=\"display:none;\">\n          <div class=\"col-xs-12\" id=\"informationsText\">\n          <div class\"xinputtext\" id=\"description\" ></div>\n\n          </div>\n      </div>\n</div>\n";

    var Text = function (_JXObject) {
        _inherits(Text, _JXObject);

        function Text(controller, params) {
            _classCallCheck(this, Text);

            var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

            _this.controller = controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(textInput);
            item.prop('id', params.id);

            item.find("#description").text(params.description || "");

            item.find("#value").prop('readonly', params.editable != undefined ? !params.editable : false);
            item.find("#value").html(params.value || "");
            item[0].addEventListener("change", function (event) {
                _this.controller.onChangeData(event);
            });
            item.html(item[0].innerHTML.replace("ID", params.id).replace("$description", params.description || ""));
            item.find("#info").click(function (event) {
                console.log("info", event.target, item[0].id);
                var panelInfo = item.find("#informationsPanel");
                panelInfo.css("display", panelInfo.css("display") == "none" ? "inline" : "none");
            });
            _this.item = item;
            return _this;
        }

        return Text;
    }(_JXObject3.default);

    exports.default = Text;
});
//# sourceMappingURL=Text.js.map