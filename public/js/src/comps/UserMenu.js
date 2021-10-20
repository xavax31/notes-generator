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
define(["require", "exports", "jx/comps/SimpleDOMView", "jx/comps/ComboBox", "./presets", "./gammes"], function (require, exports, SimpleDOMView_1, ComboBox_1, presets_1, gammes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserMenu = /** @class */ (function (_super) {
        __extends(UserMenu, _super);
        function UserMenu(dataObject) {
            var _this = _super.call(this, Object.assign({ scenes: null }, dataObject)) || this;
            _this.addEventDispatcher("onchange", "onbtn");
            return _this;
        }
        /*******************************************************************************
         * INIT
         */
        UserMenu.prototype._initSync = function () {
            var _this = this;
            _super.prototype._initSync.call(this);
            this.view.css("position", "absolute");
            this.view.css("padding", "3px");
            this.view.css("top", "40px");
            this.width = this.dataObject.width;
            // this.background = this.cc({rid: "BACKGROUND", render: "DOM", alpha: 0.3, width: this.dataObject.width, height: this.dataObject.height});
            // this.addChild(this.background);
            // this.addButton({id:"prevBTN", label: "Prev", onclick: evt=>this._prevScene() });
            // this.addButton({id:"nextBTN", label: "Next", onclick: evt=>this._nextScene() });
            // this.addChild(this.ccid({id:"sceneName", type: "Text", render: "DOM", x: 2}));
            // this.sceneName.view.css("position", "relative");
            // this.addChild(this.ccid({id:"sceneDesc", type: "Text", render: "DOM", x: 2, width: 200}));
            // this.sceneDesc.view.find("#text").css("width", "150px");
            // this.sceneDesc.view.css("position", "relative");
            var notes = [
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
            var options = [];
            var index = 0;
            for (var i = 0; i < notes.length; i++) {
                options.push({
                    id: String(index),
                    desc: notes[i] + "-1",
                });
                index++;
            }
            for (var i = 0; i < notes.length; i++) {
                options.push({
                    id: String(index),
                    desc: notes[i],
                });
                index++;
            }
            for (var i = 0; i < notes.length; i++) {
                options.push({
                    id: String(index),
                    desc: notes[i] + "1",
                });
                index++;
            }
            for (var i = 0; i < notes.length; i++) {
                options.push({
                    id: String(index),
                    desc: notes[i] + "2",
                });
                index++;
            }
            console.log(options);
            this.allNotesInfo = options;
            var optionsPresets = presets_1.presets.map(function (value) {
                return { id: value.id, desc: value.desc, type: value.type };
            });
            this.addComboBox({
                id: "preset",
                width: "400px",
                description: "Preset",
                options: optionsPresets,
                onchange: function (evt) {
                    console.log(evt);
                    var presetChoosen = presets_1.presets.filter(function (value) { return evt.target.value === value.id; });
                    console.log(presetChoosen);
                    _this.setConfig(presetChoosen[0].params);
                    _this._refresh(true);
                },
            });
            this.addComboBox({
                id: "tonique",
                description: "Tonique",
                options: notes,
                onchange: function (evt) {
                    console.log(evt.target.value);
                    _this._refresh();
                },
            });
            this.addComboBox({
                id: "gamme",
                description: "Gamme/Mode",
                width: "400px",
                options: gammes_1.gammes.map(function (value) {
                    return {
                        id: value.id,
                        desc: value.desc +
                            " " +
                            (value.pattern
                                ? "[" + value.pattern.join(", ") + "]"
                                : ""),
                        type: value.type,
                    };
                }),
                onchange: function (evt) {
                    console.log(evt.target.value);
                    _this._refresh();
                },
            });
            this.addComboBox({
                id: "noteMin",
                description: "Note min",
                options: options,
                onchange: function (evt) {
                    console.log(evt.target.value);
                    _this._refresh();
                },
            });
            this.addComboBox({
                id: "noteMax",
                description: "Note max",
                options: options,
                onchange: function (evt) {
                    console.log(evt.target.value);
                    _this._refresh();
                },
                value: 47,
            });
            this.addComboBox({
                id: "random",
                description: "Random",
                options: ["oui", "non"],
                onchange: function (evt) {
                    console.log(evt.target.value);
                    _this._refresh();
                },
                value: "oui",
            });
            // this.addNumberItem({id: "indexMin", description: "indexMin", min: 0, max:100, step: 1, value: 0});
            // this.addNumberItem({id: "indexMax", description: "indexMax", min: 0, max:100, step: 1, value: 20});
            this.addNumberItem({
                id: "intervalMin",
                description: "Interval Min (en 1/2 tons)",
                min: 0,
                max: 20,
                step: 1,
                value: 1,
            });
            this.addNumberItem({
                id: "intervalMax",
                description: "Interval Max (en 1/2 tons)",
                min: 0,
                max: 20,
                step: 1,
                value: 3,
            });
            // this.addNumberItem({id: "easing", description: "elasticité", min: 0, step: 0.1, value: 0.1});
            // this.addNumberItem({id: "factor", description: "factor", min: 0, step: 0.1, value: 0.8});
            // this.addNumberItem({id: "release", description: "temps de coulure après relachement souris", min: 0, step: 1, value: 200});
            // this.color = -1;
            // this.addPaletteColor({id: "tache1",label:"Vert",imgID: "tache1", colorIndex: 0});
            // this.addPaletteColor({id: "tache2",label:"Jaune",imgID: "tache2", colorIndex: 1});
            // this.addPaletteColor({id: "tache3",label:"Rouge",imgID: "tache3", colorIndex: 2});
            // this.addPaletteColor({id: "mix",label:"Mix",imgID: "tache1", colorIndex: -1});
            this.addButton({
                id: "generateBtn",
                label: "Générer",
                onclick: function (evt) {
                    _this.onbtn.dispatch({ target: _this, btnID: evt.target.id });
                },
            });
        };
        UserMenu.prototype.findNoteIndex = function (noteStr) {
            var id = Number(this.allNotesInfo.find(function (value) { return value.desc === noteStr; }).id);
            console.log(noteStr, id);
            return id;
        };
        UserMenu.prototype.findNoteFromIndex = function (index) {
            var name = this.allNotesInfo.find(function (value) { return value.id === index; }).desc;
            return name;
        };
        UserMenu.prototype.addNumberItem = function (_a) {
            var _this = this;
            var id = _a.id, _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.description, description = _d === void 0 ? "" : _d, _e = _a.min, min = _e === void 0 ? 0 : _e, _f = _a.max, max = _f === void 0 ? 0 : _f, _g = _a.step, step = _g === void 0 ? 1 : _g, _h = _a.value, value = _h === void 0 ? 0 : _h, _j = _a.parent, parent = _j === void 0 ? this : _j;
            var item = this.cc({
                type: "InputNumber",
                render: "DOM",
                x: x,
                y: y,
                description: description,
                min: min,
                max: max,
                step: step,
            });
            item.view.css("position", "relative");
            item.view.css("display", "block");
            item.view.css("marginBottom", "5px");
            item.view.find("#value").css("width", "100px");
            item.value = value;
            item.onchange.add(function (evt) {
                _this._refresh();
            });
            parent.addChild(item);
            // item.width = this.dataObject.width;
            this[id] = item;
        };
        UserMenu.prototype.addButton = function (_a) {
            var id = _a.id, label = _a.label, onclick = _a.onclick;
            this.addChild(this.ccid({
                id: id,
                label: label,
                type: "SimpleButton",
                render: "DOM",
                onclick: onclick,
            }));
            this[id].view.css("position", "relative");
            this[id].view.css("display", "block");
            this[id].view.css("marginTop", "10px");
            this[id].view.css("width", "100px");
        };
        UserMenu.prototype.addComboBox = function (_a) {
            var id = _a.id, options = _a.options, onchange = _a.onchange, description = _a.description, value = _a.value, _b = _a.width, width = _b === void 0 ? "100px" : _b;
            var item = this.cc({
                type: ComboBox_1.default,
                render: "DOM",
                x: 0,
                y: 0,
                description: description,
                options: options,
            });
            item.view.css("position", "relative");
            item.view.css("display", "block");
            item.view.css("text-align", "left");
            item.view.css("marginBottom", "5px");
            item.view.find("#value").css("width", width);
            item.value = value;
            item.onchange.add(onchange);
            this.addChild(item);
            // item.width = this.dataObject.width;
            this[id] = item;
        };
        UserMenu.prototype.addPaletteColor = function (_a) {
            var _this = this;
            var id = _a.id, label = _a.label, imgID = _a.imgID, _b = _a.colorIndex, colorIndex = _b === void 0 ? -1 : _b;
            this.addChild(this.ccid({
                id: id,
                rid: imgID,
                render: "DOM",
                width: 40,
                height: 40,
                onclick: function (evt) {
                    _this.color = evt.target.colorIndex;
                    _this._refresh();
                },
            }));
            this[id].view.css("position", "relative");
            this[id].colorIndex = colorIndex;
        };
        UserMenu.prototype._refresh = function (dueToPresetChange) {
            if (dueToPresetChange === void 0) { dueToPresetChange = false; }
            if (!dueToPresetChange)
                this["preset"].value = "custom";
            this.onchange.dispatch({ target: this });
        };
        UserMenu.prototype.getConfig = function () {
            console.log("this.noteMin.value", this.noteMin.value);
            return {
                random: this.random.value === "oui",
                tonique: this.tonique.value,
                gamme: this.gamme.value,
                noteMin: this.findNoteFromIndex(this.noteMin.value),
                // indexMin: Number(this.indexMin.value),
                noteMax: this.findNoteFromIndex(this.noteMax.value),
                intervalMin: Number(this.intervalMin.value),
                intervalMax: Number(this.intervalMax.value),
            };
        };
        UserMenu.prototype.setConfig = function (_a) {
            var _b = _a.random, random = _b === void 0 ? false : _b, _c = _a.tonique, tonique = _c === void 0 ? "do" : _c, _d = _a.gamme, gamme = _d === void 0 ? "chromatic" : _d, noteMin = _a.noteMin, noteMax = _a.noteMax, _e = _a.intervalMin, intervalMin = _e === void 0 ? 1 : _e, _f = _a.intervalMax, intervalMax = _f === void 0 ? 1 : _f;
            console.log("setConfig", noteMin, noteMax);
            this.random.value = random ? "oui" : "non";
            this.gamme.value = gamme;
            this.tonique.value = tonique;
            this.noteMin.value = this.findNoteIndex(noteMin);
            this.noteMax.value = this.findNoteIndex(noteMax);
            this.intervalMin.value = intervalMin;
            this.intervalMax.value = intervalMax;
        };
        /*******************************************************************************
         * START
         */
        UserMenu.prototype.start = function () { };
        UserMenu.prototype.setInfo = function (_a) {
            var _b = _a.title, title = _b === void 0 ? "" : _b, _c = _a.desc, desc = _c === void 0 ? "" : _c;
            this.sceneName.text = title;
            this.sceneDesc.text = desc.replace(/\n/g, "<br>");
        };
        return UserMenu;
    }(SimpleDOMView_1.default));
    exports.default = UserMenu;
});
//# sourceMappingURL=UserMenu.js.map