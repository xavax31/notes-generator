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

    var MenuEdition = function (_Component) {
        _inherits(MenuEdition, _Component);

        function MenuEdition(dataObject) {
            _classCallCheck(this, MenuEdition);

            var _this = _possibleConstructorReturn(this, (MenuEdition.__proto__ || Object.getPrototypeOf(MenuEdition)).call(this, Object.assign({
                project: null,
                controller: null
            }, dataObject)));

            _this.project = _this.dataObject.project;
            _this.controller = _this.dataObject.controller;
            _this._editMenuCreate();
            _this.project.onlock.add(function (evt) {
                return _this._lock(evt);
            });
            _this.project.onunlock.add(function (evt) {
                return _this._unlock(evt);
            });
            return _this;
        }

        _createClass(MenuEdition, [{
            key: "_editMenuCreate",
            value: function _editMenuCreate() {
                var _this2 = this;

                var editMenu = $("\n\t\t\t<div>\n\t\t\t\t<h4 id=\"idProject\" class=\"text-center\"></h4>\n\n\t\t\t\t<div  class=\"text-right\" style=\"top:0px;right: 0px;position:absolute\">\n\t\t\t\t\t<span class=\"fa fa-user\">" + this.jx.editor.user.name + "</span><span>(" + this.jx.editor.user.group + ")</span>\n\t\t\t\t  </div>\n\n\t\t\t\t<div  id=\"edit_menu\" class=\"text-right\">\n\t\t\t\t\t<select id=\"Lang\" class=\"inline\">\n\t\t\t\t\t\t<option value=\"fr\">Français</option>\n\t\t\t\t\t\t<option value=\"en\">Anglais</option>\n\t\t\t\t\t\t<option value=\"de\">Allemand</option>\n\t\t\t\t\t\t<option value=\"es\">Espagnol</option>\n\t\t\t\t\t\t<option value=\"it\">Italien</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<select id=\"TypeView\" class=\"inline\">\n\t\t\t\t\t\t<option value=\"tab\">Vue onglets</option>\n\t\t\t\t\t\t<option value=\"flat\">Vue à plat</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<select id=\"TypeSelection\" class=\"inline\">\n\t\t\t\t\t\t<option value='{\"type\":\"all\"}'>Tout afficher</option>\n\t\t\t\t\t\t<option value='{\"type\":\"sound\"}'>Afficher que les sons</option>\n\t\t\t\t\t\t<option value='{\"type\":\"text\"}'>Afficher que les texts</option>\n\t\t\t\t\t\t<option value='{\"type\":\"image\"}'>Afficher que les images</option>\n\t\t\t\t\t</select>\n\n\t\t\t\t\t<div id=\"drop_zone\"></div>\n\t\t\t\t\t\t\t\t\t\t  \n\t\t\t\t\t  <button type=\"button\"  id=\"report\" class=\"btn btn-default\"  title=\"Génerer un rapport du projet\"><span class=\"fa fa-list\"></span></button>\n\t\t\t\t\t  <button type=\"button\"  id=\"sendMail\" class=\"btn btn-default\"  title=\"Prévenir le développeur d'une demande de modification\"><span class=\"fa fa-envelope-o\"></span></button>\n\n\t\t\t\t\t  <div class=\"btn-group\">\n\t\t\t\t\t\t  <button type=\"button\" id=\"openProjectDir\" data-action='{\"action\": \"project.openProjectDir\"}'  class=\"btn btn-default\"  title=\"Explorer le dossier local du projet\"><span class=\"fa fa-folder-open-o\"></button>\n\t\t\t\t\t\t  <button type=\"button\" id=\"testBtnDev\" data-action='{\"action\": \"testBtnDev\"}'  class=\"btn btn-default\"  title=\"testBtnDev\">testBtnDev</button>\n\n\t\t\t\t\t\t  <button type=\"button\" id=\"openTerminal\"  data-action='{\"action\": \"project.openTerminal\"}' class=\"btn btn-default\" style=\"background-color:#000000\" title=\"open terminal on project directory\"><span class=\"fa fa-inverse fa-terminal\"></span></button>\n\t\t\t\t\t\t  <!-- <button type=\"button\" id=\"gitInitWithBitBucketLink\"  data-action='{\"action\": \"project.gitInitWithBitBucketLink\"}' class=\"btn btn-default\" title=\"init git project\"><span class=\"fa fa-bitbucket\"></span></button> -->\n\n\t\t\t\t\t\t  <!-- <button type=\"button\" id=\"openVisualCodeProject\" data-action='{\"action\": \"project.openVisualCodeProject\"}'  class=\"btn btn-default\"  title=\"Ouvrir le projet Visual Code\"><span class=\"fa fa-file-code-o\"></button> -->\n\n\t\t\t\t\t\t  <button type=\"button\" id=\"openVisualCodeProject\" data-action='{\"action\": \"project.openVisualCodeProject\"}'  class=\"btn btn-default\"  title=\"Ouvrir le projet Visual Code\"><img src=\"assets/images/visualstudiocode.png\" style=\"width:20px;height:12px;\" /></button>\n\n\t\t\t\t\t\t  <span id=\"openCodeEditorChoice\" class=\"dropdown\" style=\"left:-15px;top:30px;cursor:pointer\">\n\t\t\t\t\t\t\t  <span class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"></span></span>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<ul class=\"dropdown-menu\" style=\"margin:0px;padding:0px\">\n\t\t\t\t\t\t\t\t  <li>\n\t\t\t\t\t\t\t\t\t  <button type=\"button\" id=\"openVisualCodeProject\" data-action='{\"action\": \"project.openVisualCodeProject\"}'  class=\"btn btn-default\"  title=\"Ouvrir le projet Visual Code\"  style=\"width:200px\"></span><img src=\"assets/images/visualstudiocode.png\" style=\"width:15px;height:15px\" /> </span>Open with Visual Studio</button>\n\t\t\t\t\t\t\t\t  </li>\n\t\t\t\t\t\t\t\t  <li>\n\t\t\t\t\t\t\t\t\t  <button type=\"button\" id=\"openSublimeProject\" data-action='{\"action\": \"project.openSublimeProject\"}'  class=\"btn btn-default\"  title=\"Ouvrir le projet SublimeText\" style=\"width:200px\"><span class=\"fa fa-file-code-o\"></span> Open with SublimeText</button>\n\t\t\t\t\t\t\t\t  </li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t  </span>\n\n\t\t\t\t\t  </div>\n\t\t\t\t\t  \n\t\t\t\t\t  <div class=\"btn-group\">\n\t\t\t\t\t\t  <button type=\"button\" id=\"editGabarit\" class=\"btn btn-default\"  title=\"Editer le gabarit\"><span class=\"fa fa-sitemap\"></span></button>\n\t\t\t\t\t\t  <button type=\"button\" id=\"saveFromJSONEDitor\" class=\"btn btn-default\" title=\"Sauver les modifications\"><span class=\"fa fa-floppy-o\"></span></button>\n\t\t\t\t\t  </div>\n\n\t\t\t\t\t  <div class=\"btn-group\">\n\t\t\t\t\t\t  <button type=\"button\" id=\"transpilProject\"  data-action='{\"action\": \"project.transpilProject\"}' class=\"btn btn-default\"  title=\"Lance la transpilation es6 Babel dans un terminal\"><span class=\"fa fa-cogs\"></span></button>\n\t\t\t\t\t\t  <button type=\"button\" id=\"previewDev\" data-action='{\"action\": \"project.previewDev\"}' class=\"btn btn-default\"  title=\"Voir l'aperçu de ce projet utilisant la dernière version de jxengine\"  style=\"color:#000000;background-color:#ff8a2d\" >jx<span class=\"fa fa-bug\"></span></button>\n\t\t\t\t\t\t  <button type=\"button\" id=\"showVersion\" class=\"btn btn-default\"   data-action='{\"action\": \"project.getEngineVersionDial\"}' title=\"Show/Hide JX Version\">jx<span class=\"fa fa-info\"></span></button>\n\t\t\t\t\t\t  <button type=\"button\" id=\"updateInternJXDialog\"  data-action='{\"action\": \"project.updateInternJXDialog\"}' class=\"btn btn-default\" title=\"Met à jour ce projet avec la dernière version de jxengine\">jx<span class=\"fa fa-level-up\"></span></button>\n\t\t\t\t\t\t  <button type=\"button\" id=\"showAPIDoc\"  data-action='{\"action\": \"project.showAPIDoc\"}' class=\"btn btn-default\" title=\"show api doc of project\"><span class=\"fa fa-book\"></span></button>\n\t\t\t\t\t\t  <button type=\"button\" id=\"generateAPIDoc\"  data-action='{\"action\": \"project.generateAPIDoc\"}' class=\"btn btn-default\" title=\"generate api doc of project\"><span class=\"fa fa-cogs\"></span><span class=\"fa fa-book\"></span></button>\n\t\t\t\t\t  </div>\n\n\t\t\t\t\t<div class=\"btn-group\" id=\"extraActionsGroup\">\n\t\t\t\t\t  \t<button type=\"button\" id=\"extraActionsButton\" data-action='{\"action\": \"\"}'  class=\"btn btn-default\"  title=\"Custom extra dev actions\"><span class=\"fa fa-bolt\"></span></button>\n\n\t\t\t\t\t\t<span id=\"extraActions\" class=\"dropdown\" style=\"left:-15px;top:30px;cursor:pointer\">\n\t\t\t\t\t\t\t<span class=\"dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"></span></span>\t\n\t\t\t\t\t\t\t  \t\t\t  \n\t\t\t\t\t\t\t<ul class=\"dropdown-menu\" style=\"margin:0px;padding:0px\">\n\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<button type=\"button\" id=\"extraAction1\" data-action='{\"action\": \"project.extraAction1\"}'  class=\"btn btn-default\"  title=\"Executer extraAction1\"  style=\"width:200px\"><span class=\"fa fa-bolt\"></span> Extra Action 1</button>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<button type=\"button\" id=\"extraAction2\" data-action='{\"action\": \"project.extraAction2\"}'  class=\"btn btn-default\"  title=\"Executer extraAction2\"  style=\"width:200px\"><span class=\"fa fa-bolt\"></span> Extra Action 2</button>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t\t  \n\n\t\t\t\t\t  <!--<div class=\"btn-group\">\n\t\t\t\t\t\t  <button type=\"button\" id=\"dropbox\"  data-action='{\"action\": \"project.dropbox\"}' class=\"btn btn-default\"  title=\"Zone de partage\"><span class=\"fa fa-suitcase\"></span></button>\n\t\t\t\t\t  </div>-->\n\n\t\t\t\t\t  <div class=\"btn-group\" style=\"margin-left: 50px;\">\n\t\t\t\t\t  </div>\n\n\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t<button type=\"button\" id=\"serverSyncDial\" data-action='{\"action\": \"project.serverSyncDial\"}' class=\"btn btn-default\"  title=\"Synchronisation serveur\"><span class=\"fa fa-cloud\"></span></button>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<button type=\"button\"  id=\"exportDial\"   data-action='{\"action\": \"project.exportDial\"}' class=\"btn btn-default\"  title=\"Exporter/Télécharger une version du projet\"><span class=\"fa fa-share-square-o\"></span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"showInfo\" class=\"btn btn-default\" title=\"Show/Hide info\"><span class=\"fa fa-info\"></span></button>\n\t\t\t\t\t<button type=\"button\" id=\"hideInfo\" class=\"btn btn-default active\" title=\"Show/Hide info\"><span class=\"fa fa-info\"></span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"unfoldTexts\" class=\"btn btn-default\" title=\"Open/Close textfields\"><span class=\"fa fa-text-height\"></span></button>\n\t\t\t\t\t<button type=\"button\" id=\"foldTexts\" class=\"btn btn-default active\" title=\"Open/Close textfields\"><span class=\"fa fa-text-height\"></span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"editMode\" class=\"btn btn-default btn-lg\" style=\"color:#FFFFFF;background-color:#4d90fe;width:120px\" title=\"Editer\"><span class=\"fa fa-pencil\">Editer</span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"readMode\" class=\"btn btn-danger btn-lg active\"  style=\"color:#FFFFFF;background-color:#D94A38;width:120px\" title=\"Sortir du mode édition\"><span class=\"fa fa-check\">Terminer</span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"preview\"   data-action='{\"action\": \"project.preview\"}' class=\"btn btn-default  btn-lg\"  title=\"Voir l'aperçu\"  style=\"color:#000000;background-color:#27fd00\" ><span class=\"fa fa-eye\"></span></button>\n\t\t\t\t\t<button type=\"button\" id=\"previewDebug\"   data-action='{\"action\": \"project.previewDebug\"}' class=\"btn btn-default  btn-lg\"  title=\"Voir l'aperçu (mode debug)\" style=\"color:#000000;background-color:#ff8a2d\" ><span class=\"fa fa-bug\"></span></button>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
                this.view = editMenu;
                editMenu.find("#Lang").on("change", function (evt) {
                    console.log("change", evt.target.value);
                    _this2.controller.lang = evt.target.value;
                    _this2.controller.refreshEditionView();
                });
                editMenu.find("#TypeView").on("change", function (evt) {
                    console.log("change", evt.target.value);
                    _this2.controller.gabaritView.modeDisplay = evt.target.value;
                    _this2.controller.refreshEditionView();
                });
                editMenu.find("#TypeSelection").on("change", function (evt) {
                    console.log("change", evt.target.value);
                    _this2.controller.gabaritView.setFilters(evt.target.value);
                    _this2.controller.refreshEditionView();
                });

                editMenu.find("#idProject").html(this.project.info.title && this.project.info.title.trim() != "" ? this.project.info.title : this.project.info.id);
                var contextLocal = this.jx.config.system.host.type == "local";
                editMenu.find("#sendMail").css('display', "none");
                editMenu.find("#report").css('display', "none");
                editMenu.find("#editGabarit").css('display', this._hasAccess("editGabarit") ? "inline" : "none");
                editMenu.find("#testBtnDev").css('display', contextLocal && this._hasAccess("testBtnDev") ? "inline" : "none");
                editMenu.find("#openProjectDir").css('display', contextLocal && this._hasAccess("openProjectDir") ? "inline" : "none");
                editMenu.find("#openTerminal").css('display', contextLocal && this._hasAccess("openTerminal") ? "inline" : "none");
                editMenu.find("#generateAPIDoc").css('display', contextLocal && this._hasAccess("generateAPIDoc") ? "inline" : "none");
                editMenu.find("#showAPIDoc").css('display', this._hasAccess("showAPIDoc") ? "inline" : "none");
                editMenu.find("#extraActionsGroup").css('display', contextLocal && this._hasAccess("extraActionsGroup") ? "inline-block" : "none");
                editMenu.find("#openSublimeProject").css('display', contextLocal && this._hasAccess("openSublimeProject") ? "inline" : "none");
                editMenu.find("#openCodeEditorChoice").css('display', contextLocal && this._hasAccess("openSublimeProject") ? "inline" : "none");
                editMenu.find("#openVisualCodeProject").css('display', contextLocal && this._hasAccess("openSublimeProject") ? "inline" : "none");
                editMenu.find("#compareJSON").css('display', contextLocal && this._hasAccess("compareJSON") ? "inline" : "none");
                editMenu.find("#serverSyncDial").css('display', contextLocal && this._hasAccess("serverSyncDial") ? "inline" : "none");
                editMenu.find("#pullProject").css('display', contextLocal && this._hasAccess("pullProject") ? "inline" : "none");
                editMenu.find("#pushProject").css('display', contextLocal && this._hasAccess("pushProject") ? "inline" : "none");
                editMenu.find("#pushProjectSrc").css('display', contextLocal && this._hasAccess("pushProjectSrc") ? "inline" : "none");
                editMenu.find("#transpilProject").css('display', contextLocal && this._hasAccess("transpilProject") ? "inline" : "none");
                editMenu.find("#previewDev").css('display', this._hasAccess("previewDev") ? "inline" : "none");
                editMenu.find("#updateInternJXDialog").css('display', this._hasAccess("updateInternJX") ? "inline" : "none");
                editMenu.find("#showVersion").css('display', this._hasAccess("showVersion") ? "inline" : "none");
                editMenu.find("#saveFromJSONEDitor").css('display', "none");
                editMenu.find("#testBtnDev").css('display', "none");
                editMenu.find("#compareJSON").css('display', "none");
                editMenu.find("#testBtnDev").css('display', "none");
                editMenu.find("#preview").css('display', this._hasAccess("preview") ? "inline" : "none");
                editMenu.find("#previewDebug").css('display', this._hasAccess("previewDebug") ? "inline" : "none");

                var buttons = editMenu.find(".btn");
                for (var i = 0; i < buttons.length; i++) {
                    $(buttons[i]).click(function (event) {
                        if ($(event.currentTarget).attr("data-action")) {
                            var request = JSON.parse($(event.currentTarget).attr("data-action"));
                        } else {
                            request = { action: event.currentTarget.id, params: undefined };
                        }
                        var action = request.action;
                        var params = request.params || undefined;
                        var actionArr = action.split(".");
                        var targetFunc = _this2.controller;
                        var target = _this2.controller;
                        for (var i = 0; i < actionArr.length; i++) {
                            target = targetFunc;
                            targetFunc = targetFunc[actionArr[i]];
                        }
                        ;
                        console.log(action, params);
                        targetFunc.call(target, params);
                    });
                }
                ;
            }
        }, {
            key: "_hasAccess",
            value: function _hasAccess(functionnalityID) {
                return this.controller.hasAccess(functionnalityID);
            }
        }, {
            key: "refresh",
            value: function refresh() {}
        }, {
            key: "_lock",
            value: function _lock(_ref) {
                var locked = _ref.locked;
                var _ref$project = _ref.project;
                var project = _ref$project === undefined ? this.project : _ref$project;

                if (!locked) {} else if (locked === this.jx.editor.user) {
                    this.view.find("#readMode").css("display", "inline");
                    this.view.find("#editMode").css("display", "none");
                } else {
                    this.view.find("#readMode").css("display", "none");
                    this.view.find("#editMode").html("<span class=\"fa fa-lock\"> by " + locked.name + "</span>");
                    this.view.find("#editMode").css("background-color", "#bad9fe");
                }
            }
        }, {
            key: "_unlock",
            value: function _unlock(_ref2) {
                var locked = _ref2.locked;
                var _ref2$project = _ref2.project;
                var project = _ref2$project === undefined ? this.project : _ref2$project;

                if (!locked) {
                    this.view.find("#readMode").css("display", "none");
                    this.view.find("#editMode").html("<span class=\"fa fa-pencil\">Editer</span>");
                    this.view.find("#editMode").css("background-color", "#4d90fe");
                    this.view.find("#editMode").css("display", "inline");
                } else if (locked === this.jx.editor.user) {
                    this.view.find("#readMode").css("display", "inline");
                    this.view.find("#editMode").css("display", "none");
                } else {
                    this.view.find("#readMode").css("display", "none");
                    this.view.find("#editMode").html("<span class=\"fa fa-lock\"> by " + locked.name + "</span>");
                    this.view.find("#editMode").css("background-color", "#bad9fe");
                }
            }
        }, {
            key: "btInfosToggle",
            value: function btInfosToggle(state) {
                if (state) {
                    this.view.find("#showInfo").css("display", "inline");
                    this.view.find("#hideInfo").css("display", "none");
                } else {
                    this.view.find("#showInfo").css("display", "none");
                    this.view.find("#hideInfo").css("display", "inline");
                }
            }
        }, {
            key: "btUnfoldTextsToggle",
            value: function btUnfoldTextsToggle(state) {
                if (state) {
                    this.view.find("#unfoldTexts").css("display", "inline");
                    this.view.find("#foldTexts").css("display", "none");
                } else {
                    this.view.find("#unfoldTexts").css("display", "none");
                    this.view.find("#foldTexts").css("display", "inline");
                }
            }
        }, {
            key: "setProjectTitle",
            value: function setProjectTitle(title) {
                this.view.find("#idProject").html(title);
            }
        }, {
            key: "btGabaritJSONEditorToggle",
            value: function btGabaritJSONEditorToggle(state) {
                if (state) {
                    this.view.find("#saveFromJSONEDitor").css("display", "inline");
                }
            }
        }]);

        return MenuEdition;
    }(_Component3.default);

    exports.default = MenuEdition;
});
//# sourceMappingURL=MenuEdition.js.map