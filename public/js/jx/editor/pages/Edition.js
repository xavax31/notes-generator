define(["exports", "jx/core/comps/Component", "jx/editor/editorcode/snippets/Snippets", "jx/editor/pages/edition_comps/MenuEdition", "jx/editor/pages/edition_comps/MenuEditionTop", "jx/editor/editionitems/GabaritObject"], function (exports, _Component2, _Snippets, _MenuEdition, _MenuEditionTop, _GabaritObject) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

    var _Snippets2 = _interopRequireDefault(_Snippets);

    var _MenuEdition2 = _interopRequireDefault(_MenuEdition);

    var _MenuEditionTop2 = _interopRequireDefault(_MenuEditionTop);

    var _GabaritObject2 = _interopRequireDefault(_GabaritObject);

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

    var userAccess = {
        editGabarit: "dev",
        openProjectDir: "dev",
        openTerminal: "dev",
        openSublimeProject: "dev",
        generateAPIDoc: "dev",
        extraActionsGroup: "dev",
        showAPIDoc: "dev",
        serverSyncDial: "dev",
        pullProject: "dev",
        pushProject: "dev",
        pushProjectSrc: "dev",
        preview: "*",
        previewDebug: "dev",
        previewDev: "dev",
        transpilProject: "dev",
        save: "dev",
        showVersion: "dev",
        testBtnDev: "dev",
        compareJSON: "dev",
        updateInternJX: "dev"
    };
    var gabaritEditorBox = "<div id=\"gabaritEditorBox\" style=\"display:none;top:150px\">\n<div class=\"row\" style=\"width:100%; background-color:#ADCCFF\">\n\t<div class=\"col-xs-12\" style=\"width:100%\">\n\t\t<input id=\"search\" type=\"search\"></input>\n\t\t<div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n\t\t\t<button type=\"button\" id=\"searchPrevious\" class=\"btn btn-default\" title=\"Next\"><span class=\"fa fa-arrow-left\"></span></button>\n\t\t\t<button type=\"button\" id=\"searchNext\" class=\"btn btn-default\"  title=\"Previous\"><span class=\"fa fa-arrow-right\"></span></button>\n\t\t</div>              \n\n\t\t<div id=\"snippetsBtns\" class=\"btn-group\" role=\"group\" aria-label=\"...\">\n\t\t</div>\n\n\t</div>           \n</div>    \n<div class=\"row\" style=\"height:93%;width:100%\">\n\t<div class=\"col-xs-12\" style=\"height:100%;width:100%\">\n\t\t<div id=\"gabaritEditor\" style=\"height:100%;width:100%\"></div>\n\t</div>           \n</div>    \n</div>\n";
    var viewsModels = {
        tab: "\n<div class=\"container-fluid\">\n    <div class=\"row\" >\n        <!-- MENU -->\n        <div class=\"col-xs-3\" id=\"myScrollspy\" style=\"top:120px;position:fixed\">\n            <ul id=\"mapList\" class=\"nav nav-pills nav-stacked nav-tabs\"></ul>\n        </div>\n        <!-- MENU END -->\n\n        <div class=\"col-xs-9 pull-right\" id=\"mapcontent\" style=\"top:80px\">\n            <div id=\"map\" class=\"tab-content content1\"></div>\n        </div>\n    </div>\n\t" + gabaritEditorBox + "\n\n </div>\n",
        flat: "\n<div class=\"container\">\n    <div class=\"row\">\n        <!-- MENU -->\n        <div class=\"col-xs-1\" id=\"myScrollspy\">\n            <ul id=\"mapList\" class=\"nav nav-pills nav-stacked  nav-tabs\"></ul>\n        </div>\n        <!-- MENU END -->\n\n        <div class=\"col-xs-11\" style=\"top:120px\">\n            <div id=\"map\"></div>\n        </div>\n    </div>\n\n\t" + gabaritEditorBox + "           \n</div>\n"
    };

    var Edition = function (_Component) {
        _inherits(Edition, _Component);

        function Edition(dataObject) {
            _classCallCheck(this, Edition);

            var _this = _possibleConstructorReturn(this, (Edition.__proto__ || Object.getPrototypeOf(Edition)).call(this, Object.assign({
                id: null,
                url: null,
                mode: "edititems"
            }, dataObject)));

            _this.lang = "fr";
            _this.activeTabParams = {};
            _this.uniqTabID = 0;
            _this._logsEnabled = false;
            _this.editor = _this.jx.editor;
            _this._connectToSockets();
            var projectURL = decodeURIComponent(_this.dataObject.url);
            _this.editor.getProjectManager({ url: projectURL }, function (projectManager) {
                _this.project = projectManager;
                _this.project.load(function (evt) {
                    _this._loadCustomComps(function () {
                        _this._loadFontsList(function () {
                            _this._createPage();
                        });
                    });
                });
            });
            return _this;
        }

        _createClass(Edition, [{
            key: "_createPage",
            value: function _createPage() {
                var _this2 = this;

                this.jx.loadingScreen.show();
                this.view = $("body");
                $('title').html(this.project.info.title && this.project.info.title.trim() != "" ? this.project.info.title : this.project.info.id);
                this.ccid({ id: "menuTop", type: _MenuEditionTop2.default });
                this.ccid({ id: "mainMenu", type: _MenuEdition2.default,
                    project: this.project,
                    controller: this
                });
                this.menuTop.setMenu(this.mainMenu);
                this.gabaritView = this._gabaritViewCreate();
                this.view.append(this.gabaritView.view);
                this.readMode();
                this.hideInfo();
                this.foldTexts();
                this.jx.wait(1000, function () {
                    _this2.refreshEditionView();
                    _this2.readMode();
                    _this2.hideInfo();
                    _this2.foldTexts();
                    _this2._setRemoteDeamon();
                    _this2.jx.loadingScreen.hide();
                });
                this._setLogs(this._logsEnabled);
            }
        }, {
            key: "_gabaritViewCreate",
            value: function _gabaritViewCreate() {
                var _this3 = this;

                var gabaritView = this.ccid({ id: "gabaritView", type: _GabaritObject2.default,
                    controller: this,
                    template: viewsModels,
                    mode: this.dataObject.mode,

                    tabs: true
                });
                gabaritView.onchanged.add(function (evt) {
                    console.log(!evt.firstItem.saveOnChange, evt);
                    if (evt.firstItem.saveOnChange === false) return;
                    _this3.save();
                });
                return gabaritView;
            }
        }, {
            key: "_connectToSockets",
            value: function _connectToSockets() {
                var _this4 = this;

                this.editor.host.io.on('userAction', function (_ref) {
                    var username = _ref.username;
                    var context = _ref.context;
                    var action = _ref.action;
                    var args = _ref.args;

                    if (_this4.jx.config.system.host.type != "local" && context != "local") {
                        if (action == "lockProject") {
                            console.log('User ' + username + " lock project ");
                            if (_this4.project.info.url == args.url) {
                                _this4.project.setAsLocked({ name: username });
                            }
                        } else if (action == "unlockProject") {
                            console.log('User ' + username + " unlock project ");
                            if (_this4.project.info.url == args.url) {
                                if (_this4._modeDisplay != "edit") {
                                    _this4.project.setAsUnlocked();
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    } else if (_this4.jx.config.system.host.type == "local" && context == "local") {
                            console.log('User (for local treatment)' + username + "(", context, ") make action " + action, args);
                            if (action == "lockProject") {
                                console.log('User ' + username + " lock project ");
                                if (_this4.project.info.url == args.url) {
                                    _this4.project.setAsLocked({ name: username });
                                }
                            } else if (action == "unlockProject") {
                                console.log('User ' + username + " unlock project ");
                                if (_this4.project.info.url == args.url) {
                                    _this4.project.setAsUnlocked();
                                }
                                ;
                            }
                            ;
                        } else if (_this4.jx.config.system.host.type == "local") {
                                console.log('User (for local treatment)' + username + "(", context, ") make action " + action, args);
                            }
                });
            }
        }, {
            key: "_setLogs",
            value: function _setLogs(enabled) {
                var _this5 = this;

                if (enabled) {
                    this.editor.createDir(this.project.info.url + "/logs");
                    this.gabaritView.onchanged.add(function (evt) {
                        var date = new Date();
                        var dateStr = date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate() + "-" + Number(date.getHours() + 1) + "h" + Number(date.getMinutes() + 1) + "m" + Number(date.getSeconds() + 1) + "s";
                        console.log("gabarit onchanged", evt.firstItem.data.id, "to", evt.firstItem.value || "", "by", _this5.editor.user.name, "at", dateStr);
                        _this5.jx.db.saveJSONCompressed(_this5.project.info.url + "/logs/" + dateStr + ".log", {
                            date: dateStr,
                            user: _this5.editor.user.name,
                            itemID: evt.firstItem.data.id,
                            value: evt.firstItem.value || ""
                        });
                    });
                }
            }
        }, {
            key: "_loadComps",
            value: function _loadComps(callback) {
                var _this6 = this;

                var toLoad = [];
                this.foreachInGabarit({ gabarit: this.project.info.gabarit, func: function func(item) {
                        var path = item.type.split('.');
                        if (path[0] == "comps") {
                            if (!_this6.jx.db.classDefined(path.join("/"))) {
                                toLoad.push({ id: item.type, type: "class", src: path.join("/") });
                            }
                            ;
                        } else if (path[0] == "local") {
                            var url = path.join("/").replace("local", _this6.project.info.url + "/public/js/src/editor") + "/Index.js";
                            if (!_this6.jx.db.classDefined(url)) {
                                toLoad.push({ id: item.type, type: "class", src: url });
                            }
                            ;
                        }
                    } });
                this.jx.db.addAndLoad(toLoad, callback);
            }
        }, {
            key: "_loadCustomComps",
            value: function _loadCustomComps(callback) {
                var _this7 = this;

                var toLoad = [];
                this.foreachInGabarit({ gabarit: this.project.info.gabarit, func: function func(item) {
                        var path = item.type.split('.');
                        if (path[0] == "comps") {
                            if (!_this7.jx.db.classDefined(path.join("/"))) {
                                toLoad.push({ id: item.type, type: "class", src: path.join("/") });
                            }
                            ;
                        } else if (path[0] == "local") {
                            var url = path.join("/").replace("local", _this7.project.info.url + "/public/js/src/editor") + ".js";
                            if (!_this7.jx.db.classDefined(url)) {
                                toLoad.push({ id: item.type, type: "class", src: url });
                            }
                            ;
                        }
                    } });
                this.jx.db.addAndLoad(toLoad, callback);
            }
        }, {
            key: "_loadFontsList",
            value: function _loadFontsList(callback) {
                var _this8 = this;

                this.jx.db.addAndLoad({ id: "ResourcesFontsList", type: "json",
                    src: "/resources/milan-presse/fonts/fonts.json" }, function (evt) {
                    if (evt.resources.ResourcesFontsList.data) {
                        var json = evt.resources.ResourcesFontsList.data;
                        console.log(json);
                        _this8.editor.getOptionsList().fontsDefs = json.fontsList;
                        var fontsNameArr = [];
                        for (var i = 0; i < json.fontsList.length; i++) {
                            fontsNameArr.push(json.fontsList[i].fontFamily);
                        }
                        _this8.editor.getOptionsList().fonts = fontsNameArr;
                    } else {
                        _this8.editor.getOptionsList().fonts = [];
                        _this8.editor.getOptionsList().fontsDefs = [];
                    }
                    callback();
                });
            }
        }, {
            key: "addNewTab",
            value: function addNewTab() {
                var _this9 = this;

                console.log(this.gabaritView.gabarit);
                this.uniqTabID++;
                var idTab = "NEW_TAB_" + this.uniqTabID;
                this.gabaritView.gabarit.push({
                    id: idTab,
                    type: "Group",
                    children: [{
                        "id": "DeleteQuiz",
                        "title": "Supprimer ce quiz",
                        "type": "editionitems.ButtonItem",
                        "description": "",
                        "confirmBeforeLaunch": true,
                        "onclick": function onclick() {
                            return _this9.deleteTab(idTab);
                        }
                    }]
                });
                this.save(function () {
                    _this9.refreshEditionView();
                });
            }
        }, {
            key: "deleteTab",
            value: function deleteTab(idTab) {
                var _this10 = this;

                this.removeInGabarit({ id: idTab, gabarit: this.gabaritView.gabarit });
                if (this.activeTab == idTab) this.activeTab = null;
                this.save(function () {
                    _this10.refreshEditionView();
                });
            }
        }, {
            key: "showTab",
            value: function showTab(idTab) {
                $('.nav-tabs a[href="#' + idTab + '"]').tab('show');
            }
        }, {
            key: "changeTitleTab",
            value: function changeTitleTab(idTab, title) {
                $('.nav-tabs a[href="#' + idTab + '"]').html(title);
            }
        }, {
            key: "testBtnDev",
            value: function testBtnDev() {
                var list = this.jx.loadedPlugs;
                var result = "require([";
                console.log(list);
                for (var i = 0; i < list.length; i++) {
                    result += "\"" + list[i].src + "\"" + (i == list.length - 1 ? "" : ",") + "\n";
                }
                console.log(result);
            }
        }, {
            key: "_setRemoteDeamon",
            value: function _setRemoteDeamon() {
                var _this11 = this;

                this._deamon = this.cc({
                    type: "Daemon",
                    interval: 30000,
                    func: function func(evt) {
                        _this11.project.refreshLocks({
                            url: _this11.project.info.url,
                            user: _this11.editor.user,
                            lock: _this11._modeDisplay == "edit" || null
                        });
                    }
                });
                this._deamon.start();
            }
        }, {
            key: "hasAccess",
            value: function hasAccess(functionnality) {
                var _jx$editor;

                if (!this.project.hasFunctionnality(functionnality)) return false;
                if (this.editor.user.group == "admin") return true;
                var arr = userAccess[functionnality].split(",");
                return (_jx$editor = this.jx.editor).userIsGroup.apply(_jx$editor, _toConsumableArray(arr));
            }
        }, {
            key: "showInfo",
            value: function showInfo() {
                this.mainMenu.btInfosToggle(false);
                this.gabaritView.showAllInfos();
            }
        }, {
            key: "hideInfo",
            value: function hideInfo() {
                this.mainMenu.btInfosToggle(true);
                this.gabaritView.hideAllInfos();
            }
        }, {
            key: "unfoldTexts",
            value: function unfoldTexts() {
                this.mainMenu.btUnfoldTextsToggle(false);
                this.gabaritView.textFold = false;
            }
        }, {
            key: "foldTexts",
            value: function foldTexts() {
                this.mainMenu.btUnfoldTextsToggle(true);
                this.gabaritView.textFold = true;
            }
        }, {
            key: "readMode",
            value: function readMode() {
                var _this12 = this;

                if (this._modeDisplay == "edit") {
                    this.editor.host.io.emit('userAction', {
                        username: this.editor.user.name,
                        context: this.jx.config.system.host.type,
                        action: "unlockProject",
                        args: { url: this.project.info.url }
                    });
                }
                ;
                this.project.unlock(function (evt) {
                    console.log(evt);
                    _this12._modeDisplay = "read";

                    _this12.gabaritView.lock = true;
                });
            }
        }, {
            key: "editMode",
            value: function editMode() {
                var _this13 = this;

                if (this.project.info.permanentLock && !this.editor.userIsGroup(this.project.info.permanentLock) && this.editor.user.name != this.project.info.permanentLock) {
                    this.editor.popup({
                        title: "Edition bloquée",
                        content: "Le projet " + this.project.info.id + "  est en cours de dev et bloqué par " + this.project.info.permanentLock + ". \n\t\t\t\t"
                    });
                } else {
                    this.project.lock(function (evt) {
                        switch (evt.result) {
                            case "success":
                                _this13._modeDisplay = "edit";
                                _this13.editor.host.io.emit('userAction', {
                                    username: _this13.editor.user.name,
                                    context: _this13.jx.config.system.host.type,
                                    action: "lockProject",
                                    args: { url: _this13.project.info.url }
                                });
                                _this13.reload(function (evt) {
                                    _this13.gabaritView.lock = false;
                                });
                                break;
                            case "locked":
                                _this13.editor.popup({
                                    title: "Edition bloquée",
                                    content: "Le projet " + _this13.project.info.id + "  est déjà en cours d'édition par " + evt.user.name + ". <br/>\n\t\t\t\t\t\t\t\tRéessayez quand il aura fini ou demandez lui de débloquer le projet."
                                });
                                console.log("Project", _this13.project.info.id, "already locked by", evt.user.name);
                                break;
                        }
                    });
                }
            }
        }, {
            key: "refreshEditionView",
            value: function refreshEditionView() {
                var _this14 = this;

                this.gabaritView.gabarit = this.project.info.gabarit;
                this.gabaritView.refreshView();
                $('.nav-tabs a').on('shown.bs.tab', function (event) {
                    _this14.activeTab = $(event.target).attr("href").replace("#", "");
                    _this14.activeTabParams[_this14.activeTab] = _this14.activeTabParams[_this14.activeTab] || { scroll: 0 };
                    _this14.gabaritView.editView.find("#mapcontent").scrollTop(_this14.activeTabParams[_this14.activeTab].scroll);
                });
                this.activeTab = this.activeTab || "Informations";
                this.showTab(this.activeTab);
                if (this.gabaritView.modeDisplay == "tab") {
                    $("body").css("overflow", "hidden");
                } else {
                    $("body").css("overflow", "auto");
                }
                var top = $("#MainTopMenu").position().top + $("#MainTopMenu").outerHeight();
                $("#myScrollspy").css("top", top + "px");
                $("#mapcontent").css("top", top + "px");
                $("#myScrollspy").height($(window.top).height() - top);
                $("#myScrollspy").css("overflow", "auto");
                $("#mapcontent").height($(window.top).height() - top);
                $("#mapcontent").css("overflow", "auto");
                $(window).on("resize", function () {
                    var top = $("#MainTopMenu").position().top + $("#MainTopMenu").outerHeight();
                    $("#myScrollspy").css("top", top + "px");
                    $("#mapcontent").css("top", top + "px");
                    $("#myScrollspy").height($(window.top).height() - top);
                    $("#myScrollspy").css("overflow", "hidden");
                    $("#mapcontent").height($(window.top).height() - top);
                    $("#mapcontent").css("overflow", "hidden");
                    _this14.jx.wait(0, function () {
                        $("#myScrollspy").css("overflow", "auto");
                        $("#mapcontent").css("overflow", "auto");
                    });
                });
                this.setGabaritEditor();
                this.activeTabParams[this.activeTab] = this.activeTabParams[this.activeTab] || { scroll: 0 };
                this.gabaritView.editView.find("#mapcontent").scrollTop(this.activeTabParams[this.activeTab].scroll);
            }
        }, {
            key: "reload",
            value: function reload(callback) {
                var _this15 = this;

                this.jx.loadingScreen.show();
                this.project.load(function (evt) {
                    _this15._loadCustomComps(function () {
                        _this15.refreshEditionView();
                        _this15.jx.loadingScreen.hide();
                        callback();
                    });
                });
            }
        }, {
            key: "showScreen",
            value: function showScreen(screenID) {
                this.project.preview(null, screenID);
            }
        }, {
            key: "showItem",
            value: function showItem(itemData) {
                if (itemData.type == "DataObject" || itemData.type == "FlashtmlPack") {
                    this.project.previewDev(itemData.id);
                    return;
                }
                ;
                switch (itemData.asset.type) {
                    case "ImageSequence":
                        var win = window.open("/editor/viewer/public/?id=" + itemData.id + "&type=ImageSequence&start=" + itemData.asset.start + "&end=" + itemData.asset.end + "&src=" + encodeURIComponent(this.project.info.url + "/public/assets/" + itemData.asset.src), "_blank");
                        break;
                    case "Flashtml":
                        var win = window.open("/editor/viewer/public/?id=" + itemData.id + "&type=Flashtml&src=" + encodeURIComponent(this.project.info.url + "/public/assets/" + itemData.asset.src), "_blank");
                        break;
                    case "Video":
                        console.log(this.project.info.url + "/public/" + itemData.asset.src);
                        var win = window.open("", "_blank");
                        var content = "\n\t\t\t\t\t<video controls preload >\n\t\t\t\t\t\t<source src= \"" + (this.project.info.url + "/public/assets/" + itemData.asset.src) + "\", type= 'video/mp4; codecs=avc1.42E01E,mp4a.40.2' />\n\t\t\t\t\t</video>\n\t\t\t\t";
                        win.document.write("<head><title>" + itemData.id + "</title></head><body style='background-color:#EEEEEE'>" + content + "</body>");
                        win.document.close();
                        break;
                    case "Sound":
                        console.log(this.project.info.url + "/public/" + itemData.asset.src);
                        var win = window.open("", "_blank");
                        var src = (this.project.info.url + "/public/assets/" + itemData.asset.src).replace("${lang}", this.lang);
                        win.document.write("<head><title>" + itemData.id + "</title></head><body><h1>" + itemData.id + "</h1><audio autoplay controls src='" + src + "' /></body>");
                        win.document.close();
                        break;
                    case "Image":
                        console.log(this.project.info.url + "/public/" + itemData.asset.src);
                        var win = window.open("", "_blank");
                        win.document.write("<head><title>" + itemData.id + "</title></head><body style='background-color:#EEEEEE'><img  src='" + this.project.info.url + "/public/assets/" + itemData.asset.src + "' /></body>");
                        win.document.close();
                        break;
                    case "PSD":
                    case "FLA":
                    case "PDF":
                        console.log(this.project.info.url + "/public/" + itemData.asset.src, itemData.id);
                        var win = window.open(this.project.info.url + "/public/assets/" + itemData.asset.src, itemData.id);
                        win.document.title = itemData.id;
                        break;
                    default:
                        console.warn("preview for type: ", itemData.asset.type, " not exists");
                        break;
                }
            }
        }, {
            key: "downloadItem",
            value: function downloadItem(itemData) {
                var src = (this.project.info.url + "/public/assets/" + itemData.asset.src).replace("${lang}", this.lang);
                this.editor.download({
                    url: src,
                    prefixZip: this.project.info.id,
                    internPath: src.split("/").pop()
                });
            }
        }, {
            key: "deleteItemLinkedFile",
            value: function deleteItemLinkedFile(itemData) {
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];

                console.log("deleteItemLinkedFile", itemData);
                var src = (this.project.info.url + "/public/assets/" + itemData.asset.src).replace("${lang}", this.lang);
                this.editor.deleteFile(src, function (evt) {
                    console.log("edition deleted", evt);
                    callback(evt);
                });
            }
        }, {
            key: "openParentDirectory",
            value: function openParentDirectory(itemData) {
                var src = (this.project.info.url + "/public/assets/" + itemData.asset.src).replace("${lang}", this.lang);
                var urlArray = src.split("/");
                urlArray.pop();
                var parentDirURL = urlArray.join("/");
                this.editor.openFile({
                    url: parentDirURL
                });
            }
        }, {
            key: "pushFile",
            value: function pushFile(itemData) {
                console.log("push", itemData);
            }
        }, {
            key: "pullFile",
            value: function pullFile(itemData) {
                console.log("pull", itemData);
            }
        }, {
            key: "getInGabarit",
            value: function getInGabarit(_ref2) {
                var id = _ref2.id;
                var gabarit = _ref2.gabarit;

                gabarit = gabarit || this.project.info.gabarit;
                console.log(id);
                console.log(gabarit);
                for (var i = 0; i < gabarit.length; i++) {
                    console.log(gabarit[i].id);
                    if (gabarit[i].id == id) {
                        console.log("FOUND");
                        return gabarit[i];
                    } else if (gabarit[i].type == "Group") {
                        console.log("Group", gabarit[i].id);
                        var childrenG = this.getInGabarit({ id: id, gabarit: gabarit[i].children });
                        if (childrenG != null) {
                            return this.getInGabarit({ id: id, gabarit: gabarit[i].children });
                        }
                        ;
                    }
                }
                ;
                return null;
            }
        }, {
            key: "foreachInGabarit",
            value: function foreachInGabarit(_ref3) {
                var gabarit = _ref3.gabarit;
                var func = _ref3.func;

                gabarit = gabarit || this.project.info.gabarit;
                var results = [];
                for (var i = 0; i < gabarit.length; i++) {
                    func(gabarit[i]);
                    if (gabarit[i].children) {
                        var childrenG = this.foreachInGabarit({ gabarit: gabarit[i].children, func: func });
                    }
                }
                ;
            }
        }, {
            key: "getInGabaritByType",
            value: function getInGabaritByType(_ref4) {
                var type = _ref4.type;
                var _ref4$gabarit = _ref4.gabarit;
                var gabarit = _ref4$gabarit === undefined ? this.project.info.gabarit : _ref4$gabarit;

                var results = [];
                for (var i = 0; i < gabarit.length; i++) {
                    if (gabarit[i].type == type) {
                        results.push(gabarit[i]);
                    } else if (gabarit[i].children) {
                        var childrenG = this.getInGabaritByType({ type: type, gabarit: gabarit[i].children });
                        if (childrenG != null) {
                            results = results.concat(childrenG);
                        }
                        ;
                    }
                }
                ;
                return results;
            }
        }, {
            key: "removeInGabarit",
            value: function removeInGabarit(_ref5) {
                var id = _ref5.id;
                var gabarit = _ref5.gabarit;

                gabarit = gabarit || this.project.info.gabarit;
                console.log(id);
                console.log(gabarit);
                for (var i = 0; i < gabarit.length; i++) {
                    console.log(gabarit[i].id);
                    if (gabarit[i].id == id) {
                        console.log("FOUND");
                        gabarit.splice(i, 1);
                        return true;
                    } else if (gabarit[i].type == "Group") {
                        console.log("Group", gabarit[i].id);
                        var childrenG = this.getInGabarit({ id: id, gabarit: gabarit[i].children });
                        if (childrenG != null) {
                            return this.getInGabarit({ id: id, gabarit: gabarit[i].children });
                        }
                        ;
                    }
                }
                ;
                return false;
            }
        }, {
            key: "generateFontsListCSS",
            value: function generateFontsListCSS() {
                var fontList = this.getInGabaritByType({ type: "TextStyle2" });
                var resultCSS = "";
                var parsed = [];
                for (var i = 0; i < fontList.length; i++) {
                    var fontFamily = fontList[i].value.fontFamily + "-" + fontList[i].value.fontStyle;
                    if (parsed.indexOf(fontFamily) !== -1) continue;
                    parsed.push(fontFamily);
                    var fontCSS = "@font-face {\n\t\t\t  font-family: '" + fontFamily + "';\n\t\t\t  src: url('../assets/fonts/" + fontFamily + "/" + fontFamily + ".eot');\n\t\t\t  src: url('../assets/fonts/" + fontFamily + "/" + fontFamily + ".woff2') format('woff2'),\n\t\t\t       url('../assets/fonts/" + fontFamily + "/" + fontFamily + ".woff') format('woff'),\n\t\t\t       url('../assets/fonts/" + fontFamily + "/" + fontFamily + ".ttf') format('truetype'),\n\t\t\t       url('../assets/fonts/" + fontFamily + "/" + fontFamily + ".svg#" + fontFamily + "') format('svg'),\n\t\t\t       url('../assets/fonts/" + fontFamily + "/" + fontFamily + ".eot?#iefix') format('embedded-opentype');\n\t\t\t  font-weight: normal;\n\t\t\t  font-style: normal;\n\t\t\t}\n\t\t\t";
                    resultCSS += fontCSS + "\n\n";
                }
            }
        }, {
            key: "save",
            value: function save() {
                var _this16 = this;

                var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

                console.log("save");
                this.project.refreshInfo();
                this.generateFontsListCSS();

                var title = this.project.info.title && this.project.info.title.trim() != "" ? this.project.info.title : this.project.info.id;
                $('title').html(title);
                this.mainMenu.setProjectTitle(title);
                if (this.editView.find("#gabaritEditorBox").css("display") == "none") {
                    this.exportConfig(callback);
                } else {
                    if (this._gabaritEditorErrors.length > 0) {
                        var annot = this.gabaritEditor.getSession().getAnnotations();
                        var content = [];
                        for (var key in annot) {
                            content.push(annot[key].text + "on line " + " " + annot[key].row);
                        }
                        this.editor.popup({
                            title: "There are some errors",
                            content: content.join("\n"),
                            onclose: function onclose(evt) {}
                        });
                        this.gabaritEditor.gotoLine(annot[key].row);
                    } else {
                        this.saveGabaritIntern(function () {
                            return _this16.reload(function () {
                                _this16.exportConfig(function () {
                                    _this16.gabaritEditorLastPosition = _this16.gabaritEditorLastPosition || { row: 0, column: 1 };
                                    _this16.gabaritEditor.resize(true);
                                    _this16.gabaritEditor.moveCursorTo(_this16.gabaritEditorLastPosition.row + 1, _this16.gabaritEditorLastPosition.column + 1);
                                    _this16.gabaritEditor.gotoLine(_this16.gabaritEditorLastPosition.row);

                                    if (callback) {
                                        callback();
                                    }
                                });
                            });
                        });
                    }
                }
            }
        }, {
            key: "saveFromJSONEDitor",
            value: function saveFromJSONEDitor(callback) {
                var _this17 = this;

                this.save(function (evt) {
                    _this17.editGabarit();
                });
            }
        }, {
            key: "exportConfig",
            value: function exportConfig(callback) {
                var _this18 = this;

                try {
                    var jsonObj = JSON.parse(JSON.stringify(this.project.info.gabarit));
                    this.project.save(function (evt) {
                        _this18.loadGabaritIntern(function () {
                            if (callback) {
                                callback();
                            }
                        });
                    });
                } catch (err) {
                    console.log(this.project.info.gabarit);
                    alert("Project can't be saved. an error occurs in json: " + err.message);
                    this.reload(function () {});
                }
            }
        }, {
            key: "editGabaritExtern",
            value: function editGabaritExtern() {
                var win = window.open("/editor/jsoneditor/?src=" + encodeURIComponent(this.project.info.url + "/etc/editor/editor.json"), "_blank");
            }
        }, {
            key: "_showGabaritEditor",
            value: function _showGabaritEditor() {
                this.menuTop.hideComponent("pagesTabs");
                window.scrollTo(0, 0);

                this.mainMenu.btGabaritJSONEditorToggle(true);
                this.editView.find("#gabaritEditorBox").css("display", "inline");
                this.gabaritEditorLastPosition = this.gabaritEditorLastPosition || { row: 0, column: 1 };
                this.gabaritEditor.resize(true);
                this.gabaritEditor.moveCursorTo(this.gabaritEditorLastPosition.row, this.gabaritEditorLastPosition.column);
                this.gabaritEditor.gotoLine(this.gabaritEditorLastPosition.row);
            }
        }, {
            key: "_hideGabaritEditor",
            value: function _hideGabaritEditor() {
                this.editView.find("#gabaritEditorBox").css("display", "none");
                this.menuTop.showComponent("pagesTabs");
                this.mainMenu.btGabaritJSONEditorToggle(false);
            }
        }, {
            key: "editGabarit",
            value: function editGabarit() {
                var gabaritIsVisible = this.editView.find("#gabaritEditorBox").css("display") != "none";
                if (gabaritIsVisible) {
                    this._hideGabaritEditor();
                } else {
                    this._showGabaritEditor();
                }
            }
        }, {
            key: "showInGabarit",
            value: function showInGabarit(search) {
                var _ref6 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                var _ref6$backwards = _ref6.backwards;
                var backwards = _ref6$backwards === undefined ? false : _ref6$backwards;
                var _ref6$wrap = _ref6.wrap;
                var wrap = _ref6$wrap === undefined ? false : _ref6$wrap;
                var _ref6$caseSensitive = _ref6.caseSensitive;
                var caseSensitive = _ref6$caseSensitive === undefined ? false : _ref6$caseSensitive;
                var _ref6$wholeWord = _ref6.wholeWord;
                var wholeWord = _ref6$wholeWord === undefined ? false : _ref6$wholeWord;
                var _ref6$regExp = _ref6.regExp;
                var regExp = _ref6$regExp === undefined ? false : _ref6$regExp;

                var gabaritIsVisible = this.editView.find("#gabaritEditorBox").css("display") != "none";
                if (gabaritIsVisible) {
                    this._hideGabaritEditor();
                } else {
                    this._showGabaritEditor();

                    this.gabaritEditor.find(search, { backwards: backwards, wrap: wrap, caseSensitive: caseSensitive, wholeWord: wholeWord, regExp: regExp });
                    this.gabaritEditor.findNext();
                }
            }
        }, {
            key: "setGabaritEditor",
            value: function setGabaritEditor() {
                var _this19 = this;

                this.editView.find("#gabaritEditorBox").find("#search").on("input", function (evt) {
                    console.log(evt);

                    if (evt.target.value.search(/^\$[0-9]+$/) != -1) {
                        _this19.gabaritEditor.gotoLine(Number(evt.target.value.replace(/^\$/, "")));
                    } else {
                        _this19.gabaritEditor.find(evt.target.value, {
                            backwards: false,
                            wrap: true,
                            caseSensitive: false,
                            wholeWord: false,
                            regExp: false
                        });
                    }
                });
                this.editView.find("#gabaritEditorBox").find("#searchNext").on("click", function (evt) {
                    console.log(evt);
                    _this19.gabaritEditor.findNext();
                });
                this.editView.find("#gabaritEditorBox").find("#searchPrevious").on("click", function (evt) {
                    console.log(evt);
                    _this19.gabaritEditor.findPrevious();
                });
                var snippetsLib = new _Snippets2.default();
                var snippets = snippetsLib.getAll();
                snippets.unshift({ id: "- Snippets -", value: "" });
                var optionCB = void 0;
                var snippetsDOM = this.editView.find("#gabaritEditorBox").find("#snippetsBtns");
                snippetsDOM.append('<select class="form-control" id="snippetsSelect">');
                for (var i = 0; i < snippets.length; i++) {
                    optionCB = snippets[i];
                    var el = document.createElement("option");
                    if (typeof optionCB == "string") {
                        el.textContent = optionCB;
                        el.value = optionCB;
                    } else {
                        el.textContent = optionCB.desc || optionCB.id;
                        el.value = optionCB.id;
                    }
                    el.title = snippetsLib.getSnippet(el.value).value;
                    el.addEventListener("mouseover", function (evt) {
                        console.log(evt);
                    });
                    $(el).attr("disabled", i == 0);
                    $(el).attr("selected", false);
                    snippetsDOM.find("#snippetsSelect").append(el);
                }
                snippetsDOM.find("#snippetsSelect")[0].selectedIndex = 0;
                snippetsDOM.on("change", function (event) {
                    _this19.gabaritEditor.insert(snippetsLib.getSnippet(event.target.value).value);
                    snippetsDOM.find("#snippetsSelect")[0].selectedIndex = 0;
                });
                this.editView.find("#gabaritEditor").css('position', "absolute");
                this.gabaritEditor = ace.edit("gabaritEditor");
                this.gabaritEditor.setOptions({
                    wrap: true
                });
                this.gabaritEditor.$blockScrolling = Infinity;
                this.gabaritEditor.setTheme("ace/theme/eclipse");
                this.gabaritEditor.setShowFoldWidgets(true);
                this.gabaritEditor.getSession().setMode("ace/mode/json");
                this.gabaritEditor.getSession().on("changeAnnotation", function () {
                    _this19._gabaritEditorErrors = _this19.gabaritEditor.getSession().getAnnotations();
                });

                var jsonResource = this.project.getJSON();
                this.gabaritEditor.setValue(JSON.stringify(jsonResource, null, 4));
                this.gabaritEditorLastPosition = this.gabaritEditorLastPosition || { row: 0, column: 1 };
                this.gabaritEditor.moveCursorToPosition(this.gabaritEditorLastPosition);
            }
        }, {
            key: "openGabaritIntern",
            value: function openGabaritIntern() {
                var win = window.open("/editor/jsoneditor/?src=" + encodeURIComponent(this.project.info.url + "/etc/editor/editor.json"), "_blank");
            }
        }, {
            key: "saveGabaritIntern",
            value: function saveGabaritIntern(callback) {
                var _this20 = this;

                var fileURL = this.project.info.configPath;

                this.jx.db.saveText(fileURL, this.gabaritEditor.getValue(), function () {
                    _this20.gabaritEditorLastPosition = _this20.gabaritEditor.getCursorPosition();
                    callback();
                });
            }
        }, {
            key: "loadGabaritIntern",
            value: function loadGabaritIntern() {
                var _this21 = this;

                var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

                this.jx.db.loadText(this.project.info.configPath, function (result) {
                    _this21.gabaritEditor.setValue(result);
                    callback();
                });
            }
        }, {
            key: "report",
            value: function report() {
                var _this22 = this;

                var popupContent = $("\n\t\t<div class=\"white-popup\">\n\t\t\t<form role=\"form\" id=\"buildForm\">\n\t    \t<div class=\"form-group\">\n\t\t\t<div class=\"checkbox\">\n\t\t    \t<label><input type=\"checkbox\" id=\"sound\" checked>Sons</label>\n\t\t    \t<label><input type=\"checkbox\" id=\"text\" >Textes</label>\n\t\t  \t</div>\n\t\t  \t</div>\n\t\t  <!--\t<div class=\"form-group\">\n\t\t\t<div class=\"checkbox\">\n\t\t    \t<label><input type=\"checkbox\"  id=\"sound\">sounds</label>\n\t\t  \t</div>\n\t\t  \t</div>-->\n\t\t  \t<button type=\"button\" class=\"btn btn-default\" title=\"Informations\" id=\"valider\">Valider</button>\n\t\t  \t </form>\n\n\t\t </div>\n\t\t");
                $.magnificPopup.open({
                    items: {
                        src: popupContent,
                        type: 'inline'
                    }
                });
                popupContent.find("#valider").click(function () {
                    console.log("valider");
                    $.magnificPopup.close();
                    var arr = popupContent.find(":checkbox");
                    for (var i = 0; i < arr.length; i++) {
                        console.log("OK", $(arr[i]).prop("checked"));
                        if (arr[i].checked) {
                            console.log("OK", $(arr[i]).attr("id"));
                            switch ($(arr[i]).attr("id")) {
                                case "sound":
                                    _this22.editor.generateReport({ type: "sound", projectData: _this22.project.info });
                                    break;
                                case "text":
                                    _this22.editor.generateReport({ type: "text", projectData: _this22.project.info });
                                    break;
                                case "fullproject":
                                    break;
                            }
                        }
                    }
                    ;
                    console.log(arr);
                });
            }
        }, {
            key: "mainController",
            get: function get() {
                return this;
            }
        }, {
            key: "editView",
            get: function get() {
                return this.gabaritView.editView;
            }
        }]);

        return Edition;
    }(_Component3.default);

    exports.default = Edition;
});
//# sourceMappingURL=Edition.js.map