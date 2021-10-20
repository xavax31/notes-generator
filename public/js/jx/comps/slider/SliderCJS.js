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

    var SliderCJS = function (_VisualComponentCJS) {
        _inherits(SliderCJS, _VisualComponentCJS);

        function SliderCJS(dataObject) {
            _classCallCheck(this, SliderCJS);

            throw "Component SliderCJS not yet implemented: ";
            var initialWidth = dataObject.width;
            var initialHeight = dataObject.height;

            var _this = _possibleConstructorReturn(this, (SliderCJS.__proto__ || Object.getPrototypeOf(SliderCJS)).call(this, dataObject));

            _this.initialWidth = initialWidth;
            _this.initialHeight = initialHeight;
            _this.createView();
            _this.init();
            return _this;
        }

        _createClass(SliderCJS, [{
            key: "createView",
            value: function createView() {
                if (this.dataObject.resourceID != null) {
                    var imageResource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                    this.imageResource = imageResource;
                    if (imageResource.data == null) {
                        this.jx.debug.error("resource not prelaoded : " + this.dataObject.resourceID);
                    }
                    this.view = new createjs.Bitmap(imageResource.data);
                } else {
                    var data = dataObject != undefined ? dataObject.data : null;
                    this.view = new createjs.Bitmap(data);
                }
                if (this.initialWidth != undefined) {
                    this.width = this.initialWidth;
                } else {
                    this.width = this.view.getBounds().width;
                }
                if (this.initialHeight != undefined) {
                    this.height = this.initialHeight;
                } else {
                    this.height = this.view.getBounds().height;
                }
                this.view.on("click", $.proxy(this._clicked, this));
                this.view.on("rollover", $.proxy(this._rollover, this));
                this.view.on("rollout", $.proxy(this._rollout, this));
                this.view.on("pressup", $.proxy(this._mouseup, this));
                this.view.on("mousedown", $.proxy(this._mousedown, this));
                this.view.on("pressmove", $.proxy(this._mousemove, this));
            }
        }, {
            key: "init",
            value: function init() {
                this.x = this.dataObject.x || 0;
                this.y = this.dataObject.y || 0;

                this.enabled = this.dataObject.enabled || true;
                this.visible = this.dataObject.visible || true;
                this.alpha = this.dataObject.alpha || 1;
                this.data = this.dataObject.data;
            }
        }, {
            key: "bitmapData",
            set: function set(bitmapData) {
                this.view.image = bitmapData;
            }
        }]);

        return SliderCJS;
    }(_VisualComponentCJS3.default);

    exports.default = SliderCJS;
});
//# sourceMappingURL=SliderCJS.js.map