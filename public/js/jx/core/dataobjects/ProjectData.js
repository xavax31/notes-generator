define(["exports", "jx/core/dataobjects/ModuleData"], function (exports, _ModuleData2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _ModuleData3 = _interopRequireDefault(_ModuleData2);

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

    var ProjectData = function (_ModuleData) {
        _inherits(ProjectData, _ModuleData);

        function ProjectData() {
            _classCallCheck(this, ProjectData);

            var _this = _possibleConstructorReturn(this, (ProjectData.__proto__ || Object.getPrototypeOf(ProjectData)).call(this));

            _this.modules = [];
            return _this;
        }

        return ProjectData;
    }(_ModuleData3.default);

    exports.default = ProjectData;
});
//# sourceMappingURL=ProjectData.js.map