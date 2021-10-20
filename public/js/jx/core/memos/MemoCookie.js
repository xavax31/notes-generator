define(["exports", "jx/core/memos/MemoAbstract"], function (exports, _MemoAbstract2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _MemoAbstract3 = _interopRequireDefault(_MemoAbstract2);

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

    var MemoCookie = function (_MemoAbstract) {
        _inherits(MemoCookie, _MemoAbstract);

        function MemoCookie(dataObject) {
            _classCallCheck(this, MemoCookie);

            return _possibleConstructorReturn(this, (MemoCookie.__proto__ || Object.getPrototypeOf(MemoCookie)).call(this, Object.assign({}, dataObject)));
        }

        _createClass(MemoCookie, [{
            key: "save",
            value: function save() {
                this._createCookie("memo", JSON.stringify(this.data), 1000000);
            }
        }, {
            key: "load",
            value: function load() {
                this.data = JSON.parse(this._readCookie("memo")) || {};
            }
        }, {
            key: "clear",
            value: function clear() {
                this.data = {};
                this.save();
            }
        }, {
            key: "_createCookie",
            value: function _createCookie(name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                    var expires = "; expires=" + date.toGMTString();
                } else var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            }
        }, {
            key: "_readCookie",
            value: function _readCookie(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1, c.length);
                    }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
        }, {
            key: "_eraseCookie",
            value: function _eraseCookie(name) {
                this._createCookie(name, "", -1);
            }
        }]);

        return MemoCookie;
    }(_MemoAbstract3.default);

    exports.default = MemoCookie;
});
//# sourceMappingURL=MemoCookie.js.map