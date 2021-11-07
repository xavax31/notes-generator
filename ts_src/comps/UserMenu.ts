import SimpleDOMView from "jx/comps/SimpleDOMView";
import ComboBox from "jx/comps/ComboBox";
import { presets } from "./presets";
import { gammes } from "./gammes";
import VisualComponentDOM from "jx/comps/visualcomponent/VisualComponentDOM";

export default class UserMenu extends SimpleDOMView {
	allNotesInfo: any[];
	onbtn: any;
	color: any;
	onchange: any;
	noteMin: any;
	random: any;
	tonique: any;
	gamme: any;
	noteMax: any;
	intervalMin: any;
	intervalMax: any;
	sceneName: any;
	sceneDesc: any;

	constructor(dataObject) {
		super(Object.assign({ scenes: null }, dataObject));

		this.addEventDispatcher("onchange", "onbtn");
	}

	/*******************************************************************************
	 * INIT
	 */
	_initSync() {
		super._initSync();

		this.view.addClass("user-menu");

		// this.width = this.dataObject.width;

		// this.background = this.cc({rid: "BACKGROUND", render: "DOM", alpha: 0.3, width: this.dataObject.width, height: this.dataObject.height});
		// this.addChild(this.background);

		// this.addButton({id:"prevBTN", label: "Prev", onclick: evt=>this._prevScene() });
		// this.addButton({id:"nextBTN", label: "Next", onclick: evt=>this._nextScene() });

		// this.addChild(this.ccid({id:"sceneName", type: "Text", render: "DOM", x: 2}));
		// this.sceneName.view.css("position", "relative");

		// this.addChild(this.ccid({id:"sceneDesc", type: "Text", render: "DOM", x: 2, width: 200}));
		// this.sceneDesc.view.find("#text").css("width", "150px");
		// this.sceneDesc.view.css("position", "relative");

		let notes = [
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
		let options = [];
		let index = 0;
		for (let i = 0; i < notes.length; i++) {
			options.push({
				id: String(index),
				desc: notes[i] + "-1",
			});
			index++;
		}
		for (let i = 0; i < notes.length; i++) {
			options.push({
				id: String(index),
				desc: notes[i],
			});
			index++;
		}
		for (let i = 0; i < notes.length; i++) {
			options.push({
				id: String(index),
				desc: notes[i] + "1",
			});
			index++;
		}
		for (let i = 0; i < notes.length; i++) {
			options.push({
				id: String(index),
				desc: notes[i] + "2",
			});
			index++;
		}
		console.log(options);
		this.allNotesInfo = options;

		let optionsPresets = presets.map((value) => {
			return { id: value.id, desc: value.desc, type: value.type };
		});

		this.addList({
			id: "tonique",
			description: "Tonique",
			direction: "horizontal",
			width: "100%",
			border: false,
			options: notes,
			selectedBackgroundColor: "#03A62C",
			selectedColor: "white",
			onchange: (evt) => {
				console.log(evt.target.value);
				this.noteMin.value = this.findNoteIndex(evt.target.value);
				this._refresh();
			},
		});

		this.addList({
			id: "gamme",
			description: "Gamme/Mode",
			width: "100%",
			height: "200px",
			selectedBackgroundColor: "#a9bf04",
			selectedColor: "black",
			options: gammes.map((value) => {
				return {
					id: value.id,
					desc:
						value.desc +
						" " +
						(value.pattern
							? "[" + value.pattern.join(", ") + "]"
							: ""),
					type: value.type,
				};
			}),
			onchange: (evt) => {
				console.log(evt.target.value);

				this._refresh();
			},
		});

		this.addComboBox({
			id: "preset",
			width: "100%",
			description: "Preset",
			options: optionsPresets,
			onchange: (evt) => {
				console.log(evt);

				let presetChoosen = presets.filter(
					(value) => evt.target.value === value.id
				);
				console.log(presetChoosen);

				this.setConfig(presetChoosen[0].params);

				this._refresh(true);
			},
		});

		this.addComboBox({
			id: "noteMin",
			description: "Note min",
			options,
			onchange: (evt) => {
				console.log(evt.target.value);

				this._refresh();
			},
		});
		this.addComboBox({
			id: "noteMax",
			description: "Note max",
			options,
			onchange: (evt) => {
				console.log(evt.target.value);

				this._refresh();
			},
			value: 47,
		});

		this.addComboBox({
			id: "random",
			description: "Random",
			options: ["oui", "non"],
			onchange: (evt) => {
				console.log(evt.target.value);

				this._refresh();
			},
			value: "non",
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
			onclick: (evt) => {
				this.onbtn.dispatch({ target: this, btnID: evt.target.id });
			},
		});
	}

	findNoteIndex(noteStr) {
		let id = Number(
			this.allNotesInfo.find((value) => value.desc === noteStr).id
		);
		console.log(noteStr, id);
		return id;
	}

	findNoteFromIndex(index: number) {
		let name = this.allNotesInfo.find((value) => value.id === index).desc;

		return name;
	}

	addNumberItem({
		id,
		x = 0,
		y = 0,
		description = "",
		min = 0,
		max = 0,
		step = 1,
		value = 0,
		parent = this,
	}) {
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
		item.onchange.add((evt) => {
			this._refresh();
		});

		parent.addChild(item);
		// item.width = this.dataObject.width;
		this[id] = item;
	}

	addButton({ id, label, onclick }) {
		this.addChild(
			this.ccid({
				id: id,
				label: label,
				type: "SimpleButton",
				render: "DOM",
				onclick: onclick,
			})
		);
		this[id].view.css("position", "relative");
		this[id].view.css("display", "block");
		this[id].view.css("marginTop", "10px");
		this[id].view.css("width", "100px");
	}

	addComboBox({
		id,
		options,
		onchange,
		description,
		value,
		width = "100px",
	}: {
		id: any;
		options: any;
		onchange: any;
		description: any;
		value?: any;
		width?: any;
	}) {
		let item = this.cc({
			type: ComboBox,
			render: "DOM",
			x: 0,
			y: 0,
			description,
			options,
		});
		item.view.find("#value").css("text-align", "left");
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
	}

	addList({
		id,
		options,
		onchange,
		description,
		value,
		width = "100px",
		height = "100%",
		direction = "vertical",
		border = true,
		selectedBackgroundColor = "black",
		selectedColor = "white",
	}: {
		id: any;
		options: any;
		onchange: any;
		description: any;
		value?: any;
		width?: any;
		height?: any;
		border?: boolean;
		direction?: "vertical" | "horizontal";
		selectedBackgroundColor?: string;
		selectedColor?: string;
	}) {
		// let item = {
		// 	isJXComponent: true,
		// 	view: $("<div></div>"),
		// };
		let item = this.cc({
			type: VisualComponentDOM,
			view: $("<div></div>"),
			render: "DOM",
			x: 0,
			y: 0,
			description,
			options,
		});

		item.view.css({
			height,
			overflow: "auto",
			// "scrollbar-color": "red",
			// "scrollbar-width": "none",
			display: direction === "vertical" ? "inline-block" : "block",
			padding: "3px",
		});

		if (border) {
			item.view.css({
				border: "1px solid #dddddd",
				borderRadius: "10px",
			});
		}

		item.refreshOptions = () => {
			item.view.empty();
			for (let j = 0; j < options.length; j++) {
				let option = options[j];
				if (typeof option === "string") {
					option = {
						id: option,
					};
				}
				let child = $(`<div>${option.desc || option.id}</div>`);
				child.css({
					fontFamily: "Comfortaa",
					fontSize: "12px",
					lineHeight: "20px",
					fontWeight: 700,
				});
				if (option.type !== "section") {
					child.on("click", () => {
						item.value = option.id;
						item.refreshOptions();
						onchange({ target: item });
					});
				} else {
					child.css("backgroundColor", "#222222");
					child.css("color", "white");
					child.css("padding", "5px");
				}

				if (direction === "horizontal") {
					let size = "20";
					child.css({
						display: "inline-block",
						padding: "2px",
						// margin: "1px",
						minWidth: size + "px",
						height: size + "px",
						borderRadius: size + "px",
						// backgroundColor: "red",
						textAlign: "center",
					});
				}

				if (option.id === item.value) {
					child.css("backgroundColor", selectedBackgroundColor);
					child.css("color", selectedColor);
				}
				item.view.append(child);
			}
		};

		item.refreshOptions();

		// item.view.find("#value").attr("size", 10);
		// item.view.find("#value").css("text-align", "left");
		// item.view.css("position", "relative");
		// item.view.css("display", "block");
		// item.view.css("text-align", "left");
		// item.view.css("marginBottom", "5px");
		// item.view.find("#value").css("width", width);
		// item.value = value;
		// item.onchange.add(onchange);
		this.addChild(item);
		// item.width = this.dataObject.width;
		this[id] = item;
	}

	addPaletteColor({ id, label, imgID, colorIndex = -1 }) {
		this.addChild(
			this.ccid({
				id: id,
				rid: imgID,
				render: "DOM",
				width: 40,
				height: 40,
				onclick: (evt) => {
					this.color = evt.target.colorIndex;
					this._refresh();
				},
			})
		);
		this[id].view.css("position", "relative");
		this[id].colorIndex = colorIndex;
	}

	_refresh(dueToPresetChange = false) {
		if (!dueToPresetChange) this["preset"].value = "custom";
		this.onchange.dispatch({ target: this });
	}

	getConfig() {
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
	}

	setConfig({
		random = false,
		tonique = "do",
		gamme = "chromatic",
		noteMin,
		noteMax,
		intervalMin = 1,
		intervalMax = 1,
	}) {
		console.log("setConfig", noteMin, noteMax);

		this.random.value = random ? "oui" : "non";
		this.gamme.value = gamme;
		this.tonique.value = tonique;
		this.noteMin.value = this.findNoteIndex(noteMin);
		this.noteMax.value = this.findNoteIndex(noteMax);
		this.intervalMin.value = intervalMin;
		this.intervalMax.value = intervalMax;
	}

	/*******************************************************************************
	 * START
	 */
	start() {}

	setInfo({ title = "", desc = "" }) {
		this.sceneName.text = title;
		this.sceneDesc.text = desc.replace(/\n/g, "<br>");
	}
}
