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

    var SoundItem = function (_FileItem) {
        _inherits(SoundItem, _FileItem);

        function SoundItem(dataObject) {
            _classCallCheck(this, SoundItem);

            dataObject.data.asset.type = "Sound";
            return _possibleConstructorReturn(this, (SoundItem.__proto__ || Object.getPrototypeOf(SoundItem)).call(this, Object.assign({
                icoSymbol: "volume-up",
                actions: ["download", "preview"],
                informations: ["asset"],
                backgroundColor: "#ccffd2"
            }, dataObject)));
        }

        return SoundItem;
    }(_FileItem3.default);

    exports.default = SoundItem;
});
//# sourceMappingURL=SoundItem.js.map