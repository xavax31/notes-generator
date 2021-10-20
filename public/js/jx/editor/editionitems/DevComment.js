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

    var textInput = "\n<div class=\"form-group row\">\n    <div class=\"col-xs-4\">\n        <div class=\"input-group\">\n             <span id=\"check\" class=\"input-group-addon\"><span class=\"fa fa-tumblr\"></span></span>\n            <input type=\"text\" class=\"form-control\" id=\"id\" value=\"ID\" readonly=\"true\" >\n        </div>\n    </div>\n    <div class=\"col-xs-8\">\n      <div class=\"row\">\n        <div class=\"col-xs-10\">\n          <textarea id=\"value\" type=\"textarea\" rows=\"2\" class=\"form-control\">$VALUE</textarea>\n        </div>\n        <div class=\"col-xs-2\">\n          <button id=\"description_btn\" class=\"btn btn-default\" title=\"$description\"><span class=\"fa fa-question\"></span></button>\n        </div>\n      </div>\n    </div>\n</div>\n";

    var DevComment = function (_VisualComponent) {
        _inherits(DevComment, _VisualComponent);

        function DevComment(dataObject) {
            _classCallCheck(this, DevComment);

            var _this = _possibleConstructorReturn(this, (DevComment.__proto__ || Object.getPrototypeOf(DevComment)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(textInput);
            item.prop('id', _this.dataObject.id);

            item.find("#value").prop('readonly', _this.dataObject.editable != undefined ? !_this.dataObject.editable : false);
            item[0].addEventListener("change", function (event) {
                _this.controller.onChangeData(event);
            });
            item.html(item[0].innerHTML.replace("ID", _this.dataObject.id).replace("$VALUE", _this.dataObject.value || "").replace("$description", _this.dataObject.description || ""));
            _this.item = item;
            return _this;
        }

        return DevComment;
    }(_VisualComponent3.default);

    exports.default = DevComment;
});
//# sourceMappingURL=DevComment.js.map