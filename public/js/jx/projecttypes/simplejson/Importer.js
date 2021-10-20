define(["exports", "jx/core/JXObject", "jx/core/Resource", "jx/core/utils/Tools", "jx/core/dataobjects/ImportData"], function (exports, _JXObject2, _Resource, _Tools, _ImportData) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

    var _Resource2 = _interopRequireDefault(_Resource);

    var _Tools2 = _interopRequireDefault(_Tools);

    var _ImportData2 = _interopRequireDefault(_ImportData);

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

            _this.importData = new _ImportData2.default();
            _this.moduleData = null;
            _this.overrideConfig = window["overrideJXConfig"] || {};
            _this.configURL = _this.overrideConfig.configURL || "assets/config.json";
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
                this.json = null;
                this.jsonUrl = window.location.href.substr(0, location.href.lastIndexOf("/") + 1) + "" + this.configURL;
                this.jx.db.addResources({ id: 'configJSON', type: "json", src: this.jsonUrl });
                this.jx.db.load({ id: 'configJSON' }, $.proxy(this._jsonLoaded, this));
            }
        }, {
            key: "_jsonLoaded",
            value: function _jsonLoaded(Event) {
                var jsonResource = this.jx.db.findOne({ id: 'configJSON' });
                if (!jsonResource) {
                    console.log(this.jx.debug.fatal("No Data File"));
                }
                this.json = jsonResource.data;

                var formatJSON = jsonResource.data.formatJSON || "SimpleJSON1";
                this["_jsonAnalyse_" + formatJSON]();
            }
        }, {
            key: "_jsonAnalyse_SimpleJSON1",
            value: function _jsonAnalyse_SimpleJSON1() {
                _Tools2.default.mergeObject(this.json, { ProjectInformations: { status: "closed" } });
                this.importData.modulePath = this._getEntryPointPath();
                this.moduleData = this.json["entry-point"][this.importData.modulePath];
                this.importData.projectInformations = this.json["ProjectInformations"];
                this.importData.projectInformations = _Tools2.default.mergeObject(this.importData.projectInformations, this.overrideConfig);
                this.importData.resources = this._getResources();
                this._finish();
            }
        }, {
            key: "_getResources",
            value: function _getResources() {
                var resourceInfos = this.moduleData["resources"];
                var resourceArray = [];
                for (var i = 0; i < resourceInfos.length; i++) {
                    var resourceInfo = resourceInfos[i];
                    var resource = new _Resource2.default(resourceInfo);
                    resourceArray.push(resource);
                }
                return resourceArray;
            }
        }, {
            key: "_getEntryPointPath",
            value: function _getEntryPointPath() {
                for (var modulejsonName in this.json["entry-point"]) {
                    return modulejsonName;
                    break;
                }
            }
        }, {
            key: "_jsonAnalyse_SimpleJSON2",
            value: function _jsonAnalyse_SimpleJSON2() {
                var projectData = this.json["projectData"];
                this.importData.resources = [];
                for (var i = 0; i < projectData.length; i++) {
                    if (projectData[i].id == "Informations") {
                        this.importData.projectInformations = projectData[i].value;
                    } else {
                        this.importData.resources.push(projectData[i]);
                    }
                }
                ;
                this._finish();
            }
        }, {
            key: "_finish",
            value: function _finish() {
                this._destroy();

                this.onFinished(this.importData);
            }
        }, {
            key: "_destroy",
            value: function _destroy() {
                this.jx.db.removeResources({ id: 'configJSON' });
            }
        }]);

        return Importer;
    }(_JXObject3.default);

    exports.default = Importer;
});
//# sourceMappingURL=Importer.js.map