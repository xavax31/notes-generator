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

    var InformationsData = function (_GabaritObject) {
        _inherits(InformationsData, _GabaritObject);

        function InformationsData(dataObject) {
            _classCallCheck(this, InformationsData);

            dataObject.gabarit = [{
                "id": "Synopsis",
                "type": "Text",
                "editable": true,
                "description": "Décrire ici le sypnopsis de l'application.",
                "value": "Modèle minimal, une image de chargement, un fond, une musique de fond"
            }, {
                "id": "id",
                "type": "Text",
                "editable": false,
                "description": "",
                "value": "ApplicationModel1"
            }, {
                "id": "status",
                "type": "ComboBox",
                "editable": true,
                "description": "Etat actuel du projet",
                "value": "open",
                "options": ["todo", "open", "doing", "test", "debug", "done", "closed"]
            }, {
                "id": "Commentaires",
                "type": "Text",
                "editable": true,
                "description": "Décrire ici les modifications souhaitées par rapport au modèle actuel.",
                "value": ""
            }, {
                "id": "defaultViewType",
                "type": "Text",
                "visible": false,
                "editable": false,
                "description": "",
                "value": "CJS"
            }, {
                "id": "Version",
                "type": "Parameter",
                "editable": false,
                "description": "Version du projet",
                "value": "1.0"
            }, {
                "id": "GameEngine",
                "type": "Parameter",
                "editable": false,
                "description": "Type et version du moteur de jeu utilisé",
                "value": "JX v1.0"
            }, {
                "id": "framerate",
                "type": "Number",
                "editable": true,
                "description": "Framerate global",
                "min": 1,
                "max": 100,
                "value": "50"
            }];
            return _possibleConstructorReturn(this, (InformationsData.__proto__ || Object.getPrototypeOf(InformationsData)).call(this, dataObject));
        }

        return InformationsData;
    }(_GabaritObject3.default);

    exports.default = InformationsData;
});
//# sourceMappingURL=InformationsData.js.map