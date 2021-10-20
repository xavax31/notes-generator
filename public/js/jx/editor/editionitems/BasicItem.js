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

    var _template = function _template(_ref) {
        var _ref$icoSymbol = _ref.icoSymbol;
        var icoSymbol = _ref$icoSymbol === undefined ? "gear" : _ref$icoSymbol;
        var _ref$backgroundColor = _ref.backgroundColor;
        var backgroundColor = _ref$backgroundColor === undefined ? "#FFFFFF" : _ref$backgroundColor;

        return "\n<div class=\"form-group row\">\n    <div class=\"row\">\n     \n        <div class=\"col-xs-5\">\n            <div class=\"input-group\" style=\"width:100%\">\n                <span id=\"check\" class=\"input-group-addon\" style=\"width:40px; background-color: " + backgroundColor + ";\"><span class=\"fa fa-" + icoSymbol + "\"></span></span>\n                <input type=\"text\" tabindex=\"-1\" class=\"form-control\" style=\"background-color: " + backgroundColor + ";\" id=\"id\" readonly=\"true\" >\n                \n            </div>\n        </div>\n        <div class=\"col-xs-6\" id=\"content\">\n        </div>\n        <div class=\"col-xs-1\">\n            <button  tabindex=\"-1\" class=\"btn btn-default\" title=\"Informations\" id=\"info\"><span class=\"fa fa-info\"></span></button>\n        </div>\n    </div>\n    <div  id=\"informationsPanel\" class=\"row\"  style=\"display:none;\">\n        <div class=\"col-xs-12\" id=\"informationsText\">\n            <div class\"xinputtext\" id=\"description\" ></div>\n        </div>\n    </div>\n</div>\n";
    };

    var BasicItem = function (_VisualComponent) {
        _inherits(BasicItem, _VisualComponent);

        function BasicItem(dataObject) {
            _classCallCheck(this, BasicItem);

            var _this = _possibleConstructorReturn(this, (BasicItem.__proto__ || Object.getPrototypeOf(BasicItem)).call(this, Object.assign({
                icoTitle: "Voir",
                icoSymbol: "gear",
                actions: [],
                informations: [],
                backgroundColor: "#efefef"
            }, dataObject)));

            _this.editor = _this.jx.editor;
            _this.id = _this.data.id;

            _this.controller = _this.dataObject.controller;
            _this.autoRefresh = _this.dataObject.autoRefresh || false;
            _this.dataObject.backgroundColor = _this.data.backgroundColor || _this.dataObject.backgroundColor;
            _this.view = $(_template(_this.dataObject));
            _this.data.timestamp = _this.data.timestamp == undefined ? Date.now() : _this.data.timestamp;
            _this.view.prop('id', _this.data.id.search("#") != -1 ? _this.jx.tools.replaceCharByNumber(_this.data.id, _this.data.index) : _this.data.id);
            _this.view.css('margin-bottom', "5px");
            _this.view.find("#description").html((_this.data.description || "").replace(/\n/g, "<br>"));

            _this.editable = _this.jx.editor.getBoolDependsGroup(_this.data.editable, true);
            var visible = _this.jx.editor.getBoolDependsGroup(_this.data.visible, true);
            _this.view.css("display", visible ? "block" : "none");
            _this.view.find("#id").prop("value", _this.data.title || _this.data.id);
            _this._panelInfo = _this.view.find("#informationsPanel");
            _this.view.find("#info").click(function (event) {
                console.log("info", event.target, _this.view[0].id);
                _this.toggleInfo();
            });
            _this.view.data("controller", _this);
            _this.item = _this.view;
            return _this;
        }

        _createClass(BasicItem, [{
            key: "check",
            value: function check() {
                this.view.find("#check").css("background-color", "#00ff00");
            }
        }, {
            key: "_refreshData",
            value: function _refreshData() {
                this.data.value = this.value;
            }
        }, {
            key: "_refreshView",
            value: function _refreshView() {
                this.data.value = this.value;
            }
        }, {
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
            key: "value",
            get: function get() {
                console.warn("not implemented in " + this);
                return null;
            }
        }, {
            key: "lock",
            set: function set(value) {}
        }]);

        return BasicItem;
    }(_VisualComponent3.default);

    exports.default = BasicItem;
});
//# sourceMappingURL=BasicItem.js.map