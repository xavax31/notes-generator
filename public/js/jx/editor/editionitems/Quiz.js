define(["exports", "jx/core/comps/VisualComponent", "jx/editor/editionitems/Common"], function (exports, _VisualComponent2, _Common) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

    var _Common2 = _interopRequireDefault(_Common);

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

    var Quiz = function (_VisualComponent) {
        _inherits(Quiz, _VisualComponent);

        function Quiz(dataObject) {
            _classCallCheck(this, Quiz);

            var _this = _possibleConstructorReturn(this, (Quiz.__proto__ || Object.getPrototypeOf(Quiz)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var g2d = function g2d(value) {
                return _this.jx.tools.intToString(value, 2);
            };

            var itemData = { shortcut: true, id: "" + _this.data.id, type: 'DataGroup',
                children: []
            };
            itemData.children.push({ id: "Configurer", type: 'ButtonItem', onclick: function onclick() {
                    return _this.configure();
                }, description: '' });

            var numQuestions = _this.data.numQuestions || 10;
            var numResponses = _this.data.numResponses || 3;
            var questionAudio = _this.data.questionAudio == undefined ? false : _this.data.questionAudio;
            var responseAudio = _this.data.responseAudio == undefined ? false : _this.data.responseAudio;
            var resultAudio = _this.data.resultAudio == undefined ? false : _this.data.resultAudio;
            for (var i = 1; i <= numQuestions; i++) {
                var nq = g2d(i);
                itemData.children.push({ id: "QUESTION " + nq, type: 'Separator' });
                itemData.children.push({ id: "Q" + nq + "_T", type: 'Text', description: 'Question' });
                if (questionAudio) {
                    itemData.children.push({ id: "Q" + nq, type: 'Sound', description: 'Question',
                        "asset": {
                            "src": "sounds/quiz/Q" + nq + ".mp3"
                        }
                    });
                }
                ;
                if (resultAudio) {
                    itemData.children.push({ id: "Q" + nq + "_YES", type: 'Sound', description: 'Resultat vrai',
                        "asset": {
                            "src": "sounds/quiz/Q" + nq + "_YES.mp3"
                        }
                    });
                    itemData.children.push({ id: "Q" + nq + "_NO", type: 'Sound', description: 'Resultat faux',
                        "asset": {
                            "src": "sounds/quiz/Q" + nq + "_NO.mp3"
                        }
                    });
                }
                ;
                itemData.children.push({ id: "Réponses de la question " + nq, type: 'Separator' });
                for (var j = 1; j <= numResponses; j++) {
                    var nr = g2d(j);
                    itemData.children.push({ id: "Q" + nq + "_R" + nr + "_T", type: 'Text', description: "Réponse " + nr });
                    if (responseAudio) {
                        itemData.children.push({ id: "Q" + nq + "_R" + nr, type: 'Sound', description: "Réponse " + nr,
                            "asset": {
                                "src": "sounds/quiz/Q" + nq + "_R" + nr + ".mp3"
                            }
                        });
                    }
                    ;
                }
                ;
            }
            ;
            _this.item = itemData;
            _this.view = _this.item;
            return _this;
        }

        _createClass(Quiz, [{
            key: "configure",
            value: function configure() {
                this.jx.editor.popup({
                    title: "Launch Script",
                    content: "<h1>Configuration</h1>",
                    buttons: {
                        ok: { label: "Lancer" },
                        close: { label: "Fermer" }
                    },
                    onclose: function onclose(evt) {
                        console.log(evt);
                        if (evt.action == "ok") {
                            console.log('go');
                        }
                    }
                });
            }
        }]);

        return Quiz;
    }(_VisualComponent3.default);

    exports.default = Quiz;
});
//# sourceMappingURL=Quiz.js.map