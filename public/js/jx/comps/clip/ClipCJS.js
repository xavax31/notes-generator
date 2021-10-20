define(["exports", "jx/comps/visualcomponent/VisualComponentCJS"], function (exports, _VisualComponentCJS2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ClipCJS = undefined;

    var _VisualComponentCJS3 = _interopRequireDefault(_VisualComponentCJS2);

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var ClipCJS = function (_VisualComponentCJS) {
        _inherits(ClipCJS, _VisualComponentCJS);

        function ClipCJS(dataObject) {
            _classCallCheck(this, ClipCJS);

            return _possibleConstructorReturn(this, (ClipCJS.__proto__ || Object.getPrototypeOf(ClipCJS)).call(this, Object.assign({
                symbolID: "$main"
            }, dataObject)));
        }

        _createClass(ClipCJS, [{
            key: "_create",
            value: function _create() {
                _get(ClipCJS.prototype.__proto__ || Object.getPrototypeOf(ClipCJS.prototype), "_create", this).call(this);

                if (this.view) {
                    var view = this.view;
                    this.dataObject.x = view.x;
                    this.dataObject.y = view.y;
                    this.dataObject.anchorX = view.regX;
                    this.dataObject.anchorY = view.regY;
                    this.dataObject.rotation = view.rotation;
                    var _bounds = void 0;
                    if (view.frameBounds && view.frameBounds[0] === null) {
                        var shape = new createjs.Shape();
                        shape.graphics.beginFill("#000000").drawRect(0, 0, 1, 1);
                        view.addChild(shape);
                        view.setBounds(0, 0, 1, 1);
                    }
                    _bounds = view.getBounds() || view["nominalBounds"] || { x: 0, y: 0, width: 0, height: 0 };
                    this.dataObject.width = (_bounds.width || 0) * view.scaleX;
                    this.dataObject.height = (_bounds.height || 0) * view.scaleY;
                    this.dataObject.alpha = this.dataObject.alpha == undefined ? view.alpha : this.dataObject.alpha;
                    this.dataObject.visible = this.dataObject.visible == undefined ? view.visible : this.dataObject.visible;
                    view["_jxClip"] = this;
                    this._ready = true;
                } else if (this.dataObject.spritesheet) {
                    var res = this.jx.db.findOne({ id: this.dataObject.spritesheet }).data;
                    var data = {
                        images: res.images,
                        frames: res.frames,
                        animations: res.animations
                    };
                    this.view = new createjs.Sprite(new createjs.SpriteSheet(data));
                    this.dataObject.x = this.view.x;
                    this.dataObject.y = this.view.y;
                    this.dataObject.anchorX = this.view.regX;
                    this.dataObject.anchorY = this.view.regY;
                    this.dataObject.rotation = this.view.rotation;
                    var bounds = this.view.getBounds() || this.view["nominalBounds"];
                    this.dataObject.width = bounds.width * this.view.scaleX;
                    this.dataObject.height = bounds.height * this.view.scaleY;
                    this.dataObject.visible = this.dataObject.visible == undefined ? this.view.visible : this.dataObject.visible;
                    this.view["_jxClip"] = this;
                    this._ready = true;
                } else if (this.dataObject.resourceID) {
                        var resource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                        if (resource.type == "flashtml") {
                            this.dataObject.visible = this.dataObject.visible == undefined ? true : this.dataObject.visible;
                            this._ready = false;
                            return;
                        }
                        ;
                    } else {
                        this.jx.syserror("ClipCJS '" + this.id + "' can not be created.\n                Reasons could be:\n                - none of view, resourceID or spritesheet arguments exists (one of them must be provided).\n                - If view provided, check mc's name in fla is correct.");
                    }
            }
        }, {
            key: "kill",
            value: function kill() {
                if (this._killed) return;

                if (this.view) {
                    this.removeAllChildren();
                    this.stop();
                }
                ;
                _get(ClipCJS.prototype.__proto__ || Object.getPrototypeOf(ClipCJS.prototype), "kill", this).call(this);
            }
        }, {
            key: "init",
            value: function init(callback) {
                var _this2 = this;

                _get(ClipCJS.prototype.__proto__ || Object.getPrototypeOf(ClipCJS.prototype), "init", this).call(this, function (evt) {
                    if (_this2._ready) {
                        callback({ target: _this2 });
                    }
                    ;

                    if (_this2.dataObject.resourceID) {
                        var resource = _this2.jx.db.findOne({ id: _this2.dataObject.resourceID });
                        if (resource.type.toLowerCase() == "flashtml") {
                            var lib = resource.data;
                            _this2.view = lib.getFromSymbol(_this2.dataObject.symbolID);
                            if (_this2.dataObject.stage) {
                                _this2.view.visible = false;
                                _this2.dataObject.stage.addChild(_this2);
                                _this2.dataObject.stage.update();
                                var r1 = _this2.width / lib.libProperties.width;
                                _this2.ratioWidth = _this2.dataObject.stage.width * r1;
                            }
                            lib.getAs({
                                clip: _this2.view,

                                framerate: _this2.dataObject.framerate,
                                loops: _this2.dataObject.loops,
                                optimised: _this2.dataObject.optimised,
                                include: _this2.dataObject.include || null,
                                exclude: _this2.dataObject.exclude || [],
                                toFreeze: _this2.dataObject.toFreeze || [],
                                onInitialised: function onInitialised(evt) {
                                    _this2.jx.syslog("clip initialised", _this2.view);
                                    _this2._ready = true;
                                    _this2.view.visible = _this2.dataObject.visible;
                                    _this2.view["_jxClip"] = _this2;
                                    _this2.flashLibProperties = lib.libProperties;
                                    callback({ target: _this2 });
                                }
                            });
                        }
                        ;
                    }
                });
            }
        }, {
            key: "initAs",
            value: function initAs(params) {
                if (!this._jxAddons) this.ccid({ id: "_jxAddons" });
                if (typeof params == "function") {
                    params(this);
                } else {
                    var dataObject = Object.assign({ clip: this }, params);
                    dataObject.type = this.jx.tools.instanceType(params.type) == "string" ? this.jx.db.getClass("comps/clipinitas/" + params.type) : params.type;
                    this._jxAddons.cc(dataObject);
                }
                return this;
            }
        }, {
            key: "getClip",
            value: function getClip(_ref) {
                var path = _ref.path;
                var start = _ref.start;
                var end = _ref.end;
                var _ref$parent = _ref.parent;
                var parent = _ref$parent === undefined ? null : _ref$parent;
                var _ref$sort = _ref.sort;
                var sort = _ref$sort === undefined ? false : _ref$sort;

                if (!path) return null;
                var pathArr = path.split(".");
                var children = parent == null ? this.view.children : parent.children;
                var result = void 0;
                if (start != null && end != null) {
                    result = this.getClipByInterval({ path: path, start: start, end: end });
                } else {
                    result = this.getClipByPath({ path: path, parent: parent });
                }

                return sort == "asc" ? result.sort(function (a, b) {
                    return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
                }) : result;
            }
        }, {
            key: "getClipByInterval",
            value: function getClipByInterval(_ref2) {
                var path = _ref2.path;
                var start = _ref2.start;
                var end = _ref2.end;

                if (!path) return null;
                var results = [];
                for (var i = start; i <= end; i++) {
                    var name = this.jx.tools.str.replaceChar({ string: path, index: i });
                    var clip = this.getClipByPath({ path: name })[0];
                    clip.no = i;
                    results.push(clip);
                }
                ;
                return results;
            }
        }, {
            key: "getClipByPath",
            value: function getClipByPath(_ref3) {
                var path = _ref3.path;
                var _ref3$parent = _ref3.parent;
                var parent = _ref3$parent === undefined ? null : _ref3$parent;

                if (!path) return null;
                var pathArr = path.split(".");
                parent = parent || this.view;
                var children = parent.children;
                var results = [];
                for (var i = 0; i < children.length; i++) {
                    var clips = this.jx.tools.cjs.getChildrenByName(parent, pathArr[0]);
                    if (pathArr.length == 1) {
                        for (var k = 0; k < clips.length; k++) {
                            clips[k] = clips[k]._jxClip || this.cc({ type: "Clip", view: clips[k] });
                        }
                        return clips;
                    } else {
                        pathArr.shift();
                        return this.getClipByPath({ path: pathArr.join("."), parent: clips[0] });
                    }
                }
                ;
            }
        }, {
            key: "findClipRec",
            value: function findClipRec(_ref4) {
                var id = _ref4.id;
                var _ref4$parent = _ref4.parent;
                var parent = _ref4$parent === undefined ? null : _ref4$parent;

                if (!id) return null;
                var regExp = new RegExp(id, "g");
                parent = parent || this.view;
                var children = parent.children;
                var results = [];
                for (var i = 0; i < children.length; i++) {
                    if (children[i].name && children[i].name.search(regExp) !== -1) {
                        results.push(children[i]._jxClip || this.cc({ type: "Clip", view: children[i] }));
                    }
                    if (children[i].children) {
                        results = results.concat(this.findClipRec({ id: id, parent: children[i] }));
                    }
                }
                return results;
            }
        }, {
            key: "forEachMovieClipRec",
            value: function forEachMovieClipRec(_ref5) {
                var func = _ref5.func;
                var _ref5$parent = _ref5.parent;
                var parent = _ref5$parent === undefined ? null : _ref5$parent;

                parent = parent || this.view;
                var children = parent.children;
                for (var i = 0; i < children.length; i++) {
                    func(children[i], parent);

                    if (children[i].children) {
                        this.forEachMovieClipRec({ func: func, parent: children[i] });
                    }
                }
            }
        }, {
            key: "addChild",
            value: function addChild(child) {
                this.view.addChild(child.view);
                child.parent = this;
            }
        }, {
            key: "addChildAt",
            value: function addChildAt(child, index) {
                this.view.addChildAt(child.view, index);
                child.parent = this;
            }
        }, {
            key: "removeChild",
            value: function removeChild(child) {
                this.view.removeChild(child.view);
                child.parent = null;
            }
        }, {
            key: "removeAllChildren",
            value: function removeAllChildren() {
                if (!this.view || !this.view.children) return;
                var children = this.view.children;
                for (var i = 0; i < children.length; i++) {
                    if (children[i]["_jxClip"]) {
                        children[i]["_jxClip"].parent = null;
                    }
                }
                this.view.removeAllChildren();
            }
        }, {
            key: "setChildIndex",
            value: function setChildIndex(child, index) {
                this.view.setChildIndex(child.view, index);
            }
        }, {
            key: "getChildIndex",
            value: function getChildIndex(child) {
                return this.view.getChildIndex(child.view);
            }
        }, {
            key: "getChildAt",
            value: function getChildAt(index) {
                return this.view.getChildAt(index);
            }
        }, {
            key: "getChildByName",
            value: function getChildByName(path) {
                for (var b = this.view.children, c = 0, d = b.length; d > c; c++) {
                    if (b[c].name == path) return b[c];
                }
                return null;
            }
        }, {
            key: "getMCChildrenByPattern",
            value: function getMCChildrenByPattern(pattern) {
                return this.jx.tools.cjs.getChildrenByName(this.view, pattern);
            }
        }, {
            key: "getAllMCChildren",
            value: function getAllMCChildren() {
                return this.view.children;
            }
        }, {
            key: "getMCChildByPath",
            value: function getMCChildByPath(path) {
                var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                if (!path) return null;
                var pathArr = path.split(".");
                var children = parent == null ? this.view.children : parent.children;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].name == pathArr[0]) {
                        pathArr.shift();
                        if (pathArr.length == 0) {
                            return children[i];
                        } else {
                            return this.getMCChildByPath(pathArr.join("."), children[i]);
                        }
                    }
                    ;
                }
                ;
                this.jx.syswarn("MovieClip", path, "not found in Clip of id", this.id);
                return null;
            }
        }, {
            key: "getMC",
            value: function getMC(path) {
                var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                return this.getMCChildByPath(path, parent);
            }
        }, {
            key: "_getMCFullPath",
            value: function _getMCFullPath(mc) {
                var result = "";
                var parent = mc.parent;
                while (parent) {
                    this.jx.syslog(parent.name, parent);
                    result = parent.name + "." + result;
                    parent = parent.parent;
                }
                return result;
            }
        }, {
            key: "gotoAndStop",
            value: function gotoAndStop() {
                if (this._playOnceListener) {
                    this.view.timeline.off("change", this._playOnceListener);
                    this._playOnceListener = null;
                }

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                this.view.gotoAndStop(args);
            }
        }, {
            key: "gotoAndPlay",
            value: function gotoAndPlay() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                this.view.gotoAndPlay(args);
            }
        }, {
            key: "play",
            value: function play() {
                this.view.play();
            }
        }, {
            key: "getLabels",
            value: function getLabels() {
                return this.view.labels;
            }
        }, {
            key: "getLabelFrame",
            value: function getLabelFrame(label) {
                for (var labelObj in this.view.labels) {
                    this.jx.syslog(this.view.labels[labelObj].label, label);
                    if (this.view.labels[labelObj].label == label) return this.view.labels[labelObj].position;
                }
            }
        }, {
            key: "playOnce",
            value: function playOnce() {
                var _this3 = this;

                var _ref6 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref6$start = _ref6.start;
                var start = _ref6$start === undefined ? null : _ref6$start;
                var _ref6$end = _ref6.end;
                var end = _ref6$end === undefined ? null : _ref6$end;
                var _ref6$onfinished = _ref6.onfinished;
                var onfinished = _ref6$onfinished === undefined ? function (evt) {} : _ref6$onfinished;
                var _ref6$onframechange = _ref6.onframechange;
                var onframechange = _ref6$onframechange === undefined ? function (evt) {} : _ref6$onframechange;

                this.stop();
                this.view.timeline.loop = false;
                this._oldFrame = this.curentFrame;
                this._playOnceListener = this.view.timeline.on("change", function (evt) {
                    if (_this3._oldFrame !== _this3.currentFrame) {
                        onframechange({ frame: _this3.currentFrame, target: evt.target });
                    }
                    if (_this3.currentFrame >= end) {
                        _this3.stop();
                        onfinished({ target: _this3 });
                    }
                });

                if (start == null) start = this.currentFrame;
                if (end == null) end = this.totalFrames - 1;
                for (var labelObj in this.view.labels) {
                    if (labelObj.label == start) start = labelObj.position;
                    if (labelObj.label == end) end = labelObj.position;
                }
                ;
                this.gotoAndPlay(start);
            }
        }, {
            key: "stop",
            value: function stop() {
                if (this._playOnceListener) {
                    this.view.timeline.off("change", this._playOnceListener);
                    this._playOnceListener = null;
                }
                this.view.stop();
            }
        }, {
            key: "gotoLabel",
            value: function gotoLabel(label, params) {
                this._overdubEvents(params);

                var labelFounded = false;
                for (var i = 0; i < this.labels.length; i++) {
                    if (label == this.labels[i].label) {
                        labelFounded = true;
                        this.currentLabelIndex = i;
                        break;
                    }
                }

                if (labelFounded == false) {
                    this._dispatchEvent({
                        type: "error",
                        text: "label " + label + "not found on " + this.clip.name
                    });
                    return;
                }

                this.clip.gotoAndStop(label);
                Clip.arrangeFlashClipsNames(this.clip);

                if (this._dispatchEvent({
                    type: "labelEnter",
                    label: label
                }) == false) {
                    return;
                }

                this._labelAnalyser.check(function (result) {
                    switch (result.event) {
                        case "before":
                            break;
                        case "running":
                            break;
                        case "finished":
                    }
                });
            }
        }, {
            key: "_overdubEvents",
            value: function _overdubEvents(params) {
                throw new Error("Method not implemented.");
            }
        }, {
            key: "_dispatchEvent",
            value: function _dispatchEvent(arg0) {
                throw new Error("Method not implemented.");
            }
        }, {
            key: "freeze",
            value: function freeze() {
                this.view.tickEnabled = false;
                this.cache();
            }
        }, {
            key: "unfreeze",
            value: function unfreeze() {
                this.view.tickEnabled = true;
                this.view.uncache();
            }
        }, {
            key: "name",
            get: function get() {
                return this.view ? this.view.name : null;
            }
        }, {
            key: "mousechildren",
            get: function get() {
                console.warn("mousechildren deprecated, use mouseChildren instead");
                return this.view.mouseChildren;
            }
        }, {
            key: "mouseChildren",
            get: function get() {
                return this.view.mouseChildren;
            },
            set: function set(value) {
                this.view.mouseChildren = value;
            }
        }, {
            key: "currentFrame",
            get: function get() {
                return this.view.currentFrame;
            }
        }, {
            key: "currentLabel",
            get: function get() {
                return this.view.currentLabel;
            }
        }, {
            key: "totalFrames",
            get: function get() {
                return this.view.totalFrames;
            }
        }]);

        return ClipCJS;
    }(_VisualComponentCJS3.default);

    exports.default = ClipCJS;
    exports.ClipCJS = ClipCJS;
});
//# sourceMappingURL=ClipCJS.js.map