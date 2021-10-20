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

    var Button = function (_VisualComponent) {
        _inherits(Button, _VisualComponent);

        function Button(dataObject) {
            _classCallCheck(this, Button);

            var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.commonLib = new _Common2.default({ jx: _this.jx });
            var itemData = { shortcut: true, id: "" + _this.dataObject.id, type: 'Group',
                children: [{ id: _this.dataObject.id + "_CLICK", type: 'Sound', description: 'description' }, { id: _this.dataObject.id + "_NORMAL_I", type: 'Image', source: _this.dataObject.source, asset: _this.dataObject.asset, description: 'description' }, { id: _this.dataObject.id + "_CLICK_I", type: 'Image', source: _this.dataObject.source, asset: _this.dataObject.asset, description: 'description' }]
            };
            _this.item = itemData;
            return _this;
        }

        return Button;
    }(_VisualComponent3.default);

    exports.default = Button;
});
//# sourceMappingURL=Button.js.map