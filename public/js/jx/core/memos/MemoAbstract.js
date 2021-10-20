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

    var MemoAbstract = function (_Component) {
        _inherits(MemoAbstract, _Component);

        function MemoAbstract(dataObject) {
            _classCallCheck(this, MemoAbstract);

            var _this = _possibleConstructorReturn(this, (MemoAbstract.__proto__ || Object.getPrototypeOf(MemoAbstract)).call(this, Object.assign({ id: "", autosave: true }, dataObject)));

            _this.autosave = _this.dataObject.autosave;
            _this.data = {};
            if (_this.autosave) _this.load();
            return _this;
        }

        _createClass(MemoAbstract, [{
            key: "setVar",
            value: function setVar(name, value) {
                if (typeof name != "string") {
                    for (var prop in name) {
                        this.setVar(prop, name[prop]);
                    }
                    return;
                }
                var varArr = name.split(".");
                var varPath = "";
                var parent = this.data;
                for (var i = 0; i < varArr.length; i++) {
                    if (parent[varArr[i]] == undefined) {
                        if (i == varArr.length - 1) {
                            parent[varArr[i]] = value;
                        } else {
                            parent[varArr[i]] = {};
                        }
                    } else {
                        if (i == varArr.length - 1) {
                            parent[varArr[i]] = value;
                        }
                    }
                    parent = parent[varArr[i]];
                }
                ;
                if (this.autosave) this.save();
                return value;
            }
        }, {
            key: "getVar",
            value: function getVar(name, defaultValue) {
                var varArr = name.split(".");
                var varPath = "";
                var parent = this.data;
                for (var i = 0; i < varArr.length; i++) {
                    if (parent[varArr[i]] == undefined) {
                        if (i == varArr.length - 1) {
                            parent[varArr[i]] = defaultValue;
                            if (this.autosave) this.save();
                            return defaultValue;
                        } else {
                            parent[varArr[i]] = {};
                        }
                    } else {
                        if (i == varArr.length - 1) {
                            return parent[varArr[i]];
                        }
                    }
                    parent = parent[varArr[i]];
                }
                ;
            }
        }, {
            key: "incNumber",
            value: function incNumber(name, value) {
                var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

                console.log(this.getVar(name, defaultValue) + value);
                return this.setVar(name, this.getVar(name, defaultValue) + value);
            }
        }, {
            key: "clear",
            value: function clear() {}
        }, {
            key: "save",
            value: function save() {}
        }, {
            key: "load",
            value: function load() {}
        }]);

        return MemoAbstract;
    }(_Component3.default);

    exports.default = MemoAbstract;
});
//# sourceMappingURL=MemoAbstract.js.map