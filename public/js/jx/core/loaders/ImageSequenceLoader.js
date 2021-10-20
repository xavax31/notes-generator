define(["exports", "jx/core/Request", "jx/core/Resource"], function (exports, _Request, _Resource) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Request2 = _interopRequireDefault(_Request);

    var _Resource2 = _interopRequireDefault(_Resource);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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

    var ImageSequenceLoader = function () {
        function ImageSequenceLoader(resource, onFinished, jx) {
            _classCallCheck(this, ImageSequenceLoader);

            this.jx = jx;
            this.resource = resource;
            this.onFinished = onFinished;
            this.success = false;
            this.imageArray = null;
        }

        _createClass(ImageSequenceLoader, [{
            key: "kill",
            value: function kill() {
                if (!this.jx) return;

                this.jx = null;
            }
        }, {
            key: "load",
            value: function load() {
                var _this = this;

                var loadResourcesArray = new Array();
                for (var j = this.resource.start; j <= this.resource.end; j++) {
                    var src = this.resource.src.replace("###", this.jx.tools.intToString(j, 3)).replace("##", this.jx.tools.intToString(j, 2)).replace("#", j);
                    var request = new _Request2.default({ "id": this.resource.id + j, "src": src, "type": "image" });
                    loadResourcesArray.push(request);
                }
                var batchLoader = new (this.jx.db.classFromID("BatchLoader"))(loadResourcesArray, function (evt) {
                    return _this._onResourceLoaded(evt);
                }, this.jx);
                batchLoader.load();
            }
        }, {
            key: "_onResourceLoaded",
            value: function _onResourceLoaded(batchLoader) {
                if (batchLoader.failedResources.length == 0) {
                    var resourceArray = new Array();
                    var loadResources = batchLoader.loadedResources;
                    for (var i = 0; i < loadResources.length; i++) {
                        var resourceInfo = loadResources[i];
                        var resource = new _Resource2.default(resourceInfo);
                        resourceArray.push(resource);
                    }
                    this.resource.data = resourceArray;
                    this.resource.ready = true;
                    this.onFinished({ target: this, resource: this.resource, success: true });
                } else {
                    console.log('err', this.resource.id, this, this.resource.src);
                    this.onFinished({ target: this, resource: this.resource, success: false });
                }
            }
        }]);

        return ImageSequenceLoader;
    }();

    exports.default = ImageSequenceLoader;
});
//# sourceMappingURL=ImageSequenceLoader.js.map