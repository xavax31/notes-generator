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

    var ProjectInformation = function (_GabaritObject) {
        _inherits(ProjectInformation, _GabaritObject);

        function ProjectInformation(dataObject) {
            _classCallCheck(this, ProjectInformation);

            dataObject.gabarit = ProjectInformation.gabaritTemplate;
            return _possibleConstructorReturn(this, (ProjectInformation.__proto__ || Object.getPrototypeOf(ProjectInformation)).call(this, dataObject));
        }

        _createClass(ProjectInformation, null, [{
            key: "gabaritTemplate",
            get: function get() {
                return [{
                    "id": "permanentLock",
                    "type": "Parameter",
                    "editable": false,
                    "visible": "dev",
                    "description": "",
                    "value": false
                }, {
                    "id": "id",
                    "type": "Parameter",
                    "editable": false,
                    "description": "",
                    "value": ""
                }, {
                    "id": "title",
                    "type": "Parameter",
                    "editable": true,
                    "description": "",
                    "value": ""
                }, {
                    "id": "type",
                    "type": "Parameter",
                    "editable": false,
                    "description": "",
                    "value": "ApplicationBabelHTML5"
                }, {
                    "id": "description",
                    "type": "Parameter",
                    "editable": true,
                    "description": "Décrire ici le sypnopsis de l'application.",
                    "value": ""
                }, {
                    "id": "version",
                    "type": "Parameter",
                    "editable": "admin,dev",
                    "description": "",
                    "value": "1.0.0"
                }, {
                    "id": "appCodeVersion",
                    "type": "ComboBox",
                    "editable": "admin,dev",
                    "visible": false,
                    "description": "Etape actuel du projet",
                    "value": "intern",
                    "options": ["intern: src v1.0", "last_release: branch master v1.0", "last_dev: branch develop"]
                }, {
                    "id": "gitRepository",
                    "type": "Parameter",
                    "editable": false,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "git@bitbucket.org:bobaproductions/mini-quiz-tobo.git"
                }, {
                    "id": "previewIndex",
                    "type": "Parameter",
                    "editable": false,
                    "visible": false,
                    "description": "fichier html utilisé",
                    "value": ""
                }, {
                    "id": "status",
                    "type": "ComboBox",
                    "editable": true,
                    "description": "Etat actuel du projet",
                    "backgroundColor": "#e4ffd6",
                    "value": "open",
                    "options": "status"
                }, {
                    "id": "dateValidation",
                    "type": "DateItem",
                    "editable": "admin,manager,dev",
                    "description": "",
                    "value": "2016-03-08"
                }, {
                    "id": "dateGabarit",
                    "type": "DateItem",
                    "editable": "admin,manager,dev",
                    "description": "",
                    "value": "2016-03-08"
                }, {
                    "id": "devNumDaysCode",
                    "type": "NumberItem",
                    "editable": true,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "0"
                }, {
                    "id": "dateBeta",
                    "type": "DateItem",
                    "editable": "admin,manager,dev",
                    "description": "",
                    "value": "2016-03-08"
                }, {
                    "id": "devNumDaysDebug",
                    "type": "NumberItem",
                    "editable": true,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "0"
                }, {
                    "id": "dateRelease",
                    "type": "DateItem",
                    "editable": "admin,manager,dev",
                    "description": "",
                    "value": "2016-03-08"
                }, {
                    "id": "datePublication",
                    "type": "DateItem",
                    "editable": "admin,manager,dev",
                    "description": "",
                    "value": "2016-03-08"
                }, {
                    "id": "devNumDaysCleanup",
                    "type": "NumberItem",
                    "editable": true,
                    "visible": "admin,dev",
                    "description": "",
                    "value": "0"
                }, {
                    "id": "publication",
                    "type": "ListItem",
                    "editable": "*",
                    "description": "",
                    "value": "all",
                    "options": "publication"
                }, {
                    "id": "assignedUsers",
                    "type": "ListItem",
                    "editable": "*",
                    "description": "",
                    "value": "all",
                    "options": "users"
                }, {
                    "id": "Langues",
                    "type": "Parameter",
                    "editable": true,
                    "description": "",
                    "value": "fr,en,es"
                }, {
                    "id": "Doc",
                    "type": "Parameter",
                    "editable": "admin,dev,manager",
                    "description": "",
                    "value": "<a href='url.com' target='_blank' >Doc Moteur</a>"
                }, {
                    "id": "BugReport",
                    "type": "Parameter",
                    "editable": "admin,dev,manager",
                    "description": "",
                    "value": "<a href='url.com' target='_blank' >Bug Report link</a>"
                }];
            }
        }]);

        return ProjectInformation;
    }(_GabaritObject3.default);

    exports.default = ProjectInformation;
});
//# sourceMappingURL=ProjectInformation.js.map