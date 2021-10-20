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

    var FlashtmlPackItem = function (_GabaritObject) {
        _inherits(FlashtmlPackItem, _GabaritObject);

        function FlashtmlPackItem(dataObject) {
            _classCallCheck(this, FlashtmlPackItem);

            dataObject.gabarit = FlashtmlPackItem.gabaritTemplate;
            dataObject.data.preview = false;
            dataObject.data.visible = false;
            return _possibleConstructorReturn(this, (FlashtmlPackItem.__proto__ || Object.getPrototypeOf(FlashtmlPackItem)).call(this, dataObject));
        }

        _createClass(FlashtmlPackItem, null, [{
            key: "gabaritTemplate",
            get: function get() {
                return [{
                    "type": "Parameter",
                    "id": "resourceID",
                    "value": "COMMON_LIB",
                    "editable": false,
                    "visible": true
                }, {
                    "type": "Number",
                    "id": "framerate",
                    "value": 24,
                    "editable": true,
                    "visible": true
                }, {
                    "type": "Boolean",
                    "id": "optimised",
                    "value": true,
                    "editable": true,
                    "visible": true
                }];
            }
        }]);

        return FlashtmlPackItem;
    }(_GabaritObject3.default);

    exports.default = FlashtmlPackItem;
});
//# sourceMappingURL=FlashtmlPackItem.js.map