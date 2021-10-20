define(["exports", "jx/core/comps/VisualComponent", "jx/editor/editionitems/Common"], function (exports, _VisualComponent2, _Common) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

    var _Common2 = _interopRequireDefault(_Common);

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

    var Sequence01 = function (_VisualComponent) {
        _inherits(Sequence01, _VisualComponent);

        function Sequence01(dataObject) {
            _classCallCheck(this, Sequence01);

            var _this = _possibleConstructorReturn(this, (Sequence01.__proto__ || Object.getPrototypeOf(Sequence01)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var itemData = { shortcut: true, id: "" + _this.data.id, type: 'GROUP',
                children: [{ id: 'Variante', type: 'Text', description: "" + texts.variante }, { id: "" + _this.data.id, type: 'Sound', description: 'description' }, { id: "TXT_" + _this.data.id, type: 'Text', editable: true, description: 'description' }, { id: 'MASCOTTE', type: 'Animation', description: 'description' }]
            };
            _this.item = itemData;
            return _this;
        }

        return Sequence01;
    }(_VisualComponent3.default);

    exports.default = Sequence01;
});
//# sourceMappingURL=Sequence01.js.map