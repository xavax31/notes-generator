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

    var _template = "\n<div class=\"tab-pane\" id=\"ID\"> \n\n</div>\n";
    var sep = "\n<div>\n\t<hr>\n\t<span id=\"sepID\" class=\"text-left\"></span>\n\t<span title=\"\"  id=\"preview\" class=\"text-left  btn btn-default\"><span class=\"fa fa-eye\"></span></span>\n</div>\n";

    var DataObject = function (_VisualComponent) {
        _inherits(DataObject, _VisualComponent);

        function DataObject(dataObject) {
            _classCallCheck(this, DataObject);

            var _this = _possibleConstructorReturn(this, (DataObject.__proto__ || Object.getPrototypeOf(DataObject)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            _this.view = $(_template);
            _this.view.html($(sep));
            var descStr = (_this.data.description || "").trim() == "" ? "" : "(" + _this.data.description + ")";
            _this.view.find("#sepID").html("<h4>" + _this.data.id + " <small>" + descStr + "</small></h4>");
            _this.view.prop("id", _this.data.id);
            _this.id = _this.data.id;
            if (_this.data.preview == true) {
                _this.view.find("#preview").on("click", function (evt) {
                    console.log("click", _this);
                    _this.controller.showItem({ type: _this.data.type, id: _this.data.id });
                });
            } else {
                _this.view.find("#preview").css("display", "none");
            }
            _this.children = [];
            return _this;
        }

        _createClass(DataObject, [{
            key: "addChild",
            value: function addChild(child) {
                this.view.append(child.view);
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
        }]);

        return DataObject;
    }(_VisualComponent3.default);

    exports.default = DataObject;
});
//# sourceMappingURL=DataObject.js.map