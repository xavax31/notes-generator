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

    var textInput = "\n<div class=\"form-group row\">\n    <div class=\"row\">\n        <div class=\"col-xs-5\">\n            <div class=\"input-group\">\n                <span id=\"check\" class=\"input-group-addon\"><span class=\"fa fa-tasks\"></span></span>\n                <input type=\"text\" class=\"btn btn-default form-control\" id=\"btn\" value=\"\">\n            </div>\n        </div>\n        <div class=\"col-xs-1\">\n             <button class=\"btn btn-default\" title=\"Informations\" id=\"info\"><span class=\"fa fa-info\"></span></button>\n        </div>\n        <div class=\"col-xs-6\">\n        </div>\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <textarea id=\"value\" type=\"textarea\" style=\"resize:vertical\"  spellcheck=\"true\"  rows=\"1\" class=\"form-control\"></textarea>\n        </div>\n    </div>\n    \n    <div  id=\"informationsPanel\" class=\"row\"  style=\"display:none;\">\n        <div class=\"col-xs-12\" id=\"informationsText\">\n            <div class\"xinputtext\" id=\"description\" ></div>\n        </div>\n    </div>\n</div>\n";

    var ButtonItem = function (_VisualComponent) {
        _inherits(ButtonItem, _VisualComponent);

        function ButtonItem(dataObject) {
            _classCallCheck(this, ButtonItem);

            var _this = _possibleConstructorReturn(this, (ButtonItem.__proto__ || Object.getPrototypeOf(ButtonItem)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(textInput);
            item.prop('id', _this.data.id);
            _this.confirmBeforeLaunch = _this.data.confirmBeforeLaunch == undefined ? true : _this.data.confirmBeforeLaunch;
            _this.data.description = _this.data.description || "";
            _this.editable = _this.jx.editor.getBoolDependsGroup(_this.data.editable, true);
            item.css("margin", "0px");

            item.find("#description").text(_this.data.description);
            item.find("#value").prop('readonly', true);
            item.find("#value").css("display", "none");

            item.find("#btn").attr("value", _this.data.title || _this.data.id);
            item.find("#btn").click(function (event) {
                var clickFunc = function clickFunc() {
                    item.find("#btn").prop("disabled", true);
                    var comm = void 0;
                    if (typeof _this.data.onclick == "function") {
                        comm = _this.data.onclick;
                        comm();
                        item.find("#btn").prop("disabled", false);
                    } else {
                        comm = _this.data.onclick.replace(/^\$/, "");
                        if (comm.search(/^project./) != -1) {
                            comm = comm.replace(/^project./, "");
                            _this.controller.mainController[comm]();
                            item.find("#btn").prop("disabled", false);
                        } else if (_this.jx.editor[comm]) {
                            _this.jx.editor[comm]();
                            item.find("#btn").prop("disabled", false);
                        } else {
                            item.find("#value").html("Wait please ...");
                            item.find("#value").css("display", "inline");
                            _this.jx.editor.execBash({ output: "new", scriptName: comm, args: { arg1: "arg1" } }, function (evt) {
                                item.find("#value").html(evt.stdout);
                                item.find("#btn").prop("disabled", false);
                            });
                        }
                    }
                };
                if (_this.confirmBeforeLaunch) {
                    _this.jx.editor.popup({
                        title: "Launch Script",
                        content: "Etes vous sûr de vouloir executer ce script ?<br>" + (_this.data.title || _this.data.id) + "<br>" + _this.data.description,
                        buttons: {
                            ok: { label: "Lancer" },
                            close: { label: "Fermer" }
                        },
                        onclose: function onclose(evt) {
                            if (evt.action == "ok") {
                                clickFunc();
                            }
                        }
                    });
                } else {
                    clickFunc();
                }
            });

            item.find("#info").click(function (event) {
                console.log("info", event.target, item[0].id);
                var panelInfo = item.find("#informationsPanel");
                panelInfo.css("display", panelInfo.css("display") == "none" ? "inline" : "none");
            });
            item.data("controller", _this);
            _this.item = item;
            _this.view = _this.item;
            var visible = _this.jx.editor.getBoolDependsGroup(_this.data.visible, true);
            _this.view.css("display", visible ? "block" : "none");
            return _this;
        }

        _createClass(ButtonItem, [{
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
            key: "value",
            get: function get() {
                return this.item.find("#value")[0].value;
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (!value) {
                    this.view.find("#btn").prop('disabled', !this.editable);
                } else {
                    this.view.find("#btn").prop('disabled', true);
                }
            }
        }]);

        return ButtonItem;
    }(_VisualComponent3.default);

    exports.default = ButtonItem;
});
//# sourceMappingURL=ButtonItem.js.map