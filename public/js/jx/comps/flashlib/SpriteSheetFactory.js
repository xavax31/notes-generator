define(["exports", "jx/core/JXObject"], function (exports, _JXObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

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

    var spriteSheetNo = 0;
    var uniqID = 0;

    var SpriteSheetFactory = function (_JXObject) {
        _inherits(SpriteSheetFactory, _JXObject);

        function SpriteSheetFactory(params) {
            _classCallCheck(this, SpriteSheetFactory);

            var _this = _possibleConstructorReturn(this, (SpriteSheetFactory.__proto__ || Object.getPrototypeOf(SpriteSheetFactory)).call(this, params));

            _this._params = params;
            _this.spriteSheet = null;
            _this.mcs = null;
            _this._builder;
            _this.initialize();
            return _this;
        }

        _createClass(SpriteSheetFactory, [{
            key: "initialize",
            value: function initialize() {}
        }, {
            key: "rasterize",
            value: function rasterize(mcs, callback) {
                var scale = arguments.length <= 2 || arguments[2] === undefined ? this.jx.config.app.quality : arguments[2];

                if (mcs.length == 0) {
                    callback({ target: this, mcs: this.mcs, spriteSheet: this.spriteSheet });
                    return;
                }
                ;
                this.mcs = mcs;
                var w;

                scale = scale || this.jx.config.quality;
                var mc;
                function buildComplete(event) {
                    console.log("Rasterization end", event, (Date.now() - this._rasterizeTimeStart) / 1000, "secondes");
                    this._builder.removeEventListener("complete", buildComplete.bind(this));

                    this._builder.removeAllEventListeners();
                    this.spriteSheet = event.target.spriteSheet;
                    spriteSheetNo++;

                    if (this.jx.config.urlParams.showspritesheet != undefined && this.jx.config.urlParams.showspritesheet) {
                        var win = window.open("", "win" + spriteSheetNo);
                        win.document.open("text/html");
                        win.document.write("<body>" + this.spriteSheet._images.length + "<br></body>");
                        var viewSpriteSheetResult = "";
                        for (var i = 0; i < this.spriteSheet._images.length; i++) {
                            win.document.write("<br>SpriteSheet " + i);
                            win.document.body.appendChild(this.spriteSheet._images[i]);
                        }
                        ;

                        win.document.close();
                    }
                    callback({ target: this, mcs: this.mcs, spriteSheet: this.spriteSheet });
                }

                this._builder = new createjs.SpriteSheetBuilder();
                this._builder.scale = scale;
                this._builder.maxWidth = this.jx.config.flashOptimizer.spriteSheetMaxWidth;
                this._builder.maxHeight = this.jx.config.flashOptimizer.spriteSheetMaxWidth;
                var resultx = [];

                for (var i = 0; i < this.mcs.length; i++) {
                    mc = this.mcs[i];
                    mc.rasteriseScale = mc.rasteriseScale || 1;
                    mc.builderRasteriseScale = scale;
                    var mcClassName = this._params.lib.getMCClass(mc);

                    var alreadyRasterised = false;
                    for (var j = 0; j < resultx.length; j++) {
                        if (resultx[j].className == mcClassName) {
                            alreadyRasterised = true;
                            mc.jxLabelPrefix = resultx[j].mc.jxLabelPrefix;
                        }
                    }
                    if (alreadyRasterised) {} else {
                        resultx.push({ className: mcClassName, mc: mc });
                        w = mc.nominalBounds.width * scale;

                        if (mc.timeline == undefined && mc.labels == undefined || mc.timeline.duration == 1) {
                            var index = this._builder.addFrame(mc, mc.getTransformedBounds(), mc.rasteriseScale);

                            this._builder.addAnimation(mc.name + "_E1", index);
                        } else if (mc.labels != undefined && mc.labels.length == 0) {
                                var labels = {};
                                mc.jxLabelPrefix = ++uniqID + "_";
                                labels[mc.jxLabelPrefix + "E1"] = 0;
                                mc.timeline.setLabels(labels);
                                this.addMovieClip(mc, null, mc.rasteriseScale);
                            } else {
                                    if (mc.clip != null) {
                                        var mcin;
                                        for (var j = 0; j < mc.labels.length; j++) {
                                            mc.gotoAndStop(mc.labels[j].label);
                                            this.jx.tools.cjs.arrangeFlashClipsNames(mc);
                                            mcin = this.jx.tools.cjs.getChildrenByName(mc, "^clip")[0];
                                            var newLabels = {};
                                            newLabels[mc.name + "_" + mc.labels[j].label] = 0;

                                            if (mcin.timeline != undefined) {
                                                mcin.timeline.setLabels(newLabels);
                                                this.addMovieClip(mcin, mc.rasteriseScale || 1);
                                            } else {
                                                    var index = this._builder.addFrame(mcin, mcin.getTransformedBounds(), mc.rasteriseScale || 1);

                                                    this._builder.addAnimation(mc.name + "_" + mc.labels[j].label, index);
                                                }
                                        }
                                        ;
                                    } else {
                                            var labels = mc.timeline.getLabels();
                                            var newLabels = {};
                                            for (var j = 0; j < labels.length; j++) {
                                                mc.jxLabelPrefix = ++uniqID + "_";
                                                labels[j].label = mc.jxLabelPrefix + labels[j].label;
                                                newLabels[labels[j].label] = labels[j].position;
                                            }
                                            mc.timeline.setLabels(newLabels);
                                            this.addMovieClip(mc, null, mc.rasteriseScale || 1);
                                        }
                                }
                    }
                }
                this._rasterizeTimeStart = Date.now();
                console.log("Rasterize start");

                this._builder.addEventListener("complete", buildComplete.bind(this));

                this._builder.addEventListener("progress", function (evt) {
                    return console.log(evt);
                });
                var ok = false;

                this._builder.buildAsync();
                ok = true;
            }
        }, {
            key: "getMCByName",
            value: function getMCByName(name) {
                for (var i = 0; i < this.mcs.length; i++) {
                    if (this.mcs[i].name == name) {
                        return this.mcs[i];
                    }
                }
                ;
                return null;
            }
        }, {
            key: "getMCByPath",
            value: function getMCByPath(path) {
                for (var i = 0; i < this.mcs.length; i++) {
                    if (this.jx.tools.cjs.getAbsolutePath(this.mcs[i]) == path) {
                        return this.mcs[i];
                    }
                }
                ;
                return null;
            }
        }, {
            key: "getRasterizedClip",
            value: function getRasterizedClip(_ref) {
                var id = _ref.id;
                var parent = _ref.parent;
                var path = _ref.path;

                return this.initClip({ id: id, parent: parent, path: path });
            }
        }, {
            key: "initClip",
            value: function initClip(params) {
                var sprite = function sprite(params) {
                    if (params.mc == null) {
                        return null;
                    }
                    this.mc = params.mc;
                    this.sprite = params.sprite;
                    if (params.parent == null) {
                        console.log(this.mc);
                    }
                    var parent = params.parent;
                    this.name = this.mc.name;
                    if (params.framerate != undefined) {
                        this.sprite.framerate = params.framerate;
                    }
                    ;

                    var scale = 1 / this.mc.builderRasteriseScale;
                    console.log(this.mc, this.mc.scaleX, this.mc.scaleY);
                    this.sprite.setTransform(this.mc.x, this.mc.y, this.mc.skewY == 180 ? -scale : scale, this.mc.skewX == 180 ? -scale : scale);
                    this.sprite.gotoAndPlay(this.mc.jxLabelPrefix + "E1");
                    this.sprite.name = this.mc.name;
                    this.sprite.visible = true;
                    this.listeners = {};
                    this._enabled = false;
                    Object.defineProperties(this, { "enabled": {
                            set: function set(value) {
                                var _this2 = this;

                                if (value == this._enabled) {
                                    return;
                                }
                                ;
                                this._enabled = value;
                                if (value) {
                                    this.listeners.rollout = this.sprite.on("rollout", function (evt) {});
                                    this.listeners.pressup = this.sprite.on("pressup", function (evt) {});
                                    this.listeners.mousedown = this.sprite.on("mousedown", function (evt) {
                                        if (params.onClick != undefined) {
                                            params.onClick.call(_this2, { target: _this2 });
                                        }
                                        ;
                                    });
                                } else {
                                    this.sprite.removeAllEventListeners();
                                }
                            }
                        } });
                    Object.defineProperties(this, { "visible": {
                            set: function set(value) {
                                this.sprite.visible = value;
                            }
                        } });
                    this.gotoAndStop = function (label) {
                        this.sprite.gotoAndStop(typeof label == "string" ? this.mc.jxLabelPrefix + label : label);
                    };
                    this.gotoAndPlay = function (label) {
                        this.sprite.gotoAndPlay(typeof label == "string" ? this.mc.jxLabelPrefix + label : label);
                    };
                };
                params.sprite = new createjs.Sprite(this.spriteSheet);
                if (params.path) {
                    params.mc = this.getMCByPath(params.path);
                } else {
                    params.mc = params.id != undefined ? this.getMCByName(params.id) : params.mc;
                }

                return new sprite(params);
            }
        }, {
            key: "addMovieClip",
            value: function addMovieClip(source, sourceRect, scale, setupFunction, setupData, labelFunction) {
                if (this._builder._data) {
                    throw createjs.SpriteSheetBuilder.ERR_RUNNING;
                }
                var rects = source.frameBounds;
                var rect = sourceRect || source.bounds || source.nominalBounds;
                if (!rect && source.getBounds) {
                    rect = source.getBounds();
                }
                if (!rect && !rects) {
                    return;
                }
                var i,
                    l,
                    baseFrameIndex = this._builder._frames.length;
                var duration = source.timeline.duration;

                for (i = 0; i < duration; i++) {
                    var r = rects && rects[i] ? rects[i] : rect;

                    this._builder.addFrame(source, r, scale, this._builder._setupMovieClipFrame, { i: i, f: setupFunction, d: setupData });
                }
                var labels = source.timeline._labels;
                var lbls = [];
                for (var n in labels) {
                    lbls.push({ index: labels[n], label: n });
                }
                if (lbls.length) {
                    lbls.sort(function (a, b) {
                        return a.index - b.index;
                    });
                    for (i = 0, l = lbls.length; i < l; i++) {
                        var label = lbls[i].label;
                        var start = baseFrameIndex + lbls[i].index;
                        var end = baseFrameIndex + (i == l - 1 ? duration : lbls[i + 1].index);
                        var frames = [];
                        for (var j = start; j < end; j++) {
                            frames.push(j);
                        }
                        if (labelFunction) {
                            label = labelFunction(label, source, start, end);
                            if (!label) {
                                continue;
                            }
                        }
                        this._builder.addAnimation(label, frames, true);
                    }
                }
            }
        }]);

        return SpriteSheetFactory;
    }(_JXObject3.default);

    exports.default = SpriteSheetFactory;
});
//# sourceMappingURL=SpriteSheetFactory.js.map