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

    var TextStyle = function (_GabaritObject) {
        _inherits(TextStyle, _GabaritObject);

        function TextStyle(dataObject) {
            _classCallCheck(this, TextStyle);

            dataObject.data.fontsList = dataObject.data.fontsList || "fonts";
            dataObject.gabarit = [{
                "id": "fontFamily",
                "type": dataObject.data.fontsList == "fonts" ? "FontSelector" : "ComboBox",
                "description": "",
                "editable": true,
                "value": "Harimau",
                "options": dataObject.data.fontsList
            }, {
                "id": "color",
                "type": "Color",
                "editable": true,
                "description": "",
                "value": "#ffffff"
            }, {
                "id": "bold",
                "type": "Boolean",
                "description": "",
                "visible": false,
                "editable": true,
                "value": false
            }, {
                "id": "italic",
                "type": "Boolean",
                "description": "",
                "visible": false,
                "editable": true,
                "value": false
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
            }];
            return _possibleConstructorReturn(this, (TextStyle.__proto__ || Object.getPrototypeOf(TextStyle)).call(this, dataObject));
        }

        return TextStyle;
    }(_GabaritObject3.default);

    exports.default = TextStyle;
});
//# sourceMappingURL=TextStyle.js.map