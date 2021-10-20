define(["exports", "jx/core/comps/Component"], function (exports, _Component2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

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

    var ScreenPhoto = function (_Component) {
        _inherits(ScreenPhoto, _Component);

        function ScreenPhoto(dataObject) {
            _classCallCheck(this, ScreenPhoto);

            return _possibleConstructorReturn(this, (ScreenPhoto.__proto__ || Object.getPrototypeOf(ScreenPhoto)).call(this, Object.assign({
                sClose: null
            }, dataObject)));
        }

        _createClass(ScreenPhoto, [{
            key: "_create",
            value: function _create() {
                _get(ScreenPhoto.prototype.__proto__ || Object.getPrototypeOf(ScreenPhoto.prototype), "_create", this).call(this);
                this.type = "image";
                this.rid = this.dataObject.rid || this.dataObject.resourceID;
                this.nextScreenID = this.dataObject.nextScreenID;
                this.cadre = this.dataObject.cadre;
            }
        }, {
            key: "show",
            value: function show() {
                var _this2 = this;

                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                this._showImage({ id: this.rid, cadre: this.cadre,
                    onmousedown: function onmousedown(evt) {
                        if (_this2.dataObject.sClose) _this2.jx.dj.play({ id: _this2.dataObject.sClose });
                        _this2.jx.app.screens.go(_this2.nextScreenID);
                    },
                    onready: function onready(evt) {
                        _this2.view = evt.target;
                        callback({ target: _this2 });
                    }
                });
            }
        }, {
            key: "hide",
            value: function hide(evt) {
                if (this.view) {
                    this.jx.app.stage.removeChild(this.cadre);
                    this.cadre.removeChild(this.image);
                    this.image.killme();
                    this.image = null;
                }
            }
        }, {
            key: "_showImage",
            value: function _showImage(_ref) {
                var _this3 = this;

                var id = _ref.id;
                var _ref$onmousedown = _ref.onmousedown;
                var onmousedown = _ref$onmousedown === undefined ? function (evt) {} : _ref$onmousedown;
                var _ref$onready = _ref.onready;
                var onready = _ref$onready === undefined ? function (evt) {} : _ref$onready;
                var _ref$cadre = _ref.cadre;
                var cadre = _ref$cadre === undefined ? null : _ref$cadre;

                var resource = this.jx.db.findOne({ id: id });
                if (!resource) {
                    console.error("Image ", id, "not found in db");
                }
                ;
                var showImageFunc = function showImageFunc(evt) {
                    var img = _this3.cc({ rid: id });
                    img.killme = function () {
                        _this3.comps.remove(img);
                    };
                    _this3.jx.app.stage.addChild(cadre);
                    cadre.addChild(img);
                    img.fitIn({ target: _this3.jx.app.stage, center: true });
                    cadre.setChildIndex(img, cadre.getChildIndex(cadre.photoHolder));
                    cadre.onmousedown.addOnce(onmousedown);
                    _this3.image = img;
                    onready({ target: cadre, image: img });
                };
                if (!resource.data) {
                    this.jx.db.load({ id: id }, showImageFunc);
                } else {
                    showImageFunc();
                }
            }
        }]);

        return ScreenPhoto;
    }(_Component3.default);

    exports.default = ScreenPhoto;
});
//# sourceMappingURL=ScreenPhoto.js.map