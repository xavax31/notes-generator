define(['exports', 'jx/editor/editionitems/BasicItem'], function (exports, _BasicItem2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _BasicItem3 = _interopRequireDefault(_BasicItem2);

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

    var _templates = {
        asset: '<div  id="assetValue"></div>',
        source: '<div  id="sourceValue"></div>',
        download: ' <button class="btn btn-default" tabindex="-1" title="Télécharger le fichier" id="download"><span class="fa fa-download"></span></button>',
        openDir: ' <button class="btn btn-default" tabindex="-1" title="Ouvrir le dossier parent" id="openDir"><span class="fa fa-folder-open-o"></span></button>',
        deleteFile: ' <button class="btn btn-default" tabindex="-1" title="Supprimer le fichier associé" id="deleteFile"><span class="fa fa-trash-o"></span></button>',
        push: ' <button class="btn btn-default" tabindex="-1" title="Ouvrir le dossier parent" id="push">PUSH</button>',
        pull: ' <button class="btn btn-default" tabindex="-1" title="Ouvrir le dossier parent" id="pull">PULL</button>'
    };
    var _template = function _template(_ref) {
        var icoTitle = _ref.icoTitle;
        var _ref$icoSymbol = _ref.icoSymbol;
        var icoSymbol = _ref$icoSymbol === undefined ? "gear" : _ref$icoSymbol;
        var _ref$actions = _ref.actions;
        var actions = _ref$actions === undefined ? "" : _ref$actions;
        var _ref$informations = _ref.informations;
        var informations = _ref$informations === undefined ? "" : _ref$informations;
        var _ref$backgroundColor = _ref.backgroundColor;
        var backgroundColor = _ref$backgroundColor === undefined ? "#FFFFFF" : _ref$backgroundColor;
        var _ref$activable = _ref.activable;
        var activable = _ref$activable === undefined ? false : _ref$activable;

        var actionsArr = [];
        for (var i = 0; i < actions.length; i++) {
            actionsArr.push(_templates[actions[i]]);
        }
        ;
        actions = actionsArr.join("");
        var informationsArr = [];
        for (var i = 0; i < informations.length; i++) {
            informationsArr.push(_templates[informations[i]]);
        }
        ;
        informations = informationsArr.join("");
        var activatedCheckBox = !activable ? "" : '<input type="checkbox" name="enabled"  id="enabled" checked style="display:inline;position:relative;top:-38px;left:-10px">';
        return '\n    <div class="form-group row">\n        <div class="row">\n            <div class="col-xs-5">\n\n                <div class="input-group" style="width:100%">\n                    <span title="' + icoTitle + '" id="ico" class="input-group-addon btn btn-default" style="width:40px; background-color: ' + backgroundColor + ';"><span class="fa fa-' + icoSymbol + '"></span>                   \n                    </span>\n                    <input type="text" tabindex="-1" class="form-control"  style="background-color: ' + backgroundColor + ';" id="id" value="" readonly="true" >\n\n                </div>\n                ' + activatedCheckBox + '\n\n            </div>\n             <div class="col-xs-7">\n                <button class="btn btn-default" tabindex="-1" title="Informations" id="info"><span class="fa fa-info"></span></button>\n                ' + actions + '\n            </div>\n        </div>\n        <div  id="informationsPanel" class="row"  style="display:none;">\n            <div class="col-xs-12" id="informationsText">\n                <div id="description"  style="display:block"></div>\n                <div id="processus" style="display:block"></div>\n                ' + informations + '\n            </div>\n        </div>\n        <div   class="row" >\n            <div class="col-xs-12" id="zoneDrop">\n                <div id="DropZone" class="dropzone"></div>\n            </div>\n        </div>\n    </div>\n    ';
    };

    var FileItem = function (_BasicItem) {
        _inherits(FileItem, _BasicItem);

        function FileItem(dataObject) {
            _classCallCheck(this, FileItem);

            if (dataObject.data.editable == undefined) {
                dataObject.data.editable = true;
            }
            ;
            var _this = _possibleConstructorReturn(this, (FileItem.__proto__ || Object.getPrototypeOf(FileItem)).call(this, Object.assign({
                icoTitle: "Voir",
                icoSymbol: "file-powerpoint-o",
                actions: [],
                informations: ["asset", "source"],
                backgroundColor: "#CC6666",
                index: 0,
                onfiledropped: null
            }, dataObject)));

            _this.addEventDispatcher(["onfiledropped"]);
            if (_this.dataObject.onfiledropped) _this.onfiledropped.add(_this.dataObject.onfiledropped);
            _this.dataObject.activable = _this.dataObject.data.activable;

            if (_this.dataObject.data.type.toLowerCase() == "fileitem") {
                _this.dataObject.actions = _this.jx.tools.arr.removeDouble((_this.dataObject.actions || []).concat(["openDir", "preview", "download"]));
            } else {
                _this.dataObject.actions = _this.jx.tools.arr.removeDouble((_this.dataObject.actions || []).concat(["openDir"]));
            }

            _this.view = $(_template(_this.dataObject));
            _this.autoRefresh = true;
            _this.view.prop('id', _this.data.id);
            _this.view.css('margin-bottom', "5px");
            _this.view.find("#id")[0].value = _this.data.title || _this.data.id;
            _this.view.find("#description").text(_this.data.description);

            if (_this.data.asset.src != null) {
                _this.view.find("#assetValue").html('<b>Asset: </b>' + _this.data.asset.src);
            } else {
                console.warn("path of asset ", _this.data.id, " not defined");
                _this.view.find("#assetValue").html('<b>Asset: </b>NOT DEFINED');
            }
            if (_this.jx.config.system.host.type != "local") {
                _this.view.find("#openDir").css("display", "none");
                _this.view.find("#push").css("display", "none");
                _this.view.find("#pull").css("display", "none");
            }
            _this.view.find("#openDir").click(function (event) {
                return _this.controller.openParentDirectory(_this.data);
            });
            _this.view.find("#push").click(function (event) {
                return _this.controller.pushFile(_this.data);
            });
            _this.view.find("#pull").click(function (event) {
                return _this.controller.pullFile(_this.data);
            });
            _this.view.find("#deleteFile").click(function () {
                return _this.deleteItemLinkedFile();
            });

            _this.view.find("#download").click(function (event) {
                return _this.controller.downloadItem(_this.data);
            });
            _this.view.find("#processus").html("<b>Procédure:</b> téléchargez ce fichier(<span class='fa fa-download'>), modifiez le, et glissez le sur l'identifiant pour le mettre à jour. ");
            if (_this.dataObject.actions.indexOf("preview") != -1) {
                _this.view.find("#ico").click(function (event) {
                    _this.controller.showItem(_this.data);
                });
            } else {
                _this.view.find("#ico").removeClass('btn btn-default');
            }
            _this.view.find("#info").click(function (event) {
                return _this.toggleInfo();
            });
            _this.view.find("#enabled").change(function (event) {
                console.log("ONCHANGE", event, _this.view.find("#enabled").prop("checked"));
                var data = _this.controller.mainController.project.getInGabarit({ id: _this.gabaritPath });
                data.activated = _this.view.find("#enabled").prop("checked");
                _this.onchanged.dispatch({ target: _this });
            });
            _this.item = _this.view;

            _this.dropZone = _this.addDropZone();
            return _this;
        }

        _createClass(FileItem, [{
            key: 'deleteItemLinkedFile',
            value: function deleteItemLinkedFile() {
                var callback = arguments.length <= 0 || arguments[0] === undefined ? function (evt) {} : arguments[0];

                this.controller.deleteItemLinkedFile(this.data, function (evt) {
                    console.log("fileitem", evt);
                    callback(evt);
                });
            }
        }, {
            key: 'addDropZone',
            value: function addDropZone() {
                var _this2 = this;

                var item = this;
                var _controller = this.controller.mainController;
                var destAssetsDir = _controller.project.info.url + "/" + _controller.project.info.assetsDir + "/";
                var itemInfo = {
                    id: item.data.id,
                    type: item.data.asset.type,
                    src: item.data.asset.src.replace("${lang}", this.lang),
                    zoneDropDOM: item.view.find("#id")[0],
                    zoneDroppedDOM: item.view.find("#DropZone")[0]
                };

                var acceptedFiles = {
                    Sound: "audio/mp3,audio/mpeg",
                    Image: "image/png,image/jpg,image/jpeg",
                    ImageSequence: "image/png,image/jpg,image/jpeg",
                    PDF: "application/pdf",
                    PSD: "application/psd,image/vnd.adobe.photoshop",
                    FLA: "application/fla",
                    Flashtml: "application/zip",
                    FontPack: "application/octet-stream",
                    Video: "video/mp4" };
                var me = this;
                var numFiles = 0;
                var finishDrop = true;
                var dropZone = new Dropzone(itemInfo.zoneDropDOM, {
                    url: "/fileupload",

                    maxFiles: 500,
                    parallelUploads: 200,

                    clickable: true,
                    addRemoveLinks: true,
                    previewsContainer: itemInfo.zoneDroppedDOM,
                    dictMaxFilesExceeded: "",
                    autoProcessQueue: true
                });

                dropZone.on('drop', function (event) {
                    console.log("dd DROP", event);
                    numFiles = 0;
                    finishDrop = false;
                });

                dropZone.on('addedfile', function (file) {
                    var fileType = file.type;

                    if (itemInfo.type == "FLA" && file.name.split(".")[1].toUpperCase() == "FLA") {
                        fileType = "application/fla";
                    }

                    if (itemInfo.type == "Flashtml" && file.name.split(".")[1].toUpperCase() == "ZIP") {
                        fileType = "application/zip";
                    }

                    if (itemInfo.type == "FontPack") {
                        var extensionDropped = file.name.split(".").pop().toLowerCase();
                        if (extensionDropped == "ttf" || extensionDropped == "otf") {
                            fileType = "application/octet-stream";
                        } else {
                            fileType = extensionDropped;
                        }
                    }

                    var acceptedFilesArr = acceptedFiles[itemInfo.type] || "";
                    acceptedFilesArr = acceptedFilesArr.split(",");
                    var isValideFileType = function isValideFileType(fileType) {
                        for (var i = 0; i < acceptedFilesArr.length; i++) {
                            if (acceptedFilesArr[i] == fileType) {
                                return true;
                            }
                            ;
                        }
                        ;
                        return false;
                    };
                    if (!isValideFileType(fileType)) {
                        alert("Fichier non valide\nLe format du fichier doit être de type\n '" + acceptedFiles[itemInfo.type] + "'\nau lieu de\n" + fileType);
                        dropZone.removeFile(file);
                    } else {
                        if (itemInfo.type == "ImageSequence") {
                            var destFileArr = itemInfo.src.split("/");
                            var destFileFullnameNonReplaced = destFileArr[destFileArr.length - 1];
                            var destFileFullname = destFileFullnameNonReplaced.replace(/#/g, "[0-9]");
                            var destFilename = destFileFullname.split(".")[0];
                            var destFileExtension = destFileFullname.split(".")[1];
                            destFileArr.pop();
                            var destDir = destAssetsDir + destFileArr.join("/");
                            var filename = file.name.split(".")[0];
                            var extension = file.name.split(".")[1];
                            if (filename.search(new RegExp(destFilename)) != -1 && destFileExtension.toUpperCase() == extension.toUpperCase()) {
                                numFiles++;
                            } else {
                                numFiles++;
                                dropZone.removeFile(file);
                                alert("Le nom du fichier ne correspond pas au modèle nécessaire:\n" + file.name + "\nau lieu de\n" + destFileFullnameNonReplaced);
                            }
                        }
                    }
                });

                dropZone.on("sending", function (file, xhr, formData) {
                    if (!finishDrop && itemInfo.type == "ImageSequence") {
                        item.data.asset.start = 1;
                        item.data.asset.end = numFiles;
                        var gabaritObj = _controller.getInGabarit({ id: itemInfo.id });
                        gabaritObj.asset.start = 1;
                        gabaritObj.asset.end = numFiles;
                        _controller.save();

                        var destFileArr = itemInfo.src.split("/");
                        destFileArr.pop();
                        var destDir = destAssetsDir + destFileArr.join("/");
                        formData.append("delPath", destDir);
                    }
                    finishDrop = true;

                    if (itemInfo.type == "ImageSequence") {
                        var destFileArr = itemInfo.src.split("/");
                        var destFileFullname = destFileArr[destFileArr.length - 1].replace(/#/g, "[0-9]");
                        var destFilename = destFileFullname.split(".")[0];
                        var destFileExtension = destFileFullname.split(".")[1];
                        destFileArr.pop();
                        var destDir = destAssetsDir + destFileArr.join("/");
                        var filename = file.name.split(".")[0];
                        var extension = file.name.split(".")[1];
                        if (filename.search(new RegExp(destFilename)) != -1 && destFileExtension.toUpperCase() == extension.toUpperCase()) {
                            formData.append("destPath", destDir + "/" + filename + "." + destFileExtension);
                        }
                    } else if (itemInfo.type == "Flashtml") {
                            formData.append("destPath", destAssetsDir + itemInfo.src + ".zip");
                        } else if (itemInfo.type == "FontPack") {
                            var fileNameWithoutExt = file.name.split(".").shift();
                            var extensionDropped = file.name.split(".").pop().toLowerCase();
                            console.log(extensionDropped);
                            formData.append("destPath", destAssetsDir + fileNameWithoutExt + "/" + file.name);
                        } else {
                                var extensionDropped = file.name.split(".")[1];
                                var extensionDest = itemInfo.src.split(".")[1];
                                if (extensionDropped != extensionDest) {
                                    var srcDestArr = item.data.asset.src.split(".");
                                    srcDestArr.pop();
                                    srcDestArr.push(extensionDropped);
                                    item.data.asset.src = srcDestArr.join(".");
                                    itemInfo.src = item.data.asset.src.replace("${lang}", _controller.lang);
                                    console.log(item.data.gabaritID);
                                    if (item.data.gabaritID) {
                                        var arr = item.gabaritPath.split(".");
                                        arr.pop();
                                        arr.push(item.data.gabaritID);
                                        var data = _controller.project.getInGabarit({ id: arr.join(".") });
                                        data.asset.resources = data.asset.resources || [];
                                        var resource = data.asset.resources.filter(function (itemRes) {
                                            return itemRes.id == item.data.id;
                                        })[0];
                                        data.asset.src = item.data.asset.src;
                                        if (resource) {
                                            data.asset.resources.splice(data.asset.resources.indexOf(resource), 1);
                                        }
                                        if (extensionDropped != data.asset.src.split(".").pop()) {
                                            data.asset.resources.push({ id: item.data.id, src: item.data.asset.src });
                                        }
                                    } else {
                                        var data = _controller.project.getInGabarit({ id: item.gabaritPath });
                                        data.asset.src = item.data.asset.src;
                                    }
                                    item.onchanged.dispatch({ target: item });
                                }
                                console.log("destDiro", destAssetsDir + itemInfo.src);
                                if (itemInfo.type == "FontPack") {
                                    var _fileNameWithoutExt = file.name.split(".").shift();
                                    var extensionDropped = file.name.split(".").pop().toLowerCase();
                                    console.log(extensionDropped);
                                    if (extensionDropped == "ttf") {
                                        formData.append("destPath", destAssetsDir + itemInfo.src.replace(/zip$/, "ttf"));
                                    } else {
                                        formData.append("destPath", destAssetsDir + itemInfo.src);
                                    }
                                } else {
                                    formData.append("destPath", destAssetsDir + itemInfo.src);
                                }
                            }
                });

                dropZone.on('success', function (file, json) {
                    console.log('dd success', file);
                    var dropResult = {};
                    var fileNameWithoutExt = file.name.split(".").shift();
                    var extensionDropped = file.name.split(".").pop().toLowerCase();
                    if (item.check) item.check();
                    if (itemInfo.type == "Flashtml") {
                        _this2.jx.editor.unzip({ path: destAssetsDir + itemInfo.src + ".zip" });
                        dropResult.filePath = null;
                        dropResult.message = "the file of type Flashtml has been unzipped and don't exists anymore";
                    } else if (itemInfo.type == "FontPack") {
                        if (extensionDropped == "zip") {
                            dropResult.filePath = destAssetsDir + itemInfo.src + ".zip";
                            _this2.jx.editor.unzip({ path: destAssetsDir + itemInfo.src + ".zip", deleteZipFile: item.data.deleteZipFile === false ? false : undefined });
                        } else {
                            dropResult.filePath = destAssetsDir + fileNameWithoutExt + "/" + file.name;
                            dropResult.parentDirName = fileNameWithoutExt;
                            dropResult.parentDirPath = destAssetsDir + fileNameWithoutExt;
                        }
                    }
                    dropZone.removeFile(file);
                    _this2.onfiledropped.dispatch(dropResult);
                });

                dropZone.on('maxfilesexceeded', function (file) {
                    alert("Nombre de fichiers supérieur au nombre requis: 1");
                });

                return dropZone;
            }
        }, {
            key: 'check',
            value: function check() {
                this.view.find("#ico").css("background-color", "#00ff00");
                this.onchanged.dispatch({ target: this });
            }
        }, {
            key: 'gabaritPath',
            get: function get() {
                var path = this.data.id;
                var parent = this.itemParent;
                while (parent) {
                    path = parent.data.id + "." + path;
                    parent = parent.itemParent;
                }
                return path;
            }
        }, {
            key: 'lock',
            set: function set(value) {
                if (!value) {
                    if (this.editable) {
                        this.dropZone.enable();
                    } else {
                        this.dropZone.disable();
                    }
                } else {
                    this.dropZone.disable();
                }
            }
        }]);

        return FileItem;
    }(_BasicItem3.default);

    exports.default = FileItem;
});
//# sourceMappingURL=FileItem.js.map