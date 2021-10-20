define(["exports", "jx/editor/editionitems/Text"], function (exports, _Text2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Text3 = _interopRequireDefault(_Text2);

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

    var Parameter = function (_Text) {
        _inherits(Parameter, _Text);

        function Parameter(dataObject) {
            _classCallCheck(this, Parameter);

            return _possibleConstructorReturn(this, (Parameter.__proto__ || Object.getPrototypeOf(Parameter)).call(this, Object.assign({
                icoTitle: "Voir",
                icoSymbol: "cog",
                actions: [],
                informations: [],
                backgroundColor: "#efefef"
            }, dataObject)));
        }

        return Parameter;
    }(_Text3.default);

    exports.default = Parameter;
});
//# sourceMappingURL=Parameter.js.map