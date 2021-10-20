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

				var EditorCode = function (_Component) {
								_inherits(EditorCode, _Component);

								function EditorCode(dataObject) {
												_classCallCheck(this, EditorCode);

												var _this = _possibleConstructorReturn(this, (EditorCode.__proto__ || Object.getPrototypeOf(EditorCode)).call(this, dataObject));

												_this.mainView = _this.mainView;
												_this.editView = _this.editView.find("#gabaritEditor");
												return _this;
								}

								_createClass(EditorCode, [{
												key: "_create",
												value: function _create() {
																var _this2 = this;

																_get(EditorCode.prototype.__proto__ || Object.getPrototypeOf(EditorCode.prototype), "_create", this).call(this);
																this.mainView.find("#search").on("input", function (evt) {
																				console.log(evt);

																				if (evt.target.value.search(/^\$[0-9]+$/) != -1) {
																								_this2.gabaritEditor.gotoLine(Number(evt.target.value.replace(/^\$/, "")));
																				} else {
																								_this2.gabaritEditor.find(evt.target.value, {
																												backwards: false,
																												wrap: true,
																												caseSensitive: false,
																												wholeWord: false,
																												regExp: false
																								});
																				}
																});
																this.mainView.find("#searchNext").on("click", function (evt) {
																				console.log(evt);
																				_this2.gabaritEditor.findNext();
																});
																this.mainView.find("#searchPrevious").on("click", function (evt) {
																				console.log(evt);
																				_this2.gabaritEditor.findPrevious();
																});
																var addItemFunc = function addItemFunc(evt) {
																				var type = $(evt.target).data("action").type;
																				console.log("action", type);
																				var itemsSnippets = {
																								Group: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Group\",\n\t\t\t\t\t    \"children\": [\n\t\t\t\t\t    ]\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Separator: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Separator\",\n\t\t\t\t\t    \"description\": \"\"\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Text: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Text\",\n\t\t\t\t\t    \"description\": \"\",\n\t\t\t\t\t    \"editable\": true,\n\t\t\t\t\t    \"value\": \"\"\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Boolean: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Boolean\",\n\t\t\t\t\t    \"description\": \"\",\n\t\t\t\t\t    \"editable\": true,\n\t\t\t\t\t    \"value\": false\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Number: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Number\",\n\t\t\t\t\t    \"description\": \"\",\n\t\t\t\t\t    \"editable\": true,\n\t\t\t\t\t    \"value\": \"\"\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Point: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Rectangle\",\n\t\t\t\t\t    \"description\": \"\",\n\t\t\t\t\t    \"editable\": true,\n\t\t\t\t\t    \"value\": {\n\t\t\t\t\t        \"x\": 0,\n\t\t\t\t\t        \"y\": 0\n\t\t\t\t\t    }\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Rectangle: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Rectangle\",\n\t\t\t\t\t    \"description\": \"\",\n\t\t\t\t\t    \"editable\": true,\n\t\t\t\t\t    \"value\": {\n\t\t\t\t\t        \"x\": 0,\n\t\t\t\t\t        \"y\": 0,\n\t\t\t\t\t        \"width\": 100,\n\t\t\t\t\t        \"height\": 100\n\t\t\t\t\t    }\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Sound: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Sound\",\n\t\t\t\t\t    \"description\": \"\",\n\t\t\t\t\t    \"asset\": {\n\t\t\t\t\t        \"src\": \"sounds/fr/SOUND.mp3\"\n\t\t\t\t\t    }\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Image: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"Image\",\n\t\t\t\t\t    \"description\": \"\",\n\t\t\t\t\t    \"asset\": {\n\t\t\t\t\t        \"src\": \"images/IMAGE.png\"\n\t\t\t\t\t    }\n\t\t\t\t\t},\n\t\t\t\t\t",
																								ScreenFla: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"NAME_SCREEN_GROUP\",\n\t\t\t\t\t    \"type\": \"Group\",\n\t\t\t\t\t    \"children\": [\n\t\t\t\t\t    {\n\t\t\t\t\t        \"id\": \"PACKID_CONFIG\",\n\t\t\t\t\t        \"type\": \"FlashtmlPack\",\n\t\t\t\t\t        \"description\": \"\",\n\t\t\t\t\t        \"editable\": true,\n\t\t\t\t\t        \"value\": {\n\t\t\t\t\t            \"resourceID\": \"ID\",\n\t\t\t\t\t            \"framerate\": 12,\n\t\t\t\t\t            \"optimised\": false\n\t\t\t\t\t        },\n\t\t\t\t\t        \"preview\": true\n\t\t\t\t\t    },\n\t\t\t\t\t    {\n\t\t\t\t\t        \"id\": \"PACKID\",\n\t\t\t\t\t        \"type\": \"Flashtml\",\n\t\t\t\t\t        \"description\": \"\",\n\t\t\t\t\t        \"asset\": {\n\t\t\t\t\t            \"src\": \"flashtml/PACKID\",\n\t\t\t\t\t            \"type\": \"Flashtml\",\n\t\t\t\t\t            \"compType\": \"Flashtml\"\n\t\t\t\t\t        },\n\t\t\t\t\t        \"editable\": true,\n\t\t\t\t\t        \"visible\": true\n\t\t\t\t\t    }\n\t\t\t\t\t    ]\n\t\t\t\t\t},\n\t\t\t\t\t",
																								Class: "\n\t\t\t\t\t{\n\t\t\t\t\t    \"id\": \"ID\",\n\t\t\t\t\t    \"type\": \"class\",\n\t\t\t\t\t    \"src\": \"src/game/CLASSNAME_NO_EXTENSION\"\n\t\t\t\t\t},\n\t\t\t\t"
																				};
																				_this2.gabaritEditor.insert(itemsSnippets[type]);
																};
																this.mainView.find("#addGroup").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addSeparator").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addImage").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addSound").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addText").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addScreenFla").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addClass").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addNumber").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addBoolean").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addPoint").on("click", function (evt) {
																				return addItemFunc(evt);
																});
																this.mainView.find("#addRectangle").on("click", function (evt) {
																				return addItemFunc(evt);
																});

																this.editView.css('position', "absolute");

																this.gabaritEditor = ace.edit(this.editView[0]);
																this.gabaritEditor.setOptions({
																				wrap: true
																});
																this.gabaritEditor.$blockScrolling = Infinity;
																this.gabaritEditor.setTheme("ace/theme/eclipse");
																this.gabaritEditor.getSession().setMode("ace/mode/json");
																this.gabaritEditor.getSession().on("changeAnnotation", function () {
																				_this2._gabaritEditorErrors = _this2.gabaritEditor.getSession().getAnnotations();
																});

																var jsonResource = this.project.getJSON();
																this.gabaritEditor.setValue(JSON.stringify(jsonResource, null, 4));
																this.gabaritEditorLastPosition = this.gabaritEditorLastPosition || { row: 0, column: 1 };
																this.gabaritEditor.moveCursorToPosition(this.gabaritEditorLastPosition);
												}
								}]);

								return EditorCode;
				}(_Component3.default);

				exports.default = EditorCode;
});
//# sourceMappingURL=EditorCode.js.map