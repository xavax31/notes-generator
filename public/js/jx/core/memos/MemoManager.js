define(["exports", "jx/core/JXObject"], function (exports, _JXObject2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _JXObject3 = _interopRequireDefault(_JXObject2);

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

    ;

    var MemoManager = function (_JXObject) {
        _inherits(MemoManager, _JXObject);

        function MemoManager(dataObject) {
            _classCallCheck(this, MemoManager);

            return _possibleConstructorReturn(this, (MemoManager.__proto__ || Object.getPrototypeOf(MemoManager)).call(this, Object.assign({}, dataObject)));
        }

        _createClass(MemoManager, [{
            key: "addMemo",
            value: function addMemo(_ref) {
                var id = _ref.id;
                var _ref$type = _ref.type;
                var type = _ref$type === undefined ? "Cookie" : _ref$type;
                var _ref$autosave = _ref.autosave;
                var autosave = _ref$autosave === undefined ? false : _ref$autosave;

                var cl = this.jx.db.getClass("jx/core/memos/Memo" + type);
                var memo = new cl({ jx: this.jx, id: id + this.jx.config.app.id, autosave: autosave });
                this[id] = memo;
                return memo;
            }
        }]);

        return MemoManager;
    }(_JXObject3.default);

    exports.default = MemoManager;
});
//# sourceMappingURL=MemoManager.js.map