define(["exports", "jx/core/JXObject", "jx/editor/editionitems/Common", "jx/editor/Editor"], function (exports, _JXObject2, _Common, _Editor) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

    var _Common2 = _interopRequireDefault(_Common);

    var _Editor2 = _interopRequireDefault(_Editor);

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

    var html = "\n<div class=\"form-group row\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n          </div>\n      </div>\n</div>\n";
    var gabarit = {
        "id": "Informations",
        "type": "Group",
        "children": [{
            "id": "Synopsis",
            "type": "Text",
            "editable": true,
            "description": "D??crire ici le sypnopsis de l'application.",
            "value": "moteur Quiz\nMin quiz simple destin?? ?? l'emag Tobo7-10 n?? 13. \n"
        }, {
            "id": "id",
            "type": "Text",
            "editable": false,
            "description": "",
            "value": "ApplicationModel1"
        }, {
            "id": "Due Date",
            "type": "DateItem",
            "editable": true,
            "description": "",
            "value": "2015-11-23"
        }, {
            "id": "status",
            "type": "ComboBox",
            "editable": true,
            "description": "Etat actuel du projet",
            "value": "order",
            "options": "status"
        }, {
            "id": "Commentaires",
            "type": "Text",
            "editable": true,
            "description": "D??crire ici les modifications souhait??es par rapport au mod??le actuel.",
            "value": "Cr??ation d'un moteur Quiz\nMin quiz simple destin?? ?? l'emag Tobo7-10 n?? 13. Publication 25/11/2015.\nV1 et Test editorial : semaine du 11/11/2015 dans l'ideal\n\nEn plus des sp??cificit?? d??crites dans le scenar pdf, tenir compte des points suivants:\n- les questions et les r??ponses devront ??tre entr??es dans une base de donn??e. \n-l'interface de mise a jour des quiz devra pouvoir aller piocher les questions/r??ponse dans la BDD et/ou permettre d'en entrer manuellement des nouvelles. \n\n- cette brique quiz devra pouvoir s'adapter. \nEtre agr??ment??e de diverses fonctions lors de commandes ult??rieures :\nex: pour la plateforme 1j1A n??cessit?? de contr??ler que le quiz a ??t?? r??ussi. \nM??me si sur l'emag ce n'est pas n??cessaire, pr??voir d'embl??e un v??rification /validation du quiz \nEx: dans l'emag on affiche simplement le score (nombre de bonne r??ponse) sans que ??a ait un impact r????l, juste une info. \nDans un quiz 1j1A un pourra avoir besoin de valider qu'ils ont bien r??pondu (score exact a d??terminer)\n\nA l'invere les particularit??s de mini-quiz pirate de l'eamg divent ??tre isol??es et d??sactivables: \nexemple: page 3 : Le captain commente la r??ponse de l'enfant.\nCette option devrait etre d??sactivable dans le moteur de quiz.\n\n-l'Int??gralit?? des param??tres graphiques doivent pouvoir ??tre modifi??s : typo, couleurs, fonds animation, mascotte ou non etc.\n"
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
            "description": "Type et version du moteur de jeu utilis??",
            "value": "JX v1.0"
        }, {
            "id": "Scenario",
            "type": "PDF",
            "description": "",
            "asset": {
                "src": "doc/JEU01.pdf"
            }
        }]
    };
    var editor = void 0;

    var MixedBox = function (_JXObject) {
        _inherits(MixedBox, _JXObject);

        function MixedBox(controller, params) {
            _classCallCheck(this, MixedBox);

            var _this = _possibleConstructorReturn(this, (MixedBox.__proto__ || Object.getPrototypeOf(MixedBox)).call(this));

            editor = _Editor2.default.getInstance();
            _this.controller = controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var item = $(html);
            item.prop("id", params.id);
            _this.onChanged = new signals.Signal();
            item[0].addEventListener("change", function (event) {
                _this.onChanged.dispatch({ target: _this });
            });
            if (params.onChanged) {
                _this.onChanged.add(params.onChanged);
            }
            ;
            _this._data = params;
            item.data("controller", _this);
            _this.item = item;
            _this.gabarit = gabarit.children;
            return _this;
        }

        _createClass(MixedBox, [{
            key: "value",
            get: function get() {
                return this.item[0].value;
            }
        }, {
            key: "data",
            get: function get() {
                return this._data;
            }
        }]);

        return MixedBox;
    }(_JXObject3.default);

    exports.default = MixedBox;
});
//# sourceMappingURL=MixedBox.js.map