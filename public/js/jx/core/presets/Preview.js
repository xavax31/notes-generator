define(["exports", "jx/core/presets/StageGameModule"], function (exports, _StageGameModule) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _StageGameModule2 = _interopRequireDefault(_StageGameModule);

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

    var MainCtrl = function (_ModuleType) {
        _inherits(MainCtrl, _ModuleType);

        function MainCtrl(dataObject) {
            _classCallCheck(this, MainCtrl);

            return _possibleConstructorReturn(this, (MainCtrl.__proto__ || Object.getPrototypeOf(MainCtrl)).call(this, dataObject));
        }

        _createClass(MainCtrl, [{
            key: "init",
            value: function init(callback) {
                this.screen = this.cc({ rid: this.jx.config.urlParams.rid });
                this.comps.initChildren(callback);
            }
        }, {
            key: "start",
            value: function start() {
                this.jx.log("> START", this);
                this.jx.log(this.jx.config);
                this.stage.addChild(this.screen);
                this.logDisplayList(this.stage);
            }
        }, {
            key: "logDisplayList",
            value: function logDisplayList(comp) {
                for (var i = 0; i < comp.children.length; i++) {
                    console.log(comp.children[i].id, comp.children[i].type);
                    if (comp.children[i].children) {
                        this.logDisplayList(comp.children[i]);
                    }
                }
                ;
            }
        }]);

        return MainCtrl;
    }(_StageGameModule2.default);

    exports.default = MainCtrl;
});
//# sourceMappingURL=Preview.js.map