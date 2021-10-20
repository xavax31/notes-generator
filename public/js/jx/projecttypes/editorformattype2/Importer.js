define(["exports", "jx/core/JXObject", "jx/core/dataobjects/ProjectData", "jx/core/dataobjects/ModuleData"], function (exports, _JXObject2, _ProjectData, _ModuleData) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

    var _ProjectData2 = _interopRequireDefault(_ProjectData);

    var _ModuleData2 = _interopRequireDefault(_ModuleData);

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

    var Importer = function (_JXObject) {
        _inherits(Importer, _JXObject);

        function Importer(jx, dataObject) {
            _classCallCheck(this, Importer);

            var _this = _possibleConstructorReturn(this, (Importer.__proto__ || Object.getPrototypeOf(Importer)).call(this, { jx: jx }));

            _this.dataObject = Object.assign({
                url: null,
                projectJXData: null
            }, dataObject);
            _this.projectData = new _ProjectData2.default();
            _this.projectData.url = _this.dataObject.url;
            _this.projectData.configPath = _this.dataObject.configPath || _this.dataObject.url + "/etc/editor/editor.json";
            return _this;
        }

        _createClass(Importer, [{
            key: "importConfig",
            value: function importConfig(onFinished) {
                this.onFinished = onFinished;
                this._loadJson();
            }
        }, {
            key: "_loadJson",
            value: function _loadJson() {
                var _this2 = this;

                this.jx.db.addResources({ id: this.projectData.configPath, type: "json", src: this.projectData.configPath });
                this.jx.db.load({ id: this.projectData.configPath }, function (evt) {
                    var jsonResource = _this2.jx.db.findOne({ id: _this2.projectData.configPath });
                    if (!jsonResource || !jsonResource.data) {
                        _this2.jx.debug.warn("editor.json doesn't exist or is broken");
                        _this2.jx.editor.popup({ title: "Error", content: "editor.json doesn't exist or is broken" });
                        return;
                    }
                    _this2.projectData.gabaritJSON = jsonResource.data;
                    _this2._jsonAnalyse();
                }, {
                    reload: true
                });
            }
        }, {
            key: "_jsonAnalyse",
            value: function _jsonAnalyse() {
                var projectDataJSON = this.projectData.gabaritJSON["projectData"];

                for (var i = 0; i < projectDataJSON.length; i++) {
                    if (projectDataJSON[i].id == "Informations") {
                        var projectInfosChildren = projectDataJSON[i].children;
                        break;
                    }
                }
                ;
                var projectInfos = {};
                for (var i = 0; i < projectInfosChildren.length; i++) {
                    projectInfos[projectInfosChildren[i].id] = projectInfosChildren[i].value;
                }
                ;
                this.projectData.projectInformations = projectInfos;
                this.projectData.projectInformations.project.configPath = this.projectData.configPath;
                var moduleData = new _ModuleData2.default();

                moduleData.gabarit = projectDataJSON;

                this.projectData.modules.length = 0;
                this.projectData.modules.push(moduleData);
                this._finish();
            }
        }, {
            key: "_finish",
            value: function _finish() {
                this._destroy();
                this.onFinished(this.projectData);
            }
        }, {
            key: "_destroy",
            value: function _destroy() {}
        }]);

        return Importer;
    }(_JXObject3.default);

    exports.default = Importer;
});
//# sourceMappingURL=Importer.js.map