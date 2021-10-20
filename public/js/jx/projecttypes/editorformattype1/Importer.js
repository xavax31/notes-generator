define(["exports", "jx/core/JXObject", "jx/core/Resource", "jx/core/dataobjects/ProjectData", "jx/core/dataobjects/ModuleData"], function (exports, _JXObject2, _Resource, _ProjectData, _ModuleData) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

    var _Resource2 = _interopRequireDefault(_Resource);

    var _ProjectData2 = _interopRequireDefault(_ProjectData);

    var _ModuleData2 = _interopRequireDefault(_ModuleData);

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

    var Importer = function (_JXObject) {
        _inherits(Importer, _JXObject);

        function Importer(jx, dataObject) {
            _classCallCheck(this, Importer);

            var _this = _possibleConstructorReturn(this, (Importer.__proto__ || Object.getPrototypeOf(Importer)).call(this, { jx: jx }));

            _this.dataObject = Object.assign({
                url: null,
                projectJXData: null
            }, dataObject);
            console.log(_this.dataObject);
            _this.projectType = _this.dataObject.projectJXData.projectType;
            _this.projectData = new _ProjectData2.default();
            _this.projectData.url = _this.dataObject.url;
            return _this;
        }

        _createClass(Importer, [{
            key: "importConfig",
            value: function importConfig(onFinished) {
                var _this2 = this;

                this.jx.editor.popup({ title: "Comfirmation de conversion",
                    content: "Ce projet doit être converti pour la nouvelle version de l'éditeur. Seul le fichier editor.json et project.jx sont adaptés (les dossiers public et le src de l'application non sont pas modifiés)",
                    buttons: {
                        ok: { label: "Convertir" },
                        no: { label: "Annuler" }
                    },
                    onclose: function onclose(evt) {
                        if (evt.action == "ok") {
                            _this2.onFinished = onFinished;
                            _this2._loadJson();
                        } else {
                            window.close();
                        }
                    } });
            }
        }, {
            key: "_loadJson",
            value: function _loadJson() {
                var _this3 = this;

                this.json = null;
                this.jx.db.addResources({ id: 'editorJSON', type: "json", src: this.projectData.url + "/etc/editor/editor.json" });
                this.jx.db.load({ id: 'editorJSON' }, function (evt) {
                    var jsonResource = _this3.jx.db.findOne({ id: 'editorJSON' });
                    if (!jsonResource || !jsonResource.data) {
                        _this3.jx.debug.warn("editor.json doesn't exist or is broken");
                        _this3.jx.editor.popup({ title: "Error", content: "editor.json doesn't exist or is broken" });
                        return;
                    }
                    _this3.json = jsonResource.data;
                    _this3._jsonAnalyse();
                }, {
                    reload: true
                });
            }
        }, {
            key: "_jsonAnalyse",
            value: function _jsonAnalyse() {
                var _this4 = this;

                var projInfo = this.json["ProjectInformations"];

                this.moduleJSON = this.json["entry-point"][this._getEntryPointPath()];
                var moduleData = new _ModuleData2.default();
                moduleData.srcPath = this._getEntryPointPath();
                moduleData.resources = this._getResources();
                moduleData.styles = this._getStyles();
                moduleData.gabarit = this._getGabarit();
                for (var i = 0; i < moduleData.gabarit.length; i++) {
                    if (moduleData.gabarit[i].id == "Informations") {
                        moduleData.gabarit.splice(i, 1);
                    }
                }
                ;
                var projectGroupChildren = [{
                    "id": "Informations",
                    "type": "DataObject",
                    "children": [{
                        "id": "project",
                        "type": "ProjectInformation",
                        "description": "Configuration globale du projet",
                        "value": {
                            "id": projInfo.id,
                            "type": "ApplicationBabelHTML5OldFormat",
                            "description": "",
                            "version": projInfo.version,
                            "appCodeVersion": "intern: src v1.0",
                            "gitRepository": "",
                            "status": "done",
                            "dateValidation": "",
                            "dateGabarit": "",
                            "devNumDaysCode": 0,
                            "dateBeta": "",
                            "devNumDaysDebug": 0,
                            "dateRelease": "",
                            "datePublication": "",
                            "devNumDaysCleanup": 0,
                            "publication": "all",
                            "Langues": "fr",
                            "Doc": "<a href='url.com' target='_blank' >Doc Moteur</a> ",
                            "BugReport": "<a href='url.com' target='_blank' >Bug Report link</a>"
                        }
                    }, {
                        "id": "engine",
                        "type": "JXEngineInformation",
                        "description": "Configuration liée à la technologie utilisée (cf project.type)",
                        "value": {
                            "type": "jx-engine",
                            "jxVersion": "intern: src/jx v0.9",
                            "modulePath": ".",
                            "mainCtrl": "index",
                            "srcPath": "js/src",
                            "defaultViewType": "CJS",
                            "screenRatio": "auto",
                            "framerate": 50
                        }
                    }]
                }, {
                    "id": "Resources",
                    "type": "Group",
                    "visible": "admin,dev",
                    "children": moduleData.resources
                }, {
                    "id": "Scenario",
                    "type": "Group",
                    "children": [{
                        "id": "ScenarioFile",
                        "type": "FileItem",
                        "description": "scenar",
                        "asset": {
                            "type": "PDF",
                            "src": "doc/JEU01.pdf"
                        },
                        "visible": true,
                        "editable": true
                    }, {
                        "id": "Commentaires",
                        "type": "Text",
                        "editable": true,
                        "description": "Décrire ici les modifications souhaitées par rapport au modèle actuel.",
                        "value": "",
                        "visible": true
                    }]
                }, {
                    "id": "Configuration",
                    "type": "DataObject",
                    "description": "Contient les paramêtres propre à cette application.",
                    "children": []
                }];
                var projectInfos = {};
                for (var i = 0; i < projectGroupChildren.length; i++) {
                    projectInfos[projectGroupChildren[i].id] = projectGroupChildren[i].value;
                }
                ;
                this.projectData.projectInformations = projectInfos;
                moduleData.gabarit = projectGroupChildren.concat(moduleData.gabarit).concat(moduleData.styles);
                console.log(moduleData.gabarit);

                var newGabarit = {
                    "formatJSON": "SimpleJSON2",
                    "projectData": moduleData.gabarit
                };
                var projectJX = {
                    "projectType": "ApplicationBabelHTML5OldFormat"
                };
                console.log(newGabarit);
                this._applyPatch(this.projectData.url, "$bobaLastRelease/patches/fromv0.9", function (evt) {
                    _this4.jx.db.saveJSON(_this4.projectData.url + "/project.jx", projectJX, function (evt) {
                        _this4.jx.db.saveJSON(_this4.projectData.url + "/etc/editor/editor.json", newGabarit, function (evt) {
                            _this4.jx.editor.reloadWindow();
                        });
                    });
                });
            }
        }, {
            key: "_applyPatch",
            value: function _applyPatch(destURL, patchURL, callback) {
                console.log("buildProjectLastReleaseJX");
                var options = {
                    date: false,
                    extExclude: [],
                    fileExclude: [],
                    dirExclude: [],
                    treeOnly: false,
                    merge: true,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: patchURL,
                    destPath: destURL,
                    options: options
                }, function (result) {
                    callback();
                });
            }
        }, {
            key: "_finish",
            value: function _finish() {
                this._destroy();
                this.onFinished(this.projectData);
            }
        }, {
            key: "_destroy",
            value: function _destroy() {}
        }, {
            key: "_getResources",
            value: function _getResources() {
                var resourceInfos = this.moduleJSON["resources"];
                var resourceArray = [];
                for (var i = 0; i < resourceInfos.length; i++) {
                    var resourceInfo = resourceInfos[i];
                    var resource = new _Resource2.default(resourceInfo);
                    resourceArray.push(resource);
                }
                return resourceArray;
            }
        }, {
            key: "_getStyles",
            value: function _getStyles() {
                return this.moduleJSON["styles"] || [];
            }
        }, {
            key: "_getGabarit",
            value: function _getGabarit() {
                var gabarit = this.moduleJSON["gabarit"] || [];
                var anims = this._findInGabarit(gabarit, { type: "Animation" });
                console.log(anims);
                for (var i = 0; i < anims.length; i++) {
                    anims[i].type = "Flashtml";
                }
                ;
                console.log(gabarit);
                return gabarit;
            }
        }, {
            key: "_getEntryPointPath",
            value: function _getEntryPointPath() {
                for (var modulejsonName in this.json["entry-point"]) {
                    return modulejsonName;
                    break;
                }
            }
        }, {
            key: "_findInGabarit",
            value: function _findInGabarit(gabarit, request) {
                var founded;
                var results = [];
                for (var i = 0; i < gabarit.length; i++) {
                    founded = true;
                    for (var prop in request) {
                        if (request[prop] != gabarit[i][prop]) {
                            founded = false;
                            break;
                        }
                    }
                    if (founded) {
                        results.push(gabarit[i]);
                    }
                    if (gabarit[i].children) {
                        results = results.concat(this._findInGabarit(gabarit[i].children, request));
                    }
                    ;
                }
                ;
                return results;
            }
        }]);

        return Importer;
    }(_JXObject3.default);

    exports.default = Importer;
});
//# sourceMappingURL=Importer.js.map