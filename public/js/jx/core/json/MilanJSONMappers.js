define(["exports", "jx/core/Resource"], function (exports, _Resource) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Resource2 = _interopRequireDefault(_Resource);

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

    var MilanJSONMapper = function () {
        function MilanJSONMapper(json) {
            _classCallCheck(this, MilanJSONMapper);

            this.json = json;
        }

        _createClass(MilanJSONMapper, [{
            key: "getResources",
            value: function getResources() {
                var resourceInfos = this.json["entry-point"][this.getEntryPointPath()]["resources"];
                var resourceArray = [];
                for (var i = 0; i < resourceInfos.length; i++) {
                    var resourceInfo = resourceInfos[i];
                    var resource = new _Resource2.default(resourceInfo);
                    resourceArray.push(resource);
                }
                return resourceArray;
            }
        }, {
            key: "getStyles",
            value: function getStyles() {
                return this.json["entry-point"][this.getEntryPointPath()]["styles"] || [];
            }
        }, {
            key: "getEntryPointPath",
            value: function getEntryPointPath() {
                for (var modulejsonName in this.json["entry-point"]) {
                    return modulejsonName;
                    break;
                }
            }
        }]);

        return MilanJSONMapper;
    }();

    exports.default = MilanJSONMapper;
});
//# sourceMappingURL=MilanJSONMappers.js.map