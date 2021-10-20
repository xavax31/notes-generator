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

    var MenuEditionTop = function (_Component) {
        _inherits(MenuEditionTop, _Component);

        function MenuEditionTop(dataObject) {
            _classCallCheck(this, MenuEditionTop);

            var _this = _possibleConstructorReturn(this, (MenuEditionTop.__proto__ || Object.getPrototypeOf(MenuEditionTop)).call(this, Object.assign({}, dataObject)));

            _this.view = $("#MainTopMenu");
            _this.view.css("background-color", _this.jx.config.app.pageBackgroundColor);
            _this.pageTabs = $("<div id='pagesTabs'/>");
            _this.pageTabs.css("top", "0px");
            $("body").append(_this.pageTabs);
            _this.view.css("display", "block");
            return _this;
        }

        _createClass(MenuEditionTop, [{
            key: "setMenu",
            value: function setMenu(menu) {
                this.menu = menu;
                this.view.prepend(this.menu.view);
            }
        }, {
            key: "setPageTabs",
            value: function setPageTabs(pageTabs) {
                this.pageTabs.empty();
                this.pageTabs.append(pageTabs);
            }
        }, {
            key: "showComponent",
            value: function showComponent(id) {
                this.view.find("#" + id).css("display", "block");
            }
        }, {
            key: "hideComponent",
            value: function hideComponent(id) {
                this.view.find("#" + id).css("display", "none");
            }
        }, {
            key: "kill",
            value: function kill() {
                _get(MenuEditionTop.prototype.__proto__ || Object.getPrototypeOf(MenuEditionTop.prototype), "kill", this).call(this);
            }
        }]);

        return MenuEditionTop;
    }(_Component3.default);

    exports.default = MenuEditionTop;
});
//# sourceMappingURL=MenuEditionTop.js.map