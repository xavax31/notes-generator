define(["exports", "jx/editor/editionitems/GabaritObject"], function (exports, _GabaritObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _GabaritObject3 = _interopRequireDefault(_GabaritObject2);

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

    var QuizManagerItemold = function (_GabaritObject) {
        _inherits(QuizManagerItemold, _GabaritObject);

        function QuizManagerItemold(dataObject) {
            _classCallCheck(this, QuizManagerItemold);

            dataObject.gabarit = QuizManagerItem.gabaritTemplate;
            dataObject.data.preview = true;

            var _this = _possibleConstructorReturn(this, (QuizManagerItemold.__proto__ || Object.getPrototypeOf(QuizManagerItemold)).call(this, dataObject));

            console.log("quizmanager", _this);
            _this.gabarit = [{ id: "Configurer", type: 'editionitems.ButtonItem', onclick: function onclick() {
                    return _this.configure();
                }, description: '', confirmBeforeLaunch: false }];
            _this.factory.addItems(_this.gabarit, _this.dataObject.tabs ? undefined : _this.view);
            return _this;
        }

        _createClass(QuizManagerItemold, [{
            key: "configure",
            value: function configure() {
                var _this2 = this;

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
                            _this2.gabarit.push({
                                "type": "editionitems.Text",
                                "id": "resourceID",
                                "value": "COMMON_LIB",
                                "editable": true,
                                "visible": true
                            });
                            _this2.refreshLocalView();
                        }
                    }
                });
            }
        }], [{
            key: "gabaritTemplate",
            get: function get() {
                return [];
            }
        }]);

        return QuizManagerItemold;
    }(_GabaritObject3.default);

    exports.default = QuizManagerItemold;
});
//# sourceMappingURL=QuizManagerItemold.js.map