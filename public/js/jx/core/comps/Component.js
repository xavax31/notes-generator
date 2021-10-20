define(["exports", "jx/core/JXObject"], function (exports, _JXObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

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

    var Component = function (_JXObject) {
        _inherits(Component, _JXObject);

        function Component(dataObject) {
            var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            _classCallCheck(this, Component);

            var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, Object.assign({
                id: null,
                parentComponent: null,
                data: null,
                initialise: false,
                IDTarget: null,
                autoStart: true
            }, dataObject)));

            _this.isJXComponent = true;
            _this._paused = false;

            _this.dataObject = _this.jx.tools.obj.merge(_this.dataObject, defaultValue);
            _this.parentComponent = _this.dataObject.parentComponent;

            _this._initialise();
            return _this;
        }

        _createClass(Component, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                this._killed = true;
                this.comps.kill();
                this._removeAllEventDispatchers();
                this._jx_remove_listeners();
                if (this.parentComponent) {
                    this.parentComponent.comps.remove(this);
                }
                ;
                this.parentComponent = null;
                this._jx_listeners = null;
                this.comps = null;
                this.dataObject = null;
                this.data = null;
                this.jx = null;
            }
        }, {
            key: "_jx_add_listeners",
            value: function _jx_add_listeners() {
                var _this2 = this;

                this._jx_listeners = {
                    onpause: function onpause(evt) {
                        return _this2.pause(evt);
                    },
                    onresume: function onresume(evt) {
                        return _this2.resume(evt);
                    },
                    onclose: function onclose(evt) {
                        return _this2.close(evt);
                    },
                    onappfreeze: function onappfreeze(evt) {
                        return _this2.appFreeze(evt);
                    },
                    onappunfreeze: function onappunfreeze(evt) {
                        return _this2.appUnfreeze(evt);
                    }
                };
                this.jx.onappfreeze.add(this._jx_listeners.onappfreeze);
                this.jx.onappunfreeze.add(this._jx_listeners.onappunfreeze);
                if (this.parentComponent) {
                    this.parentComponent.onpause.add(this._jx_listeners.onpause);
                    this.parentComponent.onresume.add(this._jx_listeners.onresume);
                    this.parentComponent.onclose.add(this._jx_listeners.onclose);
                }
                ;
            }
        }, {
            key: "_jx_remove_listeners",
            value: function _jx_remove_listeners() {
                if (!this._jx_listeners) return;
                this.jx.onappfreeze.remove(this._jx_listeners.onappfreeze);
                this.jx.onappunfreeze.remove(this._jx_listeners.onappunfreeze);
                if (this.parentComponent) {
                    this.parentComponent.onpause.remove(this._jx_listeners.onpause);
                    this.parentComponent.onresume.remove(this._jx_listeners.onresume);
                    this.parentComponent.onclose.remove(this._jx_listeners.onclose);
                }
            }
        }, {
            key: "_initialise",
            value: function _initialise() {
                this._create();
                this._initSync();
                return this;
            }
        }, {
            key: "_create",
            value: function _create() {
                this.isJXComponent = true;

                this._id = this.dataObject.id;

                this.data = this.dataObject.data;
                this.IDTarget = this.dataObject.IDTarget;

                this.comps = new ComponentsCollection(this);
                this._eventsdispatchers = [];
                this.addEventDispatcher("onInitialised", "firstinit", "onchanged", "onpause", "onresume", "onclose");
                this._ready = false;
                this.initialising = false;
                this._paused = false;
                this._closed = false;
            }
        }, {
            key: "_initSync",
            value: function _initSync() {
                var _this3 = this;

                if (this.dataObject.oninitialised) this.onInitialised.addOnce(this.dataObject.oninitialised);
                if (this._ready && this.dataObject.autoStart) {
                    this.start();
                } else if (this.dataObject.initialise == true) {
                    setTimeout(function (evt) {
                        return _this3.initialise(_this3.dataObject.oninitialised);
                    }, 0);
                }
            }
        }, {
            key: "initialise",
            value: function initialise(callback) {
                var _this4 = this;

                this.firstinit.addOnce(callback);

                if (this._ready) {
                    this.firstinit.dispatch({ target: this });
                    return;
                }
                if (this.initialising) {
                    return;
                }
                this.initialising = true;
                this._preInit(function (evt) {
                    return _this4.init(function (evt) {
                        return _this4._postInit(function (evt) {
                            _this4._ready = true;
                            _this4.initialising = false;
                            if (_this4.dataObject.autoStart) {
                                _this4.start();
                            }
                            _this4.firstinit.dispatch({ target: _this4 });
                        });
                    });
                });
                return this;
            }
        }, {
            key: "_preInit",
            value: function _preInit(callback) {
                callback();
            }
        }, {
            key: "init",
            value: function init(callback) {
                callback();
            }
        }, {
            key: "_postInit",
            value: function _postInit(callback) {
                callback();
            }
        }, {
            key: "_firstInit",
            value: function _firstInit() {}
        }, {
            key: "_start",
            value: function _start() {}
        }, {
            key: "start",
            value: function start() {}
        }, {
            key: "pause",
            value: function pause() {
                console.log("pause", this);
                if (this._paused) return false;
                this._paused = true;
                this.onpause.dispatch({ target: this });

                return true;
            }
        }, {
            key: "_pause",
            value: function _pause() {}
        }, {
            key: "resume",
            value: function resume() {
                console.log("resume", this);
                if (!this._paused) return false;
                this._paused = false;
                this.onresume.dispatch({ target: this });

                return true;
            }
        }, {
            key: "appFreeze",
            value: function appFreeze() {
                if (this._appFreezed) return;
                this._appFreezed = true;
                console.log("appfreeze", this);
            }
        }, {
            key: "appUnfreeze",
            value: function appUnfreeze() {
                console.log("appUnfreeze", this);
                if (!this._appFreezed) return;
                this._appFreezed = false;
            }
        }, {
            key: "close",
            value: function close() {
                console.log("close", this);
                if (this._closed) return false;
                this._closed = false;
                this.pause();
                this.onclose.dispatch({ target: this });

                return true;
            }
        }, {
            key: "cc",
            value: function cc() {
                var dataObject = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                if (dataObject.isJXComponent) {
                    var _comp = dataObject;
                    if (_comp.parentComponent) {
                        _comp.parentComponent.comps.remove(_comp);
                    }
                    _comp.parentComponent = this;
                    this.comps.add(_comp, _comp.addID);
                    return _comp;
                } else if (this.jx.tools.instanceType(dataObject) == "string") {
                    dataObject = this.jx.db.findOne({ id: dataObject }).data;
                }
                if (this.jx.tools.instanceType(dataObject) == "array") {
                    var comps = [];
                    for (var i = 0; i < dataObject.length; i++) {
                        comps.push(this.cc(dataObject[i]));
                    }
                    return comps;
                }
                dataObject.parentComponent = dataObject.parentComponent || this;
                var comp = this.jx.cc(dataObject);
                this.comps.add(comp, dataObject.addID);
                return comp;
            }
        }, {
            key: "ccid",
            value: function ccid() {
                var dataObject = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                if (dataObject.isJXComponent) {
                    var comp = dataObject;
                    comp.addID == undefined ? true : comp.addID;
                    return this.cc(comp);
                } else if (this.jx.tools.instanceType(dataObject) == "string") {
                    dataObject = this.jx.db.findOne({ id: dataObject }).data;
                }
                if (this.jx.tools.instanceType(dataObject) == "array") {
                    var comps = [];
                    for (var i = 0; i < dataObject.length; i++) {
                        comps.push(this.ccid(dataObject[i]));
                    }
                    return comps;
                }
                dataObject.addID = dataObject.addID == undefined ? true : dataObject.addID;
                return this.cc(dataObject);
            }
        }, {
            key: "addEventDispatcher",
            value: function addEventDispatcher() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                for (var i = 0; i < args.length; i++) {
                    this[args[i]] = new signals.Signal();
                    this._eventsdispatchers.push({ id: args[i], dispatcher: this[args[i]] });
                }
                ;
            }
        }, {
            key: "_removeAllEventDispatchers",
            value: function _removeAllEventDispatchers() {
                for (var i = 0; i < this._eventsdispatchers.length; i++) {
                    this._eventsdispatchers[i].dispatcher.removeAll();
                    if (this[this._eventsdispatchers[i].id]) delete this[this._eventsdispatchers[i].id];
                }
                ;
                this._eventsdispatchers.length = 0;
            }
        }, {
            key: "id",
            get: function get() {
                return this._id;
            },
            set: function set(value) {
                if (this._id && this.parentComponent) {
                    if (this.parentComponent[this._id] === this) {
                        delete this.parentComponent[this._id];
                        this.parentComponent[value] = this;
                    }
                    if (this.parentComponent.comps[this._id] === this) {
                        delete this.parentComponent.comps[this._id];
                        this.parentComponent.comps[value] = this;
                    }
                }
                this._id = value;
            }
        }, {
            key: "ready",
            get: function get() {
                return this._ready;
            }
        }]);

        return Component;
    }(_JXObject3.default);

    exports.default = Component;

    var ComponentsCollection = function () {
        function ComponentsCollection(parentcomp) {
            _classCallCheck(this, ComponentsCollection);

            this.parentcomp = parentcomp;
            this._children = [];
        }

        _createClass(ComponentsCollection, [{
            key: "add",
            value: function add(comp, addID) {
                this._children.push(comp);
                if (comp.id != undefined) {
                    if (addID) {
                        this.parentcomp[comp.id] = comp;
                    }
                    this[comp.id] = comp;
                }
            }
        }, {
            key: "remove",
            value: function remove(comp) {
                var index = this._children.indexOf(comp);
                if (index != -1) {
                    this._children.splice(index, 1);
                    if (comp.id) {
                        if (this.parentcomp[comp.id]) {
                            delete this.parentcomp[comp.id];
                        }
                        if (this[comp.id]) {
                            delete this[comp.id];
                        }
                    }
                }
            }
        }, {
            key: "removeAll",
            value: function removeAll() {
                var _this5 = this;

                this._children.forEach(function (comp, index, arr) {
                    if (comp.id) {
                        if (_this5.parentcomp[comp.id]) {
                            delete _this5.parentcomp[comp.id];
                        }
                        if (_this5[comp.id]) {
                            delete _this5[comp.id];
                        }
                    }
                });
                this._children = [];
            }
        }, {
            key: "kill",
            value: function kill() {
                var _this6 = this;

                var childrenArr = this._children.slice();
                childrenArr.forEach(function (comp, index, arr) {
                    if (comp.id) {
                        if (_this6.parentcomp[comp.id]) {
                            delete _this6.parentcomp[comp.id];
                        }
                        if (_this6[comp.id]) {
                            delete _this6[comp.id];
                        }
                    }
                    comp.kill();
                });
                this._children = [];
            }
        }, {
            key: "getByPath",
            value: function getByPath(path) {
                var pathArr = path.split(".");
                for (var i = 0; i < this._children.length; i++) {
                    if (this._children[i].id == pathArr[0]) {
                        pathArr.shift();
                        if (pathArr.length == 0) {
                            return this._children[i];
                        } else {
                            return this._children[i].comps.getByPath(pathArr.join("."));
                        }
                    }
                    ;
                }
                ;
                return null;
            }
        }, {
            key: "initChildren",
            value: function initChildren(callback) {
                var _this7 = this;

                var itemsToInit = [];
                this.forEach(function (item) {
                    if (!item.ready && item.initialise && item.notInit != true) {
                        itemsToInit.push(item);
                    }
                    ;
                });
                var itemsInitialising = itemsToInit.slice();
                var oninit = function oninit(evt) {
                    itemsInitialising.splice(itemsInitialising.indexOf(evt.target), 1);

                    if (itemsInitialising.length == 0) {
                        callback({ target: _this7 });
                    }
                    ;
                };
                if (itemsToInit.length == 0) {
                    callback({ target: this });
                    return;
                }
                for (var i = 0; i < itemsToInit.length; i++) {
                    itemsToInit[i].initialise(oninit);
                }
            }
        }, {
            key: "forEach",
            value: function forEach(func) {
                this._children.forEach(function (item, index, arr) {
                    func(item, index);
                });
            }
        }, {
            key: "array",
            get: function get() {
                return this._children;
            }
        }]);

        return ComponentsCollection;
    }();
});
//# sourceMappingURL=Component.js.map