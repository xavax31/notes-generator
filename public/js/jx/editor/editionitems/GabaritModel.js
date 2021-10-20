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

    var GabaritModel = function (_Component) {
        _inherits(GabaritModel, _Component);

        function GabaritModel(dataObject) {
            _classCallCheck(this, GabaritModel);

            var _this = _possibleConstructorReturn(this, (GabaritModel.__proto__ || Object.getPrototypeOf(GabaritModel)).call(this, dataObject));

            _this.gabarit = _this.cc({ type: "editionitems.DataModel", data: { children: _this.dataObject.gabarit } });
            return _this;
        }

        _createClass(GabaritModel, [{
            key: "getByPath",
            value: function getByPath(path) {
                return this.gabarit.getByPath(path);
            }
        }]);

        return GabaritModel;
    }(_Component3.default);

    exports.default = GabaritModel;
});
//# sourceMappingURL=GabaritModel.js.map