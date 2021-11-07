define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gammes = void 0;
    exports.gammes = [
        { id: "chromatic", desc: "Chromatique" },
        // Gamme Majeur
        { id: "favoris", desc: "FAVORIS", type: "section" },
        {
            id: "mode1",
            desc: "Gamme Majeure - Mode 1",
            pattern: [2, 2, 1, 2, 2, 2, 1],
        },
        {
            id: "phrygien",
            desc: "Mode de Mi - Phrygien (III) ",
            pattern: [1, 2, 2, 2, 1, 2, 2],
        },
        {
            id: "eolien",
            desc: "Mode de La - éolien (VI) - Mineur naturel ",
            pattern: [2, 1, 2, 2, 1, 2, 2],
        },
        {
            id: "minor_melodique",
            desc: "Mode Mélodique (I) ",
            pattern: [2, 1, 2, 2, 2, 2, 1],
        },
        {
            id: "minor_hamonic",
            desc: "Mineur Harmonique (I) ",
            pattern: [2, 1, 2, 2, 1, 3, 1],
        },
        {
            id: "phrygien_espagnol",
            desc: "Mode Phrygien espagnol (V) ",
            pattern: [1, 3, 1, 2, 1, 2, 2],
        },
        {
            id: "pentatonique_mineure",
            desc: "Gamme Pentatonique Mineure ",
            pattern: [3, 2, 2, 3, 2],
        },
        { id: "gamme_majeure", desc: "GAMME MAJEURE", type: "section" },
        {
            id: "mode1",
            desc: "Mode de Do - Mode 1",
            pattern: [2, 2, 1, 2, 2, 2, 1],
        },
        {
            id: "dorien",
            desc: "Mode de Ré - Dorien (II) ",
            pattern: [2, 1, 2, 2, 2, 1, 2],
        },
        {
            id: "phrygien",
            desc: "Mode de Mi - Phrygien (III) ",
            pattern: [1, 2, 2, 2, 1, 2, 2],
        },
        {
            id: "lydien",
            desc: "Mode de Fa - Lydien (IV) ",
            pattern: [2, 2, 2, 1, 2, 2, 1],
        },
        {
            id: "mixolydien",
            desc: "Mode de Sol - Mixolydien (V) ",
            pattern: [2, 2, 1, 2, 2, 1, 2],
        },
        {
            id: "eolien",
            desc: "Mode de La - éolien (VI) - Mineur naturel ",
            pattern: [2, 1, 2, 2, 1, 2, 2],
        },
        {
            id: "locrien",
            desc: "Mode de Si - locrien (VII) ",
            pattern: [1, 2, 2, 1, 2, 2, 2],
        },
        {
            id: "gamme_mineure_melodique",
            desc: "GAMME MINEURE MELODIQUE",
            type: "section",
        },
        {
            id: "minor_melodique",
            desc: "Mode Mélodique (I) ",
            pattern: [2, 1, 2, 2, 2, 2, 1],
        },
        {
            id: "javanais",
            desc: "Mode Javanais (II) ",
            pattern: [1, 2, 2, 2, 2, 1, 2],
        },
        {
            id: "lydien_augm",
            desc: "Mode Lydien augm. (III) ",
            pattern: [2, 2, 2, 2, 1, 2, 1],
        },
        {
            id: "bartok",
            desc: "Mode de Bartok (IV) ",
            pattern: [2, 2, 2, 1, 2, 1, 2],
        },
        { id: "hindou", desc: "Mode Hindou (V) ", pattern: [2, 2, 1, 2, 1, 2, 2] },
        {
            id: "minor_dim",
            desc: "Mode mineur diminué (VI) ",
            pattern: [2, 1, 2, 1, 2, 2, 2],
        },
        {
            id: "altere",
            desc: "Mode altéré (VII) ",
            pattern: [1, 2, 1, 2, 2, 2, 2],
        },
        {
            id: "gamme_mineure_harmonique",
            desc: "GAMME MINEURE HARMONIQUE",
            type: "section",
        },
        {
            id: "minor_hamonic",
            desc: "Mineur Harmonique (I) ",
            pattern: [2, 1, 2, 2, 1, 3, 1],
        },
        {
            id: "locrien_6M",
            desc: "Mode Locrien 6M (II) ",
            pattern: [1, 2, 2, 1, 3, 1, 2],
        },
        {
            id: "augmented",
            desc: "Mode Augmenté (III) ",
            pattern: [2, 2, 1, 3, 1, 2, 1],
        },
        {
            id: "roumain",
            desc: "Mode Roumain (IV) ",
            pattern: [2, 1, 3, 1, 2, 1, 2],
        },
        {
            id: "phrygien_espagnol",
            desc: "Mode Phrygien espagnol (V) ",
            pattern: [1, 3, 1, 2, 1, 2, 2],
        },
        {
            id: "lydien_9diese",
            desc: "Mode Lydien 9# (VI) ",
            pattern: [3, 1, 2, 1, 2, 2, 1],
        },
        {
            id: "altered_7dim",
            desc: "Mode altéré 7dim (VII) ",
            pattern: [1, 2, 1, 2, 2, 1, 3],
        },
        {
            id: "gamme_pentatonique",
            desc: "GAMME PENTATONIQUE",
            type: "section",
        },
        {
            id: "pentatonique_mineure",
            desc: "Gamme Pentatonique Mineure ",
            pattern: [3, 2, 2, 3, 2],
        },
        {
            id: "pentatonique_majeur",
            desc: "Gamme Pentatonique Majeure ",
            pattern: [2, 2, 3, 2, 3],
        },
        { id: "gamme_arabe", desc: "GAMME ARABE", type: "section" },
        { id: "arabe", desc: "Mode arabe (I) ", pattern: [2, 2, 1, 1, 2, 2, 2] },
        {
            id: "napolitain",
            desc: "Mode Napolitain (IV) ",
            pattern: [1, 2, 2, 2, 2, 2, 1],
        },
        {
            id: "ton_sens",
            desc: "Mode ton + sens (V) ",
            pattern: [2, 2, 2, 2, 2, 1, 1],
        },
        {
            id: "hypo_lydien",
            desc: "Mode Hypo Lydien (VI) ",
            pattern: [2, 2, 2, 2, 1, 1, 2],
        },
        {
            id: "lydien_phrygien",
            desc: "Mode lydien/phrygien (VII) ",
            pattern: [2, 2, 2, 1, 1, 2, 2],
        },
        {
            id: "gamme_orientale",
            desc: "GAMME ORIENTALE",
            type: "section",
        },
        {
            id: "orientale",
            desc: "Gamme Orientale (I) ",
            pattern: [1, 3, 1, 1, 3, 1, 2],
        },
        {
            id: "bohemian",
            desc: "Mode Bohémien (IV) ",
            pattern: [1, 3, 1, 2, 1, 3, 1],
        },
        {
            id: "sebastian",
            desc: "Mode Sebastian (V) ",
            pattern: [3, 1, 2, 1, 3, 1, 1],
        },
        {
            id: "tzigane",
            desc: "Mode Tzigane (VII) ",
            pattern: [2, 1, 3, 1, 1, 3, 1],
        },
        {
            id: "gamme_napolitaine_harmonique",
            desc: "GAMME NAPOLITAINE HARMONIQUE",
            type: "section",
        },
        {
            id: "napolitaine_harmonic",
            desc: "Gamme Napolitaine Harmonique (I) ",
            pattern: [1, 2, 2, 2, 1, 3, 1],
        },
        {
            id: "gitan_hongrois",
            desc: "Mode Gitan Hongrois (IV) ",
            pattern: [2, 1, 3, 1, 1, 2, 2],
        },
        {
            id: "gamme_hongroise_majeure",
            desc: "GAMME HONGROISE MAJEUR",
            type: "section",
        },
        {
            id: "hongrois_majeur",
            desc: "Gamme Hongrois Majeur (I) ",
            pattern: [3, 1, 2, 1, 2, 1, 2],
        },
        { id: "gamme_gypsy", desc: "GAMME GYPSY", type: "section" },
        { id: "gypsy", desc: "Gamme Gypsy (I) ", pattern: [1, 3, 1, 2, 2, 1, 2] },
        {
            id: "harmonic_majeur",
            desc: "Mode Harmonique Majeur (IV) ",
            pattern: [2, 2, 1, 2, 1, 3, 1],
        },
        {
            id: "lydien_dim",
            desc: "Mode Lydien diminué (VII) ",
            pattern: [2, 1, 3, 1, 2, 2, 1],
        },
    ];
});
//# sourceMappingURL=gammes.js.map