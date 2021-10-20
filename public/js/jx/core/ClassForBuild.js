define(["exports", "jx/core/Launcher", "jx/core/memos/MemoManager", "jx/core/memos/MemoAbstract", "jx/core/memos/MemoCookie", "jx/core/memos/MemoLocalStorage", "jx/core/FXManager", "jx/core/sound/SoundManager", "jx/comps/BusyScreen", "jx/projecttypes/simplejson/Importer", "jx/core/layout/Layout", "jx/core/Request", "jx/core/Debugger", "jx/core/utils/List", "jx/core/transitions/TransitionManager", "jx/core/transitions/SwapTransition", "jx/core/loaders/JSONLoader", "jx/core/loaders/ImageLoader", "jx/core/loaders/SoundLoader", "jx/core/loaders/SoundLoaderMediaElement", "jx/core/loaders/TextLoader", "jx/core/loaders/FlashtmlLoader", "jx/core/loaders/ImageSequenceLoader", "jx/core/loaders/SpriteSheetLoader", "jx/comps/flashlib/FlashLib", "jx/comps/StageView", "jx/comps/SimpleDOMView", "jx/comps/visualcomponent/VisualComponentCJS", "jx/comps/visualcomponent/VisualComponentDOM", "jx/comps/Container", "jx/comps/container/ContainerCJS", "jx/comps/container/ContainerDOM", "jx/comps/shape/ShapeCJS", "jx/comps/image/ImageCJS", "jx/comps/image/ImageDOM", "jx/comps/imagesequence/ImageSequenceCJS", "jx/comps/imagesequence/ImageSequenceDOM", "jx/comps/text/TextCJS", "jx/comps/text/TextDOM", "jx/comps/text/TextMultiRender", "jx/comps/clip/ClipCJS", "jx/comps/video/VideoDOM", "jx/comps/StartButton", "jx/comps/InputNumber", "jx/comps/InputText", "jx/comps/simplebutton/SimpleButtonDOM", "jx/comps/simplebutton/SimpleButtonCJS", "jx/core/presets/StageGameModule", "jx/comps/GroupList", "jx/comps/screensmanager/ScreensManager", "jx/comps/screensmanager/ScreenVideo", "jx/comps/screensmanager/ScreenPhoto"], function (exports, _Launcher, _MemoManager, _MemoAbstract, _MemoCookie, _MemoLocalStorage, _FXManager, _SoundManager, _BusyScreen, _Importer, _Layout, _Request, _Debugger, _List, _TransitionManager, _SwapTransition, _JSONLoader, _ImageLoader, _SoundLoader, _SoundLoaderMediaElement, _TextLoader, _FlashtmlLoader, _ImageSequenceLoader, _SpriteSheetLoader, _FlashLib, _StageView, _SimpleDOMView, _VisualComponentCJS, _VisualComponentDOM, _Container, _ContainerCJS, _ContainerDOM, _ShapeCJS, _ImageCJS, _ImageDOM, _ImageSequenceCJS, _ImageSequenceDOM, _TextCJS, _TextDOM, _TextMultiRender, _ClipCJS, _VideoDOM, _StartButton, _InputNumber, _InputText, _SimpleButtonDOM, _SimpleButtonCJS, _StageGameModule, _GroupList, _ScreensManager, _ScreenVideo, _ScreenPhoto) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Launcher = exports.MemoLocalStorage = exports.MemoCookie = exports.MemoAbstract = exports.MemoManager = exports.FXManager = exports.SoundManager = exports.BusyScreen = exports.Importer = exports.Layout = exports.Request = exports.Debugger = exports.List = exports.TransitionManager = exports.SwapTransition = exports.JSONLoader = exports.ImageLoader = exports.SoundLoader = exports.SoundLoaderMediaElement = exports.TextLoader = exports.FlashtmlLoader = exports.ImageSequenceLoader = exports.SpriteSheetLoader = exports.FlashLib = exports.StageView = exports.VisualComponentCJS = exports.VisualComponentDOM = exports.Container = exports.ContainerCJS = exports.ContainerDOM = exports.ShapeCJS = exports.ImageCJS = exports.ImageDOM = exports.ImageSequenceCJS = exports.ImageSequenceDOM = exports.TextCJS = exports.TextDOM = exports.TextMultiRender = exports.ClipCJS = exports.VideoDOM = exports.StartButton = exports.InputNumber = exports.InputText = exports.SimpleDOMView = exports.SimpleButtonDOM = exports.SimpleButtonCJS = exports.StageGameModule = exports.GroupList = exports.ScreensManager = exports.ScreenVideo = exports.ScreenPhoto = undefined;

  var _Launcher2 = _interopRequireDefault(_Launcher);

  var _MemoManager2 = _interopRequireDefault(_MemoManager);

  var _MemoAbstract2 = _interopRequireDefault(_MemoAbstract);

  var _MemoCookie2 = _interopRequireDefault(_MemoCookie);

  var _MemoLocalStorage2 = _interopRequireDefault(_MemoLocalStorage);

  var _FXManager2 = _interopRequireDefault(_FXManager);

  var _SoundManager2 = _interopRequireDefault(_SoundManager);

  var _BusyScreen2 = _interopRequireDefault(_BusyScreen);

  var _Importer2 = _interopRequireDefault(_Importer);

  var _Layout2 = _interopRequireDefault(_Layout);

  var _Request2 = _interopRequireDefault(_Request);

  var _Debugger2 = _interopRequireDefault(_Debugger);

  var _List2 = _interopRequireDefault(_List);

  var _TransitionManager2 = _interopRequireDefault(_TransitionManager);

  var _SwapTransition2 = _interopRequireDefault(_SwapTransition);

  var _JSONLoader2 = _interopRequireDefault(_JSONLoader);

  var _ImageLoader2 = _interopRequireDefault(_ImageLoader);

  var _SoundLoader2 = _interopRequireDefault(_SoundLoader);

  var _SoundLoaderMediaElement2 = _interopRequireDefault(_SoundLoaderMediaElement);

  var _TextLoader2 = _interopRequireDefault(_TextLoader);

  var _FlashtmlLoader2 = _interopRequireDefault(_FlashtmlLoader);

  var _ImageSequenceLoader2 = _interopRequireDefault(_ImageSequenceLoader);

  var _SpriteSheetLoader2 = _interopRequireDefault(_SpriteSheetLoader);

  var _FlashLib2 = _interopRequireDefault(_FlashLib);

  var _StageView2 = _interopRequireDefault(_StageView);

  var _SimpleDOMView2 = _interopRequireDefault(_SimpleDOMView);

  var _VisualComponentCJS2 = _interopRequireDefault(_VisualComponentCJS);

  var _VisualComponentDOM2 = _interopRequireDefault(_VisualComponentDOM);

  var _Container2 = _interopRequireDefault(_Container);

  var _ContainerCJS2 = _interopRequireDefault(_ContainerCJS);

  var _ContainerDOM2 = _interopRequireDefault(_ContainerDOM);

  var _ShapeCJS2 = _interopRequireDefault(_ShapeCJS);

  var _ImageCJS2 = _interopRequireDefault(_ImageCJS);

  var _ImageDOM2 = _interopRequireDefault(_ImageDOM);

  var _ImageSequenceCJS2 = _interopRequireDefault(_ImageSequenceCJS);

  var _ImageSequenceDOM2 = _interopRequireDefault(_ImageSequenceDOM);

  var _TextCJS2 = _interopRequireDefault(_TextCJS);

  var _TextDOM2 = _interopRequireDefault(_TextDOM);

  var _TextMultiRender2 = _interopRequireDefault(_TextMultiRender);

  var _ClipCJS2 = _interopRequireDefault(_ClipCJS);

  var _VideoDOM2 = _interopRequireDefault(_VideoDOM);

  var _StartButton2 = _interopRequireDefault(_StartButton);

  var _InputNumber2 = _interopRequireDefault(_InputNumber);

  var _InputText2 = _interopRequireDefault(_InputText);

  var _SimpleButtonDOM2 = _interopRequireDefault(_SimpleButtonDOM);

  var _SimpleButtonCJS2 = _interopRequireDefault(_SimpleButtonCJS);

  var _StageGameModule2 = _interopRequireDefault(_StageGameModule);

  var _GroupList2 = _interopRequireDefault(_GroupList);

  var _ScreensManager2 = _interopRequireDefault(_ScreensManager);

  var _ScreenVideo2 = _interopRequireDefault(_ScreenVideo);

  var _ScreenPhoto2 = _interopRequireDefault(_ScreenPhoto);

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

  exports.ScreenPhoto = _ScreenPhoto2.default;
  exports.ScreenVideo = _ScreenVideo2.default;
  exports.ScreensManager = _ScreensManager2.default;
  exports.GroupList = _GroupList2.default;
  exports.StageGameModule = _StageGameModule2.default;
  exports.SimpleButtonCJS = _SimpleButtonCJS2.default;
  exports.SimpleButtonDOM = _SimpleButtonDOM2.default;
  exports.SimpleDOMView = _SimpleDOMView2.default;
  exports.InputText = _InputText2.default;
  exports.InputNumber = _InputNumber2.default;
  exports.StartButton = _StartButton2.default;
  exports.VideoDOM = _VideoDOM2.default;
  exports.ClipCJS = _ClipCJS2.default;
  exports.TextMultiRender = _TextMultiRender2.default;
  exports.TextDOM = _TextDOM2.default;
  exports.TextCJS = _TextCJS2.default;
  exports.ImageSequenceDOM = _ImageSequenceDOM2.default;
  exports.ImageSequenceCJS = _ImageSequenceCJS2.default;
  exports.ImageDOM = _ImageDOM2.default;
  exports.ImageCJS = _ImageCJS2.default;
  exports.ShapeCJS = _ShapeCJS2.default;
  exports.ContainerDOM = _ContainerDOM2.default;
  exports.ContainerCJS = _ContainerCJS2.default;
  exports.Container = _Container2.default;
  exports.VisualComponentDOM = _VisualComponentDOM2.default;
  exports.VisualComponentCJS = _VisualComponentCJS2.default;
  exports.StageView = _StageView2.default;
  exports.FlashLib = _FlashLib2.default;
  exports.SpriteSheetLoader = _SpriteSheetLoader2.default;
  exports.ImageSequenceLoader = _ImageSequenceLoader2.default;
  exports.FlashtmlLoader = _FlashtmlLoader2.default;
  exports.TextLoader = _TextLoader2.default;
  exports.SoundLoaderMediaElement = _SoundLoaderMediaElement2.default;
  exports.SoundLoader = _SoundLoader2.default;
  exports.ImageLoader = _ImageLoader2.default;
  exports.JSONLoader = _JSONLoader2.default;
  exports.SwapTransition = _SwapTransition2.default;
  exports.TransitionManager = _TransitionManager2.default;
  exports.List = _List2.default;
  exports.Debugger = _Debugger2.default;
  exports.Request = _Request2.default;
  exports.Layout = _Layout2.default;
  exports.Importer = _Importer2.default;
  exports.BusyScreen = _BusyScreen2.default;
  exports.SoundManager = _SoundManager2.default;
  exports.FXManager = _FXManager2.default;
  exports.MemoManager = _MemoManager2.default;
  exports.MemoAbstract = _MemoAbstract2.default;
  exports.MemoCookie = _MemoCookie2.default;
  exports.MemoLocalStorage = _MemoLocalStorage2.default;
  exports.Launcher = _Launcher2.default;

  var ClassForBuild = function ClassForBuild() {
    _classCallCheck(this, ClassForBuild);
  };

  exports.default = ClassForBuild;
});
//# sourceMappingURL=ClassForBuild.js.map