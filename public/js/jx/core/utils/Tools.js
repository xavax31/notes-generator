define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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

    var jxtools = void 0;
    var lettersAlphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    var Tools = function () {
        function Tools() {
            _classCallCheck(this, Tools);

            this.cjs = CJS;

            this.str = StringFunctions;

            this.obj = ObjectFunctions;

            this.arr = ArrayFunctions;

            this.math = MathFunctions;

            this.date = DateFunctions;

            this.color = ColorFunctions;
            jxtools = this;
        }

        _createClass(Tools, [{
            key: "intToString",
            value: function intToString(intValue, numLetters) {
                var intValueToString = String(intValue);
                var intValueToStringLength = intValueToString.length;
                var result = [];
                for (var i = 0; i < numLetters; i++) {
                    result.unshift(intValueToString[intValueToStringLength - 1 - i] == undefined ? "0" : intValueToString[intValueToStringLength - 1 - i]);
                }
                ;
                return result.join("");
            }
        }, {
            key: "gd",
            value: function gd() {
                return this.intToString.apply(this, arguments);
            }
        }, {
            key: "instanceType",
            value: function instanceType(element) {
                if (Array.isArray(element)) return "array";
                return typeof element === "undefined" ? "undefined" : _typeof(element);
            }
        }, {
            key: "forChar",
            value: function forChar(letterStart, letterEnd, forEachFunction) {
                var letterStartLowCase = letterStart.toLowerCase();
                var upperCase = letterStartLowCase !== letterStart;
                var letterEndLowCase = letterEnd.toLowerCase();
                var indexStart = this.str.getLetterIndex(letterStartLowCase);
                var indexEnd = this.str.getLetterIndex(letterEndLowCase);
                for (var i = indexStart; i <= indexEnd; i++) {
                    forEachFunction(upperCase ? this.str.getLetterFromIndex(i).toUpperCase() : this.str.getLetterFromIndex(i), i);
                }
                ;
            }
        }, {
            key: "getURLParameters",
            value: function getURLParameters() {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                var result = {};
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    result[sParameterName[0]] = sParameterName[1];
                }
                return result;
            }
        }, {
            key: "openURL",
            value: function openURL(url) {
                var id = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                window.open(url, id);
            }
        }, {
            key: "arrayContains",
            value: function arrayContains(array, value) {
                return $.inArray(value, array);
            }
        }, {
            key: "arrayContainsAllIdentical",
            value: function arrayContainsAllIdentical(array) {
                for (var i = 1; i < array.length; i++) {
                    if (array[i] != array[0]) {
                        return false;
                    }
                }
                return true;
            }
        }, {
            key: "arrayRemoveDouble",
            value: function arrayRemoveDouble(array) {
                var unique = [];
                for (var i = 0; i < array.length; i++) {
                    var current = array[i];
                    if (unique.indexOf(current) < 0) unique.push(current);
                }
                return unique;
            }
        }, {
            key: "makeArrayIfSingleObject",
            value: function makeArrayIfSingleObject(object) {
                if (Object.prototype.toString.call(object) !== '[object Array]') {
                    object = [object];
                }
                return object;
            }
        }, {
            key: "mergeObject",
            value: function mergeObject(referenceObject, objectToMerge) {
                if (objectToMerge && referenceObject) {
                    for (var prop in objectToMerge) {
                        if (objectToMerge[prop] != undefined) {
                            if (!Array.isArray(referenceObject[prop]) && _typeof(referenceObject[prop]) == 'object' && referenceObject[prop] != null) {
                                this.mergeObject(referenceObject[prop], objectToMerge[prop]);
                            } else {
                                referenceObject[prop] = objectToMerge[prop];
                            }
                        }
                    }
                }
                return referenceObject;
            }
        }, {
            key: "mergeObjectIn",
            value: function mergeObjectIn() {
                var referenceObject = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var objectToMerge = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                if (objectToMerge && referenceObject) {
                    for (var prop in objectToMerge) {
                        if (objectToMerge[prop] != undefined && this.instanceType(objectToMerge[prop]) == 'object') {
                            referenceObject[prop] = referenceObject[prop] || {};
                            this.mergeObjectIn(referenceObject[prop], objectToMerge[prop]);
                        } else {
                            referenceObject[prop] = objectToMerge[prop];
                        }
                    }
                }
                return referenceObject;
            }
        }, {
            key: "updateObject",
            value: function updateObject(obj1, obj2) {
                for (var prop in obj1) {
                    if (obj2[prop] !== undefined) {
                        obj1[prop] = obj2[prop];
                    }
                    ;
                }
                return obj1;
            }
        }, {
            key: "fillObject",
            value: function fillObject(defaultValueObject, objectToComplete) {
                return Object.assign(defaultValueObject, objectToComplete);
            }
        }, {
            key: "cloneObject",
            value: function cloneObject(object) {
                var clone = {};
                var prop;
                for (prop in object) {
                    if (this.instanceType(object[prop]) == "object") {
                        clone[prop] = this.cloneObject(object[prop]);
                    } else {
                        clone[prop] = object[prop];
                    }
                }
                ;
                return clone;
            }
        }, {
            key: "testObjectsEgality",
            value: function testObjectsEgality(objects) {
                var objectRef = objects[0];
                for (var i = 1; i < objects.length; i++) {
                    for (var prop in objects[i]) {
                        if (objectRef[prop] != objects[i][prop]) {
                            return false;
                        }
                        ;
                    }
                }
                return true;
            }
        }, {
            key: "capitalizeEachWord",
            value: function capitalizeEachWord(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
        }, {
            key: "getLetterFromIndex",
            value: function getLetterFromIndex(index) {
                return lettersAlphabet[index];
            }
        }, {
            key: "replaceCharByNumber",
            value: function replaceCharByNumber(str) {
                var num = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                var char = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
                var maxChar = arguments.length <= 3 || arguments[3] === undefined ? 4 : arguments[3];

                if (!str) return str;
                var result = str;
                for (var i = maxChar; i > 0; i--) {
                    result = result.replace(this.stringRepeat(char, i), this.intToString(num, i));
                }
                ;
                return result;
            }
        }, {
            key: "stringRepeat",
            value: function stringRepeat(str, num) {
                var result = "";
                for (var i = 0; i < num; i++) {
                    result += str;
                }
                return result;
            }
        }]);

        return Tools;
    }();

    exports.default = Tools;

    var StringFunctions = exports.StringFunctions = function () {
        function StringFunctions() {
            _classCallCheck(this, StringFunctions);
        }

        _createClass(StringFunctions, null, [{
            key: "getLetterFromIndex",
            value: function getLetterFromIndex(index) {
                return lettersAlphabet[index];
            }
        }, {
            key: "getLetterIndex",
            value: function getLetterIndex(letter) {
                return lettersAlphabet.indexOf(letter.toLowerCase());
            }
        }, {
            key: "capitalizeEachWord",
            value: function capitalizeEachWord(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
        }, {
            key: "replaceCharByNumber",
            value: function replaceCharByNumber(str) {
                var num = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                var char = arguments.length <= 2 || arguments[2] === undefined ? "#" : arguments[2];
                var maxChar = arguments.length <= 3 || arguments[3] === undefined ? 4 : arguments[3];

                if (!str) return str;
                var result = str,
                    i;
                for (i = maxChar; i > 0; i--) {
                    result = result.replace(StringFunctions.stringRepeat(char, i), jxtools.intToString(num, i));
                }
                ;
                return result;
            }
        }, {
            key: "replaceCharByLetter",
            value: function replaceCharByLetter(_ref) {
                var string = _ref.string;
                var _ref$letter = _ref.letter;
                var letter = _ref$letter === undefined ? 0 : _ref$letter;
                var _ref$char = _ref.char;
                var char = _ref$char === undefined ? "#" : _ref$char;
                var _ref$mode = _ref.mode;
                var mode = _ref$mode === undefined ? "lowercase" : _ref$mode;
                var _ref$a = _ref.a;
                var a = _ref$a === undefined ? 0 : _ref$a;

                if (!string) return string;
                if (typeof letter == "number") {
                    letter = StringFunctions.getLetterFromIndex(letter - a);
                }
                switch (mode) {
                    case "lowercase":
                        letter = letter.toLowerCase();
                        break;
                    case "uppercase":
                        letter = letter.toUpperCase();
                        break;
                    default:
                }
                return string.replace(char, letter);
            }
        }, {
            key: "replaceChar",
            value: function replaceChar(_ref2) {
                var string = _ref2.string;
                var _ref2$index = _ref2.index;
                var index = _ref2$index === undefined ? 0 : _ref2$index;
                var _ref2$numberChar = _ref2.numberChar;
                var numberChar = _ref2$numberChar === undefined ? "#" : _ref2$numberChar;
                var _ref2$letterChar = _ref2.letterChar;
                var letterChar = _ref2$letterChar === undefined ? "£" : _ref2$letterChar;
                var _ref2$mode = _ref2.mode;
                var mode = _ref2$mode === undefined ? "none" : _ref2$mode;
                var _ref2$a = _ref2.a;
                var a = _ref2$a === undefined ? 0 : _ref2$a;

                return StringFunctions.replaceCharByLetter({
                    string: StringFunctions.replaceCharByNumber(string, index, numberChar),
                    letter: index,
                    char: letterChar,
                    mode: mode,
                    a: a
                });
            }
        }, {
            key: "underscoreToCamelCase",
            value: function underscoreToCamelCase(string) {
                var result = "";
                var capitalize = false;
                for (var i = 0; i < string.length; i++) {
                    if (string[i] == "_") {
                        capitalize = true;
                    } else {
                        if (capitalize) {
                            result += string[i].toUpperCase();
                            capitalize = false;
                        } else {
                            result += string[i].toLowerCase();
                        }
                    }
                }
                ;
                return result;
            }
        }, {
            key: "stringRepeat",
            value: function stringRepeat(str, num) {
                var result = "";
                for (var i = 0; i < num; i++) {
                    result += str;
                }
                return result;
            }
        }]);

        return StringFunctions;
    }();

    var ObjectFunctions = exports.ObjectFunctions = function () {
        function ObjectFunctions() {
            _classCallCheck(this, ObjectFunctions);
        }

        _createClass(ObjectFunctions, null, [{
            key: "merge",
            value: function merge(obj1, obj2) {
                var mergeObject = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

                for (var prop in obj2) {
                    if (obj1[prop] != undefined) {
                        if (mergeObject && !Array.isArray(obj1[prop]) && _typeof(obj1[prop]) == 'object' && obj1[prop] != null) {
                            ObjectFunctions.merge(obj1[prop], obj2[prop], mergeObject);
                        } else {
                            obj1[prop] = obj2[prop];
                        }
                    } else {
                        obj1[prop] = obj2[prop];
                    }
                }
                return obj1;
            }
        }, {
            key: "clone",
            value: function clone(object) {
                var clone = {};
                for (var prop in object) {
                    if (this.instanceType(object[prop]) == "object") {
                        clone[prop] = this.cloneObject(object[prop]);
                    } else {
                        clone[prop] = object[prop];
                    }
                }
                ;
                return clone;
            }
        }, {
            key: "filter",
            value: function filter(obj, filterObj) {
                for (var prop in filterObj) {
                    if (obj[prop] !== undefined) {
                        filterObj[prop] = obj[prop];
                    }
                    ;
                }
                return filterObj;
            }
        }, {
            key: "egality",
            value: function egality(objects) {
                var objectRef = objects[0];
                for (var i = 1; i < objects.length; i++) {
                    for (var prop in objects[i]) {
                        if (objectRef[prop] != objects[i][prop]) {
                            return false;
                        }
                        ;
                    }
                }
                return true;
            }
        }, {
            key: "addObjectProperties",
            value: function addObjectProperties(target, source) {
                var properties = arguments.length <= 2 || arguments[2] === undefined ? "*" : arguments[2];

                var props = void 0;
                if (properties != "*") {
                    props = properties.split(",");
                    props.forEach(function (item, index, array) {
                        array[index] = item.trim();
                    });
                } else {
                    props = "*";
                }
                for (var prop in source) {
                    if (props == "*" || props.indexOf(prop) !== -1) {
                        target[prop] = source[prop];
                    }
                    ;
                }
                return target;
            }
        }, {
            key: "createPropertiesFromPattern",
            value: function createPropertiesFromPattern(_ref3) {
                var _ref3$obj = _ref3.obj;
                var obj = _ref3$obj === undefined ? {} : _ref3$obj;
                var string = _ref3.string;
                var start = _ref3.start;
                var end = _ref3.end;
                var _ref3$value = _ref3.value;
                var value = _ref3$value === undefined ? null : _ref3$value;
                var _ref3$mode = _ref3.mode;
                var mode = _ref3$mode === undefined ? "none" : _ref3$mode;
                var _ref3$a = _ref3.a;
                var a = _ref3$a === undefined ? 0 : _ref3$a;

                if (typeof start === "number" && typeof end === "number") {
                    for (var i = start; i <= end; i++) {
                        obj[jxtools.str.replaceChar({ string: string, index: i, mode: mode, a: a })] = value;
                    }
                } else if (typeof start === "string" && typeof end === "string") {
                    jx.tools.forChar(start, end, function (letter, index) {
                        obj[string.replace(new RegExp("£", "g"), letter)] = value;
                    });
                } else {
                    console.error("Tools.createPropertiesFromPattern: wrong parameters");
                }
                return obj;
            }
        }]);

        return ObjectFunctions;
    }();

    var ArrayFunctions = exports.ArrayFunctions = function () {
        function ArrayFunctions() {
            _classCallCheck(this, ArrayFunctions);
        }

        _createClass(ArrayFunctions, null, [{
            key: "contains",
            value: function contains(array, value) {
                return $.inArray(value, array);
            }
        }, {
            key: "containsAllIdentical",
            value: function containsAllIdentical(array) {
                for (var i = 1; i < array.length; i++) {
                    if (array[i] != array[0]) {
                        return false;
                    }
                }
                return true;
            }
        }, {
            key: "removeDouble",
            value: function removeDouble(array) {
                var unique = [];
                for (var i = 0; i < array.length; i++) {
                    var current = array[i];
                    if (unique.indexOf(current) < 0) unique.push(current);
                }
                return unique;
            }
        }, {
            key: "makeArrayIfSingleObject",
            value: function makeArrayIfSingleObject(object) {
                if (Object.prototype.toString.call(object) !== '[object Array]') {
                    object = [object];
                }
                return object;
            }
        }, {
            key: "randomise",
            value: function randomise(array) {
                var lList = array.slice();
                var randomList = [];
                var randomPos;
                var boucleLength = lList.length;
                for (var i = 0; i < boucleLength; i++) {
                    randomPos = MathFunctions.randomValue(0, lList.length - 1);
                    randomList.push(lList[randomPos]);
                    lList.splice(randomPos, 1);
                }
                return randomList;
            }
        }]);

        return ArrayFunctions;
    }();

    var CJS = exports.CJS = function () {
        function CJS() {
            _classCallCheck(this, CJS);
        }

        _createClass(CJS, null, [{
            key: "getChildrenByName",
            value: function getChildrenByName(mc, pattern) {
                var result = [];
                var regExp = new RegExp(pattern, "g");
                for (var i = 0; i < mc.children.length; i++) {
                    var child = mc.children[i];
                    if (child.name != null && child.name.search(regExp) != -1) {
                        result.push(child);
                    }
                }
                ;
                return result;
            }
        }, {
            key: "arrangeFlashClipsNames",
            value: function arrangeFlashClipsNames(movieClip) {
                var rec = arguments.length <= 1 || arguments[1] === undefined ? 4 : arguments[1];

                for (var prop in movieClip) {
                    if (prop != "parent" && prop != "shape" && movieClip[prop] instanceof createjs.DisplayObject) {
                        movieClip[prop].name = prop;
                        if (rec > 0 && movieClip[prop].children != undefined) {
                            CJS.arrangeFlashClipsNames(movieClip[prop], rec - 1);
                        }
                        ;
                    }
                    ;
                }
                ;
            }
        }, {
            key: "getAbsolutePath",
            value: function getAbsolutePath(movieClip) {
                var parent = movieClip.parent;
                var path = movieClip.name;
                while (parent) {
                    path = parent.name + "." + path;
                    parent = parent.parent;
                }
                return path;
            }
        }]);

        return CJS;
    }();

    var MathFunctions = exports.MathFunctions = function () {
        function MathFunctions() {
            _classCallCheck(this, MathFunctions);
        }

        _createClass(MathFunctions, null, [{
            key: "randomValue",
            value: function randomValue(min, max) {
                var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                return randomNum;
            }
        }, {
            key: "distance",
            value: function distance(pt1, pt2) {
                return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
            }
        }, {
            key: "radian2degrees",
            value: function radian2degrees(rad) {
                return rad * 180 / Math.PI;
            }
        }]);

        return MathFunctions;
    }();

    var DateFunctions = exports.DateFunctions = function () {
        function DateFunctions() {
            _classCallCheck(this, DateFunctions);
        }

        _createClass(DateFunctions, null, [{
            key: "getToday",
            value: function getToday() {
                var date = new Date();
                return {
                    timestamp: Date.now(),

                    fr: date.toLocaleString(),

                    utc: date.toUTCString(),

                    file: date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate() + "-" + Number(date.getHours() + 1) + "h" + Number(date.getMinutes() + 1) + "m" + Number(date.getSeconds() + 1) + "s"
                };
            }
        }]);

        return DateFunctions;
    }();

    var ColorFunctions = exports.ColorFunctions = function () {
        function ColorFunctions() {
            _classCallCheck(this, ColorFunctions);
        }

        _createClass(ColorFunctions, null, [{
            key: "hexToRGB",
            value: function hexToRGB(hex, alpha) {
                var r = parseInt(hex.slice(1, 3), 16),
                    g = parseInt(hex.slice(3, 5), 16),
                    b = parseInt(hex.slice(5, 7), 16);
                return { r: r, g: g, b: b, alpha: alpha };
            }
        }]);

        return ColorFunctions;
    }();
});
//# sourceMappingURL=Tools.js.map