window.jxTiming = window.jxTiming || [];
window.jxTiming.push({jxjs:Date.now()});

/**
 * This initialise a minimum ES5 vanilla code before loading jxengine, 
 * for simplify initialisation and encapsulate requirejs use.
 * Here are too the things needed before loading as displaying the loading screen.
 */
var jxCore = {
    modes: {},

    addModes: function(modesObj) {
        for (var prop in modesObj) {
            this.modes[prop] = modesObj[prop];
        }
    },

    init: function(params) {
        window.jxTiming.push({jxinit:Date.now()});

        params.modes = this.modes;

        params.mode = this._getFirstDefined(params.mode, window["overrideJXConfig"].mode, window["jxCore"].urlParams.mode, "prod");
        params.debug =  this._getFirstDefined(params.debug, window["overrideJXConfig"].debug, window["jxCore"].urlParams.debug, false).toString() == "true";

        params.jxsrc = this._getFirstDefined(params.jxsrc, window["overrideJXConfig"].jxsrc, window["jxCore"].urlParams.jxsrc, true).toString() == "true";
 
        if (params.mode) {
            var mode = this.modes[params.mode];

            requirejs.config({
                //By default load any module IDs from js
                baseUrl: mode && mode.baseURL ?  mode.baseURL : "js",
                //except, for jx path
                paths: mode && mode.classesPathes ?  mode.classesPathes :  {
                    jx: window["overrideJXConfig"].jxPath || mode.jxPath,
                    comps: 'src/comps',
                    screens: 'src/screens',
                    JXEngine: 'src/JXEngine',
                    'createjs': 'lib/createjs.combined/index',
                    'signals': 'lib/signals.min',
                    'mediaelement': 'lib/mediaelement.min',
                    'webfont': 'lib/webfont/index',
                    'devpackages': '/dev/packages'
                },
                waitSeconds: 60
            });
        }
        else {
            requirejs.config({
                //By default load any module IDs from js
                baseUrl: 'js',

                //except, for jx path
                paths: {
                    jx: window["overrideJXConfig"].jxPath || '/dev/mp-framework/current/engine/build/jx',
                    comps: 'src/comps',
                    screens: 'src/screens',
                    JXEngine: 'src/JXEngine',

                },
                waitSeconds: 60
            });
        }


        // window["overrideJXConfig"].configURL = (this.decodeParam(overrideJXConfig.configURL) || "config") + ".json";
        // window["overrideJXConfig"].mainCtrl = (this.decodeParam(overrideJXConfig.mainCtrl) || "index");


        if (!params.jxsrc) {
                var jxminPath = params.mode == "dev" ? "/dev/mp-framework/current/lib/jx/jxengine.min.js" : "lib/jx/jxengine.min";
                requirejs([ jxminPath ], function ( ) {
                    requirejs(["jx/core/Launcher"], function (Launcher) {
                        var launcher = new (Launcher.default)(params);
                    });
                });
         }
        else{
            requirejs(["jx/core/Launcher"], function (Launcher) {
                     var launcher = new Launcher.default(params);
            });

        }

    },

    /**
     * Return first arg not undefined.
     * @param  {...any} args 
     * @return {any}         
     */
    _getFirstDefined: function() {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] != undefined) {
                return arguments[i];
            }
        };
    },

    getURLParameters: function() {
        var sPageURL = window.location.search.substring( 1 );
        var sURLVariables = sPageURL.split( '&' );
        var result={};
        for ( var i = 0; i < sURLVariables.length; i++ ) {
            var sParameterName = sURLVariables[ i ].split( '=' );
            result[sParameterName[0]]=sParameterName[ 1 ];
        }
        return result;
    },

    decodeParam: function(str) {
        if(str.search("$urlParams.") != -1) {
            var prop = str.replace("$urlParams.", "");
            return this.urlParams[prop];
        }
    },

    splashScreen : function() {
        this.urlParams = this.getURLParameters();
        this.splashScreenSrc = window["overrideJXConfig"].splashScreen || "assets/images/SPLASHSCREEN.png";
        this.startButtonSrc =  "assets/images/START_BUTTON.png";

        $("body").append('<div id="splashscreen"  style="display:block; width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; background: url(\'' + this.splashScreenSrc + '\') no-repeat center center fixed; -webkit-background-size: contain; -moz-background-size: contain; -o-background-size: contain; background-size: contain;"></div>');
 
        $("#splashscreen").append('<div id="startBTN" style="left: 0px; top: 0px; display: none; cursor: default; z-index: 301;"><img id="image" src="' + this.startButtonSrc + '" style="height: 80%; display: inline;"></div>');
        
        var opts = window["overrideJXConfig"].loadGearAnimOptions || {
            lines: 17, // The number of lines to draw
            length: 19, // The length of each line
            width: 3, // The line thickness
            radius: 15, // The radius of the inner circle
            scale: 3, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            color: '#eee', // #rgb or #rrggbb or array of colors
            opacity: 0.3, // Opacity of the lines
            rotate: 67, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: 1.3, // Rounds per second
            trail: 60, // Afterglow percentage
            fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            className: 'spinner', // The CSS class to assign to the spinner
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            position: 'absolute' // Element positioning
        }
        var target = document.body;

        this._spinner = new Spinner(opts); //(target);  
        this._spinner.spin(document.body);
        window["JXLoadAnim"] = this._spinner;

     }
}

jxCore.splashScreen(); // set here for show SplashScreen immediately before loadings
