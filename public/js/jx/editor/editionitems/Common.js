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

  var dropzone_template = "\n<div id=\"dropzone_template\" style=\"display: none;\" class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\"  style=\"display: none;\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-success-mark\"><span>✔</span></div>\n  <div class=\"dz-error-mark\"><span>✘</span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>\n";

  var Common = function (_VisualComponent) {
    _inherits(Common, _VisualComponent);

    function Common(dataObject) {
      _classCallCheck(this, Common);

      var _this = _possibleConstructorReturn(this, (Common.__proto__ || Object.getPrototypeOf(Common)).call(this, dataObject));

      _this.dropzoneItem = $(dropzone_template)[0];
      return _this;
    }

    return Common;
  }(_VisualComponent3.default);

  exports.default = Common;
});
//# sourceMappingURL=Common.js.map