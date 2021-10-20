import Component from "jx/core/comps/Component"


/**
* **Events:**
* - onfinished : fired when screen is completed.
 */
export default class ScreenBase extends Component{

	constructor(dataObject) {
		super(Object.assign({
			stage: null,
			screenManager: null,
			screenName: null
		}, dataObject));


		/** @type {StageView} */
		this.stage = this.dataObject.stage || this.jx.app.stage;
		/** @type {ScreenManager} */
		this.screenManager = this.dataObject.screenManager || this.jx.app.screens;
		/** @type {String} */
		this._screenName = this.dataObject.screenName;

		this.notInit = true;

		this.addEventDispatcher("onfinished");
		if (this.dataObject.onfinished) this.onfinished.add(this.dataObject.onfinished);

		this._config = {
		};

		//-- get screen config in json
		let jsonConfig = this.jx.db.getParameter(this._screenName + ".Configuration");
		if (jsonConfig)  Object.assign(this._config, jsonConfig);

		this._declareProperties();
	}


	_declareProperties() {
	}


	kill() {
		if (this._killed) return;

		if (this.screen) {
			this.hide();
			this.screen = null;
		};

		this.onfinished.removeAll();
		this.stage = null;
		this.onfinished = null;
		this.screenManager = null;
		super.kill();
	}


	/**
	 * init (async) screen (clipcjs)
	 * @param  {Function} callback 
	 */
	init(callback) { 
		this.comps.initChildren( ()=>{
				this._initScreen(); 
				callback();
		});
	}


	/**
	 * initScreen after this._lib (ClipCJS) is ready.
	 */
	_initScreen() {

	}


	/**
	 * show screen
	 * @param  {Function} callback fired when screen is really displayed.
	 * @param  {any}   data     data to transmit to screen
	 */
	show(callback, data) {
		callback({target: this});
	}


	/**
	 * hide screen
	 */
	hide() {
	}

}



