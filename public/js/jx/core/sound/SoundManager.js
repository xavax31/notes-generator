define(["exports", "jx/core/sound/SoundPlayer", "jx/core/sound/SoundPlayerMediaElement"], function (exports, _SoundPlayer, _SoundPlayerMediaElement) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _SoundPlayer2 = _interopRequireDefault(_SoundPlayer);

    var _SoundPlayerMediaElement2 = _interopRequireDefault(_SoundPlayerMediaElement);

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

    var SoundManager = function () {
        function SoundManager(_ref) {
            var jx = _ref.jx;

            _classCallCheck(this, SoundManager);

            this.jx = jx;
            this._players = [];
            this.groups = { none: [] };

            this.music = null;

            this.voice = null;
            this.init();
        }

        _createClass(SoundManager, [{
            key: "kill",
            value: function kill() {
                console.info("killing", this, this._players);
                var _players = this._players.slice();
                for (var i = 0; i < _players.length; i++) {
                    console.log("Player", _players[i]);
                    this._destroyPlayer(_players[i]);
                }

                this._players = null;
                this._freezedPlayers = null;
                this.music = null;
                this.voice = null;
                this.groups = null;
                this.jx = null;
                console.info("killed", this);
            }
        }, {
            key: "init",
            value: function init() {
                var _this = this;

                this.createPlayer({ id: "voice" });
                this.voice.onplaystart.add(function () {
                    _this.music.oldVolume = _this.music.volume;
                    _this.music.volume = _this.music.volume * 40 / 100;
                });
                this.voice.onstop.add(function () {
                    _this.music.volume = _this.music.oldVolume == undefined ? _this.music.volume : _this.music.oldVolume;
                });
                this.createPlayer({ id: "music" });
                this.music.loops = -1;
            }
        }, {
            key: "play",
            value: function play(_ref2) {
                var _this2 = this;

                var id = _ref2.id;
                var _ref2$loops = _ref2.loops;
                var loops = _ref2$loops === undefined ? null : _ref2$loops;
                var _ref2$onfinished = _ref2.onfinished;

                var _onfinished = _ref2$onfinished === undefined ? function (evt) {} : _ref2$onfinished;

                var soundPlayer = this.createPlayer();

                soundPlayer.play({ id: id, loops: loops, onfinished: function onfinished(evt) {
                        _this2._destroyPlayer(soundPlayer);
                        _onfinished(evt);
                    } });
                return soundPlayer;
            }
        }, {
            key: "stop",
            value: function stop() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                console.log("stop", params);
                if (params == null) {
                    for (var i = 0; i < this._players.length; i++) {
                        if (this._players[i] != null) {
                            this._players[i].stop();
                        }
                    }
                    ;
                }
                ;
            }
        }, {
            key: "cancel",
            value: function cancel() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                console.log("cancel", params);
                if (params == null) {
                    for (var i = 0; i < this._players.length; i++) {
                        if (this._players[i] != null) {
                            this._players[i].cancel();
                        }
                    }
                    ;
                }
                ;
            }
        }, {
            key: "appFreeze",
            value: function appFreeze() {
                if (this._appFreezed) return;
                this._appFreezed = true;
                this._freezedPlayers = this._freezedPlayers || [];
                for (var i = 0; i < this._players.length; i++) {
                    if (this._players[i].playing) {
                        this._freezedPlayers.push(this._players[i]);
                        this._players[i].appFreeze();
                    }
                    ;
                }
            }
        }, {
            key: "appUnfreeze",
            value: function appUnfreeze() {
                if (!this._appFreezed) return;
                this._appFreezed = false;
                for (var i = 0; i < this._freezedPlayers.length; i++) {
                    this._freezedPlayers[i].appUnfreeze();
                }
                this._freezedPlayers.length = 0;
            }
        }, {
            key: "createPlayer",
            value: function createPlayer() {
                var dataObject = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                dataObject = Object.assign({
                    jx: this.jx,
                    id: null,
                    loops: 0,
                    resourceId: null,
                    streaming: false
                }, dataObject);
                var soundPlayerClass = dataObject.streaming || !this.jx.config.system.audio.isWebAudioSupported ? _SoundPlayerMediaElement2.default : _SoundPlayer2.default;
                var player;
                if (dataObject.id == null) {
                    player = new soundPlayerClass(dataObject);
                    this._players.push(player);
                    return player;
                } else {
                    for (var prop in this) {
                        if (dataObject.id == this[prop]) {
                            return this[dataObject.id];
                        }
                        ;
                    }
                    if (this[dataObject.id]) {
                        console.warn("SoundPlayer", dataObject.id, "already exists");
                    } else {
                        player = new soundPlayerClass(dataObject);
                        this._players.push(player);
                        this[dataObject.id] = player;
                    }
                    return this[dataObject.id];
                }
            }
        }, {
            key: "killPlayer",
            value: function killPlayer(player) {
                this._destroyPlayer(player);
            }
        }, {
            key: "_destroyPlayer",
            value: function _destroyPlayer(player) {
                if (!player) return;

                if (player.id && this[player.id] != undefined) {
                    delete this[player.id];
                }
                for (var i = 0; i < this._players.length; i++) {
                    if (this._players[i] === player) {
                        this._players.splice(i, 1);
                    }
                }
                player.kill();
            }
        }, {
            key: "destroyPlayer",
            value: function destroyPlayer(params) {
                if (this[params.id] != undefined) {
                    delete this[params.id];
                } else {
                    console.warn("SoundPlayer", params.id, "does not exist");
                }
            }
        }, {
            key: "createGroup",
            value: function createGroup(params) {
                console.log("addGroup", params);
            }
        }, {
            key: "volume",
            get: function get() {
                return createjs.Sound.volume;
            },
            set: function set(value) {
                createjs.Sound.volume = value;
            }
        }]);

        return SoundManager;
    }();

    exports.default = SoundManager;
});
//# sourceMappingURL=SoundManager.js.map