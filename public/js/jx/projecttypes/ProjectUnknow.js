define(["exports", "jx/projecttypes/ProjectManager", "jx/projecttypes/editorformattype2/Importer", "jx/projecttypes/editorformattype2/Exporter"], function (exports, _ProjectManager, _Importer, _Exporter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ProjectManager2 = _interopRequireDefault(_ProjectManager);

    var _Importer2 = _interopRequireDefault(_Importer);

    var _Exporter2 = _interopRequireDefault(_Exporter);

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

    var ProjectUnknow = function (_ProjetManager) {
        _inherits(ProjectUnknow, _ProjetManager);

        function ProjectUnknow(dataObject) {
            _classCallCheck(this, ProjectUnknow);

            return _possibleConstructorReturn(this, (ProjectUnknow.__proto__ || Object.getPrototypeOf(ProjectUnknow)).call(this, dataObject));
        }

        _createClass(ProjectUnknow, [{
            key: "_create",
            value: function _create() {
                console.log("ProjectUnknow create");
                _get(ProjectUnknow.prototype.__proto__ || Object.getPrototypeOf(ProjectUnknow.prototype), "_create", this).call(this);
                this._functionnalities = ["editGabarit", "openProjectDir", "openSublimeProject", "pullProject", "pushProject", "pushProjectSrc", "save", "testBtnDev"];
                this.info.url = this.dataObject.url;
                this.info.projectURL = this.dataObject.url;
                this.info.projectJXData = this.dataObject.projectJXData;
                this.testURL = "/builds" + this.info.url;
                this.importer = new _Importer2.default(this.jx, this.info);
                this.exporter = new _Exporter2.default(this.jx, { projectInfo: this.info });
            }
        }, {
            key: "load",
            value: function load(onFinished) {
                var _this2 = this;

                this.importer.importConfig(function (projectData) {
                    console.log("config imported", _this2);
                    _this2.json = _this2.importer.json;
                    _this2.jx.tools.mergeObjectIn(_this2.info, projectData.projectInformations.project);
                    _this2.info.engine = projectData.projectInformations.engine;
                    _this2.info.gabarit = projectData.modules[0].gabarit;
                    onFinished({ target: _this2 });
                });
            }
        }, {
            key: "getJSON",
            value: function getJSON() {
                return this.json;
            }
        }, {
            key: "getInGabarit",
            value: function getInGabarit(_ref) {
                var id = _ref.id;
                var _ref$gabarit = _ref.gabarit;
                var gabarit = _ref$gabarit === undefined ? this.info.gabarit : _ref$gabarit;

                console.log(id);
                console.log(gabarit);
                var idArr = id.split(".");
                var item;
                var children = gabarit;
                for (var i = 0; i < idArr.length; i++) {
                    item = this._getInGabarit({ id: idArr[i], gabarit: children });
                    if (item.children) {
                        children = item.children;
                    }
                }
                ;
                return item;
            }
        }, {
            key: "_getInGabarit",
            value: function _getInGabarit(_ref2) {
                var id = _ref2.id;
                var _ref2$gabarit = _ref2.gabarit;
                var gabarit = _ref2$gabarit === undefined ? this.info.gabarit : _ref2$gabarit;

                console.log(id);
                console.log(gabarit);
                var idArr = id.split(".");
                for (var i = 0; i < idArr.length; i++) {
                    idArr[i];
                }
                ;
                for (var i = 0; i < gabarit.length; i++) {
                    console.log(gabarit[i].id);
                    if (gabarit[i].id == id) {
                        console.log("FOUND");
                        return gabarit[i];
                    } else if (gabarit[i].type == "Group") {
                        console.log("Group", gabarit[i].id);
                        var childrenG = this._getInGabarit({ id: id, gabarit: gabarit[i].children });
                        if (childrenG != null) {
                            return this._getInGabarit({ id: id, gabarit: gabarit[i].children });
                        }
                        ;
                    }
                }
                ;
                return null;
            }
        }, {
            key: "save",
            value: function save(onFinished) {
                this.exporter.exportConfig(onFinished);
            }
        }, {
            key: "preview",
            value: function preview() {
                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                console.log(this);
                alert("not available for this project type");
            }
        }, {
            key: "previewDebug",
            value: function previewDebug() {
                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                alert("not available for this project type");
            }
        }, {
            key: "previewDev",
            value: function previewDev() {
                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                alert("not available for this project type");
            }
        }, {
            key: "updateInternJXDialog",
            value: function updateInternJXDialog() {
                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                alert("not available for this project type");
            }
        }, {
            key: "sendToTest",
            value: function sendToTest() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                alert("not available for this project type");
            }
        }, {
            key: "downloadTest",
            value: function downloadTest() {
                alert("not available for this project type");
            }
        }, {
            key: "previewTest",
            value: function previewTest() {
                alert("not available for this project type");
            }
        }, {
            key: "downloadFullProject",
            value: function downloadFullProject() {
                var _this3 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("buildProjectIntern");
                var options = {
                    date: false,
                    extExclude: [],
                    fileExclude: [],
                    dirExclude: ["\.git"],
                    treeOnly: false,
                    merge: false,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: this.info.url,
                    destPath: "$temp" + this.info.url,
                    options: options
                }, function (result) {
                    console.log("cloneFullProject OK", result);
                    _this3.jx.editor.download({ url: result.destPath, prefixZip: _this3.info.id + "_" + _this3.info.version + "_FULL", internPath: _this3.info.id, date: true });
                    callback(result);
                });
            }
        }, {
            key: "buildProjectIntern",
            value: function buildProjectIntern() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("buildProjectIntern");
                alert("not available for this project type");
                callback();
            }
        }, {
            key: "buildProjectLastReleaseJX",
            value: function buildProjectLastReleaseJX() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                alert("not available for this project type");
                callback();
            }
        }, {
            key: "copyProject",
            value: function copyProject(params, callback) {
                console.log("buildProject");
                var options = {
                    date: true,
                    extExclude: [],
                    fileExclude: [],
                    dirExclude: [],

                    treeOnly: false,
                    merge: false,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: this.info.url,
                    destPath: "$temp" + this.info.url,
                    options: options
                }, function (result) {
                    console.log("buildProject OK", result);
                    callback(result);
                });
            }
        }, {
            key: "exportDial",
            value: function exportDial(appData) {
                var _this4 = this;

                var popupContent = "\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Envoi en Test</h4>\n\t\t\t\t\t\t<div style=\"font-size:14px\">Envoie une publication du projet actuel en Test, visualisable pendant que l'on continue à modifier le projet</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-info btn-lg\" title=\"Envoyer en Test\" id=\"sendToTest\"><span class=\"fa fa-share-square-o\"></span></button>\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" title=\"Télécharger la version actuellement en Test\" id=\"downloadTest\"><span class=\"fa fa-download\"></span></button>\n\t\t\t    \t<div>\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    \n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<h4>Exporter le projet actuel</h4>\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\n\n\t\t\t    <hr>\n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" style=\"width:100%; text-align: left\" title=\"Télécharger tout le dossier du projet\" id=\"downloadFullProject\"><span class=\"fa fa-download\"></span> Tout le dossier du projet</button>\n\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t";
                var popup = this.jx.editor.popup({ title: "Exporter le projet", content: popupContent, buttons: {}, onclose: function onclose(evt) {} });
                $(popup).find(".btn").click(function (evt) {
                    var action = evt.currentTarget.id;
                    switch (action) {
                        case "sendToTest":
                            _this4.jx.editor.popup({ title: "Comfirmation de l'envoi en Test",
                                content: "Attention, cette action va remplacer la version actuellement en Test par la version du projet en cours.\n Etes-vous sûr ?",
                                buttons: {
                                    ok: { label: "Oui" },
                                    no: { label: "Non" }
                                },
                                onclose: function onclose(evt) {
                                    if (evt.action == "ok") {
                                        var popup2 = _this4.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                        _this4.sendToTest(null, function (evt) {
                                            popup2.modal('hide');
                                        });
                                    }
                                }
                            });
                            break;
                        case "buildProjectIntern":
                            var popup2 = _this4.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this4.buildProjectIntern(null, function (evt) {
                                popup2.modal('hide');
                            });
                            break;
                        case "buildProjectLastReleaseJX":
                            var popup2 = _this4.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this4.buildProjectLastReleaseJX(null, function (evt) {
                                popup2.modal('hide');
                            });
                            break;
                        case "downloadFullProject":
                            var popup2 = _this4.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this4.downloadFullProject(null, function (evt) {
                                popup2.modal('hide');
                            });
                            break;
                        default:
                            if (_this4[action]) _this4[action](null, function (evt) {});
                    }
                });
            }
        }]);

        return ProjectUnknow;
    }(_ProjectManager2.default);

    exports.default = ProjectUnknow;
});
//# sourceMappingURL=ProjectUnknow.js.map