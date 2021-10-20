define(['exports', 'jx/comps/visualcomponent/VisualComponentDOM'], function (exports, _VisualComponentDOM2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponentDOM3 = _interopRequireDefault(_VisualComponentDOM2);

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

    var VideoDOM = function (_VisualComponentDOM) {
        _inherits(VideoDOM, _VisualComponentDOM);

        function VideoDOM(dataObject) {
            _classCallCheck(this, VideoDOM);

            return _possibleConstructorReturn(this, (VideoDOM.__proto__ || Object.getPrototypeOf(VideoDOM)).call(this, Object.assign({
                videoResource: null,
                resourceID: null,
                initialise: false,
                loops: 0,
                fadeOut: Object.assign({ delay: 100, enabled: false }, dataObject.fadeOut || {}),
                volume: 1,
                oninitialised: function oninitialised(evt) {}
            }, dataObject)));
        }

        _createClass(VideoDOM, [{
            key: '_create',
            value: function _create() {
                _get(VideoDOM.prototype.__proto__ || Object.getPrototypeOf(VideoDOM.prototype), '_create', this).call(this);
                this._initSteps = {
                    sourceAdded: false,
                    metaDataLoaded: false,
                    canPlay: false,
                    canPlayThrough: false
                };
                if (this.dataObject.resourceID != null) {
                    this.videoResource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                } else if (this.dataObject.videoResource != null) {
                    this.videoResource = this.dataObject.videoResource;
                } else if (this.dataObject.src != null) {
                    this.videoResource = { src: this.dataObject.src };
                } else {}
                var video = document.createElement('video');
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');
                video.className = "video";
                video.preload = "auto";
                video.loop = false;
                this.view = $(video);
            }
        }, {
            key: '_initSync',
            value: function _initSync() {
                _get(VideoDOM.prototype.__proto__ || Object.getPrototypeOf(VideoDOM.prototype), '_initSync', this).call(this);
                this.loops = this.dataObject.loops;
                this._loops = this.loops;
                this.frame = 0;
                this.framerate = 12;
                this.fadeOut = this.dataObject.fadeOut;
                this.volume = this.dataObject.volume;
                this._playing = false;
                this.addEventDispatcher("onplay", "onseeked", "onstalled", "onpaused", "onstopped", "onwaiting", "onplaying", "onfinished", "onloadedinfos", "onprogress", "oncanplay", "oncanplaythrough");
                this.view.css("position", "absolute");
                this.view.css("left", "0px");
                this.view.css("top", "0px");
                this.view.css("object-fit", "fill");
                this.view.prop("controls", false);
                this._addInitListeners();
            }
        }, {
            key: 'setResource',
            value: function setResource() {
                var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref$src = _ref.src;
                var src = _ref$src === undefined ? null : _ref$src;

                src = src || (this.videoResource ? this.videoResource.src : null);

                if (src) {
                    if (!this._source) {
                        this._ready = false;
                        this._source = document.createElement('source');
                        this._source.setAttribute("src", src);
                        this._source.setAttribute("type", 'video/mp4; codecs=avc1.42E01E,mp4a.40.2');
                        this.view.append(this._source);
                    } else if (this._source.getAttribute("src") != src) {
                        this._ready = false;
                        this._source.setAttribute("src", src);
                    }
                } else {
                    console.warn("No video resource provided");
                }
            }
        }, {
            key: 'play',
            value: function play() {
                console.log("Play Video", this.id);
                this.setResource();

                this.view[0].play();
                this._playing = true;
            }
        }, {
            key: 'stop',
            value: function stop() {
                var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? { callback: null } : arguments[0];

                var callback = _ref2.callback;

                if (!this._playing) return;
                console.log("stop", this.id);
                this.view[0].pause();
                this.view[0].currentTime = 0;
                this._loops = this.loops;
            }
        }, {
            key: 'pause',
            value: function pause() {
                if (!this._playing) return;
                this._playing = false;
                this.view[0].pause();
            }
        }, {
            key: 'resume',
            value: function resume() {
                console.log("resume", this._playing);
                if (this._playing) return;
                this._playing = true;
                this.view[0].play();
            }
        }, {
            key: 'appFreeze',
            value: function appFreeze() {
                console.log("freeze", this._playing);
                if (this._appFreezed) return false;
                this._stateBeforeFreeze = { playing: this._playing };
                this.pause();
                _get(VideoDOM.prototype.__proto__ || Object.getPrototypeOf(VideoDOM.prototype), 'appFreeze', this).call(this);
            }
        }, {
            key: 'appUnfreeze',
            value: function appUnfreeze() {
                console.log("unfreeze", this);
                if (!this._appFreezed) return false;
                if (this._stateBeforeFreeze.playing) {
                    this.resume();
                }
                ;
                _get(VideoDOM.prototype.__proto__ || Object.getPrototypeOf(VideoDOM.prototype), 'appUnfreeze', this).call(this);
            }
        }, {
            key: 'init',
            value: function init() {
                var _this2 = this;

                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                if (this._ready) {
                    callback({ target: this });
                    return;
                }
                ;

                this.onloadedinfos.addOnce(function (evt) {
                    _this2._ready = true;
                    callback({ target: _this2 });
                });
                this.setResource({ src: this.videoResource.src });
            }
        }, {
            key: 'kill',
            value: function kill() {
                var unload = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

                if (!this.jx) return;
                this.onplay.removeAll();
                this.onseeked.removeAll();
                this.onstalled.removeAll();
                this.onpaused.removeAll();
                this.onstopped.removeAll();
                this.onwaiting.removeAll();
                this.onplay.removeAll();
                this.onplaying.removeAll();
                this.onfinished.removeAll();
                this.onprogress.removeAll();
                this.oncanplaythrough.removeAll();
                this.view[0].pause();
                this.view[0].src = "";
                this.view.children('source').prop('src', '');
                this.view.remove().length = 0;

                this._source = null;
                this.videoResource = null;
                _get(VideoDOM.prototype.__proto__ || Object.getPrototypeOf(VideoDOM.prototype), 'kill', this).call(this);
            }
        }, {
            key: '_addInitListeners',
            value: function _addInitListeners() {
                var _this3 = this;

                this.view.on("loadstart", function (event) {});
                this.view.on("loadedmetadata", function (event) {
                    console.log("onloadedinfos", _this3.id, "infos video: ", _this3.view[0].videoWidth, "x", _this3.view[0].videoHeight, ",", _this3.view[0].duration, "s");
                    _this3._initSteps.metaDataLoaded = true;

                    _this3.view.css("width", _this3.view[0].videoWidth + "px");
                    _this3.view.css("height", _this3.view[0].videoHeight + "px");
                    if (_this3.dataObject.width) _this3.width = _this3.dataObject.width;
                    if (_this3.dataObject.height) _this3.height = _this3.dataObject.height;
                    if (_this3.dataObject.fitIn) _this3.fitIn(_this3.dataObject.fitIn);
                    _this3.onloadedinfos.dispatch({ target: _this3 });
                });
                this.view.on("loadeddata", function (event) {});

                this.view.on("progress", function (event) {
                    _this3.onprogress.dispatch({ target: _this3 });
                });
                this.view.on("suspend", function (event) {});
                this.view.on("canplay", function (event) {
                    _this3._initSteps.canPlay = true;
                    _this3.oncanplay.dispatch({ target: _this3 });
                });
                this.view.on("canplaythrough", function (event) {
                    _this3._initSteps.canPlayThrough = true;
                    _this3.oncanplaythrough.dispatch({ target: _this3 });
                });
                this.view.on("stalled", function (event) {
                    _this3.onstalled.dispatch({ target: _this3 });
                });

                this.view.on("timeupdate", function (event) {});
                this.view.on("waiting", function (event) {
                    _this3.onwaiting.dispatch({ target: _this3 });
                });
                this.view.on("abort", function (event) {});
                this.view.on("error", function (event) {
                    console.log("onerror", _this3.id, event);
                });
                this.view.on("seeked", function (event) {
                    _this3.onseeked.dispatch({ target: _this3 });
                });
                this.view.on("seeking", function (event) {});
                this.view.on("play", function (event) {
                    _this3.onplay.dispatch({ target: _this3 });
                });
                this.view.on("playing", function (event) {
                    console.log("onplaying", _this3.id);
                    _this3.onplaying.dispatch({ target: _this3, time: _this3.view[0].currentTime });
                });
                this.view.on('ended', function (evt) {
                    if (_this3._loops === -1) {
                        _this3.play();
                    } else {
                        if (_this3._loops == 0) {
                            console.log("onfinished", _this3.id);
                            _this3._playing = false;
                            _this3.onfinished.dispatch({ target: _this3 });
                        } else {
                            _this3._loops--;
                            _this3.play();
                        }
                    }
                });
                this.view.on("pause", function (event) {
                    _this3.onpaused.dispatch({ target: _this3 });
                });
            }
        }, {
            key: '_volumeRestore',
            value: function _volumeRestore() {
                this.volume = this._volumeDefined;
            }
        }, {
            key: 'playing',
            get: function get() {
                return this._playing;
            }
        }, {
            key: 'duration',
            get: function get() {
                return this.view[0].duration;
            }
        }, {
            key: 'currentTime',
            get: function get() {
                return this.view[0].currentTime;
            },
            set: function set(value) {
                this.view[0].currentTime = value;
            }
        }, {
            key: 'playbackRate',
            set: function set(value) {
                this.view[0].playbackRate = value;
            }
        }, {
            key: 'volume',
            set: function set(value) {
                this.view[0].volume = value;
                this._volumeDefined = value;
            },
            get: function get() {
                return this.view[0].volume;
            }
        }, {
            key: 'muted',
            set: function set(value) {
                this.view[0].muted = value;
            },
            get: function get() {
                return this.view[0].muted;
            }
        }]);

        return VideoDOM;
    }(_VisualComponentDOM3.default);

    exports.default = VideoDOM;
});
//# sourceMappingURL=VideoDOM.js.map