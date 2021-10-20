define(["exports", "jx/editor/editionitems/BasicItem"], function (exports, _BasicItem2) {
    "use strict";

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

    var ClassFile = function (_BasicItem) {
        _inherits(ClassFile, _BasicItem);

        function ClassFile(dataObject) {
            _classCallCheck(this, ClassFile);

            dataObject.data.editable = dataObject.data.editable == undefined ? "admin,dev" : dataObject.data.editable;

            var _this = _possibleConstructorReturn(this, (ClassFile.__proto__ || Object.getPrototypeOf(ClassFile)).call(this, Object.assign({
                icoTitle: "Voir",
                icoSymbol: "file-code-o",
                actions: [],
                informations: [],
                backgroundColor: "#fffa83"
            }, dataObject)));

            console.log(dataObject, _this.dataObject);
            _this.content = $("<textarea id=\"value\" type=\"textarea\" style=\"resize:vertical\"  spellcheck=\"true\"  rows=\"1\" class=\"form-control\"></textarea>");
            _this.view.find("#content").html(_this.content);
            _this.view.find("#value").prop('readonly', !_this.editable);
            _this.view.find("#value").html(_this.data.src || "");
            _this.view.on("change", function (event) {
                if (_this.autoRefresh) _this._refreshData();
                _this.onchanged.dispatch({ target: _this });
            });
            return _this;
        }

        _createClass(ClassFile, [{
            key: "_refreshData",
            value: function _refreshData() {
                this.data.src = this.value;
            }
        }, {
            key: "_refreshView",
            value: function _refreshView() {
                this.data.src = this.value;
            }
        }, {
            key: "value",
            get: function get() {
                return this.item.find("#value")[0].value;
            }
        }, {
            key: "lock",
            set: function set(value) {
                if (!value) {
                    this.view.find("#value").prop('readonly', !this.editable);
                } else {
                    this.view.find("#value").prop('readonly', true);
                }
            }
        }]);

        return ClassFile;
    }(_BasicItem3.default);

    exports.default = ClassFile;
});
//# sourceMappingURL=ClassFile.js.map