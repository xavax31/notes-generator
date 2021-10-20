export const presets = [
	{
		id: "all",
		desc: "Toute la tessiture",
		params: {
			noteMin: "mi-1",
			noteMax: "do1",
			intervalMin: 1,
			intervalMax: 3,
			random: true,
		},
	},
	{
		id: "basses",
		desc: "Basses sans clé de quinte",
		params: {
			noteMin: "mi-1",
			noteMax: "do1",
			intervalMin: 1,
			intervalMax: 3,
			random: true,
		},
	},
	{
		id: "aigus",
		desc: "Aigus clé de quinte avec",
		params: {
			noteMin: "si",
			noteMax: "ré2",
			intervalMin: 1,
			intervalMax: 3,
			random: true,
		},
	},
	{
		id: "transition",
		desc: "Travail de la transition graves-aigus",
		params: {
			noteMin: "sol",
			noteMax: "la1",
			intervalMin: 1,
			intervalMax: 3,
			random: true,
		},
	},
	{
		id: "bminor",
		desc: "Mode B minor naturel (eolien) pour clarinette (A piano)",
		params: {
			noteMin: "mi-1",
			noteMax: "do2",
			tonique: "si",
			gamme: "eolien",
			random: false,
		},
	},
	{
		id: "f#phrygien",
		desc: "Mode F# phrygien dominant (ou espagnol) pour clarinette (E piano)",
		params: {
			noteMin: "mi-1",
			noteMax: "do2",
			tonique: "fa#",
			gamme: "phrygien_espagnol",
			random: false,
		},
	},
	{
		id: "emajor",
		desc: "Gamme E majeur pour clarinette (D piano)",
		params: {
			noteMin: "mi-1",
			noteMax: "do2",
			tonique: "mi",
			gamme: "mode1",
			random: false,
		},
	},
	{
		id: "gmajor",
		desc: "Gamme G majeur pour clarinette (F piano)",
		params: {
			noteMin: "mi-1",
			noteMax: "do2",
			tonique: "sol",
			gamme: "mode1",
			random: false,
		},
	},
];
