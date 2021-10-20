define(["exports", "jx/editor/editionitems/DataGroup"], function (exports, _DataGroup2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _DataGroup3 = _interopRequireDefault(_DataGroup2);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
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

    var QuizDataItem = function (_DataGroup) {
        _inherits(QuizDataItem, _DataGroup);

        function QuizDataItem(dataObject) {
            _classCallCheck(this, QuizDataItem);

            var _this = _possibleConstructorReturn(this, (QuizDataItem.__proto__ || Object.getPrototypeOf(QuizDataItem)).call(this, dataObject));

            _this.data.exportType = "DataGroup";
            _this._setQuizStylesOptions();
            _this._infos = {
                title: _this.data.title,
                theme: null,
                style: null,
                questionsNum: null,
                responsesNum: null
            };
            var editionPage = _this.controller.mainController;
            var mainGabarit = editionPage.project.info.gabarit;
            var themesList = _this._findInGabarit({ gabarit: mainGabarit, path: "THEMES" });
            var themes = [];
            if (themesList) {
                var themesListChildrenLength = themesList.children.length;
                var themesListChildrenNChildrenLength = void 0;
                var theme = void 0,
                    i = void 0,
                    j = void 0;
                for (i = 0; i < themesListChildrenLength; i++) {
                    theme = { id: themesList.children[i].id };
                    themesListChildrenNChildrenLength = themesList.children[i].children.length;
                    for (j = 0; j < themesListChildrenNChildrenLength; j++) {
                        if (themesList.children[i].children[j].value) {
                            theme[themesList.children[i].children[j].id] = themesList.children[i].children[j].value;
                        }
                    }
                    theme.desc = theme.title;
                    themes.push(theme);
                }
                ;
            } else {
                themes.push({
                    id: "none",
                    desc: "aucun"
                });
            }
            _this.defaultExtraDataQ = _this.data.questionData || "magQ";
            _this.defaultExtraDataR = _this.data.answerData || "magR";
            _this.jx.editor.getOptionsList().quizDataThemesOptions = themes;
            _this._themeOptions = themes;
            if (!_this.data.hideBtnConfig) {
                _this.btnConfig = _this.cc({ type: "editionitems.ButtonItem", data: { id: "btnConfig", title: "Configurer le quiz", confirmBeforeLaunch: false, onclick: function onclick() {
                            return _this.configure();
                        } } });
                _this.view.find("#sepID").append(_this.btnConfig.view);
            }
            return _this;
        }

        _createClass(QuizDataItem, [{
            key: "_setQuizStylesOptions",
            value: function _setQuizStylesOptions() {
                var defaultOptions = {
                    standardAnswers: [{ id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }],
                    withTrueFalse: [{ id: "truefalse", desc: "2 choix: Vrai/Faux" }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]
                };
                this.quizStylesOptions = {
                    stylesOptions: [{ id: "q1", desc: "question IMAGE + TEXTE, réponses TEXTE" }, { id: "q9", desc: "question TEXTE, réponses TEXTE", enabled: true }, { id: "q2", desc: "question TEXTE, réponses IMAGE", enabled: true }, { id: "q3", desc: "Memory - question TEXTE, réponses cartes IMAGE", enabled: false }, { id: "q4", desc: "Memory - question TEXTE, réponses cartes TEXTE", enabled: false }, { id: "q5", desc: "Tir - question TEXTE, réponses TEXTE", enabled: false }, { id: "q6", desc: "Tir - question TEXTE, réponses IMAGE", enabled: false }, { id: "q7", desc: "question AUDIO, réponses TEXTE", enabled: false }, { id: "q8", desc: "question IMAGE, réponses TEXTE", enabled: false }, { id: "q10", desc: "question TEXTE + SON, réponses TEXTE + SON", enabled: true }, { id: "q11", desc: "question TEXTE + SON, réponses IMAGE + SON", enabled: true }],
                    questionsOptions: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }],
                    responsesOptions: {
                        q1: defaultOptions.withTrueFalse,
                        q2: defaultOptions.standardAnswers,
                        q9: defaultOptions.standardAnswers,
                        q10: defaultOptions.standardAnswers,
                        q11: defaultOptions.standardAnswers
                    },
                    extraDatas: {
                        "axe": [{ "id": "axe", "type": "ComboBox", "visible": true, "value": "A", "options": "QManswersAxes" }],
                        "milanoA": [{ "id": "target", "type": "Number", "visible": true, "value": 1, "min": 1, "max": 12, "step": 1 }, { "id": "category", "type": "ComboBox", "visible": true, "value": "all", "options": "milano_answersCategory" }],
                        "milanoAIntro": [{ "id": "target", "type": "ComboBox", "visible": true, "value": "A", "options": "milano_answersIntroTarget" }],
                        "magQ": [],
                        "magR": []
                    },
                    shortcuts: {}
                };
                this.jx.editor.getOptionsList().milano_answersCategory = ["all", "boy", "girl"];
                this.jx.editor.getOptionsList().milano_answersIntroTarget = ["A", "B", "C", "D", "E"];
                this.jx.editor.getOptionsList().QManswersAxes = ["A", "B", "Y", "Z"];
                this.jx.editor.getOptionsList().QMmagQ = ["A", "B", "C", "D", "E"];
            }
        }, {
            key: "_findInGabarit",
            value: function _findInGabarit(_ref) {
                var gabarit = _ref.gabarit;
                var path = _ref.path;

                if (!path) return null;
                var pathArr = path.split(".");
                var gabaritLength = gabarit.length;
                for (var i = 0; i < gabaritLength; i++) {
                    if (gabarit[i].id == pathArr[0]) {
                        if (pathArr.length === 1) {
                            return gabarit[i];
                        } else {
                            pathArr.shift();
                            return this._findInGabarit({ gabarit: gabarit[i].children, path: pathArr.join(".") });
                        }
                    }
                }
                ;
            }
        }, {
            key: "showInfo",
            value: function showInfo() {}
        }, {
            key: "hideInfo",
            value: function hideInfo() {}
        }, {
            key: "clearAll",
            value: function clearAll(_ref2) {
                var _this2 = this;

                var _ref2$confirm = _ref2.confirm;
                var confirm = _ref2$confirm === undefined ? true : _ref2$confirm;

                console.log(this.questionsArr);
                if (confirm) {
                    this.jx.editor.confirm({ content: "Supprimer toutes les questions ?", onclose: function onclose(evt) {
                            if (evt.action == "ok") {
                                var children = _this2.questionsView.children.slice();
                                for (var i = 0; i < children.length; i++) {
                                    _this2.questionsView.removeChild(children[i]);
                                }
                                _this2.questionsView.data.children.length = 0;
                                _this2.questionsView.onchanged.dispatch({ target: _this2.questionsView });
                            }
                        } });
                } else {
                    var children = this.questionsView.children.slice();
                    for (var i = 0; i < children.length; i++) {
                        this.questionsView.removeChild(children[i]);
                    }
                    this.questionsView.data.children.length = 0;
                    this.questionsView.onchanged.dispatch({ target: this.questionsView });
                }
            }
        }, {
            key: "addInfos",
            value: function addInfos() {
                var data = [{
                    "id": "infos",
                    "type": "DataObject",
                    "description": "",
                    "visible": true,
                    "children": [{
                        "id": "id",
                        "title": "quizID",
                        "type": "Text",
                        "editable": false,
                        "visible": false,
                        "description": "",
                        "value": this.data.id
                    }, {
                        "id": "name",
                        "title": "Nom",
                        "type": "Text",
                        "editable": true,
                        "description": "",
                        "value": this.data.name
                    }, {
                        "id": "theme",
                        "title": "Thème",
                        "type": "ComboBox",
                        "editable": true,
                        "description": "",
                        "value": this.data.theme || this._themeOptions[0].id,
                        "options": "quizDataThemesOptions"
                    }]
                }, {
                    "id": "defaultConfig",
                    "type": "DataGroup",
                    "showHeader": true,
                    "title": "<span class='qz-questions'>Global</span>",
                    "sepLineStyle": "qz-sepLineQuestions",
                    "description": "",
                    "visible": true,
                    "children": [{
                        "id": "defaultQuestionImage",
                        "visible": true,
                        "type": "Image",
                        "asset": {
                            "src": this.id + "/images/question-default.png"
                        }
                    }]
                }, {
                    "id": "questions",
                    "type": "DataGroup",
                    "showHeader": true,
                    "title": "<span class='qz-questions'>Questions</span>",
                    "sepLineStyle": "qz-sepLineQuestions",
                    "description": "",
                    "visible": true,
                    "children": []
                }];
                this.data.children = data;
                this.infosView = this.cc({ type: "editionitems.DataObject", data: data[0] });
                this.infosViewQuizID = this.infosView.cc({ type: "editionitems.Text", data: data[0].children[0] });
                this.infosViewName = this.infosView.cc({ type: "editionitems.Text", data: data[0].children[1] });
                this.infosViewThema = this.infosView.cc({ type: "editionitems.ComboBox", data: data[0].children[2] });
                this.infosView.addChild(this.infosViewQuizID);
                this.infosView.addChild(this.infosViewName);
                this.infosView.addChild(this.infosViewThema);
                this.defaultConfigView = this.cc({ type: "editionitems.DataGroup", data: data[1] });
                this.defaultConfigView.defaultThemeImage = this.defaultConfigView.cc({ type: "editionitems.ImageItem", data: data[1].children[0], controller: this.controller });
                this.defaultConfigView.addChild(this.defaultConfigView.defaultThemeImage);

                this.questionsView = this.cc({ type: "editionitems.DataGroup", data: data[2] });
                this.addChild(this.infosView);
                this.addChild(this.defaultConfigView);
                this.addChild(this.questionsView);
                this.infosView.onchanged.dispatch({ target: this.infosView });
                this.defaultConfigView.onchanged.dispatch({ target: this.defaultConfigView });
                this.questionsView.onchanged.dispatch({ target: this.questionsView });
                this.onchanged.dispatch({ target: this });
            }
        }, {
            key: "addQuestion",
            value: function addQuestion(infos, style) {
                console.log(this.data);
                var noQuestion = this.questionsNum + 1;
                var data = {
                    "id": "Q" + noQuestion,
                    "title": "<span class='qz-question'>QUESTION " + noQuestion + " (Q" + noQuestion + ")</span>",
                    "type": "DataGroup",
                    "description": "",
                    "visible": true,
                    "sepLineStyle": "qz-sepLineQuestion",
                    "children": [{ "id": "quizStyleID", type: "Text", visible: false, value: style }]
                };

                var question = this.addItem({ parent: this.questionsView, type: "editionitems.DataGroup", data: data });

                question.no = noQuestion;
                var infoItem = this.addItem({ parent: question,
                    data: { "id": "data", type: "DataGroup", visible: true, "showHeader": false, "children": [] },
                    children: JSON.parse(JSON.stringify(this.quizStylesOptions.extraDatas[this.defaultExtraDataQ]))
                });

                if (infos.questionText) this.addText(question);
                if (infos.questionImage) this.addImage(question, this.id + "/images/Q" + question.no + ".png");
                if (infos.questionSound) this.addSound(question, this.id + "/sounds/Q" + question.no + ".mp3");
                var responses = this.addDataGroup(_defineProperty({
                    parent: question,
                    id: "responses",
                    sepLineStyle: "qz-sepLineResponse",
                    title: "<span class='qz-responses'>Réponses</span>"
                }, "sepLineStyle", "qz-sepLineResponses"));
                if (infos.responsesNum == "truefalse") {
                    var response = this.addDataGroup({
                        parent: responses,
                        id: "Q" + question.no + "_R1",
                        title: "<span class='qz-response'>Q" + question.no + "_R1</span>",
                        sepLineStyle: "qz-sepLineResponse",
                        hideBtnConfig: true
                    });
                    response.no = 1;
                    var _infoItem = this.addItem({ parent: response,
                        data: { "id": "data", type: "DataGroup", visible: true, "showHeader": false, "children": [] },
                        children: JSON.parse(JSON.stringify(this.quizStylesOptions.extraDatas[this.defaultExtraDataR]))
                    });
                    this.addBoolean(response);
                } else {
                    for (var i = 0; i < infos.responsesNum; i++) {
                        var _response = this.addDataGroup({
                            parent: responses,
                            id: "Q" + question.no + "_R" + (i + 1),
                            title: "<span class='qz-response'>Q" + question.no + "_R" + (i + 1) + "</span>",
                            sepLineStyle: "qz-sepLineResponse",
                            hideBtnConfig: true
                        });
                        _response.no = i + 1;
                        var _infoItem2 = this.addItem({ parent: _response,
                            data: { "id": "data", type: "DataGroup", visible: true, "showHeader": false, "children": [] },
                            children: JSON.parse(JSON.stringify(this.quizStylesOptions.extraDatas[this.defaultExtraDataR]))
                        });
                        if (infos.responseText) this.addText(_response);
                        if (infos.responseImage) this.addImage(_response, this.id + "/images/Q" + question.no + "_R" + _response.no + ".png");
                        if (infos.responseSound) this.addSound(_response, this.id + "/sounds/Q" + question.no + "_R" + _response.no + ".mp3");
                    }
                    ;
                }
                this.questionsView.onchanged.dispatch({ target: this.questionsView });
            }
        }, {
            key: "addDataObject",
            value: function addDataObject(parent, id) {
                var showHeader = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

                var data = {
                    "id": id,
                    "type": "DataObject",
                    "showHeader": showHeader,
                    "description": "",
                    "visible": true,
                    "children": []
                };
                parent.data.children.push(data);
                var item = parent.cc({ type: "editionitems.DataGroup", data: data });
                parent.view.append(item.view);
                return item;
            }
        }, {
            key: "addDataGroup",
            value: function addDataGroup(_ref3) {
                var parent = _ref3.parent;
                var id = _ref3.id;
                var _ref3$title = _ref3.title;
                var title = _ref3$title === undefined ? "" : _ref3$title;
                var _ref3$sepLineStyle = _ref3.sepLineStyle;
                var sepLineStyle = _ref3$sepLineStyle === undefined ? "groupSepLine" : _ref3$sepLineStyle;
                var _ref3$showHeader = _ref3.showHeader;
                var showHeader = _ref3$showHeader === undefined ? true : _ref3$showHeader;
                var _ref3$hideBtnConfig = _ref3.hideBtnConfig;
                var hideBtnConfig = _ref3$hideBtnConfig === undefined ? false : _ref3$hideBtnConfig;
                var children = _ref3.children;

                var data = {
                    "id": id,
                    "title": title,
                    "type": "DataGroup",
                    "showHeader": showHeader,
                    "description": "",
                    "sepLineStyle": sepLineStyle,
                    "hideBtnConfig": hideBtnConfig,
                    "visible": true,
                    "children": []
                };
                return this.addItem({ parent: parent, data: data, children: children });
            }
        }, {
            key: "addText",
            value: function addText(parent) {
                var data = {
                    "id": "text",
                    "type": "Text",
                    "editable": true,
                    "description": "",
                    "value": "",
                    "visible": true
                };
                return this.addItem({ parent: parent, data: data });
            }
        }, {
            key: "addBoolean",
            value: function addBoolean(parent) {
                var data = {
                    "id": "truefalse",
                    "title": "Vrai",
                    "type": "Boolean",
                    "editable": true,
                    "description": "",
                    "value": false,
                    "visible": true
                };
                return this.addItem({ parent: parent, data: data });
            }
        }, {
            key: "addImage",
            value: function addImage(parent, src) {
                var data = {
                    "id": "image",
                    "type": "Image",
                    "editable": true,
                    "description": "",
                    "asset": {
                        "preload": false,
                        "src": src
                    },
                    "visible": true
                };
                return this.addItem({ parent: parent, data: data, controller: this.controller });
            }
        }, {
            key: "addSound",
            value: function addSound(parent, src) {
                var data = {
                    "id": "sound",
                    "type": "Sound",
                    "editable": true,
                    "description": "",
                    "asset": {
                        "preload": false,
                        "src": src
                    },
                    "visible": true
                };
                return this.addItem({ parent: parent, data: data, controller: this.controller });
            }
        }, {
            key: "addItem",
            value: function addItem(_ref4) {
                var _this3 = this;

                var parent = _ref4.parent;
                var type = _ref4.type;
                var data = _ref4.data;
                var children = _ref4.children;
                var controller = _ref4.controller;

                if (parent.data.children.indexOf(data) === -1) parent.data.children.push(data);
                var typeItem = data.type == "Image" || data.type == "Sound" || data.type == "Number" || data.type == "Boolean" ? data.type + "Item" : data.type;
                var item = parent.cc({ type: "editionitems." + typeItem, data: data, controller: controller });
                parent.addChild(item);
                item.onchanged.add(function (evt) {
                    return _this3.controller.onChangeData(evt);
                });
                if (data.children) {
                    for (var i = 0; i < data.children.length; i++) {
                        var _typeItem = data.children[i].type == "Image" || data.children[i].type == "Sound" || data.type == "Number" || data.type == "Boolean" ? data.children[i].type + "Item" : data.children[i].type;
                        this.addItem({ parent: item, type: "editionitems." + _typeItem, data: data.children[i] });
                    }
                    ;
                }
                ;
                if (children) {
                    console.log(children);
                    for (var i = 0; i < children.length; i++) {
                        var _typeItem2 = children[i].type == "Image" || children[i].type == "Sound" || data.type == "Number" || data.type == "Boolean" ? children[i].type + "Item" : children[i].type;
                        this.addItem({ parent: item, type: "editionitems." + _typeItem2, data: children[i] });
                    }
                    ;
                }
                ;
                return item;
            }
        }, {
            key: "firstInit",
            value: function firstInit() {
                var _this4 = this;

                var needReload = false;
                if (this.children.length == 0) {
                    this.addInfos();
                    var name = this.data.title;
                    var theme = this.data.title;
                } else {}
                this.questionsView = this.findChildById("questions");
                this.infosView = this.findChildById("infos");

                this.themeField = this.infosView.findChildById("theme");
                this.themeField.lastValue = this.themeField.value;
                this.themeField.onchanged.add(function (evt) {
                    if (_this4.themeField.value != _this4.themeField.lastValue) {
                        _this4.changeTitle();
                    }
                });
                if (!this.nameField) {
                    this.nameField = this.infosView.findChildById("name");
                    this.nameField.lastValue = this.nameField.value;
                    this.nameField.onchanged.add(function (evt) {
                        if (_this4.nameField.value != _this4.nameField.lastValue) {
                            _this4.changeTitle();
                        }
                    });
                    this.nameField.value = name || this.nameField.value;
                    this.changeTitle();
                }
            }
        }, {
            key: "changeTitle",
            value: function changeTitle() {
                var themeValue = this.themeField.value == "none" ? "" : this.themeField.value;
                var title = "Quiz " + this.nameField.value + " <br/><small>" + themeValue + "</small>";
                this.setTitle(title);
                var editionPage = this.controller.mainController;
                editionPage.changeTitleTab(this.id, title);
            }
        }, {
            key: "_reloadAndRefreshTab",
            value: function _reloadAndRefreshTab() {
                var editionPage = this.controller.mainController;
                var gabaritView = editionPage.gabaritView;
                editionPage.refreshEditionView();
                editionPage.showTab(this.id);
            }
        }, {
            key: "configure",
            value: function configure() {
                var _this5 = this;

                var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var mess = _ref5.mess;

                this.firstInit();
                var editionPage = this.controller.mainController;
                var gabaritView = editionPage.gabaritView;
                console.log(gabaritView.value);
                var content = "\n        <form class=\"form-horizontal\">\n            <div id=\"mess\" class=\"alert alert-danger\" style=\"display:none\"></div>\n\n            <div class=\"form-group\">    \n            <label class=\"control-label col-sm-2\" for=\"deleteQuiz\"></label>\n            <div class=\"col-sm-10  text-right\">\n                <button id=\"deleteQuiz\" class=\"btn btn-danger\" type=\"button\">Supprimer ce quiz</button>\n            </div>\n           </div>\n             <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"quizStyle\">Style</label>\n                <div class=\"col-sm-10\">\n                    <select class=\"form-control\" id=\"quizStyle\"/>\n                </div>\n            </div>\n            <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"questionsNum\">Nombre de Questions</label>\n                <div class=\"col-sm-10\">\n                    <select class=\"form-control\" id=\"questionsNum\"/>\n                </div>\n            </div>\n           <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"responsesNum\">Nombre de Réponses</label>\n                <div class=\"col-sm-10\">\n                    <select class=\"form-control\" id=\"responsesNum\"/>\n                </div>\n            </div>\n        </form>\n            ";
                var popup = this.jx.editor.popup({ title: "Configuration du quiz", content: content, width: 600, buttons: { ok: { label: "Remplacer le quiz" }, append: { label: "Ajouter au quiz" } }, onclose: function onclose(evt) {
                        console.log(evt.action);
                        if (evt.action != "ok" && evt.action != "append") return;
                        _this5._changeQuiz({
                            append: evt.action == "append",
                            style: find("quizStyle").value,
                            questionsNum: find("questionsNum").value,
                            responsesNum: find("responsesNum").value
                        });
                    } });
                var find = function find(id) {
                    return $(popup).find("#" + id)[0];
                };
                $(popup).find("#deleteQuiz").on("click", function () {
                    popup.modal('hide');
                    _this5.deleteQuiz();
                });
                var defaultStyle = this.quizStylesOptions.stylesOptions[0];
                $(popup).find("#quizStyle").on("change", function (evt) {
                    console.log(evt.target.value);

                    _this5._fillComboBox({ formEl: $(popup).find("#responsesNum"), options: _this5.quizStylesOptions.responsesOptions[evt.target.value],
                        selected: _this5.quizStylesOptions.responsesOptions[evt.target.value][0]
                    });
                });

                if (mess) {
                    $(popup).find("#mess").html(mess);
                    $(popup).find("#mess").css("display", "inline");
                }
                ;

                var arrString = void 0,
                    availableTypesList = void 0,
                    optionsStyle = void 0;
                if (this.data.availableTypes) {
                    arrString = this.quizStylesOptions[this.data.availableTypes.trim()] || this.data.availableTypes;
                } else {
                    arrString = "*";
                }
                if (arrString == "*") {
                    optionsStyle = this.quizStylesOptions.stylesOptions;
                } else {
                    availableTypesList = arrString.split(",");
                    availableTypesList.forEach(function (item, index, array) {
                        return array[index] = item.trim();
                    });
                    optionsStyle = this.quizStylesOptions.stylesOptions.filter(function (element) {
                        return availableTypesList.indexOf(element.id) !== -1;
                    });
                }

                this._fillComboBox({
                    formEl: $(popup).find("#quizStyle"),
                    options: optionsStyle,
                    selected: this._infos.style || defaultStyle.id
                });
                this._fillComboBox({ formEl: $(popup).find("#questionsNum"), options: this.quizStylesOptions.questionsOptions,
                    selected: this.quizStylesOptions.questionsOptions
                });
                this._fillComboBox({ formEl: $(popup).find("#responsesNum"), options: this._infos.style ? this.quizStylesOptions.responsesOptions[this._infos.style] : this.quizStylesOptions.responsesOptions[defaultStyle.id],
                    selected: this._infos.responsesNum || this.quizStylesOptions.responsesOptions[defaultStyle.id][0].id
                });
            }
        }, {
            key: "_changeQuiz",
            value: function _changeQuiz(_ref6) {
                var _this6 = this;

                var name = _ref6.name;
                var theme = _ref6.theme;
                var style = _ref6.style;
                var questionsNum = _ref6.questionsNum;
                var responsesNum = _ref6.responsesNum;
                var _ref6$append = _ref6.append;
                var append = _ref6$append === undefined ? false : _ref6$append;

                var recreateQuiz = false;
                if (style != this._infos.style) {
                    this._infos.style = style;
                    recreateQuiz = true;
                }
                if (questionsNum != this._infos.questionsNum) {
                    this._infos.questionsNum = questionsNum;
                    recreateQuiz = true;
                }

                if (responsesNum != this._infos.responsesNum) {
                    this._infos.responsesNum = responsesNum;
                    recreateQuiz = true;
                }
                if (recreateQuiz) {
                    if (this._infos.questionsNum == undefined) {
                        this.configure({ mess: "Indiquez le nombre de questions" });
                    }
                    ;
                    this["quiz_" + this._infos.style]();
                    if (this.questionsView.children.length === 0) {
                        this._createQuiz({ style: style, append: append });
                    } else {
                        this.jx.editor.confirm({ title: "Changement de la configuration du Quiz", content: "<small>Attention ! \nCeci va supprimer les données existantes.\n Voulez-vous continuer ?</small>", onclose: function onclose(evt) {
                                if (evt.action == "ok") {
                                    _this6._createQuiz({ style: style, append: append });
                                }
                            } });
                    }
                }
                ;
            }
        }, {
            key: "_createQuiz",
            value: function _createQuiz(_ref7) {
                var style = _ref7.style;
                var _ref7$append = _ref7.append;
                var append = _ref7$append === undefined ? false : _ref7$append;

                if (!append) {
                    this.clearAll({ confirm: false });
                }
                ;
                for (var i = 0; i < this._infos.questionsNum; i++) {
                    this.addQuestion(this._infos, style);
                }
                this.questionsView.onchanged.dispatch({ target: this.questionsView });
                this.onchanged.dispatch({ target: this });
            }
        }, {
            key: "quiz_q1",
            value: function quiz_q1() {
                this._infos.questionText = true;
                this._infos.questionImage = true;
                this._infos.questionSound = false;
                this._infos.responseText = true;
                this._infos.responseImage = false;
                this._infos.responseSound = false;
            }
        }, {
            key: "quiz_q2",
            value: function quiz_q2() {
                this._infos.questionText = true;
                this._infos.questionImage = false;
                this._infos.questionSound = false;
                this._infos.responseText = false;
                this._infos.responseImage = true;
                this._infos.responseSound = false;
            }
        }, {
            key: "quiz_q9",
            value: function quiz_q9() {
                this._infos.questionText = true;
                this._infos.questionImage = false;
                this._infos.questionSound = false;
                this._infos.responseText = true;
                this._infos.responseImage = false;
                this._infos.responseSound = false;
            }
        }, {
            key: "quiz_q10",
            value: function quiz_q10() {
                this._infos.questionText = true;
                this._infos.questionImage = false;
                this._infos.questionSound = true;
                this._infos.responseText = true;
                this._infos.responseImage = false;
                this._infos.responseSound = true;
            }
        }, {
            key: "quiz_q11",
            value: function quiz_q11() {
                this._infos.questionText = true;
                this._infos.questionImage = false;
                this._infos.questionSound = true;
                this._infos.responseText = false;
                this._infos.responseImage = true;
                this._infos.responseSound = true;
            }
        }, {
            key: "_fillComboBox",
            value: function _fillComboBox(_ref8) {
                var formEl = _ref8.formEl;
                var options = _ref8.options;
                var selected = _ref8.selected;

                formEl.empty();
                for (var i = 0; i < options.length; i++) {
                    var opt = options[i];
                    var el = document.createElement("option");
                    el.textContent = opt.desc || opt.id;
                    el.value = opt.id;
                    $(el).attr("selected", selected ? opt.id == selected : opt.id == options[0].value);
                    $(el).attr("disabled", opt.enabled == undefined ? false : !opt.enabled);
                    formEl.append(el);
                }
            }
        }, {
            key: "deleteQuiz",
            value: function deleteQuiz() {
                var _this7 = this;

                this.jx.editor.confirm({ title: "Suppression du Quiz", content: "<small>Attention ! \nCeci va supprimer définitivement ce Quiz.\n Voulez-vous continuer ?</small>", onclose: function onclose(evt) {
                        if (evt.action == "ok") {
                            var editionPage = _this7.controller.mainController;
                            editionPage.deleteTab(_this7.id);
                        }
                        ;
                    } });
            }
        }, {
            key: "questionsNum",
            get: function get() {
                return this.questionsView.data.children.length;
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (this.btnConfig) this.btnConfig.lock = value;
            }
        }]);

        return QuizDataItem;
    }(_DataGroup3.default);

    exports.default = QuizDataItem;
});
//# sourceMappingURL=QuizDataItem.js.map