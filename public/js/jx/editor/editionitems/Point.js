define(["exports", "jx/editor/editionitems/GabaritObject"], function (exports, _GabaritObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _GabaritObject3 = _interopRequireDefault(_GabaritObject2);

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

    var Point = function (_GabaritObject) {
        _inherits(Point, _GabaritObject);

        function Point(dataObject) {
            _classCallCheck(this, Point);

            dataObject.gabarit = [{
                "id": "x",
                "type": "Number",
                "editable": true,
                "description": "",
                "value": 0
            }, {
                "id": "y",
                "type": "Number",
                "editable": true,
                "description": "",
                "value": 0
            }];
            return _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, dataObject));
        }

        return Point;
    }(_GabaritObject3.default);

    exports.default = Point;
});
//# sourceMappingURL=Point.js.map