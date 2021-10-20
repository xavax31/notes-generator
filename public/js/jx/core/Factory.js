define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var shortcuts = {
        Visual: "VisualComponent"
    };

    var Factory = function () {
        function Factory(jx) {
            _classCallCheck(this, Factory);

            this.jx = jx;
            this._uniqID = 0;
            this.defaultComponents = {
                "image": "Image",
                "video": "Video",
                "imagesequence": "ImageSequence",
                "text": "Text",
                "flashtml": "Clip"
            };
        }

        _createClass(Factory, [{
            key: "kill",
            value: function kill() {
                if (this._killed) return;
                this._killed = true;
                this.jx = null;
            }
        }, {
            key: "createComp",
            value: function createComp() {
                var dataObject = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

                dataObject.parentComponent = dataObject.parentComponent || null;
                if (dataObject.isJXComponent) {
                    return dataObject;
                } else if (this.jx.tools.instanceType(dataObject) == "string") {
                    dataObject = this.jx.db.findOne({ id: dataObject }).data;
                }
                if (this.jx.tools.instanceType(dataObject) == "array") {
                    var comps = [];
                    for (var i = 0; i < dataObject.length; i++) {
                        comps.push(this.createComp(dataObject[i]));
                    }
                    ;
                    return comps;
                }
                dataObject = Object.assign({}, dataObject);
                dataObject = this._deductComponentTypeToUse(dataObject);
                var componentClass = this._getClassComponentToUse(dataObject);

                dataObject.jx = this.jx;
                dataObject.id = dataObject.id || (typeof dataObject.type == "string" ? dataObject.type : "Component") + ++this._uniqID;

                window["jx"]._lastJX = this.jx;
                window["jx"]._lastRender = dataObject.render;
                var comp = new componentClass(dataObject);
                return comp;
            }
        }, {
            key: "_deductComponentTypeToUse",
            value: function _deductComponentTypeToUse(dataObject) {
                dataObject.type = dataObject.type || "auto";
                dataObject.type = shortcuts[dataObject.type] || dataObject.type;
                if (dataObject.resourceID || dataObject.rid) dataObject.resourceID = dataObject.resourceID || dataObject.rid;
                delete dataObject.rid;
                if (dataObject.type == "auto" && dataObject.resourceID == undefined) {
                    dataObject.type = "Component";
                } else {
                    if (dataObject.type == "auto" || dataObject.type == "VisualComponent" || dataObject.type == "Animation") {
                        var resource = this.jx.db.findOne({ id: dataObject.resourceID });
                        if (resource != null) {
                            dataObject.type = resource.compType || this.defaultComponents[resource.type] || resource.type;
                            if (resource.data != null) {
                                if (dataObject.type.toLowerCase() == "dataobject" || dataObject.type == "FlashtmlPack" || dataObject.type == "FlashtmlResource") {
                                    var res2 = this.jx.db.findOne({ id: resource.data.resourceID });
                                    dataObject.type = this.defaultComponents[res2.type] || res2.type;
                                    dataObject = this.jx.tools.mergeObject(dataObject, resource.data);
                                }
                                ;
                            }
                            ;
                        } else {
                            this.jx.debug.error("Component type not defined in createComp", dataObject, resource);
                            return;
                        }
                    }
                }
                return dataObject;
            }
        }, {
            key: "_getClassComponentToUse",
            value: function _getClassComponentToUse(dataObject) {
                var componentClass = void 0;

                switch (jx.tools.instanceType(dataObject.type)) {
                    case "string":
                        dataObject.render = this.jx.config.app.defaultRenderers[dataObject.type.toLowerCase()] || dataObject.render || (dataObject.parentComponent ? dataObject.parentComponent.render : false) || this.jx.config.app.defaultViewType;

                        var className = dataObject.type + dataObject.render;

                        componentClass = this.jx.comp[className] || this.jx.comp[dataObject.type];
                        break;
                    default:
                        componentClass = dataObject.type;
                        break;
                }
                if (componentClass == null) {
                    console.warn("Component type not exists", dataObject);
                }
                return componentClass;
            }
        }]);

        return Factory;
    }();

    exports.default = Factory;
});
//# sourceMappingURL=Factory.js.map