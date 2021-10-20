define(["exports", "jx/core/comps/VisualComponent", "./fontsPageElements/FontsManager", "./fontsPageElements/texts"], function (exports, _VisualComponent2, _FontsManager, _texts) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

    var _FontsManager2 = _interopRequireDefault(_FontsManager);

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

    var FontsPage = function (_VisualComponent) {
        _inherits(FontsPage, _VisualComponent);

        function FontsPage(dataObject) {
            _classCallCheck(this, FontsPage);

            var _this = _possibleConstructorReturn(this, (FontsPage.__proto__ || Object.getPrototypeOf(FontsPage)).call(this, Object.assign({}, dataObject)));

            _this.adminMode = false;
            _this.data = {
                image1: "assets/image1.jpg",
                font1: "font1"
            };
            _this.project = {
                info: {
                    url: "/_temp",
                    assetsDir: "fonts"
                }
            };
            _this.mainController = _this;
            _this.editor = _this.jx.editor;
            _this.adminMode = _this.editor.userIsGroup("dev", "admin", "manager");
            _this.fontsManager = _this.cc({ type: _FontsManager2.default });
            _this.view = $("body");
            document.title = 'Gestionnnaire de fontes';
            _this.view.css("overflow", "hidden");
            $("body").css({ overflow: "auto" });
            if (_this.adminMode) {
                _this.view.append("<div>\n\t\t\t<h1 style=\"text-align:center\">Gestion des fontes</h1>\n\t\t\t<h2>Ajouter une fonte</h2>\n\t\t\t</div>".replace(/\n/g, "<br/>"));
                _this.addZipFile({
                    id: "font1",
                    title: "Déposez une fonte ici (formats acceptés: ttf, otf)",
                    onfiledropped: function onfiledropped(_ref) {
                        var filePath = _ref.filePath;
                        var parentDirPath = _ref.parentDirPath;
                        var parentDirName = _ref.parentDirName;

                        console.log("Result of onfiledropped", filePath, parentDirPath, parentDirName);

                        _this.jx.editor.fontConvert({ fontPath: filePath }, function (result) {
                            console.log("Result of fontConvert", result);
                            if (result.success) {
                                _this.jx.editor.moveDir({
                                    sourcePath: result.data.parentDirPath,
                                    destPath: "/resources/milan-presse/fonts/" + result.data.parentDirName
                                }, function (result) {
                                    console.log("Result of moveDir", result);
                                    _this.refreshFontsList();
                                });
                            } else {
                                alert((0, _texts.badFontError)({ filePath: filePath }));
                            }
                        });
                    }
                });
                _this.view.append(_texts.MORE_INFO_TEXT);
                _this.view.find(".infosButton").css({
                    color: "grey",
                    cursor: "pointer",
                    fontFamily: 10,
                    padding: 2,
                    margin: 5,
                    marginLeft: "10px",
                    width: "80px",
                    textAlign: "center"
                });
                _this.view.find("#infosBox").css({
                    padding: 2,
                    margin: 5
                });
            }
            _this.view.append('<h2>Fontes installées</h2>');
            _this.view.height(window.innerHeight);
            window.onresize = function () {
                return _this.view.height(window.innerHeight);
            };
            _this.view.css({ flex: 1 });
            _this.fontsListView = $('<div></div>');
            _this.fontsListView.css({
                width: "100%",
                overflow: "auto",
                margin: 10
            });
            $("body").css({
                padding: 10
            });
            if (_this.adminMode) {
                var $buttonDelete = $("<button class=\"btn btn-primary pull-right\">Supprimer la sélection</button>");
                $buttonDelete.on("click", function () {
                    return _this.onButtonDeleteClicked();
                });
                _this.view.append($buttonDelete);
            }
            _this.defaultFontSize = 12;
            var $input = $("<div><label for=\"fontSize\">Font size</label>\n\t\t<input id=\"fontSize\" type=\"number\" value=\"" + _this.defaultFontSize + "\" min=\"5\"></div>");

            var $inputNumber = $input.find("#fontSize");
            $inputNumber.on("change", function () {
                _this.defaultFontSize = $inputNumber.val();
                _this.changeFontSize({ fontSize: _this.defaultFontSize });
            });
            _this.view.append(_this.fontsListView);
            _this.showFontsList();
            return _this;
        }

        _createClass(FontsPage, [{
            key: "changeFontSize",
            value: function changeFontSize(_ref2) {
                var fontSize = _ref2.fontSize;

                this.fontsListView.find(".sequence").css({ "font-size": fontSize + "pt" });
            }
        }, {
            key: "refreshFontsList",
            value: function refreshFontsList() {
                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                    var listDirResult, listDir;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return this.listFontDirs();

                                case 2:
                                    listDirResult = _context.sent;
                                    listDir = listDirResult.items;

                                    listDir = listDir.filter(function (value, index, array) {
                                        return value !== ".DS_Store" && value !== "fonts.css" && value !== "fonts.json";
                                    });
                                    console.log(listDir);
                                    _context.next = 8;
                                    return this.saveFontsGlobalesFiles({ fontDirsList: listDir });

                                case 8:
                                    console.log("FINISH FONT IMPORT");
                                    _context.next = 11;
                                    return this.showFontsList();

                                case 11:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            }
        }, {
            key: "listFontDirs",
            value: function listFontDirs() {
                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
                    var _this2 = this;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    return _context2.abrupt("return", new Promise(function (resolve) {
                                        _this2.editor.listDir("/resources/milan-presse/fonts", {}, function (result) {
                                            resolve(result);
                                        });
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
            key: "saveFontsGlobalesFiles",
            value: function saveFontsGlobalesFiles(_ref3) {
                var fontDirsList = _ref3.fontDirsList;

                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
                    var _this3 = this;

                    var fontsList, fontsJSON, css, i, item, text, json;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    fontsList = [];
                                    fontsJSON = { fontsList: fontsList };
                                    css = "";
                                    i = 0;

                                case 4:
                                    if (!(i < fontDirsList.length)) {
                                        _context3.next = 16;
                                        break;
                                    }

                                    item = fontDirsList[i];
                                    _context3.next = 8;
                                    return this.jx.db.loadTextPromise("/resources/milan-presse/fonts/" + item + "/font.json");

                                case 8:
                                    text = _context3.sent;
                                    json = JSON.parse(text);

                                    fontsList.push(Object.assign(Object.assign({}, json), { fileName: item }));
                                    console.log(json);
                                    css += "@import url(\"./" + item + "/font.css\");\n";

                                case 13:
                                    i++;
                                    _context3.next = 4;
                                    break;

                                case 16:
                                    _context3.next = 18;
                                    return new Promise(function (resolve) {
                                        return _this3.jx.db.saveJSON("/resources/milan-presse/fonts/fonts.json", fontsJSON, function () {
                                            return resolve(true);
                                        });
                                    });

                                case 18:
                                    _context3.next = 20;
                                    return new Promise(function (resolve) {
                                        return _this3.jx.db.saveText("/resources/milan-presse/fonts/fonts.css", css, function () {
                                            return resolve(true);
                                        });
                                    });

                                case 20:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, this);
                }));
            }
        }, {
            key: "showFontsList",
            value: function showFontsList() {
                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee4() {
                    var text, fontsList, rowBgColor, items, sentence, sentenceDOM, i, element, _i, fontFamily, fileName, $inputCell, $item;

                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.next = 2;
                                    return this.jx.db.loadTextPromise("/resources/milan-presse/fonts/fonts.json");

                                case 2:
                                    text = _context4.sent;

                                    if (!text.error) {
                                        _context4.next = 5;
                                        break;
                                    }

                                    return _context4.abrupt("return");

                                case 5:
                                    fontsList = JSON.parse(text).fontsList;
                                    rowBgColor = -1;

                                    this.fontsListView.empty();
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
                                    items.unshift({ fontFamily: "Arial" });
                                    sentence = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 éèçàù$€&()[]{}°§*£%+=-_/:;.?,<>";
                                    sentenceDOM = "";

                                    for (i = 0; i < sentence.length; i++) {
                                        element = sentence[i];

                                        sentenceDOM += "<div class=\"letter\">" + element + " </div>";
                                    }
                                    for (_i = 0; _i < items.length; _i++) {
                                        fontFamily = items[_i].fontFamily;
                                        fileName = items[_i].fileName;
                                        $inputCell = $("<input type=\"checkbox\" class=\"delete\" data-fontName=\"" + fontFamily + "\"  data-fileName=\"" + fileName + "\" />");
                                        $item = $("\n\t\t\t\t<div>\n\t\t\t\t\t<div class=\"delete-box\"/>\n\t\t\t\t\t<div class=\"font-name\">\n\t\t\t\t\t" + (_i === 0 ? "" : (this.adminMode ? $inputCell[0].outerHTML + " " : "") + fontFamily) + "\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class=\"sequence\">" + sentenceDOM + "</span>\n\t\t\t\t</div>\n\t\t\t");

                                        if (_i === 0) {
                                            $item.css({
                                                padding: 5,
                                                margin: 2,
                                                width: "2000px"
                                            });
                                        } else {
                                            $item.css({
                                                padding: 5,
                                                margin: 2,
                                                width: "2000px",
                                                border: "1px solid grey",
                                                borderRadius: 10,
                                                "background-color": rowBgColor === 1 ? "white" : "#eeeeee"
                                            });
                                        }
                                        $item.find(".font-name").css({
                                            display: "inline-block",
                                            width: "300px",
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
                                        this.fontsListView.append($item);
                                        rowBgColor *= -1;
                                    }
                                    this.changeFontSize({ fontSize: this.defaultFontSize });

                                case 16:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, this);
                }));
            }
        }, {
            key: "onButtonDeleteClicked",
            value: function onButtonDeleteClicked() {
                var toDelete = this.fontsListView.find(".delete");
                var toDeleteArr = [];
                var message = _texts.CONFIRM_DELETE_FONTS;
                for (var i = 0; i < toDelete.length; i++) {
                    var element = $(toDelete[i]);
                    if (element.is(":checked")) {
                        toDeleteArr.push({
                            fontName: element.data("fontname"),
                            fileName: element.data("filename")
                        });
                        console.log({
                            fontName: element.data("fontname"),
                            fileName: element.data("filename")
                        });
                        message += " - " + element.data("fontname") + "\n";
                    }
                }
                if (toDeleteArr.length > 0) {
                    if (confirm(message)) {
                        console.log("confirmation of delete");
                        this.deleteFonts({ fontsList: toDeleteArr });
                    }
                }
            }
        }, {
            key: "deleteFonts",
            value: function deleteFonts(_ref4) {
                var fontsList = _ref4.fontsList;

                return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee5() {
                    var _this4 = this;

                    var _loop, i;

                    return regeneratorRuntime.wrap(function _callee5$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    _loop = regeneratorRuntime.mark(function _loop(i) {
                                        var item;
                                        return regeneratorRuntime.wrap(function _loop$(_context5) {
                                            while (1) {
                                                switch (_context5.prev = _context5.next) {
                                                    case 0:
                                                        item = fontsList[i];
                                                        _context5.next = 3;
                                                        return new Promise(function (resolve) {
                                                            return _this4.editor.deleteFile("/resources/milan-presse/fonts/" + item.fileName, function () {
                                                                return resolve(true);
                                                            });
                                                        });

                                                    case 3:
                                                    case "end":
                                                        return _context5.stop();
                                                }
                                            }
                                        }, _loop, _this4);
                                    });
                                    i = 0;

                                case 2:
                                    if (!(i < fontsList.length)) {
                                        _context6.next = 7;
                                        break;
                                    }

                                    return _context6.delegateYield(_loop(i), "t0", 4);

                                case 4:
                                    i++;
                                    _context6.next = 2;
                                    break;

                                case 7:
                                    this.refreshFontsList();

                                case 8:
                                case "end":
                                    return _context6.stop();
                            }
                        }
                    }, _callee5, this);
                }));
            }
        }, {
            key: "convertFont",
            value: function convertFont(_ref5) {
                var fontPath = _ref5.fontPath;
                var callback = arguments.length <= 1 || arguments[1] === undefined ? function (result) {} : arguments[1];

                this.editor.fontConvert({ fontPath: fontPath }, function (result) {
                    console.log(result);
                });
            }
        }, {
            key: "analyseFont",
            value: function analyseFont() {
                var _this5 = this;

                var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref6$zipPath = _ref6.zipPath;
                var zipPath = _ref6$zipPath === undefined ? null : _ref6$zipPath;

                var fontsDir = "/resources/milan-presse/fonts";
                var tempDir = "/_temp/fonts";
                zipPath = tempDir + "/font1.zip";
                var dest = tempDir + "/newfont";
                this.editor.unzip({ path: zipPath, dest: dest, deleteZipFile: false }, function () {
                    _this5.editor.listDir(dest, {}, function (result) {
                        console.log(result);
                        var items = result.items;
                        if (items.indexOf("onlinefontconverter.com") !== -1) {
                            _this5.jx.db.loadText(dest + "/" + "onlinefontconverter.com/converted-files/font.css", function (result) {
                                console.log(result);
                                var matches = result.match(/font-family:*\s'(.*)';/);
                                var fontName = matches[1];
                                console.log(fontName);
                                _this5.editor.cloneDir({
                                    sourcePath: dest + "/" + "onlinefontconverter.com/converted-files",
                                    destPath: fontsDir + "/" + fontName
                                }, function () {
                                    _this5.refreshFontsList();
                                    alert("la fonte " + fontName + " a été ajoutée");
                                });
                            });
                        }
                    });
                });
            }
        }, {
            key: "addText",
            value: function addText(data) {
                var _this6 = this;

                var textField = this.cc({
                    type: "editionitems.Text",
                    data: Object.assign({ type: "Text" }, data)
                });
                this.view.append(textField.view);
                textField.onchanged.add(function (evt) {
                    _this6.data[data.id] = evt.target.value;
                    console.log(_this6.data);
                });
                return textField;
            }
        }, {
            key: "addImage",
            value: function addImage(data) {
                var item = this.cc({
                    id: data.id,
                    type: "editionitems.ImageItem",
                    controller: this,
                    data: Object.assign({ type: "Image", description: "", asset: {
                            src: this.data[data.id]
                        } }, data)
                });
                this.view.append(item.view);
                return item;
            }
        }, {
            key: "addZipFile",
            value: function addZipFile(data) {
                var item = this.cc({
                    id: data.id,
                    type: "editionitems.FontItem",
                    controller: this,
                    onfiledropped: data.onfiledropped,
                    data: Object.assign({ type: "FontPack", deleteZipFile: false, description: "", asset: {
                            src: this.data[data.id]
                        } }, data)
                });
                item.view.find("#info").css({ display: "none" });
                item.view.find("#openDir").css({ display: "none" });
                this.view.append(item.view);
                return item;
            }
        }]);

        return FontsPage;
    }(_VisualComponent3.default);

    exports.default = FontsPage;
});
//# sourceMappingURL=FontsPage.js.map