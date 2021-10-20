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

    var ImageSequenceDOM = function (_VisualComponentDOM) {
        _inherits(ImageSequenceDOM, _VisualComponentDOM);

        function ImageSequenceDOM(dataObject) {
            _classCallCheck(this, ImageSequenceDOM);

            var _this = _possibleConstructorReturn(this, (ImageSequenceDOM.__proto__ || Object.getPrototypeOf(ImageSequenceDOM)).call(this, dataObject));

            _this._initialise();
            return _this;
        }

        _createClass(ImageSequenceDOM, [{
            key: "_initialise",
            value: function _initialise() {
                this._createView();
                this._firstInit();
                this._ready = true;
                this._framerateRatio = createjs.Ticker.framerate / 12;
                this._frame = 0;
                this.play({});
            }
        }, {
            key: "_createView",
            value: function _createView() {
                var view;
                if (this.dataObject.resourceID != null) {
                    this.imageSequenceResource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                    this._bitmap_view = new Image();
                    this._bitmap_view.src = this.imageSequenceResource.data[0].src;
                }

                this.view = $(this._bitmap_view);

                this.view.css("position", "absolute");
                this.width = this.imageSequenceResource.data[0].data.naturalWidth;
                this.height = this.imageSequenceResource.data[0].data.naturalHeight;
            }
        }, {
            key: "play",
            value: function play(params) {
                this.ticker = createjs.Ticker.addEventListener("tick", this._tick.bind(this));
            }
        }, {
            key: "stop",
            value: function stop() {
                createjs.Ticker.removeEventListener("tick", this.ticker);
            }
        }, {
            key: "_tick",
            value: function _tick() {
                this.bypass = this.bypass + 1 < this._framerateRatio ? this.bypass + 1 : 0;
                if (this.bypass != 0) {
                    return;
                }
                ;

                this._bitmap_view.src = this.imageSequenceResource.data[this._frame].data.src;
                if (this._frame >= this.imageSequenceResource.data.length - 1) {
                    this._frame = 0;
                }
                this._frame++;
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
                mod.mixin(["_initialise", "_createView", "bitmapData"], ImageDOM, "ImageSequenceDOM");
                mod._initialise();
            }
        }]);

        return ImageSequenceDOM;
    }(_VisualComponentDOM3.default);

    exports.default = ImageSequenceDOM;
});
//# sourceMappingURL=ImageSequenceDOM.js.map