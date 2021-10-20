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

    var Module = function (_Component) {
        _inherits(Module, _Component);

        function Module(dataObject) {
            _classCallCheck(this, Module);

            var _this = _possibleConstructorReturn(this, (Module.__proto__ || Object.getPrototypeOf(Module)).call(this, dataObject));

            _this.resourceClassesArray = dataObject.resourceClassesArray;
            _this.modules = new Array();
            _this.onInitialised = dataObject.onInitialised;

            var typeID = "SimpleJSON";
            _this.jx.db.importConfig(typeID, function (importData) {
                _this.importData = importData;
                _this._prepareModule();
            });
            return _this;
        }

        _createClass(Module, [{
            key: "_prepareModule",
            value: function _prepareModule() {
                var _this2 = this;

                console.log("prepare", this.importData.projectInformations);
                this.jx.config.setProjectInfo(this.importData.projectInformations);

                for (var i = 0; i < this.importData.resources.length; i++) {
                    if (this.importData.resources[i].id == "Langues") {
                        var lang = this.importData.resources[i];
                        var langs = lang.value.split(",");
                        for (var i = 0; i < langs.length; i++) {
                            langs[i] = langs[i].trim();
                        }
                        ;
                        if (langs.length > 0) {
                            this.jx.config.langs = langs;
                            this.jx.config.lang = langs[0];
                        }
                        ;
                        break;
                    }
                }
                ;
                console.log(langs);

                this.jx.db.addResources(this.importData.resources.concat(this.resourceClassesArray));
                this.jx.memo.addMemo({ id: "global" });
                this.jx.memo.addMemo({ id: "cookie", type: "Cookie", autosave: true });
                this.jx.debug.init();

                this.jx.db.load({ "type": "class" }, function () {
                    _this2.jx.db.load({ "preload": true }, function () {
                        _this2._init();
                    });
                });
            }
        }, {
            key: "init",
            value: function init(callback) {
                var _this3 = this;

                this.jx.config.init();
                this.init({ onInitialised: function onInitialised() {
                        _this3.start({ onStarted: function onStarted() {
                                _this3.onInitialised(_this3);
                            } });
                    } });
            }
        }]);

        return Module;
    }(_Component3.default);

    exports.default = Module;
});
//# sourceMappingURL=Module.js.map