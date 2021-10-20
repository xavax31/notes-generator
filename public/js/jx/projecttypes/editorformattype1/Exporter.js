define(["exports", "jx/core/JXObject"], function (exports, _JXObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

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

    var Exporter = function (_JXObject) {
        _inherits(Exporter, _JXObject);

        function Exporter(jx, dataObject) {
            _classCallCheck(this, Exporter);

            var _this = _possibleConstructorReturn(this, (Exporter.__proto__ || Object.getPrototypeOf(Exporter)).call(this, { jx: jx }));

            _this.dataObject = Object.assign({
                url: null,
                projectJXData: null
            }, dataObject);
            _this.projectInfo = _this.dataObject.projectInfo;
            return _this;
        }

        _createClass(Exporter, [{
            key: "exportConfig",
            value: function exportConfig(onFinished) {
                var _this2 = this;

                console.log("gabarit", this.projectInfo.gabarit);
                this.onFinished = onFinished;

                this._exportEditorFiles(function () {
                    _this2._exportModuleFiles(function () {
                        _this2._finish();
                    });
                });
            }
        }, {
            key: "_exportEditorFiles",
            value: function _exportEditorFiles(callback) {
                var fileURL = this.projectInfo.url + "/etc/editor/editor.json";
                this.objectData = {
                    formatJSON: "SimpleJSON2",
                    projectData: this.projectInfo.gabarit
                };
                this.jx.db.saveJSON(fileURL, this.objectData, function () {
                    return callback();
                });
            }
        }, {
            key: "_exportModuleFiles",
            value: function _exportModuleFiles(callback) {
                var fileURL = this.projectInfo.url + "/public/assets/config.json";
                this.objectData = {
                    ProjectInformations: {
                        "id": this.projectInfo.id,
                        "version": this.projectInfo.version,
                        "monitor": {
                            "enabled": false,
                            "popupAlerts": false
                        },
                        "defaultViewType": "CJS",
                        "framerate": "50",
                        "mainCtrl": "src/index"
                    },
                    "entry-point": {}
                };
                this.objectData["entry-point"][this.projectInfo.engine.srcPath] = {
                    "config": {},
                    "defaultViewType": "CJS",
                    "framerate": "50",
                    "resources": this._getResourcesFromGabarit(this.projectInfo.gabarit),
                    "styles": []
                };
                this.jx.db.saveJSON(fileURL, this.objectData, function () {
                    return callback();
                });
            }
        }, {
            key: "_getResourcesFromGabarit",
            value: function _getResourcesFromGabarit(gabarit) {
                var gabaritResources = [];
                if (gabarit != null) {
                    for (var i = 0; i < gabarit.length; i++) {
                        if (gabarit[i].id == "Informations") continue;
                        gabaritResources = gabaritResources.concat(this._getResourcesFromGroup(gabarit[i]));
                    }
                }
                return gabaritResources;
            }
        }, {
            key: "_getResourcesFromGroup",
            value: function _getResourcesFromGroup(group) {
                var gabaritResources = [];
                if (group != null) {
                    var item = null;
                    var itemClone = null;

                    if (group.type == "DataObject") {
                        var dataObject = {};
                    }
                    ;
                    for (var j = 0; j < group.children.length; j++) {
                        item = group.children[j];
                        itemClone = {};
                        for (var prop in item) {
                            itemClone[prop] = item[prop];
                        }
                        delete itemClone.description;
                        delete itemClone.editable;
                        switch (item.type) {
                            case "Sound":
                            case "Image":
                                itemClone.asset = {};
                                for (var prop in item.asset) {
                                    itemClone.asset[prop] = item.asset[prop];
                                }
                                itemClone.asset.id = item.id, itemClone.asset.type = item.type, itemClone.asset.preload = item.asset.preload != undefined ? item.asset.preload : true;
                                console.log("itemClone : ", itemClone.preload, "item : ", item.asset.preload);
                                itemClone.asset.src = "assets/" + item.asset.src;
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.asset;
                                } else {
                                    gabaritResources.push(itemClone.asset);
                                }
                                break;
                            case "Animation":
                                itemClone.asset = {};
                                for (var prop in item.asset) {
                                    itemClone.asset[prop] = item.asset[prop];
                                }
                                itemClone.asset.id = item.id, item.asset.compType = item.type, itemClone.asset.type = item.asset.type, itemClone.asset.preload = item.asset.preload != undefined ? item.asset.preload : true;
                                itemClone.asset.src = "assets/" + item.asset.src;
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.asset;
                                } else {
                                    gabaritResources.push(itemClone.asset);
                                }
                                break;
                            case "Flashtml":
                                itemClone.asset = {};
                                for (var prop in item.asset) {
                                    itemClone.asset[prop] = item.asset[prop];
                                }
                                itemClone.asset.id = item.id, item.asset.compType = item.type, itemClone.asset.type = item.asset.type, itemClone.asset.preload = item.asset.preload != undefined ? item.asset.preload : true;
                                itemClone.asset.src = "assets/" + item.asset.src;
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.asset;
                                } else {
                                    gabaritResources.push(itemClone.asset);
                                }
                                break;
                            case "Text":
                            case "Parameter":
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    gabaritResources.push(itemClone);
                                }
                                break;
                            case "Number":
                                itemClone.value = Number(itemClone.value);
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    gabaritResources.push(itemClone);
                                }
                                break;
                            case "ComboBox":
                                itemClone.type = "*";
                                delete itemClone.options;
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    gabaritResources.push(itemClone);
                                }
                                break;
                            case "Group":
                            case "DataObject":
                                gabaritResources = gabaritResources.concat(this._getResourcesFromGroup(item));
                                break;
                            default:
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    gabaritResources.push(itemClone);
                                }
                                break;
                        }
                    }
                    if (group.type == "DataObject") {
                        gabaritResources.push({ id: group.id, type: "DataObject", value: dataObject });
                    }
                }
                return gabaritResources;
            }
        }, {
            key: "_getKimiTestJson",
            value: function _getKimiTestJson(gabarit) {
                for (var i = 0; i < gabarit.length; i++) {
                    if (gabarit[i].id == "QUIZ") {
                        var quizGroup = gabarit[i];
                    } else if (gabarit[i].id == "PROFILS") {
                        var profilsGroup = gabarit[i];
                    }
                }
                var json = { titre: {}, questions: [], profils: {}, conclusions: {} };
                var question;
                for (var iq = 1; iq <= 10; iq++) {
                    question = { id: iq, text: this._getGroupChildByID(quizGroup, "Q" + this.jx.tools.gd(iq, 2) + "_T").value, answers: [] };
                    for (var ir = 1; ir <= 3; ir++) {
                        question.answers.push({ id: ir, text: this._getGroupChildByID(quizGroup, "Q" + this.jx.tools.gd(iq, 2) + "_R" + this.jx.tools.gd(ir, 2) + "_T").value, good: ir == 1 });
                    }
                    ;
                    json.questions.push(question);
                }
                ;
                json.titre = {
                    text: this._getGroupChildByID(quizGroup, "Title").value,
                    style: { "fontName": "Harimau", "fontStyle": "normal", "fontSize": "30px", "color": "#000000" }, "offset": { "x": 0, "y": 0 }
                };
                for (var ip = 1; ip <= 3; ip++) {
                    json.profils[ip] = this._getGroupChildByID(profilsGroup, "PROFIL_0" + ip + "_T").value;
                    json.conclusions[ip] = this._getGroupChildByID(profilsGroup, "CONCLU_0" + ip).value;
                }
                ;

                this.jx.db.saveText(this.projectData.url + "/public/src/config.js", "var editorGameConfig=" + JSON.stringify(json, null, 4), function () {});
            }
        }, {
            key: "_getGroupChildByID",
            value: function _getGroupChildByID(group, childID) {
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].id == childID) {
                        return group.children[i];
                    }
                }
                ;
                return null;
            }
        }, {
            key: "_finish",
            value: function _finish() {
                this._destroy();
                this.onFinished();
            }
        }, {
            key: "_destroy",
            value: function _destroy() {}
        }]);

        return Exporter;
    }(_JXObject3.default);

    exports.default = Exporter;
});
//# sourceMappingURL=Exporter.js.map