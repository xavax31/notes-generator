define(["exports", "jx/core/comps/Component", "jx/core/dataobjects/ProjectDataObject"], function (exports, _Component2, _ProjectDataObject) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

    var _ProjectDataObject2 = _interopRequireDefault(_ProjectDataObject);

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

    var ProjetManager = function (_Component) {
        _inherits(ProjetManager, _Component);

        function ProjetManager(dataObject) {
            _classCallCheck(this, ProjetManager);

            var _this = _possibleConstructorReturn(this, (ProjetManager.__proto__ || Object.getPrototypeOf(ProjetManager)).call(this, dataObject));

            _this.locked = false;
            _this.hooks = {
                beforeBuild: [],
                afterBuild: []
            };
            _this.addEventDispatcher("onlock", "onunlock");
            return _this;
        }

        _createClass(ProjetManager, [{
            key: "_create",
            value: function _create() {
                console.log("ProjetManager create");
                _get(ProjetManager.prototype.__proto__ || Object.getPrototypeOf(ProjetManager.prototype), "_create", this).call(this);
                this.editViewType = "jx/projecttypes/ProjectEditView";
                this.addEventDispatcher("onevent");
                this._functionnalities = ["editGabarit", "openProjectDir", "openTerminal", "openSublimeProject", "openVisualCodeProject", "serverSyncDial", "pullProject", "pushProject", "pushProjectSrc", "save", "testBtnDev", "generateAPIDoc", "showAPIDoc", "extraActionsGroup"];
                this.info = new _ProjectDataObject2.default();
            }
        }, {
            key: "hasFunctionnality",
            value: function hasFunctionnality(functionnalityID) {
                return this._functionnalities.indexOf(functionnalityID) != -1;
            }
        }, {
            key: "load",
            value: function load(onFinished) {}
        }, {
            key: "save",
            value: function save(onFinished) {}
        }, {
            key: "refreshInfo",
            value: function refreshInfo() {
                for (var i = 0; i < this.info.gabarit.length; i++) {
                    if (this.info.gabarit[i].id == "Informations") {
                        var projectGroupChildren = this.info.gabarit[i].children;
                        break;
                    }
                }
                ;
                var projectInfos = {};
                for (var i = 0; i < projectGroupChildren.length; i++) {
                    projectInfos[projectGroupChildren[i].id] = projectGroupChildren[i].value;
                }
                ;
                this.jx.tools.mergeObjectIn(this.info, projectInfos.project);
                this.info.engine = projectInfos.engine;
            }
        }, {
            key: "openTerminal",
            value: function openTerminal() {
                this.jx.editor.openTerminal(this.info.url);
            }
        }, {
            key: "gitInitWithBitBucketLink",
            value: function gitInitWithBitBucketLink() {
                this.jx.editor.gitInitWithBitBucketLink({ url: this.info.url }, function (evt) {
                    console.log(evt);
                });
            }
        }, {
            key: "dropbox",
            value: function dropbox() {
                var popup = this.jx.editor.popup({
                    title: "Zone de partage",
                    content: "<div id='dropbox1'  style='height:50px;background-color: #00FF00'></div>",
                    buttons: {
                        close: { label: "Close" }
                    },
                    onclose: function onclose(evt) {}
                });
                var dropzone = this.cc({ type: "editionitems.DropFilesZone", rootPath: this.info.url, dom: popup.find("#dropbox1") });
            }
        }, {
            key: "preview",
            value: function preview() {
                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            }
        }, {
            key: "export",
            value: function _export(callback) {
                var typeExport = arguments.length <= 1 || arguments[1] === undefined ? "Mix" : arguments[1];
            }
        }, {
            key: "createIndependantProject",
            value: function createIndependantProject() {
                var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
            }
        }, {
            key: "refreshLocks",
            value: function refreshLocks(_ref) {
                var _this2 = this;

                var url = _ref.url;
                var user = _ref.user;
                var _ref$lock = _ref.lock;
                var lock = _ref$lock === undefined ? null : _ref$lock;

                this.jx.editor.host.callMethod("refreshLocks", { url: url, user: user, lock: lock }, function (evt) {
                    if (evt.result == "success") {
                        _this2.locked = _this2.jx.editor.user;
                        _this2.onlock.dispatch({ target: _this2, locked: _this2.locked });
                    } else if (evt.result == "locked") {
                        _this2.locked = evt.user;
                        _this2.onlock.dispatch({ target: _this2, locked: _this2.locked });
                    } else {
                        _this2.locked = false;
                        _this2.onunlock.dispatch({ target: _this2, locked: _this2.locked });
                    }
                });
            }
        }, {
            key: "setAsLocked",
            value: function setAsLocked(_ref2) {
                var name = _ref2.name;

                if (name == this.jx.editor.user.name) {
                    this.locked = this.jx.editor.user;
                } else {
                    this.locked = { name: name };
                }
                this.onlock.dispatch({ target: this, locked: this.locked });
            }
        }, {
            key: "setAsUnlocked",
            value: function setAsUnlocked() {
                this.locked = false;
                this.onunlock.dispatch({ target: this, locked: this.locked });
            }
        }, {
            key: "lock",
            value: function lock(callback) {
                var _this3 = this;

                this.jx.editor.refreshLocks({ url: this.info.url, user: this.jx.editor.user, lock: true }, function (evt) {
                    if (evt.result == "success") {
                        _this3.locked = _this3.jx.editor.user;
                    } else {
                        _this3.locked = evt.user;
                    }
                    callback(evt);
                    _this3.onlock.dispatch({ target: _this3, locked: _this3.locked });
                });
            }
        }, {
            key: "unlock",
            value: function unlock(callback) {
                var _this4 = this;

                this.jx.editor.refreshLocks({ url: this.info.url, user: this.jx.editor.user, lock: false }, function (evt) {
                    if (evt.result == "success") {
                        _this4.locked = false;
                    }
                    callback(evt);
                    _this4.onunlock.dispatch({ target: _this4, locked: _this4.locked });
                });
            }
        }, {
            key: "openProjectDir",
            value: function openProjectDir() {
                this.jx.editor.execBash2("open_project_dir.sh -p " + this.info.url, function (evt) {});
            }
        }, {
            key: "openSublimeProject",
            value: function openSublimeProject() {
                var _this5 = this;

                this.jx.editor.openFile({ url: this.info.url + "/project.sublime-project" }, function (evt) {
                    if (!evt.success) {
                        _this5.jx.editor.alert({ title: "Project file not found", content: "project.sublime-project file not found in project directory." });
                    }
                    ;
                });
            }
        }, {
            key: "openVisualCodeProject",
            value: function openVisualCodeProject() {
                this.jx.editor.execBash({ commandline: "code .", rootDir: this.info.url }, function (evt) {});
            }
        }, {
            key: "getCurrentGitCommit",
            value: function getCurrentGitCommit() {
                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                this.jx.editor.getCurrentCommit({ url: this.info.url }, function (evt) {
                    callback(evt);
                });
            }
        }, {
            key: "goToRemoteProjectURL",
            value: function goToRemoteProjectURL() {
                this.jx.tools.openURL("http://dev.aws.milan.fr/editor/?a=edit&id=" + this.info.id + "&url=" + encodeURIComponent(this.info.url));
            }
        }, {
            key: "pullProject",
            value: function pullProject() {
                this.jx.editor.execBash2("pull_project.sh -l " + this.info.url + " -s " + this.info.url, function (evt) {});
            }
        }, {
            key: "pushProject",
            value: function pushProject() {
                this.jx.editor.execBash2("push_project.sh -l " + this.info.url + " -s " + this.info.url, function (evt) {});
            }
        }, {
            key: "pushProjectSrc",
            value: function pushProjectSrc() {
                this.jx.editor.execBash({
                    commandline: "push_project_src.sh -l " + this.info.url + " -s " + this.info.url + "",
                    output: "new"
                }, function (evt) {});
            }
        }, {
            key: "serverSyncDial",
            value: function serverSyncDial() {
                var _this6 = this;

                var popupContent = "\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Accéder à la page d'édition sur le serveur</h4>\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default label-info btn-lg small\" style=\"color:#000000;background-color:#27fd00\" title=\"Accéder à la page d'édition sur le serveur\" id=\"goToRemoteProjectURL\"><span class=\"fa fa-eye\"></span></button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t    <hr>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Envoyer vers le serveur</h4>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\n\t\t\t    \t\t<div style=\"font-size:14px\">TOUT</div>\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-info btn-lg\" title=\"Envoyer vers le serveur\" id=\"pushProject\", style= \"margin-bottom:20px\"><span class=\"fa fa-share-square-o\"></span></button>\n\n\t\t\t    \t\t<div style=\"font-size:14px\">CODE ONLY</div>\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-info btn-lg\" title=\"Envoyer vers le serveur (code seulement)\" id=\"pushProjectSrc\"><span class=\"fa fa-share-square-o\"></span><span class=\"fa fa-file-code-o\"></span></button>\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    \n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t\t\t\t<h4>Récupérer du serveur</h4>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-12\">\n\t\t\t    \t\t<button type=\"button\" class=\"btn btn-default label-info btn-lg\" title=\"Récupérer du serveur\" id=\"pullProject\"><span class=\"fa fa-level-down\"></span></button>\n\t\t\t    \t</div>\n\t\t\t    </div>\n\n\t\t\t    <hr>\n\t\t\t    \n\n\t\t";
                var popup = this.jx.editor.popup({ title: "Synchronisation avec le serveur", content: popupContent, width: 700, buttons: {}, onclose: function onclose(evt) {} });
                var popupReload = function popupReload() {};
                $(popup).find(".btn").click(function (evt) {
                    if ($(evt.currentTarget).attr("data-action")) {
                        var request = JSON.parse($(event.currentTarget).attr("data-action"));
                    } else {
                        request = { action: event.currentTarget.id, params: undefined };
                    }
                    switch (request.action) {
                        default:
                            if (_this6[request.action]) _this6[request.action](request, function (evt) {});
                    }
                });
            }
        }, {
            key: "transpilProject",
            value: function transpilProject() {
                var _this7 = this;

                this.jx.editor.deleteDir(this.info.url + "/public/js/src", function () {
                    _this7.jx.editor.execBash2("transpil_project.sh -u " + _this7.info.url, function (evt) {});
                });
            }
        }, {
            key: "exportProject",
            value: function exportProject(appData) {}
        }, {
            key: "downloadBuild",
            value: function downloadBuild() {}
        }, {
            key: "listEngineVersions",
            value: function listEngineVersions() {
                this.jx.editor.listVersions(function (evt) {
                    console.log(evt.versions);
                });
            }
        }, {
            key: "showAPIDoc",
            value: function showAPIDoc() {
                jx.tools.openURL(this.info.url + "/doc", "DOC - " + this.info.id);
            }
        }, {
            key: "generateAPIDoc",
            value: function generateAPIDoc() {
                this.jx.editor.execBash2("jxes6doc_generate_project.sh -u " + this.info.url, function (evt) {
                    console.log(evt.stdout);
                }, "new");
            }
        }, {
            key: "extraAction1",
            value: function extraAction1() {
                console.log("call extraAction1");
                this.jx.editor.host.callMethod("extraAction1", { info: this.info }, function (result) {
                    console.log("result extraAction1: ", result);
                });
            }
        }, {
            key: "addHook",
            value: function addHook(_ref3) {
                var hookID = _ref3.hookID;
                var method = _ref3.method;

                if (this.hooks[hookID]) {
                    this.hooks[hookID].push(method);
                } else {
                    console.error("hook with ID", hookID, "not exists");
                }
            }
        }, {
            key: "callHooks",
            value: function callHooks(_ref4, callback) {
                var hookID = _ref4.hookID;

                if (this.hooks[hookID]) {
                    this._callHooks({ hookID: hookID, callback: callback });
                } else {
                    console.error("hook with ID", hookID, "not exists");
                    callback();
                }
            }
        }, {
            key: "_callHooks",
            value: function _callHooks(_ref5) {
                var _this8 = this;

                var hookID = _ref5.hookID;
                var callback = _ref5.callback;
                var _ref5$index = _ref5.index;
                var index = _ref5$index === undefined ? -1 : _ref5$index;

                if (index < this.hooks[hookID].length - 1) {
                    index++;
                    this.hooks[hookID][index](function () {
                        _this8._callHooks({ hookID: hookID, callback: callback, index: index });
                    });
                } else {
                    callback();
                }
            }
        }]);

        return ProjetManager;
    }(_Component3.default);

    exports.default = ProjetManager;
});
//# sourceMappingURL=ProjectManager.js.map