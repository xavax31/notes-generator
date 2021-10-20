define(["exports", "jx/core/presets/Module"], function (exports, _Module) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Module2 = _interopRequireDefault(_Module);

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

    var jx = void 0;

    var MainCtrl = function (_ModuleType) {
        _inherits(MainCtrl, _ModuleType);

        function MainCtrl(dataObject) {
            _classCallCheck(this, MainCtrl);

            var _this = _possibleConstructorReturn(this, (MainCtrl.__proto__ || Object.getPrototypeOf(MainCtrl)).call(this, dataObject));

            jx = _this.jx;
            return _this;
        }

        _createClass(MainCtrl, [{
            key: "init",
            value: function init(_ref) {
                var onInitialised = _ref.onInitialised;

                onInitialised();
            }
        }, {
            key: "_showAssetById",
            value: function _showAssetById() {
                var _this2 = this;

                var resource = {
                    id: this.getURLParameter("id"),
                    type: this.getURLParameter("type"),
                    src: decodeURIComponent(this.getURLParameter("src")),
                    preload: true
                };
                console.log(resource.type);
                switch (resource.type) {
                    case "ImageSequence":
                        resource.start = this.getURLParameter("start");
                        resource.end = this.getURLParameter("end");
                        break;
                    case "Video":
                    case "Flashtml":
                        break;
                    default:
                        alert("media not supported : " + resource.type);
                        break;
                }
                console.log(resource);
                this.jx.db.addResources(resource);
                console.log(this.jx.db.log());
                this.jx.db.load({ preload: true }, function () {
                    switch (resource.type) {
                        case "ImageSequence":
                            _this2.view = _this2.cc({ type: "StageView" });
                            var image = _this2.cc({ type: "Image", x: 0, y: 0, resourceID: "Background" });
                            _this2.view.addChild(image);
                            var imagesequenceCreateJS = _this2.cc({ type: "ImageSequence", x: 0, y: 0, resourceID: resource.id });
                            _this2.view.addChild(imagesequenceCreateJS);
                            break;
                        case "Flashtml":
                            var comp = _this2.cc({ resourceID: resource.id });
                            comp.initialise(function (evt) {
                                _this2.view.addChild(comp);
                            });
                            break;
                        default:
                            alert("media not supported");
                            break;
                    }
                });
            }
        }, {
            key: "_showAssetFromData",
            value: function _showAssetFromData() {
                var _this3 = this;

                var data = JSON.parse(decodeURIComponent(this.getURLParameter("data")));
                console.log(data);
                var projectURL = data.projectURL + "/public";
                var projectJSON = projectURL + "/assets/config.json";
                console.log(projectJSON);
                this.jx.db.addResources({ id: "config2", type: "json", src: projectJSON });
                this.jx.db.load({ id: "config2" }, function () {
                    var configJSON = _this3.jx.db.findOne({ id: "config2" }).data;
                    var entryPoint = configJSON["entry-point"];
                    var infos = configJSON.projectInformations;
                    var configResources = entryPoint.src.resources;
                    var ratio;
                    for (var i = 0; i < configResources.length; i++) {
                        if (configResources[i].id == "ScreenRatio") {
                            var ratioArray = configResources[i].value.split("/");
                            ratio = Number(ratioArray[0]) / Number(ratioArray[1]);
                        }
                    }
                    ;

                    _this3.jx.db.addResources(configResources, projectURL);
                    _this3.jx.db.load({ preload: true }, function () {
                        _this3.view = _this3.cc({ type: "StageView", ratio: ratio || _this3.jx.config.app.ratio });

                        console.log(data.item, _this3.jx.db.findOne({ id: data.item.id, type: data.item.type }));
                        var dataItem = _this3.jx.db.findOne({ id: data.item.id, type: data.item.type }).data;
                        console.log(dataItem);
                        var screen1 = _this3.cc({ rid: data.item.id });
                        screen1.initialise(function (evt) {
                            screen1.ratioWidth = _this3.view.width;
                            ;
                            _this3.view.addChild(screen1);
                        });
                    });
                });
            }
        }, {
            key: "start",
            value: function start(_ref2) {
                var onStarted = _ref2.onStarted;

                onStarted();
                if (this.getURLParameter("id") != undefined) {
                    this._showAssetById();
                } else if (this.getURLParameter("data") != undefined) {
                    this._showAssetFromData();
                }
                return;
                var sound = this.jx.db.findOne({ id: "MUSIC" }).data;
                sound.play();

                var image = this.cc({ type: "Image", id: "SPLASHSCREEN", resourceID: "SPLASHSCREEN" });
                image.click.add(function (event) {
                    console.log("Click", event.target.id, event.target);
                });
                this.view.addChild(image);
                var imagesequenceCreateJS = this.cc({ type: "ImageSequence", x: 0, y: 0, resourceID: "TigerSequence" });
                this.view.addChild(imagesequenceCreateJS);
            }
        }, {
            key: "getURLParameter",
            value: function getURLParameter(sParam) {
                var sPageURL = window.location.search.substring(1);
                var sURLVariables = sPageURL.split('&');
                for (var i = 0; i < sURLVariables.length; i++) {
                    var sParameterName = sURLVariables[i].split('=');
                    if (sParameterName[0] == sParam) {
                        return sParameterName[1];
                    }
                }
            }
        }, {
            key: "onResize",
            value: function onResize(event) {
                this.view.onResize();
            }
        }]);

        return MainCtrl;
    }(_Module2.default);

    exports.default = MainCtrl;
});
//# sourceMappingURL=Preview.js.map