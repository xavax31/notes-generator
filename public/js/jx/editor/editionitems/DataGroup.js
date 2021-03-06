define(["exports", "jx/editor/editionitems/Group"], function (exports, _Group2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Group3 = _interopRequireDefault(_Group2);

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

    var DataGroup = function (_Group) {
        _inherits(DataGroup, _Group);

        function DataGroup(dataObject) {
            _classCallCheck(this, DataGroup);

            return _possibleConstructorReturn(this, (DataGroup.__proto__ || Object.getPrototypeOf(DataGroup)).call(this, dataObject));
        }

        return DataGroup;
    }(_Group3.default);

    exports.default = DataGroup;
});
//# sourceMappingURL=DataGroup.js.map