define(["exports", "jx/projecttypes/ApplicationBabelHTML5Base", "jx/projecttypes/editorformattype1/Importer", "jx/projecttypes/editorformattype1/Exporter"], function (exports, _ApplicationBabelHTML5Base, _Importer, _Exporter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ApplicationBabelHTML5Base2 = _interopRequireDefault(_ApplicationBabelHTML5Base);

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

    var ProjectType1 = function (_ApplicationBabelHTML) {
        _inherits(ProjectType1, _ApplicationBabelHTML);

        function ProjectType1(dataObject) {
            _classCallCheck(this, ProjectType1);

            return _possibleConstructorReturn(this, (ProjectType1.__proto__ || Object.getPrototypeOf(ProjectType1)).call(this, dataObject));
        }

        _createClass(ProjectType1, [{
            key: "_create",
            value: function _create() {
                _get(ProjectType1.prototype.__proto__ || Object.getPrototypeOf(ProjectType1.prototype), "_create", this).call(this);
                this.importer = new _Importer2.default(this.jx, this.info);
                this.exporter = new _Exporter2.default(this.jx, { projectInfo: this.info });
            }
        }, {
            key: "preview",
            value: function preview() {
                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                this.jx.tools.openURL(this.info.url + "/public" + (rid ? "/?rid=" + rid : ""), rid || this.info.id);
            }
        }]);

        return ProjectType1;
    }(_ApplicationBabelHTML5Base2.default);

    exports.default = ProjectType1;
});
//# sourceMappingURL=ProjectType1.js.map