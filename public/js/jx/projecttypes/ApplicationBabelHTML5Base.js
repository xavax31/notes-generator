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

    var ApplicationBabelHTML5Base = function (_ProjetManager) {
        _inherits(ApplicationBabelHTML5Base, _ProjetManager);

        function ApplicationBabelHTML5Base(dataObject) {
            _classCallCheck(this, ApplicationBabelHTML5Base);

            return _possibleConstructorReturn(this, (ApplicationBabelHTML5Base.__proto__ || Object.getPrototypeOf(ApplicationBabelHTML5Base)).call(this, dataObject));
        }

        _createClass(ApplicationBabelHTML5Base, [{
            key: "_create",
            value: function _create() {
                console.log("ApplicationBabelHTML5Base create");
                _get(ApplicationBabelHTML5Base.prototype.__proto__ || Object.getPrototypeOf(ApplicationBabelHTML5Base.prototype), "_create", this).call(this);
                this._functionnalities.push("previewDev", "preview", "previewDebug", "transpilProject", "updateInternJX", "showVersion", "compareJSON");
                this.info.url = this.dataObject.url;
                this.info.projectURL = this.dataObject.url;
                this.info.projectJXData = this.dataObject.projectJXData;
                this.testURL = "/builds" + this.info.url;
                this.azoomeeBuildURL = "/builds/azoomee" + this.info.url;
                this.azoomeeDefaultServerURL = "https://milan-ressources.com/multimedia/DEMOS_BAYAM/Azoomee";
                this._bayamTestOpts = {
                    url: "/builds/bayam",
                    prefix: "link",
                    numBubbles: 11
                };
                this.json = null;
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
                    if (!item) {
                        console.warn("getInGabarit", id, "not correct");
                    } else if (item.children) {
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
                var screen = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                var url = this.info.url + "/public/?d=a" + (rid ? "&rid=" + rid : "") + (screen ? "&screen=" + screen : "");
                var id = rid || this.info.id;
                this.generateHTMLPage({
                    name: "index", title: this.info.id,
                    jxVersion: "intern", destDir: this.info.url + "/public", debug: false,
                    usejxMinified: true
                }, function (evt) {
                    _this3.jx.tools.openURL(url, id);
                });
                if (this.jx.config.system.container.type == "browser" && this.jx.config.system.device.support == "mobile") {
                    this.jx.tools.openURL(url, id);
                }
                ;
            }
        }, {
            key: "previewDebug",
            value: function previewDebug() {
                var _this4 = this;

                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                var url = this.info.url + "/public/index_debug.html?jxsrc=true" + (rid ? "&rid=" + rid : "");
                var id = rid || this.info.id;
                this.generateHTMLPage({
                    name: "index_debug", title: this.info.id + "_DEBUG",
                    jxVersion: "intern", destDir: this.info.url + "/public", debug: true
                }, function (evt) {
                    _this4.jx.tools.openURL(url, id);
                });
                if (this.jx.config.system.container.type == "browser" && this.jx.config.system.device.support == "mobile") {
                    this.jx.tools.openURL(url, id);
                }
                ;
            }
        }, {
            key: "previewDev",
            value: function previewDev() {
                var _this5 = this;

                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                var url = this.info.url + "/public/index_dev.html?debug=true&jxsrc=true" + (rid ? "&rid=" + rid : "");
                var id = rid || this.info.id;
                this.generateHTMLPage({
                    name: "index_dev", title: this.info.id + "_DEV",
                    jxVersion: "last_release", destDir: this.info.url + "/public", debug: true
                }, function (evt) {
                    _this5.jx.tools.openURL(url, id);
                });
                if (this.jx.config.system.container.type == "browser" && this.jx.config.system.device.support == "mobile") {
                    this.jx.tools.openURL(url, id);
                }
                ;
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
                            var popup2 = _this6.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this6.updateInternJX(function (evt) {
                                popup2.modal('hide');
                                _this6.jx.editor.popup({ title: "Message", content: "JX version updated", onclose: callback });
                            });
                        }
                    }
                });
            }
        }, {
            key: "updateInternJX",
            value: function updateInternJX() {
                var _this7 = this;

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
                    _this7.jx.editor.getCurrentCommit({ url: "$bobaLastRelease" }, function (evt) {
                        console.log("GIT", evt);
                        _this7.jx.editor.saveText(_this7.info.url + "/public/jxversion.json", JSON.stringify(evt));
                        callback(result);
                    });
                });
            }
        }, {
            key: "getEngineVersionDial",
            value: function getEngineVersionDial() {
                var _this8 = this;

                this.getEngineVersion(function (result) {
                    _this8.jx.editor.popup({ title: "Version", content: result });
                });
            }
        }, {
            key: "getEngineVersion",
            value: function getEngineVersion(callback) {
                var _this9 = this;

                var getDiff = false;
                this.jx.db.loadText(this.info.url + "/public/jxversion.json", function (evt) {
                    var projectJXVersion = evt ? JSON.parse(evt) : null;
                    _this9.jx.editor.getCurrentCommit({ url: "$bobaLastRelease" }, function (evt) {
                        console.log("GIT", evt);
                        var currentJXVersion = evt;
                        var outputStr = "";
                        outputStr += "Used engine : ";
                        if (projectJXVersion) {
                            var interval = new Date(currentJXVersion.date).getTime() - new Date(projectJXVersion.date).getTime();
                            if (interval == 0) {
                                outputStr += " <span class='text-success'>UPDATED</span>\n";
                            } else if (interval > 0) {
                                outputStr += " <span class='text-danger'>NOT UPDATED</span>\n";
                                getDiff = true;
                            } else if (interval < 0) {
                                outputStr += " More recent than current, check current version\n";
                            }
                            outputStr += JSON.stringify(projectJXVersion, null, 4);
                        } else {
                            outputStr += "none";
                        }
                        outputStr += "<br>Current engine : ";
                        outputStr += JSON.stringify(currentJXVersion, null, 4);
                        if (getDiff) {
                            console.log("GITDIFF", projectJXVersion.commit, currentJXVersion.commit);
                            _this9.jx.editor.getGitDiff({ url: "$bobaLastRelease", date: projectJXVersion.date }, function (evt) {
                                outputStr += "<br><br>Log : <br><br>";
                                outputStr += evt.log;

                                callback(outputStr.replace(/\n/g, "<br>").replace(/commit ([0-9a-f]{8,})/g, "<span style='color:#87A3E3'>Commit $1</span>"));
                            });
                        } else {
                            callback(outputStr.replace(/\n/g, "<br>").replace(/\[31m/g, "<span style='color:red'>").replace(/\[m/g, "</span>"));
                        }
                    });
                });
            }
        }, {
            key: "generateHTMLPage",
            value: function generateHTMLPage(_ref3) {
                var _this10 = this;

                var _ref3$name = _ref3.name;
                var name = _ref3$name === undefined ? "page" : _ref3$name;
                var _ref3$title = _ref3.title;
                var title = _ref3$title === undefined ? "App" : _ref3$title;
                var _ref3$destDir = _ref3.destDir;
                var destDir = _ref3$destDir === undefined ? null : _ref3$destDir;
                var _ref3$jxVersion = _ref3.jxVersion;
                var jxVersion = _ref3$jxVersion === undefined ? "intern" : _ref3$jxVersion;
                var _ref3$context = _ref3.context;
                var context = _ref3$context === undefined ? "" : _ref3$context;
                var _ref3$debug = _ref3.debug;
                var debug = _ref3$debug === undefined ? false : _ref3$debug;
                var _ref3$usejxMinified = _ref3.usejxMinified;
                var usejxMinified = _ref3$usejxMinified === undefined ? false : _ref3$usejxMinified;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                var pathFrameworkLibs, jxPath, mode, pathJXLauncher;

                var jxMinifyFromConfig = this.info.engine.jxMinify == undefined ? "auto" : this.info.engine.jxMinify;
                console.log("jxMinifyFromConfig", jxMinifyFromConfig);
                if (jxMinifyFromConfig == "always") {
                    usejxMinified = true;
                } else if (jxMinifyFromConfig == "never") {
                    usejxMinified = false;
                }
                var jxsrc = !usejxMinified;
                console.log("adaptIndexHTMLPage", jxVersion);
                switch (jxVersion) {
                    case "intern":
                        mode = "prod";
                        pathFrameworkLibs = "js/lib";
                        pathJXLauncher = pathFrameworkLibs + "/jx/jx.js";
                        jxPath = "jx";
                        break;
                    case "last_release":
                        mode = "dev";
                        pathFrameworkLibs = "/dev/mp-framework/current/lib";
                        pathJXLauncher = pathFrameworkLibs + "/jx/jx.js";
                        jxPath = "/dev/mp-framework/current/engine/build/jx";
                        break;
                    case "last_dev":
                        mode = "dev";
                        pathFrameworkLibs = "/dev/mp-framework/develop/lib";
                        pathJXLauncher = pathFrameworkLibs + "/jx/jx.js";
                        jxPath = "/dev/mp-framework/develop/engine/build/jx";
                        break;
                }
                var mainCtrlSrc = "js/src/index.js";
                var templateURL = this.info.url + "/public/index_template.html";
                this.jx.db.loadText(templateURL, function (templateHtml) {
                    var templateOldHtml = templateHtml;
                    templateHtml = templateHtml.replace(/\$\{pathFrameworkLibs\}\/jx.js/g, "${pathJXLauncher}").replace(/body bgcolor="#FFFFFF"/g, 'body bgcolor="${backgroundColor}"').replace(/body bgcolor="#000000"/g, 'body bgcolor="${backgroundColor}"');
                    if (templateOldHtml != templateHtml) {
                        _this10.jx.db.saveText(templateURL, templateHtml);
                    }
                    ;
                    var pageIndex = templateHtml;

                    var overrideJXConfig = _this10._getJXConfigInHTML(pageIndex);

                    _this10.replaceParam(overrideJXConfig, "jxPath", "${jxPath}", jxPath);
                    _this10.replaceParam(overrideJXConfig, "jxsrc", "${jxsrc}", jxsrc);
                    _this10.replaceParam(overrideJXConfig, "src", "${mainCtrlSrc}", mainCtrlSrc);
                    _this10.replaceParam(overrideJXConfig, "mode", "${mode}", mode);
                    _this10.replaceParam(overrideJXConfig, "debug", "${debug}", debug);

                    if (context != "") _this10.replaceParam(overrideJXConfig, "context", "${context}", context);
                    pageIndex = _this10._setNewJXConfigInHTML(pageIndex, overrideJXConfig);

                    pageIndex = pageIndex.replace(/\$\{pathFrameworkLibs\}/g, pathFrameworkLibs).replace(/\$\{pathJXLauncher\}/g, pathJXLauncher).replace(/\$\{title\}/g, title).replace(/\$\{backgroundColor\}/g, _this10.getInGabarit({ id: "Informations.engine" }).value.backgroundColor || "#000000");
                    var generatedURL = (destDir ? destDir + "/" : _this10.info.url + "/public/") + name + ".html";
                    _this10.jx.db.saveText(generatedURL, pageIndex, function (evt) {
                        console.log(evt);
                        callback({ url: generatedURL });
                    });
                });
            }
        }, {
            key: "_setParamInOverrideJXConfig",
            value: function _setParamInOverrideJXConfig() {}
        }, {
            key: "_getJXConfigInHTML",
            value: function _getJXConfigInHTML(htmlContent) {
                var regex = /var\s+overrideJXConfig\s*=\s*{([\s\w:'${},"\/.]*)}/i;
                var found = htmlContent.match(regex);
                var resultObj = {};
                if (found != null) {
                    var lines = found[1].replace(/\s/g, "").split(",");
                    for (var i = 0; i < lines.length; i++) {
                        var split2 = lines[i].split(":");
                        var key = split2[0].trim();
                        var value = split2[1].trim();
                        resultObj[key] = value;
                    }
                }
                return resultObj;
            }
        }, {
            key: "_setNewJXConfigInHTML",
            value: function _setNewJXConfigInHTML(htmlContent, overrideJXConfig) {
                var stringOverride = "";
                for (var key in overrideJXConfig) {
                    stringOverride += "\t\t\t" + key + ": " + overrideJXConfig[key] + ",\n";
                }
                stringOverride = stringOverride.replace(/,\n$/, "");
                var regex = /var\s+overrideJXConfig\s*=\s*{([\s\w:'${},"\/.]*)}/i;
                return htmlContent.replace(regex, "var overrideJXConfig = {\n" + stringOverride + "\n\t\t}");
            }
        }, {
            key: "_setNewJXConfigInHTMLold",
            value: function _setNewJXConfigInHTMLold(htmlContent, overrideJXConfig) {
                var regex = /var\s+overrideJXConfig\s*=\s*{([\s\w:'${},"\/.]*)}/i;
                return htmlContent.replace(regex, "var overrideJXConfig = " + JSON.stringify(overrideJXConfig, null, 8));
            }
        }, {
            key: "replaceParam",
            value: function replaceParam(obj, key, patternValue, defaultValue) {
                var createIfnotExists = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

                if (obj[key] == undefined) {
                    if (createIfnotExists) obj[key] = isNaN(defaultValue) ? "'" + defaultValue + "'" : defaultValue;
                } else {
                    var str1 = this._removeLimitsQuotes(obj[key]);
                    var str2 = this._removeLimitsQuotes(patternValue);
                    if (str1 == str2) {
                        obj[key] = isNaN(defaultValue) ? "'" + defaultValue + "'" : defaultValue;
                    }
                }
            }
        }, {
            key: "_removeLimitsQuotes",
            value: function _removeLimitsQuotes(str) {
                return str.replace(/^"/, "").replace(/"$/, "").replace(/^'/, "").replace(/'$/, "");
            }
        }, {
            key: "adaptIndexHTMLPage",
            value: function adaptIndexHTMLPage() {
                var _this11 = this;

                var versionFramework = this.info.engine["jxVersion"];
                var mode = versionFramework.split(":")[0];
                var pathFrameworkLibs;
                var jxPath;
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
                    _this11.jx.db.saveText(_this11.info.url + "/public/index.html", pageIndex, function (evt) {
                        console.log(evt);
                    });
                });
            }
        }, {
            key: "_generateHTMLPages",
            value: function _generateHTMLPages(_ref4) {
                var _this12 = this;

                var _ref4$destDir = _ref4.destDir;
                var destDir = _ref4$destDir === undefined ? null : _ref4$destDir;
                var _ref4$jxVersion = _ref4.jxVersion;
                var jxVersion = _ref4$jxVersion === undefined ? "intern" : _ref4$jxVersion;
                var _ref4$usejxMinified = _ref4.usejxMinified;
                var usejxMinified = _ref4$usejxMinified === undefined ? false : _ref4$usejxMinified;
                var _ref4$context = _ref4.context;
                var context = _ref4$context === undefined ? "" : _ref4$context;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                this.generateHTMLPage({ name: "index", title: this.info.id, jxVersion: jxVersion, destDir: destDir, debug: false, usejxMinified: usejxMinified, context: context }, function (evt) {
                    _this12.generateHTMLPage({ name: "index_debug", title: _this12.info.id + "_DEBUG", jxVersion: jxVersion, destDir: destDir, debug: true, usejxMinified: usejxMinified, context: context }, function (evt) {
                        return callback();
                    });
                });
            }
        }, {
            key: "sendToBayamBubble",
            value: function sendToBayamBubble() {
                var _this13 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("sendToBayamTest");
                var linkIndex = params.no;
                var slotURL = this._bayamTestOpts.url + "/" + this._bayamTestOpts.prefix + linkIndex;
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
                    destPath: slotURL,
                    options: options
                }, function (result) {
                    console.log("buildProject OK", result);
                    _this13._generateHTMLPages({ destDir: result.destPath, jxVersion: "intern", usejxMinified: true }, function (evt) {
                        _this13.jx.db.saveJSON(slotURL + "/info.json", _this13.jx.tools.obj.filter(_this13.info, { id: null, date: _this13.jx.tools.date.getToday().fr + " ( " + _this13.jx.tools.date.getToday().utc + ")" }), function (evt) {
                            _this13.jx.editor.zip({ url: result.destPath }, function (evt) {
                                return callback();
                            });
                        });
                    });
                });
            }
        }, {
            key: "sendToTest",
            value: function sendToTest() {
                var _this14 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("sendToTest");
                var options = {
                    date: true,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^index_", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "node_modules", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],
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
                    _this14._generateHTMLPages({ destDir: result.destPath, jxVersion: "intern", usejxMinified: true }, function (evt) {
                        return callback();
                    });
                });
            }
        }, {
            key: "sendToAzoomee",
            value: function sendToAzoomee() {
                var _this15 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("sendToAzoomee");
                var exportURL = this.azoomeeBuildURL + "/" + this.info.id;
                var azoomeePackageURL = this.azoomeeServerURL + "/" + this.info.id + "/" + this.info.id + ".zip";
                var azoomeeConfig = {
                    "name": this.info.id,
                    "currentVersion": 1,
                    "minVersion": 1,
                    "uri": azoomeePackageURL,
                    "pathToStartPage": "index.html"
                };
                var options = {
                    date: true,
                    extExclude: ["sublime-project", "sublime-workspace", "fla", "mov", "as", "rtf", "zip", "as2proj", "pdf", "psd", "txt", "bat", "rar", "dmg", "md"],
                    fileExclude: ["publish.js", "_panel.html", "^index_", "^.*_old", "^.*_temp"],
                    dirExclude: ["^xfl$", "^doc$", "_sources_medias", "node_modules", "\.git", "^Typos$", "^.*_old$", "^.*_temp$"],
                    treeOnly: false,
                    merge: false,
                    deleteSource: false,
                    recursive: 10000 };
                this.jx.editor.cloneDir({
                    sourcePath: this.info.url + "/public",
                    destPath: exportURL,
                    options: options
                }, function (result) {
                    console.log("buildProject OK", result);
                    _this15._generateHTMLPages({ destDir: result.destPath, context: "azoomee", jxVersion: "intern", usejxMinified: true }, function (evt) {
                        _this15.jx.db.saveJSON(_this15.azoomeeBuildURL + "/" + _this15.info.id + ".json", azoomeeConfig, function () {
                            _this15.jx.editor.deleteFile(result.destPath + "/index_debug.html", function () {
                                _this15.jx.editor.zip({ url: result.destPath }, function (evt) {
                                    _this15.jx.editor.deleteDir(result.destPath, function () {
                                        _this15.jx.editor.download({ url: _this15.azoomeeBuildURL, prefixZip: _this15.info.id + "_v" + _this15.info.version + "_AZOOMEE", internPath: "", date: false });
                                        callback();
                                    });
                                });
                            });
                        });
                    });
                });
            }
        }, {
            key: "downloadTest",
            value: function downloadTest() {
                this.jx.editor.download({ url: this.testURL, prefixZip: this.info.id + "_TEST", internPath: this.info.id, date: true });
            }
        }, {
            key: "downloadBayamBubble",
            value: function downloadBayamBubble(params) {
                this.jx.editor.download({ url: this._bayamTestOpts.url + "/" + this._bayamTestOpts.prefix + params.no + ".zip" });
            }
        }, {
            key: "downloadAzoomee",
            value: function downloadAzoomee() {}
        }, {
            key: "previewBayamBubble",
            value: function previewBayamBubble(params) {
                this.jx.tools.openURL(this._bayamTestOpts.url + "/" + this._bayamTestOpts.prefix + params.no, "Bayam Bubble_" + params.no + " " + this.info.id);
            }
        }, {
            key: "previewTest",
            value: function previewTest() {
                this.jx.tools.openURL(this.testURL, "TEST_" + this.info.id);
            }
        }, {
            key: "downloadFullProject",
            value: function downloadFullProject() {
                var _this16 = this;

                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("buildProjectIntern");
                var options = {
                    date: false,
                    extExclude: [],
                    fileExclude: [],
                    dirExclude: ["\.git", "node_modules"],
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
                    _this16.jx.editor.download({ url: result.destPath, prefixZip: _this16.info.id + "_" + _this16.info.version + "_FULL", internPath: _this16.info.id, date: true });
                    callback(result);
                });
            }
        }, {
            key: "buildProjectIntern",
            value: function buildProjectIntern() {
                var _this17 = this;

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
                    _this17._generateHTMLPages({ destDir: result.destPath, jxVersion: "intern", usejxMinified: true }, function (evt) {
                        _this17.jx.editor.download({ url: result.destPath, prefixZip: _this17.info.id + "_v" + _this17.info.version, internPath: _this17.info.id, date: true });
                        callback(result);
                    });
                });
            }
        }, {
            key: "buildProjectLastReleaseJX",
            value: function buildProjectLastReleaseJX() {
                var _this18 = this;

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
                    console.log("buildProject OK", result);
                    var destPath = result.destPath;
                    _this18.jx.editor.cloneDir({
                        sourcePath: "$bobaLastRelease/engine/build",
                        destPath: destPath + "/js",
                        options: optionsJX
                    }, function (result) {
                        _this18.jx.editor.cloneDir({
                            sourcePath: "$bobaLastRelease/lib",
                            destPath: destPath + "/js/lib",
                            options: optionsLibs
                        }, function (result) {
                            console.log("buildProject OK", result);
                            _this18._generateHTMLPages({ destDir: destPath, jxVersion: "intern" }, function (evt) {
                                _this18.jx.editor.download({ url: destPath, prefixZip: _this18.info.id + "_v" + _this18.info.version + "_LAST_JX", internPath: _this18.info.id, date: true });
                                callback(result);
                            });
                        });
                    });
                });
            }
        }, {
            key: "buildProject2",
            value: function buildProject2(params, callback) {
                var _this19 = this;

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
                    _this19.jx.editor.download({ url: result.destPath, prefixZip: _this19.info.id, internPath: _this19.info.id, date: true });
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
                var _this20 = this;

                var numBubbles = this._bayamTestOpts.numBubbles;
                var filesToTest = [];
                for (var i = 0; i < numBubbles; i++) {
                    filesToTest.push({ src: "link" + i }, { src: "link" + i + ".zip" });
                }
                this.jx.editor.filesExist({
                    projectPath: this._bayamTestOpts.url,
                    filePathArray: filesToTest
                }, function (evt) {
                    _this20._exportDial(appData, evt.filePathArray);
                });
            }
        }, {
            key: "_exportDial",
            value: function _exportDial(appData, serverInfos) {
                var _this21 = this;

                console.info("serverInfos", serverInfos);
                var bubbleBayam = function bubbleBayam(bubbleNo) {
                    var enabledPreview = "disabled";
                    var enabledDownload = "disabled";
                    for (var i = 0; i < serverInfos.length; i++) {
                        var link = serverInfos[i];
                        if (link.src == "link" + bubbleNo && link.exists) {
                            enabledPreview = "";
                        } else if (link.src == "link" + bubbleNo + ".zip" && link.exists) {
                            enabledDownload = "";
                        }
                        ;
                    }
                    ;
                    var display = bubbleNo == 0 && _this21.jx.editor.userIsGroup("dev") == false ? "none" : "inline";
                    return "\n\t\t\t\t\t<div  id=\"bubble" + bubbleNo + "\" class=\"col-xs-2\" style=\"display:" + display + ";width:60px\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-info\" title=\"Envoyer vers bulle " + bubbleNo + "\" id=\"sendToBayamBubble" + bubbleNo + "\"  data-action='{\"action\": \"sendToBayamBubble\", \"no\": \"" + bubbleNo + "\"}' ><span class=\"fa fa-share-square-o\"></span>" + bubbleNo + "</button>\n\n\t\t\t    \t\t<button type=\"button\" " + enabledPreview + " class=\"btn btn-default\" title=\"Visualiser le contenu actuel de la bulle\" id=\"previewBayamBubble" + bubbleNo + "\"  data-action='{\"action\": \"previewBayamBubble\", \"no\": \"" + bubbleNo + "\"}' ><span class=\"fa fa-eye\"></span></button>\n\n\t\t\t    \t\t<button type=\"button\" " + enabledDownload + " class=\"btn btn-default\" title=\"Télécharger le contenu actuel\" id=\"downloadBayamBubble" + bubbleNo + "\"  data-action='{\"action\": \"downloadBayamBubble\", \"no\": \"" + bubbleNo + "\"}' ><span class=\"fa fa-download\"></span></button>\n\t\t\t    \t\t\n\t\t\t    \t</div>\n\t\t\t";
                };
                var bubblesBayam = function bubblesBayam(numBubbles) {
                    var result = "";
                    for (var i = 0; i < numBubbles; i++) {
                        result += bubbleBayam(i);
                    }
                    ;
                    return result;
                };
                this.azoomeeServerURL = this.getInGabarit({ id: "Informations.project" }).value.azoomeeServerURL || this.azoomeeDefaultServerURL;

                var popupContent = "\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Envoi en Test</h4>\n\t\t\t\t\t\t<div style=\"font-size:14px\">Envoie une publication du projet actuel en Test, visualisable pendant que l'on continue à modifier le projet</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-info btn-lg\" title=\"Envoyer en Test\" id=\"sendToTest\"><span class=\"fa fa-share-square-o\"></span></button>\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" title=\"Visualiser la version actuellement en Test\" id=\"previewTest\"><span class=\"fa fa-eye\"></span></button>\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" title=\"Télécharger la version actuellement en Test\" id=\"downloadTest\"><span class=\"fa fa-download\"></span></button>\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    \n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Envoi vers l'application Bayam</h4>\n\t\t\t\t\t\t<div style=\"font-size:14px\">Envoi une publication du projet vers une des bulles de l'application Bayam</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t" + bubblesBayam(this._bayamTestOpts.numBubbles) + "\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    \n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Azoomee</h4>\n\t\t\t\t\t\t<div style=\"font-size:14px\">Export pour la plateforme Azoomee<br/><br/>\n\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-2\">\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" title=\"Télécharger la version Azoomee\" id=\"sendToAzoomee\"><span class=\"fa fa-download\"></span></button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-xs-10\">\n\t\t\t\t\tServer URL: \n\t\t\t\t\t\t<input type=\"text\" class=\"\" style=\"width:100%;\" id=\"azoomeeServerURL\" value=\"" + this.azoomeeServerURL + "\"></input>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<br/>\n\t\t\t\t\t\tLe zip récupéré contient 2 fichiers: <br/>\n\t\t\t\t\t\t- le json, pointant vers l'url du zip: &lt;Server URL&gt;/" + this.info.id + "/" + this.info.id + ".zip <br/>\n\t\t\t\t\t\t- le zip " + this.info.id + ".zip qui doit être placée à l'url pointée par le json. <br/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t    <hr>\n\n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<h4>Exporter le projet actuel</h4>\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-success\" style=\"width:100%; text-align: left\" title=\"Télécharger une publication du projet\" id=\"buildProjectIntern\"><span class=\"fa fa-download\"></span> Publication du projet</button>\n\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" style=\"width:100%; text-align: left\" title=\"Publication du projet  avec le dernier JX\" id=\"buildProjectLastReleaseJX\"><span class=\"fa fa-download\"></span> Publication du projet  avec le dernier JX</button>\n\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    <div class=\"row\">\n\t\t\t    \t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default\" style=\"width:100%; text-align: left\" title=\"Télécharger tout le dossier du projet\" id=\"downloadFullProject\"><span class=\"fa fa-download\"></span> Tout le dossier du projet</button>\n\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t";
                var popup = this.jx.editor.popup({ title: "Exporter le projet", content: popupContent, width: 700, buttons: {}, onclose: function onclose(evt) {} });
                var popupReload = function popupReload() {
                    popup.modal("hide");
                    _this21.exportDial(appData);
                };
                $(popup).find("#azoomeeServerURL").change(function (evt) {
                    _this21.getInGabarit({ id: "Informations.project" }).value.azoomeeServerURL = evt.currentTarget.value;
                    _this21.azoomeeServerURL = evt.currentTarget.value;
                    _this21.save(function () {});
                });
                $(popup).find(".btn").click(function (evt) {
                    if ($(evt.currentTarget).attr("data-action")) {
                        var request = JSON.parse($(event.currentTarget).attr("data-action"));
                    } else {
                        request = { action: event.currentTarget.id, params: undefined };
                    }
                    _this21.callHooks({ hookID: "beforeBuild" }, function () {
                        console.log(request.action);
                        switch (request.action) {
                            case "sendToTest":
                                _this21.jx.editor.popup({ title: "Comfirmation de l'envoi en Test",
                                    content: "Attention, cette action va remplacer la version actuellement en Test par la version du projet en cours.\n Etes-vous sûr ?",
                                    buttons: {
                                        ok: { label: "Oui" },
                                        no: { label: "Non" }
                                    },
                                    onclose: function onclose(evt) {
                                        if (evt.action == "ok") {
                                            var popup2 = _this21.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                            _this21.sendToTest(null, function (evt) {
                                                popup2.modal('hide');
                                            });
                                        }
                                    }
                                });
                                break;
                            case "sendToBayamBubble":
                                _this21.jx.editor.popup({ title: "Comfirmation de l'envoi en Test vers la bulle Bayam " + request.no,
                                    content: "Attention, cette action va remplacer la version actuelle de la bulle " + request.no + " par la version du projet en cours.\n Etes-vous sûr ?",
                                    buttons: {
                                        ok: { label: "Oui" },
                                        no: { label: "Non" }
                                    },
                                    onclose: function onclose(evt) {
                                        if (evt.action == "ok") {
                                            var popup2 = _this21.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                            _this21.sendToBayamBubble(request, function (evt) {
                                                popup2.modal('hide');
                                                popupReload();
                                            });
                                        }
                                    }
                                });
                                break;
                            case "sendToAzoomee":
                                _this21.jx.editor.popup({ title: "Comfirmation de l'export Azoomee ",
                                    content: "",
                                    buttons: {
                                        ok: { label: "Oui" },
                                        no: { label: "Non" }
                                    },
                                    onclose: function onclose(evt) {
                                        if (evt.action == "ok") {
                                            var popup2 = _this21.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                            _this21.sendToAzoomee(request, function (evt) {
                                                popup2.modal('hide');
                                                popupReload();
                                            });
                                        }
                                    }
                                });
                                break;
                            case "buildProjectIntern":
                                var popup2 = _this21.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                _this21.buildProjectIntern(null, function (evt) {
                                    popup2.modal('hide');
                                });
                                break;
                            case "buildProjectLastReleaseJX":
                                var popup2 = _this21.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                _this21.buildProjectLastReleaseJX(null, function (evt) {
                                    popup2.modal('hide');
                                });
                                break;
                            case "downloadFullProject":
                                var popup2 = _this21.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                _this21.downloadFullProject(null, function (evt) {
                                    popup2.modal('hide');
                                });
                                break;
                            default:
                                if (_this21[request.action]) _this21[request.action](request, function (evt) {});
                        }
                    });
                });
            }
        }]);

        return ApplicationBabelHTML5Base;
    }(_ProjectManager2.default);

    exports.default = ApplicationBabelHTML5Base;
});
//# sourceMappingURL=ApplicationBabelHTML5Base.js.map