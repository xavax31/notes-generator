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

    var MemoLocalStorage = function (_MemoAbstract) {
        _inherits(MemoLocalStorage, _MemoAbstract);

        function MemoLocalStorage(dataObject) {
            _classCallCheck(this, MemoLocalStorage);

            return _possibleConstructorReturn(this, (MemoLocalStorage.__proto__ || Object.getPrototypeOf(MemoLocalStorage)).call(this, Object.assign({}, dataObject)));
        }

        _createClass(MemoLocalStorage, [{
            key: "save",
            value: function save() {
                if (typeof Storage !== "undefined") {
                    localStorage.setItem("memo", JSON.stringify(this.data));
                } else {
                    console.log("No Web Storage support");
                }
            }
        }, {
            key: "load",
            value: function load() {
                if (typeof Storage !== "undefined") {
                    this.data = JSON.parse(localStorage.getItem("memo")) || {};
                    return;
                }
                console.log("No Web Storage support");
                return null;
            }
        }]);

        return MemoLocalStorage;
    }(_MemoAbstract3.default);

    exports.default = MemoLocalStorage;
});
//# sourceMappingURL=MemoLocalStorage.js.map