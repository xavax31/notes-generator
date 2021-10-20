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

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var FiltersData = function FiltersData() {
        _classCallCheck(this, FiltersData);

        this.status = "all";
        this.sortBy = "id";
        this.publication = "all";
        this.engine = "all";
        this.typeProject = "Project";
        this.search = "";
        this.user = "all";
        this.domain = null;
    };

    var Home = function (_Component) {
        _inherits(Home, _Component);

        function Home(dataObject) {
            _classCallCheck(this, Home);

            var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, dataObject));

            _this.filters = new FiltersData();
            _this.editor = _this.jx.editor;
            _this.view = $("body");
            _this.view.css("overflow", "hidden");
            _this.filters = _this.jx.memo.cookie.getVar("homeFilters", _this.filters);
            _this.menu = $(" \n\t\t<div id=\"menu\" style=\"position:fixed; width:100%; z-index:1001; background-color:" + _this.jx.config.app.pageBackgroundColor + ";border-bottom: 1px solid rgb(233, 233, 233)\">\n\t\t\t<div class=\"row\" style=\"vertical-align: bottom\">\n\t\t\t\t<div class=\"col-xs-10\">\n\t\t\t\t\t<button id=\"BTN_Projects\" class=\"btn btn-default\" title=\"Projets\" data-action='{\"action\": \"list\", \"filters\":{\"typeProject\":\"Project\"}}'>PROJETS</button>\n\n\t\t\t\t\t<button id=\"BTN_Engines\" class=\"btn btn-default\" title=\"Moteurs\" data-action='{\"action\": \"list\", \"filters\":{\"typeProject\":\"AppEngine\"}}'>MOTEURS</button>\n\n\t\t\t\t\t<button id=\"BTN_Models\" class=\"btn btn-default\" title=\"Modèles\" data-action='{\"action\": \"list\", \"filters\":{\"typeProject\":\"Model\"}}'>MODELES</button>\n\n\t\t\t\t\t<button id=\"BTN_Archives\" class=\"btn btn-default\" title=\"Archives\" data-action='{\"action\": \"list\", \"filters\":{\"typeProject\":\"Archive\"}}'>ARCHIVES</button>\n\n\t\t\t\t\t<button id=\"BTN_Components\" class=\"btn btn-default\" title=\"Composants\" data-action='{\"action\": \"list\", \"filters\":{\"typeProject\":\"Component\"}}'>COMPOSANTS</button>\n\n\t\t\t\t\t<button id=\"BTN_Doc\" class=\"btn btn-default\" title=\"Doc\" data-action='{\"action\": \"list\", \"type\": \"Doc\", \"filters\":{\"typeProject\":\"Doc\"}}'>DOC</button>\n\n\t\t\t\t\t<button id=\"BTN_TESTS\" class=\"btn btn-default\" title=\"tests\"  data-access='admin,dev' data-action='{\"action\": \"list\", \"type\": \"Project\", \"domain\":\"/projects/tests\", \"filters\":{\"typeProject\":\"Project\", \"domain\":\"/projects/tests\"}}'>TESTS</button>\n\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"col-xs-1\">\n\t\t\t\t\t<button id=\"BTN_Admin\" class=\"btn btn-default btn-xs pull-right\" style=\"border-radius:50px;margin:2px\" title=\"Admin\" data-access='admin,dev, manager' data-action='{\"action\": \"showAdminPanel\"}'><i class=\"fa fa-cog fa-2x\" aria-hidden=\"true\"></i></button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-xs-1\">\n\t\t\t\t\t<span class=\"fa fa-user\">" + _this.editor.user.name + "</span>\n\t\t\t\t\t<div>(" + _this.editor.user.group + ")</div>\t\t\n\t\t\t\t</div>\n\t\t\t</div> \n\n\t\t\t<div class=\"row\" style=\"vertical-align: bottom\">\n\t\t\t\t<div class=\"col-xs-2  text-left\" style=\"width:160px\" id=\"choiceBar\"/>\n\t\t\t\t<div class=\"col-xs-2  text-left\"  style=\"width:160px\" id=\"choiceBar1\"/>\n\t\t\t\t<div class=\"col-xs-2  text-left\"  style=\"width:160px\" id=\"choiceBar3\"/>\n\t\t\t\t<div class=\"col-xs-2  text-left\"  style=\"width:160px\" id=\"choiceBar4\"/>\n\t\t\t\t<div class=\"col-xs-4\"/>\n\t\t\t</div>\n\t\t</div>\n\t\t");
            _this.content = $("\n\t\t<div class=\"fluid-container\">\n \t\t\t<div class=\"row\">\n\t\t\t    <div class=\"col-xs-12\" id=\"listContainer\">\n\t\t\t    </div>\n\t\t\t</div> \n\t\t</div>  \n\t\t");
            var allowedPublications = _this.editor.getOptionsList("publication");
            if (_this.filters.publication == "all") _this.filters.publication = allowedPublications[0];
            var publicationCB = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Publication", options: allowedPublications, value: _this.filters.publication, onChanged: function onChanged(evt) {
                        _this.filters.publication = evt.target.value;
                        _this.refreshList();
                    } } });
            _this.menu.find("#choiceBar").append(publicationCB.view);
            var engineCB = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Moteur", options: "engine", value: _this.filters.engine, onChanged: function onChanged(evt) {
                        _this.filters.engine = evt.target.value;
                        _this.execute({ "action": "list", "type": "Project", "domain": "/projects/milan-presse" });
                    } } });

            var statusCB = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Status", options: "statusFilter", value: _this.filters.step, onChanged: function onChanged(evt) {
                        _this.filters.status = evt.target.value;
                        _this.refreshList();
                    } } });
            _this.menu.find("#choiceBar1").append(statusCB.view);
            var searchBox = _this.cc({ type: "editionitems.SearchBox", controller: _this, data: { value: _this.filters.search, onchanged: function onchanged(evt) {
                        _this.filters.search = evt.target.value;
                        _this.refreshList();
                    } } });
            _this.menu.find("#choiceBar").append(searchBox.view);
            searchBox.view.css("width", "200px");
            searchBox.view.css("padding-left", "0px");
            searchBox.view.css("margin-bottom", "5px");
            var optSortBy = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "Sort by", options: ["Name", "Status", "Date publication ASC", "Date publication DESC", "Date modification", "Date creation", "Date access"],
                    value: _this.filters.sortBy, onChanged: function onChanged(evt) {
                        console.log(evt.target.value);
                        _this.filters.sortBy = evt.target.value;
                        _this.execute({ "action": "list", "type": "Project", "domain": "/projects/milan-presse" });
                    } } });
            _this.menu.find("#choiceBar4").append(optSortBy.view);
            optSortBy.view.css("width", "150px");
            var userFilter = _this.cc({ type: "editionitems.SimpleComboBox", controller: _this, data: { title: "User", options: "users", value: _this.filters.user, onChanged: function onChanged(evt) {
                        console.log(evt.target.value);
                        if (evt.target.value == "me") {
                            evt.target.value = _this.editor.user.name;
                        }
                        ;
                        _this.filters.user = evt.target.value;
                        _this.execute({ "action": "list", "type": "Project", "domain": "/projects/milan-presse" });
                    } } });
            _this.menu.find("#choiceBar3").append(userFilter.view);
            userFilter.view.css("width", "150px");
            _this.filterBox = {
                status: statusCB,
                sortBy: optSortBy,
                user: userFilter
            };

            var buttons = _this.menu.find(".btn");
            for (var i = 0; i < buttons.length; i++) {
                var _this$editor;

                if ($(buttons[i]).attr("data-access") != undefined) {
                    var args = $(buttons[i]).attr("data-access").split(",");
                } else {
                    var args = ["*"];
                }
                $(buttons[i]).css("display", (_this$editor = _this.editor).userIsGroup.apply(_this$editor, args) ? "inline" : "none");
                if ($(buttons[i]).attr("id") == "BTN_Admin") {
                    $(buttons[i]).click(function (event) {
                        return _this.editor.showAdminPanel();
                    });
                } else {
                    $(buttons[i]).click(function (event) {
                        return _this.openTab($(event.currentTarget).attr("id"));
                    });
                }
            }
            _this.view.append(_this.menu);
            _this.view.append(_this.content);
            _this.viewList = _this.cc({ type: "editionitems.Container", render: "DOM" });
            var listContainer = _this.content.find("#listContainer");
            listContainer.html(_this.viewList.view);
            var top = _this.menu.position().top + _this.menu.outerHeight();
            listContainer.css("top", top + "px");
            listContainer.css("overflow", "auto");
            _this.menu.css("overflow", "hidden");
            listContainer.height($(window.top).height() - top);
            $(window).on("resize", function () {
                listContainer.css("overflow", "hidden");
                var top = _this.menu.position().top + _this.menu.outerHeight();
                listContainer.css("top", top + "px");
                listContainer.height($(window.top).height() - top);
                _this.jx.wait(0, function () {
                    listContainer.css("overflow", "auto");
                });
            });
            _this.listContainer = listContainer;
            _this.openTab("BTN_Projects");
            return _this;
        }

        _createClass(Home, [{
            key: "_create",
            value: function _create() {
                _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "_create", this).call(this);
                this._ready = true;
            }
        }, {
            key: "init",
            value: function init(_ref) {
                var onInitialised = _ref.onInitialised;

                onInitialised();
            }
        }, {
            key: "openTab",
            value: function openTab(idTab) {
                var filters = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                filters = filters || this.filters;
                this.activeTab = idTab;
                var dataAction = this.menu.find("#" + idTab).attr("data-action");
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
                this.menu.find(".btn").removeClass("active");
                this.menu.find(".btn").css("background-color", "#FFFFFF");
                this.menu.find(".btn").css("color", "#337ab7");
                this.menu.find("#" + this.activeTab).addClass("active");
                this.menu.find("#" + this.activeTab).css("background-color", "#337ab7");
                this.menu.find("#" + this.activeTab).css("color", "#FFFFFF");
            }
        }, {
            key: "execute",
            value: function execute(_ref2) {
                var action = _ref2.action;
                var type = _ref2.type;
                var _ref2$filters = _ref2.filters;
                var filters = _ref2$filters === undefined ? {} : _ref2$filters;

                filters.domain = filters.domain || null;
                this.filters = Object.assign(this.filters, filters);
                this._refreshFilterBox();

                switch (action) {
                    case 'list':
                        this.refreshList();
                        break;
                    case 'showAdminPanel':
                        this.editor.showAdminPanel();
                        break;
                    case 'callServiceDistant':
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
                    filters.user = "all";
                    this.filterBox.status.visible = false;
                    this.filterBox.user.visible = false;
                } else {
                    this.filterBox.status.visible = true;
                    this.filterBox.user.visible = true;
                }
                this.jx.memo.cookie.setVar("homeFilters", filters);
                var list = this.editor.getData({ type: filters.typeProject, filters: filters }, function (event) {
                    _this2._refreshViewList({ list: event.data });
                    _this2.jx.loadingScreen.hide();
                    callback();
                });
            }
        }, {
            key: "_refreshViewList",
            value: function _refreshViewList(_ref3) {
                var list = _ref3.list;

                this.viewList.removeAllChildren();
                if (list.length == 0) {
                    this.viewList.addChild({ type: "Text", text: "no results with these search criteria" });
                }
                ;
                for (var i = 0; i < list.length; i++) {
                    this.viewList.addChild({ type: "editionitems.CatalogItem", controller: this,
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
                            datePublication: list[i].projectInfo != undefined ? list[i].projectInfo.project.datePublication : "",
                            previewIndex: list[i].projectInfo && list[i].projectInfo.project.previewIndex || "",
                            description: list[i].description
                        } });
                }
                ;
                this.listContainer.scrollTop(0);
                return this.viewList.view;
            }
        }]);

        return Home;
    }(_Component3.default);

    exports.default = Home;
});
//# sourceMappingURL=Home.js.map