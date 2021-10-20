define(["exports", "jx/projecttypes/ApplicationMinimalBase", "jx/projecttypes/editorformattype2/Importer", "jx/projecttypes/editorformattype2/Exporter"], function (exports, _ApplicationMinimalBase, _Importer, _Exporter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ApplicationMinimalBase2 = _interopRequireDefault(_ApplicationMinimalBase);

    var _Importer2 = _interopRequireDefault(_Importer);

    var _Exporter2 = _interopRequireDefault(_Exporter);

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

    var ApplicationMinimal = function (_ApplicationMinimalBa) {
        _inherits(ApplicationMinimal, _ApplicationMinimalBa);

        function ApplicationMinimal(dataObject) {
            _classCallCheck(this, ApplicationMinimal);

            return _possibleConstructorReturn(this, (ApplicationMinimal.__proto__ || Object.getPrototypeOf(ApplicationMinimal)).call(this, dataObject));
        }

        _createClass(ApplicationMinimal, [{
            key: "_create",
            value: function _create() {
                console.log("ApplicationMinimal create");
                _get(ApplicationMinimal.prototype.__proto__ || Object.getPrototypeOf(ApplicationMinimal.prototype), "_create", this).call(this);
                this.info.assetsDir = "build/assets";
                this.importer = new _Importer2.default(this.jx, this.info);
                this.exporter = new _Exporter2.default(this.jx, { projectInfo: this.info });
                this.exporter.config.exportFile = "config.json";
            }
        }]);

        return ApplicationMinimal;
    }(_ApplicationMinimalBase2.default);

    exports.default = ApplicationMinimal;
});
//# sourceMappingURL=ApplicationMinimal.js.map