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

    var line = "\n<div>\n\t<hr>\n\t<div id=\"id\"></div>\n</div>\n";

    var Separator = function (_JXObject) {
        _inherits(Separator, _JXObject);

        function Separator(controller, params) {
            _classCallCheck(this, Separator);

            var _this = _possibleConstructorReturn(this, (Separator.__proto__ || Object.getPrototypeOf(Separator)).call(this));

            _this.controller = controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(line);
            params.id = params.id || "";
            if (params.id.trim() != "") {
                item.find("#id").html("<b>" + params.id + " : </b></br></br>");
            }
            ;
            _this.item = item[0];
            return _this;
        }

        return Separator;
    }(_JXObject3.default);

    exports.default = Separator;
});
//# sourceMappingURL=Separator.js.map