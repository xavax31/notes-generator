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

  var Video = function (_VisualComponent) {
    _inherits(Video, _VisualComponent);

    function Video(dataObject) {
      _classCallCheck(this, Video);

      var _this = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, dataObject));

      _this.extendsFrom("Video");

      _this.onfinished = null;

      _this.onplaying = null;
      return _this;
    }

    _createClass(Video, [{
      key: "play",
      value: function play() {}
    }, {
      key: "pause",
      value: function pause(_ref) {
        var _ref$callback = _ref.callback;
        var callback = _ref$callback === undefined ? null : _ref$callback;
      }
    }, {
      key: "stop",
      value: function stop() {
        var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? { callback: null } : arguments[0];

        var callback = _ref2.callback;
      }
    }, {
      key: "duration",
      get: function get() {
        return 0;
      }
    }, {
      key: "currentTime",
      set: function set(value) {},
      get: function get() {
        return 0;
      }
    }, {
      key: "playbackRate",
      set: function set(value) {}
    }, {
      key: "volume",
      set: function set(value) {},
      get: function get() {
        return 0;
      }
    }, {
      key: "muted",
      set: function set(value) {},
      get: function get() {
        return false;
      }
    }]);

    return Video;
  }(_VisualComponent3.default);

  exports.default = Video;
});
//# sourceMappingURL=Video.js.map