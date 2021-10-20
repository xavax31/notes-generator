define(["exports", "jx/editor/editionitems/FileItem"], function (exports, _FileItem2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _FileItem3 = _interopRequireDefault(_FileItem2);

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

    var SpriteSheetItem = function (_FileItem) {
        _inherits(SpriteSheetItem, _FileItem);

        function SpriteSheetItem(dataObject) {
            _classCallCheck(this, SpriteSheetItem);

            dataObject.data.asset.type = "SpriteSheet";
            return _possibleConstructorReturn(this, (SpriteSheetItem.__proto__ || Object.getPrototypeOf(SpriteSheetItem)).call(this, Object.assign({
                icoSymbol: "th-large",
                actions: [],
                informations: ["asset"],
                backgroundColor: "#d5eaff"
            }, dataObject)));
        }

        return SpriteSheetItem;
    }(_FileItem3.default);

    exports.default = SpriteSheetItem;
});
//# sourceMappingURL=SpriteSheetItem.js.map