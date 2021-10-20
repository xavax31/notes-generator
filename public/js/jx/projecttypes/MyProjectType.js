define(["exports", "jx/projecttypes/ProjectManager", "jx/projecttypes/editorformattype2/Importer", "jx/projecttypes/editorformattype2/Exporter"], function (exports, _ProjectManager2, _Importer, _Exporter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ProjectManager3 = _interopRequireDefault(_ProjectManager2);

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

    var MyProjectType = function (_ProjectManager) {
        _inherits(MyProjectType, _ProjectManager);

        function MyProjectType(dataObject) {
            _classCallCheck(this, MyProjectType);

            var _this = _possibleConstructorReturn(this, (MyProjectType.__proto__ || Object.getPrototypeOf(MyProjectType)).call(this, Object.assign({
                url: null
            }, dataObject)));

            _this.info.url = _this.dataObject.url;
            _this.importer = new _Importer2.default(_this.jx, _this.info);
            _this.exporter = new _Exporter2.default(_this.jx, { projectInfo: _this.info });
            return _this;
        }

        _createClass(MyProjectType, [{
            key: "load",
            value: function load(onFinished) {
                var _this2 = this;

                this.importer.importConfig(function (projectData) {
                    console.log("config imported", _this2);
                    _this2.json = _this2.importer.json;
                    _this2.jx.tools.mergeObjectIn(_this2.info, projectData.projectInformations.project);
                    _this2.info.engine = projectData.projectInformations.engine;
                    _this2.info.gabarit = projectData.modules[0].gabarit;
                    onFinished({ target: _this2 });
                });
            }
        }, {
            key: "save",
            value: function save(onFinished) {
                this.exporter.exportConfig(onFinished);
            }
        }, {
            key: "getJSON",
            value: function getJSON() {
                return this.json;
            }
        }, {
            key: "preview",
            value: function preview() {
                var rid = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                alert("preview");
            }
        }]);

        return MyProjectType;
    }(_ProjectManager3.default);

    exports.default = MyProjectType;
});
//# sourceMappingURL=MyProjectType.js.map