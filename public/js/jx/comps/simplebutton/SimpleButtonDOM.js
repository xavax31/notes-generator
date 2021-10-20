define(["exports", "jx/comps/visualcomponent/VisualComponentDOM"], function (exports, _VisualComponentDOM2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponentDOM3 = _interopRequireDefault(_VisualComponentDOM2);

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

    var SimpleButtonDOM = function (_VisualComponentDOM) {
        _inherits(SimpleButtonDOM, _VisualComponentDOM);

        function SimpleButtonDOM(dataObject) {
            _classCallCheck(this, SimpleButtonDOM);

            return _possibleConstructorReturn(this, (SimpleButtonDOM.__proto__ || Object.getPrototypeOf(SimpleButtonDOM)).call(this, Object.assign({ render: "DOM" }, dataObject)));
        }

        _createClass(SimpleButtonDOM, [{
            key: "_create",
            value: function _create() {
                _get(SimpleButtonDOM.prototype.__proto__ || Object.getPrototypeOf(SimpleButtonDOM.prototype), "_create", this).call(this);
                this.view = $('<button type="button" id="" title=""></button>');
                this.view.prop("id", this.dataObject.id);
                this.view.prop("title", this.dataObject.id);
                this.view.text(this.dataObject.label || this.dataObject.id);
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(SimpleButtonDOM.prototype.__proto__ || Object.getPrototypeOf(SimpleButtonDOM.prototype), "_initSync", this).call(this);
                $(this.view).css("position", "absolute");
            }
        }]);

        return SimpleButtonDOM;
    }(_VisualComponentDOM3.default);

    exports.default = SimpleButtonDOM;
});
//# sourceMappingURL=SimpleButtonDOM.js.map