import ScreenBase from "src/screens/ScreenBase"


/**
* **Events:**
* - onfinished : fired when screen is completed.
 */
export default class ScreenFlashBase extends ScreenBase{

	constructor(dataObject) {
		super(Object.assign({
			stage: null,
			screenManager: null,
			screenName: null
		}, dataObject));

		this._config.rid = this._screenName + ".FLASHSCREEN.CONFIG";
	}


	kill() {
		if (this._killed) return;

		if (this.screen) {
			this.hide();
			this.screen = null;
		}
		this._lib = null;
		window[this._screenName] = null;
		window[this._screenName + "_images"] = null;

		super.kill();
	}


	/**
	 * init (async) screen (clipcjs)
	 * @param  {Function} callback 
	 */
	init(callback) { 
		this.jx.db.load({id: this._screenName + ".FLASHSCREEN.SCREEN"}, ()=>{
			this._lib = this.cc({rid: this._config.rid, stage: this.stage, exclude: [], 
				toFreeze: [], visible: false});
			super.init(callback);
		});
	}


	/**
	 * initScreen after this._lib (ClipCJS) is ready.
	 */
	_initScreen() {
		this.ccid({id: "screen", type:"Clip", view: this._lib.getMC("SCREEN")});
	}


	/**
	 * show screen
	 * @param  {Function} callback fired when screen is really displayed.
	 * @param  {any}   data     data to transmit to screen
	 */
	show(callback, data) {
		super.show(()=>{
			this.stage.addChild(this._lib);
			this._lib.visible = true;
			this._lib.unfreeze();

			callback({target: this});
		});
	}


	/**
	 * hide screen
	 */
	hide() {
		super.hide();
		this._lib.visible = false;
		this._lib.freeze();
		this.stage.removeChild(this._lib);
	}

}



