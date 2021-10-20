define(["exports", "jx/projecttypes/ApplicationBabelHTML5Base", "jx/projecttypes/editorformattype2/Importer", "jx/projecttypes/editorformattype2/Exporter"], function (exports, _ApplicationBabelHTML5Base, _Importer, _Exporter) {
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

    var ApplicationBabelHTML5 = function (_ApplicationBabelHTML) {
        _inherits(ApplicationBabelHTML5, _ApplicationBabelHTML);

        function ApplicationBabelHTML5(dataObject) {
            _classCallCheck(this, ApplicationBabelHTML5);

            return _possibleConstructorReturn(this, (ApplicationBabelHTML5.__proto__ || Object.getPrototypeOf(ApplicationBabelHTML5)).call(this, dataObject));
        }

        _createClass(ApplicationBabelHTML5, [{
            key: "_create",
            value: function _create() {
                console.log("ApplicationBabelHTML5 create");
                _get(ApplicationBabelHTML5.prototype.__proto__ || Object.getPrototypeOf(ApplicationBabelHTML5.prototype), "_create", this).call(this);
                this.importer = new _Importer2.default(this.jx, this.info);
                this.exporter = new _Exporter2.default(this.jx, { projectInfo: this.info });
            }
        }, {
            key: "compareJSON",
            value: function compareJSON() {
                var _this2 = this;

                var infos = { url: this.info.url, configPath: this.info.url + "/etc/editor/editor_server.json" };
                var json1Importer = new _Importer2.default(this.jx, infos);
                json1Importer.importConfig(function (projectData) {
                    console.log("config imported", _this2);
                    _this2.jx.tools.mergeObjectIn(infos, projectData.projectInformations.project);
                    infos.engine = projectData.projectInformations.engine;
                    infos.gabarit = projectData.modules[0].gabarit;
                    _this2.results = [];
                    _this2._compareGabarits(infos.gabarit, _this2.info.gabarit);
                    console.log(_this2.results);
                });
            }
        }, {
            key: "_compareGabarits",
            value: function _compareGabarits(gabarit1, gabarit2) {
                console.log("_compareGabarits");

                for (var i = 0; i < gabarit1.length; i++) {
                    if (true) {}
                    ;
                    var g2 = this.getInGabarit({ id: gabarit1[i].id, gabarit: gabarit2 });
                    console.log(gabarit1[i].id, g2, gabarit1[i]);
                    console.log(g2 == gabarit1[i]);
                    if (gabarit1[i].timestamp) {
                        console.info(gabarit1[i].id, ":", gabarit1[i].timestamp - g2.timestamp);
                        if (gabarit1[i].timestamp - g2.timestamp != 0) {
                            this.results.push({ id: gabarit1[i].id, time: gabarit1[i].timestamp - g2.timestamp, g1: gabarit1[i].value, g2: g2.value });
                        }
                        ;
                    }
                    ;
                    if (gabarit1[i].children) {
                        this._compareGabarits(gabarit1[i].children, g2.children);
                    }
                    ;
                }
                ;
            }
        }]);

        return ApplicationBabelHTML5;
    }(_ApplicationBabelHTML5Base2.default);

    exports.default = ApplicationBabelHTML5;
});
//# sourceMappingURL=ApplicationBabelHTML5.js.map