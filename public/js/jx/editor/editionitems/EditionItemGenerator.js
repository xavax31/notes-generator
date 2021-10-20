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

    self.texts = {
        variante: "Décrire ici les modifications souhaitées par rapport au modèle actuel."
    };
    var viewsModels = {
        tab: "\n<div class=\"container\">\n    <div class=\"row\">\n        <!-- MENU -->\n        <div class=\"col-xs-3\" id=\"myScrollspy\">\n            <ul id=\"mapList\" class=\"nav nav-pills nav-stacked\"></ul>\n        </div>\n        <!-- MENU END -->\n\n        <div class=\"col-xs-9\">\n            <div id=\"map\" class=\"tab-content content1\"></div>\n        </div>\n    </div>\n\n     <div id=\"gabaritEditorBox\" style=\"display:none;\">\n          <div class=\"row\" style=\"width:100%; background-color:#ADCCFF\">\n           <div class=\"col-xs-12\" style=\"width:100%\">\n               <input id=\"search\" type=\"search\"></input>\n               <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n                 <button type=\"button\" id=\"searchPrevious\" class=\"btn btn-default\" title=\"Next\"><span class=\"fa fa-arrow-left\"></span></button>\n                 <button type=\"button\" id=\"searchNext\" class=\"btn btn-default\"  title=\"Previous\"><span class=\"fa fa-arrow-right\"></span></button>\n                <button type=\"button\" id=\"addItem\" class=\"btn btn-default\"  title=\"add\"><span class=\"fa fa-plus-square-o\"></span></button>\n                </div>\n\n           </div>           \n           \n         </div>    \n         <div class=\"row\" style=\"height:93%;width:100%\">\n           <div class=\"col-xs-12\" style=\"height:100%;width:100%\">\n               <div id=\"gabaritEditor\" style=\"height:100%;width:100%\"></div>\n           </div>           \n           \n         </div>    \n     </div>\n           \n </div>\n",
        flat: "\n<div class=\"container\">\n    <div class=\"row\">\n        <!-- MENU -->\n        <div class=\"col-xs-1\" id=\"myScrollspy\">\n            <ul id=\"mapList\" class=\"nav nav-pills nav-stacked\"></ul>\n        </div>\n        <!-- MENU END -->\n\n        <div class=\"col-xs-11\">\n            <div id=\"map\"></div>\n        </div>\n    </div>\n\n     <div id=\"gabaritEditorBox\" style=\"display:none;\">\n          <div class=\"row\">\n           <div class=\"col-xs-12\">\n               <div id=\"gabaritEditor\" height=\"100%\"></div>\n           </div>           \n           \n         </div>    \n     </div>\n           \n </div>\n"
    };
    var ItemShorcutsNames = {
        "Number": "NumberItem",
        "Sound": "SoundItem",
        "Image": "ImageItem",
        "Boolean": "BooleanItem",
        "Flashtml": "FlashtmlItem",
        "FlashtmlPack": "FlashtmlPackItem",
        "ImageSequence": "ImageSequenceItem",
        "Video": "VideoItem",
        "FLA": "FLAItem",
        "class": "ClassFile"
    };

    var EditionItemGenerator = function (_Component) {
        _inherits(EditionItemGenerator, _Component);

        function EditionItemGenerator(dataObject) {
            _classCallCheck(this, EditionItemGenerator);

            var _this = _possibleConstructorReturn(this, (EditionItemGenerator.__proto__ || Object.getPrototypeOf(EditionItemGenerator)).call(this, Object.assign({ controller: null }, dataObject)));

            _this.controller = _this.dataObject.controller;
            _this._defaultPackage = "editionitems";
            _this.defaultPackage = "editionitems";
            _this.filters = { type: "all" };
            _this.modeDisplay = "tab";
            _this.children = [];
            return _this;
        }

        _createClass(EditionItemGenerator, [{
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
                $(view).find("#mapList").empty();
                $(view).find("#map").empty();
                this.children.length = 0;
            }
        }, {
            key: "addItems",
            value: function addItems(items, parent) {
                console.log("addItems", items);
                for (var i = 0; i < items.length; i++) {
                    console.log("addItem", items[i]);
                    var startNo = items[i].start == undefined ? 0 : Number(items[i].start);
                    var endNo = items[i].end == undefined ? 0 : Number(items[i].end);
                    for (var j = startNo; j <= endNo; j++) {
                        var item = this.addItem(items[i], parent, j);
                    }
                }
                ;
                console.log("addItems2", items);
            }
        }, {
            key: "addItem",
            value: function addItem(params, parent, index, itemParent) {
                var _this2 = this;

                try {
                    if (params.type != "Group" && this.filters.type != "all" && this.filters.type != params.type.toLowerCase()) return params;
                } catch (err) {
                    console.log(err);
                }
                var packagePath = null;
                var idComp = null;
                var idArr = params.type.split(".");
                if (idArr.length > 1) {
                    idComp = idArr[idArr.length - 1];
                    idArr.pop();
                    packagePath = idArr.join("/");
                } else {
                    idComp = idArr[0];
                }
                if (!packagePath) {
                    var packagePath = params.editor != undefined && params.editor.type != undefined ? params.editor.type : this.defaultPackage;
                }

                idComp = ItemShorcutsNames[idComp] || idComp;
                var initParams;

                if (params.asset && params.type != "ImageSequence") {
                    initParams = this.jx.tools.cloneObject(params);
                    initParams.gabaritID = params.id;
                    initParams.id = this.jx.tools.replaceCharByNumber(initParams.id, index);
                    initParams.asset = this.jx.tools.cloneObject(initParams.asset);
                    initParams.asset.src = this.jx.tools.replaceCharByNumber(initParams.asset.src, index);
                } else {
                    initParams = params;
                }
                if (this.jx.db.classDefined("jx/editor/" + packagePath + "/" + idComp)) {
                    var itemClass = this.jx.db.getClass("jx/editor/" + packagePath + "/" + idComp);
                    var item = new itemClass({ jx: this.jx, data: initParams, controller: this.controller });
                    item.onchanged.add(function (evt) {
                        return _this2.controller.onChangeData(evt);
                    });
                } else if (this.jx.db.classDefined("jx/editor/" + this._defaultPackage + "/" + idComp)) {
                    var itemClass = this.jx.db.getClass("jx/editor/" + this._defaultPackage + "/" + idComp);
                    var item = new itemClass({ jx: this.jx, data: initParams, controller: this.controller });
                    item.onchanged.add(function (evt) {
                        return _this2.controller.onChangeData(evt);
                    });
                } else {
                    console.warn("EditionItemGenerator._addItem_" + idComp + " not exists");
                    var itemClass = this.jx.db.getClass("jx/editor/" + this._defaultPackage + "/Todo");
                    var item = new itemClass({ jx: this.jx, data: initParams, controller: this.controller });
                    item.onchanged.add(function (evt) {
                        return _this2.controller.onChangeData(evt);
                    });
                }

                if (item.view.shortcut == true) {
                    delete item.view.shortcut;
                    return this.addItem(item.view, parent, index, itemParent);
                }
                ;
                item.itemParent = itemParent;

                if (this.jx.editor.getBoolDependsGroup(initParams.visible, true)) {
                    if (parent == undefined) {
                        if (this.modeDisplay == "flat") {
                            $("#map").append("<hr>");
                            $("#map").append("<div id=\"" + item.id + "Tab\" class=\"text-info\"><h5>" + item.id + "</h5></div>");
                            $("#map").append(item.view);
                        } else {
                            $("#mapList").append("<li id=\"" + item.id + "Tab\"><a href=\"#" + item.id + "\"    data-toggle=\"tab\">" + item.id + "</a></li>");
                            $("#map").append(item.view);
                        }
                    } else {
                        $(parent).append(item.view);
                    }
                }
                this.children.push(item);
                if (initParams.children != undefined) {
                    this.addItems(initParams.children, item.view, item);
                }
                ;
                return initParams;
            }
        }, {
            key: "view",
            get: function get() {
                return viewsModels[this.modeDisplay];
            }
        }]);

        return EditionItemGenerator;
    }(_Component3.default);

    exports.default = EditionItemGenerator;
});
//# sourceMappingURL=EditionItemGenerator.js.map