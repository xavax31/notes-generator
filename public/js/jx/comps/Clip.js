define(["exports", "jx/comps/visualcomponent/VisualComponent"], function (exports, _VisualComponent2) {
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

    var Clip = function (_VisualComponent) {
        _inherits(Clip, _VisualComponent);

        function Clip(dataObject) {
            _classCallCheck(this, Clip);

            var _this = _possibleConstructorReturn(this, (Clip.__proto__ || Object.getPrototypeOf(Clip)).call(this, dataObject));

            _this.extendsFrom("Clip");
            return _this;
        }

        _createClass(Clip, [{
            key: "getClip",
            value: function getClip(_ref) {
                var path = _ref.path;
                var start = _ref.start;
                var end = _ref.end;
                var _ref$parent = _ref.parent;
                var parent = _ref$parent === undefined ? null : _ref$parent;

                this.view.getClip({ path: path, start: start, end: end, parent: parent });
            }
        }, {
            key: "findClipRec",
            value: function findClipRec(_ref2) {
                var id = _ref2.id;
                var _ref2$parent = _ref2.parent;
                var parent = _ref2$parent === undefined ? null : _ref2$parent;

                this.view.fndClipRec({ id: id, parent: parent });
            }
        }, {
            key: "addChild",
            value: function addChild(child) {
                this.view.addChild(child);
            }
        }, {
            key: "removeChild",
            value: function removeChild(child) {
                this.view.removeChild(child);
            }
        }, {
            key: "removeAllChildren",
            value: function removeAllChildren() {
                this.view.removeAllChildren();
            }
        }, {
            key: "setChildIndex",
            value: function setChildIndex(child, index) {
                this.view.setChildIndex(child, index);
            }
        }, {
            key: "getChildIndex",
            value: function getChildIndex(child) {
                return this.view.getChildIndex(child);
            }
        }, {
            key: "getChildAt",
            value: function getChildAt(index) {
                return this.view.getChildAt(index);
            }
        }, {
            key: "getChildByName",
            value: function getChildByName(path) {
                return this.view.getChildByName(path);
            }
        }, {
            key: "getMCChildrenByPattern",
            value: function getMCChildrenByPattern(pattern) {
                return this.view.getMCChildrenByPattern(pattern);
            }
        }, {
            key: "getMCChildByPath",
            value: function getMCChildByPath(path) {
                var parent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                if (!path) return null;
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
            key: "gotoAndPlay",
            value: function gotoAndPlay() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                this.view.gotoAndPlay(args);
            }
        }, {
            key: "play",
            value: function play() {
                this.view.play();
            }
        }, {
            key: "playOnce",
            value: function playOnce() {
                var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                var _ref3$start = _ref3.start;
                var start = _ref3$start === undefined ? null : _ref3$start;
                var _ref3$end = _ref3.end;
                var end = _ref3$end === undefined ? null : _ref3$end;
                var _ref3$onfinished = _ref3.onfinished;
                var onfinished = _ref3$onfinished === undefined ? function (evt) {} : _ref3$onfinished;
                var _ref3$onframechange = _ref3.onframechange;
                var onframechange = _ref3$onframechange === undefined ? function (evt) {} : _ref3$onframechange;

                this.view.playOnce({ start: start, end: end, onfinished: onfinished, onframechange: onframechange });
            }
        }, {
            key: "stop",
            value: function stop() {
                this.view.stop();
            }
        }, {
            key: "gotoLabel",
            value: function gotoLabel(label, params) {
                this.view.gotoLabel(label, params);
            }
        }, {
            key: "cache",
            value: function cache() {
                this.view.cache();
            }
        }, {
            key: "uncache",
            value: function uncache() {
                this.view.uncache();
            }
        }, {
            key: "updateCache",
            value: function updateCache() {
                this.view.updateCache();
            }
        }, {
            key: "freeze",
            value: function freeze() {
                this.view.freeze();
            }
        }, {
            key: "unfreeze",
            value: function unfreeze() {
                this.view.unfreeze();
            }
        }, {
            key: "name",
            get: function get() {
                return this.view.name;
            }
        }, {
            key: "mousechildren",
            get: function get() {
                return this.view.mouseChildren;
            }
        }, {
            key: "mouseChildren",
            set: function set(value) {
                this.view.mouseChildren = value;
            }
        }, {
            key: "currentFrame",
            get: function get() {
                return this.view.currentFrame;
            }
        }, {
            key: "currentLabel",
            get: function get() {
                return this.view.currentLabel;
            }
        }, {
            key: "totalFrames",
            get: function get() {
                return this.view.totalFrames;
            }
        }]);

        return Clip;
    }(_VisualComponent3.default);

    exports.default = Clip;
});
//# sourceMappingURL=Clip.js.map