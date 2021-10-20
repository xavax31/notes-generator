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

    var SimpleDOMView = function (_Component) {
        _inherits(SimpleDOMView, _Component);

        function SimpleDOMView(dataObject) {
            _classCallCheck(this, SimpleDOMView);

            return _possibleConstructorReturn(this, (SimpleDOMView.__proto__ || Object.getPrototypeOf(SimpleDOMView)).call(this, Object.assign({
                render: "DOM",
                parentDOMView: $("body"),
                targetDOM: null,
                framerate: null,
                ratio: null
            }, dataObject)));
        }

        _createClass(SimpleDOMView, [{
            key: "pause",
            value: function pause() {
                if (_get(SimpleDOMView.prototype.__proto__ || Object.getPrototypeOf(SimpleDOMView.prototype), "pause", this).call(this)) {}
            }
        }, {
            key: "resume",
            value: function resume() {
                if (_get(SimpleDOMView.prototype.__proto__ || Object.getPrototypeOf(SimpleDOMView.prototype), "resume", this).call(this)) {}
            }
        }, {
            key: "close",
            value: function close() {
                if (_get(SimpleDOMView.prototype.__proto__ || Object.getPrototypeOf(SimpleDOMView.prototype), "close", this).call(this)) {}
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(SimpleDOMView.prototype.__proto__ || Object.getPrototypeOf(SimpleDOMView.prototype), "_initSync", this).call(this);
                this.render = "DOM";
                this.ratio = this.dataObject.ratio || this.jx.config.app.ratio;
                this.framerate = this.dataObject.framerate || this.jx.config.app.framerate;
                this._enabled = true;
                this.children = [];
                this.view = this.dataObject.targetDOM || $("<div id=" + this.id + "></div>");

                this.dataObject.parentDOMView.append(this.view);
            }
        }, {
            key: "update",
            value: function update() {}
        }, {
            key: "addChild",
            value: function addChild(child) {
                child = child.isJXComponent ? child : this.cc(child);
                if (child.view == undefined || child.render != "DOM") {
                    console.warn("Could not Add child as it does not have a DOM view", child);
                    return;
                }
                this.view.append(child.view);
                this.children.push(child);
                child.parent = this;
                this.onResize();
            }
        }, {
            key: "hasChild",
            value: function hasChild(child) {
                console.log(this.children, this.children.indexOf(child));
                return this.children.indexOf(child) != -1;
            }
        }, {
            key: "removeChild",
            value: function removeChild(child) {
                this.canvasHolder.remove(child.view);
                this.children.splice(this.children.indexOf(child), 1);
            }
        }, {
            key: "localToGlobal",
            value: function localToGlobal() {
                console.log("not implemented");
                return null;
            }
        }, {
            key: "globalToLocal",
            value: function globalToLocal() {
                console.log("not implemented");
                return null;
            }
        }, {
            key: "localToLocal",
            value: function localToLocal() {
                console.log("not implemented");
                return null;
            }
        }, {
            key: "onResize",
            value: function onResize(event) {}
        }, {
            key: "enabled",
            get: function get() {
                return this._enabled;
            },
            set: function set(value) {
                this._enabled = value;
            }
        }, {
            key: "width",
            set: function set(value) {
                this.view.width(value);
            },
            get: function get() {
                return 1024;
            }
        }, {
            key: "height",
            set: function set(value) {
                this.view.height(value);
            },
            get: function get() {
                return 768;
            }
        }, {
            key: "visible",
            set: function set(value) {
                this.view.css("display", value ? "initial" : "none");
            }
        }]);

        return SimpleDOMView;
    }(_Component3.default);

    exports.default = SimpleDOMView;
});
//# sourceMappingURL=SimpleDOMView.js.map