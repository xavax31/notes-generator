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

    var ComboBox = function (_BasicItem) {
        _inherits(ComboBox, _BasicItem);

        function ComboBox(dataObject) {
            _classCallCheck(this, ComboBox);

            var _this = _possibleConstructorReturn(this, (ComboBox.__proto__ || Object.getPrototypeOf(ComboBox)).call(this, dataObject));

            _this.content = $("<select class=\"form-control\" id=\"value\">");
            _this.view.find("#content").html(_this.content);
            if (typeof _this.data.options == "string") {
                var options = _this.jx.editor.getOptionsList(_this.data.options);
            } else {
                var options = _this.data.options;
            }
            var realValue = void 0;
            if (_this.data.value == undefined || _this.data.value == "") {
                var value = typeof options[0] == "string" ? options[0] : options[0].id;
            } else {
                var value = _this.data.value;
            }
            var valueExistsInOptions = false;
            for (var i = 0; i < options.length; i++) {
                var opt = options[i];
                var el = document.createElement("option");
                if (typeof opt == "string") {
                    el.textContent = opt;
                    el.value = opt;
                    if (opt.split(":")[0] == value.split(":")[0]) {
                        $(el).attr("selected", true);
                        valueExistsInOptions = true;
                        realValue = opt.split(":")[0];
                    }
                } else {
                    el.textContent = opt.desc || opt.id;
                    el.value = opt.id;
                    if (opt.id == value.split(":")[0]) {
                        $(el).attr("selected", true);
                        valueExistsInOptions = true;
                        realValue = opt.desc;
                    }
                }
                _this.view.find("#value").append(el);
            }
            console.log("VALUE", value, valueExistsInOptions, options);
            if (!valueExistsInOptions) {
                _this.view.find("#informationsText").html("\n/!\\ La valeur " + realValue + " définie pour ce champ n'est pas ou plus disponible dans les choix possibles. \n<br/>\nLes raisons peuvent être:\n<br/>\n- une mauvaise configuration de la liste. Voir le développeur pour corriger.\n<br/>\n- La valeur a été supprimée volontairement de la liste. Par exemple, une typo qui a été supprimée de la liste globale des fontes. Voir le responsable de ces listes pour plus d'infos.\n<br/>\n<br/>\nBien que cette valeur n'apparaisse pas dans ce champ, étant remplacée par le choix suivant dans la liste, c'est bien cette valeur manquante qui est utlisée dans le jeu, pouvant donc entrainer un comportement imprévu, voir un plantage.\n<br/>\n");

                _this.view.find("#info").html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>');
                _this.view.find("#info").css({ "color": "white", "backgroundColor": "orange" });
            }
            _this.view.find("#value").prop('disabled', !_this.editable);
            _this.view.on("change", function (event) {
                _this.data.value = $(event.currentTarget).data("controller").value.split(":")[0];
                _this.onchanged.dispatch({ currentTarget: _this, target: _this });
            });
            return _this;
        }

        _createClass(ComboBox, [{
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
            key: "setOptions",
            value: function setOptions(options, defaulValue) {
                console.log(options);
                this.view.find("#value").empty();
                if (typeof options == "string") {
                    options = this.jx.editor.getOptionsList(options);
                }
                if (defaulValue == undefined || defaulValue == "") {
                    var value = typeof options[0] == "string" ? options[0] : options[0].id;
                } else {
                    var value = defaulValue;
                }
                console.log(value);
                for (var i = 0; i < options.length; i++) {
                    var opt = options[i];
                    var el = document.createElement("option");
                    if (typeof opt == "string") {
                        el.textContent = opt;
                        el.value = opt;
                        $(el).attr("selected", opt.split(":")[0] == value.split(":")[0]);
                    } else {
                        el.textContent = opt.desc || opt.id;
                        el.value = opt.id;
                        $(el).attr("selected", opt.id == value.split(":")[0]);
                    }
                    this.view.find("#value").append(el);
                }
                this.data.value = value;
            }
        }, {
            key: "value",
            get: function get() {
                return this.view.find("#value")[0].value;
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

        return ComboBox;
    }(_BasicItem3.default);

    exports.default = ComboBox;
});
//# sourceMappingURL=ComboBox.js.map