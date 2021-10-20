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

  var ImageSequence = function (_VisualComponent) {
    _inherits(ImageSequence, _VisualComponent);

    function ImageSequence(dataObject) {
      _classCallCheck(this, ImageSequence);

      var _this = _possibleConstructorReturn(this, (ImageSequence.__proto__ || Object.getPrototypeOf(ImageSequence)).call(this, dataObject));

      _this.extendsFrom("ImageSequence");
      return _this;
    }

    _createClass(ImageSequence, [{
      key: "play",
      value: function play() {
        var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      }
    }, {
      key: "stop",
      value: function stop() {}
    }, {
      key: "cancel",
      value: function cancel() {}
    }, {
      key: "goto",
      value: function goto(gotoParams) {
        this.cancel();
        this._frame = gotoParams.frame;
        this.view.image = this.imageSequenceResource.data[this._frame].data;
      }
    }, {
      key: "framerate",
      get: function get() {
        return 0;
      },
      set: function set(value) {}
    }]);

    return ImageSequence;
  }(_VisualComponent3.default);

  exports.default = ImageSequence;
});
//# sourceMappingURL=ImageSequence.js.map