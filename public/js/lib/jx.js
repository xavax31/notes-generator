/** obsolete, use lib/jx/jx.js instead */
var jxCore = {
    modes: {},

    addModes: function(modesObj) {
        for (var prop in modesObj) {
            this.modes[prop] = modesObj[prop];
        }
    },

    init: function(params) {
        params.modes = this.modes;

        if (params.mode) {
            var mode = this.modes[params.mode];
            requirejs.config({
                //By default load any module IDs from js
                baseUrl: 'js',
                //except, for jx path
                paths: {
                    jx: window["overrideJXConfig"].jxPath || mode.jxPath
                },
                waitSeconds: 320
            });
        }
        else {
            requirejs.config({
                //By default load any module IDs from js
                baseUrl: 'js',
                //except, for jx path
                paths: {
                    jx: window["overrideJXConfig"].jxPath || '/dev/mp-framework/current/engine/build/jx'
                },
                waitSeconds: 320
            });
        }


        // window["overrideJXConfig"].configURL = (this.decodeParam(overrideJXConfig.configURL) || "config") + ".json";
        // window["overrideJXConfig"].mainCtrl = (this.decodeParam(overrideJXConfig.mainCtrl) || "index");

        requirejs([ "jx/core/Launcher"], function ( JXCoreLauncher) {
            var launcher = new JXCoreLauncher(params);
        });
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

        $("body").append('<div id="splashscreen"  style="display:block; width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; background: url(\'assets/images/SPLASHSCREEN.png\') no-repeat center center fixed; -webkit-background-size: contain; -moz-background-size: contain; -o-background-size: contain; background-size: contain;"></div>');
 
        var opts = {
          lines: 12 // The number of lines to draw
        , length: 10 // The length of each line
        , width: 5 // The line thickness
        , radius: 10 // The radius of the inner circle
        , scale: 3 // Scales overall size of the spinner
        , corners: 2 // Corner roundness (0..1)
        , color: '#eee' // #rgb or #rrggbb or array of colors
        , opacity: 0 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning
        }
        var target = document.body;

        this._spinner = new Spinner(opts); //(target);  
        this._spinner.spin(document.body);
        window["JXLoadAnim"] = this._spinner;

     }
}

jxCore.splashScreen(); // set here for show SplashScreen immediately before loadings
