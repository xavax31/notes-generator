BayamFrontCom.version = '1.0.3';

/**
* Communication Api for Bayam games being displayed on AppBayam.
* Games communicate to container via this API and register to push/receive events

-----------------
Visual Guidelines
-----------------
Bayam always display a close button on the upper left corner, and a favorite and chrono indicator on the upper right corner
You must leave these areas free of interactive UIS when the game opens up, on the splash screen for instance.
If you wish, you can call the methods on the other states of you game, to free these areas of Bayam main buttons :
comm.sendHideCloseButtonRequest and comm.sendShowCloseButtonRequest
Keep in main to make it easy for the user to exit your game at any point

-----------------
Coding guidelines
-----------------
1-You MUST NOT handle window.onBlur because some devices will set the iFrame to blur state when global UIS is pressed.
Instead, you may want to implement and handle pause/resume using the Front Com API
Ex:
comm.onPause(onPause);
comm.onResume(onResume);
2-You must cleanup all of your game listener and persistant larg object when the game closes.
To do so, listen to the onCloseRequest event, cleanup and destroy any persistant object, and the call the closeRequest event
Ex: 
function onClose()
{
	// cleanup and destroy and then request real close:
	comm.sendCloseFinalizedRequest();
}
// init
comm.onClose(onClose);
------------
Instructions
------------

Initialize:
var gameId = 'yourUniqueIdHere';
var comm = new BayamFrontCom(gameId);  // instanciate the Api once, as part of your init routine

USAGE CODE EXAMPLES:
----------------------------
1-Save custom key/value pair
----------------------------
// evt is an instance of BayamFrontComAnswerEvent
// evt.type 		: Ex: BayamFrontCom.EVT_KEYVALUE_SEND 			= 'evtKeyValueSend';
function onSuccessSend(evt)
{
	console.log('onSuccessSend '+evt.type);
}

// evt is an instance of BayamFrontComAnswerEvent
// useful properties of evt :
// evt.errorId = errorId;		: Ex: BayamFrontComAnswerEvent.ERROR_SERVER 	= 'SERVER_ERROR';
// evt.type 					: Ex: BayamFrontCom.EVT_KEYVALUE_SEND 			= 'evtKeyValueSend';
function onFailSend(evt)
{
	console.log('fail '+evt.type);
}

comm.sendKeyValue('level', 2, onSuccessSend, onFailSend);

---------------------------
2-Get custom key/value pair
---------------------------
// evt is an instance of BayamFrontComAnswerEvent
// useful properties of evt when succeed :
// evt.data 		: contains data when applies
// evt.type 		: Ex: BayamFrontCom.EVT_KEYVALUE_GET 			= 'evtKeyValueGet';
function onSuccessGetKey(evt)
{
	console.log('success '+evt.type);
	var levelId = evt.data;
	if(!levelId)
		levelId = 1; // default
	$('#level-field').val(levelId);
}

// evt is an instance of BayamFrontComAnswerEvent
// useful properties of evt :
// evt.errorId = errorId;		: Ex: BayamFrontComAnswerEvent.ERROR_NOT_FOUND 	= 'NOT_FOUND';
// evt.type 					: Ex: BayamFrontCom.EVT_KEYVALUE_GET 			= 'evtKeyValueGet';
function onFailGetKey(evt)
{
	console.log('fail '+evt.type);
}

comm.getKeyValue('level', onSuccessGetKey, onFailGetKey); // getKeyValue to fetch profile last saved value of key 'level'

--------------------------------------------
3-Be notified when app needs to PAUSE/RESUME
--------------------------------------------
// evt is an instance of BayamFrontComAnswerEvent
function onPause(evt)
{
	// my pausing routine here
}

function onResume(evt)
{
	// my resume routine here
}

// register once for receiving pause/resume event as part of your init routine
comm.onPause(onPause);
comm.onResume(onResume);

----------------------------------------------------------------------------------------------
4-Register to receive request CLOSING in order to finalize any operation before really closing
----------------------------------------------------------------------------------------------
IMPORTANT: when you register to receive the close request, the app will wait to receive the call "comm.sendCloseFinalizedRequest();"
before really closing the game so you must send "comm.sendCloseFinalizedRequest();" when you are done doing your closing routine.
NOTE: it is not required that you use this process, you may not care to be noticed for closing request.

function onClose()
{
	// do my closing routine, ex: send current 'level' value via comm.sendKeyValue(...);
	// after everything is done, you MUST send :

	// here using timeout to mimic async call, this is not implementation instruction, just some asyc process
	setTimeout(function(){
		
		comm.sendCloseFinalizedRequest(); // IMPORTANT TO FINALIZE BY SENDING THIS CALL TO THE API
	},1000);
}

// register once for receiving CLOSE request, as part of your init routine
comm.onClose(onClose);

---------------------------------------------------
5-Send close request, triggered by user or gameflow
---------------------------------------------------
It is possible your game has a close button, or wants to close after some final animation.
Use this call to start the closing process, as if it was done by the app.

comm.sendCloseRequest(); // close request sent to container

NOTE: If you registered to receive the closing request, you will get notified and everything will work as described in section 4.


------------------------------------------------------------------------------------------------------------
6-Register to receive READY event (triggered when iFrame is ready after fade in) and get client context info
------------------------------------------------------------------------------------------------------------

function onReady(event)
{
	var clientContext = event.data; //ex: {support:desktop/mobile/browser, volume:0.5, useragent:(navigator.userAgent), platform:(navigator.userAgent), age:3}
	// startMyGame();
}

// register once for receiving READY request, as part of your init routine
// You will receive an event as a param of your callback fct, with data clientContext: ex: {support:desktop/mobile/browser, useragent:(navigator.userAgent), platform:(navigator.userAgent), age:3} 
comm.onReady(onReady);


----------------------------------------------------------------------------------------------
7-Register to receive ANDROID Back button pressed event (triggered when user pressed the home button of android)
----------------------------------------------------------------------------------------------

function onAndroidBackButtonPressed()
{
	// do something, ex: close popup
}

// register once for receiving all android back button pressed event
comm.onAndroidBackBtnPressed(onAndroidBackButtonPressed);

----------------------------------------------------------------------------------------------
8-Register to receive VOLUME CHANGE event
----------------------------------------------------------------------------------------------

function onVolumeChange(event)
{
	var volume = event.data; // ex: 0.2 (float)
	// setMyVolume(volume);
}

// register once for receiving READY request, as part of your init routine
comm.onVolumeChange(onVolumeChange);


---------------------------------------------------
9-Send a request to hide the Bayam close button
---------------------------------------------------
Use this call when you wish to hide the close button that is over your game.
For example, when your game goes into play mode and there is a back button on top left.
Do not forget to show it again using comm.sendShowCloseButtonRequest() when your game goes back to splash screen.

comm.sendHideCloseButtonRequest(); // request to hide the Bayam close button

---------------------------------------------------
10-Send a request to show the Bayam close button
---------------------------------------------------
Use this call when you wish to show the close button that you previously hid.

comm.sendShowCloseButtonRequest(); // request to show the Bayam close button

------------------
11-Send a creation (JUST FOR ATELIER ACTIVITIES: dessin, taomix, coloriage, carterie
------------------
Creation games have the right to send a creation that will end up in the creations page

base64imgStr is an image to be sent and it will serve as a thumbnail in the creations page. Size recommanded: 1024 X 768.
descriptorTxt should be a json or xml description file to play back the creation (OPTIONAL if creation is image only)

comm.sendCreation(base64imgStr, descriptorTxt, callbackSuccess, callbackFail);

*/

var bfcIsInIFrame = (window.top.location != window.location);
var pendingEvtCallbacks = [];

function onHandleResponse(message)
{   
    var bayamFrontComAnswerEvent = message.data;
    if(bayamFrontComAnswerEvent.type == BayamFrontCom.CONTAINER_INFO)
    {
    	// container info
    	var contentInfo = bayamFrontComAnswerEvent.data;
    	BayamFrontCom.containerInfo = contentInfo;
    	return;
    }

    for(var i in pendingEvtCallbacks)
    {
    	var evtCallbacks = pendingEvtCallbacks[i];
    	var bayamComEvent = evtCallbacks.bayamComEvent;
    	var isCurrent = (bayamComEvent.uniqueId == bayamFrontComAnswerEvent.uniqueId);
    	var isPauseResume = (bayamComEvent.type == BayamFrontCom.EVT_PAUSE) || (bayamComEvent.type == BayamFrontCom.EVT_RESUME);
    	var isVolumeChange = (bayamComEvent.type == BayamFrontCom.EVT_VOLUME_CHANGE);
    	var isGenericGameEvent = (bayamComEvent.type == BayamFrontCom.EVT_GENERIC_GAME_EVENT);
		var isAsyncClose = (bayamComEvent.type == BayamFrontCom.EVT_CLOSE);
    	var isAsyncReady = (bayamComEvent.type == BayamFrontCom.EVT_READY);
    	var isAsyncAndroidBackBtnPressed = (bayamComEvent.type == BayamFrontCom.EVT_ANDROID_BACK_BTN_PRESSED);
    	if(isPauseResume || isVolumeChange || isGenericGameEvent || isAsyncClose || isAsyncReady || isAsyncAndroidBackBtnPressed)
    		isCurrent = (bayamComEvent.type == bayamFrontComAnswerEvent.type);
    	if(isCurrent)
    	{
    		if(bayamFrontComAnswerEvent.success)
    		{
    			if(evtCallbacks.callbackSuccess)
    				evtCallbacks.callbackSuccess(bayamFrontComAnswerEvent);
    		}
    		else
    		{
    			if(evtCallbacks.callbackFail)
    				evtCallbacks.callbackFail(bayamFrontComAnswerEvent);
    		}
    		if(isCurrent && !isPauseResume && !isVolumeChange && !isGenericGameEvent && !isAsyncAndroidBackBtnPressed)
    			pendingEvtCallbacks.splice(i, 1);
    		break;
    	}
    }
};

if(bfcIsInIFrame)
{
	window.addEventListener('message', onHandleResponse);
	/*
	window.onfocus = function()
	{
		
		// timeout to override pause event received by host
		setTimeout(function(){
			// send resume event
	      	var uniqueId = 10; // some value
	      	var success = true;
	      	var bayamFrontComAnswerEvt = new BayamFrontComAnswerEvent(
						BayamFrontCom.EVT_RESUME, 
						uniqueId,
						success
					);
			var message = {};
			message.data = bayamFrontComAnswerEvt;
			onHandleResponse(message);
		},70);
    };

    window.onblur = function()
	{
		// timeout to override pause event received by host
		setTimeout(function(){
			// send pause event
	      	var uniqueId = 10; // any value, not relevant for pause/resume events
	      	var success = true;
	      	var bayamFrontComAnswerEvt = new BayamFrontComAnswerEvent(
						BayamFrontCom.EVT_PAUSE, 
						uniqueId,
						success
					);

			var message = {};
			message.data = bayamFrontComAnswerEvt;
			onHandleResponse(message);
		},50);

    };*/
}
else
{
	// simulate onReady event
	setTimeout(function(){
		// send resume event
      	var uniqueId = 10; // some value
      	var success = true;
      	var bayamFrontComAnswerEvt = new BayamFrontComAnswerEvent(
					BayamFrontCom.EVT_READY, 
					uniqueId,
					success
				);
		var message = {};
		message.data = bayamFrontComAnswerEvt;
		onHandleResponse(message);
	},500);
}

BayamFrontComAnswerEvent.ERROR_ID_NOT_EMBEDED 	= 'GAME_NOT_EMBEDED';
BayamFrontComAnswerEvent.ERROR_NOT_FOUND 	= 'NOT_FOUND';
BayamFrontComAnswerEvent.ERROR_SERVER 		= 'SERVER_ERROR';

BayamFrontCom.EVT_READY							= 'evtReady';
BayamFrontCom.EVT_CLOSE							= 'evtClose';
BayamFrontCom.EVT_CLOSE_FINALIZED				= 'evtCloseFinalized';
BayamFrontCom.EVT_CLOSE_REQUEST					= 'evtCloseRequest';
BayamFrontCom.EVT_HIDE_CLOSE_BUTTON_REQUEST		= 'evtHideCloseButtonRequest';
BayamFrontCom.EVT_SHOW_CLOSE_BUTTON_REQUEST		= 'evtShowCloseButtonRequest';
BayamFrontCom.EVT_KEYVALUE_SEND					= 'evtKeyValueSend';
BayamFrontCom.EVT_KEYVALUE_GET					= 'evtKeyValueGet';
BayamFrontCom.EVT_CREATION_SEND					= 'evtCreationSend';
BayamFrontCom.EVT_CREATION_GET					= 'evtCreationGet';
BayamFrontCom.EVT_PAUSE							= 'evtPause';
BayamFrontCom.EVT_RESUME						= 'evtResume';
BayamFrontCom.EVT_VOLUME_CHANGE					= 'evtVolumeChange';
BayamFrontCom.EVT_ANDROID_BACK_BTN_PRESSED 		= 'evtAndroidBack';
// send any custom data to Bayam game
BayamFrontCom.EVT_SEND_CUSTOM_DATA				= 'evtSendCustomData';
// returned event, must register (onGenericGameEvent) to receive these generic events
BayamFrontCom.EVT_GENERIC_GAME_EVENT			= 'evtGenericGameEvent'; // for flexibility, we have added this free to use event to communicate any custom event to contents

// Special constants & variables
BayamFrontCom.CONTAINER_INFO					= 'containerInfo'; // sent on load and kept as global variable BayamFrontCom.containerInfo
BayamFrontCom.containerInfo			= new ContainerInfo();

function BayamFrontCom(gameId)
{
	this.gameId = gameId;
	var sendEvent = function(bayamComEvent, callbackSuccess, callbackFail)
	{
		var evtCallbacks = new EventCallbacks(bayamComEvent, callbackSuccess, callbackFail);
		pendingEvtCallbacks.push(evtCallbacks);
		
		if(bfcIsInIFrame)
		{
			try
			{
				window.top.postMessage(bayamComEvent, '*');
			}
			catch(e)
			{
				console.log('Error post message:'+e)
			}
		}
		else
		{
			// if not in iFrame, send a fail event if requested
			if(callbackFail)
			{
				var success = false;
				var errorId = BayamFrontComAnswerEvent.ERROR_ID_NOT_EMBEDED;
				var bayamFrontComAnswerEvent = new BayamFrontComAnswerEvent(
					bayamComEvent.type, 
					bayamComEvent.uniqueId, 
					success, 
					errorId
				); //type, callbackSuccess, callbackFail, success, errorId, data
				var message = {};
				message.data = bayamFrontComAnswerEvent;
				onHandleResponse(message);
			}
		}	
		
	}

	/**
	 * Sends a request to hide Bayam close button
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.sendHideCloseButtonRequest = function(callbackSuccess, callbackFail)
	{
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_HIDE_CLOSE_BUTTON_REQUEST);
		sendEvent(evt, callbackSuccess, callbackFail);
	}
	/**
	 * Sends a request to show Bayam close button
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.sendShowCloseButtonRequest = function(callbackSuccess, callbackFail)
	{
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_SHOW_CLOSE_BUTTON_REQUEST);
		sendEvent(evt, callbackSuccess, callbackFail);
	}
	/**
	 * Sends a close request event to Bayam container
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.sendCloseRequest = function(callbackSuccess, callbackFail)
	{
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_CLOSE_REQUEST);
		sendEvent(evt, callbackSuccess, callbackFail);
	}
        
	

	/**
	 * Sends a close finalized request event to Bayam container
	 * This happens after a close request, when game has finished doing the closing procedure
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.sendCloseFinalizedRequest = function(callbackSuccess, callbackFail)
	{
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_CLOSE_FINALIZED);
		sendEvent(evt, callbackSuccess, callbackFail);
	}

	/**
	 * Sends a key and a value for saving
	 * @param {String} key REQUIRED
	 * @param {String} value REQUIRED
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.sendKeyValue = function(key, value, callbackSuccess, callbackFail)
	{
		if(!key)
			throw new Error('BayamFrontCom::sendKeyValue : key is required!');
		var evt = new BayamFrontComKeyValueSendEvent(BayamFrontCom.EVT_KEYVALUE_SEND, key, value);
		sendEvent(evt, callbackSuccess, callbackFail);
	}

	
	/**
	 * Requests the last saved value for given key
	 * @param {String} gameid REQUIRED
	 * @param {String} key REQUIRED
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.getKeyValue = function(key, callbackSuccess, callbackFail)
	{
		if(!key)
			throw new Error('BayamFrontCom::getKeyValue : key is required!');
		var evt = new BayamFrontComKeyValueGetEvent(BayamFrontCom.EVT_KEYVALUE_GET, key);
		sendEvent(evt, callbackSuccess, callbackFail);
	}
	
	/**
	 * Sends a creation
	 * @param {String} base64imgStr REQUIRED / OPTIONAL if descriptorTxt provided 
	 * @param {String} descriptorTxt REQUIRED / OPTIONAL if base64imgStr provided 
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.sendCreation = function(base64imgStr, descriptorTxt, callbackSuccess, callbackFail)
	{
		if(!base64imgStr && !descriptorTxt)
			throw new Error('BayamFrontCom::sendCreation : you must provide either an image (base64 string) or a descriptor data text blob!');
		// Bayam has changed handling of saving creation
		var SAVE_CREATION_EVENT = 'saveCreation';
		this.sendCustomData(SAVE_CREATION_EVENT, this.gameId, 'dessin', base64imgStr, descriptorTxt, callbackSuccess, callbackFail);
	}
	
	/**
	 * Sends various generic data to base Bayam (Ex: mouse clicked on body)
	 * @param {String} eventType REQUIRED 
	 * @param {*} value OPTIONAL
	 * @param {*} value2 OPTIONAL
	 * @param {*} value3 OPTIONAL
	 * @param {*} value4 OPTIONAL
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 */
	this.sendCustomData = function(eventType, value, value2, value3, value4, callbackSuccess, callbackFail)
	{
		if(!eventType)
			throw new Error('BayamFrontCom::sendCustomData : eventType is required!');
		var evt = new BayamFrontComCustomEvent(BayamFrontCom.EVT_SEND_CUSTOM_DATA, eventType, value, value2, value3, value4);
		sendEvent(evt, callbackSuccess, callbackFail);
	}

	
	/**
	 * Get creation data
	 * @param {Int} creationId REQUIRED
	 * @param {Function} callbackSuccess OPTIONAL
	 * @param {Function} callbackFail OPTIONAL
	 * an instance of BayamFrontCreationData will be sent with response
	 * callback(event){ var bayamFrontCreationData = event.data; console.log(bayamFrontCreationData.url_image); }
	 */
	this.getCreation = function(creationId, callbackSuccess, callbackFail)
	{
		if(!creationId)
			throw new Error('BayamFrontCom::getCreation : creationId is required!');
		var evt = new BayamFrontComGetCreationEvent(BayamFrontCom.EVT_CREATION_GET, creationId);
		sendEvent(evt, callbackSuccess, callbackFail);
	}

	/**
	 * Get pause events
	 * @param {Function} callback REQUIRED
	 */
	this.onPause = function(callback)
	{
		if(!callback)
			throw new Error('BayamFrontCom::onPause : callback method required!');
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_PAUSE);
		sendEvent(evt, callback);
	}

	/**
	 * Register to receive volume change event
	 * An event with data volume Ex: 0.55
	 * will be returned on callback
	 * Ex: callback(event){ var volume = event.data }
	 * @param {Function} callback REQUIRED
	 */
	this.onVolumeChange = function(callback)
	{
		if(!callback)
			throw new Error('BayamFrontCom::onVolumeChange : callback method required!');
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_VOLUME_CHANGE);
		sendEvent(evt, callback);
	}
	/**
	 * Register to receive any game generic game event (format of data is free to define)
	 * @param {Function} callback REQUIRED
	 */
	this.onGenericGameEvent = function(callback)
	{
		if(!callback)
			throw new Error('BayamFrontCom::onGenericGameEvent : callback method required!');
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_GENERIC_GAME_EVENT);
		sendEvent(evt, callback);
	}
	/**
	 * Get resume events
	 * @param {Function} callback REQUIRED
	 */
	this.onResume = function(callback)
	{
		if(!callback)
			throw new Error('BayamFrontCom::onPause : callback method required!');
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_RESUME);
		sendEvent(evt, callback);
	}

	/**
	 * Get close event
	 * When a close request has been release, game will receive this event, do closing procedures, 
	 * and then MUST call sendCloseFinalizedRequest(...) to have the container remove the content
	 * NOTE: only when a game register to this event, will the container wait for the
	 * @param {Function} callback REQUIRED
	 */
	this.onClose = function(callback)
	{
		if(!callback)
			throw new Error('BayamFrontCom::onClose : callback method required!');
		var evt = new BayamFrontComEvent(BayamFrontCom.EVT_CLOSE);
		sendEvent(evt, callback);
	}

	/**
	 * Get ready event
	 * register for ready event, triggered when iFrame is completely displayed and ready (fades in)
	 * An event with data Client context: //ex: {support:desktop/mobile/browser, volume:0.5, useragent:(navigator.userAgent), platform:(navigator.userAgent), age:3}
	 * will be returned on callback
	 * Ex: callback(event){ var clientContext = event.data; console.log(clientContext.support); }
	 * @param {Function} callback REQUIRED
	 */
	this.onReady = function(callback)
	{
            if(!callback)
                    throw new Error('BayamFrontCom::onReady : callback method required!');
            var evt = new BayamFrontComEvent(BayamFrontCom.EVT_READY);
            sendEvent(evt, callback);
	}
	/**
	 * Android Back button was pressed
	 * @param {Function} callback REQUIRED
	 */
	this.onAndroidBackBtnPressed = function(callback)
	{
        if(!callback)
                throw new Error('BayamFrontCom::onAndroidBackBtnPressed : callback method required!');
        var evt = new BayamFrontComEvent(BayamFrontCom.EVT_ANDROID_BACK_BTN_PRESSED);
        sendEvent(evt, callback);
	}
        
}

function BayamFrontComEvent(type)
{
	this.type = type;
	var date = new Date();
	this.uniqueId = date.getTime();
}



function BayamFrontComKeyValueSendEvent(type, key, value)
{
	this.key = key;
	this.value = value;
	BayamFrontComEvent.call(this, type);
}

BayamFrontComKeyValueSendEvent.prototype = Object.create(BayamFrontComEvent.prototype);


function BayamFrontComKeyValueGetEvent(type, key)
{
	this.key = key;
	BayamFrontComEvent.call(this, type);
}

BayamFrontComKeyValueGetEvent.prototype = Object.create(BayamFrontComEvent.prototype);

function BayamFrontComGetCreationEvent(type, creationId)
{
	this.creationId = creationId;
	BayamFrontComEvent.call(this, type);
}

BayamFrontComGetCreationEvent.prototype = Object.create(BayamFrontComEvent.prototype);


function BayamFrontComSendCreationEvent(type, base64imgStr, descriptorTxt)
{
	this.base64imgStr = base64imgStr;
	this.descriptor = descriptorTxt;
	BayamFrontComEvent.call(this, type);
}

BayamFrontComSendCreationEvent.prototype = Object.create(BayamFrontComEvent.prototype);

function BayamFrontComCustomEvent(type, eventType, value, value2, value3, value4)
{
	this.eventType = eventType;
	this.value = value;
	this.value2 = value2;
	this.value3 = value3;
	this.value4 = value4;
	BayamFrontComEvent.call(this, type);
}

BayamFrontComCustomEvent.prototype = Object.create(BayamFrontComEvent.prototype);

/* RETURNED EVENT */

function BayamFrontComAnswerEvent(type, uniqueId, success, errorId, data)
{
	this.type = type;
	this.uniqueId = uniqueId;
	this.success = success;
	this.errorId = errorId;
	this.data = data;
}


function EventCallbacks(bayamComEvent, callbackSuccess, callbackFail)
{
	this.bayamComEvent = bayamComEvent;
	this.callbackSuccess = callbackSuccess;
	this.callbackFail = callbackFail;
}

/* INFO */

/* CONTAINER INFO */
function ContainerInfo()
{
	this.appWidth = 1024;
	this.appHeight = 768;
	this.contentScale = 1;
	this.isPhone = false;
	this.isNarrowRatio = false;
}

/* CREATION DATA */
function BayamFrontCreationData()
{
	this.descriptor = '';
	this.url_image = '';
	this.url_thumbnail = '';
	this.width = 0;
	this.height = 0;
}
