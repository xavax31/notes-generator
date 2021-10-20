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

    var ItemShorcutsNames = {
        "Number": "NumberItem",
        "class": "ClassFile"
    };

    var DataModel = function (_Component) {
        _inherits(DataModel, _Component);

        function DataModel(dataObject) {
            _classCallCheck(this, DataModel);

            return _possibleConstructorReturn(this, (DataModel.__proto__ || Object.getPrototypeOf(DataModel)).call(this, dataObject));
        }

        _createClass(DataModel, [{
            key: "_create",
            value: function _create() {
                _get(DataModel.prototype.__proto__ || Object.getPrototypeOf(DataModel.prototype), "_create", this).call(this);
                console.log("_create", this);
                this.addEventDispatcher("onchanged");
                for (var prop in this.data) {
                    this[prop] = this.data[prop];
                }
                if (!this.children) {
                    var cl = this.jx.comp["editionitems." + (ItemShorcutsNames[this.type] || this.type)];
                    if (cl) {
                        this.children = cl.gabaritTemplate;
                    } else {
                        console.warn(this.type, this.jx.comp);
                    }
                }
                this._constructGabarit(this.children);
                if (this.value) {
                    this.setValue(this.value);
                }
            }
        }, {
            key: "_constructGabarit",
            value: function _constructGabarit(array) {
                console.log("_constructGabarit", array, this);
                if (array == null) return;
                for (var i = 0; i < array.length; i++) {
                    console.log(array[i].type);
                    this.cc({ type: "editionitems.DataModel", data: array[i] });
                }
                ;
                this.children = this.comps._children;
            }
        }, {
            key: "setValue",
            value: function setValue(arg) {
                this.value = arg;
                if (this.children) {
                    for (var prop in this.value) {
                        if (this.comps.getByPath(prop)) {
                            this.comps.getByPath(prop).setValue(this.value[prop]);
                        } else {
                            console.warn(prop, this);
                        }
                    }
                }
                this.onchanged.dispatch({ target: this });
            }
        }, {
            key: "changeValue",
            value: function changeValue(id, value) {
                for (var i = 0; i < this.comps._children.length; i++) {
                    if (this.comps._children[i].id == id) {
                        this.comps._children[i].value = value;
                    }
                    ;
                }
                ;
            }
        }, {
            key: "getByPath",
            value: function getByPath(path) {
                console.log(path);
                if (path == "value") return this.value;
                var pathArr = path.split(".");
                for (var i = 0; i < this.comps._children.length; i++) {
                    if (this.comps._children[i].id == pathArr[0]) {
                        pathArr.shift();
                        if (pathArr.length == 0) {
                            return this.comps._children[i];
                        } else {
                            return this.comps._children[i].getByPath(pathArr.join("."));
                        }
                    }
                    ;
                }
                ;
                return null;
            }
        }]);

        return DataModel;
    }(_Component3.default);

    exports.default = DataModel;
});
//# sourceMappingURL=DataModel.js.map