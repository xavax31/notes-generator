define(["exports", "jx/core/comps/Component"], function (exports, _Component2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Component3 = _interopRequireDefault(_Component2);

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

    var DropFilesZone = function (_Component) {
        _inherits(DropFilesZone, _Component);

        function DropFilesZone(dataObject) {
            _classCallCheck(this, DropFilesZone);

            return _possibleConstructorReturn(this, (DropFilesZone.__proto__ || Object.getPrototypeOf(DropFilesZone)).call(this, Object.assign({
                id: "",
                rootPath: null
            }, dataObject)));
        }

        _createClass(DropFilesZone, [{
            key: "_create",
            value: function _create() {
                _get(DropFilesZone.prototype.__proto__ || Object.getPrototypeOf(DropFilesZone.prototype), "_create", this).call(this);
                this.view = this.dataObject.dom;
                var dropzone_template = "\n\t\t<div class=\"dz-preview dz-file-preview\">\n\t\t  \t<div class=\"dz-details\">\n\t\t    \t<div class=\"dz-filename\"><span data-dz-name></span></div>\n\t\t    \t<div class=\"dz-size\" data-dz-size></div>\n\t\t    \t<div class=\"dz-image\"><img data-dz-thumbnail></div>\n\t\t  \t</div>\n\t\t  \t<div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n\t\t  \t<div class=\"dz-success-mark\"><span>✔</span></div>\n\t\t  \t<div class=\"dz-error-mark\"><span>✘</span></div>\n\t\t  \t<div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n\t\t</div>";
                var acceptedFiles = {
                    Sound: "audio/mp3,audio/mpeg",
                    Image: "image/png,image/jpg,image/jpeg",
                    ImageSequence: "image/png,image/jpg,image/jpeg",
                    PDF: "application/pdf",
                    PSD: "application/psd,image/vnd.adobe.photoshop",
                    FLA: "application/fla",
                    Flashtml: "application/zip",
                    Video: "video/mp4" };
                var _controller = this;
                var rootPath = this.dataObject.rootPath;

                var numFiles = 0;
                var finishDrop = true;
                this.dropZone = new Dropzone(this.view[0], {
                    url: "/fileupload",
                    previewTemplate: $(dropzone_template).html(),

                    maxFiles: 500,
                    parallelUploads: 200,

                    clickable: true,
                    addRemoveLinks: true,
                    previewsContainer: this.view[0],
                    dictMaxFilesExceeded: "",
                    autoProcessQueue: true,
                    init: function init() {
                        var _this2 = this;

                        this.on('success', function (file, json) {
                            console.log('success', file, file.type);
                            _this2.removeFile(file);
                        });
                        this.on('maxfilesexceeded', function (file) {
                            alert("Nombre de fichiers supérieur au nombre requis: 1");
                        });
                        this.on('addedfile', function (file) {
                            console.log('addedfile', file, file.type);
                        });
                        this.on('drop', function (event) {
                            console.log("DROP", event);
                            numFiles = 0;
                            finishDrop = false;
                        });
                        this.on("sending", function (file, xhr, formData) {
                            console.log('sending', file);
                            formData.append("destPath", rootPath + "/dropbox/" + file.name);
                        });
                    }
                });
            }
        }]);

        return DropFilesZone;
    }(_Component3.default);

    exports.default = DropFilesZone;
});
//# sourceMappingURL=DropFilesZone.js.map