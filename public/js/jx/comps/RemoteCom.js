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

    var RemoteCom = function (_Component) {
        _inherits(RemoteCom, _Component);

        function RemoteCom(dataObject) {
            _classCallCheck(this, RemoteCom);

            return _possibleConstructorReturn(this, (RemoteCom.__proto__ || Object.getPrototypeOf(RemoteCom)).call(this, Object.assign({
                url: "",
                io: false
            }, dataObject)));
        }

        _createClass(RemoteCom, [{
            key: "_create",
            value: function _create() {
                _get(RemoteCom.prototype.__proto__ || Object.getPrototypeOf(RemoteCom.prototype), "_create", this).call(this);
                this.info = {
                    url: this.dataObject.url
                };
                if (this.dataObject.io) {
                    this.io = io.connect('http://52.208.49.19');

                    this.io.on('message', function (message) {
                        console.log('Le serveur a un message pour vous : ' + message);
                    });
                    this.io.on('userAction', function (_ref) {
                        var username = _ref.username;
                        var action = _ref.action;
                        var args = _ref.args;

                        console.log('User ' + username + " make action " + action, args);
                    });
                    $('#poke').click(function () {});
                }
                ;
            }
        }, {
            key: "callMethod",
            value: function callMethod(method, params, callback) {
                $.ajax({
                    type: "POST",
                    url: this.info.url + "/" + method,
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
        }, {
            key: "callMethodOld",
            value: function callMethodOld(method, params, callback) {
                $.ajax({
                    type: "POST",
                    url: this.info.url + "/" + method,
                    dataType: "json",
                    data: params,
                    success: function success(result) {
                        callback(result);
                    },
                    beforeSend: function beforeSend(jqXHR, PlainObject) {
                        console.log(jqXHR, PlainObject);
                    },
                    error: function error(jqXHR, textStatus, errorThrown) {
                        console.error(jqXHR.responseText);
                    }
                });
            }
        }]);

        return RemoteCom;
    }(_Component3.default);

    exports.default = RemoteCom;
});
//# sourceMappingURL=RemoteCom.js.map