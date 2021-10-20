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

    var _template = "\n<div class=\"container\">\n    <div class=\"row\">\n        <!-- MENU -->\n        <div class=\"col-xs-3\" id=\"myScrollspy\">\n            <ul id=\"mapList\" class=\"nav nav-pills nav-stacked\"></ul>\n        </div>\n        <!-- MENU END -->\n\n        <div class=\"col-xs-9\">\n            <div id=\"map\" class=\"tab-content content1\"></div>\n        </div>\n    </div>\n</div>\n";

    var GabaritMap = function (_VisualComponent) {
        _inherits(GabaritMap, _VisualComponent);

        function GabaritMap(dataObject) {
            _classCallCheck(this, GabaritMap);

            var _this = _possibleConstructorReturn(this, (GabaritMap.__proto__ || Object.getPrototypeOf(GabaritMap)).call(this, dataObject));

            var item = $(_template);
            item.prop("id", _this.dataObject.id);
            _this.view = item;
            return _this;
        }

        return GabaritMap;
    }(_VisualComponent3.default);

    exports.default = GabaritMap;
});
//# sourceMappingURL=GabaritMap.js.map