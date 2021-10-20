define(["exports", "jx/core/loaders/ClassLoader"], function (exports, _ClassLoader) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ClassLoader2 = _interopRequireDefault(_ClassLoader);

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

    var typeToClasses = {
        text: "TextLoader",
        json: "JSONLoader",
        image: "ImageLoader",
        imagesequence: "ImageSequenceLoader",
        flashtml: "FlashtmlLoader",
        Flashtml: "FlashtmlLoader",
        spritesheet: "SpriteSheetLoader"
    };

    var BatchLoader = function () {
        function BatchLoader(loadedResourcesArray, onResourcesLoaded, jx) {
            var _this = this;

            _classCallCheck(this, BatchLoader);

            this.jx = jx;
            this.onResourcesLoaded = onResourcesLoaded;
            this._loaders = [];
            this.loadedResources = [];
            this.failedResources = [];
            var length = loadedResourcesArray.length;
            for (var i = 0; i < length; i++) {
                var resource = loadedResourcesArray[i];
                var originalType = resource.type;
                resource.type = resource.type.toLowerCase();
                switch (resource.type) {
                    case "video":
                        break;
                    case "class":
                        this._loaders.unshift(new _ClassLoader2.default(resource, $.proxy(this._onResourceLoaded, this), this.jx));
                        break;
                    case "sound":
                        if (!this.jx.config.system.audio.isWebAudioSupported) {
                            this._loaders.push(new (this.jx.db.findOne({ id: "SoundLoaderMediaElement" }).data)(resource, function (evt) {
                                return _this._onResourceLoaded(evt);
                            }, this.jx));
                        } else {
                            this._loaders.push(new (this.jx.db.findOne({ id: "SoundLoader" }).data)(resource, function (evt) {
                                return _this._onResourceLoaded(evt);
                            }, this.jx));
                        }
                        break;
                    default:
                        if (typeToClasses[resource.type]) {
                            this._loaders.push(new (this.jx.db.findOne({ id: typeToClasses[resource.type] }).data)(resource, function (evt) {
                                return _this._onResourceLoaded(evt);
                            }, this.jx));
                        } else {
                            resource.type = originalType;
                            var srcClass = originalType.replace(new RegExp(/\./g), "/");
                            var itemClass = this.jx.db.getClass(srcClass);
                            if (itemClass) {
                                this.jx.comp[originalType] = itemClass;
                                var loaderClass = itemClass.getLoaderClass();
                                this._loaders.push(new loaderClass({
                                    resource: resource,
                                    onloaded: function onloaded(evt) {
                                        return _this._onResourceLoaded(evt);
                                    },
                                    jx: this.jx
                                }));
                            } else {
                                this.jx.debug.error("no loader defined for type ", itemClass);
                                this._onResourceLoaded({ resource: resource, success: false });
                            }
                        }
                }
            }
        }

        _createClass(BatchLoader, [{
            key: "kill",
            value: function kill() {
                if (!this.jx) return;
                for (var i = 0; i < this._loaders.length; i++) {
                    this._loaders[i].kill();
                }
                this._loaders = null;
                this.loadedResources = null;
                this.failedResources = null;
                this.jx = null;
            }
        }, {
            key: "load",
            value: function load() {
                if (this._loaders.length == 0) {
                    this.onResourcesLoaded(this);
                } else {
                    for (var i = 0; i < this._loaders.length; i++) {
                        this._loaders[i].load();
                    }
                }
            }
        }, {
            key: "_onResourceLoaded",
            value: function _onResourceLoaded(evt) {
                var _this2 = this;

                var loader = evt.target;
                var resource = evt.resource;
                var success = evt.success;

                var index = this._loaders.indexOf(loader);
                if (index == -1) {
                    console.error("loader not referenced in BatchLoader", loader, resource);
                }
                this._loaders.splice(index, 1);
                if (success) {
                    this.loadedResources.push(resource);
                } else {
                    this.failedResources.push(resource);
                }
                loader.kill();

                if (this._loaders.length == 0) {
                    setTimeout(function () {
                        _this2.onResourcesLoaded(_this2);
                    }, 0);
                } else {
                    this.jx.debug.log("loaders", this._loaders);
                }
            }
        }]);

        return BatchLoader;
    }();

    exports.default = BatchLoader;
});
//# sourceMappingURL=BatchLoader.js.map