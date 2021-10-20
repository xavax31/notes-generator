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

    var _template = "\n<div class=\"tab-pane\" id=\"ID\">\n</div>\n";
    var sep = "\n<div>\n\t<span id=\"sepID\" class=\"text-left\"></span>\n\t<div id=\"children\"></div>\n</div>\n";

    var Group = function (_VisualComponent) {
        _inherits(Group, _VisualComponent);

        function Group(dataObject) {
            _classCallCheck(this, Group);

            var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.id = _this.data.id;
            _this.view = $(_template);
            _this.view.html($(sep));

            var descStr = (_this.data.description || "").trim() == "" ? "" : "(" + _this.data.description + ")";
            if (!_this.data.hideBtnConfig && _this.jx.editor.userIsGroup("dev")) {
                _this.view.find("#sepID").html("<hr id='sepLine' class='" + (_this.data.sepLineStyle || "groupSepLine") + "'><h4><span id='titleG'>" + (_this.data.title || _this.data.id) + "</span> <small>" + descStr + "</small></h4><span><button id='showConfig'><span class='fa fa-sitemap'></span></button></span>");
                _this.view.find("#showConfig")[0].tabIndex = -1;
                _this.view.find("#showConfig").on("click", function (evt) {
                    _this.controller.showInGabarit(new RegExp('"id":\\s*"' + _this.id + '"'), { caseSensitive: true, wholeWord: false, regExp: true });
                });
            } else {
                _this.view.find("#sepID").html("<hr id='sepLine' class='" + (_this.data.sepLineStyle || "groupSepLine") + "'><h4><span id='titleG'>" + (_this.data.title || _this.data.id) + "</span> <small>" + descStr + "</small></h4>");
            }
            if (_this.data.screen) {
                _this.view.append("<span><button id='screenPreview'><span class='fa fa-eye'></span></button></span>");
                _this.view.find("#screenPreview").css("display", "none");
                _this.view.find("#screenPreview").on("click", function (evt) {
                    _this.controller.showScreen(_this.data.screen);
                });
            }
            if (_this.data.showHeader != undefined && !_this.data.showHeader) {
                _this.view.find("#sepID").css("display", "none");
            }
            ;

            _this.item = _this.view;
            _this.view.prop("id", _this.data.id);
            _this.children = [];
            return _this;
        }

        _createClass(Group, [{
            key: "addChild",
            value: function addChild(child) {
                this.view.find("#children:first").append(child.view);
                this.children.push(child);
                child.itemParent = this;
            }
        }, {
            key: "removeChild",
            value: function removeChild(child) {
                child.view.remove();
                child.itemParent = null;
                var index = this.children.indexOf(child);
                if (index != -1) {
                    this.children.splice(index, 1);
                }
            }
        }, {
            key: "findChildById",
            value: function findChildById(id) {
                for (var i = 0; i < this.children.length; i++) {
                    if (this.children[i].id == id) return this.children[i];
                }
                return null;
            }
        }, {
            key: "setTitle",
            value: function setTitle(value) {
                this.data.title = value;
                this.view.find("#titleG:first").html(this.data.title);
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
            key: "mainController",
            get: function get() {
                return this.controller.mainController;
            }
        }]);

        return Group;
    }(_VisualComponent3.default);

    exports.default = Group;
});
//# sourceMappingURL=Group.js.map