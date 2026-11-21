window.AevumStorage = {
    CHARS_KEY: "aevum_chars",
    CREATURES_KEY: "aevum_creatures",
    SEED_FLAG_KEY: "aevum_bestiary_seeded_v1",

    initDefaults() {
        if (!localStorage.getItem(this.SEED_FLAG_KEY)) {
            if (Array.isArray(window.AevumData.DEFAULT_CREATURES) && window.AevumData.DEFAULT_CREATURES.length > 0) {
                const existing = this.getCreatures();
                if (existing.length === 0) {
                    this.saveCreatures(window.AevumData.DEFAULT_CREATURES);
                }
            }
            localStorage.setItem(this.SEED_FLAG_KEY, "true");
        }
    },

    getCharacters() {
        try {
            const raw = JSON.parse(localStorage.getItem(this.CHARS_KEY) || "[]");
            return raw.map((c) => ({
                ...c,
                entityType: c.entityType === "pg" ? "pg" : "png"
            }));
        } catch {
            return [];
        }
    },

    saveCharacters(chars) {
        try {
            localStorage.setItem(this.CHARS_KEY, JSON.stringify(chars));
        } catch (err) {
            console.warn("Salvataggio personaggi non riuscito:", err);
            if (window.AevumApp) window.AevumApp.showToast("Spazio locale pieno: rimuovi immagini pesanti o esporta un backup.", "error");
        }
    },

    getCreatures() {
        try {
            const raw = JSON.parse(localStorage.getItem(this.CREATURES_KEY) || "[]");
            return raw.map((c) => ({ ...c, entityType: "creature" }));
        } catch {
            return [];
        }
    },

    saveCreatures(creatures) {
        try {
            localStorage.setItem(this.CREATURES_KEY, JSON.stringify(creatures));
        } catch (err) {
            console.warn("Salvataggio creature non riuscito:", err);
            if (window.AevumApp) window.AevumApp.showToast("Spazio locale pieno: rimuovi immagini pesanti o esporta un backup.", "error");
        }
    },

    getAllEntities() {
        const chars = this.getCharacters();
        const creatures = this.getCreatures();
        return [...chars, ...creatures];
    },

    upsertEntity(entity) {
        if (entity.entityType === "creature") {
            const list = this.getCreatures();
            const idx = list.findIndex((c) => c.id === entity.id);
            if (idx >= 0) list[idx] = entity;
            else list.unshift(entity);
            this.saveCreatures(list);
        } else {
            const normalized = { ...entity, entityType: entity.entityType === "pg" ? "pg" : "png" };
            const list = this.getCharacters();
            const idx = list.findIndex((c) => c.id === normalized.id);
            if (idx >= 0) list[idx] = normalized;
            else list.unshift(normalized);
            this.saveCharacters(list);
        }
    },

    deleteEntity(id, entityType) {
        if (entityType === "creature") {
            const list = this.getCreatures().filter((c) => c.id !== id);
            this.saveCreatures(list);
        } else {
            const list = this.getCharacters().filter((c) => c.id !== id);
            this.saveCharacters(list);
        }
    },

    downloadJson(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },

    exportAllBackup() {
        const characters = this.getCharacters();
        const creatures = this.getCreatures();
        if (!characters.length && !creatures.length) {
            window.AevumApp.showToast("Non ci sono schede salvate da esportare.", "error");
            return;
        }
        const payload = {
            format: "aevum_backup_v2",
            exportedAt: new Date().toISOString(),
            characters,
            creatures
        };
        this.downloadJson(payload, `aevum_backup_totale_${new Date().toISOString().slice(0, 10)}.json`);
        window.AevumApp.showToast("Backup completo esportato.", "success");
    }
};
