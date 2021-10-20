define(["exports", "jx/comps/visualcomponent/VisualComponentCJS"], function (exports, _VisualComponentCJS2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponentCJS3 = _interopRequireDefault(_VisualComponentCJS2);

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

    var ImageCJS = function (_VisualComponentCJS) {
        _inherits(ImageCJS, _VisualComponentCJS);

        function ImageCJS(dataObject) {
            _classCallCheck(this, ImageCJS);

            return _possibleConstructorReturn(this, (ImageCJS.__proto__ || Object.getPrototypeOf(ImageCJS)).call(this, dataObject));
        }

        _createClass(ImageCJS, [{
            key: "_create",
            value: function _create() {
                _get(ImageCJS.prototype.__proto__ || Object.getPrototypeOf(ImageCJS.prototype), "_create", this).call(this);
                if (this.dataObject.resourceID != null) {
                    var imageResource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                    if (imageResource.data == null) {
                        this.jx.debug.error("resource not preloaded : " + this.dataObject.resourceID);
                        return;
                    }
                    this.view = new createjs.Bitmap(imageResource.data);
                    this.width = this.view.getBounds().width;
                    this.height = this.view.getBounds().height;
                } else if (this.dataObject.bitmapData != null) {
                    this.view = new createjs.Bitmap(this.dataObject.bitmapData);
                    this.width = this.view.getBounds().width;
                    this.height = this.view.getBounds().height;
                } else {
                    console.error("resourceID property is needed in dataObject", this.dataObject);
                    return;
                }
            }
        }, {
            key: "bitmapData",
            set: function set(bitmapData) {
                this.view.image = bitmapData;
            },
            get: function get() {
                return this.view.image;
            }
        }], [{
            key: "initialiseMod",
            value: function initialiseMod(mod) {
                mod.extendsFrom("VisualComponent");
                mod.mixin(["_create", "bitmapData"], ImageCJS, "Image");
                mod._initialise();
            }
        }]);

        return ImageCJS;
    }(_VisualComponentCJS3.default);

    exports.default = ImageCJS;
});
//# sourceMappingURL=ImageCJS.js.map