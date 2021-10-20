var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
define(["require", "exports", "screens/ScreenFlashBase", "jx/comps/shape/ShapeCJS", "jx/comps/container/ContainerCJS", "jx/comps/text/TextCJS", "comps/UserMenu", "comps/gammes"], function (require, exports, ScreenFlashBase_1, ShapeCJS_1, ContainerCJS_1, TextCJS_1, UserMenu_1, gammes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     */
    var Screen00 = /** @class */ (function (_super) {
        __extends(Screen00, _super);
        function Screen00(dataObject) {
            var _this = _super.call(this, Object.assign({ screenName: "SCREEN_00" }, dataObject)) || this;
            _this.notes = [
                "do",
                "do#",
                "ré",
                "ré#",
                "mi",
                "fa",
                "fa#",
                "sol",
                "sol#",
                "la",
                "la#",
                "si",
            ];
            _this.indexNotes = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
            _this.infos = {
                y: 100,
                actualX: 10,
                notesOffset: 30,
            };
            _this.createdNotes = [];
            _this.generationConfig = {
                random: true,
                gamme: "chromatic",
                tonique: "do",
                noteMin: "mi-1",
                noteMax: "do2",
                intervalMin: 1,
                intervalMax: 3,
            };
            _this.currentMode = null;
            return _this;
        }
        Screen00.prototype.createMode = function (pattern, startNote) {
            console.log("createmode", pattern, startNote, this.notes.indexOf(startNote), this.notes[this.notes.indexOf(startNote)]);
            var index = this.notes.indexOf(startNote);
            var result = [this.notes[index]];
            console.log("this.notes[index]", this.notes[index]);
            var newIndex;
            for (var i = 0; i < pattern.length - 1; i++) {
                newIndex = index + pattern[i];
                if (newIndex > this.notes.length - 1) {
                    newIndex = newIndex - this.notes.length;
                }
                index = newIndex;
                result.push(this.notes[index]);
                // console.log("result", result);
            }
            // console.log("MODE", result);
            return result;
        };
        Screen00.prototype.init = function (callback) {
            _super.prototype.init.call(this, function () {
                callback();
            });
        };
        Screen00.prototype._initScreen = function () {
            var _this = this;
            _super.prototype._initScreen.call(this);
            this.modesPatterns = {};
            for (var i = 0; i < gammes_1.gammes.length; i++) {
                var gamme = gammes_1.gammes[i];
                if (gammes_1.gammes[i].pattern) {
                    this.modesPatterns[gamme.id] = __spreadArray([], gammes_1.gammes[i].pattern);
                }
            }
            this.modePatternText = this.cc({
                type: TextCJS_1.default,
                text: "2-2-3-2-1-2",
                style: { fontSize: 20 },
            });
            this.modePatternText.x = 20;
            this.screen.addChild(this.modePatternText);
            console.log("aaa");
            this.shape = this.cc({
                type: ShapeCJS_1.default,
                width: 1280,
                height: 400,
                color: "white",
            });
            this.drawLine(10);
            this.drawLine(20);
            this.drawLine(30);
            this.drawLine(40);
            this.drawLine(50);
            this.screen.addChild(this.shape);
            this.shape.y = this.infos.y;
            this.menu = this.cc({ type: UserMenu_1.default, width: 300, height: 400 });
            this.menu.onchange.add(function (evt) {
                console.log(evt);
                _this.generationConfig = __assign({}, _this.menu.getConfig());
                _this.generateRandomSequence();
            });
            this.menu.onbtn.add(function (evt) {
                console.log(evt);
                switch (evt.btnID) {
                    case "generateBtn":
                        _this.generateRandomSequence();
                        break;
                }
            });
            this.menu.view.css("top", "250px");
            this.menu.view.css("left", "50px");
            this.menu.setConfig(this.generationConfig);
            // for (let i = 4; i < this.notes.length; i++) {
            // 	this.addNote(this.notes[i], -1);
            // }
            // for (let i = 0; i < this.notes.length; i++) {
            // 	this.addNote(this.notes[i]);
            // }
            // for (let i = 0; i < this.notes.length; i++) {
            // 	this.addNote(this.notes[i], 1);
            // }
            // for (let i = 0; i < this.notes.length; i++) {
            // 	this.addNote(this.notes[i], 2);
            // }
            this.generateRandomSequence();
        };
        Screen00.prototype.generateRandomSequence = function () {
            var _this = this;
            console.log(this.modesPatterns);
            if (this.generationConfig.gamme !== "chromatic") {
                this.currentMode = this.createMode(this.modesPatterns[this.generationConfig.gamme], this.generationConfig.tonique);
                this.modePatternText.text =
                    this.modesPatterns[this.generationConfig.gamme].join(" ");
            }
            else {
                this.currentMode = null;
                this.modePatternText.text = "";
            }
            console.log("Mode", this.currentMode);
            this.deleteAllNotes();
            var notes = [];
            var indexMin = this.menu.findNoteIndex(this.generationConfig.noteMin);
            var indexMax = this.menu.findNoteIndex(this.generationConfig.noteMax);
            console.log("indexLimits", indexMin, indexMax);
            var currentIndex = -1;
            for (var i = 0; i < this.notes.length; i++) {
                currentIndex++;
                if (currentIndex < indexMin || currentIndex > indexMax)
                    continue;
                if (this.currentMode &&
                    this.currentMode.indexOf(this.notes[i]) === -1)
                    continue;
                notes.push({
                    note: this.notes[i],
                    octave: -1,
                });
            }
            for (var i = 0; i < this.notes.length; i++) {
                currentIndex++;
                if (currentIndex < indexMin || currentIndex > indexMax)
                    continue;
                if (this.currentMode &&
                    this.currentMode.indexOf(this.notes[i]) === -1)
                    continue;
                notes.push({
                    note: this.notes[i],
                    octave: 0,
                });
            }
            for (var i = 0; i < this.notes.length; i++) {
                currentIndex++;
                if (currentIndex < indexMin || currentIndex > indexMax)
                    continue;
                if (this.currentMode &&
                    this.currentMode.indexOf(this.notes[i]) === -1)
                    continue;
                notes.push({
                    note: this.notes[i],
                    octave: 1,
                });
            }
            for (var i = 0; i < this.notes.length; i++) {
                currentIndex++;
                if (currentIndex < indexMin || currentIndex > indexMax)
                    continue;
                if (this.currentMode &&
                    this.currentMode.indexOf(this.notes[i]) === -1)
                    continue;
                notes.push({
                    note: this.notes[i],
                    octave: 2,
                });
            }
            console.log("notes", notes);
            var index = this.generationConfig.random
                ? Math.floor(Math.random() * (notes.length - 1))
                : 0;
            // let index = Math.floor(notes.length/2);
            console.log("INDEX", index);
            var direction = Math.random() > 0.5 ? 1 : -1;
            var notesMax = 40;
            var intervalID = setInterval(function () {
                // this.deleteAllNotes();
                // console.log("NOTE index", index, notes.length, this.generationConfig.intervalMin, this.generationConfig.intervalMax);
                var note = notes[index];
                _this.addNote(note.note, note.octave);
                if (_this.generationConfig.random) {
                    direction = Math.random() > 0.5 ? 1 : -1;
                    var offset = _this.jx.tools.math.randomValue(_this.generationConfig.intervalMin, _this.generationConfig.intervalMax);
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
                }
                else {
                    notesMax--;
                    index++;
                    if (notesMax <= 0 || index >= notes.length - 2) {
                        clearInterval(intervalID);
                    }
                }
            }, 10);
        };
        Screen00.prototype.drawLine = function (y) {
            var start = 0;
            var end = 1280;
            var graphic = this.shape.graphics;
            graphic
                .beginStroke("#000000")
                .moveTo(start, y)
                .lineTo(end, y)
                .endStroke();
        };
        Screen00.prototype.addNote = function (noteName, octave, length) {
            if (octave === void 0) { octave = 0; }
            if (length === void 0) { length = 1; }
            var index = this.notes.indexOf(noteName);
            var filled = length > 1 ? false : true;
            var note = this.cc({ type: ContainerCJS_1.default });
            var colorNote = "black";
            if (this.generationConfig.tonique === noteName) {
                colorNote = "#00AA00";
            }
            var circle = this.cc({
                type: ShapeCJS_1.default,
                shapeType: "circle",
                radius: 5,
                borderColor: colorNote,
                color: filled ? colorNote : "rgba(0,0,0,0)",
                borderWidth: 2,
            });
            note.addChild(circle);
            if (noteName.search("#") !== -1) {
                var text = this.cc({ type: TextCJS_1.default, text: "#" });
                text.x = -15;
                text.y = -5;
                note.addChild(text);
            }
            if (octave === 0 && (index === 0 || index === 1)) {
                // do
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            else if (octave === -1 && noteName.search(/^si/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -5)
                    .lineTo(10, -5)
                    .endStroke();
            }
            else if (octave === -1 && noteName.search(/^la/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -10)
                    .lineTo(10, -10)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            else if (octave === -1 && noteName.search(/^sol/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -15)
                    .lineTo(10, -15)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -5)
                    .lineTo(10, -5)
                    .endStroke();
            }
            else if (octave === -1 && noteName.search(/^fa/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -20)
                    .lineTo(10, -20)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -10)
                    .lineTo(10, -10)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            else if (octave === -1 && noteName.search(/^mi/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -25)
                    .lineTo(10, -25)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -15)
                    .lineTo(10, -15)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, -5)
                    .lineTo(10, -5)
                    .endStroke();
            }
            else if (octave === 1 && noteName.search(/^la/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            else if (octave === 1 && noteName.search(/^si/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 5)
                    .lineTo(10, 5)
                    .endStroke();
            }
            else if (octave === 2 && noteName.search(/^do/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 10)
                    .lineTo(10, 10)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            else if (octave === 2 && noteName.search(/^ré/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 15)
                    .lineTo(10, 15)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 5)
                    .lineTo(10, 5)
                    .endStroke();
            }
            else if (octave === 2 && noteName.search(/^mi/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 20)
                    .lineTo(10, 20)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 10)
                    .lineTo(10, 10)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            else if (octave === 2 && noteName.search(/^fa/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 25)
                    .lineTo(10, 25)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 15)
                    .lineTo(10, 15)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 5)
                    .lineTo(10, 5)
                    .endStroke();
            }
            else if (octave === 2 && noteName.search(/^sol/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 30)
                    .lineTo(10, 30)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 20)
                    .lineTo(10, 20)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 10)
                    .lineTo(10, 10)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            else if (octave === 2 && noteName.search(/^la/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 35)
                    .lineTo(10, 35)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 25)
                    .lineTo(10, 25)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 15)
                    .lineTo(10, 15)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 5)
                    .lineTo(10, 5)
                    .endStroke();
            }
            else if (octave === 2 && noteName.search(/^si/) !== -1) {
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 40)
                    .lineTo(10, 40)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 30)
                    .lineTo(10, 30)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 20)
                    .lineTo(10, 20)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 10)
                    .lineTo(10, 10)
                    .endStroke();
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(-10, 0)
                    .lineTo(10, 0)
                    .endStroke();
            }
            if (length < 4) {
                var direction = octave > 0 ? 1 : -1;
                var xPos = direction === 1 ? -5 : 5;
                var circleGraf = circle.graphics;
                circleGraf
                    .beginStroke("#000000")
                    .moveTo(xPos, 0)
                    .lineTo(xPos, direction * 40)
                    .endStroke();
            }
            this.screen.addChild(note);
            this.infos.actualX += this.infos.notesOffset;
            note.x = this.infos.actualX;
            note.y =
                this.infos.y + 60 - this.indexNotes[index] * 5 - octave * 7 * 5;
            this.createdNotes.push(note);
        };
        Screen00.prototype.deleteAllNotes = function () {
            for (var i = 0; i < this.createdNotes.length; i++) {
                this.screen.removeChild(this.createdNotes[i]);
                this.createdNotes[i].kill();
            }
            this.infos.actualX = 10;
        };
        Screen00.prototype.show = function (callback, data) {
            var _this = this;
            _super.prototype.show.call(this, function () {
                callback({ target: _this });
            }, data);
        };
        Screen00.prototype.kill = function () {
            if (this._killed)
                return;
            _super.prototype.kill.call(this);
        };
        return Screen00;
    }(ScreenFlashBase_1.default));
    exports.default = Screen00;
});
//# sourceMappingURL=Screen00.js.map