define(["exports", "jx/core/comps/VisualComponent"], function (exports, _VisualComponent2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

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

    var access = {
        project: {
            preview: "*",
            edit: "*",
            view: "*",
            "new": "admin,manager,dev",
            delete: "admin,manager,dev",
            moveToArchives: "admin,manager,dev",
            exportProject: "" },
        model: {
            preview: "*",
            edit: "admin,dev",
            view: "*",
            "new": "*",
            delete: "admin,dev",
            moveToArchives: "",
            exportProject: ""
        },
        appengine: {
            preview: "*",
            edit: "admin,dev",
            view: "*",
            "new": "*",
            delete: "admin,manager,dev",
            moveToArchives: "",
            exportProject: ""
        },
        archive: {
            preview: "*",
            edit: "admin,dev",
            view: "*",
            "new": "admin,manager,dev",
            delete: "admin,manager,dev",
            moveToArchives: "",
            exportProject: ""
        },
        component: {
            preview: "*",
            edit: "admin,dev",
            view: "*",
            "new": "admin,dev",
            delete: "admin,dev",
            moveToArchives: "",
            exportProject: ""
        },
        doc: {
            preview: "*",
            edit: "",
            view: "",
            "new": "",
            delete: "",
            moveToArchives: "",
            exportProject: ""
        }
    };

    var CatalogItem = function (_VisualComponent) {
        _inherits(CatalogItem, _VisualComponent);

        function CatalogItem(dataObject) {
            _classCallCheck(this, CatalogItem);

            var _this = _possibleConstructorReturn(this, (CatalogItem.__proto__ || Object.getPrototypeOf(CatalogItem)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.data = Object.assign({
                id: null,
                title: null,
                url: null,
                status: "all",
                description: ""
            }, _this.data);
            var title = _this.data.id;
            if (_this.data.title && _this.data.title.trim() != "") {
                title = _this.data.id + " (" + _this.data.title + ")";
            }
            var statusStyle = {
                "new": "css->background-color: #ffff00; color: #000000", order: "danger", todo: "danger", "dev-tovalidate": "danger", "dev-confirmed": "success", "R&D": "warning", test: "info", debug: "warning",
                doing: "warning", open: "warning", done: 'success', close: 'success'
            }[_this.data.status] || "info";
            var statusStyleCSS = "";
            var iconStyle = {
                "new": "fa-star", order: "fa-list-alt", todo: "fa-exclamation-triangle", test: "fa-flask", "R&D": "fa-flask",
                debug: "fa-bug", open: "fa-cogs", doing: "fa-cogs", done: 'fa-check-circle',
                close: 'fa-check-circle'
            }[_this.data.status];
            if (statusStyle.search(/^css->/) != -1) {
                statusStyleCSS = statusStyle.replace(/^css->/, "");
                statusStyle = "info";
            }
            var datePublicationStr = "";
            if (_this.data.datePublication != "") {
                var date = new Date(_this.data.datePublication);

                datePublicationStr = "pub: " + jx.tools.gd(date.getDate(), 2) + "/" + jx.tools.gd(date.getMonth() + 1, 2) + "/" + date.getFullYear();
            }
            var _template = "\n            <div class=\"panel panel-info paddingItem\">\n                <div class=\"row \">\n                    <div class=\"col-sm-4\">\n                        <h3 class=\"panel-title \">" + title + "</h3>\n                        <span class=\"label label-" + statusStyle + "\" style=\"" + statusStyleCSS + "\">\n                            <span class=\"fa " + iconStyle + "\">\n                                <span class=\"catalogItemStatus\">" + _this.data.status.toUpperCase() + "</span>\n                            </span>\n                        </span>\n                        <span style=\"position: absolute;left: 100px;\">" + datePublicationStr + "</span> \n                    </div>\n                    <div class=\"col-sm-4\" id=\"buttons\">\n                        <button id=\"preview\" class=\"btn btn-default\" title=\"Voir\"><span class=\"fa fa-eye\"></span></button>\n                        <button id=\"edit\" class=\"btn btn-default\" title=\"Editer\"><span class=\"fa fa-pencil-square-o\"></span></button>\n                        <button id=\"exportProject\" class=\"btn btn-default\" title=\"Créer/Télecharger un build\"><span class=\"fa fa-download\"></span></button>\n                        <button id=\"new\" class=\"btn btn-default\" title=\"Créer un nouveau projet à partir de celui çi\"><span class=\"fa fa-plus-square-o\"></span></button>\n                        <button id=\"moveToArchives\" class=\"btn btn-default\" title=\"Archiver le projet\"><span class=\"fa fa-arrow-right\"></span><span class=\"fa fa-archive\"></span></button>\n                    </div>\n                    <div class=\"col-sm-4\">\n                        <button id=\"delete\" class=\"btn btn-default\" title=\"Supprimer le projet\"><span class=\"fa fa-trash-o\"></span></button>\n                    </div>\n                </div>\n                <div class=\"row \">\n                    <div class=\"col-sm-12\">\n                        <div id=\"description\">" + _this.data.description + "</div>\n                    </div>\n                </div>\n            </div>\n        ";
            var item = $(_template);
            item.prop('id', _this.data.id);
            var me = _this;
            item.find("button").each(function (index) {
                $(this).css("display", me._hasAccess($(this).prop('id')) ? "inline" : "none");
            });
            item.find("button").data(_this.data);
            item.find("button").click(function (event) {
                var action = $(event.currentTarget).prop('id');
                var data = $(event.currentTarget).data();
                console.log(action, data);
                switch (action) {
                    case "edit":
                        _this.jx.editor.editProject({
                            id: data.id,
                            url: data.url
                        });
                        break;
                    case "preview":
                        if (data.type == "Doc") {
                            var url = data.url.search(/^http/) == -1 ? _this.jx.editor.getDirectoryURL("docsURL") + "/" + data.url : data.url;
                            var win = window.open(url);
                        } else {
                            var _url = data.url + "/public";
                            _url = _this.data.previewIndex != "" ? _url + "/" + data.previewIndex : _url;
                            _this.jx.tools.openURL(_url, data.id);
                        }
                        break;
                    case "exportProject":
                        _this.jx.editor.exportProject({
                            id: data.id,
                            projectURL: data.url
                        });
                        break;
                    case "new":
                        _this.jx.editor.createNewProjectDialog({ modelData: data }, function (newProjectData) {
                            _this.controller.refreshList();
                            _this.jx.editor.editProject({
                                id: newProjectData.id,
                                url: newProjectData.url
                            });
                        });
                        break;
                    case "moveToArchives":
                        _this.jx.editor.popup({ title: "Comfirmation de l'envoi en Archives",
                            content: "Attention, cette action va fermer et archiver ce projet.\n Etes-vous sûr ?",
                            buttons: {
                                ok: { label: "Oui" },
                                no: { label: "Non" }
                            },
                            onclose: function onclose(evt) {
                                if (evt.action == "ok") {
                                    var popup2 = _this.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                                    _this.jx.editor.moveProject({
                                        url: data.url,
                                        targetID: "archives"
                                    }, function (evt) {
                                        _this.controller.refreshList();
                                        popup2.modal('hide');
                                    });
                                }
                            }
                        });
                        break;
                    case "delete":
                        _this.jx.editor.deleteProjectDial({ id: data.id, url: data.url }, function (evt) {
                            _this.controller.refreshList();
                        });
                        break;
                }
            });
            _this.view = item;
            return _this;
        }

        _createClass(CatalogItem, [{
            key: "_hasAccess",
            value: function _hasAccess(idFunctionnality) {
                var _jx$editor;

                return (_jx$editor = this.jx.editor).userIsGroup.apply(_jx$editor, _toConsumableArray(access[this.data.type.toLowerCase()][idFunctionnality].split(",")));
            }
        }, {
            key: "_moveToArchivesDial",
            value: function _moveToArchivesDial(appData) {
                var _this2 = this;

                this.jx.editor.popup({ title: "Comfirmation de l'envoi en Archives",
                    content: "Attention, cette action va fermer et archiver ce projet.\n Etes-vous sûr ?",
                    buttons: {
                        ok: { label: "Oui" },
                        no: { label: "Non" }
                    },
                    onclose: function onclose(evt) {
                        if (evt.action == "ok") {
                            var popup2 = _this2.jx.editor.alert({ title: "Opération en cours", content: "Veuillez patienter svp...", closable: false });
                            _this2.sendToTest(null, function (evt) {
                                popup2.modal('hide');
                            });
                        }
                    }
                });
            }
        }]);

        return CatalogItem;
    }(_VisualComponent3.default);

    exports.default = CatalogItem;
});
//# sourceMappingURL=CatalogItem.js.map