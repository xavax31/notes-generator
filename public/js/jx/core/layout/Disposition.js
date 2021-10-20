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

    var Disposition = function () {
        function Disposition(jx) {
            _classCallCheck(this, Disposition);

            this.jx = jx;
        }

        _createClass(Disposition, [{
            key: "getPositions",
            value: function getPositions(_ref) {
                var rows = _ref.rows;
                var ref = _ref.ref;
                var _ref$center = _ref.center;
                var center = _ref$center === undefined ? false : _ref$center;
                var _ref$spacing = _ref.spacing;
                var spacing = _ref$spacing === undefined ? 0 : _ref$spacing;
                var _ref$margin = _ref.margin;
                var margin = _ref$margin === undefined ? 0 : _ref$margin;

                var result = {};
                var rowWidth = (ref.width - margin * 2 - (rows - 1) * spacing) / rows;
                var totalW = 0;
                for (var i = 0; i < rows; i++) {
                    console.log(rowWidth, center ? rowWidth * i + rowWidth / 2 : rowWidth * i);
                    var xOffset = i == 0 ? margin : margin + i * spacing;
                    result["row" + i] = { x: center ? xOffset + rowWidth * i + rowWidth / 2 : xOffset + rowWidth * i, width: rowWidth };
                    console.log(result["row" + i].x + result["row" + i].width + margin);
                }
                console.log(margin * 2 + rows * rowWidth + (rows - 1) * spacing, ref.width);
                return result;
            }
        }, {
            key: "setToPos",
            value: function setToPos(_ref2) {
                var comp = _ref2.comp;
                var target = _ref2.target;

                comp.x = target.x;
                comp.y = target.y;
            }
        }, {
            key: "setToPosGlobal",
            value: function setToPosGlobal(_ref3) {
                var comp = _ref3.comp;
                var target = _ref3.target;

                for (var i = 0; i < comp.length; i++) {
                    target.localToLocal(0, 0, comp[i]);
                    comp[i].x = target.x;
                    comp[i].y = target.y;
                }
                ;
            }
        }, {
            key: "setToGrid",
            value: function setToGrid(_ref4) {
                var comp = _ref4.comp;
                var target = _ref4.target;
                var _ref4$interval = _ref4.interval;
                var interval = _ref4$interval === undefined ? {} : _ref4$interval;
                var _ref4$margin = _ref4.margin;
                var margin = _ref4$margin === undefined ? {} : _ref4$margin;
                var _ref4$cols = _ref4.cols;
                var cols = _ref4$cols === undefined ? 100000 : _ref4$cols;

                var margin = this.jx.tools.fillObject({ top: 0, left: 0, right: 0, bottom: 0 }, margin);
                var interval = this.jx.tools.fillObject({ x: 0, y: 0 }, interval);
                var targetBounds = { x: 0, y: 0, width: target.width, height: target.height };
                var finalWidth = 0;
                var maxWidth = targetBounds.width;
                var maxHeight = 0;
                var posX = targetBounds.x + margin.left;
                var posY = targetBounds.y + margin.top;
                var clip;
                var totalWidth;
                var numCols = 0;
                var numRows = comp.length / cols;
                var itemWidth = (targetBounds.width - margin.left - margin.right - interval.x * (cols - 1)) / cols;
                var itemHeight = comp[0].height * itemWidth / comp[0].width;
                var totalHeight = margin.top + margin.bottom + numRows * (comp[0].height * itemWidth / comp[0].width) + (numRows - 1) * interval.y;
                if (totalHeight > targetBounds.height) {
                    var itemHeight = (targetBounds.height - margin.top - margin.bottom - interval.y * (numRows - 1)) / numRows;
                    var itemWidth = comp[0].width * itemHeight / comp[0].height;
                }
                var totalWidthMarge = (targetBounds.width - (margin.left + margin.right + cols * itemWidth + (cols - 1) * interval.x)) / 2;
                var oriX = targetBounds.x + totalWidthMarge + margin.left;
                posX = oriX;
                var totalHeightMarge = (targetBounds.height - (margin.top + margin.bottom + numRows * itemHeight + (numRows - 1) * interval.y)) / 2;
                var oriY = targetBounds.y + totalHeightMarge + margin.top;
                posY = oriY;
                var pos = { x: targetBounds.x + margin.left, y: targetBounds.y + margin.top };
                for (var row = 0; row < numRows; row++) {
                    for (var col = 0; col < cols; col++) {
                        pos.x = col * (itemWidth + interval.x) + totalWidthMarge + margin.left;
                        pos.y = row * (itemHeight + interval.y) + totalHeightMarge + margin.top;
                        console.log("clip", row * cols + col, row);
                        clip = comp[row * cols + col];
                        clip.ratioWidth = itemWidth;
                        clip.x = pos.x;
                        clip.y = pos.y;
                    }
                }
            }
        }, {
            key: "setToGridGlobal",
            value: function setToGridGlobal(_ref5) {
                var comp = _ref5.comp;
                var target = _ref5.target;
                var _ref5$interval = _ref5.interval;
                var interval = _ref5$interval === undefined ? {} : _ref5$interval;
                var _ref5$margin = _ref5.margin;
                var margin = _ref5$margin === undefined ? {} : _ref5$margin;
                var _ref5$cols = _ref5.cols;
                var cols = _ref5$cols === undefined ? 100000 : _ref5$cols;

                var margin = this.jx.tools.fillObject({ top: 0, left: 0, right: 0, bottom: 0 }, margin);
                var interval = this.jx.tools.fillObject({ x: 0, y: 0 }, interval);
                var targetBounds = this.getGlobalBounds(target);
                var finalWidth = 0;
                var maxWidth = targetBounds.width;
                var maxHeight = 0;
                var posX = targetBounds.x + margin.left;
                var posY = targetBounds.y + margin.top;
                var clip;
                var totalWidth;
                var numCols = 0;

                var itemWidth = (targetBounds.width - margin.left - margin.right - interval.x * (cols - 1)) / cols;
                console.log(itemWidth, margin.left, margin.right, interval.x, cols);
                for (var i = 0; i < comp.length; i++) {
                    numCols++;
                    clip = comp[i];
                    clip.ratioWidth = itemWidth;
                    var clipBounds = this.getGlobalBounds(clip);
                    maxHeight = clipBounds.height > maxHeight ? clipBounds.height : maxHeight;
                    var totalWantedWidth = posX + clipBounds.width + interval.x + margin.right;
                    if (totalWantedWidth > targetBounds.x + maxWidth || numCols > cols) {
                        numCols = 1;
                        totalWidth = posX + margin.right - targetBounds.x;
                        posX = targetBounds.x + margin.left;
                        posY += maxHeight + interval.y;
                    } else {
                        totalWidth = totalWantedWidth - targetBounds.x;
                    }
                    finalWidth = totalWidth > finalWidth ? totalWidth : finalWidth;
                    clip.nextTransform = { x: posX, y: posY, width: itemWidth };
                    console.log(clipBounds.width, clip.width);
                    posX += clipBounds.width + interval.x;
                }
                ;
                var offsetX = (maxWidth - finalWidth) / 2;
                for (var i = 0; i < comp.length; i++) {
                    clip = comp[i];
                    clip.nextTransform.x += offsetX;
                    var pt = target.globalToLocal(posX, clip.nextTransform.y);
                    clip.x = pt.x;
                    clip.y = pt.y;
                }
            }
        }, {
            key: "setToGridGlobal2",
            value: function setToGridGlobal2(_ref6) {
                var comp = _ref6.comp;
                var target = _ref6.target;
                var _ref6$interval = _ref6.interval;
                var interval = _ref6$interval === undefined ? {} : _ref6$interval;
                var _ref6$margin = _ref6.margin;
                var margin = _ref6$margin === undefined ? {} : _ref6$margin;
                var _ref6$cols = _ref6.cols;
                var cols = _ref6$cols === undefined ? 100000 : _ref6$cols;

                var margin = this.jx.tools.fillObject({ top: 0, left: 0, right: 0, bottom: 0 }, margin);
                var interval = this.jx.tools.fillObject({ x: 0, y: 0 }, interval);
                var targetBounds = this.getGlobalBounds(target);
                var finalWidth = 0;
                var maxWidth = targetBounds.width;
                var maxHeight = 0;
                var posX = targetBounds.x + margin.left;
                var posY = targetBounds.y + margin.top;
                var clip;
                var totalWidth;
                var numCols = 0;
                for (var i = 0; i < comp.length; i++) {
                    numCols++;
                    clip = comp[i];
                    var clipBounds = this.getGlobalBounds(clip);
                    maxHeight = clipBounds.height > maxHeight ? clipBounds.height : maxHeight;
                    var totalWantedWidth = posX + clipBounds.width + interval.x + margin.right;
                    if (totalWantedWidth > targetBounds.x + maxWidth || numCols > cols) {
                        numCols = 1;
                        totalWidth = posX + margin.right - targetBounds.x;
                        posX = targetBounds.x + margin.left;
                        posY += maxHeight + interval.y;
                    } else {
                        totalWidth = totalWantedWidth - targetBounds.x;
                    }
                    finalWidth = totalWidth > finalWidth ? totalWidth : finalWidth;
                    clip.nextTransform = { x: posX, y: posY };
                    posX += clipBounds.width + interval.x;
                }
                ;
                var offsetX = (maxWidth - finalWidth) / 2;
                for (var i = 0; i < comp.length; i++) {
                    clip = comp[i];
                    clip.nextTransform.x += offsetX;
                    var pt = clip.globalToLocal(clip.nextTransform.x, clip.nextTransform.y);
                    clip.x = pt.x;
                    clip.y = pt.y;
                }
            }
        }, {
            key: "centerGlobal",
            value: function centerGlobal(_ref7) {
                var comp = _ref7.comp;
                var target = _ref7.target;

                console.log("centerGlobal");
                for (var i = 0; i < comp.length; i++) {
                    this.center({ comp: [comp[i]], target: this.getGlobalBounds(target) });
                }
                ;
            }
        }, {
            key: "getBounds",
            value: function getBounds(comp, comp2) {
                return {
                    x: comp.localToLocal(0, 0, comp2).x,
                    y: comp.localToLocal(0, 0, comp2).y,
                    width: comp.localToLocal(comp.width, 0, comp2).x - comp.localToLocal(0, 0, comp2).x,
                    height: comp.localToLocal(0, comp.height, comp2).y - comp.localToLocal(0, 0, comp2).y
                };
            }
        }, {
            key: "getGlobalBounds",
            value: function getGlobalBounds(comp) {
                return {
                    x: comp.localToGlobal(0, 0).x,
                    y: comp.localToGlobal(0, 0).y,
                    width: comp.localToGlobal(comp.width, 0).x - comp.localToGlobal(0, 0).x,
                    height: comp.localToGlobal(0, comp.height).y - comp.localToGlobal(0, 0).y
                };
            }
        }, {
            key: "center",
            value: function center(_ref8) {
                var comp = _ref8.comp;
                var target = _ref8.target;

                console.log("center", target, comp);
                var targetBounds = { xc: target.x + target.width / 2, yc: target.y + target.height / 2 };
                for (var i = 0; i < comp.length; i++) {
                    comp[i].x = targetBounds.xc - comp[i].width / 2;
                    comp[i].y = targetBounds.yc - comp[i].height / 2;
                }
                ;
            }
        }, {
            key: "centerH",
            value: function centerH(_ref9) {
                var targets = _ref9.targets;
                var ref = _ref9.ref;

                for (var i = 0; i < targets.length; i++) {
                    console.log("targets[i].x : ", targets[i].x, targets[i].width / 2, ref.width);
                    targets[i].x = ref.width - targets[i].width / 2;
                }
                ;
            }
        }, {
            key: "centerV",
            value: function centerV(_ref10) {
                var comp = _ref10.comp;
                var target = _ref10.target;

                console.log("centerV", target);
                var targetBounds = { xc: target.x + target.width / 2, yc: target.y + target.height / 2 };
                for (var i = 0; i < comp.length; i++) {
                    comp[i].y = targetBounds.yc - comp[i].height / 2;
                }
                ;
            }
        }, {
            key: "enqueueHCenter",
            value: function enqueueHCenter(_ref11) {
                var targets = _ref11.targets;
                var ref = _ref11.ref;
                var _ref11$margin = _ref11.margin;
                var margin = _ref11$margin === undefined ? 0 : _ref11$margin;

                var totalW = 0;
                for (var i = 0; i < targets.length; i++) {
                    totalW += targets[i].width + (i == targets.length - 1 ? 0 : margin);
                }
                ;
                var xPos = ref.x + ref.width / 2 - totalW / 2;
                for (var i = 0; i < targets.length; i++) {
                    targets[i].x = xPos;
                    xPos += targets[i].width + (i == targets.length - 1 ? 0 : margin);
                }
                ;
            }
        }, {
            key: "enqueueVCenter",
            value: function enqueueVCenter(_ref12) {
                var comp = _ref12.comp;
                var target = _ref12.target;
                var _ref12$margin = _ref12.margin;
                var margin = _ref12$margin === undefined ? 0 : _ref12$margin;

                var totalH = 0;
                for (var i = 0; i < comp.length; i++) {
                    totalH += comp[i].height + (i == comp.length - 1 ? 0 : margin);
                }
                ;
                var yPos = target.y + target.height / 2 - totalH / 2;
                for (var i = 0; i < comp.length; i++) {
                    comp[i].y = yPos;
                    yPos += comp[i].height + (i == comp.length - 1 ? 0 : margin);
                }
                ;
            }
        }, {
            key: "enqueueH",
            value: function enqueueH(_ref13) {
                var comp = _ref13.comp;
                var target = _ref13.target;
                var _ref13$margin = _ref13.margin;
                var margin = _ref13$margin === undefined ? 0 : _ref13$margin;

                var xPos = target.x + target.width + margin;
                for (var i = 0; i < comp.length; i++) {
                    comp[i].x = xPos;
                    xPos += comp[i].width + margin;
                }
                ;
            }
        }, {
            key: "enqueueV",
            value: function enqueueV(_ref14) {
                var comp = _ref14.comp;
                var target = _ref14.target;
                var _ref14$margin = _ref14.margin;
                var margin = _ref14$margin === undefined ? 0 : _ref14$margin;

                var yPos = target.y + target.height + margin;
                for (var i = 0; i < comp.length; i++) {
                    comp[i].y = yPos;
                    yPos += comp[i].height + margin;
                }
                ;
            }
        }, {
            key: "align",
            value: function align(_ref15) {
                var ref = _ref15.ref;
                var targets = _ref15.targets;

                var alignObj;
                for (var i = 0; i < targets.length; i++) {
                    alignObj = {
                        x: (targets[i].alignX || "none").replace("center", "centerX"),
                        y: (targets[i].alignY || "none").replace("center", "centerY")
                    };
                    this["align_" + alignObj.x]({ target: targets[i], ref: ref });
                    this["align_" + alignObj.y]({ target: targets[i], ref: ref });
                }
                ;
            }
        }, {
            key: "align_none",
            value: function align_none(_ref16) {
                var ref = _ref16.ref;
                var target = _ref16.target;
            }
        }, {
            key: "align_left",
            value: function align_left(_ref17) {
                var ref = _ref17.ref;
                var target = _ref17.target;

                target.x = 0;
            }
        }, {
            key: "align_top",
            value: function align_top(_ref18) {
                var ref = _ref18.ref;
                var target = _ref18.target;

                target.y = 0;
            }
        }, {
            key: "align_bottom",
            value: function align_bottom(_ref19) {
                var ref = _ref19.ref;
                var target = _ref19.target;

                target.y = ref.height - target.height;
            }
        }, {
            key: "align_right",
            value: function align_right(_ref20) {
                var ref = _ref20.ref;
                var target = _ref20.target;

                target.x = ref.width - target.width;
            }
        }, {
            key: "align_centerX",
            value: function align_centerX(_ref21) {
                var ref = _ref21.ref;
                var target = _ref21.target;

                target.x = ref.width / 2 - target.width / 2;
            }
        }, {
            key: "align_centerY",
            value: function align_centerY(_ref22) {
                var ref = _ref22.ref;
                var target = _ref22.target;

                target.y = ref.height / 2 - target.height / 2;
            }
        }, {
            key: "alignLeft",
            value: function alignLeft(_ref23) {
                var comp = _ref23.comp;
                var target = _ref23.target;

                var xPos = target.x;
                for (var i = 0; i < comp.length; i++) {
                    comp[i].x = xPos;
                }
                ;
            }
        }, {
            key: "alignTop",
            value: function alignTop(_ref24) {
                var comp = _ref24.comp;
                var target = _ref24.target;

                var yPos = target.y;
                for (var i = 0; i < comp.length; i++) {
                    comp[i].y = yPos;
                }
                ;
            }
        }, {
            key: "alignBottom",
            value: function alignBottom(_ref25) {
                var comp = _ref25.comp;
                var target = _ref25.target;

                var yPos = target.y + target.height;
                for (var i = 0; i < comp.length; i++) {
                    comp[i].y = yPos - comp[i].height;
                }
                ;
            }
        }, {
            key: "alignRight",
            value: function alignRight(_ref26) {
                var comp = _ref26.comp;
                var target = _ref26.target;

                var xPos = target.y + target.width;
                for (var i = 0; i < comp.length; i++) {
                    comp[i].x = xPos - comp[i].width;
                }
                ;
            }
        }, {
            key: "fitIn",
            value: function fitIn(_ref27) {
                var comp = _ref27.comp;
                var target = _ref27.target;

                var targetBounds = { xc: target.x + target.width / 2, yc: target.y + target.height / 2 };
                for (var i = 0; i < comp.length; i++) {
                    if (comp[i].width / target.width > comp[i].height / target.height) {
                        comp[i].ratioWidth = target.width;
                    } else {
                        comp[i].ratioHeight = target.height;
                    }
                    comp[i].x = targetBounds.xc - comp[i].width / 2;
                    comp[i].y = targetBounds.yc - comp[i].height / 2;
                }
                ;
            }
        }]);

        return Disposition;
    }();

    exports.default = Disposition;
});
//# sourceMappingURL=Disposition.js.map