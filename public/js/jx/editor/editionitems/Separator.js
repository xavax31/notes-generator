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

    var line = "\n<div>\n\t<hr>\n\t<div id=\"id\"></div>\n\t<div id=\"description\"></div>\n</div>\n";

    var Separator = function (_VisualComponent) {
        _inherits(Separator, _VisualComponent);

        function Separator(dataObject) {
            _classCallCheck(this, Separator);

            var _this = _possibleConstructorReturn(this, (Separator.__proto__ || Object.getPrototypeOf(Separator)).call(this, Object.assign({ id: "" }, dataObject)));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            _this.view = $(line);
            _this.data.id = _this.data.id || "";
            if (_this.data.id.trim() != "" || _this.data.title) {
                _this.view.find("#id").html("<b>" + (_this.data.title || _this.data.id) + " : </b><br/><br/>");
            }
            ;
            if (_this.data.description && _this.data.description.trim() != "") {
                _this.view.find("#description").html(_this.data.description);
            }
            ;
            return _this;
        }

        _createClass(Separator, [{
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
            key: "toggleInfo",
            value: function toggleInfo() {
                var panelInfo = this.view.find("#informationsPanel");
                if (panelInfo.css("display") == "none") {
                    this.showInfo();
                } else {
                    this.hideInfo();
                }
            }
        }, {
            key: "lock",
            set: function set(value) {}
        }]);

        return Separator;
    }(_VisualComponent3.default);

    exports.default = Separator;
});
//# sourceMappingURL=Separator.js.map