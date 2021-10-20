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

    var _ModelGabaritObject = function (_GabaritObject) {
        _inherits(_ModelGabaritObject, _GabaritObject);

        function _ModelGabaritObject(dataObject) {
            _classCallCheck(this, _ModelGabaritObject);

            dataObject.gabarit = [{
                "id": "pioche",
                "type": "ComboBox",
                "editable": true,
                "description": "",
                "value": "1: tirée en aléatoire parmi toutes les cartes du jeu",
                "options": ["1: tirée en aléatoire parmi toutes les cartes du jeu", "2: tirée en aléatoire parmi quelques cartes (6 premières)"]
            }];
            return _possibleConstructorReturn(this, (_ModelGabaritObject.__proto__ || Object.getPrototypeOf(_ModelGabaritObject)).call(this, dataObject));
        }

        return _ModelGabaritObject;
    }(_GabaritObject3.default);

    exports.default = _ModelGabaritObject;
});
//# sourceMappingURL=_ModelGabaritObject.js.map