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

    var SoundPlayerMediaElement = function (_Component) {
        _inherits(SoundPlayerMediaElement, _Component);

        function SoundPlayerMediaElement(dataObject) {
            _classCallCheck(this, SoundPlayerMediaElement);

            var _this = _possibleConstructorReturn(this, (SoundPlayerMediaElement.__proto__ || Object.getPrototypeOf(SoundPlayerMediaElement)).call(this, Object.assign({
                id: null,
                resourceId: null,
                loops: 0
            }, dataObject)));

            _this.addEventDispatcher("onfinished", "onplaystart", "onstop");
            _this._sound = null;
            _this.loops = _this.dataObject.loops;
            _this._volume = 1;
            _this._soundData = {
                id: null,
                sound: null
            };
            if (dataObject.id) {
                _this.id = dataObject.id;
            }
            if (dataObject.resourceId) {
                _this._setSound(dataObject.resourceId);
            }
            return _this;
        }

        _createClass(SoundPlayerMediaElement, [{
            key: "_setSound",
            value: function _setSound(id) {
                var _this2 = this;

                var soundResource = this.jx.db.findOne({ id: id, lang: this.jx.config.lang });
                this._soundData.id = id;
                if (this._soundData.id != undefined) {
                    this.sound = soundResource.data;
                    this.sound.addEventListener("ended", function (evt) {
                        return _this2._soundFinished(evt);
                    });
                }
                ;
            }
        }, {
            key: "play",
            value: function play(_ref) {
                var id = _ref.id;
                var onfinished = _ref.onfinished;
                var loops = _ref.loops;

                if (this.sound) this.cancel();
                if (this._finishedOnce) {
                    this.onfinished.remove(this._finishedOnce);
                    this._finishedOnce = null;
                }
                if (onfinished) {
                    this._finishedOnce = onfinished || function (evt) {};
                    this.onfinished.addOnce(this._finishedOnce);
                }
                ;
                this._setSound(id);
                this.loops = loops || this.loops;
                this._tempLoops = this.loops;
                this.sound.loop = false;
                this.sound.volume = this._volume;
                this.sound.setCurrentTime(0);
                this.sound.play();
                this.onplaystart.dispatch({ target: this });
            }
        }, {
            key: "_soundFinished",
            value: function _soundFinished(event) {
                if (this._tempLoops != 0) {
                    this.sound.removeEventListener("ended", this._soundFinished);
                    this.sound.addEventListener("ended", this._soundFinished);
                    this._tempLoops--;
                    this.sound.setCurrentTime(0);
                    this.sound.play();
                } else {
                    console.log("soundFinished " + this._soundData.id);
                    this.stop();
                }
            }
        }, {
            key: "stop",
            value: function stop(params) {
                if (this.sound != undefined && this.sound != null) {
                    this.sound.pause();
                }
                this.onstop.dispatch({ target: this });
                this.onfinished.dispatch({ target: this });
                if (this._finishedOnce) {
                    this.onfinished.remove(this._finishedOnce);
                    this._finishedOnce = null;
                }
            }
        }, {
            key: "cancel",
            value: function cancel() {
                console.log("cancel", this.sound);
                if (this.sound != null) {
                    this.sound.pause();
                    this.sound.removeEventListener("ended", this._soundEndedhandler);
                    this.sound = null;
                    this.onstop.dispatch({ target: this });
                }
                if (this._finishedOnce) {
                    this.onfinished.remove(this._finishedOnce);
                    this._finishedOnce = null;
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
        }]);

        return SoundPlayerMediaElement;
    }(_Component3.default);

    exports.default = SoundPlayerMediaElement;
});
//# sourceMappingURL=SoundPlayerMediaElement.js.map