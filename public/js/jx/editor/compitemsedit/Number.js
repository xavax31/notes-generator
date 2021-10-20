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

    var textInput = "\n<div class=\"form-group row\">\n    <div class=\"row\">\n      <div class=\"col-xs-5\">\n          <div class=\"input-group\">\n              <span id=\"check\" class=\"input-group-addon\"><span class=\"fa fa-cog\"></span></span>\n             <label for=\"basic-url\">ID</label>\n          </div>\n      </div>\n      <div class=\"col-xs-1\">\n           <button class=\"btn btn-default\" title=\"Informations\" id=\"info\"><span class=\"fa fa-info\"></span></button>\n      </div>\n   <div class=\"col-xs-6\">\n        <input  id=\"value\" type=\"number\"  class=\"form-control\"  value=\"$VALUE\">\n   </div>\n   </div>\n      <div  id=\"informationsPanel\" class=\"row\"  style=\"display:none;\">\n          <div class=\"col-xs-12\" id=\"informationsText\">\n        <textarea id=\"description\" type=\"textarea\" style=\"resize:vertical\" spellcheck=\"true\"  rows=\"1\" class=\"form-control\">$description</textarea>\n       <textarea id=\"code\" type=\"textarea\" style=\"resize:vertical\" spellcheck=\"true\"  rows=\"1\" class=\"form-control\">$code</textarea>\n\n\n          </div>\n      </div>\n</div>\n";

    var Number = function (_VisualComponent) {
        _inherits(Number, _VisualComponent);

        function Number(dataObject) {
            _classCallCheck(this, Number);

            var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(textInput);
            item.prop('id', _this.data.id);

            item.find("#description").text(_this.data.description || "");
            item.find("#value").prop('readonly', _this.data.editable != undefined ? !_this.data.editable : false);
            item.find("#value").attr('min', _this.data.min);
            item.find("#value").attr('max', _this.data.max);
            item.find("#value").attr('step', _this.data.step);
            item[0].addEventListener("change", function (event) {
                _this.controller.onChangeData(event);
            });
            item.html(item[0].innerHTML.replace("ID", _this.data.id).replace("$VALUE", _this.data.value || "").replace("$description", "<code>" + _this.data.description + "</code>" || "").replace("$code", _this.data.code || ""));
            item.find("#info").click(function (event) {
                console.log("info", event.target, item[0].id);
                var panelInfo = item.find("#informationsPanel");
                panelInfo.css("display", panelInfo.css("display") == "none" ? "inline" : "none");
            });
            item.find("#description").attr("rows", _this.getNumLines(item.find("#description")));
            _this.item = item;
            return _this;
        }

        _createClass(Number, [{
            key: "getNumLines",
            value: function getNumLines(textarea) {
                var fontSize = textarea.css('font-size');
                var lht = Math.floor(parseInt(fontSize.replace('px', '')) * 1.5);
                var padding = parseInt($('textarea').css('paddingTop'), 10) + parseInt($('textarea').css('paddingBottom'), 10);
                var lines = ($('textarea').prop('scrollHeight') - padding) / lht;
                console.log("LINE", textarea, lht, lines);
                return lines;
            }
        }, {
            key: "value",
            set: function set(itemValue) {
                this.item.find("#value").attr('value', itemValue);
            },
            get: function get() {
                return this.item.find("#value").attr('value');
            }
        }]);

        return Number;
    }(_VisualComponent3.default);

    exports.default = Number;
});
//# sourceMappingURL=Number.js.map