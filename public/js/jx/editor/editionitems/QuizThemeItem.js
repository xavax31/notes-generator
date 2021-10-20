define(["exports", "jx/editor/editionitems/DataGroup"], function (exports, _DataGroup2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _DataGroup3 = _interopRequireDefault(_DataGroup2);

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

    var QuizThemeItem = function (_DataGroup) {
        _inherits(QuizThemeItem, _DataGroup);

        function QuizThemeItem(dataObject) {
            _classCallCheck(this, QuizThemeItem);

            var _this = _possibleConstructorReturn(this, (QuizThemeItem.__proto__ || Object.getPrototypeOf(QuizThemeItem)).call(this, dataObject));

            _this.data.exportType = "DataGroup";
            _this.data.children = _this.data.children || [{ id: "title", type: "Text", value: _this.data.title || "" }, { id: "picto", type: "Image", asset: { preload: false, src: "images/themes/" + _this.data.id + ".png" } }, { id: "titleColor", type: "Color", value: "#000000" }, { id: "titleSize", type: "Number", min: 5, value: 12 }];
            return _this;
        }

        _createClass(QuizThemeItem, [{
            key: "firstInit",
            value: function firstInit() {
                var _this2 = this;

                if (!this.titleField) {
                    this.titleField = this.findChildById("title");
                    console.log(this.titleField);
                    this.titleField.onchanged.add(function (evt) {
                        var editionPage = _this2.controller.mainController;
                        var gabaritView = editionPage.gabaritView;
                        editionPage.refreshEditionView();
                        editionPage.showTab(_this2.id);
                    });
                }
            }
        }]);

        return QuizThemeItem;
    }(_DataGroup3.default);

    exports.default = QuizThemeItem;
});
//# sourceMappingURL=QuizThemeItem.js.map