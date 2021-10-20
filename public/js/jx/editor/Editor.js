define(["exports", "jx/core/comps/Component", "jx/comps/RemoteCom", "jx/editor/EditorOptionsList", "./pages/fontsPageElements/FontsManager"], function (exports, _Component2, _RemoteCom, _EditorOptionsList, _FontsManager) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

    var _RemoteCom2 = _interopRequireDefault(_RemoteCom);

    var _EditorOptionsList2 = _interopRequireDefault(_EditorOptionsList);

    var _FontsManager2 = _interopRequireDefault(_FontsManager);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
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

    var optionsLists = _EditorOptionsList2.default;

    var Editor = function (_Component) {
        _inherits(Editor, _Component);

        function Editor(jxEngine) {
            _classCallCheck(this, Editor);

            var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, { jx: jxEngine }));

            _this._templates = {
                asset: '<div  id="assetValue"></div>',
                source: '<div  id="sourceValue"></div>',
                download: ' <button class="btn btn-default" title="Télécharger le fichier" id="download"><span class="fa fa-download"></span></button>'
            };
            return _this;
        }

        _createClass(Editor, [{
            key: "init",
            value: function init(callback) {
                this.host = this.cc({ type: _RemoteCom2.default, url: "services", io: true });
                this.fontsManager = this.cc({ type: _FontsManager2.default });

                this._getUsersInfos(function (result) {
                    callback();
                });
            }
        }, {
            key: "userIsGroup",
            value: function userIsGroup() {
                if (this.user.group == "admin") return true;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                for (var i = 0; i < args.length; i++) {
                    args[i] = String(args[i]).trim();
                    if (args[i] == "*" || args[i] == this.user.group) {
                        return true;
                    }
                }
                ;
                return false;
            }
        }, {
            key: "getBoolDependsGroup",
            value: function getBoolDependsGroup(boolOrUserGroups, defaultValue) {
                var result = true;
                if (boolOrUserGroups == undefined) {
                    return defaultValue;
                } else if (this.jx.tools.instanceType(boolOrUserGroups) == "boolean") {
                    return boolOrUserGroups;
                } else if (this.jx.tools.instanceType(boolOrUserGroups) == "string") {
                    return this.userIsGroup.apply(this, _toConsumableArray(boolOrUserGroups.split(",")));
                }
            }
        }, {
            key: "getOptionsList",
            value: function getOptionsList() {
                var _this2 = this;

                var idOptionsList = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                if (!idOptionsList) return optionsLists;
                if (idOptionsList == "publication") {
                    var allPublications = optionsLists[idOptionsList];
                    var allowedPublications = void 0;
                    if (this.user.publications != "*") {
                        allowedPublications = allPublications.filter(function (item) {
                            return _this2.user.publications.indexOf(item) !== -1;
                        });
                    } else {
                        allowedPublications = allPublications;
                    }
                    return allowedPublications;
                } else {
                    return optionsLists[idOptionsList];
                }
            }
        }, {
            key: "getData",
            value: function getData(_ref, callback) {
                var type = _ref.type;
                var _ref$domain = _ref.domain;
                var domain = _ref$domain === undefined ? null : _ref$domain;
                var _ref$status = _ref.status;
                var status = _ref$status === undefined ? "all" : _ref$status;
                var _ref$filters = _ref.filters;
                var filters = _ref$filters === undefined ? {} : _ref$filters;

                filters = Object.assign({ status: "all", sortBy: "id", user: "all", search: "" }, filters);
                filters.status = filters.status.toLowerCase();

                var domains = {
                    AppEngine: this.getDirectoryURL("appEnginesURL"),
                    Archive: this.getDirectoryURL("archivesURL"),
                    Model: this.getDirectoryURL("boba") + "/templates/applications",
                    Component: [this.getDirectoryURL("boba") + "/doc/components", "/dev/packages/mycomps"]
                };
                domain = filters.domain || domains[type];
                switch (type) {
                    case "Archive":
                    case "AppEngine":
                    case "Model":
                    case "Component":
                    case "Project":
                        this.listProjects(function (event) {
                            var result = event;
                            var eventData = event.data;
                            var projectInfo;
                            result.data = [];

                            for (var i = 0; i < eventData.length; i++) {
                                projectInfo = eventData[i].projectInfo;

                                var itemStatus = (eventData[i].infos.status.value || eventData[i].infos.status).toLowerCase();
                                var itemPublication = projectInfo.project.publication.split(",");
                                var usersList = projectInfo.project.assignedUsers || "all";

                                var itemUsers = usersList.split(",");
                                if (eventData[i].status != "hidden" && (filters.status == "all" || itemStatus == filters.status || filters.status == "not done" && itemStatus != "done") && (filters.publication == "all" || itemPublication.indexOf(filters.publication) != -1) && (filters.user == "all" || itemUsers.indexOf(filters.user) != -1)) {
                                    result.data.push(eventData[i]);
                                }
                            }
                            ;

                            function compareId(a, b) {
                                var nameA = a.id.toLowerCase(),
                                    nameB = b.id.toLowerCase();
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            }
                            function compareStatut(a, b) {
                                var statusA = a.status.value || a.status;
                                var statusB = b.status.value || b.status;
                                var nameA = statusA.toLowerCase(),
                                    nameB = statusB.toLowerCase();
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            }
                            function compareDateAsc(a, b) {
                                var nameA = a.projectInfo.project.datePublication;
                                var nameB = b.projectInfo.project.datePublication;
                                if (nameA < nameB) return -1;
                                if (nameA > nameB) return 1;
                                return 0;
                            }
                            function compareDateDesc(a, b) {
                                var nameA = a.projectInfo.project.datePublication;
                                var nameB = b.projectInfo.project.datePublication;
                                if (nameA < nameB) return 1;
                                if (nameA > nameB) return -1;
                                return 0;
                            }
                            function compareDateModificationDesc(a, b) {
                                var nameA = a.projectInfo.stats.mtime;
                                var nameB = b.projectInfo.stats.mtime;
                                if (nameA < nameB) return 1;
                                if (nameA > nameB) return -1;
                                return 0;
                            }
                            function compareDateCreationDesc(a, b) {
                                var nameA = a.projectInfo.stats.ctime;
                                var nameB = b.projectInfo.stats.ctime;
                                if (nameA < nameB) return 1;
                                if (nameA > nameB) return -1;
                                return 0;
                            }
                            function compareDateLastAccessDesc(a, b) {
                                var nameA = a.projectInfo.stats.atime;
                                var nameB = b.projectInfo.stats.atime;
                                if (nameA < nameB) return 1;
                                if (nameA > nameB) return -1;
                                return 0;
                            }
                            if (filters.sortBy == "Status") {
                                result.data.sort(compareStatut);
                            }
                            ;
                            if (filters.sortBy == "Name") {
                                result.data.sort(compareId);
                            }
                            ;
                            if (filters.sortBy == "Date publication ASC") {
                                result.data.sort(compareDateAsc);
                            }
                            ;
                            if (filters.sortBy == "Date publication DESC") {
                                result.data.sort(compareDateDesc);
                            }
                            ;
                            if (filters.sortBy == "Date modification") {
                                result.data.sort(compareDateModificationDesc);
                            }
                            ;
                            if (filters.sortBy == "Date creation") {
                                result.data.sort(compareDateCreationDesc);
                            }
                            ;
                            if (filters.sortBy == "Date access") {
                                result.data.sort(compareDateLastAccessDesc);
                            }
                            ;
                            callback(result);
                        }, { domain: domain, type: type, filters: filters });
                        break;
                    case "Doc":
                        this.listDoc(callback);
                        break;
                    default:
                        console.error("editor.getData", type, "not found");
                }
            }
        }, {
            key: "showPage",
            value: function showPage(_ref2) {
                var _this3 = this;

                var id = _ref2.id;
                var _ref2$args = _ref2.args;
                var args = _ref2$args === undefined ? {} : _ref2$args;

                this.jx.db.importClass(["jx/editor/pages/" + id], function (Module) {
                    args.jx = _this3.jx;

                    new Module(args);
                });
            }
        }, {
            key: "loadText",
            value: function loadText(params, callback) {
                $.ajax({
                    type: "GET",
                    url: params.url,
                    dataType: "text",
                    success: function success(result) {
                        callback(result);
                    }
                });
            }
        }, {
            key: "saveText",
            value: function saveText(pathFile, text) {
                this.host.callMethod("writefile", {
                    url: pathFile,
                    text: text
                }, function () {});
            }
        }, {
            key: "getCurrentCommit",
            value: function getCurrentCommit(args, callback) {
                this.host.callMethod("getCurrentCommit", args, function (evt) {
                    callback(evt);
                });
            }
        }, {
            key: "getGitDiff",
            value: function getGitDiff(args, callback) {
                this.host.callMethod("getGitDiff", args, function (evt) {
                    callback(evt);
                });
            }
        }, {
            key: "gitInitWithBitBucketLink",
            value: function gitInitWithBitBucketLink(args, callback) {
                this.host.callMethod("gitInitWithBitBucketLink", args, function (evt) {
                    callback(evt);
                });
            }
        }, {
            key: "execBash",
            value: function execBash(_ref3, callback) {
                var _ref3$commandline = _ref3.commandline;
                var commandline = _ref3$commandline === undefined ? null : _ref3$commandline;
                var _ref3$scriptName = _ref3.scriptName;
                var scriptName = _ref3$scriptName === undefined ? null : _ref3$scriptName;
                var _ref3$args = _ref3.args;
                var args = _ref3$args === undefined ? {} : _ref3$args;
                var _ref3$output = _ref3.output;
                var output = _ref3$output === undefined ? "current" : _ref3$output;
                var _ref3$direct = _ref3.direct;
                var direct = _ref3$direct === undefined ? false : _ref3$direct;
                var _ref3$rootDir = _ref3.rootDir;
                var rootDir = _ref3$rootDir === undefined ? null : _ref3$rootDir;

                this.host.callMethod("execBash", {
                    commandline: commandline,
                    scriptName: scriptName,
                    args: JSON.stringify(args),
                    output: output,
                    direct: direct,
                    rootDir: rootDir
                }, function (evt) {
                    callback(evt);
                });
            }
        }, {
            key: "execBash2",
            value: function execBash2(commandline, callback) {
                var output = arguments.length <= 2 || arguments[2] === undefined ? "current" : arguments[2];
                var direct = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

                this.host.callMethod("execBash", {
                    commandline: commandline,
                    output: output,
                    direct: direct
                }, function (evt) {
                    callback(evt);
                });
            }
        }, {
            key: "openTerminal",
            value: function openTerminal(url) {
                this.host.callMethod("openTerminal", {
                    url: url
                }, function (evt) {});
            }
        }, {
            key: "sshConnect",
            value: function sshConnect() {
                this.jx.editor.execBash({ commandline: "$sshConnect", output: "new" }, function (evt) {});
            }
        }, {
            key: "open_fonts_manager",
            value: function open_fonts_manager() {
                this.jx.tools.openURL("fonts_dev.html#FontsPage");
            }
        }, {
            key: "fontConvert",
            value: function fontConvert(_ref4) {
                var fontPath = _ref4.fontPath;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (result) {} : arguments[1];

                this.host.callMethod("fontConvert", {
                    fontPath: fontPath
                }, function (result) {
                    console.log("fontConvert", result);
                    callback(result);
                });
            }
        }, {
            key: "deleteProjectDial",
            value: function deleteProjectDial(projectData) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                var response = confirm("Voulez vous supprimer le projet " + projectData.id + "?\n Attention ceci n'est pas réversible !");
                if (response == true) {
                    this.jx.editor.deleteDir(projectData.url, callback);
                } else {
                    callback();
                }
            }
        }, {
            key: "deleteDir",
            value: function deleteDir(dirURL) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

                console.log("deleteDir", dirURL);
                this.host.callMethod("deleteDir", { dirURL: dirURL }, callback);
            }
        }, {
            key: "deleteDirPromise",
            value: function deleteDirPromise(dirURL) {
                var _this4 = this;

                console.log("deleteDir", dirURL);
                return new Promise(function (resolve) {
                    _this4.host.callMethod("deleteDir", { dirURL: dirURL }, function () {
                        return resolve();
                    });
                });
            }
        }, {
            key: "deleteFile",
            value: function deleteFile(fileURL) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

                console.log("deleteFile", fileURL);
                this.host.callMethod("deleteFile", { fileURL: fileURL }, function (evt) {
                    console.log("deleted", evt);
                    callback();
                });
            }
        }, {
            key: "createDir",
            value: function createDir(dirURL) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

                console.log("createDir", dirURL);
                this.host.callMethod("createDir", { dirURL: dirURL }, callback);
            }
        }, {
            key: "listDir",
            value: function listDir(dirURL) {
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var callback = arguments.length <= 2 || arguments[2] === undefined ? function (result) {} : arguments[2];

                console.log("listDir", dirURL);
                this.host.callMethod("listDirectory", { dirURL: dirURL, options: options }, callback);
            }
        }, {
            key: "_getUsersInfos",
            value: function _getUsersInfos(callback) {
                var _this5 = this;

                this.host.callMethod("getUsersInfos", {}, function (result) {
                    var usersList = result.usersList;
                    var user = result.current;

                    if (user.name == undefined) {
                        if (_this5.jx.config.system.host.type == "local") {
                            user.name = "admin";
                            user.group = "admin";
                        } else {
                            user.name = "invite";
                            user.group = "scenarist";
                        }
                    }
                    _this5.usersInfos = {
                        current: user,
                        users: usersList
                    };
                    _this5.user = user;

                    for (var i = 0; i < _this5.usersInfos.users.length; i++) {
                        if (["milan", "manager", "dev", "scenariste", "test"].indexOf(_this5.usersInfos.users[i].name) === -1) {
                            optionsLists.users.push(_this5.usersInfos.users[i].name);
                        }
                        ;
                    }
                    ;
                    callback(result);
                });
            }
        }, {
            key: "reloadWindow",
            value: function reloadWindow() {
                window.location.reload();
            }
        }, {
            key: "getProjectManager",
            value: function getProjectManager(_ref5) {
                var _this6 = this;

                var url = _ref5.url;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

                console.log("getProjectManager", url + "/project.jx");
                var dataObject = { url: url };

                this.jx.db.addResources({ id: "projectJXFile", type: "json", src: url + "/project.jx" });
                this.jx.db.load({ id: "projectJXFile" }, function () {
                    dataObject.projectJXData = _this6.jx.db.findOne({ id: 'projectJXFile' }).data;
                    dataObject.type = dataObject.projectJXData.projectType;

                    _this6.jx.db.addAndLoad({
                        id: dataObject.type,
                        type: "class",
                        src: "jx/projecttypes/" + dataObject.type
                    }, function (evt) {
                        callback(_this6.cc(dataObject));
                    });
                });
            }
        }, {
            key: "getTemplate",
            value: function getTemplate(_ref6) {
                var _this7 = this;

                var id = _ref6.id;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

                console.log("getTemplate");
                this.jx.db.addAndLoad({
                    id: id,
                    type: "class",
                    src: "jx/editor/pages/" + id
                }, function (evt) {
                    callback(_this7.cc({ type: id }));
                });
            }
        }, {
            key: "listVersions",
            value: function listVersions(callback) {
                this.host.callMethod("listversions", {}, function (result) {
                    return callback(result.versions);
                });
            }
        }, {
            key: "cloneRepository",
            value: function cloneRepository(params, callback) {
                console.log("cloneRepository", params);
                this.host.callMethod("clonerepository", params, function (result) {
                    console.log("cloneBoba result :", result);
                    callback();
                });
            }
        }, {
            key: "listProjects",
            value: function listProjects(callback, options) {
                options = options || {};
                if (options.domain) {
                    var url = options.domain;
                } else {
                    var url = this.jx.config.app.projectsURL;
                }

                this.host.callMethod("listProjects", {
                    url: url,
                    filters: options.filters.search
                }, function (result) {
                    var projectsList = [];
                    for (var i = 0; i < result.items.length; i++) {
                        var project = result.items[i];

                        var projectInfos = { project: { publication: "" }, engine: {} };
                        if (project.configData.error) {
                            console.warn("ERROR, can't get project informations: ", project.name, project.configData.mess);
                            var infos = {
                                status: "debug"
                            };
                            var description = "ERROR, can't get project informations: " + project.configData.mess;
                        } else if (project.configData.ProjectInformations) {
                            var _getFirstEntryPoint = function _getFirstEntryPoint(json) {
                                for (var modulejsonName in json["entry-point"]) {
                                    return json["entry-point"][modulejsonName];
                                    break;
                                }
                            };
                            var gabarit = _getFirstEntryPoint(project.configData).gabarit;
                            var description = "";
                            var status = "";
                            var infos = { status: { value: "open" } };
                            for (var k = 0; k < gabarit.length; k++) {
                                if (gabarit[k].id == "Informations") {
                                    if (gabarit[k].children) {
                                        var flag = false;
                                        for (var j = 0; j < gabarit[k].children.length; j++) {
                                            infos[gabarit[k].children[j].id] = gabarit[k].children[j];
                                            if (gabarit[k].children[j].id == "ProjectInformations") {
                                                infos = Object.assign(infos, gabarit[k].children[j].value);
                                                description = infos.Synopsis || "";
                                                console.log(infos);
                                                flag = true;
                                                break;
                                            }
                                        }
                                        if (!flag) {
                                            for (var j = 0; j < gabarit[k].children.length; j++) {
                                                infos[gabarit[k].children[j].id] = gabarit[k].children[j];
                                                if (gabarit[k].children[j].id == "Synopsis") {
                                                    description = gabarit[k].children[j].value;
                                                }
                                                if (gabarit[k].children[j].id == "status") {
                                                    status = gabarit[k].children[j].value;
                                                }
                                            }
                                        }
                                    } else if (gabarit[k].type == "InformationsData") {
                                        infos = Object.assign(infos, gabarit[k].value);
                                        description = infos.Synopsis || "";
                                    } else {
                                        for (var prop in gabarit[k].value) {
                                            infos[prop] = gabarit[k].value[prop];
                                        }
                                        description = gabarit[k].value.Synopsis || "";
                                    }
                                    break;
                                }
                            }
                            ;
                        } else {
                            var projectData = project.configData["projectData"];
                            for (var j = 0; j < projectData.length; j++) {
                                if (projectData[j].id == "Informations") {
                                    var projectGroupChildren = projectData[j].children;
                                    break;
                                }
                            }
                            ;
                            for (var j = 0; j < projectGroupChildren.length; j++) {
                                projectInfos[projectGroupChildren[j].id] = projectGroupChildren[j].value;
                            }
                            ;
                            var description = projectInfos.project.Synopsis || projectInfos.project.description;
                            var status = projectInfos.project.status;
                            var infos = { status: { value: status }, previewIndex: projectInfos.project.previewIndex };
                        }
                        var id;

                        if (projectInfos.project.id && projectInfos.project.id.trim() != "") {
                            id = projectInfos.project.id;
                        } else {
                            id = project.name;
                        }
                        ;
                        projectInfos.stats = project.stats;

                        projectsList.push({ id: id, title: projectInfos.project.title, url: project.url, type: options.type || "Project", infos: infos, status: infos.status, description: description, projectInfo: projectInfos });
                    }
                    ;
                    callback({ data: projectsList });
                });
            }
        }, {
            key: "getDirectoryURL",
            value: function getDirectoryURL(id) {
                return this._getDecodedURL(this.jx.config.app[id]);
            }
        }, {
            key: "_getDecodedURL",
            value: function _getDecodedURL(codedURL) {
                var pInfo = this.jx.config.app;
                return codedURL.replace(/^\${demosURL}/, pInfo.demosURL).replace(/^\${docsURL}/, pInfo.docsURL).replace(/^\${compsURL}/, pInfo.compsURL).replace(/^\${jxURL}/, pInfo.jxURL).replace(/^\${devURL}/, pInfo.devURL).replace(/^\${buildsURL}/, pInfo.buildsURL).replace(/^\${projectsURL}/, pInfo.projectsURL).replace(/^\${assetsURL}/, pInfo.assetsURL).replace(/^\${PROJECT_URL}/, ".");
            }
        }, {
            key: "listDoc",
            value: function listDoc(callback) {
                var _this8 = this;

                var compsURL = this._getDecodedURL(this.jx.config.app.docsURL);
                this.jx.db.addResources({ "id": "DocList", "type": "json", "src": compsURL + "/docs.json" });
                this.jx.db.load({ id: "DocList" }, function () {
                    var docJSON = _this8.jx.db.findOne({ id: "DocList" }).data;
                    var result = [];
                    for (var i = 0; i < docJSON.docs.length; i++) {
                        docJSON.docs[i].type = "Doc";
                        docJSON.docs[i].url = docJSON.docs[i].src;
                        docJSON.docs[i].access = docJSON.docs[i].access || "";
                        docJSON.docs[i].infos = { status: { value: "done" }, Synopsis: docJSON.docs[i].description };
                        if (docJSON.docs[i].access == "" || _this8.userIsGroup.apply(_this8, _toConsumableArray(docJSON.docs[i].access.split(","))) == true) {
                            result.push(docJSON.docs[i]);
                        }
                        ;
                    }
                    ;
                    callback({ data: result });
                });
            }
        }, {
            key: "showJXEngineIssues",
            value: function showJXEngineIssues() {
                this.jx.tools.openURL("https://bitbucket.org/MobiTobo/mp-framework-tracker/issues");
            }
        }, {
            key: "showEditorEditionPage",
            value: function showEditorEditionPage() {
                this.jx.tools.openURL("/editor/?a=edit&id=EDITOR&url=%2Fdev%2Fmp-framework%2Fcurrent%2Feditor");
            }
        }, {
            key: "cleanProjectChmod",
            value: function cleanProjectChmod() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? { yo: "yes" } : arguments[0];
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("cleanProjectChmod", params);
                this.host.callMethod("cleanProjectChmod", params, function (result) {
                    console.log("cleanProjectChmod RESULT", result);
                    callback(result);
                });
            }
        }, {
            key: "showAdminPanel",
            value: function showAdminPanel() {
                var gabarit = [{
                    "id": "TranspilEngineJX",
                    "title": "JXEngine Transpilation",
                    "type": "editionitems.ButtonItem",
                    "visible": "dev",
                    "editable": false,
                    "description": "Transpile jx engine with Babel",
                    "onclick": "$jxengine_transpil"
                }, {
                    "id": "ShowJXEngineIssues",
                    "title": "JXEngine Tasks/Issues",
                    "type": "editionitems.ButtonItem",
                    "visible": "dev",
                    "editable": false,
                    "confirmBeforeLaunch": false,
                    "description": "Show issues tracker for jx engine",
                    "onclick": "$showJXEngineIssues"
                }, {
                    "id": "ShowEditorEditionPage",
                    "title": "Editor Edition",
                    "type": "editionitems.ButtonItem",
                    "visible": "dev",
                    "editable": false,
                    "description": "Show the edition page of Editor App",
                    "onclick": "$showEditorEditionPage"
                }, {
                    "id": "TranspilEditor",
                    "title": "Editor Transpilation",
                    "type": "editionitems.ButtonItem",
                    "visible": "dev",
                    "editable": false,
                    "description": "Transpile Editor with Babel",
                    "onclick": "$editor_transpil"
                }, {
                    "id": "MajBobaGitToServer",
                    "title": "Server Update",
                    "type": "editionitems.ButtonItem",
                    "visible": "dev",
                    "editable": false,
                    "description": "pull boba git repos from server",
                    "onclick": "$maj_boba_git_to_server"
                }, {
                    "id": "GenerateAPI_Doc",
                    "title": "Generate API Doc",
                    "type": "editionitems.ButtonItem",
                    "visible": "dev",
                    "editable": false,
                    "description": "Re-generate the API doc",
                    "onclick": "$jxes6doc_generate"
                }, {
                    "id": "IdentificationSSH",
                    "title": "Identification SSH",
                    "type": "editionitems.ButtonItem",
                    "visible": "dev",
                    "editable": false,
                    "description": "Connect to local ssh key",
                    "onclick": "$sshConnect"
                }, {
                    "id": "OpenFontsManager",
                    "title": "Ouvrir le gestionnaire de fontes",
                    "type": "editionitems.ButtonItem",

                    "editable": false,
                    "confirmBeforeLaunch": false,
                    "description": "Ouvrir le gestionnaire de fontes",
                    "onclick": "$open_fonts_manager"
                }];
                this.popupGabarit({ id: 'PanelAdmin', title: "Administration", gabarit: gabarit });
            }
        }, {
            key: "popup",
            value: function popup(_ref7) {
                var title = _ref7.title;
                var _ref7$content = _ref7.content;
                var content = _ref7$content === undefined ? '' : _ref7$content;
                var _ref7$width = _ref7.width;
                var width = _ref7$width === undefined ? '600' : _ref7$width;
                var _ref7$buttons = _ref7.buttons;
                var buttons = _ref7$buttons === undefined ? {} : _ref7$buttons;
                var _ref7$onclose = _ref7.onclose;
                var onclose = _ref7$onclose === undefined ? function (evt) {} : _ref7$onclose;

                var item = $("<div id=\"content\" class=\"form-group\" style=\"font-size:14px\"></div>");
                item.append(content);
                var onevent = function onevent(evt) {
                    console.log($(evt.target).data("bb-handler"));
                    onclose({ target: dial, action: $(evt.target).data("bb-handler") });
                };
                var buttonsArg = {};
                for (var prop in buttons) {
                    buttonsArg[prop] = {
                        id: prop,
                        label: buttons[prop].label || prop,
                        className: buttons[prop].className || "btn-default",
                        callback: onevent
                    };
                }
                var dial = bootbox.dialog({
                    title: title || "",
                    backdrop: true,
                    onEscape: function onEscape(evt) {
                        onclose({ target: dial, action: "no" });
                    },
                    message: item,
                    className: "bootbox_custom",
                    buttons: buttonsArg
                });
                if (!title) {
                    $(dial).find(".modal-header").css("display", "none");
                }
                if (width) {
                    $(dial).find(".modal-dialog").css({ width: width });
                }

                return dial;
            }
        }, {
            key: "alert",
            value: function alert(_ref8) {
                var title = _ref8.title;
                var _ref8$content = _ref8.content;
                var content = _ref8$content === undefined ? '' : _ref8$content;
                var _ref8$closable = _ref8.closable;
                var closable = _ref8$closable === undefined ? true : _ref8$closable;
                var _ref8$onclose = _ref8.onclose;
                var onclose = _ref8$onclose === undefined ? function (evt) {} : _ref8$onclose;

                var item = $("<div id=\"content\" class=\"form-group\">" + content + "</div>");
                var dial = bootbox.dialog({
                    title: title || "",
                    backdrop: closable,
                    onEscape: closable,
                    closeButton: closable,
                    message: item,
                    className: "bootbox_custom"
                });
                if (!title) {
                    $(dial).find(".modal-header").css("display", "none");
                }
                return dial;
            }
        }, {
            key: "confirm",
            value: function confirm(_ref9) {
                var _ref9$title = _ref9.title;
                var title = _ref9$title === undefined ? "" : _ref9$title;
                var _ref9$content = _ref9.content;
                var content = _ref9$content === undefined ? "" : _ref9$content;
                var _ref9$onclose = _ref9.onclose;
                var onclose = _ref9$onclose === undefined ? function (evt) {} : _ref9$onclose;
                var _ref9$okLabel = _ref9.okLabel;
                var okLabel = _ref9$okLabel === undefined ? "Lancer" : _ref9$okLabel;
                var _ref9$cancelLabel = _ref9.cancelLabel;
                var cancelLabel = _ref9$cancelLabel === undefined ? "Fermer" : _ref9$cancelLabel;

                this.popup({
                    title: title,
                    content: "<h3>" + content + "</h3>",
                    buttons: {
                        ok: { label: okLabel },
                        close: { label: cancelLabel }
                    },
                    onclose: onclose
                });
            }
        }, {
            key: "popupURL",
            value: function popupURL(_ref10) {
                var _ref10$id = _ref10.id;
                var id = _ref10$id === undefined ? '' : _ref10$id;
                var _ref10$url = _ref10.url;
                var url = _ref10$url === undefined ? '' : _ref10$url;

                var popupContent = $("\n\t\t\t<iframe id=" + id + " src=\"" + url + "\" style=\"border:0\" width=\"100%\" height=\"100%\">\n  \t\t\t\t<p>Votre navigateur ne supporte pas l'élément iframe</p>\n\t\t\t</iframe>\n\t\t");
                var dial = bootbox.dialog({
                    title: id,
                    backdrop: true,
                    onEscape: true,
                    message: popupContent,
                    className: "bootbox_custom"
                });
                $(dial).find("div").css("width", "100%");
                $(dial).find("div").css("height", "100%");
                $(dial).find(".modal-header").css("display", "none");
                $(dial).find(".modal-header").css("height", "20px");
                $(dial).find(".modal-title").css("font-size", "9px");
                $(dial).find("div").css("margin", "0px");
                $(dial).find("div").css("padding", "0px");
                $(dial).find(".modal-dialog").css("width", "90%");
                $(dial).find(".modal-dialog").css("height", "90%");
                $(dial).find(".modal-dialog").css("margin", "auto");
                $(dial).find(".modal-dialog").css("margin-top", "10px");
                $(dial).find(".modal-body").css("padding", "5px");
                $(dial).find(".modal-body").css("padding-bottom", "5px");
            }
        }, {
            key: "popupGabarit",
            value: function popupGabarit(_ref11) {
                var _ref11$id = _ref11.id;
                var id = _ref11$id === undefined ? '' : _ref11$id;
                var title = _ref11.title;
                var _ref11$gabarit = _ref11.gabarit;
                var gabarit = _ref11$gabarit === undefined ? [] : _ref11$gabarit;
                var _ref11$buttons = _ref11.buttons;
                var buttons = _ref11$buttons === undefined ? {} : _ref11$buttons;
                var _ref11$onclose = _ref11.onclose;
                var onclose = _ref11$onclose === undefined ? function (evt) {} : _ref11$onclose;

                var compG = this.cc({ type: "editionitems.Group", data: { id: id, showHeader: false } });
                var children = [];
                for (var i = 0; i < gabarit.length; i++) {
                    var comp = this.cc({ type: gabarit[i].type, data: this.jx.tools.cloneObject(gabarit[i]) });
                    comp.view.find("#btn").css("text-align", "left");
                    comp.onchanged.add(function (evt) {
                        evt.target.data.value = evt.target.value;

                        console.log(evt.target.data);
                    });
                    $(compG.item).append($(comp.item));
                    children.push(comp);
                }
                ;
                var onevent = function onevent(evt) {
                    var result = {};
                    for (var i = 0; i < children.length; i++) {
                        result[children[i].data.id] = children[i].value;
                    }
                    ;
                    console.log(result);
                    onclose({ action: $(evt.target).data("bb-handler"), result: result });
                };
                var buttonsArg = {};
                for (var prop in buttons) {
                    buttonsArg[prop] = {
                        label: buttons[prop].label || prop,
                        className: buttons[prop].className || "btn-success",
                        callback: onevent
                    };
                }
                var dial = bootbox.dialog({
                    title: title || id || "",
                    backdrop: true,
                    onEscape: function onEscape(evt) {
                        console.log();
                    },
                    message: $(compG.item),
                    className: "bootbox_custom",
                    buttons: buttonsArg
                });
                $(dial).find(".modal-content").css("width", "100%");
                $(dial).find(".modal-content").css("height", "100%");
                $(dial).find("modal-body").css("width", "100%");
                $(dial).find("modal-body").css("height", "100%");
                if (!title) {
                    $(dial).find(".modal-header").css("display", "none");
                }
                $(dial).find(".modal-dialog").css("width", "90%");
                $(dial).find(".modal-dialog").css("height", "80%");
                $(dial).find(".modal-dialog").css("margin", "auto");
                $(dial).find(".modal-dialog").css("margin-top", "10px");
                $(dial).find(".modal-body").css("padding", "5px");
                $(dial).find(".modal-body").css("padding-bottom", "5px");
                return dial;
            }
        }, {
            key: "createNewProjectDialog",
            value: function createNewProjectDialog(appData) {
                var _this9 = this;

                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("createNewProjectDialog :");
                var popupContent = $("\n\t\t<div class=\"white-popup\">\n\t\t\t\n\t    \t<div class=\"form-group\">\n\t\t    \t<label>idProject<input type=\"text\" id=\"idProject\" ></label>\n\t\t  \t</div>\n\t\t\t<div class=\"form-group\">\n\t\t    \t<i >Seuls A-Z, a-z, 0-9, '_' et '-' autorisés</i>\n\t\t  \t</div>\n\t    \t<div class=\"form-group\">\n\t\t    \t<div id=\"informations\" style=\"color:red;\"></div>\n\t\t  \t</div>\n\t\t  \t<button type=\"button\" class=\"btn btn-default\" title=\"Informations\" id=\"valider\">Valider</button>\n\t\t  \t\n\t\t </div>\n\t\t");

                var validate = function validate() {
                    var idProject = popupContent.find("#idProject").val();
                    console.log("valider", idProject);
                    if (idProject.search(/^[A-Za-z0-9_\-]{3,}$/) == -1) {
                        console.log("nogood");
                        popupContent.find("#informations").html("Format non valide. Seuls A-Z, a-z, 0-9, '_' et '-' autorisés");
                    } else {
                        _this9.jx.editor.filesExist({ projectPath: _this9.getDirectoryURL("projectsURL"), filePathArray: [{ src: idProject }] }, function (evt) {
                            if (evt.filePathArray[0].exists) {
                                popupContent.find("#informations").html("Ce nom est déjà utilisé par un projet existant. Veuillez en saisir un autre svp.");
                            } else {
                                $.magnificPopup.close();
                                console.log("idProject :", idProject, appData.modelData);
                                _this9.createNewProject({
                                    idNewProject: idProject,
                                    modelData: appData.modelData
                                }, callback);
                            }
                        });
                    }
                };
                popupContent.find("#valider").click(validate);
                popupContent.find("#idProject").on('keypress', function (evt) {
                    var code = evt.keyCode || evt.which;
                    if (code == 13) {
                        validate();
                    }
                });
                $.magnificPopup.open({
                    items: {
                        src: popupContent,
                        type: 'inline'
                    }
                });
                this.jx.wait(100, function (evt) {
                    popupContent.find("#idProject").focus();
                });
            }
        }, {
            key: "createNewProject",
            value: function createNewProject(_ref12) {
                var _this10 = this;

                var idNewProject = _ref12.idNewProject;
                var modelData = _ref12.modelData;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                this.host.callMethod("newProject", {
                    idNewProject: idNewProject,
                    modelData: modelData,
                    urlDest: this.getDirectoryURL("projectsURL")
                }, function () {
                    return callback({ id: idNewProject, url: _this10.getDirectoryURL("projectsURL") + "/" + idNewProject });
                });
            }
        }, {
            key: "preview",
            value: function preview(projectData) {
                var rid = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                this.jx.tools.openURL(projectData.url + "/public" + (rid ? "/?rid=" + rid : ""), rid || projectData.id);
            }
        }, {
            key: "editProject",
            value: function editProject(projectData) {
                this.jx.tools.openURL("?a=edit&id=" + projectData.id + "&url=" + encodeURIComponent(projectData.url), "editor_" + projectData.id);
            }
        }, {
            key: "moveProject",
            value: function moveProject(_ref13) {
                var url = _ref13.url;
                var targetID = _ref13.targetID;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                this.moveDir({
                    sourcePath: url,
                    destPath: "$" + targetID + url.replace("projects/", "").replace("projects/", "").replace("archives/", "").replace("moteurs/", "")
                }, callback);
            }
        }, {
            key: "download",
            value: function download(_ref14) {
                var url = _ref14.url;
                var _ref14$prefixZip = _ref14.prefixZip;
                var prefixZip = _ref14$prefixZip === undefined ? "" : _ref14$prefixZip;
                var _ref14$internPath = _ref14.internPath;
                var internPath = _ref14$internPath === undefined ? "" : _ref14$internPath;
                var _ref14$date = _ref14.date;
                var date = _ref14$date === undefined ? false : _ref14$date;

                window.location = "/services/download?prefixZip=" + prefixZip + "&url=" + url + "&internPath=" + internPath + "&date=" + date;
            }
        }, {
            key: "unzip",
            value: function unzip(_ref15) {
                var path = _ref15.path;
                var _ref15$dest = _ref15.dest;
                var dest = _ref15$dest === undefined ? null : _ref15$dest;
                var _ref15$deleteZipFile = _ref15.deleteZipFile;
                var deleteZipFile = _ref15$deleteZipFile === undefined ? true : _ref15$deleteZipFile;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                this.host.callMethod("unzip", {
                    zipPath: path,
                    dest: dest,
                    deleteZipFile: deleteZipFile
                }, function (result) {
                    console.log("unzip result : ", result);
                    if (callback) callback(result);
                });
            }
        }, {
            key: "zip",
            value: function zip(params) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                params = Object.assign({ url: null, prefixZip: "", internPath: "", date: false }, params);
                this.host.callMethod("zip", params, function (result) {
                    console.log("zip OK", result);
                    callback(result);
                });
            }
        }, {
            key: "saveJSON",
            value: function saveJSON(pathFile, object) {
                this.host.callMethod("writefile", {
                    url: pathFile,
                    text: JSON.stringify(object, null, 4) }, function () {});
            }
        }, {
            key: "cloneDir",
            value: function cloneDir(params) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                this.host.callMethod("cloneDir", params, function (result) {
                    console.log("cloneDir OK", result);
                    callback(result);
                });
            }
        }, {
            key: "cloneDirPromise",
            value: function cloneDirPromise(params) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                    var _this11 = this;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    new Promise(function (resolve) {
                                        _this11.host.callMethod("cloneDir", params, function (result) {
                                            console.log("cloneDir OK", result);
                                            resolve(result);
                                        });
                                    });

                                case 1:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }
        }, {
            key: "moveDir",
            value: function moveDir(params) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                params.options = params.options || {};
                params.options.deleteSource = true;
                console.log("moveDir", params);
                this.host.callMethod("cloneDir", params, function (result) {
                    console.log("moveDir OK", result);
                    callback(result);
                });
            }
        }, {
            key: "openFile",
            value: function openFile(_ref16) {
                var url = _ref16.url;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                this.jx.editor.host.callMethod("openFile", { url: url }, callback);
            }
        }, {
            key: "filesExist",
            value: function filesExist(_ref17) {
                var projectPath = _ref17.projectPath;
                var filePathArray = _ref17.filePathArray;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                this.jx.editor.host.callMethod("filesExist", { projectPath: projectPath, filePathArray: filePathArray }, callback);
            }
        }, {
            key: "refreshLocks",
            value: function refreshLocks(params, callback) {
                this.host.callMethod("refreshLocks", params, callback);
            }
        }]);

        return Editor;
    }(_Component3.default);

    exports.default = Editor;
});
//# sourceMappingURL=Editor.js.map