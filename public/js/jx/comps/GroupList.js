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

    var GroupList = function (_Component) {
        _inherits(GroupList, _Component);

        function GroupList(dataObject) {
            _classCallCheck(this, GroupList);

            var _this = _possibleConstructorReturn(this, (GroupList.__proto__ || Object.getPrototypeOf(GroupList)).call(this, Object.assign({
                shuffleGroups: true,
                shuffleChildren: true
            }, dataObject)));

            _this._groups = [];
            _this._index = -1;
            _this.loops = -1;
            var group;
            for (var groupIndex = 0; groupIndex < _this.dataObject.groups; groupIndex++) {
                group = { index: groupIndex, children: [] };
                for (var childIndex = 0; childIndex < _this.dataObject.children; childIndex++) {
                    group.children.push({ index: childIndex, group: groupIndex });
                }
                _this._groups.push(group);
            }
            ;
            _this.shuffleGroups = _this.dataObject.shuffleGroups;
            _this.shuffleChildren = _this.dataObject.shuffleChildren;
            _this.randomAll();
            return _this;
        }

        _createClass(GroupList, [{
            key: "next",
            value: function next() {
                var numGroups = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

                var groups = [];
                var children = [];
                for (var i = 0; i < numGroups; i++) {
                    var nextGroup = this._nextOne();
                    if (nextGroup == null) {
                        console.log("end of list reached");
                        break;
                    }
                    groups.push(nextGroup);
                    children = children.concat(nextGroup.children);
                }
                ;
                return { groups: this._randomiseArray(groups), children: this.shuffleChildren ? this._randomiseArray(children) : children };
            }
        }, {
            key: "_nextOne",
            value: function _nextOne() {
                this._index++;
                if (this._index >= this._groups.length) {
                    if (this.loops == -1) {
                        this._index = 0;
                    } else {
                        return null;
                    }
                }
                return this._groups[this._index];
            }
        }, {
            key: "log",
            value: function log() {
                var trace = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

                var result = "";
                for (var i = 0; i < this._groups.length; i++) {
                    result += "Group : " + this._groups[i].index;
                    result += "\tchildren: ";
                    for (var j = 0; j < this._groups[i].children.length; j++) {
                        result += "\t" + this._groups[i].children[j].index;
                    }
                    ;
                    result += "\n";
                }
                ;
                if (trace) console.log(result);
                return result;
            }
        }, {
            key: "logItems",
            value: function logItems(items) {
                var trace = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

                console.log(items, items.length);
                var result = "";
                for (var i = 0; i < items.length; i++) {
                    result += this.jx.tools.gd(items[i].group, 2) + "_" + this.jx.tools.gd(items[i].index, 2);
                    result += "\n";
                }
                ;
                if (trace) console.log(result);
                return result;
            }
        }, {
            key: "randomAll",
            value: function randomAll() {
                this._groups = this.shuffleGroups ? this._randomiseArray(this._groups) : this._groups;
                var group, child;
                for (var groupIndex = 0; groupIndex < this._groups.length; groupIndex++) {
                    group = this._groups[groupIndex];
                    group.children = this.shuffleChildren ? this._randomiseArray(group.children) : group.children;
                }
                ;
            }
        }, {
            key: "_randomiseArray",
            value: function _randomiseArray(myList) {
                var lList = myList.slice();
                var randomList = [];
                var randomPos;
                var boucleLength = lList.length;
                for (var i = 0; i < boucleLength; i++) {
                    randomPos = this._randomValue(0, lList.length - 1);
                    randomList.push(lList[randomPos]);
                    lList.splice(randomPos, 1);
                }
                return randomList;
            }
        }, {
            key: "_randomValue",
            value: function _randomValue(min, max) {
                var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                return randomNum;
            }
        }, {
            key: "reset",
            value: function reset() {
                this._index = -1;
            }
        }, {
            key: "groups",
            get: function get() {
                return this._groups;
            }
        }]);

        return GroupList;
    }(_Component3.default);

    exports.default = GroupList;
});
//# sourceMappingURL=GroupList.js.map