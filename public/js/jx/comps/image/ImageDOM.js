define(["exports", "jx/comps/visualcomponent/VisualComponentDOM"], function (exports, _VisualComponentDOM2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponentDOM3 = _interopRequireDefault(_VisualComponentDOM2);

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

    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

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

    var ImageDOM = function (_VisualComponentDOM) {
        _inherits(ImageDOM, _VisualComponentDOM);

        function ImageDOM(dataObject) {
            _classCallCheck(this, ImageDOM);

            return _possibleConstructorReturn(this, (ImageDOM.__proto__ || Object.getPrototypeOf(ImageDOM)).call(this, dataObject));
        }

        _createClass(ImageDOM, [{
            key: "_create",
            value: function _create() {
                _get(ImageDOM.prototype.__proto__ || Object.getPrototypeOf(ImageDOM.prototype), "_create", this).call(this);
                var view;
                if (this.dataObject.resourceID != null) {
                    var imageResource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                    view = new Image();
                    view.src = imageResource.src;
                } else if (this.dataObject.bitmapData != null) {
                    view = new Image();
                    view.src = this.dataObject.bitmapData.toDataURL();
                } else {
                    console.error("resourceID property is needed in dataObject", this.dataObject);
                }
                this.view = $(view);
                this.view.css("position", "absolute");
                if (imageResource) {
                    this.width = imageResource.data.naturalWidth;
                    this.height = imageResource.data.naturalHeight;
                }
            }
        }, {
            key: "bitmapData",
            set: function set(bitmapData) {
                this.view.src = bitmapData;
            }
        }], [{
            key: "initialiseMod",
            value: function initialiseMod(mod) {
                mod.extendsFrom("VisualComponent");
                mod.mixin(["_create", "bitmapData"], ImageDOM, "Image");
                mod._initialise();
            }
        }]);

        return ImageDOM;
    }(_VisualComponentDOM3.default);

    exports.default = ImageDOM;
});
//# sourceMappingURL=ImageDOM.js.map