define(["exports", "jx/core/comps/Component"], function (exports, _Component2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

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

    var uniqSoundID = 0;

    var SoundPlayer = function (_Component) {
        _inherits(SoundPlayer, _Component);

        function SoundPlayer(dataObject) {
            _classCallCheck(this, SoundPlayer);

            return _possibleConstructorReturn(this, (SoundPlayer.__proto__ || Object.getPrototypeOf(SoundPlayer)).call(this, Object.assign({
                id: null,
                resourceId: null,
                loops: 0
            }, dataObject)));
        }

        _createClass(SoundPlayer, [{
            key: "_create",
            value: function _create() {
                _get(SoundPlayer.prototype.__proto__ || Object.getPrototypeOf(SoundPlayer.prototype), "_create", this).call(this);
                this.addEventDispatcher("onfinished", "onplaystart", "onstop", "onplaying");
                this._sound = null;
                this.loops = this.dataObject.loops;
                this._volume = 1;
                this._soundData = {
                    id: null,
                    sound: null,
                    src: null
                };
                this._playing = false;
                if (this.dataObject.id) {
                    this.id = this.dataObject.id;
                }
                if (this.dataObject.resourceId) {
                    this._setSound(this.dataObject.resourceId);
                }
            }
        }, {
            key: "kill",
            value: function kill() {
                this.cancel();
                this._removePlayingEvent();
                if (this._finishedOnce) {
                    this.onfinished.remove(this._finishedOnce);
                    this._finishedOnce = null;
                }
                if (this._playingOnce) {
                    this.onplaying.remove(this._playingOnce);
                    this._playingOnce = null;
                }
                _get(SoundPlayer.prototype.__proto__ || Object.getPrototypeOf(SoundPlayer.prototype), "kill", this).call(this);
            }
        }, {
            key: "_setSound",
            value: function _setSound(id) {
                var soundResource = this.jx.db.findOne({ id: id, lang: this.jx.config.lang });

                this._soundData.id = id;
                if (this._soundData.id != undefined) {
                    this._idSoundInstance = "ID" + ++uniqSoundID;

                    this.sound = soundResource.data && soundResource.data.src ? soundResource.data : createjs.Sound.createInstance(soundResource.src);
                    this._onSoundFinishedListener = this.sound.on("complete", this._soundFinished, this);
                    this._soundData.src = soundResource.src;
                }
                ;
            }
        }, {
            key: "play",
            value: function play() {
                var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var id = _ref.id;
                var _ref$onfinished = _ref.onfinished;
                var onfinished = _ref$onfinished === undefined ? null : _ref$onfinished;
                var _ref$onplaying = _ref.onplaying;
                var onplaying = _ref$onplaying === undefined ? null : _ref$onplaying;
                var _ref$loops = _ref.loops;
                var loops = _ref$loops === undefined ? null : _ref$loops;

                if (!id) {
                    if (this._soundData.id) {
                        id = this._soundData.id;
                    } else {
                        console.warn('SoundPlayer.play error - correct usage - SoundPlayer.play({id:"SOUNDPLAYERID" )');
                    }
                }

                if (this.sound && this._playing && id == this._soundData.id) {
                    return;
                }
                ;

                this._cleanupLastSound();
                if (onfinished) {
                    this._finishedOnce = onfinished || function (evt) {};
                    this.onfinished.addOnce(this._finishedOnce);
                }
                ;
                if (onplaying) {
                    this._playingOnce = onplaying || function (evt) {};
                    this.onplaying.addOnce(this._playingOnce);
                }
                ;
                this._setSound(id);
                this._addPlayingEvent();
                this.sound.play({ loop: loops || this.loops, volume: this._volume });
                this._playing = true;
                this.onplaystart.dispatch({ target: this });
            }
        }, {
            key: "_cleanupLastSound",
            value: function _cleanupLastSound() {
                if (!this.sound) return;
                this.cancel();
                if (this._finishedOnce) {
                    this.onfinished.remove(this._finishedOnce);
                    this._finishedOnce = null;
                }
                if (this._playingOnce) {
                    this.onplaying.remove(this._playingOnce);
                    this._playingOnce = null;
                }
            }
        }, {
            key: "_addPlayingEvent",
            value: function _addPlayingEvent() {
                var _this2 = this;

                this._removePlayingEvent();
                this._onPlayingListener = this.jx.ticker.on("tick", function (evt) {
                    if (!_this2._playing) return;

                    _this2.onplaying.dispatch({ target: _this2 });
                });
            }
        }, {
            key: "_removePlayingEvent",
            value: function _removePlayingEvent() {
                if (this._onPlayingListener) {
                    this.jx.ticker.off("tick", this._onPlayingListener);
                    this._onPlayingListener = null;
                }
            }
        }, {
            key: "_soundFinished",
            value: function _soundFinished(event) {
                var oldFinishedFunc = this._finishedOnce;
                this.stop();
            }
        }, {
            key: "stop",
            value: function stop(dataObject) {
                if (!this._playing) return;
                this._playing = false;
                this._stopSound();
                this._finishedOnce = null;
                this.onfinished.dispatch({ target: this });
            }
        }, {
            key: "appFreeze",
            value: function appFreeze() {
                if (this._appFreezed) return;
                this._appFreezed = true;
                this._freezeState = {
                    playing: this._playing
                };
                if (this.sound && this._playing) {
                    this.sound.paused = true;
                }
                ;
            }
        }, {
            key: "appUnfreeze",
            value: function appUnfreeze() {
                if (!this._appFreezed) return;
                this._appFreezed = false;

                if (this.sound) {
                    this.sound.paused = !this._freezeState.playing;
                }
                ;
            }
        }, {
            key: "pause",
            value: function pause() {
                if (this._paused) return;
                this._paused = true;
                if (this.sound != null) {
                    this.sound.paused = true;
                }
            }
        }, {
            key: "resume",
            value: function resume() {
                if (!this._paused) return;
                this._paused = false;
                if (this.sound != null) {
                    this.sound.paused = false;
                }
            }
        }, {
            key: "cancel",
            value: function cancel() {
                if (!this._playing) return;
                this._playing = false;
                this._stopSound();
                if (this._finishedOnce) {
                    this.onfinished.remove(this._finishedOnce);
                    this._finishedOnce = null;
                }
            }
        }, {
            key: "_stopSound",
            value: function _stopSound() {
                if (this.sound != null) {
                    this.sound.stop();
                    if (this._onSoundFinishedListener) {
                        this.sound.off("complete", this._onSoundFinishedListener);
                        this._onSoundFinishedListener = null;
                    }
                    ;
                    this._removePlayingEvent();

                    this.sound.destroy();
                    this._currentSoundFinished = null;
                    this.sound = null;
                    this.onstop.dispatch({ target: this });
                }
            }
        }, {
            key: "volume",
            set: function set(value) {
                this._volume = value;
                if (this.sound) {
                    this.sound.volume = this._volume;
                }
                ;
            },
            get: function get() {
                return this._volume;
            }
        }, {
            key: "playing",
            get: function get() {
                return this._playing;
            }
        }]);

        return SoundPlayer;
    }(_Component3.default);

    exports.default = SoundPlayer;
});
//# sourceMappingURL=SoundPlayer.js.map