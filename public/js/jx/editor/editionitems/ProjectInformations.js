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

    var ProjectInformations = function (_GabaritObject) {
        _inherits(ProjectInformations, _GabaritObject);

        function ProjectInformations(dataObject) {
            _classCallCheck(this, ProjectInformations);

            dataObject.gabarit = [{
                "id": "project",
                "type": "ProjectInformation",
                "value": {
                    "id": "Mini-Quiz_TOBO",
                    "Synopsis": "yo",
                    "version": "2.0.0",
                    "status": "todo",
                    "subStatus": "order"
                }
            }, {
                "id": "engine",
                "type": "JXEngineInformation",
                "value": {
                    "type": "jx-engine",
                    "jx-version": "1.0.3",
                    "modulePath": "modules/mini-quiz/v1.0",
                    "mainCtrl": "$modulePath/index",
                    "defaultViewType": "CJS",
                    "framerate": 51
                }
            }, {
                "id": "config",
                "type": "EditorInformation",
                "visible": "dev",
                "value": {
                    "assetsURL": "${PROJECT_URL}/assets",
                    "projectsURL": "/projects/milan-presse",
                    "archivesURL": "/archives/milan-presse",
                    "appEnginesURL": "/resources/milan-presse/moteurs",
                    "buildsURL": "/projects/builds",
                    "demosURL": "${devURL}/mp-framework/current/doc/components",
                    "devURL": "/dev",
                    "boba": "${devURL}/mp-framework/current",
                    "docsURL": "${devURL}/mp-framework/current/doc",
                    "jxURL": "${devURL}/mp-framework/current/engine/src/jx",
                    "componentsClassPath": "jx/editor/comps",
                    "componentsURL": "${jxURL}/editor/comps"
                }
            }];
            return _possibleConstructorReturn(this, (ProjectInformations.__proto__ || Object.getPrototypeOf(ProjectInformations)).call(this, dataObject));
        }

        return ProjectInformations;
    }(_GabaritObject3.default);

    exports.default = ProjectInformations;
});
//# sourceMappingURL=ProjectInformations.js.map