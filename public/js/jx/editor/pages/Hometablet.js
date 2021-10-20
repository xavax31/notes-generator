define(["exports", "jx/core/comps/Component"], function (exports, _Component2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

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

    var Hometablet = function (_Component) {
        _inherits(Hometablet, _Component);

        function Hometablet(dataObject) {
            _classCallCheck(this, Hometablet);

            var _this = _possibleConstructorReturn(this, (Hometablet.__proto__ || Object.getPrototypeOf(Hometablet)).call(this, dataObject));

            _this.view = $("body");
            _this.filters = _this.jx.memo.cookie.getVar("homeFilters", {
                status: "all",
                sortBy: "id",
                publication: "all",
                engine: "all",
                typeProject: "Project",
                search: "",
                user: "all"
            });
            _this.targetFrameTab = 1;
            console.log("filters", _this.filters);
            _this.content = $("\n\t\t<div class=\"container\">\n\n  \t\t\t<div class=\"row\" style=\"vertical-align: bottom\">\n    \t\t\t<div class=\"col-xs-10\">\n    \t\t\t\t<button id=\"BTN_Projects\" class=\"btn btn-default\" title=\"Projets\" data-action='{\"action\": \"list\", \"filters\":{\"typeProject\":\"Project\"}}'>PROJETS</button>\n\n \t\t\t\t \t<button id=\"BTN_TESTS\" class=\"btn btn-default\" title=\"tests\"  data-access='admin,dev' data-action='{\"action\": \"list\", \"type\": \"Project\", \"domain\":\"/projects/tests\", \"filters\":{\"typeProject\":\"Project\", \"domain\":\"/projects/tests\"}}'>TESTS</button>\n\n    \t\t\t</div>\n\n   \t\t\t\t<div class=\"col-xs-1\">\n     \t\t\t</div>\n  \t\t\t\t<div class=\"col-xs-1\">\n  \t\t\t\t<button id=\"BTN_REFRESH\" class=\"btn btn-default\" title=\"tests\"  data-access='*' data-action='{\"action\": \"refresh\"}'>Refresh</button>\n\n     \t\t\t</div>\n  \t\t\t\t<button id=\"BTN_LinkBayamLocal0\" class=\"btn btn-default\" title=\"tests\"  data-access='*' data-action='{\"action\": \"linkBayamLocal0\"}'>Bubble 0</button>\n\n     \t\t\t</div>\n     \t\t</div> \n\n     \t\t <div class=\"row\" style=\"vertical-align: bottom\">\n    \t\t\t<div class=\"col-xs-2  text-left\" style=\"width:160px\" id=\"choiceBar\">\n     \t\t\t</div>\n    \t\t\t<div class=\"col-xs-2  text-left\"  style=\"width:160px\" id=\"choiceBar1\">\n     \t\t\t</div>\n   \t\t\t\t<div class=\"col-xs-2  text-left\"  style=\"width:160px\" id=\"choiceBar2\">\n     \t\t\t</div>\n   \t\t\t\t<div class=\"col-xs-4\" >\n     \t\t\t</div>\n   \t\t\t\t<div class=\"col-xs-2  text-right\"  style=\"width:160px\" id=\"choiceBar3\">\n     \t\t\t</div>\n     \t\t</div>\n\n   \t\t\t<div class=\"row\">\n \t\t\t    <div class=\"col-xs-4\" id=\"choiceBar4\">\n \t\t\t    </div>\n \t\t\t    <div class=\"col-xs-6\">\n \t\t\t    </div>\n\t\t\t    <div class=\"col-xs-2\" text-right\"  id=\"choiceBar5\">\n \t\t\t    </div>\n \t\t\t</div> \n\n \t\t\t<div class=\"row\">\n\t\t\t    <div class=\"col-xs-12\" id=\"listContainer\">\n\t\t\t    </div>\n\t\t\t</div> \n \n\t\t</div>  \n\t\t");
            var publicationCB = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Publication", options: "publication", value: _this.filters.publication, onChanged: function onChanged(evt) {
                        _this.filters.publication = evt.target.value;
                        _this.refreshList();
                    } } });
            _this.content.find("#choiceBar").append(publicationCB.view);

            var engineCB = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Moteur", options: "engine", value: _this.filters.engine, onChanged: function onChanged(evt) {
                        _this.filters.engine = evt.target.value;
                        _this.execute({ "action": "list", "type": "Project", "domain": "/projects/milan-presse" });
                    } } });

            var statusCB = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Status", options: "statusFilter", value: _this.filters.step, onChanged: function onChanged(evt) {
                        _this.filters.status = evt.target.value;
                        _this.refreshList();
                    } } });
            _this.content.find("#choiceBar1").append(statusCB.view);

            var tabCB = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Envoyer vers l'onglet", options: ["1", "2"], value: "Tab " + _this.targetFrameTab, onChanged: function onChanged(evt) {
                        _this.targetFrameTab = evt.target.value == 1 ? 1 : 2;
                        console.log(_this.targetFrameTab);
                    } } });
            _this.content.find("#choiceBar5").append(tabCB.view);

            var searchBox = _this.cc({ type: "editionitems.SearchBox", controller: _this, data: { value: _this.filters.search, onchanged: function onchanged(evt) {
                        console.log(evt);
                        _this.filters.search = evt.target.value;
                        _this.refreshList();
                    } } });
            _this.content.find("#choiceBar4").append(searchBox.view);
            searchBox.view.css("padding", "0px");
            searchBox.view.css("width", "100%");
            var optSortBy = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Sort by", options: ["id", "status"], value: _this.filters.sortBy, onChanged: function onChanged(evt) {
                        console.log(evt.target.value);
                        _this.filters.sortBy = evt.target.value;
                        _this.execute({ "action": "list", "type": "Project", "domain": "/projects/milan-presse" });
                    } } });
            _this.content.find("#choiceBar2").append(optSortBy.view);

            _this.filterBox = {
                status: statusCB,
                sortBy: optSortBy
            };

            var buttons = _this.content.find(".btn");
            for (var i = 0; i < buttons.length; i++) {
                var _this$jx$editor;

                if ($(buttons[i]).attr("data-access") != undefined) {
                    var args = $(buttons[i]).attr("data-access").split(",");
                } else {
                    var args = ["*"];
                }
                $(buttons[i]).css("display", (_this$jx$editor = _this.jx.editor).userIsGroup.apply(_this$jx$editor, args) ? "inline" : "none");
                if ($(buttons[i]).attr("id") == "BTN_Admin") {
                    $(buttons[i]).click(function (event) {
                        return _this.jx.editor.showAdminPanel();
                    });
                } else if ($(buttons[i]).attr("id") == "BTN_LinkBayamLocal0") {
                    $(buttons[i]).click(function (event) {
                        var url = "/builds/bayam/link0/";

                        url = "http://xb:CSLDJV37@192.168.0.80:3000" + url;
                        if (url.search(/\?/) != -1) {
                            url = url.replace("\?", "?context=cordova&");
                        } else {
                            url = url + "?context=cordova";
                        }
                        console.info(url);
                        _this.changeLocation({ link: url });
                    });
                } else if ($(buttons[i]).attr("id") == "BTN_REFRESH") {
                    $(buttons[i]).click(function (event) {
                        return _this.jx.restartApplication();
                    });
                } else {
                    $(buttons[i]).click(function (event) {
                        return _this.openTab($(event.currentTarget).attr("id"));
                    });
                }
            }
            _this.view.append(_this.content);
            _this.viewList = _this.cc({ type: "editionitems.Container", render: "DOM" });
            $(listContainer).html(_this.viewList.view);
            _this.openTab("BTN_Projects");
            return _this;
        }

        _createClass(Hometablet, [{
            key: "init",
            value: function init(_ref) {
                var onInitialised = _ref.onInitialised;

                onInitialised();
            }
        }, {
            key: "start",
            value: function start(_ref2) {
                var onStarted = _ref2.onStarted;

                onStarted();
            }
        }, {
            key: "changeLocation",
            value: function changeLocation(_ref3) {
                var link = _ref3.link;

                this.jx.sendToHost({ link: link, tab: this.targetFrameTab });
            }
        }, {
            key: "openTab",
            value: function openTab(idTab, filters) {
                filters = filters || this.filters;
                this.activeTab = idTab;
                var dataAction = this.content.find("#" + idTab).attr("data-action");
                if (dataAction) {
                    var datObj = JSON.parse(dataAction);
                    datObj.filters = datObj.filters || filters;
                    this.execute(datObj);
                } else {
                    this[idTab]();
                }
                this._refreshButtons();
            }
        }, {
            key: "_refreshFilterBox",
            value: function _refreshFilterBox() {
                this.filterBox.status.value = this.filters.status;
                this.filterBox.sortBy.value = this.filters.sortBy;
            }
        }, {
            key: "_refreshButtons",
            value: function _refreshButtons() {
                this.content.find(".btn").removeClass("active");
                this.content.find(".btn").css("background-color", "#FFFFFF");
                this.content.find(".btn").css("color", "#337ab7");
                this.content.find("#" + this.activeTab).addClass("active");
                this.content.find("#" + this.activeTab).css("background-color", "#337ab7");
                this.content.find("#" + this.activeTab).css("color", "#FFFFFF");
            }
        }, {
            key: "execute",
            value: function execute(_ref4) {
                var action = _ref4.action;
                var type = _ref4.type;
                var _ref4$filters = _ref4.filters;
                var filters = _ref4$filters === undefined ? {} : _ref4$filters;

                filters.domain = filters.domain || null;
                this.filters = Object.assign(this.filters, filters);
                this._refreshFilterBox();
                switch (action) {
                    case 'list':
                        this.refreshList();
                        break;
                    case 'showAdminPanel':
                        this.jx.editor.showAdminPanel();
                        break;
                    case 'callServiceDistant':
                        this.jx.editor.callServiceDistant("test", { "yo": "Youpy" }, function (evt) {
                            console.log(evt);
                        });
                        break;
                    default:
                        console.log("function not implemented : ", action);
                        break;
                }
            }
        }, {
            key: "refreshList",
            value: function refreshList() {
                var _this2 = this;

                var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

                this.jx.loadingScreen.show();
                var filters = Object.assign({}, this.filters);
                if (filters.typeProject != "Project") {
                    filters.status = "all";
                    this.filterBox.status.visible = false;
                } else {
                    this.filterBox.status.visible = true;
                }
                this.jx.memo.cookie.setVar("homeFilters", filters);

                var list = this.jx.editor.getData({ type: filters.typeProject, filters: filters }, function (event) {
                    _this2._refreshViewList({ list: event.data });
                    _this2.jx.loadingScreen.hide();
                    callback();
                });
            }
        }, {
            key: "_refreshViewList",
            value: function _refreshViewList(_ref5) {
                var list = _ref5.list;

                console.log("_createList", list);
                this.viewList.removeAllChildren();
                if (list.length == 0) {
                    this.viewList.addChild({ type: "Text", text: "no results with these search criteria" });
                }
                ;
                for (var i = 0; i < list.length; i++) {
                    console.log(list[i]);
                    this.viewList.addChild({ type: "editionitems.CatalogTestItem", controller: this,
                        data: {
                            id: list[i].id,
                            title: list[i].title,
                            showID: list[i].type !== "Doc",
                            showStatus: list[i].type !== "Doc",
                            showPreviewBtn: list[i].type !== "Doc",
                            onclickAction: list[i].type !== "Doc" ? null : "preview",
                            type: list[i].type,
                            url: list[i].url,
                            status: list[i].infos.status.value,
                            previewIndex: list[i].projectInfo && list[i].projectInfo.project.previewIndex || "",
                            description: list[i].description
                        } });
                }
                ;
                console.log("viewList", this.viewList);
                return this.viewList.view;
            }
        }]);

        return Hometablet;
    }(_Component3.default);

    exports.default = Hometablet;
});
//# sourceMappingURL=Hometablet.js.map