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

    var clipInput = "\n<div class=\"form-Group row\">\n    <div class=\"col-xs-4\">\n        <div class=\"input-Group\">\n            <input type=\"text\" class=\"form-control\" id=\"textSound\" value=\"ID\" readonly=\"true\" >\n        </div>\n    </div>\n    <div class=\"col-xs-2\">\n         <button class=\"btn btn-default\" title=\"Voir\"><span class=\"fa fa-eye\"></span></button>\n    </div>\n    <div class=\"col-xs-3\">\n       <input id=\"text\" type=\"text\" class=\"form-control\" value= \"\">\n    </div>\n    <div class=\"col-xs-3\">\n        <select id=\"sequenceContentX\" class=\"form-control\">\n            <option value=\"VIDEO\">Vidéo</option>\n            <option value=\"SEQUENCE_IMAGES\">Séquence d'Images</option>\n            <option value=\"FLASH\">Flash</option>\n        </select>\n    </div>\n</div>\n";

    var Clip = function (_VisualComponent) {
        _inherits(Clip, _VisualComponent);

        function Clip(dataObject) {
            _classCallCheck(this, Clip);

            var _this = _possibleConstructorReturn(this, (Clip.__proto__ || Object.getPrototypeOf(Clip)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(clipInput);
            item.html(item[0].innerHTML.replace("ID", _this.data.id).replace("DESCRIPTION", _this.data.description || ""));
            _this.item = item;
            return _this;
        }

        return Clip;
    }(_VisualComponent3.default);

    exports.default = Clip;
});
//# sourceMappingURL=Clip.js.map