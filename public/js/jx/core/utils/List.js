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

    var _list = void 0;
    var _p = null;
    var _position = -1;
    var _loopMode = "loop";
    var List = function () {
        function List(p) {
            _classCallCheck(this, List);

            _p = p;
            this._init();
        }

        _createClass(List, [{
            key: "_init",
            value: function _init() {
                _list = [];
                _position = -1;

                _loopMode = _p.loopMode == undefined ? "loop" : _p.loopMode;

                this.fill(_p);

                if (_p.shuffle == true) {
                    this.shuffle();
                }
            }
        }, {
            key: "fill",
            value: function fill(p) {
                _p = p;

                if ((_p.start == undefined || _p.end == undefined) && _p.sourceArray == undefined) {
                    return false;
                }
                _p.curve = _p.curve == undefined ? "linear" : _p.curve;
                _p.num = _p.num == undefined ? Math.abs(_p.end - _p.start) : _p.num - 1;
                _list = [];
                if (_p.sourceArray != undefined) {
                    for (var i = 0; i < _p.sourceArray.length; i++) {
                        _list[i] = _p.sourceArray[i];
                    }
                } else {
                    var a = (_p.end - _p.start) / _p.num;
                    var b = _p.start;
                    if (_p.curve == "linear") {
                        for (var lp = 0; lp <= _p.num; lp++) {
                            _list.push(a * lp + b);
                        }
                    } else if (_p.curve == "exp") {
                        for (var lp = 0; lp <= _p.num; lp++) {
                            _list.push(a / _p.num * lp * lp + b);
                        }
                    }
                }
                if (_p.accidents != undefined && _p.noise_en_last != false) {
                    for (var i = 0; i < _p.accidents.length; i++) {
                        _list[List.randomValue(_p.accidents[i].start, _p.accidents[i].end)] = _p.accidents[i].value;
                    }
                }
                if (_p.noise != undefined && _p.noise != false) {
                    this.noise();
                }
                if (_p.accidents != undefined && _p.noise_en_last == false) {
                    for (var i = 0; i < _p.accidents.length; i++) {
                        _list[List.randomValue(_p.accidents[i].start, _p.accidents[i].end)] = _p.accidents[i].value;
                    }
                }
                return true;
            }
        }, {
            key: "noise",
            value: function noise() {
                if (_p.noiseAmplitude == undefined) {
                    _p.noiseAmplitude = 0.1;
                }
                _p.clipping = _p.clipping || false;

                var new_value;
                for (var i = 0; i < _list.length; i++) {
                    if (typeof _list[i] == "number") {
                        new_value = _list[i] + List.randomValue(-1000, 1000) / 1000 * _p.noiseAmplitude;
                        if (_p.clipping) {
                            if (new_value < _p.start) {
                                new_value = _p.start;
                            }
                            if (new_value > _p.end) {
                                new_value = _p.end;
                            }
                        }
                        _list[i] = new_value;
                    }
                }
            }
        }, {
            key: "next",
            value: function next() {
                _position++;
                if (_position >= _list.length) {
                    switch (_loopMode) {
                        case "once":
                            return "ended";
                            break;
                        case "loop":
                            _position = 0;
                            break;
                        case "shuffle":
                            this.shuffle();
                            _position = 0;
                            break;
                    }
                }
                return _list[_position];
            }
        }, {
            key: "nextLoop",
            value: function nextLoop() {
                _position = _list.length;
                if (_position >= _list.length) {
                    switch (_loopMode) {
                        case "once":
                            return "ended";
                            break;
                        case "loop":
                            _position = 0;
                            break;
                        case "shuffle":
                            this.shuffle();
                            _position = 0;
                            break;
                    }
                }
                return _list[_position];
            }
        }, {
            key: "shuffle",
            value: function shuffle() {
                var last = _list[_position];
                _list = List.randomiseArray(_list);
                if (_list[0] == last) {
                    this.shuffle();
                }
            }
        }, {
            key: "removeCurrent",
            value: function removeCurrent() {
                _list.splice(_position, 1);
                _position--;
            }
        }, {
            key: "removeItems",
            value: function removeItems(p) {
                if (typeof p == "number") {
                    for (var i = 0; i < p; i++) {
                        _list.splice(List.randomValue(0, _list.length - 1), 1);
                    }
                }
                _position = 0;
            }
        }, {
            key: "simulate",
            value: function simulate(_ref) {
                var _ref$start = _ref.start;
                var start = _ref$start === undefined ? 0 : _ref$start;
                var end = _ref.end;

                var result = [];
                for (var i = 0; i < end; i++) {
                    this.next();
                    if (i >= start) {
                        result.push(this.current);
                    }
                    ;
                }
                ;
                return result;
            }
        }, {
            key: "info",
            value: function info() {
                console.log("info : ");
                for (var i = 0; i < _list.length; i++) {
                    console.log(i + " : ", _list[i]);
                }
            }
        }, {
            key: "infoCurve",
            value: function infoCurve(_ref2) {
                var parent = _ref2.parent;
                var _ref2$xScale = _ref2.xScale;
                var xScale = _ref2$xScale === undefined ? 20 : _ref2$xScale;
                var _ref2$yScale = _ref2.yScale;
                var yScale = _ref2$yScale === undefined ? 10 : _ref2$yScale;
                var _ref2$key = _ref2.key;
                var key = _ref2$key === undefined ? null : _ref2$key;
                var _ref2$lineColor = _ref2.lineColor;
                var lineColor = _ref2$lineColor === undefined ? "#F00" : _ref2$lineColor;
                var _ref2$lineThickness = _ref2.lineThickness;
                var lineThickness = _ref2$lineThickness === undefined ? 2 : _ref2$lineThickness;
                var _ref2$markerHeight = _ref2.markerHeight;
                var markerHeight = _ref2$markerHeight === undefined ? 10 : _ref2$markerHeight;
                var _ref2$oriX = _ref2.oriX;
                var oriX = _ref2$oriX === undefined ? 0 : _ref2$oriX;
                var _ref2$oriY = _ref2.oriY;
                var oriY = _ref2$oriY === undefined ? 384 : _ref2$oriY;

                var arr = _list;
                var arr_length = arr.length;
                var container = new createjs.Shape();
                container.graphics.setStrokeStyle(lineThickness, "round").beginStroke(lineColor);
                container.graphics.moveTo(oriX, oriY);
                var xValue;
                var yValue;
                for (var i = 0; i < arr.length; i++) {
                    xValue = i;
                    if (key == null) {
                        yValue = arr[i];
                    } else if (typeof key == "string") {
                        yValue = arr[i][key];
                    } else if (typeof key == "function") {
                        yValue = key(arr[i]);
                    }
                    console.log(xValue, arr[i], " value:", yValue);
                    xValue = oriX + xValue * xScale;
                    yValue = oriY - yValue * yScale;
                    console.log("x:", xValue, " y:", yValue);
                    if (i == 0) {
                        container.graphics.moveTo(xValue, yValue);
                    } else {
                        container.graphics.lineTo(xValue, yValue);
                    }
                    container.graphics.lineTo(xValue, yValue - 10);
                    container.graphics.lineTo(xValue, yValue + 10);
                    container.graphics.lineTo(xValue, yValue);
                }
                parent.addChild({ view: container });
            }
        }, {
            key: "getPos",
            value: function getPos(element) {
                for (var i = 0; i < _list.length; i++) {
                    if (_list[i] == element) {
                        return i;
                    }
                }
                return false;
            }
        }, {
            key: "current",
            get: function get() {
                return _list[_position];
            }
        }, {
            key: "e",
            get: function get() {
                return _list;
            }
        }, {
            key: "loopMode",
            set: function set(curve) {
                this._loopMode = curve;
            }
        }, {
            key: "size",
            get: function get() {
                return _list.length;
            }
        }, {
            key: "position",
            set: function set(position) {
                _position = position;
            },
            get: function get() {
                return _position;
            }
        }], [{
            key: "randomiseArray",
            value: function randomiseArray(myList) {
                var lList = myList.slice();
                var randomList = [];
                var randomPos;
                var boucleLength = lList.length;
                for (var i = 0; i < boucleLength; i++) {
                    randomPos = List.randomValue(0, lList.length - 1);
                    randomList.push(lList[randomPos]);
                    lList.splice(randomPos, 1);
                }
                return randomList;
            }
        }, {
            key: "randomValue",
            value: function randomValue(min, max) {
                var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                return randomNum;
            }
        }]);

        return List;
    }();

    exports.default = List;
});
//# sourceMappingURL=List.js.map