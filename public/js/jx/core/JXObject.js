define(["exports", "jx/core/Core"], function (exports, _Core) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Core2 = _interopRequireDefault(_Core);

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

    var protos = {};

    var JXObject = function () {
        function JXObject() {
            var dataObject = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            _classCallCheck(this, JXObject);

            this.dataObject = dataObject;

            this.jx = this.dataObject.jx || (this.dataObject.jxClass ? new this.dataObject.jxClass(this) : new _Core2.default(this));
            this._implements = {};
        }

        _createClass(JXObject, [{
            key: "extendsFrom",
            value: function extendsFrom(clPath) {
                if (JXObject.getProto(this.__proto__.constructor.name) != undefined) return;
                var arr = clPath.split(".");
                if (arr.length == 1) {
                    var path = "jx/comps/" + clPath.toLowerCase() + "/" + clPath + this._render;
                } else {
                    var path = clPath;
                }
                console.log("extendsfrom", path);
                var cl = this.jx.db.getClass(path);

                cl.initialiseMod(this);
            }
        }, {
            key: "_getParentClass",
            value: function _getParentClass(className) {
                var parentClass = this.__proto__;
                while (parentClass.constructor.name != className) {
                    parentClass = parentClass.__proto__;
                }
                return parentClass;
            }
        }, {
            key: "getJXObjectParentClass",
            value: function getJXObjectParentClass() {
                var parentClass = this.__proto__;
                while (parentClass.constructor.name != "JXObject") {
                    parentClass = parentClass.__proto__;
                }
                return parentClass;
            }
        }, {
            key: "mixin",
            value: function mixin(namesArr, classObj) {
                var targetClassName = arguments.length <= 2 || arguments[2] === undefined ? "JXObject" : arguments[2];

                var name;
                var parentJXObjectClass = this._getParentClass(targetClassName);
                for (var i = 0; i < namesArr.length; i++) {
                    name = namesArr[i];

                    var member = Object.getOwnPropertyDescriptor(classObj.prototype, name);
                    if (member) {
                        member.enumerable = true;
                        Object.defineProperty(parentJXObjectClass, name, member);
                    } else {
                        throw "Error during mixin with property '" + name + "' in " + this.__proto__.constructor.name;
                    }
                }
                ;
            }
        }, {
            key: "implements",
            value: function _implements() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                for (var i = 0; i < args.length; i++) {
                    this._implements[args[i]] = true;
                }
                ;
            }
        }], [{
            key: "getProto",
            value: function getProto(protoName) {
                return protos[protoName];
            }
        }, {
            key: "setProto",
            value: function setProto(proto, render) {
                protos[proto.constructor.name + render] = proto;
            }
        }]);

        return JXObject;
    }();

    exports.default = JXObject;
});
//# sourceMappingURL=JXObject.js.map