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

									var Snippets = function () {
																		function Snippets() {
																											_classCallCheck(this, Snippets);

																											this._snippets = {
																																				Group: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Group\",\n\t\t\t    \"children\": [\n\t\t\t    ]\n\t\t\t},\n\t\t\t",
																																				DataGroup: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"DataGroup\",\n\t\t\t    \"children\": [\n\t\t\t    ]\n\t\t\t},\n\t\t\t",
																																				DataObject: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"DataObject\",\n\t\t\t    \"children\": [\n\t\t\t    ]\n\t\t\t},\n\t\t\t",
																																				Separator: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Separator\",\n\t\t\t    \"description\": \"\"\n\t\t\t},\n\t\t\t",
																																				Text: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Text\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"editable\": true,\n\t\t\t    \"value\": \"\"\n\t\t\t},\n\t\t\t",
																																				FontsList: "              \n\t\t\t\t{\n                    \"id\": \"AppFontsList\",\n                    \"type\": \"ListItem\",\n                    \"fontsList\": true,\n                    \"visible\": false,\n                    \"value\": \"CoconOT-Regular\",\n                    \"options\": [\n                        \"CoconOT-Regular\",\n                        \"MuseoSans-500\"\n                    ]\n                },\n            ",
																																				TextStyle: "              \n                {\n                     \"id\": \"StyleText1\",\n                     \"type\": \"TextStyle\",\n                     \"fontsList\": \"AppFontsList\",\n                     \"value\": {\n                         \"fontFamily\": \"MuseoSans-500\",\n                         \"color\": \"#000000\",\n                         \"bold\": false,\n                         \"italic\": false,\n                         \"fontSize\": 20,\n                         \"textAlign\": \"left\",\n                         \"overflow\": \"auto\"\n                     }\n                 },\n            ",
																																				Boolean: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Boolean\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"editable\": true,\n\t\t\t    \"value\": false\n\t\t\t},\n\t\t\t",
																																				Number: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Number\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"editable\": true,\n\t\t\t    \"value\": \"\"\n\t\t\t},\n\t\t\t",
																																				ComboBox: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"ComboBox\",\n\t\t\t    \"editable\": true,\n\t\t\t    \"description\": \"\",\n\t\t\t    \"value\": \"option1\",\n\t\t\t    \"options\": [\n\t\t\t        \"option1\",\n\t\t\t        \"option2\"\n\t\t\t    ]\n\t\t\t},\n\t\t\t",
																																				Point: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Rectangle\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"editable\": true,\n\t\t\t    \"value\": {\n\t\t\t        \"x\": 0,\n\t\t\t        \"y\": 0\n\t\t\t    }\n\t\t\t},\n\t\t\t",
																																				Rectangle: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Rectangle\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"editable\": true,\n\t\t\t    \"value\": {\n\t\t\t        \"x\": 0,\n\t\t\t        \"y\": 0,\n\t\t\t        \"width\": 100,\n\t\t\t        \"height\": 100\n\t\t\t    }\n\t\t\t},\n\t\t\t",
																																				Sound: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Sound\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"asset\": {\n\t\t\t        \"src\": \"sounds/fr/SOUND.mp3\"\n\t\t\t    }\n\t\t\t},\n\t\t\t",
																																				SoundMulti: "\n\t\t\t{\n\t\t\t    \"id\": \"ID##\",\n\t\t\t    \"type\": \"Sound\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"start\": 1,\n\t\t\t    \"end\": 3\n\t\t\t    \"asset\": {\n\t\t\t        \"src\": \"sounds/fr/ID##.mp3\"\n\t\t\t    }\n\t\t\t},\n\t\t\t",
																																				Image: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"Image\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"asset\": {\n\t\t\t        \"src\": \"images/IMAGE.png\"\n\t\t\t    }\n\t\t\t},\n\t\t\t",
																																				ImageMulti: "\n\t\t\t{\n\t\t\t    \"id\": \"ID##\",\n\t\t\t    \"type\": \"Image\",\n\t\t\t    \"description\": \"\",\n\t\t\t    \"start\": 1,\n\t\t\t    \"end\": 3\n\t\t\t    \"asset\": {\n\t\t\t        \"src\": \"images/ID##.png\"\n\t\t\t    }\n\t\t\t},\n\t\t\t",
																																				Video: "   \n\t\t\t{\n                \"id\": \"ID\",\n                \"type\": \"Video\",\n                \"description\": \"\",\n                \"asset\": {\n                    \"preload\": false,\n                    \"src\": \"videos/ID.mp4\"\n                }\n            },\n\t\t\t",
																																				FlashScreen: "\n\t\t\t{\n\t\t\t    \"id\": \"FLASHSCREEN\",\n\t\t\t    \"type\": \"DataGroup\",\n\t\t\t    \"children\": [\n\t\t\t        {\n\t\t\t            \"id\": \"SCREEN\",\n\t\t\t            \"type\": \"Flashtml\",\n\t\t\t            \"asset\": {\n\t\t\t                \"preload\": true,\n\t\t\t                \"src\": \"SUMMARY/SCREEN_SUMMARY\",\n\t\t\t                \"type\": \"Flashtml\",\n\t\t\t                \"compType\": \"Flashtml\"\n\t\t\t            }\n\t\t\t        },\n\t\t\t        {\n\t\t\t            \"id\": \"CONFIG\",\n\t\t\t            \"type\": \"FlashtmlPack\",\n\t\t\t            \"value\": {\n\t\t\t                \"resourceID\": \"SUMMARY.FLASHSCREEN.SCREEN\",\n\t\t\t                \"framerate\": 24,\n\t\t\t                \"optimised\": false\n\t\t\t            },\n\t\t\t            \"preview\": false\n\t\t\t        }\n\t\t\t    ]\n\t\t\t },\n\t\t\t",
																																				FlashScreenDataGroup: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"DataGroup\",\n\t\t\t    \"children\": [\n\t\t\t\t    {\n\t\t\t\t        \"id\": \"FLASHSCREEN\",\n\t\t\t\t        \"type\": \"DataGroup\",\n\t\t\t\t        \"children\": [\n\t\t\t\t            {\n\t\t\t\t                \"id\": \"SCREEN\",\n\t\t\t\t                \"type\": \"Flashtml\",\n\t\t\t\t                \"asset\": {\n\t\t\t\t                    \"preload\": true,\n\t\t\t\t                    \"src\": \"ID/ID\",\n\t\t\t\t                    \"type\": \"Flashtml\",\n\t\t\t\t                    \"compType\": \"Flashtml\"\n\t\t\t\t                }\n\t\t\t\t            },\n\t\t\t\t            {\n\t\t\t\t                \"id\": \"CONFIG\",\n\t\t\t\t                \"type\": \"FlashtmlPack\",\n\t\t\t\t                \"value\": {\n\t\t\t\t                    \"resourceID\": \"ID.FLASHSCREEN.SCREEN\",\n\t\t\t\t                    \"framerate\": 24,\n\t\t\t\t                    \"optimised\": false\n\t\t\t\t                },\n\t\t\t\t                \"preview\": false\n\t\t\t\t            }\n\t\t\t\t        ]\n\t\t\t\t    }\n\t\t\t    ]\n\t\t\t},\n\n\t\t\t",
																																				Class: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"class\",\n\t\t\t    \"src\": \"src/game/CLASSNAME_NO_EXTENSION\"\n\t\t\t},\n\t\t\t",
																																				QuizData: "\n\t\t\t{\n\t\t\t    \"id\": \"ID\",\n\t\t\t    \"type\": \"QuizData\",\n\t\t\t    \"availableTypes\": \"*\",\n\t\t\t    \"children\": []\n\t\t\t},\n\t\t\t"
																											};
																		}

																		_createClass(Snippets, [{
																											key: "getSnippet",
																											value: function getSnippet(snippetID) {
																																				return { id: snippetID, value: this._snippets[snippetID] };
																											}
																		}, {
																											key: "getAll",
																											value: function getAll() {
																																				var results = [];
																																				for (var prop in this._snippets) {
																																													results.push({ id: prop, value: this._snippets[prop] });
																																				}
																																				return results;
																											}
																		}]);

																		return Snippets;
									}();

									exports.default = Snippets;
});
//# sourceMappingURL=Snippets.js.map