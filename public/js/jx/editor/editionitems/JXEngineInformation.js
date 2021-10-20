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

    var JXEngineInformation = function (_GabaritObject) {
        _inherits(JXEngineInformation, _GabaritObject);

        function JXEngineInformation(dataObject) {
            _classCallCheck(this, JXEngineInformation);

            dataObject.gabarit = JXEngineInformation.gabaritTemplate;
            return _possibleConstructorReturn(this, (JXEngineInformation.__proto__ || Object.getPrototypeOf(JXEngineInformation)).call(this, dataObject));
        }

        _createClass(JXEngineInformation, null, [{
            key: "gabaritTemplate",
            get: function get() {
                return [{
                    "id": "type",
                    "type": "Parameter",
                    "editable": false,
                    "description": "",
                    "value": "jx-engine"
                }, {
                    "id": "jxVersion",
                    "type": "ComboBox",
                    "editable": true,
                    "description": "Etape actuel du projet",
                    "value": "intern",
                    "options": ["intern: src/jx v0.9", "last_release: branch master v1.1", "last_dev: branch develop"]
                }, {
                    "id": "jxMinify",
                    "type": "ComboBox",
                    "editable": true,
                    "description": "Minify jx engine",
                    "value": "auto",
                    "options": ["auto", "always", "never"]
                }, {
                    "id": "modulePath",
                    "type": "Parameter",
                    "editable": false,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "modules/mini-quiz/v1.0"
                }, {
                    "id": "mainCtrl",
                    "type": "Parameter",
                    "editable": false,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "$modulePath/index"
                }, {
                    "id": "srcPath",
                    "type": "Parameter",
                    "editable": false,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "src"
                }, {
                    "id": "defaultViewType",
                    "type": "Parameter",
                    "editable": false,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "CJS"
                }, {
                    "id": "screenRatio",
                    "type": "ComboBox",
                    "editable": false,
                    "description": "The screen ratio",
                    "value": "auto",
                    "options": ["auto", "4/3", "16/9"],
                    "visible": true
                }, {
                    "id": "framerate",
                    "type": "Number",
                    "editable": true,
                    "visible": "admin,dev",
                    "description": "Framerate global",
                    "min": 1,
                    "max": 100,
                    "value": "50"
                }, {
                    "id": "backgroundColor",
                    "type": "Color",
                    "editable": true,
                    "visible": true,
                    "description": "Color of the background of the app (container html page)"
                }, {
                    "id": "startButton",
                    "type": "ComboBox",
                    "editable": true,
                    "description": "Show a button to start application.",
                    "value": "auto",
                    "options": ["auto", "yes", "no"],
                    "visible": true
                }, {
                    "id": "startButtonHeightPercent",
                    "type": "Number",
                    "editable": true,
                    "description": "Height of start button : % of SplashScreen height. Size ratio is keeped",
                    "step": 1,
                    "value": 40,
                    "visible": true
                }];
            }
        }]);

        return JXEngineInformation;
    }(_GabaritObject3.default);

    exports.default = JXEngineInformation;
});
//# sourceMappingURL=JXEngineInformation.js.map