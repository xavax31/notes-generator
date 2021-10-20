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

    var ContainerCJS = function (_VisualComponentCJS) {
        _inherits(ContainerCJS, _VisualComponentCJS);

        function ContainerCJS(dataObject) {
            _classCallCheck(this, ContainerCJS);

            return _possibleConstructorReturn(this, (ContainerCJS.__proto__ || Object.getPrototypeOf(ContainerCJS)).call(this, Object.assign({}, dataObject)));
        }

        _createClass(ContainerCJS, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;

                if (this.view) {
                    this.removeAllChildren();
                }
                ;
                _get(ContainerCJS.prototype.__proto__ || Object.getPrototypeOf(ContainerCJS.prototype), "kill", this).call(this);
            }
        }, {
            key: "_create",
            value: function _create() {
                _get(ContainerCJS.prototype.__proto__ || Object.getPrototypeOf(ContainerCJS.prototype), "_create", this).call(this);
                this.children = [];
                this.view = this.dataObject.view || new createjs.Container();
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(ContainerCJS.prototype.__proto__ || Object.getPrototypeOf(ContainerCJS.prototype), "_initSync", this).call(this);
                if (!this.view) return;
                if (this.dataObject.children) {
                    for (var i = 0; i < this.dataObject.children.length; i++) {
                        this.addChild(this.dataObject.children[i]);
                    }
                    ;
                }
                ;
            }
        }, {
            key: "addChild",
            value: function addChild() {
                for (var _len = arguments.length, child = Array(_len), _key = 0; _key < _len; _key++) {
                    child[_key] = arguments[_key];
                }

                var result = [];
                var argumentsLength = arguments.length;
                for (var i = 0; i < argumentsLength; i++) {
                    var _child = arguments[i];
                    var childElement = _child.isJXComponent ? _child : this.cc(_child);
                    if (childElement.render != "CJS") {
                        var domElement = new createjs.DOMElement(childElement.view[0]);
                        this.children.push(childElement);
                        childElement.parent = this;
                        this.view.addChild(domElement);
                        result.push(this.jx.stage.addChild(childElement));
                    }
                    this.children.push(childElement);
                    this.view.addChild(childElement.view);
                    if (_child.domView) {
                        this.jx.app.stage.addChild(_child.domView);
                    }
                    ;
                    childElement.parent = this;
                    result.push(childElement);
                }
                ;
                return result.pop();
            }
        }, {
            key: "hasChild",
            value: function hasChild(child) {
                return this.children.indexOf(child) != -1;
            }
        }, {
            key: "removeChild",
            value: function removeChild(child) {
                if (this.view.contains(child.view)) {
                    this.view.removeChild(child.view);
                    this.children.splice(this.children.indexOf(child), 1);
                    child.parent = null;
                }
                ;
            }
        }, {
            key: "removeAllChildren",
            value: function removeAllChildren() {
                for (var i = 0; i < this.children.length; i++) {
                    if (this.view.contains(this.children[i].view)) {
                        this.view.removeChild(this.children[i].view);
                        this.children[i].parent = null;
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
            key: "setChildIndex",
            value: function setChildIndex(child, index) {
                var childI = this.getChildIndex(child);
                this.view.setChildIndex(child.view, index);
                this.children.splice(childI, 1);
                this.children.splice(index, 0, child);
            }
        }, {
            key: "getChildIndex",
            value: function getChildIndex(child) {
                return this.view.getChildIndex(child.view);
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
                mod.mixin(["_create", "_initSync", "addChild", "hasChild", "mouseChildren", "removeAllChildren", "removeChild", "getChildById", "getChildAt"], ContainerCJS, "Container");
                mod._create();
            }
        }]);

        return ContainerCJS;
    }(_VisualComponentCJS3.default);

    exports.default = ContainerCJS;
});
//# sourceMappingURL=ContainerCJS.js.map