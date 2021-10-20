import ScreenFlashBase from "screens/ScreenFlashBase";
import ShapeCJS from "jx/comps/shape/ShapeCJS";
import ContainerCJS from "jx/comps/container/ContainerCJS";
import TextCJS from "jx/comps/text/TextCJS";
import UserMenu from "comps/UserMenu";
import { gammes } from "comps/gammes";

/**
 */
export default class Screen00 extends ScreenFlashBase {
	notes = [
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
	indexNotes = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
	modesPatterns: { [key: string]: number[] };

	shape: ShapeCJS;
	modePatternText: TextCJS;
	infos = {
		y: 100,
		actualX: 10,
		notesOffset: 30,
	};
	createdNotes = [];
	menu: UserMenu;
	generationConfig = {
		random: true,
		gamme: "chromatic",
		tonique: "do",
		noteMin: "mi-1",
		noteMax: "do2",
		intervalMin: 1,
		intervalMax: 3,
	};
	currentMode = null;

	constructor(dataObject) {
		super(Object.assign({ screenName: "SCREEN_00" }, dataObject));
	}

	createMode(pattern: number[], startNote) {
		console.log(
			"createmode",
			pattern,
			startNote,
			this.notes.indexOf(startNote),
			this.notes[this.notes.indexOf(startNote)]
		);

		let index = this.notes.indexOf(startNote);
		let result = [this.notes[index]];
		console.log("this.notes[index]", this.notes[index]);

		let newIndex;
		for (let i = 0; i < pattern.length - 1; i++) {
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
	}

	init(callback) {
		super.init(() => {
			callback();
		});
	}

	_initScreen() {
		super._initScreen();

		this.modesPatterns = {};
		for (let i = 0; i < gammes.length; i++) {
			const gamme = gammes[i];
			if (gammes[i].pattern) {
				this.modesPatterns[gamme.id] = [...gammes[i].pattern];
			}
		}

		this.modePatternText = this.cc({
			type: TextCJS,
			text: "2-2-3-2-1-2",
			style: { fontSize: 20 },
		});
		this.modePatternText.x = 20;
		this.screen.addChild(this.modePatternText);
		console.log("aaa");

		this.shape = this.cc({
			type: ShapeCJS,
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

		this.menu = this.cc({ type: UserMenu, width: 300, height: 400 });
		this.menu.onchange.add((evt) => {
			console.log(evt);
			this.generationConfig = { ...this.menu.getConfig() };
			this.generateRandomSequence();
		});

		this.menu.onbtn.add((evt) => {
			console.log(evt);
			switch (evt.btnID) {
				case "generateBtn":
					this.generateRandomSequence();
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
	}

	generateRandomSequence() {
		console.log(this.modesPatterns);
		if (this.generationConfig.gamme !== "chromatic") {
			this.currentMode = this.createMode(
				this.modesPatterns[this.generationConfig.gamme],
				this.generationConfig.tonique
			);
			this.modePatternText.text =
				this.modesPatterns[this.generationConfig.gamme].join(" ");
		} else {
			this.currentMode = null;
			this.modePatternText.text = "";
		}
		console.log("Mode", this.currentMode);

		this.deleteAllNotes();
		let notes = [];
		let indexMin = this.menu.findNoteIndex(this.generationConfig.noteMin);
		let indexMax = this.menu.findNoteIndex(this.generationConfig.noteMax);
		console.log("indexLimits", indexMin, indexMax);

		let currentIndex = -1;

		for (let i = 0; i < this.notes.length; i++) {
			currentIndex++;
			if (currentIndex < indexMin || currentIndex > indexMax) continue;
			if (
				this.currentMode &&
				this.currentMode.indexOf(this.notes[i]) === -1
			)
				continue;

			notes.push({
				note: this.notes[i],
				octave: -1,
			});
		}
		for (let i = 0; i < this.notes.length; i++) {
			currentIndex++;
			if (currentIndex < indexMin || currentIndex > indexMax) continue;
			if (
				this.currentMode &&
				this.currentMode.indexOf(this.notes[i]) === -1
			)
				continue;
			notes.push({
				note: this.notes[i],
				octave: 0,
			});
		}
		for (let i = 0; i < this.notes.length; i++) {
			currentIndex++;
			if (currentIndex < indexMin || currentIndex > indexMax) continue;
			if (
				this.currentMode &&
				this.currentMode.indexOf(this.notes[i]) === -1
			)
				continue;
			notes.push({
				note: this.notes[i],
				octave: 1,
			});
		}
		for (let i = 0; i < this.notes.length; i++) {
			currentIndex++;
			if (currentIndex < indexMin || currentIndex > indexMax) continue;
			if (
				this.currentMode &&
				this.currentMode.indexOf(this.notes[i]) === -1
			)
				continue;
			notes.push({
				note: this.notes[i],
				octave: 2,
			});
		}
		console.log("notes", notes);

		let index = this.generationConfig.random
			? Math.floor(Math.random() * (notes.length - 1))
			: 0;
		// let index = Math.floor(notes.length/2);
		console.log("INDEX", index);

		let direction = Math.random() > 0.5 ? 1 : -1;
		let notesMax = 40;

		let intervalID = setInterval(() => {
			// this.deleteAllNotes();
			// console.log("NOTE index", index, notes.length, this.generationConfig.intervalMin, this.generationConfig.intervalMax);

			let note = notes[index];
			this.addNote(note.note, note.octave);

			if (this.generationConfig.random) {
				direction = Math.random() > 0.5 ? 1 : -1;
				let offset = this.jx.tools.math.randomValue(
					this.generationConfig.intervalMin,
					this.generationConfig.intervalMax
				);

				let newIndex = index + direction * offset;
				console.log(
					"offset:",
					offset,
					"direction:",
					direction,
					"newIndex:",
					newIndex
				);

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

	drawLine(y) {
		let start = 0;
		let end = 1280;
		let graphic: createjs.Graphics = this.shape.graphics;
		graphic
			.beginStroke("#000000")
			.moveTo(start, y)
			.lineTo(end, y)
			.endStroke();
	}

	addNote(noteName, octave = 0, length = 1) {
		let index = this.notes.indexOf(noteName);

		let filled = length > 1 ? false : true;

		let note: ContainerCJS = this.cc({ type: ContainerCJS });

		let colorNote = "black";
		if (this.generationConfig.tonique === noteName) {
			colorNote = "#00AA00";
		}
		let circle: ShapeCJS = this.cc({
			type: ShapeCJS,
			shapeType: "circle",
			radius: 5,
			borderColor: colorNote,
			color: filled ? colorNote : "rgba(0,0,0,0)",
			borderWidth: 2,
		});

		note.addChild(circle);

		if (noteName.search("#") !== -1) {
			let text: TextCJS = this.cc({ type: TextCJS, text: "#" });
			text.x = -15;
			text.y = -5;
			note.addChild(text);
		}

		if (octave === 0 && (index === 0 || index === 1)) {
			// do
			let circleGraf: createjs.Graphics = circle.graphics;
			circleGraf
				.beginStroke("#000000")
				.moveTo(-10, 0)
				.lineTo(10, 0)
				.endStroke();
		} else if (octave === -1 && noteName.search(/^si/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
			circleGraf
				.beginStroke("#000000")
				.moveTo(-10, -5)
				.lineTo(10, -5)
				.endStroke();
		} else if (octave === -1 && noteName.search(/^la/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === -1 && noteName.search(/^sol/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === -1 && noteName.search(/^fa/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === -1 && noteName.search(/^mi/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === 1 && noteName.search(/^la/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
			circleGraf
				.beginStroke("#000000")
				.moveTo(-10, 0)
				.lineTo(10, 0)
				.endStroke();
		} else if (octave === 1 && noteName.search(/^si/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
			circleGraf
				.beginStroke("#000000")
				.moveTo(-10, 5)
				.lineTo(10, 5)
				.endStroke();
		} else if (octave === 2 && noteName.search(/^do/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === 2 && noteName.search(/^ré/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === 2 && noteName.search(/^mi/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === 2 && noteName.search(/^fa/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === 2 && noteName.search(/^sol/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === 2 && noteName.search(/^la/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
		} else if (octave === 2 && noteName.search(/^si/) !== -1) {
			let circleGraf: createjs.Graphics = circle.graphics;
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
			let direction = octave > 0 ? 1 : -1;
			let xPos = direction === 1 ? -5 : 5;
			let circleGraf: createjs.Graphics = circle.graphics;
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
	}

	deleteAllNotes() {
		for (let i = 0; i < this.createdNotes.length; i++) {
			this.screen.removeChild(this.createdNotes[i]);
			this.createdNotes[i].kill();
		}
		this.infos.actualX = 10;
	}

	show(callback, data) {
		super.show(() => {
			callback({ target: this });
		}, data);
	}

	kill() {
		if (this._killed) return;
		super.kill();
	}
}
