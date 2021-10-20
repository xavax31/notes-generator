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

    var ItemShorcutsNames = {
        "Number": "NumberItem",
        "class": "ClassFile"
    };

    var DataCtrl = function (_Component) {
        _inherits(DataCtrl, _Component);

        function DataCtrl(dataObject) {
            _classCallCheck(this, DataCtrl);

            var _this = _possibleConstructorReturn(this, (DataCtrl.__proto__ || Object.getPrototypeOf(DataCtrl)).call(this, dataObject));

            _this.view = _this.dataObject.view;
            _this.model = _this.dataObject.model;
            _this._defaultPackage = "editionitems";
            _this.defaultPackage = "editionitems";
            _this.filters = { type: "all" };
            _this.modeDisplay = "tab";
            _this._createChildren(_this.model.children || [], _this.model, _this.view);
            if (_this.id != "Group") {
                _this.model.onchanged.add(function (evt) {
                    console.log("DATA onchanged", evt.target.id);
                    _this.view.value = _this.model.value;
                });
                _this.view.onchanged.add(function (evt) {
                    console.log("ITEM onchanged", evt.target.id);
                    _this.model.setValue(_this.view.value);
                });
            }
            return _this;
        }

        _createClass(DataCtrl, [{
            key: "_createChildren",
            value: function _createChildren(layout, gabaritModel, parent) {
                console.log("_createLayoutView", layout, gabaritModel, parent);
                var treeCtrl = [];
                console.log(this.model);
                var dataObject;
                this.controller = this;
                for (var i = 0; i < layout.length; i++) {
                    dataObject = layout[i];
                    console.log(dataObject);
                    if (!dataObject.type) {
                        dataObject = gabaritModel.getByPath(dataObject.id);
                    } else {
                        dataObject = this.cc({ type: "editionitems.DataModel", data: dataObject });
                    }
                    console.log(dataObject);

                    var packagePath = null;
                    var idComp = null;
                    var idArr = dataObject.type.split(".");
                    if (idArr.length > 1) {
                        idComp = idArr[idArr.length - 1];
                        idArr.pop();
                        packagePath = idArr.join("/");
                    } else {
                        idComp = idArr[0];
                    }

                    if (!packagePath) {
                        var packagePath = dataObject.editor != undefined && dataObject.editor.type != undefined ? dataObject.editor.type : this.defaultPackage;
                    }

                    idComp = ItemShorcutsNames[idComp] || idComp;
                    console.log("IDD0", idComp);
                    if (this.jx.db.classDefined("jx/editor/editionitems/" + idComp)) {
                        var itemClass = this.jx.db.getClass("jx/editor/" + packagePath + "/" + idComp);
                        var item = new itemClass({ jx: this.jx, data: dataObject });
                    } else if (this.jx.db.classDefined("jx/editor/" + this._defaultPackage + "/" + idComp)) {
                        console.log("DEFAULT", "jx/editor/" + this._defaultPackage + "/" + idComp);
                        var itemClass = this.jx.db.getClass("jx/editor/" + this._defaultPackage + "/" + idComp);
                        var item = new itemClass({ jx: this.jx, data: dataObject });
                    } else {
                        console.warn("EditionItemGenerator._addItem_" + idComp + " not exists");
                        var item = new Todo({ jx: this.jx, data: dataObject });
                    }
                    if (parent.view.find("#mapList").length > 0) {
                        if (dataObject.children) {
                            parent.view.find("#mapList").append("<li id=\"" + item.data.id + "Tab\"><a href=\"#" + item.data.id + "\"    data-toggle=\"tab\">" + item.data.id + "</a></li>");
                        }
                        console.log("IDDD1", item.data.id);
                        parent.view.find("#map").append(item.view);
                    } else {
                        console.log("IDDD", item.data.id);
                        parent.view.append(item.view);
                    }
                    var dataCtrl = this.cc({ id: idComp, type: "editionitems.DataCtrl", view: item, model: dataObject });
                    treeCtrl.push(dataCtrl);
                }
                ;
            }
        }]);

        return DataCtrl;
    }(_Component3.default);

    exports.default = DataCtrl;
});
//# sourceMappingURL=DataCtrl.js.map