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

    var ListItem = function (_BasicItem) {
        _inherits(ListItem, _BasicItem);

        function ListItem(dataObject) {
            _classCallCheck(this, ListItem);

            var _this = _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, dataObject));

            _this.content = $("<div  class=\"form-control\" id=\"shortList\" style=\"maxHeight:200px;overflow:auto;background-color: #efefef;\"/><select class=\"form-control inline\" id=\"value\">");
            _this.view.find("#content").html(_this.content);

            if ((_this.data.fontsList || _this.data.optionsList) && !_this.jx.editor.getOptionsList(_this.id)) {
                _this.jx.editor.getOptionsList()[_this.id] = _this.data.options;
            }
            ;

            if (typeof _this.data.options == "string") {
                var options = _this.jx.editor.getOptionsList(_this.data.options);
            } else {
                var options = _this.data.options;
            }
            _this.options = options;
            if (_this.data.value == undefined || _this.data.value == "") {
                var values = [options[0]];
            } else {
                var values = _this.data.value.split(",");
            }
            _this.view.find("#value").prop('multiple', true);
            for (var i = 0; i < options.length; i++) {
                var opt = options[i];
                var el = document.createElement("option");
                if (typeof opt == "string") {
                    el.textContent = opt;
                    el.value = opt;
                    $(el).attr("selected", values.indexOf(opt.split(":")[0]) != -1);
                } else {
                    el.textContent = opt.desc || opt.id;
                    el.value = opt.id;
                    $(el).attr("selected", values.indexOf(opt.id.split(":")[0]) != -1);
                }
                _this.view.find("#value").append(el);
            }
            _this.view.find("#shortList").on("mousedown", function (event) {
                if (_this.view.find("#value").css("display") == "none") {
                    _this.view.find("#value").css("display", "inline");
                } else {
                    _this.view.find("#value").css("display", "none");
                }
            });
            _this.view.find("#value").prop('disabled', !_this.editable);
            _this.view.find("#value").on("mousedown", function (event) {
                _this._clickedValue = event.target.value.split(":")[0];
                event.preventDefault();
            });
            _this.view.find("#value").on("change", function (event) {});
            _this.view.find("#value").on("click", function (event) {
                _this._refreshOptions(_this._clickedValue);
                _this.onchanged.dispatch({ currentTarget: _this, target: _this });
            });
            _this.view.find("#value").prop('size', options.length);
            _this.view.find("#value").css("display", "none");
            _this.view.find("#shortList").html(_this.value.substr(0, 30) + " ...");
            return _this;
        }

        _createClass(ListItem, [{
            key: "_refreshOptions",
            value: function _refreshOptions(valueClicked) {
                if (this.data.value == undefined || this.data.value == "") {
                    var values = [this.options[0]];
                } else {
                    var values = this.data.value.split(",");
                }
                if (valueClicked == this.options[0]) {
                    values = [this.options[0]];
                } else {
                    if (values.indexOf(valueClicked) == -1) {
                        values.push(valueClicked);
                    } else {
                        values.splice(values.indexOf(valueClicked), 1);
                    }
                    if (values.length == 0) {
                        values.push(this.options[0]);
                    } else if (values.length > 1 && values.indexOf(this.options[0]) != -1) {
                        values.splice(values.indexOf(this.options[0]), 1);
                    }
                }
                this.data.value = values.join(",");
                var elmt = this.view.find("#value")[0];
                for (var i = 0; i < elmt.options.length; i++) {
                    $(elmt.options[i]).prop("selected", values.indexOf(elmt.options[i].value.split(":")[0]) != -1);
                }
                this.view.find("#shortList").html(this.value.substr(0, 30) + " ...");
            }
        }, {
            key: "value",
            get: function get() {
                var values = new Array();
                var elmt = this.view.find("#value")[0];
                for (var i = 0; i < elmt.options.length; i++) {
                    if (elmt.options[i].selected == true) {
                        values[values.length] = elmt.options[i].value;
                    }
                }
                return values.join(",");
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (!value) {
                    this.view.find("#value").prop('disabled', !this.editable);
                } else {
                    this.view.find("#value").prop('disabled', true);
                }
            }
        }]);

        return ListItem;
    }(_BasicItem3.default);

    exports.default = ListItem;
});
//# sourceMappingURL=ListItem.js.map