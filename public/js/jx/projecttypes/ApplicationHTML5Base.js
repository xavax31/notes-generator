define(["exports", "jx/projecttypes/ProjectManager"], function (exports, _ProjectManager) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ProjectManager2 = _interopRequireDefault(_ProjectManager);

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

    var ApplicationHTML5Base = function (_ProjetManager) {
        _inherits(ApplicationHTML5Base, _ProjetManager);

        function ApplicationHTML5Base(dataObject) {
            _classCallCheck(this, ApplicationHTML5Base);

            return _possibleConstructorReturn(this, (ApplicationHTML5Base.__proto__ || Object.getPrototypeOf(ApplicationHTML5Base)).call(this, dataObject));
        }

        _createClass(ApplicationHTML5Base, [{
            key: "_create",
            value: function _create() {
                console.log("ApplicationHTML5Base create");
                _get(ApplicationHTML5Base.prototype.__proto__ || Object.getPrototypeOf(ApplicationHTML5Base.prototype), "_create", this).call(this);
                this._functionnalities.push("preview", "previewDebug");
                this.info.url = this.dataObject.url;
                this.info.projectURL = this.dataObject.url;
                this.info.projectJXData = this.dataObject.projectJXData;
                this.testURL = "/builds" + this.info.url;
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
            key: "load",
            value: function load(onFinished) {
                var _this2 = this;

                this.importer.importConfig(function (projectData) {
                    console.log("config imported", _this2);
                    _this2.json = projectData.gabaritJSON;
                    _this2.jx.tools.mergeObjectIn(_this2.info, projectData.projectInformations.project);
                    _this2.info.engine = projectData.projectInformations.engine;
                    _this2.info.gabarit = projectData.modules[0].gabarit;
                    onFinished({ target: _this2 });
                });
            }
        }, {
            key: "save",
            value: function save(onFinished) {
                this.exporter.exportConfig(onFinished);
            }
        }, {
            key: "preview",
            value: function preview() {
                var _this3 = this;

                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                console.log(this);
                this.generateHTMLPage({
                    name: "index", title: this.info.id,
                    jxVersion: "intern", destDir: this.info.url + "/public", debug: false
                }, function (evt) {
                    _this3.jx.tools.openURL(_this3.info.url + "/public" + (rid ? "/?rid=" + rid : ""), rid || _this3.info.id);
                });
            }
        }, {
            key: "previewDebug",
            value: function previewDebug() {
                var _this4 = this;

                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                this.generateHTMLPage({
                    name: "index_debug", title: this.info.id + "_DEBUG",
                    jxVersion: "intern", destDir: this.info.url + "/public", debug: true
                }, function (evt) {
                    _this4.jx.tools.openURL(_this4.info.url + "/public/?debug=true" + (rid ? "/&rid=" + rid : ""), rid || _this4.info.id);
                });
            }
        }, {
            key: "previewDev",
            value: function previewDev() {
                var _this5 = this;

                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                this.generateHTMLPage({
                    name: "index_dev", title: this.info.id + "_DEV",
                    jxVersion: "last_release", destDir: this.info.url + "/public", debug: true
                }, function (evt) {
                    _this5.jx.tools.openURL(_this5.info.url + "/public/index_dev.html?debug=true" + (rid ? "&rid=" + rid : ""), rid || _this5.info.id);
                });
            }
        }, {
            key: "updateInternJXDialog",
            value: function updateInternJXDialog() {
                var _this6 = this;

                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                this.jx.editor.popup({
                    title: "Update Jx version of this project",
                    content: "This will replace intern version of jx with the last release. This is irreversible. Make sure to test and validate this update before by using preview dev button<br>",
                    buttons: {
                        ok: { label: "Run" },
                        close: { label: "Close" }
                    },
                    onclose: function onclose(evt) {
                        if (evt.action == "ok") {
                            _this6.updateInternJX(function (evt) {
                                _this6.jx.editor.popup({ title: "Message", content: "JX version updated", onclose: callback });
                            });
                        }
                    }
                });
            }
        }, {
            key: "updateInternJX",
            value: function updateInternJX() {
                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                console.log("updateInternJX");
                var versionFramework = "last_release";
                var mode = versionFramework.split(":")[0];
                var pathFramework;
                var pathFrameworkLibs;
                var jxPath;
                switch (mode) {
                    case "intern":
                        pathFrameworkLibs = "js/lib";
                        jxPath = "js/jx";
                        break;
                    case "last_release":
                        pathFramework = "/dev/mp-framework/current";
                        pathFrameworkLibs = "/dev/mp-framework/current/lib";
                        jxPath = "/dev/mp-framework/current/engine/build/jx";
                        break;
                    case "last_dev":
                        pathFrameworkLibs = "/dev/mp-framework/develop/lib";
                        jxPath = "/dev/mp-framework/develop/engine/build/jx";
                        break;
                }
                this.jx.editor.host.callMethod("updateInternJX", { filename: this.info.url, pathFramework: pathFramework }, function (result) {
                    console.log("updateInternJX OK", result);
                    callback(result);
                });
            }
        }, {
            key: "generateHTMLPage",
            value: function generateHTMLPage(_ref3) {
                var _this7 = this;

                var _ref3$name = _ref3.name;
                var name = _ref3$name === undefined ? "page" : _ref3$name;
                var _ref3$title = _ref3.title;
                var title = _ref3$title === undefined ? "App" : _ref3$title;
                var _ref3$destDir = _ref3.destDir;
                var destDir = _ref3$destDir === undefined ? null : _ref3$destDir;
                var _ref3$jxVersion = _ref3.jxVersion;
                var jxVersion = _ref3$jxVersion === undefined ? "intern" : _ref3$jxVersion;
                var _ref3$debug = _ref3.debug;
                var debug = _ref3$debug === undefined ? false : _ref3$debug;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                var pathFrameworkLibs, jxPath, mode;
                console.log("adaptIndexHTMLPage", jxVersion);
                switch (jxVersion) {
                    case "intern":
                        mode = "prod";
                        pathFrameworkLibs = "js/lib";
                        jxPath = "jx";
                        break;
                    case "last_release":
                        mode = "dev";
                        pathFrameworkLibs = "/dev/mp-framework/current/lib";
                        jxPath = "/dev/mp-framework/current/engine/build/jx";
                        break;
                    case "last_dev":
                        mode = "dev";
                        pathFrameworkLibs = "/dev/mp-framework/develop/lib";
                        jxPath = "/dev/mp-framework/develop/engine/build/jx";
                        break;
                }
                var mainCtrlSrc = "js/src/index.js";
                this.jx.db.addAndLoad({ id: "ApplicationHTML5_template", type: "Text", src: this.info.url + "/public/index_template.html" }, function (result) {
                    console.log(_this7.jx.db.log());
                    var template = result.resourcesArr[0];
                    if (!template.data) {
                        console.log("no index_template found");
                        callback({ url: null });
                        return;
                    }
                    ;
                    var pageIndex = template.data.replace(/\$\{pathFrameworkLibs\}/g, pathFrameworkLibs).replace(/\$\{jxPath\}/g, jxPath).replace(/\$\{mainCtrlSrc\}/g, mainCtrlSrc).replace(/\$\{mode\}/g, mode).replace(/\$\{debug\}/g, debug).replace(/\$\{title\}/g, title);
                    console.log(pageIndex);
                    var generatedURL = (destDir ? destDir + "/" : _this7.info.url + "/public/") + name + ".html";
                    _this7.jx.db.saveText(generatedURL, pageIndex, function (evt) {
                        console.log(evt);
                        callback({ url: generatedURL });
                    });
                });
            }
        }, {
            key: "adaptIndexHTMLPage",
            value: function adaptIndexHTMLPage() {
                var _this8 = this;

                var versionFramework = this.info.engine["jxVersion"];
                var mode = versionFramework.split(":")[0];
                var pathFrameworkLibs;
                var jxPath;
                console.log("adaptIndexHTMLPage", mode);
                switch (mode) {
                    case "intern":
                        pathFrameworkLibs = "js/lib";
                        jxPath = "jx";
                        break;
                    case "last_release":
                        pathFrameworkLibs = "/dev/mp-framework/current/lib";
                        jxPath = "/dev/mp-framework/current/engine/build/jx";
                        break;
                    case "last_dev":
                        pathFrameworkLibs = "/dev/mp-framework/develop/lib";
                        jxPath = "/dev/mp-framework/develop/engine/build/jx";
                        break;
                }
                var versionCodeApp = this.info["appCodeVersion"];
                var mode = versionCodeApp.split(":")[0];
                var mainCtrlSrc;

                switch (mode) {
                    case "intern":
                        mainCtrlSrc = "js/src/index.js";
                        break;
                    case "last_release":
                        mainCtrlSrc = "/archives/milan-presse/moteurs/mini-quiz/master/public/src/index.js";
                        break;
                    case "last_dev":
                        mainCtrlSrc = "/archives/milan-presse/moteurs/mini-quiz/develop/public/src/index.js";
                        break;
                }
                this.jx.db.loadText(this.info.url + "/public/index_template.html", function (evt) {
                    var pageIndex = evt.replace(/\$\{pathFrameworkLibs\}/g, pathFrameworkLibs).replace(/\$\{jxPath\}/g, jxPath).replace(/\$\{mainCtrlSrc\}/g, mainCtrlSrc);
                    console.log(pageIndex);
                    _this8.jx.db.saveText(_this8.info.url + "/public/index.html", pageIndex, function (evt) {
                        console.log(evt);
                    });
                });
            }
        }, {
            key: "_generateHTMLPages",
            value: function _generateHTMLPages(_ref4) {
                var _this9 = this;

                var _ref4$destDir = _ref4.destDir;
                var destDir = _ref4$destDir === undefined ? null : _ref4$destDir;
                var _ref4$jxVersion = _ref4.jxVersion;
                var jxVersion = _ref4$jxVersion === undefined ? "intern" : _ref4$jxVersion;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                this.generateHTMLPage({ name: "index", title: this.info.id, jxVersion: jxVersion, destDir: destDir, debug: false }, function (evt) {
                    _this9.generateHTMLPage({ name: "index_debug", title: _this9.info.id + "_DEBUG", jxVersion: jxVersion, destDir: destDir, debug: true }, function (evt) {
                        return callback();
                    });
                });
            }
        }, {
            key: "sendToTest",
            value: function sendToTest() {
                var _this10 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("sendToTest");
                var options = {
                    date: true,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],
                    treeOnly: false,
                    merge: false,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: this.info.url + "/public",
                    destPath: this.testURL,
                    options: options
                }, function (result) {
                    console.log("buildProject OK", result);
                    _this10._generateHTMLPages({ destDir: result.destPath, jxVersion: "intern" }, function (evt) {
                        return callback();
                    });
                });
            }
        }, {
            key: "downloadTest",
            value: function downloadTest() {
                this.jx.editor.download({ url: this.testURL, prefixZip: this.info.id + "_TEST", internPath: this.info.id, date: true });
            }
        }, {
            key: "previewTest",
            value: function previewTest() {
                this.jx.tools.openURL(this.testURL, "TEST_" + this.info.id);
            }
        }, {
            key: "downloadFullProject",
            value: function downloadFullProject() {
                var _this11 = this;

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
                    _this11.jx.editor.download({ url: result.destPath, prefixZip: _this11.info.id + "_" + _this11.info.version + "_FULL", internPath: _this11.info.id, date: true });
                    callback(result);
                });
            }
        }, {
            key: "buildProjectIntern",
            value: function buildProjectIntern() {
                var _this12 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("buildProjectIntern");
                var options = {
                    date: true,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^index_", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],
                    treeOnly: false,
                    merge: false,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: this.info.url + "/public",
                    destPath: "$temp" + this.info.url,
                    options: options
                }, function (result) {
                    _this12._generateHTMLPages({ destDir: result.destPath, jxVersion: "intern" }, function (evt) {
                        _this12.jx.editor.download({ url: result.destPath, prefixZip: _this12.info.id + "_v" + _this12.info.version, internPath: _this12.info.id, date: true });
                        callback(result);
                    });
                });
            }
        }, {
            key: "buildProjectLastReleaseJX",
            value: function buildProjectLastReleaseJX() {
                var _this13 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("buildProjectLastReleaseJX");
                var options = {
                    date: true,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^index_", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],
                    treeOnly: false,
                    merge: false,
                    deleteSource: false,
                    recursive: 10000 };
                var optionsJX = {
                    date: false,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^index_", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],
                    treeOnly: false,
                    merge: true,
                    deleteSource: false,
                    recursive: 10000 };
                var optionsLibs = {
                    date: false,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^index_", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],
                    treeOnly: false,
                    merge: true,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: this.info.url + "/public",
                    destPath: "$temp" + this.info.url,
                    options: options
                }, function (result) {
                    var destPath = result.destPath;
                    _this13.jx.editor.cloneDir({
                        sourcePath: "$bobaLastRelease/engine/build",
                        destPath: destPath + "/js",
                        options: optionsJX
                    }, function (result) {
                        _this13.jx.editor.cloneDir({
                            sourcePath: "$bobaLastRelease/lib",
                            destPath: destPath + "/js/lib",
                            options: optionsLibs
                        }, function (result) {
                            console.log("buildProject OK", result);
                            _this13._generateHTMLPages({ destDir: destPath, jxVersion: "intern" }, function (evt) {
                                _this13.jx.editor.download({ url: destPath, prefixZip: _this13.info.id + "_v" + _this13.info.version + "_LAST_JX", internPath: _this13.info.id, date: true });
                                callback(result);
                            });
                        });
                    });
                });
            }
        }, {
            key: "buildProject2",
            value: function buildProject2(params, callback) {
                var _this14 = this;

                console.log("buildProject");
                var paramsCloneProject = {
                    date: true,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^index_", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],

                    treeOnly: false,
                    merge: false,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: this.info.url,
                    destPath: "$temp" + this.info.url,
                    options: paramsCloneProject
                }, function (result) {
                    console.log("buildProject OK", result);
                    _this14.jx.editor.download({ url: result.destPath, prefixZip: _this14.info.id, internPath: _this14.info.id, date: true });
                    callback(result);
                });
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
                var _this15 = this;

                var popupContent = "\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Envoi en Test</h4>\n\t\t\t\t\t\t<div style=\"font-size:14px\">Envoie une publication du projet actuel en Test, visualisable pendant que l'on continue à modifier le projet</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-info btn-lg\" title=\"Envoyer en Test\" id=\"sendToTest\"><span class=\"fa fa-share-square-o\"></span></button>\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" title=\"Visualiser la version actuellement en Test\" id=\"previewTest\"><span class=\"fa fa-eye\"></span></button>\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" title=\"Télécharger la version actuellement en Test\" id=\"downloadTest\"><span class=\"fa fa-download\"></span></button>\n\t\t\t    \t<div>\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    \n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<h4>Exporter le projet actuel</h4>\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-success\" style=\"width:100%; text-align: left\" title=\"Télécharger une publication du projet\" id=\"buildProjectIntern\"><span class=\"fa fa-download\"></span> Publication du projet</button>\n\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" style=\"width:100%; text-align: left\" title=\"Télécharger tout le dossier du projet\" id=\"downloadFullProject\"><span class=\"fa fa-download\"></span> Tout le dossier du projet</button>\n\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t";
                var popup = this.jx.editor.popup({ title: "Exporter le projet", content: popupContent, buttons: {}, onclose: function onclose(evt) {} });
                $(popup).find(".btn").click(function (evt) {
                    var action = evt.currentTarget.id;
                    switch (action) {
                        case "sendToTest":
                            _this15.jx.editor.popup({ title: "Comfirmation de l'envoi en Test",
                                content: "Attention, cette action va remplacer la version actuellement en Test par la version du projet en cours.\n Etes-vous sûr ?",
                                buttons: {
                                    ok: { label: "Oui" },
                                    no: { label: "Non" }
                                },
                                onclose: function onclose(evt) {
                                    if (evt.action == "ok") {
                                        var popup2 = _this15.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                        _this15.sendToTest(null, function (evt) {
                                            popup2.modal('hide');
                                        });
                                    }
                                }
                            });
                            break;
                        case "buildProjectIntern":
                            var popup2 = _this15.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this15.buildProjectIntern(null, function (evt) {
                                popup2.modal('hide');
                            });
                            break;
                        case "buildProjectLastReleaseJX":
                            var popup2 = _this15.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this15.buildProjectLastReleaseJX(null, function (evt) {
                                popup2.modal('hide');
                            });
                            break;
                        case "downloadFullProject":
                            var popup2 = _this15.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this15.downloadFullProject(null, function (evt) {
                                popup2.modal('hide');
                            });
                            break;
                        default:
                            if (_this15[action]) _this15[action](null, function (evt) {});
                    }
                });
            }
        }]);

        return ApplicationHTML5Base;
    }(_ProjectManager2.default);

    exports.default = ApplicationHTML5Base;
});
//# sourceMappingURL=ApplicationHTML5Base.js.map