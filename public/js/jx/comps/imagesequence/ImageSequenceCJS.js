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

    var ImageSequenceCJS = function (_VisualComponentCJS) {
        _inherits(ImageSequenceCJS, _VisualComponentCJS);

        function ImageSequenceCJS(dataObject) {
            _classCallCheck(this, ImageSequenceCJS);

            return _possibleConstructorReturn(this, (ImageSequenceCJS.__proto__ || Object.getPrototypeOf(ImageSequenceCJS)).call(this, Object.assign({
                framerate: 12,
                loops: -1,
                autoStart: true
            }, dataObject)));
        }

        _createClass(ImageSequenceCJS, [{
            key: "_create",
            value: function _create() {
                _get(ImageSequenceCJS.prototype.__proto__ || Object.getPrototypeOf(ImageSequenceCJS.prototype), "_create", this).call(this);
                this.addEventDispatcher("onfinished");
                this._createView();
                this._ready = true;
                this.framerate = this.dataObject.framerate;
                this.loops = this.dataObject.loops;
                this._frame = 0;
                if (this.dataObject.autoStart) {
                    this.play({});
                }
            }
        }, {
            key: "_createView",
            value: function _createView() {
                if (this.dataObject.resourceID != null) {
                    this.imageSequenceResource = this.jx.db.findOne({ id: this.dataObject.resourceID });
                    this.view = new createjs.Bitmap(this.imageSequenceResource.data[0].data);
                } else {
                    this.view = new createjs.Bitmap(dataObject.data);
                }
            }
        }, {
            key: "play",
            value: function play() {
                var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                this.cancel();
                this.onfinished.add(params.onfinished || function (evt) {});
                this.ticker = createjs.Ticker.addEventListener("tick", this._tick.bind(this));
            }
        }, {
            key: "stop",
            value: function stop() {
                createjs.Ticker.removeEventListener("tick", this.ticker);
                this.onfinished.dispatch({ target: this });
                this.onfinished.removeAll();
            }
        }, {
            key: "cancel",
            value: function cancel() {
                createjs.Ticker.removeEventListener("tick", this.ticker);
                this.onfinished.removeAll();
            }
        }, {
            key: "goto",
            value: function goto(gotoParams) {
                this.cancel();
                this._frame = gotoParams.frame;
                this.view.image = this.imageSequenceResource.data[this._frame].data;
            }
        }, {
            key: "_tick",
            value: function _tick() {
                this.bypass = this.bypass + 1 < this._framerateRatio ? this.bypass + 1 : 0;
                if (this.bypass != 0) {
                    return;
                }
                ;
                this.view.image = this.imageSequenceResource.data[this._frame].data;
                if (this._frame >= this.imageSequenceResource.data.length - 1) {
                    if (this.loops == 0) {
                        this.stop();
                    } else {
                        this._frame = 0;
                    }
                }
                this._frame++;
            }
        }, {
            key: "framerate",
            get: function get() {
                return this._framerate;
            },
            set: function set(value) {
                this._framerate = value;
                this._framerateRatio = createjs.Ticker.framerate / this._framerate;
            }
        }, {
            key: "rotation",
            set: function set(value) {
                this.view.regX = this.view.image.width * this._anchorX;
                this.view.regY = this.view.image.height * this._anchorY;
                this.view.rotation = value;
            },
            get: function get() {
                return this.view.rotation;
            }
        }], [{
            key: "initialiseMod",
            value: function initialiseMod(mod) {
                mod.extendsFrom("VisualComponent");
                mod.mixin(["_initialise", "_createView", "play", "stop", "_tick"], ImageSequenceCJS, "ImageSequence");
                mod._initialise();
            }
        }]);

        return ImageSequenceCJS;
    }(_VisualComponentCJS3.default);

    exports.default = ImageSequenceCJS;
});
//# sourceMappingURL=ImageSequenceCJS.js.map