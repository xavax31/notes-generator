define(["exports", "jx/core/comps/VisualComponent", "jx/core/comps/Component"], function (exports, _VisualComponent2, _Component2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

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

    var GROUP = "\n<div class=\"tab-pane\" id=\"ID\" /> \n";
    var sep = "\n<div>\n<hr>\n<span id=\"sepID\" class=\"text-left\"></span>\n</div>\n";
    var modeToPackage = {
        "edititems": "editionitems",
        "readonly": "compitemsreadonly",
        "edit": "compitemsedit"
    };
    self.texts = {
        variante: "Décrire ici les modifications souhaitées par rapport au modèle actuel."
    };
    var ItemShorcutsNames = {
        "Number": "NumberItem",
        "Sound": "SoundItem",
        "Image": "ImageItem",
        "Boolean": "BooleanItem",
        "Flashtml": "FlashtmlItem",
        "FlashtmlPack": "FlashtmlPackItem",
        "ImageSequence": "ImageSequenceItem",
        "FLA": "FLAItem",
        "Video": "VideoItem",
        "SpriteSheet": "SpriteSheetItem",
        "class": "ClassFile",
        "QuizManager": "QuizManagerItem",
        "QuizData": "QuizDataItem",
        "QuizTheme": "QuizThemeItem"
    };
    var viewsModels = {
        tab: "\n<div class=\"container\">\n    <div class=\"row\">\n        <!-- MENU -->\n        <div class=\"col-xs-3\" id=\"myScrollspy\"  data-spy=\"affix\" data-offset-top=\"0\">\n            <ul id=\"mapList\" class=\"nav nav-pills nav-stacked nav-tabs\"></ul>\n        </div>\n        <!-- MENU END -->\n\n        <div class=\"col-xs-9\">\n            <div id=\"map\" class=\"tab-content content1\"></div>\n        </div>\n    </div>\n           \n </div>\n",
        flat: "\n<div class=\"container\">\n    <div class=\"row\">\n        <!-- MENU -->\n        <div class=\"col-xs-1\" id=\"myScrollspy\">\n            <ul id=\"mapList\" class=\"nav nav-pills nav-stacked nav-tabs\"></ul>\n        </div>\n        <!-- MENU END -->\n\n        <div class=\"col-xs-11\">\n            <div id=\"map\"></div>\n        </div>\n    </div>\n\n           \n </div>\n"
    };

    var GabaritObject = function (_VisualComponent) {
        _inherits(GabaritObject, _VisualComponent);

        function GabaritObject(dataObject) {
            _classCallCheck(this, GabaritObject);

            return _possibleConstructorReturn(this, (GabaritObject.__proto__ || Object.getPrototypeOf(GabaritObject)).call(this, dataObject));
        }

        _createClass(GabaritObject, [{
            key: "_create",
            value: function _create() {
                var _this2 = this;

                _get(GabaritObject.prototype.__proto__ || Object.getPrototypeOf(GabaritObject.prototype), "_create", this).call(this);
                this.gabarit = this.dataObject.gabarit;
                this.controller = this.dataObject.controller;
                this.data = this.data || {};
                var title = this.data.id || "";
                this.data.id = this.data.id || "MainGabarit";

                var template = this.dataObject.template || viewsModels;
                var defaultPackage = this.dataObject.defaultPackage || viewsModels;
                this._textFold = false;
                this.factory = new Factory({ jx: this.jx, controller: this, template: template });
                this.factory.defaultPackage = modeToPackage[this.dataObject.mode] || this.dataObject.mode || this.factory.defaultPackage;
                this.modeDisplay = "tab";
                this.view = $(GROUP);
                if (this.controller !== this.mainController) {
                    this.view.html($(sep));
                }
                var descStr = (this.data.description || "").trim() == "" ? "" : "(" + this.data.description + ")";
                this.view.find("#sepID").html("<h4>" + title + " <small>" + descStr + "</small></h4>");
                this.view.id = this.data.id;
                if (this.data.preview == true) {
                    this.view.find("#preview").on("click", function (evt) {
                        console.log("click", _this2);
                        _this2.controller.showItem({ type: _this2.data.type, id: _this2.data.id });
                    });
                } else {
                    this.view.find("#preview").css("display", "none");
                }
                if (this.gabarit) {
                    this.data.value = this.data.value || {};
                    this.setValue(this.data.value);
                    this.factory.addItems(this.gabarit, this.dataObject.tabs ? undefined : this.view);
                    this.onchanged.dispatch({ target: this });
                }
                ;
            }
        }, {
            key: "getOptionsList",
            value: function getOptionsList(args) {
                return this.jx.editor.getOptionsList(args);
            }
        }, {
            key: "showItem",
            value: function showItem(args) {
                this.controller.showItem(args);
            }
        }, {
            key: "downloadItem",
            value: function downloadItem(itemInfo) {
                this.controller.downloadItem(itemInfo);
            }
        }, {
            key: "showScreen",
            value: function showScreen(screenID) {
                this.controller.showScreen(screenID);
            }
        }, {
            key: "openParentDirectory",
            value: function openParentDirectory(itemInfo) {
                this.controller.openParentDirectory(itemInfo);
            }
        }, {
            key: "pushFile",
            value: function pushFile(itemInfo) {
                this.controller.pushFile(itemInfo);
            }
        }, {
            key: "pullFile",
            value: function pullFile(itemInfo) {
                this.controller.pullFile(itemInfo);
            }
        }, {
            key: "deleteItemLinkedFile",
            value: function deleteItemLinkedFile(itemInfo, callback) {
                this.controller.deleteItemLinkedFile(itemInfo, callback);
            }
        }, {
            key: "setValue",
            value: function setValue(valueObj) {
                for (var prop in valueObj) {
                    this._changeValueInGabarit(prop, valueObj[prop]);
                }
            }
        }, {
            key: "_gabaritToValue",
            value: function _gabaritToValue() {
                var result = {};
                for (var i = 0; i < this.gabarit.length; i++) {
                    switch (this.gabarit[i].type) {
                        case "Sound":
                            result[this.gabarit[i].id] = {
                                id: this.gabarit[i].id,
                                type: "Sound",
                                src: this.gabarit[i].asset.src
                            };
                            break;
                        case "Flashtml":
                            result[this.gabarit[i].id] = {
                                id: this.gabarit[i].id,
                                type: "Flashtml",
                                src: this.gabarit[i].asset.src
                            };
                            break;
                        default:
                            result[this.gabarit[i].id] = this.gabarit[i].value;
                    }
                }
                ;
                return result;
            }
        }, {
            key: "_changeValueInGabarit",
            value: function _changeValueInGabarit(id, value) {
                for (var i = 0; i < this.gabarit.length; i++) {
                    if (this.gabarit[i].id == id) {
                        switch (this.gabarit[i].type) {
                            case "Sound":
                                break;
                            default:
                                this.gabarit[i].value = value;
                        }
                    }
                    ;
                }
                ;
            }
        }, {
            key: "findComp",
            value: function findComp(_ref) {
                var id = _ref.id;

                for (var i = 0; i < this.factory.children.length; i++) {
                    if (this.factory.children[i].id == id) return this.factory.children[i];
                }
                ;
                return null;
            }
        }, {
            key: "onChangeData",
            value: function onChangeData(event) {
                var comp = event.target.jx ? event.target : this.getClickedCompFromDOMEvent(event);
                if (!comp.autoRefresh) {
                    comp.data.value = comp.value;
                    if (comp.check) comp.check();
                }
                if (this.data) this.data.value = this.value;
                if (event.isfirstchange == undefined) {
                    event.isfirstchange = false;
                    this.onchanged.dispatch({ target: this, currentTarget: comp, firstItem: comp, isfirstchange: false });
                } else {
                    this.onchanged.dispatch({ target: this, currentTarget: comp, firstItem: event.firstItem, isfirstchange: false });
                }
            }
        }, {
            key: "showInGabarit",
            value: function showInGabarit(search, options) {
                this.controller.showInGabarit(search, options);
            }
        }, {
            key: "showInfo",
            value: function showInfo() {
                this.view.find("#informationsPanel").css("display", "inline");
                for (var i = 0; i < this.factory.children.length; i++) {
                    this.factory.children[i].showInfo();
                }
                ;
            }
        }, {
            key: "hideInfo",
            value: function hideInfo() {
                this.view.find("#informationsPanel").css("display", "none");
                for (var i = 0; i < this.factory.children.length; i++) {
                    if (!this.factory.children[i].hideInfo) {
                        console.log(this.factory.children[i]);
                    }
                    ;
                    this.factory.children[i].hideInfo();
                }
                ;
            }
        }, {
            key: "toggleInfo",
            value: function toggleInfo() {
                var panelInfo = this.view.find("#informationsPanel");
                if (panelInfo.css("display") == "none") {
                    this.showInfo();
                } else {
                    this.hideInfo();
                }
            }
        }, {
            key: "setFilters",
            value: function setFilters(jsonString) {
                this.factory.setFilters(jsonString);
            }
        }, {
            key: "showAllInfos",
            value: function showAllInfos() {
                for (var i = 0; i < this.factory.children.length; i++) {
                    if (this.factory.children[i].showInfo == undefined) {
                        console.error(this.factory.children[i]);
                    } else {
                        this.factory.children[i].showInfo();
                    }
                }
                ;
            }
        }, {
            key: "hideAllInfos",
            value: function hideAllInfos() {
                for (var i = 0; i < this.factory.children.length; i++) {
                    if (this.factory.children[i].hideInfo == undefined) {
                        console.error(this.factory.children[i]);
                    } else {
                        this.factory.children[i].hideInfo();
                    }
                }
                ;
            }
        }, {
            key: "refreshView",
            value: function refreshView() {
                var _this3 = this;

                if (this.editView != null) {
                    this.editView.remove();
                }
                this.editView = $(this.factory.view);
                var mapcontent = this.editView.find("#mapcontent");
                mapcontent.on("scroll", function () {
                    _this3.mainController.activeTabParams[_this3.mainController.activeTab] = _this3.mainController.activeTabParams[_this3.mainController.activeTab] || { scroll: 0 };
                    _this3.mainController.activeTabParams[_this3.mainController.activeTab].scroll = mapcontent.scrollTop();
                });
                this.view.append(this.editView);
                this.factory.clearView(this.view);
                this.factory.addItems(this.gabarit, this.dataObject.tabs ? undefined : this.view);
                this.jx.wait(100, function () {
                    _this3.textFold = _this3._textFold;
                });
            }
        }, {
            key: "refreshLocalView",
            value: function refreshLocalView() {
                this.view.empty();

                this.factory.addItems(this.gabarit, this.dataObject.tabs ? undefined : this.view);
                this.setValue(this.data.value);
            }
        }, {
            key: "getClickedCompFromDOMEvent",
            value: function getClickedCompFromDOMEvent(DOMevent) {
                var clickedGroup = DOMevent.currentTarget.parentElement;
                var clickedItem = DOMevent.currentTarget;
                var clickedItemElement = DOMevent.target;
                if ($(clickedItem).data("controller") != undefined) {
                    return $(clickedItem).data("controller");
                }
                return null;
            }
        }, {
            key: "mainController",
            get: function get() {
                return this.controller.mainController;
            }
        }, {
            key: "value",
            get: function get() {
                return this._gabaritToValue();
            }
        }, {
            key: "lock",
            set: function set(value) {
                for (var i = 0; i < this.factory.children.length; i++) {
                    this.factory.children[i].lock = value;
                }
                ;
            }
        }, {
            key: "textFold",
            set: function set(value) {
                this._textFold = value;
                for (var i = 0; i < this.factory.children.length; i++) {
                    if (this.factory.children[i].textFold) {}
                    ;
                    this.factory.children[i].textFold = value;
                }
                ;
            }
        }, {
            key: "visible",
            set: function set(value) {
                for (var i = 0; i < this.factory.children.length; i++) {
                    this.factory.children[i].visible = value;
                }
                ;
            }
        }, {
            key: "modeDisplay",
            set: function set(value) {
                this.factory.modeDisplay = value;
            },
            get: function get() {
                return this.factory.modeDisplay;
            }
        }]);

        return GabaritObject;
    }(_VisualComponent3.default);

    exports.default = GabaritObject;

    var Factory = function (_Component) {
        _inherits(Factory, _Component);

        function Factory(dataObject) {
            _classCallCheck(this, Factory);

            var _this4 = _possibleConstructorReturn(this, (Factory.__proto__ || Object.getPrototypeOf(Factory)).call(this, Object.assign({ controller: null }, dataObject)));

            _this4.controller = _this4.dataObject.controller;
            _this4._template = _this4.dataObject.template;
            _this4.defaultPackage = "editionitems";
            _this4.filters = { type: "all" };
            _this4.modeDisplay = "tab";
            _this4.children = [];
            return _this4;
        }

        _createClass(Factory, [{
            key: "setFilters",
            value: function setFilters(jsonString) {
                if (jsonString == "all") {
                    this.filters = { type: "all" };
                    return;
                }
                this.filters = JSON.parse(jsonString);
            }
        }, {
            key: "clearView",
            value: function clearView(view) {
                console.log($(view).find("#mapList"));
                $(view).find("#mapList").empty();
                $(view).find("#map").empty();
                this.children.length = 0;
            }
        }, {
            key: "addItems",
            value: function addItems(itemsInfos, parent, itemParent) {
                var itemInfosLength = itemsInfos.length;
                var i = void 0,
                    startNo = void 0,
                    endNo = void 0,
                    j = void 0,
                    item = void 0;
                for (i = 0; i < itemInfosLength; i++) {
                    startNo = itemsInfos[i].start == undefined ? 0 : Number(itemsInfos[i].start);
                    endNo = itemsInfos[i].end == undefined ? 0 : Number(itemsInfos[i].end);
                    for (j = startNo; j <= endNo; j++) {
                        item = this.addItem(itemsInfos[i], parent, j, itemParent);
                    }
                }
            }
        }, {
            key: "addItem",
            value: function addItem(itemInfo, parent, index, itemParent) {
                var _this5 = this;

                var timer = Date.now();

                if (itemInfo.type != "Group" && this.filters.type != "all" && this.filters.type != itemInfo.type.toLowerCase()) return itemInfo;
                var itemClass = this.jx.db.getClassFromItemData(itemInfo, this.defaultPackage);
                if (!itemClass) {
                    console.warn("EditionItemGenerator._addItem_" + itemInfo.type + " not found");
                    itemClass = this.jx.db.getClass("jx/editor/" + this.defaultPackage + "/Todo");
                }
                var initParams;

                if (itemInfo.asset && itemInfo.type != "ImageSequence") {
                    initParams = this.jx.tools.cloneObject(itemInfo);
                    initParams.gabaritID = itemInfo.id;
                    initParams.id = this.jx.tools.str.replaceChar({ string: initParams.id, index: index, numberChar: "#", letterChar: "£", mode: "uppercase", a: 0 });
                    var convertedSrc = this.jx.tools.str.replaceChar({ string: initParams.asset.src, index: index, numberChar: "#", letterChar: "£", mode: "uppercase", a: 0 });
                    initParams.asset = this.jx.tools.cloneObject(initParams.asset);
                    if (itemInfo.asset.resources) {
                        var resource = itemInfo.asset.resources.filter(function (itemRes) {
                            return itemRes.id == initParams.id;
                        })[0];
                        if (resource) {
                            initParams.asset.src = resource.src || initParams.asset.src;
                        } else {
                            initParams.asset.src = convertedSrc;
                        }
                    } else {
                        initParams.asset.src = convertedSrc;
                    }
                } else {
                    initParams = itemInfo;
                }

                var item = this.cc({ type: itemClass, data: initParams, controller: this.controller });
                item.onchanged.add(function (evt) {
                    return _this5.controller.onChangeData(evt);
                });

                if (item.view.shortcut == true) {
                    delete item.view.shortcut;
                    for (var prop in item.view) {
                        itemInfo[prop] = item.view[prop];
                    }
                    ;
                    for (var prop in itemInfo) {
                        if (item.view[prop] == undefined) {
                            delete itemInfo[prop];
                        }
                        ;
                    }
                    ;
                    return this.addItem(item.view, parent, index, itemParent);
                }
                ;
                item.itemParent = itemParent;

                if (this.jx.editor.getBoolDependsGroup(initParams.visible, true)) {
                    if (parent == undefined) {
                        if (this.modeDisplay == "flat") {
                            $("#map").append("<hr>");
                            $("#map").append("<div id=\"" + item.id + "Tab\" class=\"text-info\"><h5>" + (item.data.title || item.id) + "</h5></div>");
                            $("#map").append(item.view);
                        } else {
                            $("#mapList").append("<li id=\"" + item.id + "Tab\"><a href=\"#" + item.id + "\"    data-toggle=\"tab\">" + (item.data.title || item.id) + "</a></li>");
                            $("#map").append(item.view);
                        }
                    } else {
                        if (itemParent && itemParent.addChild) {
                            itemParent.addChild(item);
                        } else {
                            $(parent).append(item.view);
                        }
                    }
                }
                this.children.push(item);
                if (initParams.children != undefined) {
                    this.addItems(initParams.children, item.view, item);
                }
                if (item.firstInit) item.firstInit();
                return initParams;
            }
        }, {
            key: "view",
            get: function get() {
                return this._template[this.modeDisplay];
            }
        }]);

        return Factory;
    }(_Component3.default);
});
//# sourceMappingURL=GabaritObject.js.map