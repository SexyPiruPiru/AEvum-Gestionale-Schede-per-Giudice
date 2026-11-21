window.AevumApp = {
    openTabs: [],
    activeTabId: null,
    currentFilter: "all",

    init() {
        window.AevumStorage.initDefaults();
        this.checkMobileUI();
        window.addEventListener("resize", () => this.checkMobileUI());

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./sw.js").catch((err) => {
                console.warn("Service Worker non registrato:", err);
            });
        }

        this.renderSidebar();

        const all = window.AevumStorage.getAllEntities();
        if (all.length > 0) {
            this.openSavedEntity(all[0].id, all[0].entityType);
        } else {
            this.openNewTab("pg");
        }
    },

    checkMobileUI() {
        const closeBtn = document.getElementById("mobileCloseBtn");
        if (window.innerWidth <= 768) {
            closeBtn.style.display = "inline-flex";
        } else {
            closeBtn.style.display = "none";
            this.closeSidebar();
        }
    },

    openSidebar() {
        document.getElementById("sidebar").classList.add("open");
        document.getElementById("overlay").classList.add("open");
    },

    closeSidebar() {
        document.getElementById("sidebar").classList.remove("open");
        document.getElementById("overlay").classList.remove("open");
    },

    bindCollapsibles(rootEl) {
        rootEl.querySelectorAll(".section-title").forEach((title) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "collapse-btn";
            btn.textContent = "▼ Riduci";
            title.appendChild(btn);

            const contentDiv = title.nextElementSibling;
            if (contentDiv && contentDiv.classList.contains("section-collapse-content")) {
                const toggle = (e) => {
                    e.stopPropagation();
                    const collapsed = contentDiv.classList.toggle("collapsed");
                    btn.textContent = collapsed ? "▶ Espandi" : "▼ Riduci";
                };
                title.addEventListener("click", toggle);
                btn.addEventListener("click", toggle);
            }
        });
    },

    showToast(message, type = "info") {
        const container = document.getElementById("toastContainer");
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.2s ease";
            setTimeout(() => toast.remove(), 220);
        }, 2800);
    },

    openConfirmModal(title, message, buttons) {
        return new Promise((resolve) => {
            const backdrop = document.getElementById("confirmModal");
            document.getElementById("modalTitle").textContent = title;
            document.getElementById("modalMessage").textContent = message;
            const actions = document.getElementById("modalActions");
            actions.innerHTML = "";
            buttons.forEach((b) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = `btn btn-sm ${b.cls || "btn-secondary"}`;
                btn.textContent = b.label;
                btn.onclick = () => {
                    backdrop.classList.remove("open");
                    resolve(b.value);
                };
                actions.appendChild(btn);
            });
            backdrop.classList.add("open");
        });
    },

    setFilter(filterType) {
        this.currentFilter = filterType;
        document.querySelectorAll("#sidebarFilterPills .filter-pill").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.filter === filterType);
        });
        this.renderSidebar();
    },

    getDefaultTitle(entityType) {
        if (entityType === "pg") return "Nuovo PG";
        if (entityType === "png") return "Nuovo PNG";
        return "Nuova Creatura";
    },

    snapshotActiveTab() {
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab) return;
        if (tab.entityType === "creature") {
            tab.draftData = window.AevumCreatureSheet.collectData(tab.entityId);
        } else {
            tab.draftData = window.AevumPgSheet.collectData(tab.entityId);
            tab.entityType = tab.draftData.entityType;
        }
    },

    onActiveSheetEdited() {
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab) return;
        tab.isDirty = true;
        this.snapshotActiveTab();

        const liveName = (tab.draftData.name && tab.draftData.name.trim())
            ? tab.draftData.name.trim()
            : this.getDefaultTitle(tab.entityType);

        const titleEl = document.getElementById("sheetTitleText");
        if (titleEl) titleEl.textContent = liveName;
        document.getElementById("mobileHeaderTitle").textContent = liveName;

        const badge = document.getElementById("saveStatusBadge");
        if (badge) {
            badge.textContent = "Modifiche non salvate";
            badge.className = "status-badge unsaved";
        }
        this.renderTabsBar();
    },

    updateActiveTabEntityType(newType) {
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab) return;
        tab.entityType = newType;
        if (tab.draftData) tab.draftData.entityType = newType;
        this.renderTabsBar();
        this.renderSidebar();
    },

    renderActiveTabContent() {
        const main = document.getElementById("mainContent");
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab) {
            main.innerHTML = "";
            return;
        }
        const savedList = window.AevumStorage.getAllEntities();
        const isSavedInDb = savedList.some((item) => item.id === tab.entityId);

        if (tab.entityType === "creature") {
            window.AevumCreatureSheet.render(main, tab.draftData, isSavedInDb, tab.isDirty);
        } else {
            window.AevumPgSheet.render(main, tab.draftData, isSavedInDb, tab.isDirty);
        }

        const liveName = (tab.draftData.name && tab.draftData.name.trim())
            ? tab.draftData.name.trim()
            : this.getDefaultTitle(tab.entityType);
        document.getElementById("mobileHeaderTitle").textContent = liveName;
    },

    renderTabsBar() {
        const bar = document.getElementById("tabsBar");
        bar.innerHTML = "";

        this.openTabs.forEach((tab) => {
            const type = tab.entityType;
            const title = (tab.draftData && tab.draftData.name && tab.draftData.name.trim())
                ? tab.draftData.name.trim()
                : this.getDefaultTitle(type);

            const el = document.createElement("div");
            el.className = `tab-item tab-${type} ${tab.tabId === this.activeTabId ? "active" : ""} ${tab.isDirty ? "dirty" : ""}`;
            el.title = `${title} (${type.toUpperCase()})`;
            el.onclick = () => this.switchToTab(tab.tabId);

            el.innerHTML = `
                <span class="tab-dirty-dot"></span>
                <span class="tab-title-text">${this.escHtml(title)}</span>
                <button type="button" class="tab-close-btn" title="Chiudi scheda" onclick="event.stopPropagation(); AevumApp.closeTab('${tab.tabId}')">✕</button>
            `;
            bar.appendChild(el);
        });

        const addGroup = document.createElement("div");
        addGroup.className = "tab-new-group";
        addGroup.innerHTML = `
            <button type="button" class="tab-quick-add pg" title="Nuovo PG" onclick="AevumApp.openNewTab('pg')">+ PG</button>
            <button type="button" class="tab-quick-add png" title="Nuovo PNG" onclick="AevumApp.openNewTab('png')">+ PNG</button>
            <button type="button" class="tab-quick-add creature" title="Nuova Creatura" onclick="AevumApp.openNewTab('creature')">+ Creatura</button>
        `;
        bar.appendChild(addGroup);
    },

    switchToTab(tabId) {
        if (tabId === this.activeTabId) return;
        this.snapshotActiveTab();
        this.activeTabId = tabId;
        this.renderActiveTabContent();
        this.renderTabsBar();
        this.renderSidebar();
    },

    openNewTab(entityType, prefillData = null) {
        if (this.activeTabId) this.snapshotActiveTab();
        const prefix = entityType === "creature" ? "cr_" : "ch_";
        const newId = prefix + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
        const initialDraft = prefillData
            ? { ...prefillData, id: newId, entityType }
            : (entityType === "creature" ? { id: newId, entityType: "creature", lethality: "2" } : { id: newId, entityType });

        const newTab = {
            tabId: "tab_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
            entityId: newId,
            entityType,
            draftData: initialDraft,
            isDirty: Boolean(prefillData)
        };

        this.openTabs.push(newTab);
        this.activeTabId = newTab.tabId;
        this.renderActiveTabContent();
        this.renderTabsBar();
        this.renderSidebar();
    },

    openSavedEntity(id, entityType) {
        const alreadyOpen = this.openTabs.find((t) => t.entityId === id);
        if (alreadyOpen) {
            this.switchToTab(alreadyOpen.tabId);
            return;
        }
        const all = window.AevumStorage.getAllEntities();
        const item = all.find((e) => e.id === id);
        if (!item) return;

        if (this.activeTabId) this.snapshotActiveTab();
        const resolvedType = item.entityType || entityType || "png";
        const newTab = {
            tabId: "tab_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
            entityId: item.id,
            entityType: resolvedType,
            draftData: JSON.parse(JSON.stringify({ ...item, entityType: resolvedType })),
            isDirty: false
        };

        this.openTabs.push(newTab);
        this.activeTabId = newTab.tabId;
        this.renderActiveTabContent();
        this.renderTabsBar();
        this.renderSidebar();
    },

    async closeTab(tabId) {
        const idx = this.openTabs.findIndex((t) => t.tabId === tabId);
        if (idx === -1) return;
        const tab = this.openTabs[idx];

        if (tab.isDirty) {
            const label = (tab.draftData && tab.draftData.name) || this.getDefaultTitle(tab.entityType);
            const res = await this.openConfirmModal(
                "Modifiche non salvate",
                `La scheda "${label}" contiene modifiche non salvate. Vuoi chiuderla comunque?`,
                [
                    { label: "Annulla", value: "cancel", cls: "btn-secondary" },
                    { label: "Chiudi senza salvare", value: "discard", cls: "btn-danger" }
                ]
            );
            if (res !== "discard") return;
        }

        this.openTabs.splice(idx, 1);
        if (this.openTabs.length === 0) {
            this.openNewTab("pg");
            return;
        }
        if (this.activeTabId === tabId) {
            const next = this.openTabs[Math.max(0, idx - 1)];
            this.activeTabId = next.tabId;
            this.renderActiveTabContent();
        }
        this.renderTabsBar();
        this.renderSidebar();
    },

    saveActiveTab() {
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab) return;

        const data = tab.entityType === "creature"
            ? window.AevumCreatureSheet.collectData(tab.entityId)
            : window.AevumPgSheet.collectData(tab.entityId);

        if (!data.name) {
            this.showToast("Inserisci almeno il nome prima di salvare.", "error");
            return;
        }

        const prevSaved = window.AevumStorage.getAllEntities().find((e) => e.id === data.id);
        if (prevSaved && prevSaved.entityType !== data.entityType) {
            window.AevumStorage.deleteEntity(data.id, prevSaved.entityType);
        }

        window.AevumStorage.upsertEntity(data);
        tab.entityType = data.entityType;
        tab.draftData = JSON.parse(JSON.stringify(data));
        tab.isDirty = false;

        const badge = document.getElementById("saveStatusBadge");
        if (badge) {
            badge.textContent = tab.entityType === "creature" ? "Salvata" : "Salvato";
            badge.className = "status-badge saved";
        }

        this.renderTabsBar();
        this.renderSidebar();
        this.showToast(`"${data.name}" salvato in archivio.`, "success");
    },

    duplicateActiveCreature() {
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab || tab.entityType !== "creature") return;
        const copy = window.AevumCreatureSheet.collectData(null);
        copy.name = copy.name ? `${copy.name} (Copia)` : "Copia Creatura";
        this.openNewTab("creature", copy);
        this.showToast("Copia creatura aperta in una nuova scheda.", "info");
    },

    async requestDeleteActive() {
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab) return;
        const label = (tab.draftData && tab.draftData.name) || this.getDefaultTitle(tab.entityType);

        const ok = await this.openConfirmModal(
            "Elimina scheda",
            `Vuoi eliminare definitivamente "${label}" dall'archivio?`,
            [
                { label: "Annulla", value: false, cls: "btn-secondary" },
                { label: "Elimina", value: true, cls: "btn-danger" }
            ]
        );
        if (!ok) return;

        window.AevumStorage.deleteEntity(tab.entityId, tab.entityType);
        const idx = this.openTabs.findIndex((t) => t.tabId === tab.tabId);
        if (idx !== -1) this.openTabs.splice(idx, 1);

        if (this.openTabs.length === 0) {
            this.openNewTab("pg");
        } else {
            const next = this.openTabs[Math.max(0, idx - 1)];
            this.activeTabId = next.tabId;
            this.renderActiveTabContent();
            this.renderTabsBar();
        }
        this.renderSidebar();
        this.showToast(`"${label}" eliminato.`, "info");
    },

    renderSidebar() {
        const listEl = document.getElementById("entityList");
        const query = (document.getElementById("searchInput").value || "").trim().toLowerCase();
        const activeTab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        const activeEntityId = activeTab ? activeTab.entityId : null;

        const all = window.AevumStorage.getAllEntities();
        const filtered = all.filter((item) => {
            if (this.currentFilter !== "all" && item.entityType !== this.currentFilter) return false;
            if (!query) return true;
            const blob = [
                item.name, item.epithet, item.species_val, item.vocation_val,
                item.character_title, item.category, item.size, item.habitat
            ].filter(Boolean).join(" ").toLowerCase();
            return blob.includes(query);
        });

        listEl.innerHTML = "";
        if (filtered.length === 0) {
            listEl.innerHTML = `<li style="padding:14px; text-align:center; color:var(--text-muted); font-size:12.5px;">Nessuna scheda in elenco.</li>`;
            return;
        }

        filtered.forEach((item) => {
            const type = item.entityType || "png";
            const li = document.createElement("li");
            li.className = `char-item type-${type} ${item.id === activeEntityId ? "active" : ""}`;
            li.onclick = () => {
                this.openSavedEntity(item.id, type);
                this.closeSidebar();
            };

            let subInfo = "";
            if (type === "creature") {
                subInfo = [item.category, item.size !== "-" ? item.size : "", item.lethality ? `Let. ${item.lethality}` : ""].filter(Boolean).join(" · ");
            } else {
                subInfo = [
                    item.species_val && item.species_val !== "-" ? item.species_val : "",
                    item.vocation_val && item.vocation_val !== "-" ? item.vocation_val : "",
                    item.level ? `Lv. ${item.level}` : ""
                ].filter(Boolean).join(" · ");
            }

            li.innerHTML = `
                <div style="min-width:0;">
                    <div class="char-item-name">${this.escHtml(item.name || "Senza Nome")}</div>
                    <div class="char-item-meta">${this.escHtml(subInfo || type.toUpperCase())}</div>
                </div>
                <span class="cat-badge ${type}">${type.toUpperCase()}</span>
            `;
            listEl.appendChild(li);
        });
    },

    exportActiveEntity() {
        const tab = this.openTabs.find((t) => t.tabId === this.activeTabId);
        if (!tab) return;
        const data = tab.entityType === "creature"
            ? window.AevumCreatureSheet.collectData(tab.entityId)
            : window.AevumPgSheet.collectData(tab.entityId);

        if (!data.name) {
            this.showToast("Inserisci un nome prima di esportare.", "error");
            return;
        }
        const safe = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "_");
        const prefix = data.entityType === "creature" ? "aevum_creatura" : `aevum_${data.entityType}`;
        window.AevumStorage.downloadJson(data, `${prefix}_${safe}.json`);
        this.showToast(`Scheda "${data.name}" esportata.`, "success");
    },

    handleImportFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                let count = 0;

                if (parsed && parsed.format === "aevum_backup_v2") {
                    (parsed.characters || []).forEach((c) => {
                        if (c && c.name) {
                            window.AevumStorage.upsertEntity({ ...c, entityType: c.entityType === "pg" ? "pg" : "png" });
                            count++;
                        }
                    });
                    (parsed.creatures || []).forEach((cr) => {
                        if (cr && cr.name) {
                            window.AevumStorage.upsertEntity({ ...cr, entityType: "creature" });
                            count++;
                        }
                    });
                    this.renderSidebar();
                    this.showToast(`Importate ${count} schede dal backup.`, "success");
                } else if (Array.isArray(parsed)) {
                    parsed.forEach((item) => {
                        if (!item || !item.name) return;
                        const isCreature = item.entityType === "creature" || ("lethality" in item && "maneuvers" in item);
                        const type = isCreature ? "creature" : (item.entityType === "pg" ? "pg" : "png");
                        const id = item.id || ((isCreature ? "cr_" : "ch_") + Date.now() + "_" + Math.random().toString(36).slice(2, 6));
                        window.AevumStorage.upsertEntity({ ...item, id, entityType: type });
                        count++;
                    });
                    this.renderSidebar();
                    this.showToast(`Importate ${count} schede.`, "success");
                } else if (parsed && parsed.name) {
                    const isCreature = parsed.entityType === "creature" || ("lethality" in parsed && "maneuvers" in parsed);
                    const type = isCreature ? "creature" : (parsed.entityType === "pg" ? "pg" : "png");
                    const id = parsed.id || ((isCreature ? "cr_" : "ch_") + Date.now() + "_" + Math.random().toString(36).slice(2, 6));
                    const record = { ...parsed, id, entityType: type };
                    window.AevumStorage.upsertEntity(record);
                    this.renderSidebar();
                    this.openSavedEntity(id, type);
                    this.showToast(`"${record.name}" importato.`, "success");
                } else {
                    this.showToast("Formato JSON non riconosciuto.", "error");
                }
            } catch (err) {
                console.error("Errore importazione JSON:", err);
                this.showToast("Errore nella lettura del file JSON.", "error");
            }
            event.target.value = "";
        };
        reader.readAsText(file);
    },

    escHtml(str) {
        return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    window.AevumApp.init();
});
