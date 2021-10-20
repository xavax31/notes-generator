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

    var Debugger = function () {
        function Debugger(jx) {
            var debugOptions = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            _classCallCheck(this, Debugger);

            this.jx = jx;
            this.monitor = null;
            this._timeMarkers = [];
            this._timeMarkersGroups = {};
            this.setDebug(debugOptions);
        }

        _createClass(Debugger, [{
            key: "kill",
            value: function kill() {
                if (!this.jx) return;
                this.jx = null;
            }
        }, {
            key: "log",
            value: function log() {
                var _console;

                if (!this.debugging) return;
                (_console = console).log.apply(_console, arguments);
            }
        }, {
            key: "info",
            value: function info() {
                var _console2;

                if (!this.debugging) return;
                (_console2 = console).info.apply(_console2, arguments);
            }
        }, {
            key: "warn",
            value: function warn() {
                var _console3;

                if (!this.debugging) return;
                (_console3 = console).error.apply(_console3, arguments);
            }
        }, {
            key: "error",
            value: function error() {
                var _console4;

                if (!this.debugging) return;
                (_console4 = console).error.apply(_console4, arguments);
            }
        }, {
            key: "alert",
            value: function (_alert) {
                function alert(_x) {
                    return _alert.apply(this, arguments);
                }

                alert.toString = function () {
                    return _alert.toString();
                };

                return alert;
            }(function (args) {
                if (!this.debugging) return;
                alert(this._convertArguments(args));
            })
        }, {
            key: "fatal",
            value: function fatal() {
                if (!this.debugging) return;

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                throw new (Function.prototype.bind.apply(Error, [null].concat(args)))();
            }
        }, {
            key: "_convertArguments",
            value: function _convertArguments(args) {
                if (!this.debugging) return;
                var argmentArray = new Array();
                for (var i = 0; i < arguments.length; i++) {
                    argmentArray.push(arguments[i]);
                }
                return argmentArray;
            }
        }, {
            key: "setDebug",
            value: function setDebug(debugOtions) {
                if (typeof debugOtions == "boolean") {
                    this._debugOptions = {
                        enabled: debugOtions,
                        monitor: debugOtions,
                        alert: false
                    };
                } else {
                    this._debugOptions = Object.assign({ enabled: false, monitor: false, alert: false }, debugOtions);
                }
                this.debugging = this._debugOptions.enabled;
                if (this._debugOptions.monitor) {
                    this.showMonitor();
                } else {
                    this.hideMonitor();
                }
                if (this._debugOptions.alert) {
                    window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
                        if (errorMsg.search("afdp") == -1) {
                            alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' + errorObj);
                        }
                        ;
                    };
                } else {
                    window.onerror = null;
                }
            }
        }, {
            key: "showMonitor",
            value: function showMonitor() {
                var _this = this;

                if (!this.monitor) {
                    this.monitor = $('<div id="monitor" style="font-size: 14px; left:0px; padding: 1px 5px; position:absolute; top:0px; z-index:1000;background:#000;color:#FFF;"></div>');
                }
                $("body").append(this.monitor);
                this._tickListener = createjs.Ticker.addEventListener("tick", function () {
                    _this.monitor.html("FPS: " + Math.round(createjs.Ticker.getMeasuredFPS()) + "/" + Math.round(createjs.Ticker.framerate));
                });
            }
        }, {
            key: "hideMonitor",
            value: function hideMonitor() {
                if (this.monitor) {
                    this.monitor.remove();
                    createjs.Ticker.removeEventListener("tick", this._tickListener);
                }
            }
        }, {
            key: "logTime",
            value: function logTime(text) {
                var group = arguments.length <= 1 || arguments[1] === undefined ? "none" : arguments[1];

                this._logTimerMarker(this.addTimeMarker(text, group));
            }
        }, {
            key: "_getAllFromGroups",
            value: function _getAllFromGroups(groupName) {
                var results = [];
                for (var i = 0; i < this._timeMarkers.length; i++) {
                    if (this._timeMarkers[i].group == groupName) {
                        results.push(this._timeMarkers[i]);
                    }
                }
                ;
                return results;
            }
        }, {
            key: "_logTimerMarker",
            value: function _logTimerMarker(timeMarker) {
                var result = timeMarker.group + " \tA:" + timeMarker.absolute / 1000 + "s \tG:" + timeMarker.timeS / 1000 + "s I:\t" + timeMarker.interval / 1000 + "s \t" + timeMarker.text;
                console.log(result);
            }
        }, {
            key: "addTimeMarker",
            value: function addTimeMarker(text) {
                var group = arguments.length <= 1 || arguments[1] === undefined ? "none" : arguments[1];

                this._timeMarkersGroups[group] = this._timeMarkersGroups[group] || [];
                var markers = this._timeMarkersGroups[group];

                var timeMarker = { text: text, group: group, time: Date.now() };
                markers.push(timeMarker);
                this._timeMarkers.push(timeMarker);
                timeMarker.absolute = timeMarker.time - this._timeMarkers[0].time;
                timeMarker.timeS = timeMarker.time - markers[0].time;
                timeMarker.interval = markers.length > 1 ? timeMarker.time - markers[markers.length - 2].time : 0;
                return timeMarker;
            }
        }, {
            key: "logTimeMarkers",
            value: function logTimeMarkers() {
                var groups = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var flat = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                console.log("_________\nLOG");
                if (flat) {
                    for (var i = 0; i < this._timeMarkers.length; i++) {
                        if (groups == null || groups.indexOf(this._timeMarkers[i].group) != -1) {
                            this._logTimerMarker(this._timeMarkers[i]);
                        }
                    }
                    ;
                } else {
                    if (!groups) {
                        groups = [];
                        for (var prop in this._timeMarkersGroups) {
                            groups.push(prop);
                        }
                    }

                    for (var i = 0; i < groups.length; i++) {
                        var markers = this._timeMarkersGroups[groups[i]] || [];
                        for (var j = 0; j < markers.length; j++) {
                            this._logTimerMarker(markers[j]);
                        }
                        ;
                    }
                    ;
                }
                console.log("END LOG\n_________");
            }
        }]);

        return Debugger;
    }();

    exports.default = Debugger;
});
//# sourceMappingURL=Debugger.js.map