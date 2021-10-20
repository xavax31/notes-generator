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

    var FlashClipLabelManager = function (_Component) {
        _inherits(FlashClipLabelManager, _Component);

        function FlashClipLabelManager(dataObject) {
            _classCallCheck(this, FlashClipLabelManager);

            var _this = _possibleConstructorReturn(this, (FlashClipLabelManager.__proto__ || Object.getPrototypeOf(FlashClipLabelManager)).call(this, Object.assign({ target: null }, dataObject)));

            _this.target = _this.dataObject.target;
            _this._callback = null;
            _this.currentLabel;
            _this.actions = [];
            _this.mainAction = "sound";
            return _this;
        }

        _createClass(FlashClipLabelManager, [{
            key: "check",
            value: function check(_ref) {
                var callback = _ref.callback;

                this._callback = callback;
                var labelToTest = this.target.view.getCurrentLabel();
                actions = [];
                console.log("check " + this.currentLabel + ", " + labelToTest);
                if (labelToTest == null) {
                    return;
                }
                if (labelToTest !== this.currentLabel) {
                    console.log("NEW LABEL : " + labelToTest);
                    this.target.view.stop();
                    currentLabel = labelToTest;

                    this._playComment();
                    this._playAnimsOnce();

                    this._callCustomFunction();
                }
            }
        }, {
            key: "_callCustomFunction",
            value: function _callCustomFunction() {
                if (this.target.actions[currentLabel] != undefined) {
                    this.target.actions[currentLabel]();
                } else {
                        try {
                            console.log("src/" + currentLabel);
                            require("src/" + currentLabel)();
                        } catch (err) {}
                    }
            }
        }, {
            key: "_playComment",
            value: function _playComment() {
                var _this2 = this;

                var commentFounded = false;
                var commentId = "S_" + this.currentLabel.substr(1);
                var resource = this.jx.findOne({ id: commentId, type: "Sound" });
                if (resource) {
                    this.jx.dj.voice.play({ id: commentId, zap: "ZAP", onfinished: function onfinished(evt) {
                            _this2._finish(_this2, commentId);
                        } });
                    actions.push({
                        id: commentId,
                        type: "sound"
                    });
                }
                ;
            }
        }, {
            key: "_playAnimsOnce",
            value: function _playAnimsOnce() {
                var anims = this.jx.tools.cjs.getChildrenByName(this.target.view, "^anim_");

                for (var i = 0; i < anims.length; i++) {
                    var anim = new xen.Clip({
                        clip: anims[i]
                    });
                    actionID = anim.clip.name;
                    actions.push({
                        id: actionID,
                        type: "anim"
                    });

                    anim.play(0, anim.totalFrames, this._finish.bind(this, actionID));
                }
            }
        }, {
            key: "_showTextes",
            value: function _showTextes() {}
        }, {
            key: "_showPhotos",
            value: function _showPhotos() {}
        }, {
            key: "_showVideos",
            value: function _showVideos() {}
        }, {
            key: "_finish",
            value: function _finish(actionID) {
                if (actionID.type === this.mainAction) {}
                console.log("finish " + actionID);
                for (var i = 0; i < actions.length; i++) {
                    if (actions[i].id == actionID) {
                        actions.splice(i, 1);
                    }
                    ;
                }
                ;
                if (actions.length == 0) {
                    this._callback.apply(this.target, [{
                        event: "finished"
                    }]);
                }
            }
        }]);

        return FlashClipLabelManager;
    }(_Component3.default);

    exports.default = FlashClipLabelManager;
});
//# sourceMappingURL=FlashClipLabelManager.js.map