define(["exports", "jx/projecttypes/ApplicationHTML5Base", "jx/projecttypes/editorformattype2/Importer", "jx/projecttypes/editorformattype2/Exporter"], function (exports, _ApplicationHTML5Base2, _Importer, _Exporter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ApplicationHTML5Base3 = _interopRequireDefault(_ApplicationHTML5Base2);

    var _Importer2 = _interopRequireDefault(_Importer);

    var _Exporter2 = _interopRequireDefault(_Exporter);

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

    var KimiTest = function (_ApplicationHTML5Base) {
        _inherits(KimiTest, _ApplicationHTML5Base);

        function KimiTest(dataObject) {
            _classCallCheck(this, KimiTest);

            return _possibleConstructorReturn(this, (KimiTest.__proto__ || Object.getPrototypeOf(KimiTest)).call(this, dataObject));
        }

        _createClass(KimiTest, [{
            key: "_create",
            value: function _create() {
                console.log("ApplicationHTML5 create");
                _get(KimiTest.prototype.__proto__ || Object.getPrototypeOf(KimiTest.prototype), "_create", this).call(this);
                this.importer = new _Importer2.default(this.jx, this.info);
                this.exporter = new _Exporter2.default(this.jx, { projectInfo: this.info });
            }
        }, {
            key: "save",
            value: function save(onFinished) {
                var _this2 = this;

                _get(KimiTest.prototype.__proto__ || Object.getPrototypeOf(KimiTest.prototype), "save", this).call(this, function (evt) {
                    _this2._saveKimiTestConfig(onFinished);
                });
            }
        }, {
            key: "_saveKimiTestConfig",
            value: function _saveKimiTestConfig() {
                var gabarit = this.info.gabarit;
                console.clear();
                console.log("_saveKimiTestConfig", gabarit);
                for (var i = 0; i < gabarit.length; i++) {
                    if (gabarit[i].id == "QUIZ") {
                        var quizGroup = gabarit[i];
                    } else if (gabarit[i].id == "PROFILS") {
                        var profilsGroup = gabarit[i];
                    }
                }
                var json = { titre: {}, questions: [], profils: {}, conclusions: {} };
                var question;
                for (var iq = 1; iq <= 10; iq++) {
                    question = { id: iq, text: this._getGroupChildByID(quizGroup, "Q" + this.jx.tools.gd(iq, 2) + "_T").value, answers: [] };
                    for (var ir = 1; ir <= 3; ir++) {
                        question.answers.push({ id: ir, text: this._getGroupChildByID(quizGroup, "Q" + this.jx.tools.gd(iq, 2) + "_R" + this.jx.tools.gd(ir, 2) + "_T").value, good: ir == 1 });
                    }
                    ;
                    json.questions.push(question);
                }
                ;
                json.titre = {
                    text: this._getGroupChildByID(quizGroup, "Title").value,
                    style: { "fontName": "Harimau", "fontStyle": "normal", "fontSize": "30px", "color": "#000000" }, "offset": { "x": 0, "y": 0 }
                };
                for (var ip = 1; ip <= 3; ip++) {
                    json.profils[ip] = this._getGroupChildByID(profilsGroup, "PROFIL_0" + ip + "_T").value;
                    json.conclusions[ip] = this._getGroupChildByID(profilsGroup, "CONCLU_0" + ip).value;
                }
                ;

                this.jx.db.saveText(this.info.url + "/public/src/config.js", "var editorGameConfig=" + JSON.stringify(json, null, 4), function () {});
            }
        }, {
            key: "_getGroupChildByID",
            value: function _getGroupChildByID(group, childID) {
                for (var i = 0; i < group.children.length; i++) {
                    if (group.children[i].id == childID) {
                        return group.children[i];
                    }
                }
                ;
                return null;
            }
        }]);

        return KimiTest;
    }(_ApplicationHTML5Base3.default);

    exports.default = KimiTest;
});
//# sourceMappingURL=KimiTest.js.map