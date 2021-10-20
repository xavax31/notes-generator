define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TextStyle = function TextStyle() {
    _classCallCheck(this, TextStyle);

    this.fontFamily = "Arial";

    this.fontSize = 12;

    this.color = "#000000";

    this.bold = false;

    this.italic = false;

    this.textAlign = "left";

    this.overflow = "auto";
  };

  exports.default = TextStyle;
});
//# sourceMappingURL=TextStyle.js.map