import ModuleType from "jx/core/presets/StageGameModule";
import Screen00 from "screens/Screen00";

export default class MainCtrl extends ModuleType {
	screens: any;
	commonLib: any;
	firstScreen: any;
	firstPhase: any;

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
		this._configure(this.dataObject);

		this.ccid({
			id: "screens",
			type: "ScreensManager",
			stage: this.stage,
			defaultTransition: "FadeBlackInOut",
		});

		this.screens.add({
			id: "intro",
			type: "ScreenVideo",
			rid: "INTRO",
			bgMusicVolPC: 0,
			stage: this.stage,
			onfinished: (evt) => {
				this.jx.dj.music.play({ id: "MUSIC" });
				this.screens.go("screen00");
			},
		});

		this.screens.add({
			id: "screen00",
			type: Screen00,
			stage: this.stage,
			onfinished: (evt) => {},
		});

		this.comps.initChildren(onInitialised);
	}

	/*******************************************************************************
	 * START
	 */
	start() {
		this.screens.go(this.firstScreen);
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

		this.stage.ratio = this.dataObject.ratio;

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
