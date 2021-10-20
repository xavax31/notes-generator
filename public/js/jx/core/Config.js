define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Config = function () {
        function Config(jx) {
            _classCallCheck(this, Config);

            this.jx = jx;
            this._detectDevice();

            this.langs = ["fr"];

            this.lang = "fr";

            this.urlParams = this.jx.tools.getURLParameters();
            this._system = new SystemInfo(this);
            this._projectInfo = new ProjectInfos();
            this._flashOptimizer = new FlashOptimizer();
            this.system.host.type = window.location.href.search("localhost") == -1 ? "server" : "local";
            this.system.needUserActionToWork = this.urlParams.startbtn == undefined ? this.system.needUserActionToWork : this.urlParams.startbtn;
            this.useClickOnTouchScreens = true;
        }

        _createClass(Config, [{
            key: "kill",
            value: function kill() {
                this._system.kill();
                this._system = null;
                this._projectInfo = null;
                this._flashOptimizer = null;
                this.jx = null;
            }
        }, {
            key: "setProjectInfo",
            value: function setProjectInfo(projectData) {
                if (!projectData) return;
                Object.assign(this._projectInfo, projectData.project || {});
                Object.assign(this._projectInfo, projectData.engine || {});
                Object.assign(this._projectInfo, projectData.config || {});
            }
        }, {
            key: "init",
            value: function init() {
                var screenObject = this.jx.db.findOne({ id: "ScreenRatio" });
                if (screenObject) {
                    var ratioArray = screenObject.data.split("/");
                    this.app.ratio = Number(ratioArray[0]) / Number(ratioArray[1]);
                }
            }
        }, {
            key: "_detectDevice",
            value: function _detectDevice() {
                (function (global) {
                    var apple_phone = /iPhone/i,
                        apple_ipod = /iPod/i,
                        apple_tablet = /iPad/i,
                        android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
                        android_tablet = /Android/i,
                        amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
                        amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
                        windows_phone = /Windows Phone/i,
                        windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
                        other_blackberry = /BlackBerry/i,
                        other_blackberry_10 = /BB10/i,
                        other_opera = /Opera Mini/i,
                        other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
                        other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
                        seven_inch = new RegExp('(?:' + 'Nexus 7' + '|' + 'BNTV250' + '|' + 'Kindle Fire' + '|' + 'Silk' + '|' + 'GT-P1000' + ')', 'i');
                    var match = function match(regex, userAgent) {
                        return regex.test(userAgent);
                    };
                    var IsMobileClass = function IsMobileClass(userAgent) {
                        var ua = userAgent || navigator.userAgent;

                        var tmp = ua.split('[FBAN');
                        if (typeof tmp[1] !== 'undefined') {
                            ua = tmp[0];
                        }

                        tmp = ua.split('Twitter');
                        if (typeof tmp[1] !== 'undefined') {
                            ua = tmp[0];
                        }
                        this.apple = {
                            phone: match(apple_phone, ua),
                            ipod: match(apple_ipod, ua),
                            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
                            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
                        };
                        this.amazon = {
                            phone: match(amazon_phone, ua),
                            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
                            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
                        };
                        this.android = {
                            phone: match(amazon_phone, ua) || match(android_phone, ua),
                            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
                            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
                        };
                        this.windows = {
                            phone: match(windows_phone, ua),
                            tablet: match(windows_tablet, ua),
                            device: match(windows_phone, ua) || match(windows_tablet, ua)
                        };
                        this.other = {
                            blackberry: match(other_blackberry, ua),
                            blackberry10: match(other_blackberry_10, ua),
                            opera: match(other_opera, ua),
                            firefox: match(other_firefox, ua),
                            chrome: match(other_chrome, ua),
                            device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
                        };
                        this.seven_inch = match(seven_inch, ua);
                        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

                        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

                        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;
                        if (typeof window === 'undefined') {
                            return this;
                        }
                    };
                    var instantiate = function instantiate() {
                        var IM = new IsMobileClass();
                        IM.Class = IsMobileClass;
                        return IM;
                    };
                    global.isMobile = instantiate();
                })(window);
            }
        }, {
            key: "system",
            get: function get() {
                return this._system;
            }
        }, {
            key: "flashOptimizer",
            get: function get() {
                return this._flashOptimizer;
            }
        }, {
            key: "app",
            get: function get() {
                return this._projectInfo;
            }
        }, {
            key: "useClickOnTouchScreens",
            set: function set(value) {
                this._useClickOnTouchScreens = value;
            },
            get: function get() {
                return this._system.device.support !== "mobile" || this._useClickOnTouchScreens;
            }
        }]);

        return Config;
    }();

    exports.default = Config;

    var ProjectInfos = exports.ProjectInfos = function ProjectInfos() {
        _classCallCheck(this, ProjectInfos);

        this.quality = 1;
        this.monitor = {
            enabled: true
        };

        this.framerate = 50;

        this.ratio = 4 / 3;

        this.defaultStageResolution = { width: 800, height: 600 };
        this.defaultRenderers = {
            video: "DOM"
        };
        this.defaultViewType = "DOM";
        this.lockDelayAfterClick = 0;
    };

    var FlashOptimizer = exports.FlashOptimizer = function FlashOptimizer() {
        _classCallCheck(this, FlashOptimizer);

        this.spriteSheetMaxWidth = 2048;
        this.spriteSheetMaxHeight = 2048;

        this.cacheStatics = "always";

        this.quality = "good";
    };

    var SystemInfo = exports.SystemInfo = function () {
        function SystemInfo(config) {
            var _this = this;

            _classCallCheck(this, SystemInfo);

            this._config = config;

            this.device = {
                support: "desktop",
                type: "mac",
                version: "book2013"
            };

            this.os = {
                type: "os",
                version: "10.10.5"
            };

            this.host = {
                type: "server"
            };

            this.container = {
                type: "browser",
                name: "chrome"
            };
            $(window).on("resize", function (evt) {
                _this.screen.resolutionUser.width = $(window).width();
                _this.screen.resolutionUser.height = $(window).height();
            });

            this.screen = {
                resolutionUser: { width: $(window).width(), height: $(window).height() },
                resolution: { width: screen.width, height: screen.height },

                ratio: 4 / 3,
                pixelRatio: window.devicePixelRatio
            };

            this.audio = {
                needUserActionToWork: false,
                isWebAudioSupported: false,
                isHTMLAudioSupported: createjs.HTMLAudioPlugin.isSupported()
            };

            this.video = {
                needUserActionToWork: false
            };
            this.battery = null;
            this.connection = {
                online: navigator.onLine
            };

            this.needUserActionToWork = false;
            this._init();
        }

        _createClass(SystemInfo, [{
            key: "kill",
            value: function kill() {
                this._batteryRemoveListeners();
            }
        }, {
            key: "_init",
            value: function _init() {
                var _this2 = this;

                this.device.support = isMobile.any ? "mobile" : "desktop";

                this.blockMobileContextualMenu = true;
                this.blockMobileScroll = true;
                if (navigator.userAgent.search(/ipad/i) != -1) {
                    this.device.type = "ipad";
                } else if (navigator.userAgent.search(/android/i) != -1) {
                    this.device.type = "android";
                } else {
                    if (navigator.userAgent.search(/Macintosh/i) != -1) {
                        this.device.type = "mac";
                    }
                    ;
                    if (navigator.userAgent.search(/Windows/i) != -1) {
                        this.device.type = "windows";
                    }
                    ;
                }
                if (this._config.urlParams.context == "cordova") {
                    this.container.type = "cordova";
                    this.container.name = "";
                } else if (this._config.urlParams.context == "bayam") {
                    this.container.type = "bayam";
                    this.container.name = "";
                } else if (this._config.urlParams.context == "azoomee" || window["overrideJXConfig"].context == "azoomee") {
                    this.container.type = "azoomee";
                    this.container.name = "";
                } else if (navigator.userAgent.search(/Chrome/i) != -1) {
                    this.container.type = "browser";
                    this.container.name = "chrome";
                } else if (navigator.userAgent.search(/Safari/i) != -1) {
                    this.container.type = "browser";
                    this.container.name = "safari";
                } else if (navigator.userAgent.search(/Firefox/i) != -1) {
                    this.container.type = "browser";
                    this.container.name = "firefox";
                } else {
                    this.container.type = "browser";

                    this.container.name = "unknown";
                }
                this.audio.needUserActionToWork = this.container.type == "browser";
                this.video.needUserActionToWork = this.container.type == "browser";
                this.needUserActionToWork = this.video.needUserActionToWork || this.audio.needUserActionToWork;
                this.audio.isWebAudioSupported = this.container.type != "aquafadas" && this.container.type != "azoomee";
                this._getBatteryInfos();
                window.addEventListener("offline", function (e) {
                    _this2.connection.online = false;
                });
                window.addEventListener("online", function (e) {
                    _this2.connection.online = true;
                });
            }
        }, {
            key: "_getBatteryInfos",
            value: function _getBatteryInfos() {
                var _this3 = this;

                if (navigator.battery) {
                    navigator.getBattery().then(function (battery) {
                        _this3.battery = {
                            core: battery,
                            charging: battery.charging,
                            level: battery.level,
                            chargingTime: battery.chargingTime,
                            dischargingTime: battery.dischargingTime
                        };
                        _this3.battery._listeners = {
                            charging: function charging() {
                                return _this3.battery.charging = battery.charging;
                            },
                            level: function level() {
                                return _this3.battery.level = battery.level;
                            },
                            chargingTime: function chargingTime() {
                                return _this3.battery.chargingTime = battery.chargingTime;
                            },
                            dischargingTime: function dischargingTime() {
                                return _this3.battery.dischargingTime = battery.dischargingTime;
                            }
                        };
                        _this3._batteryAddListeners();
                    });
                }
                ;
            }
        }, {
            key: "_batteryAddListeners",
            value: function _batteryAddListeners() {
                if (navigator.battery) {
                    battery.addEventListener('chargingchange', this.battery._listeners.charging);
                    battery.addEventListener('levelchange', this.battery._listeners.level);
                    battery.addEventListener('chargingtimechange', this.battery._listeners.chargingTime);
                    battery.addEventListener('dischargingtimechange', this.battery._listeners.dischargingTime);
                }
            }
        }, {
            key: "_batteryRemoveListeners",
            value: function _batteryRemoveListeners() {
                if (navigator.battery) {
                    battery.removeEventListener('chargingchange', this.battery._listeners.charging);
                    battery.removeEventListener('levelchange', this.battery._listeners.level);
                    battery.removeEventListener('chargingtimechange', this.battery._listeners.chargingTime);
                    battery.removeEventListener('dischargingtimechange', this.battery._listeners.dischargingTime);
                }
            }
        }, {
            key: "blockMobileContextualMenu",
            set: function set(value) {
                $("body").css("-webkit-touch-callout", value ? "none" : "default");
            },
            get: function get() {
                return $("body").css("-webkit-touch-callout") == "none" ? true : false;
            }
        }, {
            key: "blockMobileScroll",
            set: function set(value) {
                if (jx._blockMobileScroll === value) return;
                jx._blockMobileScroll = value;
                if (jx._blockMobileScroll) {
                    jx._blockMobileScrollListener = jx._blockMobileScrollListener || function (e) {
                        e.preventDefault();
                    };
                    document.removeEventListener("touchmove", jx._blockMobileScrollListener);
                    document.addEventListener("touchmove", jx._blockMobileScrollListener);
                } else {
                    document.removeEventListener("touchmove", jx._blockMobileScrollListener);
                }
            },
            get: function get() {
                return this._blockMobileScroll;
            }
        }]);

        return SystemInfo;
    }();
});
//# sourceMappingURL=Config.js.map