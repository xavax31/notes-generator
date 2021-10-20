define(["exports", "jx/core/JXObject", "jx/core/Resource", "jx/core/dataobjects/ProjectData", "jx/core/dataobjects/ModuleData"], function (exports, _JXObject2, _Resource, _ProjectData, _ModuleData) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

    var _Resource2 = _interopRequireDefault(_Resource);

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

        function Importer(inputParams) {
            _classCallCheck(this, Importer);

            var _this = _possibleConstructorReturn(this, (Importer.__proto__ || Object.getPrototypeOf(Importer)).call(this));

            _this.inputParams = inputParams;
            _this.projectData = new _ProjectData2.default();
            _this.projectData.url = _this.inputParams.url;
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
                this.configURL = this.projectData.url + "/etc/editor/editor.json";
                this.jsonUrl = this.configURL;
                this.jx.db.addResources({ id: 'configJSON', type: "json", src: this.jsonUrl });
                this.jx.db.load({ id: 'configJSON' }, $.proxy(this._jsonLoaded, this));
            }
        }, {
            key: "_jsonLoaded",
            value: function _jsonLoaded(Event) {
                var _this2 = this;

                var jsonResource = this.jx.db.findOne({ id: 'configJSON' });
                console.log("loadJSON loaded", jsonResource.data);
                if (!jsonResource) {
                    console.log(this.jx.debug.fatal("No Data File"));
                }
                this.json = jsonResource.data;
                this.moduleJSON = this.json["entry-point"][this._getEntryPointPath()];
                var moduleData = new _ModuleData2.default();
                moduleData.srcPath = this._getEntryPointPath();
                moduleData.resources = this._getResources();
                moduleData.styles = this._getStyles();
                moduleData.gabarit = this._getGabarit();
                this.projectData.modules.push(moduleData);
                this.projectData.projectInformations = this.json["ProjectInformations"];

                this.jx.db.importClass([moduleData.srcPath + "/index"], function (Module) {
                    moduleData.moduleClass = Module;
                    _this2._finish();
                });
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
        }, {
            key: "_getResources",
            value: function _getResources() {
                var resourceInfos = this.moduleJSON["resources"];
                var resourceArray = [];
                for (var i = 0; i < resourceInfos.length; i++) {
                    var resourceInfo = resourceInfos[i];
                    var resource = new _Resource2.default(resourceInfo);
                    resourceArray.push(resource);
                }
                return resourceArray;
            }
        }, {
            key: "_getStyles",
            value: function _getStyles() {
                return this.moduleJSON["styles"] || [];
            }
        }, {
            key: "_getGabarit",
            value: function _getGabarit() {
                return this.moduleJSON["gabarit"] || [];
            }
        }, {
            key: "_getEntryPointPath",
            value: function _getEntryPointPath() {
                for (var modulejsonName in this.json["entry-point"]) {
                    return modulejsonName;
                    break;
                }
            }
        }]);

        return Importer;
    }(_JXObject3.default);

    exports.default = Importer;
});
//# sourceMappingURL=Importer.js.map