define(["exports", "jx/editor/editionitems/BasicItem"], function (exports, _BasicItem2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _BasicItem3 = _interopRequireDefault(_BasicItem2);

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

    var FontSelector = function (_BasicItem) {
        _inherits(FontSelector, _BasicItem);

        function FontSelector(dataObject) {
            _classCallCheck(this, FontSelector);

            var _this = _possibleConstructorReturn(this, (FontSelector.__proto__ || Object.getPrototypeOf(FontSelector)).call(this, dataObject));

            _this.content = $("<input type=\"text\" class=\"form-control\" id=\"value\">");
            _this.view.find("#content").append(_this.content);
            _this.content.val(_this.data.value || "");
            _this.content.on("click", function () {
                return __awaiter(_this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                    var btnClicked;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return this.editor.fontsManager.showChoicePanel();

                                case 2:
                                    btnClicked = _context.sent;

                                    console.log("btnClicked", btnClicked);
                                    if (btnClicked.action !== "no" && this.editor.fontsManager.lastSelectedFont) {
                                        console.log("CHOICE", this.editor.fontsManager.lastSelectedFont);
                                        this.value = this.editor.fontsManager.lastSelectedFont;
                                        this.onchanged.dispatch({ target: this });
                                    }

                                case 5:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));
            });
            return _this;
        }

        _createClass(FontSelector, [{
            key: "_refreshData",
            value: function _refreshData() {
                this.data.value = this.value;
            }
        }, {
            key: "_refreshView",
            value: function _refreshView() {
                this.data.value = this.value;
            }
        }, {
            key: "value",
            get: function get() {
                return this.view.find("#value")[0].value;
            },
            set: function set(text) {
                this.content.val(text || "");
                this._refreshData();
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (!value) {
                    this.view.find("#value").prop('disabled', !this.editable);
                } else {
                    this.view.find("#value").prop('disabled', true);
                }
            }
        }]);

        return FontSelector;
    }(_BasicItem3.default);

    exports.default = FontSelector;
});
//# sourceMappingURL=FontSelector.js.map