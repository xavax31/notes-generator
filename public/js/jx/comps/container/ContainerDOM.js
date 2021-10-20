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

    var ContainerDOM = function (_VisualComponentDOM) {
        _inherits(ContainerDOM, _VisualComponentDOM);

        function ContainerDOM(dataObject) {
            _classCallCheck(this, ContainerDOM);

            return _possibleConstructorReturn(this, (ContainerDOM.__proto__ || Object.getPrototypeOf(ContainerDOM)).call(this, Object.assign({}, dataObject)));
        }

        _createClass(ContainerDOM, [{
            key: "_create",
            value: function _create() {
                _get(ContainerDOM.prototype.__proto__ || Object.getPrototypeOf(ContainerDOM.prototype), "_create", this).call(this);
                this.children = [];
                this.view = this.dataObject.view || $('<div/>');
                this.view.css("position", "absolute");
                this._allowZIndex = false;
            }
        }, {
            key: "addChild",
            value: function addChild(child) {
                var childElement = child.isJXComponent ? child : this.cc(child);
                if (childElement.render != "DOM") {
                    console.error("ContainerDOM", this.id, " can not add child ", childElement.id, "with render", childElement.render);
                    return null;
                }
                if (this._allowZIndex) {
                    var children = this.view.children();
                    var maxZ = 0;
                    for (var j = 0; j < children.length; j++) {
                        maxZ = Math.max(maxZ, $(children[j]).css("z-index"));
                    }
                    ;
                    this.view.append(childElement.view);
                    childElement.view.css("z-index", maxZ + 1);
                } else {
                    this.view.append(childElement.view);
                }
                this.children.push(childElement);
                childElement.parent = this;
                return childElement;
            }
        }, {
            key: "hasChild",
            value: function hasChild(child) {
                return this.children.indexOf(child) != -1;
            }
        }, {
            key: "removeChild",
            value: function removeChild(child) {
                if (this.view.has(child.view).length > 0) {
                    this.view.remove(child.view);
                    this.children.splice(this.children.indexOf(child), 1);
                }
                ;
            }
        }, {
            key: "removeAllChildren",
            value: function removeAllChildren() {
                for (var i = 0; i < this.children.length; i++) {
                    if (this.view.contains(this.children[i].view)) {
                        this.view.remove(this.children[i].view);
                    }
                    ;
                }
                ;
                this.children.length = 0;
            }
        }, {
            key: "getChildAt",
            value: function getChildAt(index) {
                return this.children[index];
            }
        }, {
            key: "getChildById",
            value: function getChildById(id) {
                for (var i = 0; i < this.children.length; i++) {
                    if (this.children[i].id == id) {
                        return this.children[i];
                    }
                }
                ;
                return null;
            }
        }, {
            key: "width",
            set: function set(value) {
                console.log(this.width);
                var ratio = value / this.width;
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].width *= ratio;
                    this.children[i].x *= ratio;
                }
                ;
            },
            get: function get() {
                var width = 0;
                for (var i = 0; i < this.children.length; i++) {
                    width += this.children[i].width;
                }
                ;
                return width;
            }
        }, {
            key: "height",
            set: function set(value) {
                console.log(this.height);
                var ratio = value / this.height;
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].height *= ratio;
                    this.children[i].y *= ratio;
                }
                ;
            },
            get: function get() {
                var height = 0;
                for (var i = 0; i < this.children.length; i++) {
                    height += this.children[i].height;
                }
                ;
                return height;
            }
        }, {
            key: "mouseChildren",
            set: function set(bool) {
                this.view.mouseChildren = bool;
            },
            get: function get() {
                return this.view.mouseChildren;
            }
        }], [{
            key: "initialiseMod",
            value: function initialiseMod(mod) {
                mod.extendsFrom("VisualComponent");
                mod.mixin(["_create", "addChild", "hasChild", "mouseChildren", "removeAllChildren", "removeChild", "getChildById", "getChildAt", "width", "height"], ContainerDOM, "Container");
                mod._initialise();
            }
        }]);

        return ContainerDOM;
    }(_VisualComponentDOM3.default);

    exports.default = ContainerDOM;
});
//# sourceMappingURL=ContainerDOM.js.map