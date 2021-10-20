define(["exports", "jx/core/comps/VisualComponent"], function (exports, _VisualComponent2) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _VisualComponent3 = _interopRequireDefault(_VisualComponent2);

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

    var _template = "\n    <div class=\"form-group input-group  input-sm\">\n        <span class=\"input-group-addon input-sm\"><span class=\"fa fa-search\"></span></span>\n        <input type=\"search\" class=\"form-control input-sm\" id=\"value\" placeholder=\"Search\">\n    </div>\n";

    var SearchBox = function (_VisualComponent) {
        _inherits(SearchBox, _VisualComponent);

        function SearchBox(dataObject) {
            _classCallCheck(this, SearchBox);

            var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this, dataObject));

            _this.controller = _this.dataObject.controller;
            _this.addEventDispatcher("onchanged");
            var item = $(_template);
            item.prop("id", _this.data.id);
            item.on("search", function (event) {
                _this.onchanged.dispatch({ target: _this });
            });
            if (_this.data.onchanged) {
                _this.onchanged.add(_this.data.onchanged);
            }
            ;
            item.data("controller", _this);
            _this.item = item;
            _this.view = _this.item;
            _this.value = _this.data.value || "";
            return _this;
        }

        _createClass(SearchBox, [{
            key: "value",
            get: function get() {
                return this.view.find("#value")[0].value;
            },
            set: function set(val) {
                this.view.find("#value")[0].value = val;
            }
        }]);

        return SearchBox;
    }(_VisualComponent3.default);

    exports.default = SearchBox;
});
//# sourceMappingURL=SearchBox.js.map