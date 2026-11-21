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
        { icon: "🩸", name: "Ferita" },
        { icon: "🧪", name: "Avvelenamento" },
        { icon: "☢️", name: "Malattia" },
        { icon: "🔥", name: "Termico" },
        { icon: "🪫", name: "Esausto" }
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
        "Assemblato": "Frutto della tecnologia dell'Impero mosso da Frammenti di Ævum; rari esemplari con Memoria a liquido manifestano semi-coscienza legata all'acqua e all'Ævum.",
        "Bestia": "Creature invertebrate o vertebrate con vita solitaria o di branco, dagli animali comuni ai più singolari.",
        "Civilizzato": "Creature evolute in comunità strutturate con conoscenze anche basilari e uso di attrezzi.",
        "Drago": "Creature antiche legate al Ciclo: in Quiescenza il corpo diventa casa del nuovo Drago che rinasce dalle sue carni mantenendo il patrimonio genetico.",
        "Infuso": "Creature nate o modificate dalla convivenza con i Frammenti dell'Ævum, spesso con capacità affini all'alchimia.",
        "Morbo": "Microrganismi simbiotici legati a un altro Phylum che mutano l'ospite: caratteristiche, manovre, peculiarità e conoscenze coesistono, ma in caso di incongruenze prevale il Morbo.",
        "Ritornato": "Creature aberranti nate da errori che hanno permesso ad alcune anime di tornare dal piano dei vivi dall'Oltremondo."
    },

    RULES_REFERENCE_FOR_AI: {
        core: [
            "Dadi Abilità Creature: A differenza dei Musafir, una creatura ha un unico Dado Abilità per ciascuna Resistenza (VIG, RIF, INT, PRE): qualunque abilità legata a quella Resistenza usa sempre quel dado, assegnando i dadi più alti alle aree più forti.",
            "Tolleranze, Vulnerabilità e Immunità: Tolleranza = la creatura usa la metà dei PR necessari per ridurre danni o condizioni di quel tipo di danno; Vulnerabilità = usa il doppio dei PR necessari; Immunità = non subisce PC, PM o Condizioni da quel tipo di danno.",
            "Manovre: Una creatura può compiere più MANOVRE [ATTACCO] nello stesso Round/Turno solo se hanno nomi diversi.",
            "Conoscenze e Ricompense: Con una Sequenza che include MANOVRA [ATTINGERE AL SAPERE] superata, il Musafir ottiene le Conoscenze pari/inferiori alla Sfida superata e quelle superiori se il tiro supera le relative soglie. Ogni Conoscenza è presentata come estratto narrativo, testimonianza, diario, rapporto o leggenda con fonte/abilità indicata, e dove pertinente include l'effetto o il beneficio in termini meccanici del sistema (es. PR, Condizioni, Danni, resistenze o tattica). Il Punto Debole coincide con la Conoscenza della difficoltà indicata dalla Tabella 26.1. Le Ricompense usano tiri percentuali (1-100%) spendendo una Clessidra per tiro."
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
                text: "Regola Phylum Assemblato: Macchinari imperiali alimentati da Frammenti di Ævum; rarissimi esemplari con Memoria a liquido manifestano semi-coscienza legata all'acqua."
            },
            {
                id: "phylum_drago",
                keywords: ["drago", "ciclo", "quiescenza"],
                text: "Regola Phylum Drago: Creature antiche legate al Ciclo; in Quiescenza il corpo diventa casa del nuovo Drago che rinasce dalle sue carni."
            },
            {
                id: "terrain_swamp_water",
                keywords: ["palud", "acqu", "fango", "melma", "sabbie mobili", "nuot", "anfib", "ghiaccio", "scivolos"],
                text: "Movimento e Terreno: Movimenti speciali includono Nuotare, Scalare, Scavare, Volare. Terreno Impervio costa il doppio in metri; Terreno Instabile (paludi, sabbie mobili) può infliggere Trattenuto (si esce con MANOVRA [BASE]); Terreno Scivoloso può infliggere Prono."
            },
            {
                id: "grapple_control",
                keywords: ["lotta", "afferr", "trascin", "tratten", "prono", "sbilanc", "immobiliz"],
                text: "Lotta e Condizioni di Controllo: In MANOVRA [LOTTA] chi inizia è Dominante e l'altro Sottomesso (Movimento [Base] 0 per entrambi). Trattenuto = niente movimento, attacchi contro ottengono +1 incremento di dado, attacchi della creatura subiscono -2 decrementi e Mala Sorte su Vigore/Riflessi (niente spesa PR Vigore/Riflessi). Prono = spostamento come strisciare (costo doppio/triplo, rialzarsi costa metà movimento), Mala Sorte ad ATTACCO e MAESTRIA, mischia contro ha Buona Sorte."
            },
            {
                id: "bleed_wound",
                keywords: ["sanguin", "ferit", "emorrag", "artigl", "morso", "squarc"],
                text: "Condizione Sanguinante: Infligge i PC indicati tra parentesi a fine Turno (cumulabili) e si interrompe spendendo tutte e 3 le Manovre fuori da un'Area di Minaccia nemica."
            },
            {
                id: "armor_rule",
                keywords: ["armatur", "corazz", "scudo", "piastr", "carapace", "guscio"],
                text: "Armatura e PR: Se la creatura ha pezzi d'armatura che aumentano i PR, i valori in scheda li includono già e si indica tra parentesi il bonus perso se il pezzo viene rotto."
            }
        ]
    },

    CREATURE_DICE_OPTIONS: ["—", "1d4", "1d6", "1d8", "1d10", "1d12", "2d6", "2d8"],
    MACRO_AREAS: ["Vigore", "Riflessi", "Intuito", "Prestigio"],
    RES_KEYS: ["VIG", "RIF", "INT", "PRE"],
    CONDITIONS_LIST: [
        "🩸 Ferita", "🧪 Avvelenato", "☢️ Malattia", "🔥 Termico", "🪫 Esausto",
        "🔗 Trattenuto", "⬇️ Prono", "💫 Stordito", "😱 Intimorito / Spaventato", "🎲 Mala Sorte"
    ],

    // Predisposto per le creature del manuale che aggiungerai in seguito
    DEFAULT_CREATURES: []
};
