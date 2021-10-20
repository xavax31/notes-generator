define(['exports'], function (exports) {
    'use strict';

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

    var presets = {
        Shadow: {
            color: '#000000',
            size: 5,
            blur: 40
        },
        SimpleBorder: {
            color: '#ffff00',
            size: 5,
            blur: 5
        },
        LargeBlur: {
            color: '#ffff00',
            size: 10,
            blur: 20
        },
        Halo: {
            color: '#ffff00',
            size: 10,
            blur: 50
        },
        VeryLargeBlur: {
            color: '#ffff00',
            size: 10,
            blur: 100
        },
        Cartoon: {
            color: '#ffff00',
            size: 6,
            blur: 5
        }
    };

    var LightBorder = function () {
        function LightBorder() {
            _classCallCheck(this, LightBorder);
        }

        _createClass(LightBorder, null, [{
            key: 'apply',
            value: function apply(obj, params) {
                params = params || {};

                var preset = presets[params.preset || 'SimpleBorder'];
                for (var prop in params) {
                    preset[prop] = params[prop];
                }

                preset.rgbColor = LightBorder.hexToRGB(preset.color);

                obj.shadow = new createjs.Shadow(preset.color, preset.size, preset.size, preset.blur);
                obj.cache(0, 0, obj.getBounds().width, obj.getBounds().height);
            }
        }, {
            key: 'cancel',
            value: function cancel(obj) {
                obj.shadow = null;
                obj.uncache();
            }
        }, {
            key: 'hexToRGB',
            value: function hexToRGB(hexValue) {
                function cutHex(h) {
                    return h.charAt(0) == "#" ? h.substring(1, 7) : h;
                }
                return {
                    r: parseInt(cutHex(hexValue).substring(0, 2), 16),
                    g: parseInt(cutHex(hexValue).substring(2, 4), 16),
                    b: parseInt(cutHex(hexValue).substring(4, 6), 16)
                };
            }
        }]);

        return LightBorder;
    }();

    exports.default = LightBorder;
});
//# sourceMappingURL=LightBorder.js.map