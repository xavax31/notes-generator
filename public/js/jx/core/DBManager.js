define(["exports", "jx/core/Resource", "jx/core/BatchLoader"], function (exports, _Resource, _BatchLoader) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Resource2 = _interopRequireDefault(_Resource);

    var _BatchLoader2 = _interopRequireDefault(_BatchLoader);

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

    var ItemShorcutsNames = {
        "Number": "NumberItem",
        "Sound": "SoundItem",
        "Image": "ImageItem",
        "Boolean": "BooleanItem",
        "Flashtml": "FlashtmlItem",
        "FlashtmlPack": "FlashtmlPackItem",
        "ImageSequence": "ImageSequenceItem",
        "FLA": "FLAItem",
        "Video": "VideoItem",
        "SpriteSheet": "SpriteSheetItem",
        "class": "ClassFile",
        "QuizManager": "QuizManagerItem",
        "QuizData": "QuizDataItem",
        "QuizTheme": "QuizThemeItem"
    };

    var DBManager = function () {
        function DBManager(jx) {
            _classCallCheck(this, DBManager);

            this.jx = jx;
            this.resourceDB = {};
            this.batchLoadersInfoArray = [];
        }

        _createClass(DBManager, [{
            key: "kill",
            value: function kill() {
                if (!this.jx) return;
                this.removeResources();
                this.jx = null;
            }
        }, {
            key: "addResources",
            value: function addResources(resourceInfo) {
                var rootPath = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                var resourceInfos = this.jx.tools.makeArrayIfSingleObject(resourceInfo);
                var addedResources = [];

                for (var i = 0; i < resourceInfos.length; i++) {
                    var resourceInfo = resourceInfos[i];

                    if (resourceInfo.type == "package") {
                        for (var ipack = 0; ipack < resourceInfo.itemsID.length; ipack++) {
                            resourceInfo.packageID = resourceInfo.packageID || "";
                            var id = resourceInfo.packageID !== "" ? resourceInfo.packageID + "." + resourceInfo.itemsID[ipack] : resourceInfo.itemsID[ipack];
                            var resourceChildInfo = {
                                type: resourceInfo.itemsType,
                                preload: resourceInfo.preload,
                                id: id,
                                src: resourceInfo.path + "/" + resourceInfo.itemsID[ipack]
                            };
                            var resource = new _Resource2.default(resourceChildInfo);
                            this.resourceDB[resource.id] = this.resourceDB[resource.id] || resource;
                            addedResources.push(this.resourceDB[resource.id]);
                        }
                        ;
                    } else if (resourceInfo.type != "ImageSequence" && resourceInfo.start != undefined && resourceInfo.end != undefined) {
                            for (var j = resourceInfo.start; j <= resourceInfo.end; j++) {
                                var resourceChildInfo = {
                                    type: resourceInfo.type,
                                    preload: resourceInfo.preload,
                                    id: this.jx.tools.str.replaceChar({ string: resourceInfo.id, index: j, numberChar: "#", letterChar: "£", mode: "uppercase", a: 0 }),
                                    src: this.jx.tools.str.replaceChar({ string: resourceInfo.src, index: j, numberChar: "#", letterChar: "£", mode: "uppercase", a: 0 })
                                };
                                addedResources = addedResources.concat(this.addResources([resourceChildInfo], rootPath));
                            }
                        } else {
                                if (resourceInfo.value != resourceInfo.data) {
                                    resourceInfo.data = resourceInfo.value;
                                }
                                ;

                                if (resourceInfo.src && rootPath) {
                                    if (resourceInfo.type.toLowerCase() == "class" && resourceInfo.src.search("^src") != -1) {
                                        resourceInfo.src = rootPath + "/js/" + resourceInfo.src + ".js";
                                    } else {
                                        resourceInfo.src = rootPath + "/" + resourceInfo.src;
                                    }
                                }

                                if (resourceInfo.type == "Sound") {
                                    var isMultiLang = resourceInfo.src.search(/\$\{lang\}/) != -1;

                                    for (var j = 0; j < this.jx.config.langs.length; j++) {
                                        var resourceLang = Object.assign({}, resourceInfo);

                                        resourceLang.id = resourceLang.id + "_" + this.jx.config.langs[j];
                                        resourceLang.lang = this.jx.config.langs[j];

                                        resourceLang.src = resourceLang.src.replace("${lang}", this.jx.config.langs[j]);
                                        resourceLang.preload = !isMultiLang || this.jx.config.lang == this.jx.config.langs[j] ? resourceLang.preload : false;

                                        var resource = new _Resource2.default(resourceLang);
                                        this.resourceDB[resource.id] = this.resourceDB[resource.id] || resource;
                                        addedResources.push(this.resourceDB[resource.id]);
                                        if (!isMultiLang) break;
                                    }

                                    resourceInfo.isMultiLang = true;
                                    resourceInfo.preload = false;
                                    var resourceOri = new _Resource2.default(resourceInfo);
                                    this.resourceDB[resourceOri.id] = this.resourceDB[resourceOri.id] || resourceOri;
                                    addedResources.push(this.resourceDB[resourceOri.id]);
                                } else {
                                    var resource = new _Resource2.default(resourceInfo);
                                    this.resourceDB[resource.id] = this.resourceDB[resource.id] || resource;
                                    addedResources.push(this.resourceDB[resource.id]);
                                }
                            }
                }
                return addedResources;
            }
        }, {
            key: "removeResources",
            value: function removeResources() {
                var resourceInfoIDs = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                if (resourceInfoIDs) {
                    resourceInfoIDs = this.jx.tools.makeArrayIfSingleObject(resourceInfoIDs);
                    for (var i = 0; i < resourceInfoIDs.length; i++) {
                        this._removeResource(this.findOne(resourceInfoIDs[i]));
                    }
                } else {
                    for (var i = 0; i < this.batchLoadersInfoArray.length; i++) {
                        this.batchLoadersInfoArray[i].batchLoader.kill();
                    }
                    this.batchLoadersInfoArray.length = 0;
                    for (var prop in this.resourceDB) {
                        this.resourceDB[prop].data = null;
                        if (this.resourceDB[prop].type == "class") {
                            requirejs.undef(this.resourceDB[prop].src);
                        }
                        ;
                        delete this.resourceDB[prop];
                    }
                }
            }
        }, {
            key: "_removeResource",
            value: function _removeResource(resourceInfo) {
                for (var prop in this.resourceDB) {
                    if (this.jx.tools.testObjectsEgality([resourceInfo, this.resourceDB[prop]])) {
                        delete this.resourceDB[prop];
                        return;
                    }
                    ;
                }
                ;
                this.jx.debug.warn("Can't remove resource", resourceInfo.id, "doesn't exist in DBManager");
            }
        }, {
            key: "addAndLoad",
            value: function addAndLoad(resourceInfo, onResourcesLoaded) {
                var rootPath = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

                var addedResources = this.addResources(resourceInfo, rootPath);
                addedResources = addedResources.filter(function (item) {
                    return !(item.type == "Sound" && item.lang == undefined);
                });
                this.load(addedResources, onResourcesLoaded);
            }
        }, {
            key: "load",
            value: function load(requests, onResourcesLoaded) {
                var _this = this;

                var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                var requests = this.jx.tools.makeArrayIfSingleObject(requests);

                var loadResourcesArray = new Array();
                var request;
                var correspond;
                for (var i = 0; i < requests.length; i++) {
                    request = requests[i];

                    var requestMatchesNum = 0;
                    var resourceInfo;
                    for (var resourceInfoID in this.resourceDB) {
                        resourceInfo = this.resourceDB[resourceInfoID];
                        correspond = true;

                        for (var prop in request) {
                            if (prop != "data" && request[prop] != resourceInfo[prop]) {
                                if (!(this.jx.tools.instanceType(resourceInfo[prop]) == "string" && resourceInfo[prop].search(new RegExp(request[prop])) != -1)) {
                                    correspond = false;
                                    break;
                                }
                            }
                        }

                        if (correspond) {
                            requestMatchesNum++;

                            if (!resourceInfo.ready || options.reload) {
                                loadResourcesArray.push(resourceInfo);
                            }
                        }
                    }
                    ;

                    if (requestMatchesNum == 0 && request.src) {
                        var resource = new _Resource2.default({ id: request.src, src: request.src, type: request.type });
                        loadResourcesArray.push(resource);
                        requestMatchesNum++;
                    }
                    if (requestMatchesNum == 0) {
                        this.jx.debug.warn("> DB: No resource found for request: ", request);
                    }
                }
                ;
                var batchLoader = new _BatchLoader2.default(loadResourcesArray, function (evt) {
                    return _this._onResourceLoaded(evt);
                }, this.jx);
                this.batchLoadersInfoArray.push({ batchLoader: batchLoader, onResourcesLoaded: onResourcesLoaded });
                batchLoader.load();
            }
        }, {
            key: "_onResourceLoaded",
            value: function _onResourceLoaded(batchLoader) {
                for (var i = 0; i < this.batchLoadersInfoArray.length; i++) {
                    var batchLoadersInfo = this.batchLoadersInfoArray[i];
                    if (batchLoadersInfo.batchLoader === batchLoader) {
                        var result = { resources: {}, failed: [], loaded: [], resourcesArr: [] };

                        if (batchLoader.failedResources.length > 0) {
                            for (var j = 0; j < batchLoader.failedResources.length; j++) {
                                var resource = batchLoader.failedResources[j];
                                console.warn("failed resource ", resource);
                                result.resources[resource.id] = resource;
                                result.failed.push(resource);
                                result.resourcesArr.push(resource);
                            }
                        }
                        if (batchLoader.loadedResources.length > 0) {
                            for (var k = 0; k < batchLoader.loadedResources.length; k++) {
                                var resource = batchLoader.loadedResources[k];
                                this.jx.debug.log("loaded resource ", resource);

                                if (resource.type == "class") {
                                    this.jx.comp[resource.id] = resource.data;
                                } else if (resource.type.toLowerCase() == "flashtml") {
                                    resource.data = this.jx.cc({ type: "FlashLib", id: resource.id, resourceID: resource.id });
                                }
                                result.resources[resource.id] = resource;
                                result.loaded.push(resource);
                                result.resourcesArr.push(resource);
                            }
                        }
                        batchLoader.kill();
                        this.batchLoadersInfoArray.splice(i, 1);
                        batchLoadersInfo.onResourcesLoaded(result);
                        break;
                    }
                }
            }
        }, {
            key: "find",
            value: function find(request) {
                var resultArray = [];
                var found = false;
                if (this.jx.tools.instanceType(request) == "array") {
                    for (var i = 0; i < request.length; i++) {
                        resultArray.concat(this.find(request[i]));
                    }
                    ;
                } else {
                    var langArg = request.lang;

                    delete request.lang;

                    for (var resourceID in this.resourceDB) {
                        found = true;
                        for (var prop in request) {
                            if (prop == "id" && request[prop] instanceof RegExp) {
                                if (this.resourceDB[resourceID][prop].search(request[prop]) == -1) {
                                    found = false;
                                    break;
                                }
                                ;
                            } else {
                                if (request[prop] != this.resourceDB[resourceID][prop]) {
                                    found = false;
                                    break;
                                }
                                ;
                            }
                        }
                        if (found) {
                            if (this.resourceDB[resourceID].isMultiLang) {
                                if (langArg) {
                                    var resultLang = this.find({ id: resourceID + "_" + langArg });
                                    if (resultLang.length > 0 && resultLang[0].data) {
                                        resultLang = resultLang[0];
                                    } else {
                                        resultLang = this.find({ id: resourceID + "_" + this.jx.config.langs[0] })[0];
                                    }
                                } else {
                                    resultLang = this.find({ id: resourceID + "_" + this.jx.config.langs[0] })[0];
                                }
                            } else {
                                var resultLang = this.resourceDB[resourceID];
                            }
                            resultArray.push(resultLang);
                        }
                    }
                    if (resultArray.length == null) {
                        this.jx.debug.warn("No resources found on DBManager for ", request);
                    }
                    return resultArray;
                }
            }
        }, {
            key: "findOne",
            value: function findOne(request) {
                var foundObject = this.find(request)[0];

                if (foundObject != undefined && (foundObject.type == "DataObject" || foundObject.type == "TextStyle")) {
                    this.cascadeDataObject(foundObject.data);
                }
                return foundObject;
            }
        }, {
            key: "exists",
            value: function exists(request) {
                if (this.resourceDB[request["id"]]) {
                    return true;
                }
                return false;
            }
        }, {
            key: "cascadeDataObject",
            value: function cascadeDataObject(dataObject) {
                var inheritedDataObjectID = dataObject["->"];
                if (inheritedDataObjectID) {
                    delete dataObject["->"];
                    var inheritedDataObject = this.styleDB[inheritedDataObjectID];
                    if (inheritedDataObject) {
                        for (var prop in inheritedDataObject) {
                            if (dataObject.hasOwnProperty(prop)) {
                                continue;
                            }
                            dataObject[prop] = inheritedDataObject[prop];
                        }
                        dataObject = this.cascadeStyle(dataObject);
                    } else {
                        this.jx.debug.warn("Failed to inherit Style", dataObject["->"]);
                    }
                }
                return dataObject;
            }
        }, {
            key: "log",
            value: function log() {
                var result = {
                    resources: this.resourceDB
                };
                function replaceBy(key, value) {
                    if (key == "jx") {
                        return "jx";
                    }
                    ;
                    if (key == "data" && value != undefined && value._lib !== undefined) {
                        return "flashlibData";
                    }
                    ;
                    if (key == "parent") {
                        return "parent";
                    }
                    ;
                    return value;
                }
                try {
                    var string = JSON.stringify(result, replaceBy, 4);
                    console.log(string);
                    return JSON.stringify(result, replaceBy, 4);
                } catch (exception) {
                    console.warn("DBManager.log json cannot be constructed from resourceDB");
                    console.log(this.resourceDB);
                    return this.resourceDB;
                }
            }
        }, {
            key: "getClass",
            value: function getClass(classPath) {
                if (!requirejs.defined(classPath)) return null;
                var classDef = requirejs(classPath);
                classDef = classDef.default || classDef;
                return classDef;
            }
        }, {
            key: "importClass",
            value: function importClass(classesArr) {
                var success = arguments.length <= 1 || arguments[1] === undefined ? function (evt) {} : arguments[1];
                var error = arguments.length <= 2 || arguments[2] === undefined ? function (evt) {} : arguments[2];

                requirejs(classesArr, function (ClassDef) {
                    var finalClass = ClassDef.default || ClassDef;
                    success(finalClass);
                }, function (err) {
                    error(err);
                });
            }
        }, {
            key: "importJSFile",
            value: function importJSFile(classesArr, callback) {
                requirejs(classesArr, callback, function (err) {
                    return callback({ error: err });
                });
            }
        }, {
            key: "classDefined",
            value: function classDefined(path) {
                return requirejs.defined(path);
            }
        }, {
            key: "classFromID",
            value: function classFromID(id) {
                return this.getParameter({ id: id });
            }
        }, {
            key: "getClassFromItemData",
            value: function getClassFromItemData(itemInfo) {
                var defaultPackage = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

                var itemClass;
                if (typeof itemInfo.type == "string") {
                    var packagePath = null;
                    var idComp = null;
                    var idArr = itemInfo.type.split(".");
                    if (idArr.length > 1) {
                        idComp = idArr[idArr.length - 1];
                        idArr.pop();
                        packagePath = idArr.join("/");
                    } else {
                        idComp = idArr[0];
                    }
                    if (!packagePath) {
                        packagePath = itemInfo.editor != undefined && itemInfo.editor.type != undefined ? itemInfo.editor.type : defaultPackage;
                    }
                    idComp = ItemShorcutsNames[idComp] || idComp;
                    if (this.jx.db.classDefined("jx/editor/" + packagePath + "/" + idComp)) {
                        itemClass = this.jx.db.getClass("jx/editor/" + packagePath + "/" + idComp);
                    } else if (this.jx.db.findOne({ id: itemInfo.type })) {
                        itemClass = this.jx.db.findOne({ id: itemInfo.type }).data;
                    } else if (this.jx.db.classDefined(packagePath + "/" + idComp)) {
                        itemClass = this.jx.db.getClass(packagePath + "/" + idComp);
                    }
                } else {
                    console.log(itemInfo);
                    itemClass = itemInfo.type;
                }
                return itemClass;
            }
        }, {
            key: "createComp",
            value: function createComp(id, dataObject) {
                var cl = this.classFromID(id);
                return new cl(dataObject);
            }
        }, {
            key: "getParameter",
            value: function getParameter(idParameter) {
                var resource = this.findOne({ id: idParameter });
                if (resource) return resource.data;
                return null;
            }
        }, {
            key: "getDataGroup",
            value: function getDataGroup(idDataGroup) {
                var result = {};
                var resources = this.jx.db.find({ id: new RegExp("^" + idDataGroup + ".") });
                var parentObj = void 0;
                for (var i = 0; i < resources.length; i++) {
                    var pathArr = resources[i].id.split(".");
                    parentObj = result;
                    for (var j = 0; j < pathArr.length; j++) {
                        if (j < pathArr.length - 1) {
                            parentObj[pathArr[j]] = parentObj[pathArr[j]] || {};
                            parentObj = parentObj[pathArr[j]];
                        } else {
                            parentObj[pathArr[j]] = resources[i];
                        }
                    }
                }
                return result;
            }
        }, {
            key: "getFlashSymbol",
            value: function getFlashSymbol(_ref) {
                var libRID = _ref.libRID;
                var symbolID = _ref.symbolID;

                var libResource = this.jx.db.findOne({ id: libRID });
                if (!libResource) {
                    console.error("FlashLib ", libRID, "not found");
                    return null;
                }
                ;
                if (!libResource.data) {
                    console.error("FlashLib ", libRID, "not loaded");
                    return null;
                }
                ;
                var lib = libResource.data;
                console.log(lib);
                var mc = lib.getFromSymbol(symbolID);
                if (!mc) {
                    console.error("Flash symbol", symbolID, "not found in FlashLib", libRID);
                    return null;
                }
                ;
                return mc;
            }
        }, {
            key: "importConfig",
            value: function importConfig(modelID, onFinished) {
                var _this2 = this;

                var options = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

                this.importClass(["jx/projecttypes/" + modelID.toLowerCase() + "/Importer"], function (IO) {
                    new IO(_this2.jx, options).importConfig(onFinished);
                });
            }
        }, {
            key: "exportConfig",
            value: function exportConfig(modelID, onFinished, options) {
                var _this3 = this;

                this.importClass(["jx/projecttypes/" + modelID.toLowerCase() + "/Exporter"], function (IO) {
                    new IO(_this3.jx, options).exportConfig(onFinished);
                });
            }
        }, {
            key: "loadText",
            value: function loadText(url, callback) {
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType: "text",
                    success: function success(result) {
                        callback(result);
                    },
                    error: function error(XMLHttpRequest, textStatus, errorThrown) {
                        callback({ error: true, message: errorThrown });
                    }
                });
            }
        }, {
            key: "loadTextPromise",
            value: function loadTextPromise(url) {
                return new Promise(function (resolve) {
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "text",
                        success: function success(result) {
                            resolve(result);
                        },
                        error: function error(XMLHttpRequest, textStatus, errorThrown) {
                            resolve({ error: true, message: errorThrown });
                        }
                    });
                });
            }
        }, {
            key: "saveText",
            value: function saveText(pathFile, text) {
                var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

                this._callService("writefile", {
                    url: pathFile,
                    text: text }, function () {
                    callback();
                });
            }
        }, {
            key: "saveTextPromise",
            value: function saveTextPromise(pathFile, text) {
                var _this4 = this;

                return new Promise(function (resolve) {
                    _this4._callService("writefile", {
                        url: pathFile,
                        text: text }, function () {
                        resolve(true);
                    });
                });
            }
        }, {
            key: "saveJSON",
            value: function saveJSON(pathFile, object) {
                var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

                this.saveText(pathFile, JSON.stringify(object, null, 4), callback);
            }
        }, {
            key: "saveJSONPromise",
            value: function saveJSONPromise(pathFile, object) {
                var _this5 = this;

                var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

                return new Promise(function (resolve) {
                    _this5.saveText(pathFile, JSON.stringify(object, null, 4), function () {
                        return resolve(true);
                    });
                });
            }
        }, {
            key: "saveJSONCompressed",
            value: function saveJSONCompressed(pathFile, object) {
                var callback = arguments.length <= 2 || arguments[2] === undefined ? function () {} : arguments[2];

                this.saveText(pathFile, JSON.stringify(object), callback);
            }
        }, {
            key: "_callService",
            value: function _callService(method, params, callback) {
                $.ajax({
                    type: "POST",
                    url: "services/" + method,
                    dataType: "json",
                    data: { params: JSON.stringify(params) },
                    success: function success(result) {
                        callback(result);
                    },
                    beforeSend: function beforeSend(jqXHR, PlainObject) {},
                    error: function error(jqXHR, textStatus, errorThrown) {
                        console.error(jqXHR.responseText);
                    }
                });
            }
        }]);

        return DBManager;
    }();

    exports.default = DBManager;
});
//# sourceMappingURL=DBManager.js.map