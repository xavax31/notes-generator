define(["exports", "src/screens/ScreenFlashBase", "jx/comps/shape/ShapeCJS", "jx/comps/container/ContainerCJS", "jx/comps/text/TextCJS", "src/UserMenu"], function (exports, _ScreenFlashBase2, _ShapeCJS, _ContainerCJS, _TextCJS, _UserMenu) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ScreenFlashBase3 = _interopRequireDefault(_ScreenFlashBase2);

    var _ShapeCJS2 = _interopRequireDefault(_ShapeCJS);

    var _ContainerCJS2 = _interopRequireDefault(_ContainerCJS);

    var _TextCJS2 = _interopRequireDefault(_TextCJS);

    var _UserMenu2 = _interopRequireDefault(_UserMenu);

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

    var Screen00 = function (_ScreenFlashBase) {
        _inherits(Screen00, _ScreenFlashBase);

        function Screen00(dataObject) {
            _classCallCheck(this, Screen00);

            var _this = _possibleConstructorReturn(this, (Screen00.__proto__ || Object.getPrototypeOf(Screen00)).call(this, Object.assign({ screenName: "SCREEN_00" }, dataObject)));

            _this.notes = ["do", "do#", "ré", "ré#", "mi", "fa", "fa#", "sol", "sol#", "la", "la#", "si"];
            _this.indexNotes = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
            _this.modesPatterns = {
                mode1: [2, 2, 1, 2, 2, 2],
                dorien: [2, 1, 2, 2, 2, 1],
                phrygien: [1, 2, 2, 2, 1, 2],
                lydien: [2, 2, 2, 1, 2, 2],
                mixolydien: [2, 2, 1, 2, 2, 1],
                eolien: [2, 1, 2, 2, 1, 2],
                locrien: [1, 2, 2, 1, 2, 2],
                minor_melodique: [2, 1, 2, 2, 2, 2],
                javanais: [1, 2, 2, 2, 2, 1],
                lydien_augm: [2, 2, 2, 2, 1, 2],
                bartok: [2, 2, 2, 1, 2, 1],
                hindou: [2, 2, 1, 2, 1, 2],
                minor_dim: [2, 1, 2, 1, 2, 2],
                altere: [1, 2, 1, 2, 2, 2],
                minor_hamonic: [2, 1, 2, 2, 1, 3],
                locrien_6M: [1, 2, 2, 1, 3, 1],
                augmented: [2, 2, 1, 3, 1, 2],
                roumain: [2, 1, 3, 1, 2, 1],
                phrygien_espagnol: [1, 3, 1, 2, 1, 2],
                lydien_9diese: [3, 1, 2, 1, 2, 2],
                altered_7dim: [1, 2, 1, 2, 2, 1],
                arabe: [2, 2, 1, 1, 2, 2],
                napolitain: [1, 2, 2, 2, 2, 2],
                ton_sens: [2, 2, 2, 2, 2, 1],
                hypo_lydien: [2, 2, 2, 2, 1, 1],
                lydien_phrygien: [2, 2, 2, 1, 1, 2],
                orientale: [1, 3, 1, 1, 3, 1],
                bohemian: [1, 3, 1, 2, 1, 3],
                sebastian: [3, 1, 2, 1, 3, 1],
                tzigane: [2, 1, 3, 1, 1, 3],
                napolitaine_harmonic: [1, 2, 2, 2, 1, 3],
                gitan_hongrois: [2, 1, 3, 1, 1, 2],
                hongrois_majeur: [3, 1, 2, 1, 2, 1],
                gypsy: [1, 3, 1, 2, 2, 1],
                harmonic_majeur: [2, 2, 1, 2, 1, 3],
                lydien_dim: [2, 1, 3, 1, 2, 2]
            };
            _this.infos = {
                y: 100,
                actualX: 10,
                notesOffset: 30
            };
            _this.createdNotes = [];
            _this.generationConfig = {
                random: true,
                gamme: "chromatic",
                tonique: "do",
                indexMin: 4,
                indexMax: 36,
                intervalMin: 1,
                intervalMax: 3
            };
            _this.currentMode = null;
            return _this;
        }

        _createClass(Screen00, [{
            key: "createMode",
            value: function createMode(pattern, startNote) {
                console.log("createmode", pattern, startNote, this.notes.indexOf(startNote), this.notes[this.notes.indexOf(startNote)]);
                var index = this.notes.indexOf(startNote);
                var result = [this.notes[index]];
                console.log("this.notes[index]", this.notes[index]);
                var newIndex = void 0;
                for (var i = 0; i < pattern.length; i++) {
                    newIndex = index + pattern[i];
                    if (newIndex > this.notes.length - 1) {
                        newIndex = newIndex - this.notes.length;
                    }
                    index = newIndex;
                    result.push(this.notes[index]);
                }

                return result;
            }
        }, {
            key: "init",
            value: function init(callback) {
                _get(Screen00.prototype.__proto__ || Object.getPrototypeOf(Screen00.prototype), "init", this).call(this, function () {
                    callback();
                });
            }
        }, {
            key: "_initScreen",
            value: function _initScreen() {
                var _this2 = this;

                _get(Screen00.prototype.__proto__ || Object.getPrototypeOf(Screen00.prototype), "_initScreen", this).call(this);
                this.modePatternText = this.cc({
                    type: _TextCJS2.default,
                    text: "2-2-3-2-1-2",
                    style: { fontSize: 20 }
                });
                this.modePatternText.x = 20;
                this.screen.addChild(this.modePatternText);
                console.log("rr");
                this.shape = this.cc({
                    type: _ShapeCJS2.default,
                    width: 1280,
                    height: 400,
                    color: "white"
                });
                this.drawLine(10);
                this.drawLine(20);
                this.drawLine(30);
                this.drawLine(40);
                this.drawLine(50);
                this.screen.addChild(this.shape);
                this.shape.y = this.infos.y;
                this.menu = this.cc({ type: _UserMenu2.default, width: 300, height: 400 });
                this.menu.onchange.add(function (evt) {
                    console.log(evt);
                    _this2.generationConfig = Object.assign({}, _this2.menu.getConfig());
                });
                this.menu.onbtn.add(function (evt) {
                    console.log(evt);
                    switch (evt.btnID) {
                        case "generateBtn":
                            _this2.generateRandomSequence();
                            break;
                    }
                });
                this.menu.view.css("top", "250px");
                this.menu.view.css("left", "50px");
                this.menu.setConfig(this.generationConfig);

                this.generateRandomSequence();
            }
        }, {
            key: "generateRandomSequence",
            value: function generateRandomSequence() {
                var _this3 = this;

                console.log(this.generationConfig);
                if (this.generationConfig.gamme !== "chromatic") {
                    this.currentMode = this.createMode(this.modesPatterns[this.generationConfig.gamme], this.generationConfig.tonique);
                    this.modePatternText.text = this.modesPatterns[this.generationConfig.gamme].join(" ");
                } else {
                    this.currentMode = null;
                    this.modePatternText.text = "";
                }
                console.log("Mode", this.currentMode);
                this.deleteAllNotes();
                var notes = [];
                var indexMin = this.generationConfig.indexMin;
                var indexMax = this.generationConfig.indexMax;
                console.log("indexLimits", indexMin, indexMax);
                var currentIndex = -1;
                for (var i = 0; i < this.notes.length; i++) {
                    currentIndex++;
                    if (currentIndex < indexMin || currentIndex > indexMax) continue;
                    if (this.currentMode && this.currentMode.indexOf(this.notes[i]) === -1) continue;
                    notes.push({
                        note: this.notes[i],
                        octave: -1
                    });
                }
                for (var _i = 0; _i < this.notes.length; _i++) {
                    currentIndex++;
                    if (currentIndex < indexMin || currentIndex > indexMax) continue;
                    if (this.currentMode && this.currentMode.indexOf(this.notes[_i]) === -1) continue;
                    notes.push({
                        note: this.notes[_i],
                        octave: 0
                    });
                }
                for (var _i2 = 0; _i2 < this.notes.length; _i2++) {
                    currentIndex++;
                    if (currentIndex < indexMin || currentIndex > indexMax) continue;
                    if (this.currentMode && this.currentMode.indexOf(this.notes[_i2]) === -1) continue;
                    notes.push({
                        note: this.notes[_i2],
                        octave: 1
                    });
                }
                for (var _i3 = 0; _i3 < this.notes.length; _i3++) {
                    currentIndex++;
                    if (currentIndex < indexMin || currentIndex > indexMax) continue;
                    if (this.currentMode && this.currentMode.indexOf(this.notes[_i3]) === -1) continue;
                    notes.push({
                        note: this.notes[_i3],
                        octave: 2
                    });
                }
                console.log("notes", notes);
                var index = this.generationConfig.random ? Math.floor(Math.random() * (notes.length - 1)) : 0;

                console.log("INDEX", index);
                var direction = Math.random() > 0.5 ? 1 : -1;
                var notesMax = 40;
                var intervalID = setInterval(function () {
                    var note = notes[index];
                    _this3.addNote(note.note, note.octave);
                    if (_this3.generationConfig.random) {
                        direction = Math.random() > 0.5 ? 1 : -1;
                        var offset = _this3.jx.tools.math.randomValue(_this3.generationConfig.intervalMin, _this3.generationConfig.intervalMax);
                        var newIndex = index + direction * offset;
                        console.log("offset:", offset, "direction:", direction, "newIndex:", newIndex);
                        if (newIndex >= notes.length - 2) {
                            direction = -1;
                            newIndex = index + direction * offset;
                        }
                        if (newIndex < 0) {
                            direction = 1;
                            newIndex = index + direction * offset;
                        }
                        console.log("Newinedex", newIndex);
                        if (newIndex < 0 || newIndex >= notes.length - 2) {
                            newIndex = Math.floor(Math.random() * (notes.length - 1));
                        }
                        index = newIndex;
                        notesMax--;
                        if (notesMax <= 0) {
                            clearInterval(intervalID);
                        }
                    } else {
                        notesMax--;
                        index++;
                        if (notesMax <= 0 || index >= notes.length - 2) {
                            clearInterval(intervalID);
                        }
                    }
                }, 10);
            }
        }, {
            key: "drawLine",
            value: function drawLine(y) {
                var start = 0;
                var end = 1280;
                var graphic = this.shape.graphics;
                graphic.beginStroke("#000000").moveTo(start, y).lineTo(end, y).endStroke();
            }
        }, {
            key: "addNote",
            value: function addNote(noteName) {
                var octave = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                var length = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

                var index = this.notes.indexOf(noteName);
                var filled = length > 1 ? false : true;
                var note = this.cc({ type: _ContainerCJS2.default });
                var circle = this.cc({
                    type: _ShapeCJS2.default,
                    shapeType: "circle",
                    radius: 5,
                    borderColor: "black",
                    color: filled ? "black" : "rgba(0,0,0,0)",
                    borderWidth: 2
                });
                note.addChild(circle);
                if (noteName.search("#") !== -1) {
                    var text = this.cc({ type: _TextCJS2.default, text: "#" });
                    text.x = -15;
                    text.y = -5;
                    note.addChild(text);
                }
                if (octave === 0 && (index === 0 || index === 1)) {
                    var circleGraf = circle.graphics;
                    circleGraf.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                } else if (octave === -1 && noteName.search(/^si/) !== -1) {
                    var _circleGraf = circle.graphics;
                    _circleGraf.beginStroke("#000000").moveTo(-10, -5).lineTo(10, -5).endStroke();
                } else if (octave === -1 && noteName.search(/^la/) !== -1) {
                    var _circleGraf2 = circle.graphics;
                    _circleGraf2.beginStroke("#000000").moveTo(-10, -10).lineTo(10, -10).endStroke();
                    _circleGraf2.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                } else if (octave === -1 && noteName.search(/^sol/) !== -1) {
                    var _circleGraf3 = circle.graphics;
                    _circleGraf3.beginStroke("#000000").moveTo(-10, -15).lineTo(10, -15).endStroke();
                    _circleGraf3.beginStroke("#000000").moveTo(-10, -5).lineTo(10, -5).endStroke();
                } else if (octave === -1 && noteName.search(/^fa/) !== -1) {
                    var _circleGraf4 = circle.graphics;
                    _circleGraf4.beginStroke("#000000").moveTo(-10, -20).lineTo(10, -20).endStroke();
                    _circleGraf4.beginStroke("#000000").moveTo(-10, -10).lineTo(10, -10).endStroke();
                    _circleGraf4.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                } else if (octave === -1 && noteName.search(/^mi/) !== -1) {
                    var _circleGraf5 = circle.graphics;
                    _circleGraf5.beginStroke("#000000").moveTo(-10, -25).lineTo(10, -25).endStroke();
                    _circleGraf5.beginStroke("#000000").moveTo(-10, -15).lineTo(10, -15).endStroke();
                    _circleGraf5.beginStroke("#000000").moveTo(-10, -5).lineTo(10, -5).endStroke();
                } else if (octave === 1 && noteName.search(/^la/) !== -1) {
                    var _circleGraf6 = circle.graphics;
                    _circleGraf6.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                } else if (octave === 1 && noteName.search(/^si/) !== -1) {
                    var _circleGraf7 = circle.graphics;
                    _circleGraf7.beginStroke("#000000").moveTo(-10, 5).lineTo(10, 5).endStroke();
                } else if (octave === 2 && noteName.search(/^do/) !== -1) {
                    var _circleGraf8 = circle.graphics;
                    _circleGraf8.beginStroke("#000000").moveTo(-10, 10).lineTo(10, 10).endStroke();
                    _circleGraf8.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                } else if (octave === 2 && noteName.search(/^ré/) !== -1) {
                    var _circleGraf9 = circle.graphics;
                    _circleGraf9.beginStroke("#000000").moveTo(-10, 15).lineTo(10, 15).endStroke();
                    _circleGraf9.beginStroke("#000000").moveTo(-10, 5).lineTo(10, 5).endStroke();
                } else if (octave === 2 && noteName.search(/^mi/) !== -1) {
                    var _circleGraf10 = circle.graphics;
                    _circleGraf10.beginStroke("#000000").moveTo(-10, 20).lineTo(10, 20).endStroke();
                    _circleGraf10.beginStroke("#000000").moveTo(-10, 10).lineTo(10, 10).endStroke();
                    _circleGraf10.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                } else if (octave === 2 && noteName.search(/^fa/) !== -1) {
                    var _circleGraf11 = circle.graphics;
                    _circleGraf11.beginStroke("#000000").moveTo(-10, 25).lineTo(10, 25).endStroke();
                    _circleGraf11.beginStroke("#000000").moveTo(-10, 15).lineTo(10, 15).endStroke();
                    _circleGraf11.beginStroke("#000000").moveTo(-10, 5).lineTo(10, 5).endStroke();
                } else if (octave === 2 && noteName.search(/^sol/) !== -1) {
                    var _circleGraf12 = circle.graphics;
                    _circleGraf12.beginStroke("#000000").moveTo(-10, 30).lineTo(10, 30).endStroke();
                    _circleGraf12.beginStroke("#000000").moveTo(-10, 20).lineTo(10, 20).endStroke();
                    _circleGraf12.beginStroke("#000000").moveTo(-10, 10).lineTo(10, 10).endStroke();
                    _circleGraf12.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                } else if (octave === 2 && noteName.search(/^la/) !== -1) {
                    var _circleGraf13 = circle.graphics;
                    _circleGraf13.beginStroke("#000000").moveTo(-10, 35).lineTo(10, 35).endStroke();
                    _circleGraf13.beginStroke("#000000").moveTo(-10, 25).lineTo(10, 25).endStroke();
                    _circleGraf13.beginStroke("#000000").moveTo(-10, 15).lineTo(10, 15).endStroke();
                    _circleGraf13.beginStroke("#000000").moveTo(-10, 5).lineTo(10, 5).endStroke();
                } else if (octave === 2 && noteName.search(/^si/) !== -1) {
                    var _circleGraf14 = circle.graphics;
                    _circleGraf14.beginStroke("#000000").moveTo(-10, 40).lineTo(10, 40).endStroke();
                    _circleGraf14.beginStroke("#000000").moveTo(-10, 30).lineTo(10, 30).endStroke();
                    _circleGraf14.beginStroke("#000000").moveTo(-10, 20).lineTo(10, 20).endStroke();
                    _circleGraf14.beginStroke("#000000").moveTo(-10, 10).lineTo(10, 10).endStroke();
                    _circleGraf14.beginStroke("#000000").moveTo(-10, 0).lineTo(10, 0).endStroke();
                }
                if (length < 4) {
                    var direction = octave > 0 ? 1 : -1;
                    var xPos = direction === 1 ? -5 : 5;
                    var _circleGraf15 = circle.graphics;
                    _circleGraf15.beginStroke("#000000").moveTo(xPos, 0).lineTo(xPos, direction * 40).endStroke();
                }
                this.screen.addChild(note);
                this.infos.actualX += this.infos.notesOffset;
                note.x = this.infos.actualX;
                note.y = this.infos.y + 60 - this.indexNotes[index] * 5 - octave * 7 * 5;
                this.createdNotes.push(note);
            }
        }, {
            key: "deleteAllNotes",
            value: function deleteAllNotes() {
                for (var i = 0; i < this.createdNotes.length; i++) {
                    this.screen.removeChild(this.createdNotes[i]);
                    this.createdNotes[i].kill();
                }
                this.infos.actualX = 10;
            }
        }, {
            key: "show",
            value: function show(callback, data) {
                var _this4 = this;

                _get(Screen00.prototype.__proto__ || Object.getPrototypeOf(Screen00.prototype), "show", this).call(this, function () {
                    callback({ target: _this4 });
                }, data);
            }
        }, {
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                _get(Screen00.prototype.__proto__ || Object.getPrototypeOf(Screen00.prototype), "kill", this).call(this);
            }
        }]);

        return Screen00;
    }(_ScreenFlashBase3.default);

    exports.default = Screen00;
});
//# sourceMappingURL=Screen00.js.map