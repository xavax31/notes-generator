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
            window["ss"] = window["ss"] || {};
            this._useFlaName = true;
        }

        _createClass(FlashtmlLoader, [{
            key: "load",
            value: function load() {
                var _this = this;

                var fileJSName = this.resource.src.split("/").pop();
                this.fileID = fileJSName;
                this.jx.db.importJSFile([this.resource.src + "/html5/screen.js"], function (evt) {
                    console.log(evt);
                    if (evt && evt.error) {
                        _this.jx.db.importJSFile([_this.resource.src + "/html5/" + fileJSName + ".js"], function (evt) {
                            _this.globalID = fileJSName;
                            _this.resource.data = window[_this.globalID];
                            _this.libImage = window[fileJSName + "_images"] = window[fileJSName + "_images"] || {};
                            window[_this.globalID + "_images"] = null;
                            window[_this.globalID] = null;

                            _this._loadLib();
                        });
                    } else {
                        _this.globalID = "screen";
                        _this.resource.data = window[_this.globalID];
                        _this.libImage = window[fileJSName + "_images"] = window[fileJSName + "_images"] || {};
                        window[_this.globalID + "_images"] = null;
                        window[_this.globalID] = null;

                        _this._loadLib();
                    }
                });
            }
        }, {
            key: "_loadLib",
            value: function _loadLib() {
                var _this2 = this;

                this.lib = this.resource.data;
                if (this.lib.properties.manifest.length > 0) {
                    this._loader = new createjs.LoadQueue();
                    this._loader.installPlugin(createjs.Sound);
                    this._loader.addEventListener("fileload", function (e) {
                        return _this2._fileload(e);
                    });
                    this._loader.addEventListener("error", function (e) {
                        return _this2._loadedError(e);
                    });
                    this._loader.addEventListener("complete", function (e) {
                        return _this2._loadedAll(e);
                    });

                    for (var i = 0; i < this.lib.properties.manifest.length; i++) {
                        this.lib.properties.manifest[i].src = this.resource.src + "/html5/" + this.lib.properties.manifest[i].src;
                    }
                    ;
                    this._loader.loadManifest(this.lib.properties.manifest);
                } else {
                    this._loadedAll();
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
        }, {
            key: "_loadedAll",
            value: function _loadedAll(event) {
                if (this._loader != null) {
                    this._loader.removeEventListener("fileload", this._fileload);
                    this._loader.removeEventListener("error", this._loadedError);
                    this._loader.removeEventListener("complete", this._loadedAll);
                    var ssMetadata = this.lib.ssMetadata;
                    if (ssMetadata) {
                        for (var i = 0; i < ssMetadata.length; i++) {
                            window["ss"][ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [this._loader.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames });
                        }
                    }
                }
                this.resource.ready = true;
                this.onFinished({ target: this, resource: this.resource, success: true });
            }
        }, {
            key: "_loadedError",
            value: function _loadedError(event) {
                this._loader.removeEventListener("fileload", this._fileload);
                this._loader.removeEventListener("error", this._loadedError);
                this._loader.removeEventListener("complete", this._loadedAll);
                this.onFinished({ target: this, resource: this.resource, success: false });
            }
        }, {
            key: "_fileload",
            value: function _fileload(event) {
                if (event.item.type == "image") {
                    this.libImage[event.item.id] = event.result;
                }
            }
        }, {
            key: "_resourceLoaded",
            value: function _resourceLoaded(event) {}
        }, {
            key: "_resourceFailed",
            value: function _resourceFailed(event) {}
        }]);

        return FlashtmlLoader;
    }();

    exports.default = FlashtmlLoader;
});
//# sourceMappingURL=FlashtmlLoader.1.js.map