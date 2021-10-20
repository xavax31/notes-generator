define(["exports", "jx/comps/SimpleDOMView", "jx/comps/ComboBox"], function (exports, _SimpleDOMView2, _ComboBox) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _SimpleDOMView3 = _interopRequireDefault(_SimpleDOMView2);

    var _ComboBox2 = _interopRequireDefault(_ComboBox);

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

    var UserMenu = function (_SimpleDOMView) {
        _inherits(UserMenu, _SimpleDOMView);

        function UserMenu(dataObject) {
            _classCallCheck(this, UserMenu);

            var _this = _possibleConstructorReturn(this, (UserMenu.__proto__ || Object.getPrototypeOf(UserMenu)).call(this, Object.assign({ scenes: null }, dataObject)));

            _this.addEventDispatcher("onchange", "onbtn");
            return _this;
        }

        _createClass(UserMenu, [{
            key: "_initSync",
            value: function _initSync() {
                var _this2 = this;

                _get(UserMenu.prototype.__proto__ || Object.getPrototypeOf(UserMenu.prototype), "_initSync", this).call(this);
                this.view.css("position", "absolute");
                this.view.css("padding", "3px");
                this.view.css("top", "40px");
                this.width = this.dataObject.width;

                var notes = ["do", "do#", "ré", "ré#", "mi", "fa", "fa#", "sol", "sol#", "la", "la#", "si"];
                var options = [];
                var index = 0;
                for (var i = 0; i < notes.length; i++) {
                    options.push({
                        id: String(index),
                        desc: notes[i] + "-1"
                    });
                    index++;
                }
                for (var _i = 0; _i < notes.length; _i++) {
                    options.push({
                        id: String(index),
                        desc: notes[_i]
                    });
                    index++;
                }
                for (var _i2 = 0; _i2 < notes.length; _i2++) {
                    options.push({
                        id: String(index),
                        desc: notes[_i2] + "1"
                    });
                    index++;
                }
                for (var _i3 = 0; _i3 < notes.length; _i3++) {
                    options.push({
                        id: String(index),
                        desc: notes[_i3] + "2"
                    });
                    index++;
                }
                console.log(options);
                this.allNotesInfo = options;
                this.addComboBox({ id: "tonique", description: "Tonique",
                    options: notes,
                    onchange: function onchange(evt) {
                        console.log(evt.target.value);
                        _this2._refresh();
                    } });
                this.addComboBox({ id: "gamme", description: "Gamme/Mode", width: "300px",
                    options: [{ id: "chromatic", desc: "Chromatique" }, { id: "gamme_majeure", desc: "GAMME MAJEURE", type: "section" }, { id: "mode1", desc: "Mode de Do - Mode 1 [2,1,2,2,2,1]" }, { id: "dorien", desc: "Mode de Ré - Dorien (II) [2,1,2,2,2,1]" }, { id: "phrygien", desc: "Mode de Mi - Phrygien (III) [1,2,2,2,1,2]" }, { id: "lydien", desc: "Mode de Fa - Lydien (IV) [2,2,2,1,2,2]" }, { id: "mixolydien", desc: "Mode de Sol - Mixolydien (V) [2,2,1,2,2,1]" }, { id: "eolien", desc: "Mode de La - éolien (VI) - Mineur naturel [2,1,2,2,1,2]" }, { id: "locrien", desc: "Mode de Si - locrien (VII) [1,2,2,1,2,2]" }, { id: "gamme_mineure_melodique", desc: "GAMME MINEURE MELODIQUE", type: "section" }, { id: "minor_melodique", desc: "Mode Mélodique (I) [2,1,2,2,2,2]" }, { id: "javanais", desc: "Mode Javanais (II) [1,2,2,2,2,1]" }, { id: "lydien_augm", desc: "Mode Lydien augm. (III) [2,2,2,2,1,2]" }, { id: "bartok", desc: "Mode de Bartok (IV) [2,2,2,1,2,1]" }, { id: "hindou", desc: "Mode Hindou (V) [2,2,1,2,1,2]" }, { id: "minor_dim", desc: "Mode mineur diminué (VI) [2,1,2,1,2,2]" }, { id: "altere", desc: "Mode altéré (VII) [1,2,1,2,2,2]" }, { id: "gamme_mineure_harmonique", desc: "GAMME MINEURE HARMONIQUE", type: "section" }, { id: "minor_hamonic", desc: "Mineur Harmonique (I) [2,1,2,2,1,3]" }, { id: "locrien_6M", desc: "Mode Locrien 6M (II) [1,2,2,1,3,1]" }, { id: "augmented", desc: "Mode Augmenté (III) [2,2,1,3,1,2]" }, { id: "roumain", desc: "Mode Roumain (IV) [2,1,3,1,2,1]" }, { id: "phrygien_espagnol", desc: "Mode Phrygien espagnol (V) [1,3,1,2,1,2]" }, { id: "lydien_9diese", desc: "Mode Lydien 9# (VI) [3,1,2,1,2,2]" }, { id: "altered_7dim", desc: "Mode altéré 7dim (VII) [1,2,1,2,2,1]" }, { id: "gamme_arabe", desc: "GAMME ARABE", type: "section" }, { id: "arabe", desc: "Mode arabe (I) [2,2,1,1,2,2]" }, { id: "napolitain", desc: "Mode Napolitain (IV) [1,2,2,2,2,2]" }, { id: "ton_sens", desc: "Mode ton + sens (V) [2,2,2,2,2,1]" }, { id: "hypo_lydien", desc: "Mode Hypo Lydien (VI) [2,2,2,2,1,1]" }, { id: "lydien_phrygien", desc: "Mode lydien/phrygien (VII) [2,2,2,1,1,2]" }, { id: "gamme_orientale", desc: "GAMME ORIENTALE", type: "section" }, { id: "orientale", desc: "Gamme Orientale (I) [1,3,1,1,3,1]" }, { id: "bohemian", desc: "Mode Bohémien (IV) [1,3,1,2,1,3]" }, { id: "sebastian", desc: "Mode Sebastian (V) [3,1,2,1,3,1]" }, { id: "tzigane", desc: "Mode Tzigane (VII) [2,1,3,1,1,3]" }, { id: "gamme_napolitaine_harmonique", desc: "GAMME NAPOLITAINE HARMONIQUE", type: "section" }, { id: "napolitaine_harmonic", desc: "Gamme Napolitaine Harmonique (I) [1,2,2,2,1,3]" }, { id: "gitan_hongrois", desc: "Mode Gitan Hongrois (IV) [2,1,3,1,1,2]" }, { id: "gamme_hongroise_majeure", desc: "GAMME HONGROISE MAJEUR", type: "section" }, { id: "hongrois_majeur", desc: "Gamme Hongrois Majeur (I) [3,1,2,1,2,1]" }, { id: "gamme_gypsy", desc: "GAMME GYPSY", type: "section" }, { id: "gypsy", desc: "Gamme Gypsy (I) [1,3,1,2,2,1]" }, { id: "harmonic_majeur", desc: "Mode Harmonique Majeur (IV) [2,2,1,2,1,3]" }, { id: "lydien_dim", desc: "Mode Lydien diminué (VII) [2,1,3,1,2,2]" }],
                    onchange: function onchange(evt) {
                        console.log(evt.target.value);
                        _this2._refresh();
                    } });
                this.addComboBox({ id: "noteMin", description: "Note min",
                    options: options,
                    onchange: function onchange(evt) {
                        console.log(evt.target.value);
                        _this2._refresh();
                    } });
                this.addComboBox({ id: "noteMax", description: "Note max",
                    options: options,
                    onchange: function onchange(evt) {
                        console.log(evt.target.value);
                        _this2._refresh();
                    }, value: 47 });
                this.addComboBox({ id: "random", description: "Random",
                    options: ["oui", "non"],
                    onchange: function onchange(evt) {
                        console.log(evt.target.value);
                        _this2._refresh();
                    }, value: "oui" });

                this.addNumberItem({ id: "intervalMin", description: "Interval Min (en 1/2 tons)", min: 0, max: 20, step: 1, value: 1 });
                this.addNumberItem({ id: "intervalMax", description: "Interval Max (en 1/2 tons)", min: 0, max: 20, step: 1, value: 3 });
                this.addComboBox({ id: "preset", width: "300px", description: "Preset",
                    options: [{ id: "all", desc: "Toute la tessiture" }, { id: "basses", desc: "Basses sans clé de quinte" }, { id: "aigus", desc: "Aigus clé de quinte avec" }, { id: "transition", desc: "Travail de la transition graves-aigus" }],
                    onchange: function onchange(evt) {
                        console.log(evt);
                        switch (evt.target.value) {
                            case "all":
                                _this2.setConfig({
                                    indexMin: _this2.findNoteIndex("mi-1"),
                                    indexMax: _this2.findNoteIndex("do1"),
                                    intervalMin: 1,
                                    intervalMax: 3,
                                    random: true
                                });
                                break;
                            case "basses":
                                _this2.setConfig({
                                    indexMin: _this2.findNoteIndex("mi-1"),
                                    indexMax: _this2.findNoteIndex("do1"),
                                    intervalMin: 1,
                                    intervalMax: 3,
                                    random: true
                                });
                                break;
                            case "aigus":
                                _this2.setConfig({
                                    indexMin: _this2.findNoteIndex("si"),
                                    indexMax: _this2.findNoteIndex("ré2"),
                                    intervalMin: 1,
                                    intervalMax: 3,
                                    random: true
                                });
                                break;
                            case "transition":
                                _this2.setConfig({
                                    indexMin: _this2.findNoteIndex("sol"),
                                    indexMax: _this2.findNoteIndex("la1"),
                                    intervalMin: 1,
                                    intervalMax: 3,
                                    random: true
                                });
                                break;
                            default:
                                break;
                        }
                        _this2._refresh();
                    } });

                this.addButton({ id: "generateBtn", label: "Générer", onclick: function onclick(evt) {
                        _this2.onbtn.dispatch({ target: _this2, btnID: evt.target.id });
                    } });
            }
        }, {
            key: "findNoteIndex",
            value: function findNoteIndex(noteStr) {
                var id = Number(this.allNotesInfo.find(function (value) {
                    return value.desc === noteStr;
                }).id);
                console.log(noteStr, id);
                return id;
            }
        }, {
            key: "addNumberItem",
            value: function addNumberItem(_ref) {
                var _this3 = this;

                var id = _ref.id;
                var _ref$x = _ref.x;
                var x = _ref$x === undefined ? 0 : _ref$x;
                var _ref$y = _ref.y;
                var y = _ref$y === undefined ? 0 : _ref$y;
                var _ref$description = _ref.description;
                var description = _ref$description === undefined ? "" : _ref$description;
                var _ref$min = _ref.min;
                var min = _ref$min === undefined ? 0 : _ref$min;
                var _ref$max = _ref.max;
                var max = _ref$max === undefined ? 0 : _ref$max;
                var _ref$step = _ref.step;
                var step = _ref$step === undefined ? 1 : _ref$step;
                var _ref$value = _ref.value;
                var value = _ref$value === undefined ? 0 : _ref$value;
                var _ref$parent = _ref.parent;
                var parent = _ref$parent === undefined ? this : _ref$parent;

                var item = this.cc({ type: "InputNumber", render: "DOM", x: x, y: y, description: description, min: min, max: max, step: step });
                item.view.css("position", "relative");
                item.view.css("display", "block");
                item.view.css("marginBottom", "5px");
                item.view.find("#value").css("width", "100px");
                item.value = value;
                item.onchange.add(function (evt) {
                    _this3._refresh();
                });
                parent.addChild(item);

                this[id] = item;
            }
        }, {
            key: "addButton",
            value: function addButton(_ref2) {
                var id = _ref2.id;
                var label = _ref2.label;
                var onclick = _ref2.onclick;

                this.addChild(this.ccid({ id: id, label: label, type: "SimpleButton", render: "DOM", onclick: onclick }));
                this[id].view.css("position", "relative");
                this[id].view.css("display", "block");
                this[id].view.css("marginTop", "10px");
                this[id].view.css("width", "100px");
            }
        }, {
            key: "addComboBox",
            value: function addComboBox(_ref3) {
                var id = _ref3.id;
                var options = _ref3.options;
                var onchange = _ref3.onchange;
                var description = _ref3.description;
                var value = _ref3.value;
                var _ref3$width = _ref3.width;
                var width = _ref3$width === undefined ? "100px" : _ref3$width;

                var item = this.cc({ type: _ComboBox2.default, render: "DOM", x: 0, y: 0, description: description, options: options });
                item.view.css("position", "relative");
                item.view.css("display", "block");
                item.view.css("marginBottom", "5px");
                item.view.find("#value").css("width", width);
                item.value = value;
                item.onchange.add(onchange);
                this.addChild(item);

                this[id] = item;
            }
        }, {
            key: "addPaletteColor",
            value: function addPaletteColor(_ref4) {
                var _this4 = this;

                var id = _ref4.id;
                var label = _ref4.label;
                var imgID = _ref4.imgID;
                var _ref4$colorIndex = _ref4.colorIndex;
                var colorIndex = _ref4$colorIndex === undefined ? -1 : _ref4$colorIndex;

                this.addChild(this.ccid({ id: id, rid: imgID, render: "DOM", width: 40, height: 40, onclick: function onclick(evt) {
                        _this4.color = evt.target.colorIndex;
                        _this4._refresh();
                    } }));
                this[id].view.css("position", "relative");
                this[id].colorIndex = colorIndex;
            }
        }, {
            key: "_refresh",
            value: function _refresh() {
                this.onchange.dispatch({ target: this });
            }
        }, {
            key: "getConfig",
            value: function getConfig() {
                console.log("this.noteMin.value", this.noteMin.value);
                return {
                    random: this.random.value === "oui",
                    tonique: this.tonique.value,
                    gamme: this.gamme.value,
                    indexMin: Number(this.noteMin.value),

                    indexMax: Number(this.noteMax.value),
                    intervalMin: Number(this.intervalMin.value),
                    intervalMax: Number(this.intervalMax.value)
                };
            }
        }, {
            key: "setConfig",
            value: function setConfig(_ref5) {
                var _ref5$random = _ref5.random;
                var random = _ref5$random === undefined ? false : _ref5$random;
                var _ref5$tonique = _ref5.tonique;
                var tonique = _ref5$tonique === undefined ? "do" : _ref5$tonique;
                var _ref5$gamme = _ref5.gamme;
                var gamme = _ref5$gamme === undefined ? "chromatic" : _ref5$gamme;
                var indexMin = _ref5.indexMin;
                var indexMax = _ref5.indexMax;
                var intervalMin = _ref5.intervalMin;
                var intervalMax = _ref5.intervalMax;

                this.random.value = random ? "oui" : "non";
                this.gamme.value = gamme;
                this.tonique.value = tonique;
                this.noteMin.value = indexMin;
                this.noteMax.value = indexMax;
                this.intervalMin.value = intervalMin;
                this.intervalMax.value = intervalMax;
            }
        }, {
            key: "start",
            value: function start() {}
        }, {
            key: "setInfo",
            value: function setInfo(_ref6) {
                var _ref6$title = _ref6.title;
                var title = _ref6$title === undefined ? "" : _ref6$title;
                var _ref6$desc = _ref6.desc;
                var desc = _ref6$desc === undefined ? "" : _ref6$desc;

                this.sceneName.text = title;
                this.sceneDesc.text = desc.replace(/\n/g, "<br>");
            }
        }]);

        return UserMenu;
    }(_SimpleDOMView3.default);

    exports.default = UserMenu;
});
//# sourceMappingURL=UserMenu.js.map