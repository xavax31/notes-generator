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

    var QuizManagerItem = function (_DataGroup) {
        _inherits(QuizManagerItem, _DataGroup);

        function QuizManagerItem(dataObject) {
            _classCallCheck(this, QuizManagerItem);

            var _this = _possibleConstructorReturn(this, (QuizManagerItem.__proto__ || Object.getPrototypeOf(QuizManagerItem)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.data.exportType = "DataGroup";

            _this.childrenContainer = _this.view.find("#children");
            var btnConfig = _this.cc({ type: "editionitems.ButtonItem", data: { id: "btnConfig", title: "Configurer", confirmBeforeLaunch: false, onclick: function onclick() {
                        return _this.configure();
                    } } });
            _this.addNewQuizBTN = _this.cc({ type: "editionitems.ButtonItem", data: { id: "addNewQuizBTN", title: "Ajouter un nouveau quiz", confirmBeforeLaunch: false, onclick: function onclick() {
                        return _this.addNewQuiz();
                    } } });
            _this.childrenContainer.prepend(_this.addNewQuizBTN.view);
            _this.data.children = _this.data.children || [];
            if (_this.data.children.length === 0) {
                _this.data.children = [{
                    type: "Separator"
                }, {
                    id: "defaultImage",
                    "type": "Image",
                    title: "Image de placement",
                    "description": "Est utilisée à la place de toute image manquante (questions ou réponse)",
                    "asset": {
                        src: "images/QUIZ_DEFAULT_IMAGE.png"
                    }
                }];
            }
            ;
            _this.children = [];
            return _this;
        }

        _createClass(QuizManagerItem, [{
            key: "showInfo",
            value: function showInfo() {}
        }, {
            key: "hideInfo",
            value: function hideInfo() {}
        }, {
            key: "addNewQuiz",
            value: function addNewQuiz() {
                var _this2 = this;

                var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var mess = _ref.mess;

                var editionPage = this.controller.mainController;
                var gabaritView = editionPage.gabaritView;
                console.log(gabaritView.value);
                var content = "\n        <div id=\"mess\" class=\"alert alert-danger\" style=\"display:none;margin-bottom:10px\"></div>\n        <div class=\"form-horizontal\">\n            <div class=\"form-group\">    \n                <label class=\"control-label col-sm-2\" for=\"quizName\">Nom du quiz</label>\n                <div class=\"col-sm-10\">\n                <input  id=\"quizName\" type=\"text\"  class=\"form-control\"  placeholder=\"Nouveau Quiz\" value=\"\"/>\n                </div>\n            </div>\n           <div class=\"form-group\">    \n                <div class=\"col-sm-12 text-right\">\n                    <button  id=\"create\" type=\"button\" class=\"btn btn-default\">Créer le Quiz</button>\n                    <button  id=\"cancel\" type=\"button\"  class=\"btn btn-default\">Fermer</button>\n                </div>\n                    \n            </div>\n         </div>\n            ";
                var find = function find(id) {
                    return $(popup).find("#" + id)[0];
                };
                var validate = function validate() {
                    var name = find("quizName").value;
                    if (name == "") {
                        $(popup).find("#mess").html("Veuillez svp saisir un nom pour votre quiz");
                        $(popup).find("#mess").css("display", "block");
                    } else {
                        popup.modal('hide');
                        _this2._addNewQuiz({
                            name: find("quizName").value
                        });
                    }
                };
                var popup = this.jx.editor.popup({ title: "Ajouter un nouveau quiz", content: content, width: 600 });
                if (mess) {
                    $(popup).find("#mess").html(mess);
                    $(popup).find("#mess").css("display", "inline");
                }
                ;
                $(popup).find("#create").on("click", function () {
                    return validate();
                });
                $(popup).find("#cancel").on("click", function () {
                    popup.modal('hide');
                });
                $(popup).find("#quizName").on('keypress', function (evt) {
                    var code = evt.keyCode || evt.which;
                    if (code == 13) {
                        validate();
                    }
                });
            }
        }, {
            key: "_addNewQuiz",
            value: function _addNewQuiz(_ref2) {
                var name = _ref2.name;

                var editionPage = this.controller.mainController;
                var gabaritView = editionPage.gabaritView;
                var id = "QuizData_" + Date.now();
                gabaritView.gabarit.push({
                    id: id,
                    title: name,
                    type: "QuizData",
                    availableTypes: this.data.availableTypes || "*",
                    children: []
                });
                editionPage.save(function () {
                    editionPage.refreshEditionView();
                    console.log(gabaritView);
                    $('.nav-tabs a[href="#' + id + '"]').tab('show');
                    gabaritView.findComp({ id: id }).configure();
                });
            }
        }, {
            key: "_getQuizDatas",
            value: function _getQuizDatas() {
                var editionPage = this.controller.mainController;
                var gabaritView = editionPage.gabaritView;
                var result = [];
                for (var i = 0; i < this.gabaritView.gabarit.length; i++) {
                    if (this.gabaritView.gabarit[i].id.search(/^QuizData_/) !== -1) {
                        result.push(this.gabaritView.gabarit[i]);
                    }
                }
                ;
                return result;
            }
        }, {
            key: "_fillComboBox",
            value: function _fillComboBox(_ref3) {
                var formEl = _ref3.formEl;
                var options = _ref3.options;

                for (var i = 0; i < options.length; i++) {
                    var opt = options[i];
                    var el = document.createElement("option");
                    el.textContent = opt.desc;
                    el.value = opt.id;
                    $(el).attr("selected", opt.id == options[0].value);
                    formEl.append(el);
                }
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (this.addNewQuizBTN) this.addNewQuizBTN.lock = value;
            }
        }]);

        return QuizManagerItem;
    }(_DataGroup3.default);

    exports.default = QuizManagerItem;
});
//# sourceMappingURL=QuizManagerItem.js.map