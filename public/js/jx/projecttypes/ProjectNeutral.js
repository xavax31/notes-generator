define(["exports", "jx/projecttypes/ApplicationHTML5Base", "jx/projecttypes/editorformattype2/Importer", "jx/projecttypes/editorformattype2/Exporter"], function (exports, _ApplicationHTML5Base2, _Importer, _Exporter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ApplicationHTML5Base3 = _interopRequireDefault(_ApplicationHTML5Base2);

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

    var ApplicationHTML5 = function (_ApplicationHTML5Base) {
        _inherits(ApplicationHTML5, _ApplicationHTML5Base);

        function ApplicationHTML5(dataObject) {
            _classCallCheck(this, ApplicationHTML5);

            return _possibleConstructorReturn(this, (ApplicationHTML5.__proto__ || Object.getPrototypeOf(ApplicationHTML5)).call(this, dataObject));
        }

        _createClass(ApplicationHTML5, [{
            key: "_create",
            value: function _create() {
                console.log("ApplicationHTML5 create");
                _get(ApplicationHTML5.prototype.__proto__ || Object.getPrototypeOf(ApplicationHTML5.prototype), "_create", this).call(this);
                this.importer = new _Importer2.default(this.jx, this.info);
                this.exporter = new _Exporter2.default(this.jx, { projectInfo: this.info });
            }
        }]);

        return ApplicationHTML5;
    }(_ApplicationHTML5Base3.default);

    exports.default = ApplicationHTML5;
});
//# sourceMappingURL=ProjectNeutral.js.map