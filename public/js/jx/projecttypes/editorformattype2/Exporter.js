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

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function (resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    var GENERATED_IMPORT = "\n/*EDITOR_START*/\n/* Don't touch this block. It is used and regenated if needed by Editor.\nYou can add custom fonts below this block */\n@import url(\"../assets/fonts/_exported/generated_imports.css\");\n/*EDITOR_END*/\n\n";
    var DONT_TOUCH_FILE = "\n/! Ne pas toucher ce dossier /!\nCe dossier _exported est supprimé et généré par l'éditeur à chaque sauvegarde du projet.\n\nSi nécessaire, des fonts peuvent être importées manuellement en les placant dans le dossier parent assets/fonts et les import @font-face dans le fichier css/fonts.css (à réserver de préférence durant le dev)\n";

    var Exporter = function (_JXObject) {
        _inherits(Exporter, _JXObject);

        function Exporter(jx, dataObject) {
            _classCallCheck(this, Exporter);

            var _this = _possibleConstructorReturn(this, (Exporter.__proto__ || Object.getPrototypeOf(Exporter)).call(this, { jx: jx }));

            _this.dataObject = Object.assign({
                url: null,
                projectJXData: null
            }, dataObject);
            _this.editor = _this.jx.editor;
            _this.projectInfo = _this.dataObject.projectInfo;
            _this.config = {
                exportFormat: "json",
                exportFile: "public/assets/config.json"
            };
            return _this;
        }

        _createClass(Exporter, [{
            key: "exportConfig",
            value: function exportConfig(onFinished) {
                var _this2 = this;

                console.log("gabarit", this.projectInfo.gabarit);
                this.onFinished = onFinished;

                this._exportEditorFiles(function () {
                    _this2._exportFonts(function () {
                        _this2._exportModuleFiles(function () {
                            _this2._finish();
                        });
                    });
                });
            }
        }, {
            key: "_exportEditorFiles",
            value: function _exportEditorFiles(callback) {
                var fileURL = this.projectInfo.url + "/etc/editor/editor.json";
                var objectData = {
                    formatJSON: "SimpleJSON2",
                    projectData: this.projectInfo.gabarit
                };
                this.jx.db.saveJSON(fileURL, objectData, function () {
                    return callback();
                });
            }
        }, {
            key: "_exportModuleFiles",
            value: function _exportModuleFiles(callback) {
                var fileURL = this.projectInfo.url + "/" + this.config.exportFile;
                var objectData = {
                    formatJSON: "SimpleJSON2",
                    projectData: this._getResourcesFromGabarit(this.projectInfo.gabarit)
                };
                try {
                    var jsonObj = JSON.parse(JSON.stringify(objectData));

                    this.jx.db.saveJSON(fileURL, objectData, function () {
                        callback();
                    });
                } catch (err) {
                    alert("Project can't be saved. an error occurs in json: " + err.message);
                }
            }
        }, {
            key: "_exportFonts",
            value: function _exportFonts(callback) {
                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                    var logPrefix, resources, fontsNeeded, i, element, globalFonts, notFoundFonts, fontsToCopy, _loop, _i, globalFontsPath, destPathes, importFontFaces, publicPath, cssPath, assetsPath, destFontsPath, _i2, fileName, destPath, result, toSave, fontsCSS;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    logPrefix = "EXPORT FONTS";

                                    console.log(logPrefix);

                                    console.log(logPrefix, "gabarit", this.projectInfo.gabarit);
                                    resources = this._getResourcesFromGabarit(this.projectInfo.gabarit);

                                    console.log(logPrefix, "resources", resources);
                                    fontsNeeded = [];

                                    for (i = 0; i < resources.length; i++) {
                                        element = resources[i];

                                        if (element.type == "TextStyle" && element.fontsList == "fonts") {
                                            fontsNeeded.push(element.value.fontFamily);
                                        }
                                    }
                                    fontsNeeded = this.jx.tools.arr.removeDouble(fontsNeeded);
                                    console.log(logPrefix, "fontsNeeded", fontsNeeded);
                                    globalFonts = this.jx.editor.getOptionsList().fontsDefs;

                                    console.log(logPrefix, "globalFonts", globalFonts);
                                    notFoundFonts = [];
                                    fontsToCopy = [];

                                    if (!(fontsNeeded.length === 0)) {
                                        _context.next = 16;
                                        break;
                                    }

                                    callback();
                                    return _context.abrupt("return");

                                case 16:
                                    _loop = function _loop(_i) {
                                        var item = fontsNeeded[_i];
                                        var found = globalFonts.filter(function (value, index, array) {
                                            return value.fontFamily == item;
                                        });
                                        if (found.length == 0) {
                                            notFoundFonts.push(item);
                                        } else {
                                            fontsToCopy.push(found[0]);
                                        }
                                    };

                                    for (_i = 0; _i < fontsNeeded.length; _i++) {
                                        _loop(_i);
                                    }
                                    if (notFoundFonts.length > 0) {
                                        this.editor.popup({
                                            title: "Il y'a eu des erreurs lors de l'export",
                                            content: "\n                    Les fontes suivantes, nécessaires au projet, n'ont pas été trouvées.\n                    <br>Les solutions possibles sont au choix :\n                    <br>- Ajouter les fontes manquantes aux fontes globales de l'editeur.\n                    <br>- Choisir une fonte existante\n                    <br><br>\n                " + notFoundFonts.join("<br>")
                                        });
                                    }
                                    globalFontsPath = "/resources/milan-presse/fonts";
                                    destPathes = [];
                                    importFontFaces = "";
                                    publicPath = this.projectInfo.url + "/public";
                                    cssPath = publicPath + "/css";
                                    assetsPath = publicPath + "/assets";
                                    destFontsPath = assetsPath + "/fonts/_exported";
                                    _context.next = 28;
                                    return this.editor.deleteDirPromise(destFontsPath);

                                case 28:
                                    _i2 = 0;

                                case 29:
                                    if (!(_i2 < fontsToCopy.length)) {
                                        _context.next = 40;
                                        break;
                                    }

                                    fileName = fontsToCopy[_i2].fileName;
                                    destPath = destFontsPath + "/" + fileName;
                                    _context.next = 34;
                                    return this.editor.cloneDirPromise({
                                        sourcePath: globalFontsPath + "/" + fileName,
                                        destPath: destPath
                                    });

                                case 34:
                                    result = _context.sent;

                                    destPathes.push({
                                        fileName: fileName,
                                        destPath: destPath
                                    });
                                    importFontFaces += "@import url(\"./" + fileName + "/font.css\");\n            ";

                                case 37:
                                    _i2++;
                                    _context.next = 29;
                                    break;

                                case 40:
                                    console.log(logPrefix, "FONTCOPIED");
                                    _context.next = 43;
                                    return this.jx.db.saveTextPromise(destFontsPath + "/_DONT_TOUCH_.md", DONT_TOUCH_FILE);

                                case 43:
                                    _context.next = 45;
                                    return this.jx.db.saveTextPromise(destFontsPath + "/generated_imports.css", importFontFaces);

                                case 45:
                                    toSave = GENERATED_IMPORT;
                                    _context.next = 48;
                                    return this.jx.db.loadTextPromise(cssPath + "/fonts.css");

                                case 48:
                                    fontsCSS = _context.sent;

                                    console.log(logPrefix, fontsCSS);
                                    if (!fontsCSS.error) {
                                        toSave += fontsCSS.replace(/(?=\/\*EDITOR_START)(.|\n)*?(?<=END\*\/)/g, "").replace(/^(\s)*/, "");
                                    }
                                    _context.next = 53;
                                    return this.jx.db.saveTextPromise(cssPath + "/fonts.css", toSave);

                                case 53:
                                    console.log(fontsCSS);
                                    callback();

                                case 55:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }
        }, {
            key: "_getResourcesFromGabarit",
            value: function _getResourcesFromGabarit(gabarit) {
                var gabaritResources = [];
                if (gabarit != null) {
                    for (var i = 0; i < gabarit.length; i++) {
                        gabaritResources = gabaritResources.concat(this._getResourcesFromGroup(gabarit[i]));
                    }
                }
                return gabaritResources;
            }
        }, {
            key: "_getResourcesFromGroup",
            value: function _getResourcesFromGroup(group) {
                var prefixID = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

                var gabaritResources = [];
                if (group != null) {
                    var item = null;
                    var itemClone = null;

                    if (group.type == "DataObject") {
                        var dataObject = {};
                    }
                    ;
                    var prefixGroup = group.exportType || group.type == "DataGroup" ? prefixID + group.id + "." : prefixID;
                    for (var j = 0; j < group.children.length; j++) {
                        item = group.children[j];
                        if (item.activated == false) continue;
                        itemClone = {};
                        for (var prop in item) {
                            itemClone[prop] = item[prop];
                        }

                        delete itemClone.description;
                        delete itemClone.editable;
                        delete itemClone.visible;
                        delete itemClone.preview;
                        delete itemClone.timestamp;
                        var type = item.exportType || item.type;
                        switch (type) {
                            case "Separator":
                                break;
                            case "Sound":
                            case "Image":
                            case "Video":
                            case "SpriteSheet":
                                itemClone.asset = {};
                                for (var prop in item.asset) {
                                    itemClone.asset[prop] = item.asset[prop];
                                }
                                itemClone.asset.id = prefixGroup + item.id;
                                itemClone.asset.type = type;
                                itemClone.asset.start = item.start;
                                itemClone.asset.end = item.end;
                                itemClone.asset.preload = item.asset.preload != undefined ? item.asset.preload : true;

                                itemClone.asset.src = "assets/" + item.asset.src;
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.asset;
                                } else {
                                    gabaritResources.push(itemClone.asset);
                                }
                                break;
                            case "ImageSequence":
                                itemClone.asset = {};
                                for (var prop in item.asset) {
                                    itemClone.asset[prop] = item.asset[prop];
                                }
                                itemClone.asset.id = prefixGroup + item.id, itemClone.asset.type = type, itemClone.asset.preload = item.asset.preload != undefined ? item.asset.preload : true;
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
                                itemClone.asset.id = prefixGroup + item.id, item.asset.compType = type, itemClone.asset.type = item.asset.type, itemClone.asset.preload = item.asset.preload != undefined ? item.asset.preload : true;
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
                                    itemClone.id = prefixGroup + itemClone.id;
                                    gabaritResources.push(itemClone);
                                }
                                break;
                            case "Number":
                                itemClone.value = Number(itemClone.value);
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    itemClone.id = prefixGroup + itemClone.id;
                                    gabaritResources.push(itemClone);
                                }
                                break;
                            case "ComboBox":
                                itemClone.type = "*";
                                delete itemClone.options;
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    itemClone.id = prefixGroup + itemClone.id;
                                    gabaritResources.push(itemClone);
                                }
                                break;
                            case "class":
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    delete itemClone.value;
                                    delete itemClone.data;
                                    itemClone.id = prefixGroup + itemClone.id;
                                    gabaritResources.push(itemClone);
                                }
                                break;
                            case "Group":
                            case "DataObject":
                            case "DataGroup":
                                gabaritResources = gabaritResources.concat(this._getResourcesFromGroup(item, prefixGroup));
                                break;
                            default:
                                if (group.type == "DataObject") {
                                    dataObject[item.id] = itemClone.value;
                                } else {
                                    itemClone.id = prefixGroup + itemClone.id;
                                    gabaritResources.push(itemClone);
                                }
                        }
                    }
                    if (group.type == "DataObject") {
                        var preload = group.preload != undefined ? group.preload : false;
                        gabaritResources.push({ id: prefixID + group.id, type: "DataObject", value: dataObject, preload: preload });
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

                this.jx.db.saveText(this.projectInfo.url + "/public/src/config.js", "var editorGameConfig=" + JSON.stringify(json, null, 4), function () {});
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