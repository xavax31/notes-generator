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

    var FlashtmlLoader = function () {
        function FlashtmlLoader(resource, onFinished, jx) {
            _classCallCheck(this, FlashtmlLoader);

            this.jx = jx;
            this.resource = resource;
            this.onFinished = onFinished;
            this.success = false;
            this._loader = null;
            this._useFlaName = false;
        }

        _createClass(FlashtmlLoader, [{
            key: "getFlashVersion",
            value: function getFlashVersion(lib) {
                var ideVersion = void 0;
                if (lib.ssMetadata == null) {
                    ideVersion = "flash";
                } else if (window[this.fileID] == null) {
                    ideVersion = "animate";
                } else {
                    ideVersion = "animate2019";
                }
                return ideVersion;
            }
        }, {
            key: "load",
            value: function load() {
                var _this = this;

                var fileJSName = this.resource.src.split("/").pop();
                this.fileID = fileJSName;
                if (this._useFlaName) {
                    this.jx.db.importJSFile([this.resource.src + "/html5/" + fileJSName + ".js"], function () {
                        _this.resource.data = window[fileJSName];
                        _this._loadLinkedAssets();
                    });
                } else {
                    (function () {
                        var globalID = void 0;
                        _this.jx.db.importJSFile([_this.resource.src + "/html5/screen.js"], function (evt) {
                            if (evt && evt.error) {
                                _this.jx.db.importJSFile([_this.resource.src + "/html5/" + fileJSName + ".js"], function () {
                                    globalID = fileJSName;
                                    _this.analyseFile(globalID, fileJSName);
                                    _this._loadLinkedAssets();
                                });
                            } else {
                                globalID = "screen";
                                _this.analyseFile(globalID, fileJSName);
                                _this._loadLinkedAssets();
                            }
                        });
                    })();
                }
            }
        }, {
            key: "analyseFile",
            value: function analyseFile(globalID, fileJSName) {
                var versionIDE = void 0;
                if (window[globalID]) {
                    this.lib = window[globalID];
                    if (this.lib.ssMetadata == null) {
                        versionIDE = { ide: "flash", version: 0 };
                    } else {
                        versionIDE = { ide: "animate", version: "2017" };
                    }
                    this._getLibBefore2019(globalID, fileJSName);
                } else if (window["AdobeAn"]) {
                    versionIDE = { ide: "animate", version: "2019" };
                    this._getLibAfter2019(globalID, fileJSName);
                } else {
                    console.error("Flashtml file format not recognized", globalID);
                }
                this.resource.data = this.lib;
                this.resource.mainSymbolID = fileJSName;
                this.resource.versionIDE = versionIDE;
            }
        }, {
            key: "_getLibBefore2019",
            value: function _getLibBefore2019(globalID, fileJSName) {
                this.lib = window[globalID];
                this.libImage = window[globalID + "_images"] = window[globalID + "_images"] || {};
                window["ss"] = window["ss"] || {};
                this.libSpriteSheet = window["ss"];
                try {
                    window[globalID + "_images"] = null;
                    window[globalID] = null;
                } catch (error) {
                    console.warn(error);
                }
            }
        }, {
            key: "_getLibAfter2019",
            value: function _getLibAfter2019(globalID, fileJSName) {
                var id = Object.keys(window["AdobeAn"].compositions)[0];
                var fileAN = window["AdobeAn"].getComposition(Object.keys(window["AdobeAn"].compositions)[0]);
                this.lib = fileAN.getLibrary();
                this.libImage = fileAN.getImages();
                this.libSpriteSheet = fileAN.getSpriteSheet();
                this.resource.flaID = id;
                delete window["AdobeAn"].compositions[id];
            }
        }, {
            key: "_loadLinkedAssets",
            value: function _loadLinkedAssets() {
                var _this2 = this;

                if (this.lib.properties.manifest.length > 0) {
                    this._loader = new createjs.LoadQueue(this.jx.config.system.audio.isWebAudioSupported);
                    this._loader.installPlugin(createjs.Sound);
                    this._loader.addEventListener("fileload", function (e) {
                        return _this2._onFileLoaded(e);
                    });
                    this._loader.addEventListener("error", function (e) {
                        return _this2._onLoadError(e);
                    });
                    this._loader.addEventListener("complete", function (e) {
                        return _this2._onAllLoaded(e);
                    });
                    for (var i = 0; i < this.lib.properties.manifest.length; i++) {
                        this.lib.properties.manifest[i].src = this.resource.src + "/html5/" + this.lib.properties.manifest[i].src;
                    }
                    ;
                    this._loader.loadManifest(this.lib.properties.manifest);
                } else {
                    this._onAllLoaded();
                }
            }
        }, {
            key: "_onFileLoaded",
            value: function _onFileLoaded(event) {
                if (event.item.type == "image") {
                    if (this._useFlaName) {
                        var libImage = window[this.fileID + "_images"] = window[this.fileID + "_images"] || {};
                        libImage[event.item.id] = event.result;
                    } else {
                        this.libImage[event.item.id] = event.result;
                    }
                }
            }
        }, {
            key: "_onLoadError",
            value: function _onLoadError(event) {
                this._loader.removeEventListener("fileload", this._onFileLoaded);
                this._loader.removeEventListener("error", this._onLoadError);
                this._loader.removeEventListener("complete", this._onAllLoaded);
                this.onFinished({ target: this, resource: this.resource, success: false });
            }
        }, {
            key: "_onAllLoaded",
            value: function _onAllLoaded(event) {
                if (this._loader != null) {
                    this._loader.removeEventListener("fileload", this._onFileLoaded);
                    this._loader.removeEventListener("error", this._onLoadError);
                    this._loader.removeEventListener("complete", this._onAllLoaded);
                    this._loadSpriteSheets();
                }
                this.resource.ready = true;
                this.onFinished({ target: this, resource: this.resource, success: true });
            }
        }, {
            key: "_loadSpriteSheets",
            value: function _loadSpriteSheets() {
                var ssMetadata = this.lib.ssMetadata;
                if (ssMetadata) {
                    for (var i = 0; i < ssMetadata.length; i++) {
                        this.libSpriteSheet[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [this._loader.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames });
                    }
                }
            }
        }, {
            key: "kill",
            value: function kill() {
                if (!this.jx) return;
                if (this._loader) {
                    this._loader.removeAllEventListeners();
                    this._loader.removeAll();
                    this._loader.destroy();
                    this._loader = null;
                }
                this.onFinished = null;
                this.resource = null;
                this.jx = null;
            }
        }]);

        return FlashtmlLoader;
    }();

    exports.default = FlashtmlLoader;
});
//# sourceMappingURL=FlashtmlLoader.js.map