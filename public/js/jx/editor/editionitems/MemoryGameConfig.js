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

    var MemoryGameConfig = function (_GabaritObject) {
        _inherits(MemoryGameConfig, _GabaritObject);

        function MemoryGameConfig(dataObject) {
            _classCallCheck(this, MemoryGameConfig);

            dataObject.gabarit = [{
                "id": "numFamilies",
                "type": "Number",
                "editable": true,
                "description": "",
                "value": 6
            }, {
                "id": "numChildrenByFamily",
                "type": "Number",
                "editable": true,
                "description": "",
                "value": 2
            }, {
                "id": "resourcesPattern",
                "type": "Text",
                "visible": false,
                "editable": false,
                "description": "",
                "value": "C_@@_£#"
            }, {
                "id": "tapNoiseEnabled",
                "type": "Boolean",
                "editable": true,
                "description": "bruitage lors du tap sur une carte",
                "value": false
            }, {
                "id": "tapNoiseID",
                "type": "Text",
                "visible": false,
                "editable": true,
                "description": "",
                "value": "B_TAP"
            }, {
                "id": "flipCardFX",
                "type": "ComboBox",
                "editable": true,
                "description": "",
                "value": "1: aucun",
                "visible": false,
                "options": ["1: aucun", "2: Effet retourne"]
            }, {
                "id": "NoComment",
                "type": "Boolean",
                "editable": true,
                "description": "Jouer le ommentaire JEU_NO",
                "value": false
            }, {
                "id": "NoAnim",
                "type": "Boolean",
                "editable": true,
                "visible": false,
                "description": "Jouer l'animation ANIM_00",
                "value": false
            }, {
                "id": "NoFX",
                "type": "Boolean",
                "editable": true,
                "description": "Jouer un effet sur la carte désignée",
                "value": false
            }, {
                "id": "OkComment",
                "type": "Boolean",
                "editable": true,
                "description": "Jouer le ommentaire JEU_NO",
                "value": false
            }, {
                "id": "OkAnim",
                "type": "Boolean",
                "editable": true,
                "description": "Jouer l'animation ANIM_00",
                "value": false
            }, {
                "id": "OkFX",
                "type": "Boolean",
                "editable": true,
                "description": "Jouer un effet sur la carte désignée",
                "value": false
            }, {
                "id": "",
                "type": "Separator"
            }];
            return _possibleConstructorReturn(this, (MemoryGameConfig.__proto__ || Object.getPrototypeOf(MemoryGameConfig)).call(this, dataObject));
        }

        return MemoryGameConfig;
    }(_GabaritObject3.default);

    exports.default = MemoryGameConfig;
});
//# sourceMappingURL=MemoryGameConfig.js.map