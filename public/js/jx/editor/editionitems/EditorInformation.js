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

    var EditorInformation = function (_GabaritObject) {
        _inherits(EditorInformation, _GabaritObject);

        function EditorInformation(dataObject) {
            _classCallCheck(this, EditorInformation);

            dataObject.gabarit = EditorInformation.gabaritTemplate;
            return _possibleConstructorReturn(this, (EditorInformation.__proto__ || Object.getPrototypeOf(EditorInformation)).call(this, dataObject));
        }

        _createClass(EditorInformation, null, [{
            key: "gabaritTemplate",
            get: function get() {
                return [{
                    "id": "assetsURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "${PROJECT_URL}/assets",
                    "timestamp": 1482269841478,
                    "visible": true
                }, {
                    "id": "projectsURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "/projects/milan-presse",
                    "timestamp": 1482269841486,
                    "visible": true
                }, {
                    "id": "archivesURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "/archives/milan-presse",
                    "timestamp": 1482269841495,
                    "visible": true
                }, {
                    "id": "appEnginesURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "/resources/milan-presse/moteurs",
                    "timestamp": 1482269841502,
                    "visible": true
                }, {
                    "id": "buildsURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "/projects/builds",
                    "timestamp": 1482269841509,
                    "visible": true
                }, {
                    "id": "demosURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "${devURL}/mp-framework/current/doc/components",
                    "timestamp": 1482269841514,
                    "visible": true
                }, {
                    "id": "devURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "/dev",
                    "timestamp": 1482269841519,
                    "visible": true
                }, {
                    "id": "boba",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "${devURL}/mp-framework/current",
                    "timestamp": 1482269841525,
                    "visible": true
                }, {
                    "id": "docsURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "${devURL}/mp-framework/current/doc",
                    "timestamp": 1482269841531,
                    "visible": true
                }, {
                    "id": "jxURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "${devURL}/mp-framework/current/engine/src/jx",
                    "timestamp": 1482269841541,
                    "visible": true
                }, {
                    "id": "componentsClassPath",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "jx/editor/comps",
                    "timestamp": 1482269841553,
                    "visible": true
                }, {
                    "id": "componentsURL",
                    "type": "Parameter",
                    "description": "",
                    "editable": true,
                    "value": "${jxURL}/editor/comps",
                    "timestamp": 1482269841559,
                    "visible": true
                }];
            }
        }]);

        return EditorInformation;
    }(_GabaritObject3.default);

    exports.default = EditorInformation;
});
//# sourceMappingURL=EditorInformation.js.map