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

    var ProjectEditView = function (_Component) {
        _inherits(ProjectEditView, _Component);

        function ProjectEditView(dataObject) {
            _classCallCheck(this, ProjectEditView);

            return _possibleConstructorReturn(this, (ProjectEditView.__proto__ || Object.getPrototypeOf(ProjectEditView)).call(this, dataObject));
        }

        _createClass(ProjectEditView, [{
            key: "_create",
            value: function _create() {
                console.log("ProjectEditView create");
                this.addEventDispatcher("onevent");
                this._createPage();
            }
        }, {
            key: "_createPage",
            value: function _createPage() {
                var _this2 = this;

                this.view = $("body");

                $('title').html(this.project.info.title && this.project.info.title.trim() != "" ? this.project.info.title : this.project.info.id);

                var editMenu = $("\n\t\t\t<div>\n\t\t\t\t<h4 id=\"idProject\" class=\"text-center\"></h4>\n\n\t\t\t\t<div  class=\"text-right\" style=\"top:0px;right: 0px;position:absolute\">\n\t\t\t\t\t<span class=\"fa fa-user\">" + this.jx.editor.user.name + "</span><span>(" + this.jx.editor.user.group + ")</span>\n\t          \t</div>\n\n\t\t\t\t<div  id=\"edit_menu\" class=\"text-right\">\n\t\t\t\t\t<select id=\"Lang\" class=\"inline\">\n\t\t\t\t\t    <option value=\"fr\">Français</option>\n\t\t\t\t\t    <option value=\"en\">Anglais</option>\n\t\t\t\t\t    <option value=\"de\">Allemand</option>\n\t\t\t\t\t    <option value=\"es\">Espagnol</option>\n\t\t\t\t\t    <option value=\"it\">Italien</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<select id=\"TypeView\" class=\"inline\">\n\t\t\t\t\t    <option value=\"tab\">Vue onglets</option>\n\t\t\t\t\t    <option value=\"flat\">Vue à plat</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<select id=\"TypeSelection\" class=\"inline\">\n\t\t\t\t\t    <option value='{\"type\":\"all\"}'>Tout afficher</option>\n\t\t\t\t\t    <option value='{\"type\":\"sound\"}'>Afficher que les sons</option>\n\t\t\t\t\t    <option value='{\"type\":\"text\"}'>Afficher que les texts</option>\n\t\t\t\t\t    <option value='{\"type\":\"image\"}'>Afficher que les images</option>\n\t\t\t\t\t</select>\n\n\t\t\t\t\t<div id=\"drop_zone\"></div>\n\t\t\t\t\t\n\t\t\t\t  \n\t\t\t\t  \t<button type=\"button\"  id=\"report\" class=\"btn btn-default\"  title=\"Génerer un rapport du projet\"><span class=\"fa fa-list\"></span></button>\n\t\t\t\t  \t<button type=\"button\"  id=\"sendMail\" class=\"btn btn-default\"  title=\"Prévenir le développeur d'une demande de modification\"><span class=\"fa fa-envelope-o\"></span></button>\n\n\t\t\t\t  \t<div class=\"btn-group\">\n\t\t\t\t  \t\t<button type=\"button\" id=\"openProjectDir\" data-action='{\"action\": \"project.openProjectDir\"}'  class=\"btn btn-default\"  title=\"Explorer le dossier local du projet\"><span class=\"fa fa-folder-open-o\"></button>\n\t\t\t\t\t  \t<button type=\"button\" id=\"pullProject\" data-action='{\"action\": \"project.pullProject\"}' class=\"btn btn-default\"  title=\"Pousse le projet sur le serveur\">Pull</button>\n\t\t\t\t\t  \t<button type=\"button\" id=\"pushProject\" data-action='{\"action\": \"project.pushProject\"}' class=\"btn btn-default\"  title=\"Tire le projet du serveur\">Push</button>\n\t\t\t\t\t  \t<button type=\"button\" id=\"pushProjectSrc\" data-action='{\"action\": \"project.pushProjectSrc\"}' class=\"btn btn-default\"  title=\"Pousse uniquement le code sur le serveur\">Push <span class=\"fa fa-file-code-o\"></span></button>\n\t\t\t\t\t  \t<button type=\"button\" id=\"transpilProject\"  data-action='{\"action\": \"project.transpilProject\"}' class=\"btn btn-default\"  title=\"Lance la transpilation es6 Babel dans un terminal\"><span class=\"fa fa-cogs\"></span></button>\n\t\t\t\t\t  </div>\n\t\t\t\t  \t\n\t\t\t\t  \t<div class=\"btn-group\">\n\t\t\t\t  \t\t<button type=\"button\" id=\"editGabarit\" class=\"btn btn-default\"  title=\"Editer le gabarit\"><span class=\"fa fa-sitemap\"></span></button>\n\t\t\t\t  \t\t<button type=\"button\" id=\"save\" class=\"btn btn-default\" title=\"Sauver les modifications\"><span class=\"fa fa-floppy-o\"></span></button>\n\t\t\t\t  \t</div>\n\n\t\t\t\t  \t<div class=\"btn-group\">\n\t\t\t\t\t  \t<button type=\"button\" id=\"previewDev\" data-action='{\"action\": \"project.previewDev\"}' class=\"btn btn-default\"  title=\"Voir l'aperçu de ce projet utilisant la dernière version de jxengine\"  style=\"color:#000000;background-color:#ff8a2d\" >jx<span class=\"fa fa-bug\"></span></button>\n\n\t\t\t\t  \t\t<button type=\"button\" id=\"updateInternJXDialog\"  data-action='{\"action\": \"project.updateInternJXDialog\"}' class=\"btn btn-default\" title=\"Met à jour ce projet avec la dernière version de jxengine\">jx<span class=\"fa fa-level-up\"></span></button>\n\t\t\t\t  \t</div>\n\n\t\t\t\t  \t<div class=\"btn-group\" style=\"margin-left: 50px;\">\n\t\t\t\t  \t</div>\n\n\n\t\t\t\t\t<button type=\"button\"  id=\"exportDial\"   data-action='{\"action\": \"project.exportDial\"}' class=\"btn btn-default\"  title=\"Exporter/Télécharger une version du projet\"><span class=\"fa fa-share-square-o\"></span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"showInfo\" class=\"btn btn-default\" title=\"Show/Hide info\"><span class=\"fa fa-info\"></span></button>\n\t\t\t\t\t<button type=\"button\" id=\"hideInfo\" class=\"btn btn-default active\" title=\"Show/Hide info\"><span class=\"fa fa-info\"></span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"editMode\" class=\"btn btn-default btn-lg\" style=\"color:#FFFFFF;background-color:#4d90fe\" title=\"Editer\"><span class=\"fa fa-pencil\">Editer</span></button>\n\t\t\t\t\t<button type=\"button\" id=\"readMode\" class=\"btn btn-danger btn-lg active\"  style=\"color:#FFFFFF;background-color:#D94A38\" title=\"Sortir du mode édition\"><span class=\"fa fa-check\">Terminer</span></button>\n\n\t\t\t\t\t<button type=\"button\" id=\"preview\"   data-action='{\"action\": \"project.preview\"}' class=\"btn btn-default  btn-lg\"  title=\"Voir l'aperçu\"  style=\"color:#000000;background-color:#27fd00\" ><span class=\"fa fa-eye\"></span></button>\n\t\t\t\t\t<button type=\"button\" id=\"previewDebug\"   data-action='{\"action\": \"project.previewDebug\"}' class=\"btn btn-default  btn-lg\"  title=\"Voir l'aperçu (mode debug)\" style=\"color:#000000;background-color:#ff8a2d\" ><span class=\"fa fa-bug\"></span></button>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t");
                this.editMenu = editMenu;
                this.view.append(editMenu);
                editMenu.find("#Lang").on("change", function (evt) {
                    console.log("change", evt.target.value);
                    _this2.lang = evt.target.value;
                    _this2.refreshEditionView();
                });
                editMenu.find("#TypeView").on("change", function (evt) {
                    console.log("change", evt.target.value);
                    _this2.editionItemGenerator.modeDisplay = evt.target.value;
                    _this2.refreshEditionView();
                });
                editMenu.find("#TypeSelection").on("change", function (evt) {
                    console.log("change", evt.target.value);
                    _this2.editionItemGenerator.setFilters(evt.target.value);
                    _this2.refreshEditionView();
                });

                editMenu.find("#idProject").html(this.project.info.title && this.project.info.title.trim() != "" ? this.project.info.title : this.project.info.id);
                editMenu.find("#sendMail").css('display', "none");
                editMenu.find("#report").css('display', "none");
                editMenu.find("#editGabarit").css('display', this.hasAccess("editGabarit") ? "inline" : "none");
                editMenu.find("#openProjectDir").css('display', this.hasAccess("openProjectDir") ? "inline" : "none");
                editMenu.find("#pullProject").css('display', this.hasAccess("pullProject") ? "inline" : "none");
                editMenu.find("#pushProject").css('display', this.hasAccess("pushProject") ? "inline" : "none");
                editMenu.find("#pushProjectSrc").css('display', this.hasAccess("pushProjectSrc") ? "inline" : "none");
                editMenu.find("#transpilProject").css('display', this.hasAccess("transpilProject") ? "inline" : "none");
                editMenu.find("#previewDev").css('display', this.hasAccess("previewDev") ? "inline" : "none");
                editMenu.find("#updateInternJXDialog").css('display', this.hasAccess("updateInternJX") ? "inline" : "none");
                editMenu.find("#save").css('display', this.hasAccess("save") ? "inline" : "none");

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
                        var targetFunc = _this2;
                        var target = _this2;
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
                this.refreshEditionView();
                this.readMode();
                this.hideInfo();
                this._setRemoteDeamon();
            }
        }]);

        return ProjectEditView;
    }(_Component3.default);

    exports.default = ProjectEditView;
});
//# sourceMappingURL=ProjectEditView.js.map