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

    var SoundLoaderMediaElement = function () {
        function SoundLoaderMediaElement(resource, onloaded, jx) {
            _classCallCheck(this, SoundLoaderMediaElement);

            this.jx = jx;
            this._loader = null;
            this.resource = resource;
            this.success = false;
            this.resource.loader = this;
            this.onloaded = new signals.Signal();
            if (onloaded) this.onloaded.addOnce(onloaded);
        }

        _createClass(SoundLoaderMediaElement, [{
            key: "kill",
            value: function kill() {
                if (!this.jx) return;

                this.jx = null;
            }
        }, {
            key: "load",
            value: function load() {
                var _this = this;

                var html1 = "<audio id='" + this.resource.id + "'><source src='" + this.resource.src + "' type='audio/mp3'/></audio>";
                var div1 = document.createElement("div");
                div1.innerHTML = html1;
                var domSound = div1.firstChild;
                document.body.appendChild(domSound);
                domSound.addEventListener("error", function (event) {
                    console.log(event);
                    _this._resourceFailed({ text: "not found" });
                });
                this.mediaSound = new MediaElement(this.resource.id, {});
                this.mediaSound.canplay = false;
                this.mediaSound.playing = false;
                this._resLoaded = function () {
                    return _this._resourceLoaded({});
                };
                this.mediaSound.addEventListener("canplaythrough", this._resLoaded);
                this.mediaSound.load();
            }
        }, {
            key: "_resourceLoaded",
            value: function _resourceLoaded(event) {
                console.log("loaderes");
                this.mediaSound.canplay = true;
                this.mediaSound.removeEventListener("canplaythrough", this._resLoaded);
                this.resource.data = this.mediaSound;
                this.resource.ready = true;
                this.resource.loader = null;
                this.onloaded.dispatch({ target: this, resource: this.resource, success: true });
            }
        }, {
            key: "_resourceFailed",
            value: function _resourceFailed(event) {
                console.log('err', event, this.resource.id, this, this.resource.src);
                this.resource.loader = null;
                this.onloaded.dispatch({ target: this, resource: this.resource, success: false });
            }
        }]);

        return SoundLoaderMediaElement;
    }();

    exports.default = SoundLoaderMediaElement;
});
//# sourceMappingURL=SoundLoaderMediaElement.js.map