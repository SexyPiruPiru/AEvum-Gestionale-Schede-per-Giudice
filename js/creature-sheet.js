window.AevumCreatureSheet = {
    portraitBase64: "",
    isHydrating: false,

    escAttr(str) {
        return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    },

    escHtml(str) {
        return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    render(container, draftData, isSavedInDb, isDirty) {
        const titleName = (draftData.name && draftData.name.trim()) ? draftData.name.trim() : "Nuova Creatura";

        container.innerHTML = `
            <div class="sheet-header-bar">
                <h2 class="sheet-header-title">
                    <span class="cat-badge creature">Creatura</span>
                    <span id="sheetTitleText">${this.escHtml(titleName)}</span>
                    <span class="status-badge ${isDirty ? "unsaved" : (isSavedInDb ? "saved" : "")}" id="saveStatusBadge">
                        ${isDirty ? "Modifiche non salvate" : (isSavedInDb ? "Salvata" : "Bozza")}
                    </span>
                </h2>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button type="button" class="btn btn-secondary btn-sm" onclick="AevumApp.duplicateActiveCreature()">⧉ Duplica</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="AevumApp.requestDeleteActive()">🗑 Elimina</button>
                    <button type="button" class="btn btn-success btn-sm" onclick="AevumApp.saveActiveTab()">💾 Salva Scheda</button>
                </div>
            </div>

            <!-- 1. IDENTITÀ & LETALITÀ (TABELLA 26.1) -->
            <div class="section-title">1. Identità, Classificazione &amp; Letalità</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <div class="info-layout">
                        <div class="info-fields">
                            <div class="row">
                                <div class="field-group" style="flex:2; min-width:180px;">
                                    <label>Nome Creatura:</label>
                                    <input type="text" id="c_name" placeholder="" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                                <div class="field-group" style="flex:1.5; min-width:160px;">
                                    <label>Nome Scientifico:</label>
                                    <input type="text" id="c_epithet" placeholder="Nome latino" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                            </div>

                            <div class="row">
                                <div class="field-group">
                                    <label>Tipo:</label>
                                    <input type="text" id="c_category" list="phylumSuggestions" placeholder="Es: Bestia" style="width:155px;" oninput="AevumCreatureSheet.edited()">
                                    <datalist id="phylumSuggestions">
                                        <option value="Assemblato"></option>
                                        <option value="Bestia"></option>
                                        <option value="Civilizzato"></option>
                                        <option value="Drago"></option>
                                        <option value="Infuso"></option>
                                        <option value="Morbo"></option>
                                        <option value="Ritornato"></option>
                                    </datalist>
                                </div>
                                <div class="field-group">
                                    <label>Taglia:</label>
                                    <select id="c_size" onchange="AevumCreatureSheet.edited(); AevumCreatureSheet.updateGuide();">
                                        <option value="-">- Seleziona -</option>
                                        <option value="Minuscola">Minuscola</option>
                                        <option value="Piccola">Piccola</option>
                                        <option value="Media">Media</option>
                                        <option value="Grande">Grande</option>
                                        <option value="Enorme">Enorme</option>
                                        <option value="Mastodontica">Mastodontica</option>
                                        <option value="Colossale">Colossale</option>
                                    </select>
                                </div>
                                <div class="field-group">
                                    <label>Letalità:</label>
                                    <select id="c_lethality" class="mono-input" onchange="AevumCreatureSheet.edited(); AevumCreatureSheet.updateGuide();">
                                        <option value="Innocuo">Innocuo</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="Mortale">Mortale</option>
                                    </select>
                                </div>
                                <div class="field-group">
                                    <label>Manovre:</label>
                                    <input type="text" id="c_maneuvers_round" class="mono-input" placeholder="" style="width:62px; text-align:center;" oninput="AevumCreatureSheet.edited()">
                                </div>
                            </div>

                            <div class="row">
                                <div class="field-group" style="flex:1; min-width:200px;">
                                    <label>Movimento [Base]:</label>
                                    <input type="text" id="c_movement" placeholder="" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                                <div class="field-group" style="flex:1; min-width:160px;">
                                    <label>Linguaggi:</label>
                                    <input type="text" id="c_languages" placeholder="" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                                <div class="field-group" style="flex:1; min-width:160px;">
                                    <label>Habitat / Regione:</label>
                                    <input type="text" id="c_habitat" placeholder="" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                            </div>

                            <div class="row">
                                <div class="field-group" style="flex:1; min-width:200px;">
                                    <label>Vulnerabilità:</label>
                                    <input type="text" id="c_vuln" placeholder="" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                                <div class="field-group" style="flex:1; min-width:200px;">
                                    <label>Tolleranze:</label>
                                    <input type="text" id="c_tol" placeholder="" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                                <div class="field-group" style="flex:1; min-width:200px;">
                                    <label>Immunità:</label>
                                    <input type="text" id="c_imm" placeholder="" style="flex:1;" oninput="AevumCreatureSheet.edited()">
                                </div>
                            </div>

                            <div style="margin-top:10px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
                                    <label for="c_description" style="font-weight:600; color:var(--text-primary);">Descrizione Creatura:</label>
                                    <button type="button" class="btn btn-sm" onclick="AevumCreatureSheet.openAiPromptModal()">Genera Prompt IA</button>
                                </div>
                                <textarea id="c_description" rows="3" placeholder="Descrivi l'aspetto, il comportamento e l'idea alla base della creatura. Impostando la Letalità e premendo il pulsante 'Genera Prompt IA' verrà generato un prompt da inviare ad una IA per aiutarti a dare vita alla creatura che hai in mente. ATTENZIONE: il prompt è pensato per una IA che non conosce il gioco e nonostante vengano forniti elementi della Tabella 26.1, la risposta dell'IA è da controllare e adattare alle regole." oninput="AevumCreatureSheet.edited()"></textarea>
                            </div>
                        </div>

                        <div class="portrait-container">
                            <div class="portrait-preview" id="portraitPreview">
                                <span class="portrait-placeholder">Nessuna Illustrazione</span>
                            </div>
                            <input type="file" id="portraitInput" accept="image/*" style="display:none;" onchange="AevumCreatureSheet.handlePortrait(event)">
                            <div style="display:flex; gap:6px; width:100%;">
                                <button type="button" class="btn btn-secondary btn-sm" style="flex:1;" onclick="document.getElementById('portraitInput').click()">Carica</button>
                                <button type="button" class="btn btn-danger btn-sm" onclick="AevumCreatureSheet.removePortrait()">🗑</button>
                            </div>
                        </div>
                    </div>

                    <div class="lethality-guide">
                        <div class="lethality-guide-header">
                            <span>Riferimento Tabella 26.1 — Letalità <span id="guideLethalityLabel" class="mono">2</span></span>
                            <span id="guideResCheck" class="mono">Resistenze: 0 / 64</span>
                        </div>
                        <div class="guide-pills-grid" id="guideStatsGrid"></div>
                    </div>
                </div>
            </div>

            <!-- 2. VITALITÀ, RESISTENZE & DADI ABILITÀ -->
            <div class="section-title">2. Statistiche</div>
            <div class="section-collapse-content">
                <div class="two-col-grid" style="margin-bottom:14px;">
                    <div class="card-box" style="margin-bottom:0;">
                        <h4>Punti Corpo, Punti Mente &amp; Condizioni</h4>
                        <div class="hp-readout">
                            <div class="field-group">
                                <label>PC Attuali:</label>
                                <input type="number" id="c_pc_curr" class="mono-input" style="width:70px; text-align:center;" oninput="AevumCreatureSheet.edited(); AevumCreatureSheet.updateHpBar();"> /
                                <label>Max:</label>
                                <input type="number" id="c_pc_max" class="mono-input" style="width:70px; text-align:center;" oninput="AevumCreatureSheet.edited(); AevumCreatureSheet.updateHpBar();">
                            </div>
                            <div class="field-group">
                                <label>PM Attuali:</label>
                                <input type="number" id="c_pm_curr" class="mono-input" style="width:60px; text-align:center;" oninput="AevumCreatureSheet.edited();"> /
                                <label>Max:</label>
                                <input type="number" id="c_pm_max" class="mono-input" style="width:60px; text-align:center;" oninput="AevumCreatureSheet.edited();">
                            </div>
                        </div>

                        <div class="hp-bar-track"><div class="hp-bar-fill" id="hpBarFill"></div></div>

                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
                            <span id="hpPercentText" class="mono" style="font-size:12px; color:var(--text-secondary);">PC: 0 / 0</span>
                            <div style="display:flex; gap:5px; flex-wrap:wrap;">
                                <button type="button" class="btn-mini dmg" onclick="AevumCreatureSheet.adjustHp(-20)">-20</button>
                                <button type="button" class="btn-mini dmg" onclick="AevumCreatureSheet.adjustHp(-10)">-10</button>
                                <button type="button" class="btn-mini dmg" onclick="AevumCreatureSheet.adjustHp(-5)">-5</button>
                                <button type="button" class="btn-mini dmg" onclick="AevumCreatureSheet.adjustHp(-1)">-1</button>
                                <button type="button" class="btn-mini" onclick="AevumCreatureSheet.fullHeal()">Max</button>
                            </div>
                        </div>

                        <label style="display:block; margin-bottom:4px;">Condizioni / Indebolimenti in gioco:</label>
                        <div class="conditions-grid" id="conditionsGrid"></div>
                    </div>

                    <div class="card-box" style="margin-bottom:0;">
                        <h4>
                            <span>Resistenze</span>
                            <span class="mono" style="font-size:12px; color:var(--accent-aether);">Somma: <span id="resTotalDisplay">0</span></span>
                        </h4>
                        <div id="resContainer"></div>
                    </div>
                </div>

                <div class="card-box">
                    <h4>Dadi Abilità</h4>
                    <div class="macro-dice-grid" id="macroDiceGrid"></div>
                </div>
            </div>

            <!-- 3. MANOVRE & PECULIARITÀ -->
            <div class="section-title">3. Manovre &amp; Peculiarità</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <h4>
                        <span>Manovre</span>
                        <button type="button" class="btn btn-sm" onclick="AevumCreatureSheet.addManeuver(); AevumCreatureSheet.edited();">+ Manovra</button>
                    </h4>
                    <div id="maneuversList"></div>
                </div>

                <div class="card-box">
                    <h4>
                        <span>Peculiarità</span>
                        <button type="button" class="btn btn-sm" onclick="AevumCreatureSheet.addPeculiarity(); AevumCreatureSheet.edited();">+ Peculiarità</button>
                    </h4>
                    <div id="peculiaritiesList"></div>
                </div>
            </div>

            <!-- 4. RICOMPENSE & CONOSCENZE -->
            <div class="section-title">4. Ricompense &amp; Conoscenze</div>
            <div class="section-collapse-content">
                <div class="two-col-grid">
                    <div class="card-box" style="margin-bottom:0;">
                        <h4>
                            <span>Ricompense (Tabella %)</span>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <input type="text" id="c_loot_rolls" class="mono-input" placeholder="X3" style="width:52px; padding:4px 6px; font-size:12px; text-align:center;" oninput="AevumCreatureSheet.edited()">
                                <button type="button" class="btn btn-secondary btn-sm" onclick="AevumCreatureSheet.rollLoot()">🎲 1d100</button>
                                <button type="button" class="btn btn-sm" onclick="AevumCreatureSheet.addLoot(); AevumCreatureSheet.edited();">+ Voce</button>
                            </div>
                        </h4>
                        <div id="lootRollResult" style="display:none; margin-bottom:10px; padding:8px 10px; border-radius:var(--radius-sm); background:var(--accent-gold-dim); border:1px solid rgba(212,163,89,0.4); font-size:12.5px;"></div>
                        <div id="lootList"></div>
                    </div>

                    <div class="card-box" style="margin-bottom:0;">
                        <h4>
                            <span>Conoscenze &amp; Punto Debole</span>
                            <button type="button" class="btn btn-sm" onclick="AevumCreatureSheet.addKnowledge(); AevumCreatureSheet.edited();">+ Conoscenza</button>
                        </h4>
                        <div id="knowledgeList"></div>
                    </div>
                </div>
            </div>

            <!-- 5. MORFOLOGIA, ETOLOGIA & NOTE -->
            <div class="section-title">5. Morfologia, Etologia &amp; Note</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <div style="margin-bottom:10px;">
                        <label>Morfologia ed Etologia:</label>
                        <textarea id="c_morphology" rows="3" oninput="AevumCreatureSheet.edited()"></textarea>
                    </div>
                    <div style="margin-bottom:10px;">
                        <label>Approfondimenti / Leggende / Curiosità:</label>
                        <textarea id="c_lore_extra" rows="3" oninput="AevumCreatureSheet.edited()"></textarea>
                    </div>
                    <div>
                        <label>Note del Giudice:</label>
                        <textarea id="c_gm_notes" rows="3" oninput="AevumCreatureSheet.edited()"></textarea>
                    </div>
                </div>
            </div>

            <div class="save-bar">
                <span style="font-size:12.5px; color:var(--text-secondary);">Scheda Creatura salvata localmente nel browser.</span>
                <button type="button" class="btn btn-success" onclick="AevumApp.saveActiveTab()">💾 Salva Creatura</button>
            </div>
        `;

        this.buildStaticSubgrids();
        window.AevumApp.bindCollapsibles(container);
        this.hydrate(draftData);
    },

    buildStaticSubgrids() {
        const condGrid = document.getElementById("conditionsGrid");
        condGrid.innerHTML = "";
        window.AevumData.CONDITIONS_LIST.forEach((lbl, idx) => {
            const chip = document.createElement("div");
            chip.className = "cond-chip";
            chip.dataset.condIdx = idx;
            chip.textContent = lbl;
            chip.onclick = () => {
                chip.classList.toggle("active");
                this.edited();
            };
            condGrid.appendChild(chip);
        });

        const resContainer = document.getElementById("resContainer");
        resContainer.innerHTML = "";
        window.AevumData.RES_KEYS.forEach((key) => {
            const row = document.createElement("div");
            row.className = "res-row";
            row.innerHTML = `
                <label>${key}</label>
                <input type="text" id="res_${key}_base" placeholder="Base" oninput="AevumCreatureSheet.calcRes(); AevumCreatureSheet.edited();"> +
                <input type="text" id="res_${key}_mod" placeholder="Mod" oninput="AevumCreatureSheet.calcRes(); AevumCreatureSheet.edited();"> =
                <span class="mono" id="res_${key}_tot" style="font-weight:700; color:var(--accent-aether); min-width:34px; text-align:center;">0</span>
                <span style="font-size:11px; color:var(--text-muted);">Spesi:</span>
                <input type="text" id="res_${key}_spent" placeholder="0" oninput="AevumCreatureSheet.edited();">
            `;
            resContainer.appendChild(row);
        });

        const diceGrid = document.getElementById("macroDiceGrid");
        diceGrid.innerHTML = "";
        const optsHtml = window.AevumData.CREATURE_DICE_OPTIONS.map((d) => `<option value="${d}">${d}</option>`).join("");
        window.AevumData.MACRO_AREAS.forEach((area) => {
            const card = document.createElement("div");
            card.className = "macro-dice-card";
            card.innerHTML = `
                <span class="macro-dice-title">${area}</span>
                <select id="dice_${area}" class="mono-input" onchange="AevumCreatureSheet.edited()">${optsHtml}</select>
            `;
            diceGrid.appendChild(card);
        });
    },

    calcRes() {
        let total = 0;
        window.AevumData.RES_KEYS.forEach((key) => {
            const b = parseInt(document.getElementById(`res_${key}_base`).value, 10) || 0;
            const m = parseInt(document.getElementById(`res_${key}_mod`).value, 10) || 0;
            const sum = b + m;
            document.getElementById(`res_${key}_tot`).textContent = sum;
            total += sum;
        });
        document.getElementById("resTotalDisplay").textContent = total;
        this.updateGuide();
    },

    updateGuide() {
        const lethVal = document.getElementById("c_lethality").value;
        const info = window.AevumData.LETHALITY_TABLE[lethVal] || window.AevumData.LETHALITY_TABLE["2"];
        document.getElementById("guideLethalityLabel").textContent = lethVal;

        const currentRes = parseInt(document.getElementById("resTotalDisplay").textContent, 10) || 0;
        const checkEl = document.getElementById("guideResCheck");
        if (info.resSum !== null) {
            const diff = currentRes - info.resSum;
            checkEl.textContent = `Resistenze: ${currentRes} / ${info.resSum} (${diff >= 0 ? "+" : ""}${diff})`;
            checkEl.style.color = diff === 0 ? "#67d39c" : "var(--warning)";
        } else {
            checkEl.textContent = `Resistenze: ${currentRes} (Mortale)`;
            checkEl.style.color = "#67d39c";
        }

        document.getElementById("guideStatsGrid").innerHTML = `
            <div class="guide-stat-box"><span class="guide-stat-label">PC Consigliati</span><span class="guide-stat-val">${info.pc}</span></div>
            <div class="guide-stat-box"><span class="guide-stat-label">Danni / Turno</span><span class="guide-stat-val">${info.dpt}</span></div>
            <div class="guide-stat-box"><span class="guide-stat-label">Abilità 1° / 2°</span><span class="guide-stat-val">${info.d1} · ${info.d2}</span></div>
            <div class="guide-stat-box"><span class="guide-stat-label">Abilità 3° / 4°</span><span class="guide-stat-val">${info.d3} · ${info.d4}</span></div>
            <div class="guide-stat-box"><span class="guide-stat-label">Tol · Vul · Imm</span><span class="guide-stat-val">${info.tol} · ${info.vuln} · ${info.imm}</span></div>
            <div class="guide-stat-box"><span class="guide-stat-label">Manovre / P.Debole</span><span class="guide-stat-val">${info.man} · ${info.weak}</span></div>
            <div class="guide-stat-box"><span class="guide-stat-label">Taglia Max</span><span class="guide-stat-val">${info.size}</span></div>
        `;
    },

    updateHpBar() {
        const curr = parseInt(document.getElementById("c_pc_curr").value, 10) || 0;
        const max = parseInt(document.getElementById("c_pc_max").value, 10) || 0;
        const fill = document.getElementById("hpBarFill");
        const txt = document.getElementById("hpPercentText");
        if (max <= 0) {
            fill.style.width = "0%";
            txt.textContent = `PC: ${curr} / 0`;
            return;
        }
        const pct = Math.max(0, Math.min(100, (curr / max) * 100));
        fill.style.width = `${pct}%`;
        fill.style.background = pct <= 25
            ? "linear-gradient(90deg, #c93b3b, #e05a5a)"
            : (pct <= 55 ? "linear-gradient(90deg, #d4a359, #e09f3e)" : "linear-gradient(90deg, #38b076, #4ea8de)");
        txt.textContent = `PC: ${curr} / ${max} (${Math.round(pct)}%)`;
    },

    adjustHp(delta) {
        const el = document.getElementById("c_pc_curr");
        el.value = Math.max(0, (parseInt(el.value, 10) || 0) + delta);
        this.updateHpBar();
        this.edited();
    },

    fullHeal() {
        const max = parseInt(document.getElementById("c_pc_max").value, 10) || 0;
        if (max > 0) {
            document.getElementById("c_pc_curr").value = max;
            this.updateHpBar();
            this.edited();
        }
    },

    handlePortrait(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            this.portraitBase64 = ev.target.result;
            this.updatePortraitUI();
            this.edited();
        };
        reader.readAsDataURL(file);
    },

    removePortrait() {
        this.portraitBase64 = "";
        const inp = document.getElementById("portraitInput");
        if (inp) inp.value = "";
        this.updatePortraitUI();
        if (!this.isHydrating) this.edited();
    },

    updatePortraitUI() {
        const preview = document.getElementById("portraitPreview");
        if (!preview) return;
        preview.innerHTML = this.portraitBase64
            ? `<img src="${this.portraitBase64}" alt="Illustrazione">`
            : `<span class="portrait-placeholder">Nessuna Illustrazione</span>`;
    },

    addManeuver(data = {}) {
        const container = document.getElementById("maneuversList");
        const card = document.createElement("div");
        card.className = "sub-card maneuver-item";
        const t = data.type || "MANOVRA [ATTACCO]";
        card.innerHTML = `
            <div class="sub-card-top">
                <input type="text" class="m-name" placeholder="Nome Manovra" value="${this.escAttr(data.name)}" style="flex:1.5; min-width:140px; font-weight:600;" oninput="AevumCreatureSheet.edited()">
                <select class="m-type" onchange="AevumCreatureSheet.edited()">
                    <option value="MANOVRA [ATTACCO]" ${t === "MANOVRA [ATTACCO]" ? "selected" : ""}>MANOVRA [ATTACCO]</option>
                    <option value="MANOVRA [MAESTRIA]" ${t === "MANOVRA [MAESTRIA]" ? "selected" : ""}>MANOVRA [MAESTRIA]</option>
                    <option value="MANOVRA [BASE]" ${t === "MANOVRA [BASE]" ? "selected" : ""}>MANOVRA [BASE]</option>
                    <option value="Contrasto" ${t === "Contrasto" ? "selected" : ""}>Contrasto</option>
                    <option value="Sinergia" ${t === "Sinergia" ? "selected" : ""}>Sinergia</option>
                </select>
                <input type="text" class="m-range" placeholder="Portata / Gittata" value="${this.escAttr(data.range)}" style="width:125px;" oninput="AevumCreatureSheet.edited()">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.maneuver-item').remove(); AevumCreatureSheet.edited();">🗑</button>
            </div>
            <div class="row" style="margin-bottom:8px;">
                <input type="text" class="m-damage" placeholder="Danni" value="${this.escAttr(data.damage)}" style="flex:1.4; min-width:170px;" oninput="AevumCreatureSheet.edited()">
                <input type="text" class="m-crit" placeholder="Risultato Critico" value="${this.escAttr(data.crit)}" style="flex:1.4; min-width:170px;" oninput="AevumCreatureSheet.edited()">
            </div>
            <textarea class="m-desc" rows="2" placeholder="Descrizione" oninput="AevumCreatureSheet.edited()">${this.escHtml(data.desc)}</textarea>
        `;
        container.appendChild(card);
    },

    addPeculiarity(data = {}) {
        const container = document.getElementById("peculiaritiesList");
        const card = document.createElement("div");
        card.className = "sub-card pec-item";
        card.innerHTML = `
            <div class="sub-card-top">
                <input type="text" class="p-name" placeholder="Nome Peculiarità" value="${this.escAttr(data.name)}" style="flex:1; font-weight:600;" oninput="AevumCreatureSheet.edited()">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.pec-item').remove(); AevumCreatureSheet.edited();">🗑</button>
            </div>
            <textarea class="p-desc" rows="2" placeholder="Descrizione" oninput="AevumCreatureSheet.edited()">${this.escHtml(data.desc)}</textarea>
        `;
        container.appendChild(card);
    },

    addLoot(data = {}) {
        const container = document.getElementById("lootList");
        const card = document.createElement("div");
        card.className = "sub-card loot-item";
        card.innerHTML = `
            <div class="sub-card-top">
                <input type="text" class="l-range mono-input" placeholder="1-50%" value="${this.escAttr(data.range)}" style="width:95px; text-align:center;" oninput="AevumCreatureSheet.edited()">
                <input type="text" class="l-item" placeholder="Oggetto / Reagente" value="${this.escAttr(data.item)}" style="flex:1.4; min-width:130px; font-weight:600;" oninput="AevumCreatureSheet.edited()">
                <input type="text" class="l-val" placeholder="Valore" value="${this.escAttr(data.value)}" style="width:85px;" oninput="AevumCreatureSheet.edited()">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.loot-item').remove(); AevumCreatureSheet.edited();">🗑</button>
            </div>
            <textarea class="l-note" rows="2" placeholder="Descrizione" oninput="AevumCreatureSheet.edited()">${this.escHtml(data.note)}</textarea>
        `;
        container.appendChild(card);
    },

    rollLoot() {
        const roll = Math.floor(Math.random() * 100) + 1;
        const box = document.getElementById("lootRollResult");
        const rows = Array.from(document.querySelectorAll("#lootList .loot-item")).map((el) => ({
            range: el.querySelector(".l-range").value.trim(),
            item: el.querySelector(".l-item").value.trim(),
            val: el.querySelector(".l-val").value.trim()
        }));

        let found = "Nessuna fascia corrispondente.";
        for (const r of rows) {
            const m = r.range.match(/(\d+)\s*[-–]\s*(\d+)/);
            if (m && roll >= parseInt(m[1], 10) && roll <= parseInt(m[2], 10)) {
                found = `<strong>${this.escHtml(r.item || "Ricompensa")}</strong>${r.val ? ` (${this.escHtml(r.val)})` : ""}`;
                break;
            }
        }
        box.style.display = "block";
        box.innerHTML = `Tiro <strong>1d100 = <span class="mono" style="color:var(--accent-gold);">${roll}</span></strong> → ${found}`;
    },

    addKnowledge(data = {}) {
        const container = document.getElementById("knowledgeList");
        const card = document.createElement("div");
        card.className = "sub-card know-item";
        const diff = data.difficulty || "Semplice";
        card.innerHTML = `
            <div class="sub-card-top">
                <input type="text" class="k-title" placeholder="Titolo Conoscenza" value="${this.escAttr(data.title)}" style="flex:1.4; min-width:130px; font-weight:600;" oninput="AevumCreatureSheet.edited()">
                <select class="k-diff" onchange="AevumCreatureSheet.edited()">
                    <option value="Semplice" ${diff === "Semplice" ? "selected" : ""}>Semplice</option>
                    <option value="Media" ${diff === "Media" ? "selected" : ""}>Media</option>
                    <option value="Difficile" ${diff === "Difficile" ? "selected" : ""}>Difficile</option>
                    <option value="Ardua" ${diff === "Ardua" ? "selected" : ""}>Ardua</option>
                    <option value="Eroica" ${diff === "Eroica" ? "selected" : ""}>Eroica</option>
                </select>
                <input type="text" class="k-skill" placeholder="[Abilità]" value="${this.escAttr(data.skill)}" style="width:125px;" oninput="AevumCreatureSheet.edited()">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.know-item').remove(); AevumCreatureSheet.edited();">🗑</button>
            </div>
            <textarea class="k-quote" rows="2" placeholder="Estratto narrativo" style="margin-bottom:6px;" oninput="AevumCreatureSheet.edited()">${this.escHtml(data.quote)}</textarea>
            <textarea class="k-benefit" rows="2" placeholder="Beneficio meccanico" oninput="AevumCreatureSheet.edited()">${this.escHtml(data.benefit)}</textarea>
        `;
        container.appendChild(card);
    },

    collectData(existingId) {
        const conditions = Array.from(document.querySelectorAll("#conditionsGrid .cond-chip.active"))
            .map((el) => parseInt(el.dataset.condIdx, 10));

        const resistances = {};
        window.AevumData.RES_KEYS.forEach((key) => {
            resistances[key] = {
                base: document.getElementById(`res_${key}_base`).value.trim(),
                mod: document.getElementById(`res_${key}_mod`).value.trim(),
                spent: document.getElementById(`res_${key}_spent`).value.trim()
            };
        });

        const dice = {};
        window.AevumData.MACRO_AREAS.forEach((area) => {
            const noteEl = document.getElementById(`dice_${area}_note`);
            dice[area] = {
                die: document.getElementById(`dice_${area}`).value,
                note: noteEl ? noteEl.value.trim() : ""
            };
        });

        const maneuvers = Array.from(document.querySelectorAll("#maneuversList .maneuver-item")).map((el) => ({
            name: el.querySelector(".m-name").value.trim(),
            type: el.querySelector(".m-type").value,
            range: el.querySelector(".m-range").value.trim(),
            damage: el.querySelector(".m-damage").value.trim(),
            crit: el.querySelector(".m-crit").value.trim(),
            desc: el.querySelector(".m-desc").value.trim()
        })).filter((m) => m.name || m.damage || m.desc);

        const peculiarities = Array.from(document.querySelectorAll("#peculiaritiesList .pec-item")).map((el) => ({
            name: el.querySelector(".p-name").value.trim(),
            desc: el.querySelector(".p-desc").value.trim()
        })).filter((p) => p.name || p.desc);

        const loot = Array.from(document.querySelectorAll("#lootList .loot-item")).map((el) => ({
            range: el.querySelector(".l-range").value.trim(),
            item: el.querySelector(".l-item").value.trim(),
            value: el.querySelector(".l-val").value.trim(),
            note: el.querySelector(".l-note").value.trim()
        })).filter((l) => l.range || l.item || l.note);

        const knowledge = Array.from(document.querySelectorAll("#knowledgeList .know-item")).map((el) => ({
            title: el.querySelector(".k-title").value.trim(),
            difficulty: el.querySelector(".k-diff").value,
            skill: el.querySelector(".k-skill").value.trim(),
            quote: el.querySelector(".k-quote").value.trim(),
            benefit: el.querySelector(".k-benefit").value.trim()
        })).filter((k) => k.title || k.quote || k.benefit);

        return {
            id: existingId,
            entityType: "creature",
            name: document.getElementById("c_name").value.trim(),
            epithet: document.getElementById("c_epithet").value.trim(),
            category: document.getElementById("c_category").value.trim(),
            size: document.getElementById("c_size").value,
            lethality: document.getElementById("c_lethality").value,
            maneuversPerRound: document.getElementById("c_maneuvers_round").value.trim(),
            movement: document.getElementById("c_movement").value.trim(),
            languages: document.getElementById("c_languages").value.trim(),
            habitat: document.getElementById("c_habitat").value.trim(),
            vulnerabilities: document.getElementById("c_vuln").value.trim(),
            tolerances: document.getElementById("c_tol").value.trim(),
            immunities: document.getElementById("c_imm").value.trim(),
            description: document.getElementById("c_description").value,
            portrait: this.portraitBase64,
            pcCurr: document.getElementById("c_pc_curr").value.trim(),
            pcMax: document.getElementById("c_pc_max").value.trim(),
            pmCurr: document.getElementById("c_pm_curr").value.trim(),
            pmMax: document.getElementById("c_pm_max").value.trim(),
            conditions,
            resistances,
            dice,
            lootRolls: document.getElementById("c_loot_rolls").value.trim(),
            maneuvers,
            peculiarities,
            loot,
            knowledge,
            morphology: document.getElementById("c_morphology").value,
            loreExtra: document.getElementById("c_lore_extra").value,
            gmNotes: document.getElementById("c_gm_notes").value
        };
    },

    hydrate(c) {
        this.isHydrating = true;
        const d = c || {};

        document.getElementById("c_name").value = d.name || "";
        document.getElementById("c_epithet").value = d.epithet || "";
        document.getElementById("c_category").value = d.category || "";
        document.getElementById("c_size").value = d.size || "-";
        document.getElementById("c_lethality").value = d.lethality || "2";
        document.getElementById("c_maneuvers_round").value = d.maneuversPerRound || "";
        document.getElementById("c_movement").value = d.movement || "";
        document.getElementById("c_languages").value = d.languages || "";
        document.getElementById("c_habitat").value = d.habitat || "";
        document.getElementById("c_vuln").value = d.vulnerabilities || "";
        document.getElementById("c_tol").value = d.tolerances || "";
        document.getElementById("c_imm").value = d.immunities || "";
        document.getElementById("c_description").value = d.description || "";

        this.portraitBase64 = d.portrait || "";
        this.updatePortraitUI();

        document.getElementById("c_pc_curr").value = d.pcCurr ?? "";
        document.getElementById("c_pc_max").value = d.pcMax ?? "";
        document.getElementById("c_pm_curr").value = d.pmCurr ?? "";
        document.getElementById("c_pm_max").value = d.pmMax ?? "";
        this.updateHpBar();

        const condSet = new Set(d.conditions || []);
        document.querySelectorAll("#conditionsGrid .cond-chip").forEach((chip) => {
            chip.classList.toggle("active", condSet.has(parseInt(chip.dataset.condIdx, 10)));
        });

        window.AevumData.RES_KEYS.forEach((key) => {
            const r = (d.resistances && d.resistances[key]) || {};
            document.getElementById(`res_${key}_base`).value = r.base ?? "";
            document.getElementById(`res_${key}_mod`).value = r.mod ?? "";
            document.getElementById(`res_${key}_spent`).value = r.spent ?? "";
        });
        this.calcRes();

        window.AevumData.MACRO_AREAS.forEach((area) => {
            const sk = (d.dice && d.dice[area]) || {};
            document.getElementById(`dice_${area}`).value = sk.die || "—";
            const noteEl = document.getElementById(`dice_${area}_note`);
            if (noteEl) noteEl.value = sk.note || "";
        });

        document.getElementById("c_loot_rolls").value = d.lootRolls || "";

        const manCont = document.getElementById("maneuversList");
        manCont.innerHTML = "";
        if (d.maneuvers && d.maneuvers.length) d.maneuvers.forEach((m) => this.addManeuver(m));
        else this.addManeuver();

        const pecCont = document.getElementById("peculiaritiesList");
        pecCont.innerHTML = "";
        if (d.peculiarities && d.peculiarities.length) d.peculiarities.forEach((p) => this.addPeculiarity(p));
        else this.addPeculiarity();

        const lootCont = document.getElementById("lootList");
        lootCont.innerHTML = "";
        if (d.loot && d.loot.length) d.loot.forEach((l) => this.addLoot(l));
        else this.addLoot();

        const knowCont = document.getElementById("knowledgeList");
        knowCont.innerHTML = "";
        if (d.knowledge && d.knowledge.length) d.knowledge.forEach((k) => this.addKnowledge(k));
        else this.addKnowledge();

        document.getElementById("c_morphology").value = d.morphology || "";
        document.getElementById("c_lore_extra").value = d.loreExtra || "";
        document.getElementById("c_gm_notes").value = d.gmNotes || "";

        this.isHydrating = false;
    },

    buildAiPromptText() {
        const d = this.collectData(null);
        const table = window.AevumData.LETHALITY_TABLE || {};
        const info = table[d.lethality] || table["2"];
        const rulesObj = window.AevumData.RULES_REFERENCE_FOR_AI || {};
        const phylaList = window.AevumData.PHYLUM_LIST || [];

        const contextBlob = [
            d.name, d.epithet, d.category, d.movement, d.habitat,
            d.vulnerabilities, d.tolerances, d.immunities, d.description,
            ...d.maneuvers.map((m) => `${m.name} ${m.desc} ${m.crit} ${m.damage}`),
            ...d.peculiarities.map((p) => `${p.name} ${p.desc}`)
        ].filter(Boolean).join(" ").toLowerCase();

        const selectedRules = [...(rulesObj.core || [])];
        (rulesObj.contextual || []).forEach((rule) => {
            if (rule.keywords.some((kw) => contextBlob.includes(kw))) {
                selectedRules.push(rule.text);
            }
        });

        const catLower = (d.category || "").trim().toLowerCase();
        const isOfficialPhylum = phylaList.some((p) => p.toLowerCase() === catLower);
        if (d.category && !isOfficialPhylum) {
            selectedRules.unshift(
                `Phylum del sistema: I 7 Phylum ufficiali sono ${phylaList.join(", ")}. La scheda indica "${d.category}" come Tipo/Natura: mantieni questa descrizione e indica anche a quale Phylum ufficiale (o combinazione, es. Ritornato/Morbo) appartiene.`
            );
        } else if (!d.category) {
            selectedRules.unshift(
                `Phylum ufficiali del sistema: ${phylaList.join(", ")}. Scegli quello più coerente con la descrizione.`
            );
        }

        const identityLines = [
            `- Nome: ${d.name || "[Da inventare]"}`,
            `- Nome Scientifico / Epiteto: ${d.epithet || "[Da inventare]"}`,
            `- Tipo / Natura (Phylum): ${d.category || "[Da definire]"}`,
            `- Taglia: ${d.size !== "-" ? d.size : `[Da definire — Max consentita: ${info.size}]`}`,
            `- Letalità: ${d.lethality}`,
            `- Manovre per Round: ${d.maneuversPerRound || info.man}`,
            `- Movimento [Base]: ${d.movement || "[Da definire]"}`,
            `- Linguaggi: ${d.languages || "Nessuno"}`,
            `- Habitat / Regione: ${d.habitat || "[Da definire]"}`
        ].join("\n");

        const resValues = window.AevumData.RES_KEYS.map((k) => {
            const b = parseInt(d.resistances[k]?.base, 10) || 0;
            const m = parseInt(d.resistances[k]?.mod, 10) || 0;
            return { key: k, b, m, tot: b + m };
        });
        const totalResSet = resValues.reduce((acc, r) => acc + r.tot, 0);
        const resLine = totalResSet > 0
            ? resValues.map((r) => `${r.key}: ${r.tot} (Base ${r.b}${r.m ? `, Mod ${r.m >= 0 ? "+" : ""}${r.m}` : ""})`).join(" | ")
            : `[Da ripartire su VIG, RIF, INT, PRE — Somma totale esatta: ${info.resSum !== null ? info.resSum : "Libera (Mortale)"}]`;

        const setDice = window.AevumData.MACRO_AREAS
            .map((area) => ({ area, die: d.dice[area]?.die || "—", note: d.dice[area]?.note || "" }))
            .filter((x) => x.die !== "—" || x.note);
        const diceLine = setDice.length > 0
            ? setDice.map((x) => `${x.area}: ${x.die}${x.note ? ` (${x.note})` : ""}`).join(" | ") + ` [Completa le aree mancanti secondo lo schema ${info.d1} / ${info.d2} / ${info.d3} / ${info.d4}]`
            : `[Da assegnare a Vigore, Riflessi, Intuito, Prestigio secondo lo schema 1°/2°/3°/4°: ${info.d1} / ${info.d2} / ${info.d3} / ${info.d4}]`;

        const existingBlocks = [];
        if (d.maneuvers.length > 0) {
            existingBlocks.push("Manovre già inserite:\n" + d.maneuvers.map((m) =>
                `- ${m.name || "Senza nome"} [${m.type}]${m.range ? ` | Portata: ${m.range}` : ""}${m.damage ? ` | Danni: ${m.damage}` : ""}${m.crit ? ` | Critico: ${m.crit}` : ""}${m.desc ? ` — ${m.desc}` : ""}`
            ).join("\n"));
        }
        if (d.peculiarities.length > 0) {
            existingBlocks.push("Peculiarità già inserite:\n" + d.peculiarities.map((p) =>
                `- ${p.name || "Tratto"}: ${p.desc || ""}`
            ).join("\n"));
        }
        if (d.loot.length > 0) {
            existingBlocks.push(`Ricompense già inserite (Tiri: ${d.lootRolls || "X2"}):\n` + d.loot.map((l) =>
                `- ${l.range || "?"}: ${l.item || "?"}${l.value ? ` (${l.value})` : ""}${l.note ? ` — ${l.note}` : ""}`
            ).join("\n"));
        }
        if (d.knowledge.length > 0) {
            existingBlocks.push("Conoscenze già inserite:\n" + d.knowledge.map((k) =>
                `- ${k.title || "Voce"} [${k.difficulty}${k.skill ? ` - ${k.skill}` : ""}]: ${k.benefit || k.quote || ""}`
            ).join("\n"));
        }

        const existingSection = existingBlocks.length > 0
            ? `\n=== ELEMENTI GIÀ PRESENTI IN SCHEDA (MANTIENI E COMPLETA) ===\n${existingBlocks.join("\n\n")}\n`
            : "";

        return `Sei un Game Designer esperto per il gioco di ruolo "Aevum: I Frammenti dell'Anima".
Crea o completa in italiano la scheda meccanica e narrativa di questa creatura rispettando i parametri impostati e le regole del sistema riportate di seguito.

=== REGOLE DI RIFERIMENTO PERTINENTI ===
${selectedRules.map((r) => `- ${r}`).join("\n")}

=== PARAMETRI TARGET (TABELLA 26.1 — LETALITÀ ${d.lethality}) ===
- PC Consigliati: ${info.pc} | Danni per Turno (DPT): ${info.dpt}
- Somma Resistenze: ${info.resSum !== null && info.resSum !== undefined ? info.resSum : "Libera (Mortale)"}
- Dadi Abilità (1° / 2° / 3° / 4°): ${info.d1} / ${info.d2} / ${info.d3} / ${info.d4}
- Tolleranze / Vulnerabilità / Immunità: ${info.tol} / ${info.vuln} / ${info.imm}
- Manovre per Round: ${info.man} | Difficoltà Punto Debole: ${info.weak} | Taglia Max: ${info.size}

=== IDENTITÀ & DESCRIZIONE CREATURA ===
${identityLines}
- Descrizione:
${d.description && d.description.trim() ? d.description.trim() : "[Nessuna descrizione inserita: generane una coerente con i parametri sopra]"}

=== PARAMETRI MECCANICI ===
- Punti Corpo (PC Max): ${d.pcMax || `[Imposta entro ${info.pc}]`} | Punti Mente (PM Max): ${d.pmMax || "[Da definire]"}
- Resistenze: ${resLine}
- Dadi Abilità: ${diceLine}
- Vulnerabilità: ${d.vulnerabilities || `[Scegli ${info.vuln} tipi di danno coerenti]`}
- Tolleranze: ${d.tolerances || `[Scegli ${info.tol} tipi di danno coerenti]`}
- Immunità: ${d.immunities || (String(info.imm) === "0" ? "Nessuna (0 consigliate per questa Letalità)" : `[Scegli ${info.imm} tipi di danno coerenti]`)}
${existingSection}
=== OUTPUT RICHIESTO ===
Restituisci in modo ordinato e pronto da trascrivere nella scheda:
1. Campi mancanti di Identità (Nome, Epiteto, Phylum, Movimento, Vulnerabilità, Tolleranze, Immunità).
2. Ripartizione esatta di PC Max, PM Max, Resistenze (VIG, RIF, INT, PRE) e Dadi Abilità (Vigore, Riflessi, Intuito, Prestigio).
3. Manovre complete (con nomi distinti se presenti più MANOVRE [ATTACCO], Tipo [MANOVRA ATTACCO / MANOVRA MAESTRIA / MANOVRA BASE / Contrasto / Sinergia], Portata, Danni coerenti con DPT ${info.dpt}, Risultato Critico ed Effetto).
4. Peculiarità e Tratti speciali.
5. Tabella Ricompense 1-100% (Tiri: ${d.lootRolls || "X2"}, con oggetti/reagenti, valore ed effetto).
6. Conoscenze (Semplice / Media / Difficile / Ardua / Eroica) includendo il Punto Debole alla difficoltà "${info.weak}": per ciascuna indica Titolo, Fonte/Abilità associata, un brano narrativo/testimonianza in corsivo o virgolette (come estratto da diario, rapporto imperiale, cronaca o racconto) e, dove rilevante, l'Effetto meccanico espresso con le regole del sistema.
7. Morfologia ed Etologia, Leggende/Curiosità e Note tattiche per il Giudice.`;
    },

    openAiPromptModal() {
        const modal = document.getElementById("aiPromptModal");
        const textarea = document.getElementById("aiPromptTextarea");
        const copyBtn = document.getElementById("copyAiPromptBtn");
        if (!modal || !textarea) return;
        textarea.value = this.buildAiPromptText();
        if (copyBtn) copyBtn.textContent = "📋 Copia Prompt";
        modal.classList.add("open");
    },

    closeAiPromptModal() {
        const modal = document.getElementById("aiPromptModal");
        if (modal) modal.classList.remove("open");
    },

    async copyAiPrompt() {
        const textarea = document.getElementById("aiPromptTextarea");
        const copyBtn = document.getElementById("copyAiPromptBtn");
        if (!textarea) return;
        try {
            await navigator.clipboard.writeText(textarea.value);
        } catch {
            textarea.select();
            document.execCommand("copy");
        }
        if (copyBtn) copyBtn.textContent = "✓ Copiato!";
        window.AevumApp.showToast("Prompt IA copiato negli appunti!", "success");
    },

    edited() {
        if (this.isHydrating) return;
        window.AevumApp.onActiveSheetEdited();
    }
};
