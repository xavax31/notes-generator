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

    var PDF = function (_FileItem) {
        _inherits(PDF, _FileItem);

        function PDF(dataObject) {
            _classCallCheck(this, PDF);

            dataObject.data.asset.type = "PSD";
            return _possibleConstructorReturn(this, (PDF.__proto__ || Object.getPrototypeOf(PDF)).call(this, Object.assign({
                icoSymbol: "file-powerpoint-o",
                actions: ["download", "preview"],
                informations: ["asset"],
                backgroundColor: "#fff9ba"
            }, dataObject)));
        }

        return PDF;
    }(_FileItem3.default);

    exports.default = PDF;
});
//# sourceMappingURL=PDF.js.map