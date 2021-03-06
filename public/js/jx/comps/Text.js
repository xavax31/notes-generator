define(["exports", "jx/core/comps/VisualComponent"], function (exports, _VisualComponent2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

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

    var Text = function (_VisualComponent) {
        _inherits(Text, _VisualComponent);

        function Text(dataObject) {
            _classCallCheck(this, Text);

            var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, Object.assign({
                text: "",
                style: null
            }, dataObject)));

            _this.extendsFrom("Text");
            return _this;
        }

        _createClass(Text, [{
            key: "text",
            set: function set(value) {
                this.view.text = value;
            },
            get: function get() {
                return this.view.text;
            }
        }, {
            key: "style",
            set: function set(styleObject) {
                this.view.style = styleObject;
            }
        }]);

        return Text;
    }(_VisualComponent3.default);

    exports.default = Text;
});
//# sourceMappingURL=Text.js.map