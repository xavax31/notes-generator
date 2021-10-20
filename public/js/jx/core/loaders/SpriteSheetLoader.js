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

    var SpriteSheetLoader = function () {
        function SpriteSheetLoader(resource, onFinished, jx) {
            _classCallCheck(this, SpriteSheetLoader);

            this.jx = jx;
            this.resource = resource;
            this.onFinished = onFinished;
            this.success = false;
        }

        _createClass(SpriteSheetLoader, [{
            key: "load",
            value: function load() {
                this._assets = [];
                this._loader = new createjs.LoadQueue();
                this._loader.on("fileload", this._resourceLoaded, this);
                this._loader.on("complete", this._onComplete, this);
                this._loader.on("error", this._resourceFailed, this);
                this._loader.loadManifest([{ id: this.resource.id + "_JSON", src: this.resource.src + ".json", crossOrigin: true }, { id: this.resource.id, src: this.resource.src + ".png", crossOrigin: true }]);
            }
        }, {
            key: "kill",
            value: function kill() {
                if (!this.jx) return;
                this._loader.removeAllEventListeners();
                this._loader.removeAll();
                this._loader.destroy();
                this._loader = null;
                this.onFinished = null;
                this.resource = null;
                this.jx = null;
            }
        }, {
            key: "_onComplete",
            value: function _onComplete(evt) {
                var _this = this;

                this._loader.removeEventListener("complete", this._onComplete);
                this._loader.removeEventListener("fileload", this._resourceLoaded);
                this._loader.removeEventListener("error", this._resourceFailed);

                var result = {
                    frames: this._assets[0].result.frames,
                    animations: this._assets[0].result.animations,
                    images: [this._assets[1].result]
                };
                this.success = true;
                setTimeout(function () {
                    _this._offsetResourceLoaded(result);
                }, 10);
            }
        }, {
            key: "_resourceLoaded",
            value: function _resourceLoaded(event) {
                this._assets.push(event);
            }
        }, {
            key: "_offsetResourceLoaded",
            value: function _offsetResourceLoaded(result) {
                this.resource.data = result;
                this.resource.ready = true;
                this.onFinished({ target: this, resource: this.resource, success: true });
            }
        }, {
            key: "_resourceFailed",
            value: function _resourceFailed(event) {
                console.log('err', event.title, this.resource.id, this, this.resource.src);
                this._loader.removeEventListener("fileload", this._resourceLoaded);
                this._loader.removeEventListener("error", this._resourceFailed);
                this.success = false;
                this.onFinished({ target: this, resource: this.resource, success: false });
            }
        }]);

        return SpriteSheetLoader;
    }();

    exports.default = SpriteSheetLoader;
});
//# sourceMappingURL=SpriteSheetLoader.js.map