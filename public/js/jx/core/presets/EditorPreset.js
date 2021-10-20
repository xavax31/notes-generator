define(["exports", "jx/core/presets/GameModule", "jx/editor/Editor"], function (exports, _GameModule, _Editor) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _GameModule2 = _interopRequireDefault(_GameModule);

    var _Editor2 = _interopRequireDefault(_Editor);

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

    var plugs = [{
        type: "package",
        itemsType: "class",
        path: "jx/editor/editionitems",
        preload: true,
        packageID: "editionitems",
        itemsID: ["Common", "Group", "GabaritObject", "GabaritModel", "GabaritMap", "DataObject", "DataGroup", "DataCtrl", "DataModel", "Container", "CatalogItem", "CatalogTestItem", "ClassFile", "Todo", "Separator", "ScreenData", "InformationsData", "JXEngineInformation", "ProjectInformations", "ProjectInformation", "EditorInformation", "FileItem", "FlashtmlItem", "FlashtmlPackItem", "FlashtmlResource", "FLAItem", "FontItem", "FontSelector", "VideoItem", "ImageItem", "SoundItem", "FlaLibItem", "ImageSequenceItem", "Text", "PSD", "PDF", "SpriteSheetItem", "BooleanItem", "Rectangle", "Point", "DateItem", "Color", "Parameter", "NumberItem", "SimpleText", "TextStyle", "TextStyle2", "ComboBox", "SimpleComboBox", "SearchBox", "ListItem", "Button", "ButtonItem", "StatusItem", "DropFilesZone", "Sequence01", "Quiz", "QuizManagerItem", "QuizThemeItem", "QuizDataItem", "Clip", "Menu", "MemoryGameConfig"]
    }, {
        "id": "Number2", "type": "class", "preload": true,
        "src": "jx/editor/compitemsedit/Number"
    }, {
        "id": "Number3", "type": "class", "preload": true,
        "src": "jx/editor/compitemsreadonly/Number"
    }, {
        "id": "Text2", "type": "class", "preload": true,
        "src": "jx/editor/compitemsreadonly/Text"
    }, {
        "id": "SimpleText2", "type": "class", "preload": true,
        "src": "jx/editor/compitemsreadonly/SimpleText"
    }, {
        "id": "Daemon", "type": "class", "preload": true,
        "src": "jx/core/utils/Daemon"
    }];

    var EditorPreset = function (_ModuleType) {
        _inherits(EditorPreset, _ModuleType);

        function EditorPreset(dataObject) {
            _classCallCheck(this, EditorPreset);

            dataObject = Object.assign({
                plugs: []
            }, dataObject);
            dataObject.plugs = dataObject.plugs.concat(plugs);
            return _possibleConstructorReturn(this, (EditorPreset.__proto__ || Object.getPrototypeOf(EditorPreset)).call(this, dataObject));
        }

        _createClass(EditorPreset, [{
            key: "initialise",
            value: function initialise(callback) {
                var _this2 = this;

                this.jx.editor = new _Editor2.default(this.jx);
                this.jx.editor.initialise(function (evt) {
                    return _get(EditorPreset.prototype.__proto__ || Object.getPrototypeOf(EditorPreset.prototype), "initialise", _this2).call(_this2, callback);
                });
                return this;
            }
        }]);

        return EditorPreset;
    }(_GameModule2.default);

    exports.default = EditorPreset;
});
//# sourceMappingURL=EditorPreset.js.map