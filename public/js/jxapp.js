jxCore.addModes(
{
    dev: {
        jxPath : '/dev/mp-framework/current/engine/build/jx',
        configURL: "assets/"+(window["jxCore"].urlParams.conf || "config")+".json",
        mainCtrl: "src/"+(window["jxCore"].urlParams.main || "index"), //(dev use) url /?main=index_custom to target     
        src:"js/src/index.js",
    },

    prod: {
        jxPath : 'jx',
        configURL: "assets/"+(window["jxCore"].urlParams.conf || "config")+".json",
        mainCtrl: "src/"+(window["jxCore"].urlParams.main || "index"), //(dev use) url /?main=index_custom to target     
        src:"js/src/index.js",
    }


});

// Load and launch jx module src.
jxCore.init({
    mode: window["overrideJXConfig"].mode || window["jxCore"].urlParams.mode || "prod",
    debug: window["overrideJXConfig"].debug || window["jxCore"].urlParams.debug || false,
    onInitialised:function(evt){
        console.log(evt);
        // jx module is launched.
    }
});

