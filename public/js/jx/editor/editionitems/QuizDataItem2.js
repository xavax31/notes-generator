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
            _this._infos = {
                title: _this.data.title,
                thema: null,
                style: null,
                questionsNum: null,
                responsesNum: null
            };
            _this.questionsArr = [];
            _this._themaOptions = [{ id: "ART_CULTURE", desc: "ART ET CULTURE" }, { id: "HISTOIRE", desc: "HISTOIRE" }, { id: "GEOGRAPHIE", desc: "GEOGRAPHIE" }, { id: "NATURE", desc: "NATURE" }, { id: "SCIENCES_TECHNIQUE", desc: "SCIENCES ET TECHNIQUE" }, { id: "SOCIETE", desc: "SOCIETE" }, { id: "LANGUE", desc: "LANGUE" }, { id: "SPORT", desc: "SPORT" }];
            _this.btnConfig = _this.cc({ type: "editionitems.ButtonItem", data: { id: "btnConfig", title: "Configurer le quiz", confirmBeforeLaunch: false, onclick: function onclick() {
                        return _this.configure();
                    } } });
            _this.view.find("#sepID").append(_this.btnConfig.view);
            return _possibleConstructorReturn(_this);
            _this.view.append($("<div><div id='children'></div></div>"));
            _this.childrenContainer = _this.view.find("#children");
            _this.btnConfig = _this.cc({ type: "editionitems.ButtonItem", data: { id: "btnConfig", title: "Configurer le quiz", confirmBeforeLaunch: false, onclick: function onclick() {
                        return _this.configure();
                    } } });
            _this.childrenContainer.prepend(_this.btnConfig.view);
            _this._infos = {
                title: _this.data.title,
                thema: null,
                style: null,
                questionsNum: null,
                responsesNum: null
            };
            _this.children = [];
            _this.questionsArr = [];
            _this._themaOptions = [{ id: "ART_CULTURE", desc: "ART ET CULTURE" }, { id: "HISTOIRE", desc: "HISTOIRE" }, { id: "GEOGRAPHIE", desc: "GEOGRAPHIE" }, { id: "NATURE", desc: "NATURE" }, { id: "SCIENCES_TECHNIQUE", desc: "SCIENCES ET TECHNIQUE" }, { id: "SOCIETE", desc: "SOCIETE" }, { id: "LANGUE", desc: "LANGUE" }, { id: "SPORT", desc: "SPORT" }];
            if (_this.data.children.length == 0) _this.addInfos();
            return _this;
        }

        _createClass(QuizDataItem, [{
            key: "showInfo",
            value: function showInfo() {}
        }, {
            key: "hideInfo",
            value: function hideInfo() {}
        }, {
            key: "clearAll",
            value: function clearAll(_ref) {
                var _this2 = this;

                var _ref$confirm = _ref.confirm;
                var confirm = _ref$confirm === undefined ? true : _ref$confirm;

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
                        "id": "name",
                        "title": "Nom",
                        "type": "Text",
                        "editable": true,
                        "description": "",
                        "value": this._infos.name
                    }, {
                        "id": "thema",
                        "title": "Thème",
                        "type": "ComboBox",
                        "editable": true,
                        "description": "",
                        "value": this._infos.thema,
                        "options": this._themaOptions
                    }]
                }, {
                    "id": "questions",
                    "type": "DataGroup",
                    "description": "",
                    "visible": true,
                    "children": []
                }];
                this.data.children = data;
                this.infosView = this.cc({ type: "editionitems.DataObject", data: data[0] });
                this.infosViewName = this.infosView.cc({ type: "editionitems.Text", data: data[0].children[0] });
                this.infosViewThema = this.infosView.cc({ type: "editionitems.Text", data: data[0].children[1] });
                this.infosView.addChild(this.infosViewName);
                this.infosView.addChild(this.infosViewThema);
                this.questionsView = this.cc({ type: "editionitems.DataGroup", data: data[1] });
                this.addChild(this.infosView);
                this.addChild(this.questionsView);
                this.infosView.onchanged.dispatch({ target: this.infosView });
                this.questionsView.onchanged.dispatch({ target: this.questionsView });
                this.onchanged.dispatch({ target: this });
            }
        }, {
            key: "addInfos2",
            value: function addInfos2() {
                var data = [{
                    "id": "infos",
                    "type": "DataObject",
                    "description": "",
                    "visible": true,
                    "children": [{
                        "id": "thema",
                        "title": "Thème",
                        "type": "ComboBox",
                        "editable": true,
                        "description": "",
                        "value": this._infos.thema,
                        "options": this._themaOptions
                    }]
                }, {
                    "id": "questions",
                    "type": "DataGroup",
                    "description": "",
                    "visible": true,
                    "children": []
                }];
                this.data.children = data;
            }
        }, {
            key: "addQuestion",
            value: function addQuestion(infos) {
                var _this3 = this;

                console.log(this.data);
                var noQuestion = this.questionsNum + 1;
                var data = {
                    "id": "Q" + noQuestion,
                    "title": "<span class='qz-question'>Q" + noQuestion + "</span>",
                    "type": "DataGroup",
                    "description": "QUESTION " + noQuestion,
                    "visible": true,
                    "children": []
                };
                this.questionsView.data.children.push(data);
                var question = this.questionsView.cc({ type: "editionitems.DataGroup", data: data });
                question.onchanged.add(function () {
                    _this3.questionsView.onchanged.dispatch({ target: _this3.questionsView });
                });
                question.no = noQuestion;
                this.questionsView.addChild(question);

                this.questionsArr.push(question);
                if (infos.questionText) this.addText(question);
                if (infos.questionImage) this.addImage(question, this.id + "/images/Q" + question.no + ".png");
                if (infos.questionSound) this.addSound(question, this.id + "/sounds/Q" + question.no + ".mp3");
                var responses = this.addDataGroup(question, "responses", false);
                for (var i = 0; i < infos.responsesNum; i++) {
                    var response = this.addDataGroup(responses, "Q" + question.no + "_R" + (i + 1));
                    response.no = i + 1;
                    if (infos.responseText) this.addText(response);
                    if (infos.responseImage) this.addImage(response, this.id + "/images/Q" + question.no + "_R" + response.no + ".png");
                    if (infos.responseSound) this.addSound(response, this.id + "/sounds/Q" + question.no + "_R" + response.no + ".mp3");
                }
                ;
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
            value: function addDataGroup(parent, id) {
                var showHeader = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

                var data = {
                    "id": id,
                    "type": "DataGroup",
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
            key: "addText",
            value: function addText(question) {
                var _this4 = this;

                var data = {
                    "id": "text",
                    "type": "Text",
                    "editable": true,
                    "description": "",
                    "value": "",
                    "visible": true
                };
                var text = this.cc({ type: "editionitems.Text", data: data });
                text.onchanged.add(function () {
                    _this4.questionsContainer.onchanged.dispatch({ target: _this4.questionsContainer });
                });
                question.data.children.push(data);
                question.view.append(text.view);
            }
        }, {
            key: "addImage",
            value: function addImage(question, src) {
                var _this5 = this;

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
                var text = this.cc({ type: "editionitems.ImageItem", controller: this.controller, data: data });
                text.onchanged.add(function () {
                    _this5.questionsContainer.onchanged.dispatch({ target: _this5.questionsContainer });
                });
                question.data.children.push(data);
                question.view.append(text.view);
            }
        }, {
            key: "addSound",
            value: function addSound(question, src) {
                var _this6 = this;

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
                var text = this.cc({ type: "editionitems.SoundItem", controller: this.controller, data: data });
                text.onchanged.add(function () {
                    _this6.questionsContainer.onchanged.dispatch({ target: _this6.questionsContainer });
                });
                question.data.children.push(data);
                question.view.append(text.view);
            }
        }, {
            key: "addItem",
            value: function addItem() {
                var _this7 = this;

                console.log(this.data);
                this.data.children = this.data.children || [];
                var noQuestion = this.questionsNum;
                var data = {
                    "id": "q" + noQuestion,
                    "title": "Question" + noQuestion,
                    "type": "editionitems.Text",
                    "editable": true,
                    "description": "description.",
                    "value": "",
                    "visible": true
                };
                this.data.children.push(data);
                var text = this.cc({ type: data.type, data: data });
                text.onchanged.add(function () {
                    _this7.questionsContainer.onchanged.dispatch({ target: _this7.questionsContainer });
                });
                this.childrenContainer.append(text.view);
                this.onchanged.dispatch({ target: this });
            }
        }, {
            key: "firstInit",
            value: function firstInit() {
                var _this8 = this;

                if (this.children.length == 0) this.addInfos();
                if (!this.nameField) {
                    this.questionsView = this.findChildById("questions");
                    this.infosView = this.findChildById("infos");
                    console.log(this.infosView);
                    this.nameField = this.infosView.findChildById("name");
                    this.nameField.onchanged.add(function (evt) {
                        if (_this8.nameField.value != _this8.data.title) {
                            _this8.setTitle(_this8.nameField.value);
                            _this8.infosView.onchanged.dispatch({ target: _this8.infosView });
                            var editionPage = _this8.controller.mainController;
                            var gabaritView = editionPage.gabaritView;
                            editionPage.refreshEditionView();
                            editionPage.showTab(_this8.id);
                        }
                    });
                }
            }
        }, {
            key: "configure",
            value: function configure() {
                var _this9 = this;

                var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var mess = _ref2.mess;

                console.log("configure", this.children);
                console.log("configure", this.questionsArr);
                console.log("configure this.questionsView", this.questionsView);
                this.firstInit();
                console.log("this.infosView", this.infosView, this.nameField);

                var editionPage = this.controller.mainController;
                var gabaritView = editionPage.gabaritView;
                console.log(gabaritView.value);
                var content = "\n        <form class=\"form-horizontal\">\n            <div id=\"mess\" class=\"alert alert-danger\" style=\"display:none\"></div>\n            <div class=\"form-group\">    \n            <label class=\"control-label col-sm-2\" for=\"clearAll\"></label>\n            <div class=\"col-sm-10  text-right\">\n                <button id=\"clearAll\" class=\"btn btn-danger\" type=\"button\">Vider ce quiz</button>\n            </div>\n           </div>\n\n            <div class=\"form-group\">    \n            <label class=\"control-label col-sm-2\" for=\"deleteQuiz\"></label>\n            <div class=\"col-sm-10  text-right\">\n                <button id=\"deleteQuiz\" class=\"btn btn-danger\" type=\"button\">Supprimer ce quiz</button>\n            </div>\n           </div>\n           <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"quizName\">Nom du quiz</label>\n                <div class=\"col-sm-10\">\n                <input  id=\"quizName\" type=\"text\"  class=\"form-control\"  placeholder=\"Nom du quiz\" value=\"" + (this.data.title || "") + "\"/>\n                </div>\n            </div>\n            <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"quizThema\">Thème</label>\n                <div class=\"col-sm-10\">\n                    <select class=\"form-control\" id=\"quizThema\"/>\n                </div>\n            </div>\n            <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"quizStyle\">Style</label>\n                <div class=\"col-sm-10\">\n                    <select class=\"form-control\" id=\"quizStyle\"/>\n                </div>\n            </div>\n            <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"questionsNum\">Nombre de Questions</label>\n                <div class=\"col-sm-10\">\n                    <select class=\"form-control\" id=\"questionsNum\"/>\n                </div>\n            </div>\n           <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"responsesNum\">Nombre de Réponses</label>\n                <div class=\"col-sm-10\">\n                    <select class=\"form-control\" id=\"responsesNum\"/>\n                </div>\n            </div>\n        </form>\n            ";
                var popup = this.jx.editor.popup({ title: "New Quiz", content: content, width: 600, buttons: { ok: {}, no: {} }, onclose: function onclose(evt) {
                        console.log(evt);
                        if (evt.action != "ok") return;
                        console.log($(popup).find("#quizName")[0].value);
                        console.log($(popup).find("#quizThema")[0].value);
                        console.log($(popup).find("#quizStyle")[0].value);

                        var find = function find(id) {
                            return $(popup).find("#" + id)[0];
                        };
                        _this9._changeQuiz({
                            name: find("quizName").value,
                            thema: find("quizThema").value,
                            style: find("quizStyle").value,
                            questionsNum: find("questionsNum").value,
                            responsesNum: find("responsesNum").value
                        });
                    } });
                $(popup).find("#deleteQuiz").on("click", function () {
                    popup.modal('hide');
                    _this9.deleteQuiz();
                });
                $(popup).find("#clearAll").on("click", function () {
                    popup.modal('hide');
                    _this9.clearAll({ comfirm: true });
                });
                if (mess) {
                    $(popup).find("#mess").html(mess);
                    $(popup).find("#mess").css("display", "inline");
                }
                ;
                this._fillComboBox({ formEl: $(popup).find("#quizStyle"), options: [{ id: "q1", desc: "Q1: Question image + texte, Réponses texte" }, { id: "q2", desc: "Q2: Question texte, Réponses texte", enabled: false }],
                    selected: this._infos.style
                });
                this._fillComboBox({ formEl: $(popup).find("#questionsNum"), options: [{ id: 3 }, { id: 5 }, { id: 10 }],
                    selected: this._infos.questionsNum
                });
                this._fillComboBox({ formEl: $(popup).find("#responsesNum"), options: [{ id: "truefalse", desc: "Pictos Oui Non" }, { id: 2 }, { id: 3 }, { id: 4 }],
                    selected: this._infos.responsesNum
                });
                this._fillComboBox({ formEl: $(popup).find("#quizThema"), options: [{ id: "ART_CULTURE", desc: "ART ET CULTURE" }, { id: "HISTOIRE", desc: "HISTOIRE" }, { id: "GEOGRAPHIE", desc: "GEOGRAPHIE" }, { id: "NATURE", desc: "NATURE" }, { id: "SCIENCES_TECHNIQUE", desc: "SCIENCES ET TECHNIQUE" }, { id: "SOCIETE", desc: "SOCIETE" }, { id: "LANGUE", desc: "LANGUE" }, { id: "SPORT", desc: "SPORT" }],
                    selected: this._infos.thema
                });
            }
        }, {
            key: "_changeQuiz",
            value: function _changeQuiz(_ref3) {
                var _this10 = this;

                var name = _ref3.name;
                var thema = _ref3.thema;
                var style = _ref3.style;
                var questionsNum = _ref3.questionsNum;
                var responsesNum = _ref3.responsesNum;

                console.log("infoquiz", this._infos);
                console.log("configure_changeQ", this.questionsArr);
                console.log("infoquiz2", name, thema, style, questionsNum, responsesNum);
                var recreateQuiz = false;
                if (style != this._infos.style) {
                    this._infos.style = style;
                    recreateQuiz = true;
                }
                if (questionsNum != this._infos.questionsNum) {
                    this._infos.questionsNum = questionsNum;
                    recreateQuiz = true;
                }
                if (thema != this._infos.thema) {
                    this._infos.thema = thema;
                }
                if (style != this._infos.style) {
                    this._infos.style = style;
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
                    if (this._infos.style == "q1") {
                        this._infos.questionText = true;
                        this._infos.questionImage = true;
                        this._infos.questionSound = false;
                        this._infos.responseText = true;
                        this._infos.responseImage = false;
                        this._infos.responseSound = false;
                    } else {
                        this._infos.questionText = true;
                        this._infos.questionImage = true;
                        this._infos.questionSound = false;
                        this._infos.responseText = true;
                        this._infos.responseImage = false;
                        this._infos.responseSound = false;
                    }
                    this.jx.editor.confirm({ title: "Création du Quiz", content: "Attention ! \nCeci va supprimer les données existantes.\n Voulez-vous continuer ?", onclose: function onclose(evt) {
                            if (evt.action == "ok") {
                                _this10.clearAll({ confirm: false });

                                for (var i = 0; i < _this10._infos.questionsNum; i++) {
                                    _this10.addQuestion(_this10._infos);
                                }
                                _this10.questionsView.onchanged.dispatch({ target: _this10.questionsView });
                                _this10.onchanged.dispatch({ target: _this10 });
                            }
                            ;

                            console.log("configure2", _this10.questionsArr);
                        } });
                }
                ;
            }
        }, {
            key: "_fillComboBox",
            value: function _fillComboBox(_ref4) {
                var formEl = _ref4.formEl;
                var options = _ref4.options;
                var selected = _ref4.selected;

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
                var _this11 = this;

                this.jx.editor.confirm({ title: "Suppression du Quiz", content: "Attention ! \nCeci va supprimer définitivement ce Quiz.\n Voulez-vous continuer ?", onclose: function onclose(evt) {
                        if (evt.action == "ok") {
                            var editionPage = _this11.controller.mainController;
                            editionPage.deleteTab(_this11.id);
                        }
                        ;
                    } });
            }
        }, {
            key: "questionsNum",
            get: function get() {
                return this.questionsArr.length;
            }
        }, {
            key: "questionsContainer",
            get: function get() {
                if (this._questionContainer) return this._questionContainer;
                for (var i = 0; i < this.children.length; i++) {
                    if (this.children[i].id == "questions") {
                        this._questionContainer = this.children[i];
                        return this._questionContainer;
                    }
                }
                return null;
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
//# sourceMappingURL=QuizDataItem2.js.map