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

    var StatusItem = function (_VisualComponent) {
        _inherits(StatusItem, _VisualComponent);

        function StatusItem(dataObject) {
            _classCallCheck(this, StatusItem);

            var _this = _possibleConstructorReturn(this, (StatusItem.__proto__ || Object.getPrototypeOf(StatusItem)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.item = {
                shortcut: true,
                "id": _this.data.id,
                "type": "ComboBox",
                "editable": _this.data.editable || true,
                "description": _this.data.description || "Etat actuel du projet",
                "value": _this.data.value || "open",
                "options": "status"
            };
            _this.view = _this.item;
            return _this;
        }

        return StatusItem;
    }(_VisualComponent3.default);

    exports.default = StatusItem;
});
//# sourceMappingURL=StatusItem.js.map