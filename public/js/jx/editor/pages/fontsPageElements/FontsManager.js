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

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P ? value : new P(function (resolve) {
                resolve(value);
            });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    var sentence = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 éèçàù$€&()[]{}°§*£%+=-_/:;.?,<>";

    var FontsManager = function (_Component) {
        _inherits(FontsManager, _Component);

        function FontsManager(dataObject) {
            _classCallCheck(this, FontsManager);

            var _this = _possibleConstructorReturn(this, (FontsManager.__proto__ || Object.getPrototypeOf(FontsManager)).call(this, Object.assign({}, dataObject)));

            _this.lastSelectedFont = null;
            _this.editor = _this.jx.editor;
            return _this;
        }

        _createClass(FontsManager, [{
            key: "showChoicePanel",
            value: function showChoicePanel() {
                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
                    var _this2 = this;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", new Promise(function (resolve) {
                                        return __awaiter(_this2, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                                            var _this3 = this;

                                            var popup, $content, $btnShowFull, $list;
                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            popup = void 0;
                                                            $content = $('<div/>');
                                                            $btnShowFull = $("<button class=\"btn btn-link pull-right\" title=\"Afficher l'aperçu des fontes\"><i class=\"fa fa-eye fa-3x\" aria-hidden=\"true\"></i></button>");

                                                            $btnShowFull.css({ cursor: "pointer" });
                                                            $btnShowFull.on("click", function () {
                                                                return _this3.jx.tools.openURL("fonts_dev.html#FontsPage", "FontsList");
                                                            });
                                                            _context.next = 7;
                                                            return this.getVisualFontsListChoice({ onclose: function onclose() {
                                                                    popup.modal('hide');
                                                                    resolve(true);
                                                                } });

                                                        case 7:
                                                            $list = _context.sent;

                                                            $content.append($btnShowFull);
                                                            $content.append($list);
                                                            popup = this.editor.popup({ title: "Choisir une fonte", width: '520px', content: $content, onclose: function onclose(evt) {
                                                                    console.log(evt);
                                                                    resolve(evt);
                                                                } });
                                                            console.log("popup", popup);

                                                        case 12:
                                                        case "end":
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, this);
                                        }));
                                    }));

                                case 1:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            }
        }, {
            key: "getFontsList",
            value: function getFontsList() {
                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
                    var text;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    if (this._fontsList) {
                                        _context3.next = 5;
                                        break;
                                    }

                                    _context3.next = 3;
                                    return this.jx.db.loadTextPromise("/resources/milan-presse/fonts/fonts.json");

                                case 3:
                                    text = _context3.sent;

                                    this._fontsList = JSON.parse(text).fontsList;

                                case 5:
                                    return _context3.abrupt("return", this._fontsList);

                                case 6:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));
            }
        }, {
            key: "getVisualFontsListChoice",
            value: function getVisualFontsListChoice() {
                var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref$showSentence = _ref.showSentence;
                var showSentence = _ref$showSentence === undefined ? false : _ref$showSentence;
                var onclose = _ref.onclose;

                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
                    var _this4 = this;

                    var fontsList, $listView, rowBgColor, items, sentenceDOM, i, element, _loop, _i;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.next = 2;
                                    return this.getFontsList();

                                case 2:
                                    fontsList = _context4.sent;
                                    $listView = $('<div/>');

                                    $listView.css({
                                        width: '100%',
                                        height: window.innerHeight - 200,
                                        overflow: 'auto'
                                    });
                                    window.onresize = function () {
                                        $listView.css({ height: window.innerHeight - 300 });
                                    };
                                    rowBgColor = -1;
                                    items = fontsList;

                                    items.sort(function (a, b) {
                                        var af = a.fontFamily.toUpperCase(),
                                            bf = b.fontFamily.toUpperCase();
                                        if (af < bf) {
                                            return -1;
                                        }
                                        if (af > bf) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                    if (showSentence) items.unshift({ fontFamily: "Arial", fileName: "" });
                                    sentenceDOM = "";

                                    if (showSentence) {
                                        for (i = 0; i < sentence.length; i++) {
                                            element = sentence[i];

                                            sentenceDOM += "<div class=\"letter\">" + element + " </div>";
                                        }
                                    }

                                    _loop = function _loop(_i) {
                                        var fontFamily = items[_i].fontFamily;
                                        var fileName = items[_i].fileName;
                                        var $item = $("\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"font-name\">\n\t\t\t\t\t" + fontFamily + "\n\t\t\t\t\t</div>\n\t\t\t\t\t" + (showSentence ? "<span class=\"sequence\">" + sentenceDOM + "</span>" : "") + "\n\t\t\t\t</div>\n\t\t\t");
                                        if (showSentence && _i === 0) {
                                            $item.css({
                                                padding: 5,
                                                margin: 2,
                                                width: "2000px"
                                            });
                                        } else {
                                            $item.css({
                                                textAlign: "center",
                                                cursor: "pointer",
                                                padding: 5,
                                                margin: 2,
                                                width: showSentence ? "2000px" : "450px",
                                                border: "1px solid grey",
                                                borderRadius: 10,
                                                "background-color": rowBgColor === 1 ? "white" : "#eeeeee"
                                            });
                                        }
                                        $item.find(".font-name").css({
                                            display: "inline-block",
                                            width: "420px",
                                            fontSize: "12pt",

                                            "background-color": rowBgColor === 1 ? "white" : "#eeeeee"
                                        });
                                        $item.find(".sequence").css({
                                            "font-family": fontFamily
                                        });
                                        $item.find(".letter").css({
                                            "font-size": "inherit",
                                            display: "inline-block",
                                            "text-align": "center",
                                            width: "15px",
                                            "border-right": "1px solid #aaaaaa"
                                        });
                                        $item.on("click", function () {
                                            _this4.lastSelectedFont = fontFamily;onclose({ fontFamily: fontFamily });
                                        });
                                        $listView.append($item);
                                        rowBgColor *= -1;
                                    };

                                    for (_i = 0; _i < items.length; _i++) {
                                        _loop(_i);
                                    }
                                    return _context4.abrupt("return", $listView);

                                case 15:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));
            }
        }]);

        return FontsManager;
    }(_Component3.default);

    exports.default = FontsManager;
});
//# sourceMappingURL=FontsManager.js.map