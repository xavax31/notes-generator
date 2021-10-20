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

    var Clip = function (_VisualComponentCJS) {
        _inherits(Clip, _VisualComponentCJS);

        function Clip(dataObject) {
            _classCallCheck(this, Clip);

            var _this = _possibleConstructorReturn(this, (Clip.__proto__ || Object.getPrototypeOf(Clip)).call(this, Object.assign({ id: "", lib: null, symbolID: null }, dataObject)));

            _this._lib = _this.dataObject.lib;
            _this.view = _this._lib.getFromSymbol(_this.dataObject.symbolID);
            _this._initializeClip();
            return _this;
        }

        _createClass(Clip, [{
            key: "_initializeClip",
            value: function _initializeClip() {
                console.log("initializeClip");
                if (this.view instanceof createjs.MovieClip) {
                    this.view.gotoAndStop(0);
                    this.view.framerate = 12;
                }
                Clip.arrangeFlashClipsNames(this.view);
            }
        }, {
            key: "getChildByName",
            value: function getChildByName(path) {
                for (var b = this.view.children, c = 0, d = b.length; d > c; c++) {
                    if (b[c].name == path) return b[c];
                }
                return null;
            }
        }, {
            key: "getMCChildByPath",
            value: function getMCChildByPath(path) {
                var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                console.log("getMCChildByPath", path, parent);
                var pathArr = path.split(".");
                var children = parent == null ? this.view.children : parent.children;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].name == pathArr[0]) {
                        pathArr.shift();
                        if (pathArr.length == 0) {
                            return children[i];
                        } else {
                            return this.getMCChildByPath(pathArr.join("."), children[i]);
                        }
                    }
                    ;
                }
                ;
                return null;
            }
        }, {
            key: "gotoAndStop",
            value: function gotoAndStop() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                this.view.gotoAndStop(args);
            }
        }, {
            key: "stop",
            value: function stop() {
                this.view.stop();
            }
        }], [{
            key: "getChildrenByName",
            value: function getChildrenByName(mc, pattern) {
                var result = [];
                var regExp = new RegExp(pattern, "g");

                for (var i = 0; i < mc.children.length; i++) {
                    var child = mc.children[i];
                    if (child.name != null && child.name.search(regExp) != -1) {
                        result.push(child);
                    }
                }
                ;
                return result;
            }
        }, {
            key: "arrangeFlashClipsNames",
            value: function arrangeFlashClipsNames(movieClip) {
                var rec = arguments.length <= 1 || arguments[1] === undefined ? 4 : arguments[1];

                for (var prop in movieClip) {
                    if (prop != "parent" && prop != "shape" && movieClip[prop] instanceof createjs.DisplayObject) {
                        movieClip[prop].name = prop;
                        if (rec > 0 && movieClip[prop].children != undefined) {
                            Clip.arrangeFlashClipsNames(movieClip[prop], rec - 1);
                        }
                        ;
                    }
                    ;
                }
                ;
            }
        }]);

        return Clip;
    }(_VisualComponentCJS3.default);

    exports.default = Clip;
});
//# sourceMappingURL=Clip.js.map