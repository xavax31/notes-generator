define(["exports", "jx/comps/container/containerCJS"], function (exports, _containerCJS2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _containerCJS3 = _interopRequireDefault(_containerCJS2);

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

    var ContainerSelectorCJS = function (_containerCJS) {
        _inherits(ContainerSelectorCJS, _containerCJS);

        function ContainerSelectorCJS(dataObject) {
            _classCallCheck(this, ContainerSelectorCJS);

            var _this = _possibleConstructorReturn(this, (ContainerSelectorCJS.__proto__ || Object.getPrototypeOf(ContainerSelectorCJS)).call(this, Object.assign({}, dataObject)));

            console.log("ContainerCJS", _this.dataObject);
            return _this;
        }

        _createClass(ContainerSelectorCJS, [{
            key: "_create",
            value: function _create() {
                _get(ContainerSelectorCJS.prototype.__proto__ || Object.getPrototypeOf(ContainerSelectorCJS.prototype), "_create", this).call(this);
                this.children = [];
                this.view = this.dataObject.view || new createjs.Container();
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                _get(ContainerSelectorCJS.prototype.__proto__ || Object.getPrototypeOf(ContainerSelectorCJS.prototype), "_initSync", this).call(this);
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
            value: function addChild(child) {
                var childElement = child.isJXComponent ? child : this.cc(child);
                if (childElement.render != "CJS") {
                    var domElement = new createjs.DOMElement(childElement.view[0]);
                    this.children.push(childElement);
                    childElement.parent = this;
                    this.view.addChild(domElement);
                    return this.jx.stage.addChild(childElement);
                }
                this.children.push(childElement);
                childElement.parent = this;
                this.view.addChild(childElement.view);
                if (child.domView) {
                    this.jx.app.stage.addChild(child.domView);
                }
                ;
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
                if (this.view.contains(child.view)) {
                    this.view.removeChild(child.view);
                    this.children.splice(this.children.indexOf(child), 1);
                }
                ;
            }
        }, {
            key: "removeAllChildren",
            value: function removeAllChildren() {
                for (var i = 0; i < this.children.length; i++) {
                    if (this.view.contains(this.children[i].view)) {
                        this.view.removeChild(this.children[i].view);
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
                mod._initialise();
            }
        }]);

        return ContainerSelectorCJS;
    }(_containerCJS3.default);

    exports.default = ContainerSelectorCJS;
});
//# sourceMappingURL=ContainerSelectorCJS.js.map