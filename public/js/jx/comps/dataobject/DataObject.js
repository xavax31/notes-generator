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

    var DataObject = function (_MemoAbstract) {
        _inherits(DataObject, _MemoAbstract);

        function DataObject(dataObject) {
            _classCallCheck(this, DataObject);

            var _this = _possibleConstructorReturn(this, (DataObject.__proto__ || Object.getPrototypeOf(DataObject)).call(this, Object.assign({ id: "", autosave: false, data: {} }, dataObject)));

            _this.onchange = new signals.Signal();
            _this.data = _this.dataObject.data;
            return _this;
        }

        _createClass(DataObject, [{
            key: "setVar",
            value: function setVar(name, value) {
                _get(DataObject.prototype.__proto__ || Object.getPrototypeOf(DataObject.prototype), "setVar", this).call(this, name, value);
                this.onchange.dispatch();
            }
        }, {
            key: "dispatch",
            value: function dispatch() {
                this.onchange.dispatch();
            }
        }]);

        return DataObject;
    }(_MemoAbstract3.default);

    exports.default = DataObject;
});
//# sourceMappingURL=DataObject.js.map