define(["exports"], function (exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
				value: true
		});
		exports.badFontError = badFontError;
		var MORE_INFO_TEXT = exports.MORE_INFO_TEXT = "<div data-toggle=\"collapse\" class=\"infosButton\" href=\"#infosBox\">en savoir plus</div>\n\t\t<div id=\"infosBox\" class=\"collapse infosBox\"> \n\t\tLe nom de la fonte sera le nom du fichier déposé, adapté si nécessaire.<br/>\n\t\tLes formats générés sont: ttf, otf, woff, woff2, svg\n\t\t<br/>\n\t\tNote: le format eot n'est pas généré, mais il est nécessaire uniquement pour Internet Explorer 6 à 8. Si cette cible est requise, générer les fontes en utilisant un des générateurs de fonte ci-dessous, et glisser le zip récupéré sur cette même zone.\n\t\t<br/>\n\t\tGénérateurs de fontes:\n\t\t<br/>\n\t\t- <a href=\"https://everythingfonts.com/font-face\" target=\"_blank\">everythingfonts</a>\n\t\t</div>\n";
		function badFontError(_ref) {
				var filePath = _ref.filePath;

				return "Un problème inconnu est parvenu avec la fonte " + filePath + "\nLes raisons peuvent être:\n- fichier corrompu ou erroné\n- un problème avec le nom, par exemple des charactères spéciaux";
		}
		var CONFIRM_DELETE_FONTS = exports.CONFIRM_DELETE_FONTS = "Etes vous sûr de vouloir supprimer les fontes suivantes\nATTENTION, ne supprimer ces fontes que si vous êtes certains qu'aucun projet ne les utilise, sinon il ne fonctionnera plus correctement lors du prochain export\n\n";
});
//# sourceMappingURL=texts.js.map