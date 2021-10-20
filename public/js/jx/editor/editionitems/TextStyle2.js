define(["exports", "jx/editor/editionitems/GabaritObject"], function (exports, _GabaritObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _GabaritObject3 = _interopRequireDefault(_GabaritObject2);

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var TextStyle2 = function (_GabaritObject) {
        _inherits(TextStyle2, _GabaritObject);

        function TextStyle2(dataObject) {
            _classCallCheck(this, TextStyle2);

            console.log("do TextStyle", dataObject.data);
            dataObject.data.fontsList = dataObject.data.fontsList || "fonts";
            dataObject.gabarit = [{
                "id": "fontFamily",
                "type": "ComboBox",
                "description": "",
                "editable": true,
                "value": "o",
                "options": dataObject.data.fontsList
            }, {
                "id": "fontStyle",
                "type": "ComboBox",
                "description": "",
                "editable": true,
                "value": "o",
                "options": []
            }, {
                "id": "color",
                "type": "Color",
                "editable": true,
                "description": "",
                "value": "#ffffff"
            }, {
                "id": "fontSize",
                "type": "Number",
                "min": 1,
                "max": 200,
                "description": "",
                "editable": true,
                "value": "20"
            }, {
                "id": "textAlign",
                "type": "ComboBox",
                "description": "",
                "editable": true,
                "value": "center",
                "options": ["left", "center", "right", "justify"]
            }, {
                "id": "overflow",
                "type": "ComboBox",
                "description": "\n \t\t\t\t      Défini le dépassement de texte de la zone prévue.\n \t\t\t\t      auto: affiche automatiquement la barre de défilement verticale si nécessaire seulement.\n \t\t\t\t      visible: le texte dépasse en bas sans se soucier de la limite.\n \t\t\t\t      hidden: la partie qui dépasse est cachée.\n \t\t\t\t      scroll: affiche toujours les barres de défilement, nécessaire ou non.\n \t\t\t\t      ",
                "editable": true,
                "value": "auto",
                "options": ["auto", "visible", "hidden", "scroll"]
            }, {
                "id": "",
                "type": "Separator"
            }];
            return _possibleConstructorReturn(this, (TextStyle2.__proto__ || Object.getPrototypeOf(TextStyle2)).call(this, dataObject));
        }

        _createClass(TextStyle2, [{
            key: "_create",
            value: function _create() {
                var _this2 = this;

                _get(TextStyle2.prototype.__proto__ || Object.getPrototypeOf(TextStyle2.prototype), "_create", this).call(this);
                var fontStyle = this.findComp({ id: "fontStyle" });
                var fontFamily = this.findComp({ id: "fontFamily" });

                var fontsList = this.jx.editor.getOptionsList("resourcesFonts");
                var font = void 0;
                for (var i = 0; i < fontsList.length; i++) {
                    if (fontsList[i].id == fontFamily.value) {
                        font = fontsList[i];
                        break;
                    }
                    ;
                }
                ;

                fontFamily.saveOnChange = false;
                fontFamily.onchanged.add(function (evt) {
                    fontStyle.setOptions(font.styles);
                    fontStyle.onchanged.dispatch({ target: _this2 });
                });
                fontStyle.setOptions(font.styles, this.data.value.fontStyle);
            }
        }]);

        return TextStyle2;
    }(_GabaritObject3.default);

    exports.default = TextStyle2;
});
//# sourceMappingURL=TextStyle2.js.map