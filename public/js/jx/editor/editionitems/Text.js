define(["exports", "jx/editor/editionitems/BasicItem"], function (exports, _BasicItem2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _BasicItem3 = _interopRequireDefault(_BasicItem2);

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

    var Text = function (_BasicItem) {
        _inherits(Text, _BasicItem);

        function Text(dataObject) {
            _classCallCheck(this, Text);

            var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, Object.assign({
                icoTitle: "Voir",
                icoSymbol: "font",
                actions: [],
                informations: [],
                backgroundColor: "#F9F9F9"
            }, dataObject)));

            _this.content = $("<textarea id=\"value\" type=\"textarea\" style=\"resize:vertical\"  spellcheck=\"true\"  rows=\"1\" class=\"form-control\"></textarea><div  class=\"form-control\" id=\"valueRead\" style=\"maxHeight:200px;overflow:auto\"></div>\n            ");
            _this.view.find("#content").append(_this.content);
            _this.view.find("#value").html(_this.data.value || "");
            _this.view.find("#valueRead").html(_this.value.replace(new RegExp("\n", "g"), "<br>"));
            _this.view.find("#valueRead").prop("disabled", true);
            _this.view.find("#valueRead").css("backgroundColor", "#eeeeee");
            _this.view.find("#description").append('<div id="updatetime" style="display:none"></div>');
            _this._refreshDate();
            _this.lock = !_this.editable;
            _this.view.find("#value").on("change", function (event) {
                _this._refreshDate();
                if (_this.autoRefresh) _this._refreshData();
                _this.view.find("#valueRead").html(_this.value.replace(new RegExp("\n", "g"), "<br>"));
                _this.onchanged.dispatch({ target: _this });
            });
            _this._opened = false;
            _this.view.find("#valueRead").on("dblclick", function (event) {
                _this._opened = !_this._opened;
                _this._refreshTextField();
            });
            _this.view.find("#value").on("dblclick", function (event) {
                _this._opened = !_this._opened;
                _this._refreshTextField();
            });
            _this._refreshTextField();
            return _this;
        }

        _createClass(Text, [{
            key: "_refreshDate",
            value: function _refreshDate() {
                var d = new Date(Number(this.data.timestamp));

                var daysFrench = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
                var dateStr = daysFrench[d.getDay()] + " " + d.getDate() + "/" + this.jx.tools.gd(d.getMonth() + 1, 2) + "/" + d.getFullYear() + "  " + d.getHours() + ":" + this.jx.tools.gd(d.getMinutes(), 2) + ":" + this.jx.tools.gd(d.getSeconds(), 2);
                this.view.find("#updatetime").html(d);
            }
        }, {
            key: "_refreshTextField",
            value: function _refreshTextField() {
                if (this._opened) {
                    this._oldH = this.view.find("#valueRead").height();
                    this.view.find("#valueRead").css("height", "auto");
                    this.view.find("#value").height(this.view.find("#value").prop("scrollHeight"));
                } else {
                    if (this._oldH != undefined) {
                        this.view.find("#valueRead").height(this._oldH);
                        this.view.find("#value").height(this._oldH);
                    }
                    ;
                }
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
            key: "value",
            get: function get() {
                return this.view.find("#value")[0].value;
            },
            set: function set() {
                var text = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

                this.view.find("#valueRead").html(text.replace(new RegExp("\n", "g"), "<br>"));
                this.view.find("#value").html(text);
                this._refreshData();
            }
        }, {
            key: "textFold",
            set: function set(value) {
                if (this._opened === !value) return;
                this._opened = !value;
                this._refreshTextField();
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (!value) {
                    if (this.editable) {
                        this.view.find("#value").prop('readonly', false);
                        this.view.find("#value").css("display", "block");
                        this.view.find("#valueRead").css("display", "none");
                    } else {
                        this.view.find("#value").prop('readonly', true);
                        this.view.find("#value").css("display", "none");
                        this.view.find("#valueRead").css("display", "block");
                    }
                } else {
                    this.view.find("#value").prop('readonly', true);
                    this.view.find("#value").css("display", "none");
                    this.view.find("#valueRead").css("display", "block");
                }
            }
        }]);

        return Text;
    }(_BasicItem3.default);

    exports.default = Text;
});
//# sourceMappingURL=Text.js.map