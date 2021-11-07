import SimpleDOMView from "jx/comps/SimpleDOMView";
import TextDOM from "jx/comps/text/TextDOM";
import ModuleType from "jx/core/presets/GameModule";
import StageView from "jx/comps/StageView";
import Screen00 from "screens/Screen00";
import UserMenu from "comps/UserMenu";

export default class MainCtrl extends ModuleType {
	stage: SimpleDOMView;
	title: TextDOM;
	screens: any;
	commonLib: any;
	firstScreen: any;
	firstPhase: any;
	menu: UserMenu;
	canvas1: StageView;

	constructor(dataObject) {
		super(
			Object.assign(
				{
					stageWidth: 1280,
					ratio: 16 / 9,
					screen: "screen00",
					helper: false,
					blockMobileScroll: false,
					blockMobileContextualMenu: false,
					delayAfterClick: false,
					flashQuality: "good",
					commonFlaLib: false,
				},
				dataObject
			)
		);
	}

	_onBeforeLoad(callback) {
		callback();
	}

	/*******************************************************************************
	 * INIT
	 */
	init(onInitialised) {
		// this._configure(this.dataObject);

		// this.stage = this.cc({ type: "SimpleDOMView" });
		// this.stage.width = 300;
		// this.stage.view.addClass("main-dom-view");

		// var background = this.cc({
		// 	id: "BACKGROUND",
		// 	render: "DOM",
		// 	resourceID: "BACKGROUND",
		// });
		//this.stage.addChild(background);

		// this.menu = this.cc({ type: UserMenu, width: 500, height: 700 });
		// this.stage.addChild(this.menu);
		// this.hoursNum = this.cc({
		// 	type: "InputNumber",
		// 	render: "DOM",
		// 	y: 100,
		// 	description: "Nombre d'heures d'utilisation. (24h x 365 j = 8760)",
		// });
		// this.hoursNum.value = 9000;
		// this.hoursNum.onchange.add((evt) => {
		// 	this._formule();
		// });
		// this.stage.addChild(this.hoursNum);
		// this.hoursNum.width = 100;
		this.canvas1 = this.cc({
			type: StageView,
			width: 200,
			height: 100,
			ratio: 16 / 9,
			fixedStageScale: false,
		});

		this.ccid({
			id: "screens",
			type: "ScreensManager",
			stage: this.canvas1,
			defaultTransition: "FadeBlackInOut",
		});

		// this.screens.add({
		// 	id: "intro",
		// 	type: "ScreenVideo",
		// 	rid: "INTRO",
		// 	bgMusicVolPC: 0,
		// 	stage: this.stage,
		// 	onfinished: (evt) => {
		// 		this.jx.dj.music.play({ id: "MUSIC" });
		// 		this.screens.go("screen00");
		// 	},
		// });

		this.screens.add({
			id: "screen00",
			type: Screen00,
			stage: this.canvas1,
			onfinished: (evt) => {},
		});

		this.comps.initChildren(onInitialised);
	}

	/*******************************************************************************
	 * START
	 */
	start() {
		this.canvas1.canvasHolder.addClass("partition");
		this.canvas1.canvasHolder.css({ position: "inherit" });

		this.screens.go("screen00");
		// this.jx.dj.music.play({id:"MUSIC"});
	}

	_configure({
		helper = false,
		blockMobileScroll = false,
		blockMobileContextualMenu = false,
		delayAfterClick = false,
		flashQuality = "good",
		commonFlaLib = false,
		screen = "intro",
	}) {
		if (helper)
			this.jx.helper = this.cc({ type: Helper, stage: this.stage });

		if (blockMobileContextualMenu)
			$("body").css("-webkit-touch-callout", "none");

		if (blockMobileScroll) {
			document.ontouchmove = function (e) {
				e.preventDefault();
			};
		}

		if (delayAfterClick) this.jx.config.app.lockDelayAfterClick = 250;

		this.jx.config.flashOptimizer.quality = flashQuality;

		// this.stage.ratio = this.dataObject.ratio;

		if (commonFlaLib)
			this.commonLib = this.jx.db.findOne({
				id: "COMMON_LIB.SCREEN",
			}).data;

		this._getFirstScreenAndPhase({ firstScreen: screen });
	}

	/**
	 * get the first screen and phase
	 */
	_getFirstScreenAndPhase({ firstScreen }) {
		let screenShortcut = (
			this.jx.config.urlParams.screen || firstScreen
		).split("."); // priority to screen passed as argument in url (&screen="screenID");
		this.firstScreen = screenShortcut[0];
		this.firstPhase = screenShortcut.length > 1 ? screenShortcut[1] : null;
	}
}
