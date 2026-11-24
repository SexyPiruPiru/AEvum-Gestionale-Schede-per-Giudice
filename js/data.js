window.AevumData = {
    SKILLS_BY_CATEGORY: {
        "Vigore": ["Impeto", "Conduzione", "Fermezza"],
        "Riflessi": ["Acrobazia", "Furtività", "Mani Abili", "Percezione"],
        "Intuito": ["Alchimia", "Cultismo", "Medicina", "Ingegneria", "Sopravvivenza", "Esperto Locale"],
        "Prestigio": ["Sotterfugio", "Intimorire", "Influenza"]
    },

    DICE_SVG: [
        '<svg class="dice-icon" viewBox="0 0 100 100" title="d4"><polygon points="50,15 90,85 10,85"/></svg>',
        '<svg class="dice-icon" viewBox="0 0 100 100" title="d6"><rect x="15" y="15" width="70" height="70" rx="6"/></svg>',
        '<svg class="dice-icon" viewBox="0 0 100 100" title="d8"><polygon points="50,10 90,50 50,90 10,50"/></svg>',
        '<svg class="dice-icon" viewBox="0 0 100 100" title="d10"><polygon points="50,10 90,38 75,85 25,85 10,38"/></svg>',
        '<svg class="dice-icon" viewBox="0 0 100 100" title="d12"><polygon points="50,10 85,30 85,70 50,90 15,70 15,30"/></svg>'
    ],

    DEBUFF_ICONS: [
        { icon: "🩸Ferita", name: "Ferita" },
        { icon: "🧪Veleno", name: "Avvelenamento" },
        { icon: "☢️Malattia", name: "Malattia" },
        { icon: "🔥Termico", name: "Termico" },
        { icon: "🪫Esausto", name: "Esausto" }
    ],

    SPECIES_LIST: ["Jawara", "Licas", "Mezzelfo", "Mezzorco", "Nano", "Umano"],

    ORIGINS_LIST: [
        "Cacciatore di Stelle", "Ciò che Abita l'Oltremondo", "Dannatamente Troppo Curioso",
        "Eureka!!!", "Il Fuoco della Vendetta", "Il Furto Perfetto", "Il Richiamo dell'Artista",
        "Il Vero Potere", "Intrighi a Corte", "La Cura", "La Gente deve Sapere",
        "La Leggenda del Mare", "La Ricerca del Sapere", "Legami di Sangue",
        "Linguaggi Antichi", "Oltre il Velo dell'Acqua", "Oltre le Terre Conosciute",
        "Quando la Fede Vacilla", "Sulla Strada Polverosa", "Sulle Tracce della Preda",
        "Un Ottimo Affare", "Una Nuova Casa", "Uno Strano Linguaggio"
    ],

    VOCATIONS_LIST: [
        "L'Anima Solitaria", "L'Aristocratico", "L'Artista", "Il Campione",
        "Il Criminale", "Il Curielita", "L'Esploratore", "Il Fabbricante",
        "L'Investigatore", "Il Mercante", "Il Mercenario", "Il Miliziano",
        "Il Ricercatore", "Il Sacerdote", "Lo Sciacallo", "Lo Spirito Libero"
    ],

    BLOODLINES_LIST: [
        "Chiromanzia", "Distorsione", "Elementalismo", "Entropia", "Morfismo", "Trasmutazione"
    ],

    LETHALITY_TABLE: {
        "Innocuo": { pc: "5–15", dpt: "10", resSum: 16, d1: "1d4", d2: "1d4", d3: "—", d4: "—", tol: "0", vuln: "2–3", imm: "0", man: "1", weak: "Semplice", size: "Media" },
        "1":       { pc: "15–20", dpt: "15", resSum: 32, d1: "1d4", d2: "1d4", d3: "—", d4: "—", tol: "0", vuln: "2–3", imm: "0", man: "1", weak: "Semplice", size: "Media" },
        "2":       { pc: "21–40", dpt: "25", resSum: 64, d1: "1d6", d2: "1d4", d3: "1d4", d4: "—", tol: "0", vuln: "2–3", imm: "0", man: "2", weak: "Media", size: "Media" },
        "3":       { pc: "41–60", dpt: "35", resSum: 80, d1: "1d6", d2: "1d4", d3: "1d4", d4: "—", tol: "0", vuln: "2", imm: "0", man: "2", weak: "Media", size: "Grande" },
        "4":       { pc: "61–80", dpt: "45", resSum: 96, d1: "1d8", d2: "1d6", d3: "1d4", d4: "—", tol: "1", vuln: "2", imm: "0", man: "2", weak: "Difficile", size: "Grande" },
        "5":       { pc: "81–100", dpt: "55", resSum: 112, d1: "1d8", d2: "1d6", d3: "1d6", d4: "1d4", tol: "1", vuln: "1–2", imm: "0", man: "3", weak: "Difficile", size: "Enorme" },
        "6":       { pc: "101–120", dpt: "65", resSum: 168, d1: "1d10", d2: "1d8", d3: "1d6", d4: "1d4", tol: "2", vuln: "1–2", imm: "1", man: "3", weak: "Ardua", size: "Enorme" },
        "7":       { pc: "121–140", dpt: "75", resSum: 184, d1: "1d10", d2: "1d8", d3: "1d8", d4: "1d6", tol: "2", vuln: "1", imm: "1", man: "3", weak: "Ardua", size: "Mastodontica" },
        "8":       { pc: "141–160", dpt: "80", resSum: 192, d1: "1d12", d2: "1d10", d3: "1d8", d4: "1d6", tol: "3", vuln: "1", imm: "3", man: "3", weak: "Eroica", size: "Mastodontica" },
        "9":       { pc: "161–180", dpt: "85", resSum: 224, d1: "1d12", d2: "1d10", d3: "1d10", d4: "1d8", tol: "3", vuln: "0–1", imm: "2", man: "3", weak: "Eroica", size: "Colossale" },
        "10":      { pc: "181–200", dpt: "90", resSum: 248, d1: "1d12", d2: "1d12", d3: "1d10", d4: "1d8", tol: "4", vuln: "0–1", imm: "2", man: "3", weak: "Eroica", size: "Colossale" },
        "Mortale": { pc: "200+", dpt: "95+", resSum: null, d1: "1d12+", d2: "1d12", d3: "1d10+", d4: "1d8+", tol: "4+", vuln: "0–1", imm: "2–3+", man: "3+", weak: "Eroica", size: "Colossale" }
    },

    PHYLUM_LIST: [
        "Assemblato", "Bestia", "Civilizzato", "Drago", "Infuso", "Morbo", "Ritornato"
    ],

    PHYLUM_NOTES: {
        "Assemblato": "Frutto della tecnologia dell'Impero mosso da Frammenti di Ævum; rari esemplari con Memoria a liquido manifestano semi-coscienza legata all'Ævum.",
        "Bestia": "Creature invertebrate o vertebrate con vita solitaria o di branco, dagli animali comuni ai più singolari.",
        "Civilizzato": "Creature evolute in comunità strutturate con conoscenze anche basilari e uso di attrezzi.",
        "Drago": "Creature antiche: in quiescenza il corpo diventa casa del nuovo Drago che rinasce dalle sue carni mantenendo il patrimonio genetico.",
        "Infuso": "Creature nate o modificate dalla convivenza con i Frammenti dell'Ævum, spesso con capacità affini all'alchimia.",
        "Morbo": "Microrganismi simbiotici legati a un altro Phylum che mutano l'ospite: caratteristiche, manovre, peculiarità e conoscenze coesistono, ma in caso di incongruenze prevale il Morbo.",
        "Ritornato": "Creature aberranti nate da errori che hanno permesso ad alcune anime di tornare sul piano dei vivi dall'Oltremondo."
    },

    RULES_REFERENCE_FOR_AI: { /* REGOLE SEMPRE CITATE */
        core: [
            "Dadi Abilità Creature: Una creatura ha un unico Dado Abilità per ciascuna Resistenza (VIG, RIF, INT, PRE) vedendo assegnati i dadi più alti alle aree più forti.",
            "Tolleranze, Vulnerabilità e Immunità: Tolleranza = la creatura è più resistente a danni o condizioni di quel tipo; Vulnerabilità = la creatura è più vulnerabile a danni o condizioni di quel tipo; Immunità = non subisce danni o condizioni di quel tipo.",
            "Manovre: Una creatura può compiere più MANOVRE [ATTACCO] nello stesso Round/Turno solo se hanno nomi diversi.",
            "Conoscenze: Il giocatore ottiene delle Conoscenze sulla creatura in esame in base al risultato di un suo tiro di dadi. Ogni Conoscenza è presentata come estratto narrativo, testimonianza, diario, rapporto o leggenda con fonte indicata. Il Punto Debole coincide con la Conoscenza della difficoltà indicata.",
            "Ricompense: Le Ricompense usano tiri percentuali (1-100%) e devono presentare nome della ricompensa e l'effetto.",
            "Phylum del sistema: Scegli quello più coerente con la descrizione tra Assemblato, Bestia, Civilizzato, Drago, Infuso, Morbo, Ritornato",
            "DPT: Somma i danni base (esclusi i critici) delle manovre d'attacco fino al limite di manovre per turno (rispettando il vincolo di nomi diversi); le manovre di lotta o controllo che non infliggono danno non contribuiscono al DPT.",
            "Punti Mente: Quando una creatura termina i punti mente impazzisce e non è più in grado di combattere. decretalo autonomamente in base alle competenze mentali e alla letalità.",
            "Condizioni: un bersaglio può subire le condizioni Assordato, Inabile (svenuto, molti malus), Intimorito (malus verso il timore), Prono, Sanguinante, Sensibile alla Luce, Spaventato (forte malus verso la paura), Stordito (meno malus di Inabile), Trattenuto, Vista Assente, Vista Ostacolata (malus alla vista)."
        ],
        contextual: [
            {
                id: "phylum_morbo",
                keywords: ["morbo", "parassita", "ospite", "organismo", "simbiosi", "simbiotico", "contagio", "infezione"],
                text: "Regola Phylum Morbo: I microrganismi simbiotici mutano l'ospite; caratteristiche, manovre, peculiarità e conoscenze di Morbo e ospite coesistono, ma in caso di incongruenze prevale il Morbo."
            },
            {
                id: "phylum_ritornato",
                keywords: ["ritornato", "anima", "oltremondo", "cadavere", "morto", "morte", "spettro", "vendetta", "non morto"],
                text: "Regola Phylum Ritornato: Creature aberranti nate da errori che hanno permesso ad alcune anime di tornare nel piano dei vivi dall'Oltremondo."
            },
            {
                id: "phylum_infuso",
                keywords: ["infuso", "aevum", "ævum", "frammento", "mutato", "mutazione"],
                text: "Regola Phylum Infuso: Creature nate o modificate dalla convivenza con i Frammenti dell'Ævum, spesso dotate di capacità affini all'alchimia."
            },
            {
                id: "phylum_assemblato",
                keywords: ["assemblato", "costrutto", "macchinario", "macchina", "automa", "memoria a liquido"],
                text: "Regola Phylum Assemblato: Macchinari alimentati da Frammenti di Ævum; rarissimi esemplari con Memoria a liquido manifestano semi-coscienza legata al liquido che li muove."
            },
            {
                id: "phylum_drago",
                keywords: ["drago", "antico", "quiescenza", "scaglie"],
                text: "Regola Phylum Drago: Creature antiche; in Quiescenza il corpo diventa casa del nuovo Drago che rinasce dalle sue carni."
            },
            {
                id: "phylum_bestia",
                keywords: ["bestia", "animal", "belva", "predator", "branco", "fauna", "selvatic", "feroc", "istint", "zann", "artigl", "pelliccia", "pium", "insett", "rettil", "mammifer", "aracnid", "crostace"],
                text: "Regola Phylum Bestia: Creature invertebrate o vertebrate con vita solitaria o di branco, dagli animali comuni ai più singolari."
            },
            {
                id: "phylum_civilizzato",
                keywords: ["civilizzat", "umanoid", "comunità", "tribù", "clan", "villaggio", "città", "insediament", "attrezz", "utensil", "arma", "armi", "spada", "arco", "lancia", "bandit", "soldat", "guardia", "sacerdot", "artigian", "cultura", "linguaggi", "strategi", "tattic"],
                text: "Regola Phylum Civilizzato: Creature evolute in comunità strutturate con conoscenze anche basilari e uso di attrezzi."
            },
            {
                id: "terreno",
                keywords: ["terren", "suol", "superfici", "habitat", "region", "ambient", "impervi", "instabil", "scivolos", "palud", "acqu", "fang","melm", "sabbie mobili", "ghiaccio", "neve", "rocc", "dirup", "burron", "foresta", "bosco", "deserto", "cava", "tunnel", "nuot", "scalar", "scavar", "volar"],
                text: "Movimento e Terreno: Eventuali movimenti speciali includono Nuotare, Scalare, Scavare, Volare."
            },
            {
                id: "grapple_control",
                keywords: ["lotta", "afferr", "trascin", "tratten", "prono", "sbilanc", "immobiliz", "art", "appendic"],
                text: "Lotta: Le creature che possiedono arti superiori o appendici per afferrare e lottare possono presentare MANOVRA [LOTTA] ed essere in una situazione di lotta corpo a corpo. Durante una situazione di lotta la creatura può trascinare l'avversario, attaccarlo con armi leggere o naturali o usare specifiche manovre in base alle sue caratteristiche morfologiche (es. lanciarlo, ferirlo, applicargli una condizione, effettuare un attacco speciale)."
            },
            {
                id: "indebolimento",
                keywords: ["indeboliment", "danno", "danni", "attacc", "ferit", "sanguin", "emorrag", "tagli", "squarc", "termic", "ustion", "fuoc", "calor", "gel", "ghiacci", "fredd", "malatti", "morbo", "contagi", "infezion", "pest", "putrid", "avvelenament", "velen", "tossic", "corrosiv", "acid", "esaust", "sfinit", "stanc", "affatic", "fiacc"],
                text: "Tipi di Indebolimento: In base alle particolarità di una creatura essa presenterà uno o più tipi di indebolimento nei suoi attacchi che causano danno. Ferita, Termico, Malattia, Avvelenamento, Esausto."
            },
            {
                id: "sensi",
                keywords: ["sens", "vision", "vista", "occh", "veder", "oscur", "buio", "notturn", "crepuscol", "termic", "calor", "infraross", "ciec", "ricettor", "ecolocalizz", "sonar", "udit", "olfatt", "telluric", "vibrazion", "suol", "terren", "rocc", "scavar", "sotterrane"],
                text: "Tipi di sensi: In base alle particolarità di una creatura essa presenterà uno o più tipi di sensi: Visione Notturna, Visione Termica, Vista Cieca (mediante particolari ricettori), Percezione Tellurica (captazione delle vibrazioni)."
            },
            {
                id: "armor_rule",
                keywords: ["armatur", "corazz", "scudo", "piastr", "carapace", "guscio"],
                text: "Armatura e Punti Resistenza: Se la creatura ha pezzi d'armatura che aumentano i PR, indica il valore totale e tra parentesi l'armatura e il valore da sottrarre al totale nel caso in cui l'armatura venga spezzata."
            }
        ]
    },

    CREATURE_DICE_OPTIONS: ["—", "1d4", "1d6", "1d8", "1d10", "1d12", "1d20"],
    MACRO_AREAS: ["Vigore", "Riflessi", "Intuito", "Prestigio"],
    RES_KEYS: ["VIG", "RIF", "INT", "PRE"],
    CONDITIONS_LIST: [
        "Assordato", "Inabile", "Intimorito", "Prono", "Sanguinante", "Sensibilità alla luce",
        "Spaventato", "Stordito", "Trattenuto", "Vista Assente", "Vista Ostacolata"
    ],

    // Predisposto per le creature del manuale che aggiungerai in seguito
    DEFAULT_CREATURES: []
};
