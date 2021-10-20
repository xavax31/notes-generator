define(["exports", "jx/comps/container/ContainerCJS"], function (exports, _ContainerCJS2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ContainerCJS3 = _interopRequireDefault(_ContainerCJS2);

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

    var SimpleButtonCJS = function (_ContainerCJS) {
        _inherits(SimpleButtonCJS, _ContainerCJS);

        function SimpleButtonCJS(dataObject) {
            _classCallCheck(this, SimpleButtonCJS);

            var _this = _possibleConstructorReturn(this, (SimpleButtonCJS.__proto__ || Object.getPrototypeOf(SimpleButtonCJS)).call(this, Object.assign({
                label: null
            }, dataObject)));

            _this._createView();
            return _this;
        }

        _createClass(SimpleButtonCJS, [{
            key: "_createView",
            value: function _createView() {
                this._text = this.addChild({ type: "Text", text: this.dataObject.label || this.dataObject.id,
                    style: { "fontFamily": "Arial", "fontSize": 12, "textAlign": "center" }
                });
                this.addChild({ type: "Shape", color: "#EEEEEE",
                    width: this._text.width, height: this._text.height
                });
                this._text.bringToFront();
            }
        }]);

        return SimpleButtonCJS;
    }(_ContainerCJS3.default);

    exports.default = SimpleButtonCJS;
});
//# sourceMappingURL=SimpleButtonCJS.js.map