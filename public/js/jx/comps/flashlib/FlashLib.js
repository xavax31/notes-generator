define(["exports", "jx/comps/clip/Clip", "jx/core/comps/Component", "jx/comps/flashlib/SpriteSheetFactory"], function (exports, _Clip, _Component2, _SpriteSheetFactory) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Clip2 = _interopRequireDefault(_Clip);

    var _Component3 = _interopRequireDefault(_Component2);

    var _SpriteSheetFactory2 = _interopRequireDefault(_SpriteSheetFactory);

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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var FlashLib = function (_Component) {
        _inherits(FlashLib, _Component);

        function FlashLib(dataObject) {
            _classCallCheck(this, FlashLib);

            var _this = _possibleConstructorReturn(this, (FlashLib.__proto__ || Object.getPrototypeOf(FlashLib)).call(this, Object.assign({ id: "", resourceID: null, toRasterize: [], onInitialised: function onInitialised(event) {} }, dataObject)));

            _this.targetParent = _this.dataObject.targetParent;
            _this.resourceID = _this.dataObject.resourceID;
            var resLib = _this.jx.db.findOne({ id: _this.dataObject.resourceID });
            _this.mainID = resLib.mainSymbolID;
            _this._lib = resLib.data;
            _this.libProperties = _this._lib.properties;
            _this.flashExportIDE = resLib.versionIDE;
            _this._spriteSheetBuilder = new _SpriteSheetFactory2.default({ jx: _this.jx, lib: _this, toRasterize: _this.dataObject.toRasterize, onInitialised: _this.dataObject.onInitialised });
            return _this;
        }

        _createClass(FlashLib, [{
            key: "getAs",
            value: function getAs(params) {
                this.jx.syslog("FlashLib.getAs", params);
                params = this.jx.tools.mergeObject({ type: "auto", clip: null, optimised: true, exclude: [], toFreeze: [], onInitialised: function onInitialised(evt) {} }, params);
                this["_getas_" + params.type](params);
            }
        }, {
            key: "_getas_auto",
            value: function _getas_auto(params) {
                var _this2 = this;

                var result = this._scanClip(params);

                var clip = result.clip;
                var scan = result.scan;
                var child;
                var toRasterize = [];
                var notToRasterize = [];
                var toOptimise = false;
                var toFreeze = false;
                var toCache = false;
                var include = params.include || null;
                var scaleFactor = this.jx.config.urlParams.scaleFactor != undefined ? this.jx.config.urlParams.scaleFactor : 1;
                for (var i = 0; i < scan.length; i++) {
                    child = scan[i].clip;

                    if (!params.include) {
                        toFreeze = false;
                        for (var k = 0; k < params.toFreeze.length; k++) {
                            if (child.name.search(params.toFreeze[k]) != -1) {
                                toFreeze = true;
                                break;
                            }
                            ;
                        }
                        ;
                        toOptimise = true;
                        for (var k = 0; k < params.exclude.length; k++) {
                            if (child.name.search(params.exclude[k]) != -1 || this._lib[params.exclude[k]]) {
                                toOptimise = false;
                                break;
                            }
                            ;
                        }
                        ;
                        toOptimise = toOptimise && params.optimised;
                    } else {
                        toOptimise = false;
                        for (var k = 0; k < params.include.length; k++) {
                            if (child.name.search(params.include[k].id) != -1) {
                                var infosChild = Object.assign({
                                    id: null,
                                    cache: true,
                                    freeze: -1
                                }, params.include[k]);
                                toFreeze = infosChild.freeze;
                                toCache = infosChild.cache;
                                toOptimise = true;
                                break;
                            }
                        }
                    }
                    switch (scan[i].type) {
                        case "Image":
                            if (this.jx.config.flashOptimizer.cacheStatics == "always" && scan[i].args != "nocache" || this.jx.config.flashOptimizer.cacheStatics == "if_optimisation" && toOptimise && scan[i].args != "nocache") {
                                var bounds = child.getBounds() || child.nominalBounds || { x: 0, y: 0, width: 1, height: 1 };
                                var qualityFactor = this.jx.config.flashOptimizer.quality == "best" ? window.devicePixelRatio : 1;
                                var ratio = Math.max(this.jx.config.system.screen.resolution.width, this.jx.config.system.screen.resolution.height) / Math.max(bounds.width * child.scaleX, bounds.height * child.scaleY);
                                ratio = ratio < 1 ? ratio : 1;
                                var scaleTotal = Math.max(child.scaleX, child.scaleY) * ratio * scaleFactor * qualityFactor;
                                if (bounds.width * scaleTotal > 2048 || bounds.height * scaleTotal > 2048) {
                                    this.jx.syswarn("Image Cache reaches max limits 2048 and has been reduced to fit in limits", child);
                                    scaleTotal = Math.min(2048 / bounds.width, 2048 / bounds.height);
                                }
                                ;
                                child.cache(bounds.x, bounds.y, bounds.width, bounds.height, scaleTotal);
                                if (child.cacheCanvas.width > 2048 || child.cacheCanvas.height > 2048) {
                                    this.jx.syserror("Image Cache reaches max limits 2048 (reduction auto has not working)", child.cacheCanvas, child);
                                } else {
                                    this.jx.sysinfo("Image Cache", child.cacheCanvas.width, child.cacheCanvas, this.jx.config.system.screen.resolution, child);
                                }
                            } else {
                                notToRasterize.push(child);
                            }
                            break;
                        case "Animation":
                            child.framerate = params.framerate || this._lib.properties.fps || this.jx.config.framerate;
                            child.jxRasterised = toOptimise;
                            child.jxloops = scan[i].args == "" ? 0 : Number(scan[i].args);
                            if (toOptimise) {
                                if (toFreeze !== -1 && toFreeze !== false) {
                                    var bounds = child.getBounds() || child.nominalBounds || { x: 0, y: 0, width: 1, height: 1 };
                                    if (this.jx.tools.instanceType(toFreeze) == "number") {
                                        child.gotoAndStop(toFreeze);
                                    }
                                    child.tickEnabled = false;
                                    if (toCache) {
                                        child.cache(bounds.x, bounds.y, bounds.width, bounds.height, Math.max(child.scaleX, child.scaleY) * scaleFactor);
                                    }
                                    ;
                                } else {
                                    child.rasteriseScale = Math.max(child.scaleX, child.scaleY) * scaleFactor;
                                    toRasterize.push(child);
                                }
                            } else {
                                notToRasterize.push(child);
                                if (child.jxloops > 0) {
                                    child.loop = true;
                                    child.timeline.jxmc = child;
                                    child.timeline.addEventListener("change", function (evt) {
                                        if (evt.target.position >= evt.target.duration - 1) {
                                            evt.target.jxmc.jxloops--;
                                            if (evt.target.jxmc.jxloops <= 0) {
                                                evt.target.removeAllEventListeners();
                                                evt.target.jxmc.stop();
                                                ;
                                            }
                                            ;
                                        }
                                        ;
                                    });
                                }
                                ;
                                child.gotoAndPlay(0);
                            }
                            break;
                        case "Text":
                            if (toOptimise) {
                                var bounds = child.getBounds() || child.nominalBounds || { x: 0, y: 0, width: 1, height: 1 };
                                child.cache(bounds.x, bounds.y, bounds.width, bounds.height, Math.max(child.scaleX, child.scaleY) * scaleFactor);
                            } else {
                                notToRasterize.push(child);
                            }
                            break;
                        case "Container":
                            break;
                    }
                }
                ;

                this.rasterize({ items: toRasterize, onFinished: function onFinished(event) {
                        _this2._rasterizeTimeStart = Date.now();

                        for (var i = 0; i < toRasterize.length; i++) {
                            var rasterClip = _this2.getRasterizedClip({
                                id: toRasterize[i].name,
                                path: _this2.jx.tools.cjs.getAbsolutePath(toRasterize[i]),
                                parent: toRasterize[i].parent
                            });
                            var parent = toRasterize[i].parent;
                            rasterClip.sprite.stop();
                            rasterClip.sprite.rotation = rasterClip.mc.rotation;
                            rasterClip.sprite.framerate = params.framerate || _this2._lib.properties.fps || _this2.jx.config.framerate;
                            rasterClip.sprite.loops = toRasterize[i].jxloops || 0;
                            parent.addChild(rasterClip.sprite);
                            parent.setChildIndex(rasterClip.sprite, parent.getChildIndex(rasterClip.mc));
                            parent.removeChild(rasterClip.mc);

                            if (toRasterize[i].name) {
                                parent[toRasterize[i].name] = rasterClip.sprite;
                            }
                            ;
                            if (rasterClip.sprite.loops > 0) {
                                rasterClip.sprite.addEventListener("animationend", function (evt) {
                                    evt.target.loops--;
                                    if (evt.target.loops <= 0) {
                                        evt.target.stop();
                                    }
                                    ;
                                });
                            }
                            ;
                            rasterClip.sprite.play();
                        }
                        ;
                        _this2.jx.syslog("- getAs End", (Date.now() - _this2._rasterizeTimeStart) / 1000, "secondes", _this2);
                        params.onInitialised({ target: _this2, view: clip });
                    } });
            }
        }, {
            key: "_scanClip",
            value: function _scanClip(params) {
                var clip = params.clip || this.getFromSymbol("$main");
                this.jx.tools.cjs.arrangeFlashClipsNames(clip);
                var child;
                var classType;
                var name;
                var nameMatches;
                var nameSuffix = "";
                var nameArgs = "";
                var result = [];
                var compTypes = {
                    img: "Image",
                    anim: "Animation",
                    text: "Text",
                    cont: "Container"
                };
                for (var i = 0; i < clip.children.length; i++) {
                    child = clip.children[i];

                    name = child.name || "";

                    classType = this._getClassName(child);
                    nameSuffix = "";
                    nameArgs = "";

                    nameMatches = name.match(/_([^_]*)_([^_]*)$/);
                    if (nameMatches && compTypes[nameMatches[1]]) {
                        nameSuffix = nameMatches[1];
                        nameArgs = nameMatches[2];
                    } else {
                        nameMatches = name.match(/_([^_]*)_$/);
                        if (nameMatches) {
                            nameSuffix = nameMatches[1];
                            nameArgs = "";
                        }
                    }
                    if (nameMatches) {
                        var newName = name.replace(nameMatches[0], "");

                        if (child.parent) {
                            delete child.parent[child.name];
                            child.parent[newName] = child;
                        }
                        ;
                        child.name = newName;
                    }
                    name = child.name || "";

                    var nameCommand = null;
                    nameMatches = name.match(/__(.*)$/);
                    if (nameMatches) {
                        nameCommand = nameMatches[1];
                        var newName = name.replace(nameMatches[0], "");
                        if (child.parent) {
                            delete child.parent[child.name];
                            child.parent[newName] = child;
                        }
                        ;
                        child.name = newName;
                    }
                    child.flaInfo = {
                        fullName: name,
                        nameSuffix: nameSuffix,
                        nameArgs: nameArgs,
                        nameCommand: nameCommand
                    };

                    if (nameSuffix != "" && compTypes[nameSuffix] != undefined) {
                        result.push({ type: compTypes[nameSuffix], clip: child, args: nameArgs });
                        if (nameSuffix == "cont") {
                            var resultChild = this._scanClip({ clip: child });
                            result = result.concat(resultChild.scan);
                        }
                    } else if (classType == "Text") {
                        result.push({ type: "Text", clip: child, args: nameArgs });
                    } else if (classType == "MovieClip") {
                        if (this.flashExportIDE.ide == "animate" && child.totalFrames == 1) {
                            result.push({ type: "Image", clip: child, args: nameArgs });
                        } else {
                            result.push({ type: "Animation", clip: child, args: nameArgs });
                        }
                    } else if (classType == "Container") {
                        if (nameSuffix == "cont") {
                            result.push({ type: "Container", clip: child, args: nameArgs });
                            var resultChild = this._scanClip({ clip: child });
                            result = result.concat(resultChild.scan);
                        } else if (nameSuffix == "text") {
                            result.push({ type: "Text", clip: child, args: nameArgs });
                        } else {
                            result.push({ type: "Image", clip: child, args: nameArgs });
                        }
                        ;
                    }
                }
                ;
                return { clip: clip, scan: result };
            }
        }, {
            key: "_rasterizeClips",
            value: function _rasterizeClips(_ref) {
                var clips = _ref.clips;
                var _ref$onFinished = _ref.onFinished;
                var onFinished = _ref$onFinished === undefined ? function (evt) {} : _ref$onFinished;

                this.rasterize(clips, function (event) {
                    var rasterClip;
                    for (var i = 0; i < toRasterize.length; i++) {
                        rasterClip = flashLib.getRasterizedClip({
                            id: toRasterize[i].name,
                            parent: toRasterize[i].parent
                        });
                        toRasterize[i].visible = false;
                    }
                }, 1);
            }
        }, {
            key: "_getClassName",
            value: function _getClassName(cjsClip) {
                var classTypes = [{ name: "MovieClip", type: createjs.MovieClip }, { name: "Text", type: createjs.Text }, { name: "Bitmap", type: createjs.Bitmap }, { name: "Container", type: createjs.Container }, { name: "Shape", type: createjs.Shape }];
                for (var i = 0; i < classTypes.length; i++) {
                    if (cjsClip instanceof classTypes[i].type) {
                        return classTypes[i].name;
                    }
                }
                ;
                return null;
            }
        }, {
            key: "rasterize",
            value: function rasterize(_ref2) {
                var items = _ref2.items;
                var onFinished = _ref2.onFinished;
                var scale = _ref2.scale;

                this._spriteSheetBuilder.rasterize(items, onFinished, scale);
            }
        }, {
            key: "getRasterizedClip",
            value: function getRasterizedClip(params) {
                return this._spriteSheetBuilder.getRasterizedClip(params);
            }
        }, {
            key: "create",
            value: function create(_ref3) {
                var symbolID = _ref3.symbolID;

                if (symbolID.search(/^\$/) != -1) {
                    switch (symbolID) {
                        case "$main":
                            symbolID = this.id;
                            break;
                    }
                }
                return new _Clip2.default({ id: symbolID, lib: this });
            }
        }, {
            key: "getFromSymbol",
            value: function getFromSymbol(symbolID) {
                if (symbolID.search(/^\$/) != -1) {
                    switch (symbolID) {
                        case "$main":
                            symbolID = this.mainID;
                            break;
                    }
                }
                return new this._lib[symbolID]();
            }
        }, {
            key: "getSymbolClass",
            value: function getSymbolClass(symbolID) {
                return this._lib[symbolID];
            }
        }, {
            key: "getMCClass",
            value: function getMCClass(mc) {
                for (var prop in this._lib) {
                    if (this.jx.tools.instanceType(this._lib[prop]) == "function" && mc instanceof this._lib[prop]) {
                        return prop;
                    }
                }
                return null;
            }
        }]);

        return FlashLib;
    }(_Component3.default);

    exports.default = FlashLib;
});
//# sourceMappingURL=FlashLib.js.map