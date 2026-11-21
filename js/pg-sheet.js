window.AevumPgSheet = {
    skillState: {},
    bodyPointsCount: 0,
    debuffsState: {},
    portraitBase64: "",
    isHydrating: false,

    escAttr(str) {
        return String(str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    },

    escHtml(str) {
        return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    render(container, draftData, isSavedInDb, isDirty) {
        const roleType = draftData.entityType === "pg" ? "pg" : "png";
        const roleLabel = roleType === "pg" ? "PG" : "PNG";
        const titleName = (draftData.name && draftData.name.trim()) ? draftData.name.trim() : `Nuovo ${roleLabel}`;

        const speciesOpts = window.AevumData.SPECIES_LIST.map((s) => `<option value="${s}">${s}</option>`).join("");
        const originOpts = window.AevumData.ORIGINS_LIST.map((o) => `<option value="${this.escAttr(o)}">${this.escHtml(o)}</option>`).join("");
        const vocOpts = window.AevumData.VOCATIONS_LIST.map((v) => `<option value="${this.escAttr(v)}">${this.escHtml(v)}</option>`).join("");
        const bloodOpts = window.AevumData.BLOODLINES_LIST.map((b) => `<option value="${b}">${b}</option>`).join("");

        container.innerHTML = `
            <div class="sheet-header-bar">
                <h2 class="sheet-header-title">
                    <span class="cat-badge ${roleType}" id="pgRoleBadge">${roleLabel}</span>
                    <span id="sheetTitleText">${this.escHtml(titleName)}</span>
                    <span class="status-badge ${isDirty ? "unsaved" : (isSavedInDb ? "saved" : "")}" id="saveStatusBadge">
                        ${isDirty ? "Modifiche non salvate" : (isSavedInDb ? "Salvato" : "Bozza")}
                    </span>
                </h2>
                <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
                    <div class="field-group">
                        <label for="pg_entity_type">Categoria:</label>
                        <select id="pg_entity_type" onchange="AevumPgSheet.changeRoleType(this.value)">
                            <option value="pg" ${roleType === "pg" ? "selected" : ""}>PG (Giocatore)</option>
                            <option value="png" ${roleType === "png" ? "selected" : ""}>PNG (Non Giocante)</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-danger btn-sm" onclick="AevumApp.requestDeleteActive()">🗑 Elimina</button>
                    <button type="button" class="btn btn-success btn-sm" onclick="AevumApp.saveActiveTab()">💾 Salva Scheda</button>
                </div>
            </div>

            <!-- 1. INFORMAZIONI GENERALI -->
            <div class="section-title">1. Informazioni Generali</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <div class="info-layout">
                        <div class="info-fields">
                            <div class="row">
                                <div class="field-group" style="flex:2; min-width:180px;">
                                    <label>Nome:</label>
                                    <input type="text" id="name" style="flex:1; min-width:130px;" oninput="AevumPgSheet.edited()">
                                </div>
                                <div class="field-group">
                                    <label>Specie:</label>
                                    <select id="species_select" onchange="AevumPgSheet.toggleCustom('species'); AevumPgSheet.edited();">
                                        <option value="-">- Seleziona -</option>
                                        ${speciesOpts}
                                        <option value="custom">Personalizzata...</option>
                                    </select>
                                    <input type="text" id="species_custom" style="width:120px; display:none;" placeholder="Specie..." oninput="AevumPgSheet.edited()">
                                </div>
                                <div class="field-group">
                                    <label>Livello:</label>
                                    <input type="text" id="level" class="mono-input" style="width:52px; text-align:center;" oninput="AevumPgSheet.edited()">
                                </div>
                            </div>

                            <div class="row">
                                <div class="field-group">
                                    <label>Clessidre (Tot / Spese):</label>
                                    <input type="text" id="cless_tot" class="mono-input" style="width:48px; text-align:center;" oninput="AevumPgSheet.edited()"> /
                                    <input type="text" id="cless_spese" class="mono-input" style="width:48px; text-align:center;" oninput="AevumPgSheet.edited()">
                                </div>
                                <div class="field-group">
                                    <label>Movimento (Base / Attuale):</label>
                                    <input type="text" id="movimento_base" class="mono-input" style="width:62px; text-align:center;" placeholder="Base" oninput="AevumPgSheet.edited()"> /
                                    <input type="text" id="movimento_att" class="mono-input" style="width:62px; text-align:center;" placeholder="Att." oninput="AevumPgSheet.edited()">
                                </div>
                            </div>

                            <div class="row">
                                <div class="field-group" style="flex:1; min-width:240px;">
                                    <label>Origine:</label>
                                    <select id="origin_select" style="flex:1; min-width:180px;" onchange="AevumPgSheet.toggleCustom('origin'); AevumPgSheet.edited();">
                                        <option value="-">- Seleziona Origine -</option>
                                        ${originOpts}
                                        <option value="custom">Personalizzata...</option>
                                    </select>
                                    <input type="text" id="origin_custom" style="width:180px; display:none;" placeholder="Specifica origine..." oninput="AevumPgSheet.edited()">
                                </div>
                            </div>

                            <div style="margin-bottom:10px;">
                                <label>Domanda del Musafir:</label>
                                <textarea id="origin_domanda" rows="2" oninput="AevumPgSheet.edited()"></textarea>
                            </div>

                            <div class="row">
                                <div class="field-group">
                                    <label>Vocazione:</label>
                                    <select id="vocation_select" onchange="AevumPgSheet.toggleCustom('vocation'); AevumPgSheet.edited();">
                                        <option value="-">- Seleziona Vocazione -</option>
                                        ${vocOpts}
                                        <option value="custom">Personalizzata...</option>
                                    </select>
                                    <input type="text" id="vocation_custom" style="width:170px; display:none;" placeholder="Specifica vocazione..." oninput="AevumPgSheet.edited()">
                                </div>
                                <div class="field-group" style="flex:1; min-width:180px;">
                                    <label>Titolo:</label>
                                    <input type="text" id="character_title" style="flex:1;" placeholder="Titolo del personaggio..." oninput="AevumPgSheet.edited()">
                                </div>
                            </div>

                            <div>
                                <label>Privilegi:</label>
                                <textarea id="vocation_privilegi" rows="2" oninput="AevumPgSheet.edited()"></textarea>
                            </div>
                        </div>

                        <div class="portrait-container">
                            <div class="portrait-preview" id="portraitPreview">
                                <span class="portrait-placeholder">Nessun Ritratto</span>
                            </div>
                            <input type="file" id="portraitInput" accept="image/*" style="display:none;" onchange="AevumPgSheet.handlePortrait(event)">
                            <div style="display:flex; gap:6px; width:100%;">
                                <button type="button" class="btn btn-secondary btn-sm" style="flex:1;" onclick="document.getElementById('portraitInput').click()">Carica</button>
                                <button type="button" class="btn btn-danger btn-sm" onclick="AevumPgSheet.removePortrait()">🗑</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. ABILITÀ -->
            <div class="section-title">2. Abilità e Dadi Associati</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <div class="skills-grid" id="skillsContainer"></div>
                </div>
            </div>

            <!-- 3. RESISTENZE, PUNTI CORPO E PUNTI MENTE -->
            <div class="section-title">3. Resistenze, Punti Corpo e Punti Mente</div>
            <div class="section-collapse-content">
                <div class="res-body-grid">
                    <div class="card-box" style="margin-bottom:0;">
                        <h4>
                            <span>Resistenze (B+A+M+Al = Tot / Spesi)</span>
                            <span class="mono" style="font-size:12px;">Tot: <span id="totalResSum" style="color:var(--accent-aether);">0</span></span>
                        </h4>
                        <div id="resContainer"></div>
                    </div>

                    <div class="card-box" style="margin-bottom:0;">
                        <h4>
                            <span>Punti Corpo (60 Max) &amp; Indebolimenti</span>
                            <span class="mono" style="font-size:12px; color:var(--accent-aether);"><span id="bodyPointsReadout">0</span> / 60</span>
                        </h4>
                        <div id="bodyPointsContainer"></div>
                    </div>
                </div>

                <div class="card-box">
                    <h4>Punti Mente &amp; Scariche di Follia</h4>
                    <div class="row">
                        <label>Punti Mente (Att / Max):</label>
                        <input type="text" id="mind_curr" class="mono-input" style="width:52px; text-align:center;" oninput="AevumPgSheet.edited()"> /
                        <input type="text" id="mind_max" class="mono-input" style="width:52px; text-align:center;" oninput="AevumPgSheet.edited()">
                    </div>
                    <div style="margin-top:12px; border-top:1px solid var(--border-subtle); padding-top:10px;">
                        <label style="font-weight:600; color:var(--text-primary);">Scariche di Follia (Max 6):</label>
                        <div id="madnessList" style="margin-top:6px;"></div>
                        <button type="button" class="btn btn-secondary btn-sm" id="addMadnessBtn" style="margin-top:8px;" onclick="AevumPgSheet.addMadnessRow(); AevumPgSheet.edited();">+ Aggiungi Scarica di Follia</button>
                    </div>
                </div>
            </div>

            <!-- 4. COMBATTIMENTO ED EQUIPAGGIAMENTO -->
            <div class="section-title">4. Combattimento ed Equipaggiamento</div>
            <div class="section-collapse-content">
                ${this.renderWeaponBox("Arma Principale", "w1")}
                ${this.renderWeaponBox("Arma Secondaria", "w2")}

                <div class="card-box">
                    <h4>
                        <span>Munizioni</span>
                        <button type="button" class="btn btn-sm" onclick="AevumPgSheet.addAmmoRow(); AevumPgSheet.edited();">+ Munizioni</button>
                    </h4>
                    <div id="ammoList" class="ammo-grid"></div>
                </div>

                ${this.renderArmorBox()}

                <div class="card-box">
                    <h4>Equipaggiamento &amp; Tasche</h4>
                    <div class="two-col-grid">
                        <div style="background:var(--bg-card); border:1px solid var(--border); padding:12px; border-radius:var(--radius-sm);">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <strong>Tasca Laterale</strong>
                                <span class="mono" style="font-size:12px;">Ingombro: <span id="sidePocketSum" style="color:var(--accent-aether);">0</span> / 8</span>
                            </div>
                            <div id="sidePocketList"></div>
                            <button type="button" class="btn btn-secondary btn-sm" style="margin-top:6px;" onclick="AevumPgSheet.addPocketRow('side'); AevumPgSheet.edited();">+ Oggetto</button>
                        </div>

                        <div style="background:var(--bg-card); border:1px solid var(--border); padding:12px; border-radius:var(--radius-sm);">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <strong>Tasca Centrale</strong>
                                <span class="mono" style="font-size:12px;">Ingombro: <span id="centralPocketSum" style="color:var(--accent-aether);">0</span> / 22</span>
                            </div>
                            <div id="centralPocketList"></div>
                            <button type="button" class="btn btn-secondary btn-sm" style="margin-top:6px;" onclick="AevumPgSheet.addPocketRow('central'); AevumPgSheet.edited();">+ Oggetto</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 5. MAESTRIE -->
            <div class="section-title">5. Maestrie</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <h4>
                        <span>Elenco Maestrie</span>
                        <span class="mono" style="font-size:12px;">Totale Costo: <span id="masterySum" style="color:var(--accent-aether);">0</span></span>
                    </h4>
                    <div id="masteryList"></div>
                    <button type="button" class="btn btn-sm" style="width:100%; margin-top:6px;" onclick="AevumPgSheet.addMasteryRow(); AevumPgSheet.edited();">+ Aggiungi Maestria</button>
                </div>
            </div>

            <!-- 6. DENARO, REAGENTI & ARTIFICI -->
            <div class="section-title">6. Denaro, Borsa dei Reagenti &amp; Artifici</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <h4>Denaro</h4>
                    <div class="row">
                        <div class="field-group"><label>Auri:</label><input type="text" id="auri" class="mono-input" style="width:85px;" oninput="AevumPgSheet.edited()"></div>
                        <div class="field-group"><label>Crune:</label><input type="text" id="crune" class="mono-input" style="width:85px;" oninput="AevumPgSheet.edited()"></div>
                        <div class="field-group"><label>Placche:</label><input type="text" id="placche" class="mono-input" style="width:85px;" oninput="AevumPgSheet.edited()"></div>
                    </div>
                </div>

                <div class="two-col-grid">
                    <div class="card-box" style="margin-bottom:0;">
                        <h4>
                            <span>Borsa dei Reagenti</span>
                            <span class="mono" style="font-size:11.5px; display:flex; align-items:center; gap:5px;">
                                Cap: <span id="reagentSum" style="color:var(--accent-aether);">0</span> /
                                <select id="reagentMaxCap_select" style="padding:2px 4px; font-size:11.5px;" onchange="AevumPgSheet.toggleCustom('reagentCap'); AevumPgSheet.edited();">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="custom">Custom</option>
                                </select>
                                <input type="number" id="reagentMaxCap_custom" style="width:52px; padding:2px 4px; display:none;" oninput="AevumPgSheet.edited()">
                            </span>
                        </h4>
                        <div id="reagentsList"></div>
                        <button type="button" class="btn btn-secondary btn-sm" style="margin-top:6px;" onclick="AevumPgSheet.addReagentRow(); AevumPgSheet.edited();">+ Reagente</button>
                    </div>

                    <div class="card-box" style="margin-bottom:0;">
                        <h4>Artifici</h4>
                        <div class="row">
                            <div class="field-group">
                                <label>Linea di Sangue:</label>
                                <select id="artifice_bloodline" onchange="AevumPgSheet.edited()">
                                    <option value="-">- Seleziona -</option>
                                    ${bloodOpts}
                                </select>
                            </div>
                            <div class="field-group">
                                <label>Sicuri LV.:</label>
                                <input type="text" id="artifice_safe_lv" class="mono-input" style="width:52px; text-align:center;" oninput="AevumPgSheet.edited()">
                            </div>
                        </div>
                        <div id="artificesList"></div>
                        <button type="button" class="btn btn-secondary btn-sm" style="margin-top:6px;" onclick="AevumPgSheet.addArtificeRow(); AevumPgSheet.edited();">+ Artificio</button>
                    </div>
                </div>
            </div>

            <!-- 7. NOTE -->
            <div class="section-title">7. Note</div>
            <div class="section-collapse-content">
                <div class="card-box">
                    <textarea id="note" rows="4" oninput="AevumPgSheet.edited()"></textarea>
                </div>
            </div>

            <div class="save-bar">
                <span style="font-size:12.5px; color:var(--text-secondary);">Scheda PG/PNG salvata localmente nel browser.</span>
                <button type="button" class="btn btn-success" onclick="AevumApp.saveActiveTab()">💾 Salva Scheda</button>
            </div>
        `;

        this.buildStaticSubgrids();
        window.AevumApp.bindCollapsibles(container);
        this.hydrate(draftData);
    },

    renderWeaponBox(title, prefix) {
        return `
            <div class="card-box">
                <h4>${title}</h4>
                <div class="row" style="flex-wrap:nowrap; gap:8px;">
                    <div class="field-group" style="flex:1 1 0; min-width:0;">
                        <label style="flex-shrink:0;">Nome:</label>
                        <input type="text" id="${prefix}_name" style="flex:1 1 0; min-width:0; width:100%;" oninput="AevumPgSheet.edited()">
                    </div>
                    <div class="field-group" style="flex:2 1 0; min-width:0; gap:6px;">
                        <div class="field-group" style="flex:1 1 0; min-width:0;">
                            <label style="flex-shrink:0;">Danno:</label>
                            <input type="text" id="${prefix}_damage" style="flex:1 1 0; min-width:0; width:100%;" oninput="AevumPgSheet.edited()">
                        </div>
                        <div class="field-group" style="flex:1 1 0; min-width:0;">
                            <label style="flex-shrink:0;">Gittata:</label>
                            <input type="text" id="${prefix}_range" style="flex:1 1 0; min-width:0; width:100%;" oninput="AevumPgSheet.edited()">
                        </div>
                        <div class="field-group" style="flex:1 1 0; min-width:0;">
                            <label style="flex-shrink:0;">Integrità:</label>
                            <input type="text" id="${prefix}_integrity" class="mono-input" style="flex:1 1 0; min-width:0; width:100%;" oninput="AevumPgSheet.edited()">
                        </div>
                    </div>
                </div>
                <div class="row" style="flex-wrap:nowrap; gap:8px;">
                    <div class="field-group" style="flex:1 1 0; min-width:0;">
                        <label style="flex-shrink:0;">Tipo:</label>
                        <input type="text" id="${prefix}_type" style="flex:1 1 0; min-width:0; width:100%;" oninput="AevumPgSheet.edited()">
                    </div>
                    <div class="field-group" style="flex:2 1 0; min-width:0;">
                        <label style="flex-shrink:0;">Critico:</label>
                        <input type="text" id="${prefix}_crit" style="flex:1 1 0; min-width:0; width:100%;" oninput="AevumPgSheet.edited()">
                    </div>
                </div>
                <div class="row" style="align-items:flex-start;">
                    <div style="flex:1; min-width:180px;"><label>Modifica 1:</label><textarea id="${prefix}_mod1" rows="2" oninput="AevumPgSheet.edited()"></textarea></div>
                    <div style="flex:1; min-width:180px;"><label>Modifica 2:</label><textarea id="${prefix}_mod2" rows="2" oninput="AevumPgSheet.edited()"></textarea></div>
                </div>
            </div>
        `;
    },

    renderArmorBox() {
        const parts = [
            { label: "Copricapo", key: "head" },
            { label: "Busto", key: "chest" },
            { label: "Bracciali", key: "arms" },
            { label: "Gambali", key: "legs" }
        ];
        const partsHtml = parts.map((p) => `
            <div class="row">
                <label style="width:74px; font-weight:700; color:var(--text-primary);">${p.label}:</label>
                <label>Int.:</label><input type="text" id="armor_${p.key}_int" class="mono-input" style="width:52px;" oninput="AevumPgSheet.edited()">
                <label>Acc. 1:</label><input type="text" id="armor_${p.key}_acc1" style="width:105px;" oninput="AevumPgSheet.edited()">
                <label>Effetto:</label><input type="text" id="armor_${p.key}_eff1" style="flex:1; min-width:120px;" oninput="AevumPgSheet.edited()">
            </div>
            <div class="row" style="margin-left:78px;">
                <label>Acc. 2:</label><input type="text" id="armor_${p.key}_acc2" style="width:105px;" oninput="AevumPgSheet.edited()">
                <label>Effetto:</label><input type="text" id="armor_${p.key}_eff2" style="flex:1; min-width:120px;" oninput="AevumPgSheet.edited()">
            </div>
            <hr style="border:0; border-top:1px solid var(--border-subtle); margin:8px 0;">
        `).join("");

        return `
            <div class="card-box">
                <h4>Armatura e Protezioni</h4>
                ${partsHtml}
                <div class="row">
                    <label style="font-weight:700; color:var(--text-primary);">Scudo/Cappa:</label>
                    <select id="armor_shield_cloak_type" onchange="AevumPgSheet.toggleShieldCloak(); AevumPgSheet.edited();">
                        <option value="Scudo">Scudo</option>
                        <option value="Cappa">Cappa</option>
                    </select>
                    <label>Int.:</label><input type="text" id="armor_sc_int" class="mono-input" style="width:52px;" oninput="AevumPgSheet.edited()">
                    <span id="shieldFields" class="field-group">
                        <label>Danni:</label><input type="text" id="armor_sc_dmg" style="width:55px;" oninput="AevumPgSheet.edited()">
                        <label>Tipo:</label><input type="text" id="armor_sc_tp" style="width:75px;" oninput="AevumPgSheet.edited()">
                        <label>Portata:</label><input type="text" id="armor_sc_rng" style="width:75px;" oninput="AevumPgSheet.edited()">
                    </span>
                </div>
                <div id="shieldAccRow" class="row">
                    <label>Accessorio:</label><input type="text" id="armor_sc_acc" style="width:125px;" oninput="AevumPgSheet.edited()">
                    <label>Effetto:</label><input type="text" id="armor_sc_eff" style="flex:1; min-width:140px;" oninput="AevumPgSheet.edited()">
                </div>
                <div id="cloakAccContainer" style="display:none; flex-direction:column; gap:8px;">
                    <div class="row">
                        <label>Acc. 1:</label><input type="text" id="armor_cloak_acc1" style="width:125px;" oninput="AevumPgSheet.edited()">
                        <label>Effetto 1:</label><input type="text" id="armor_cloak_eff1" style="flex:1; min-width:140px;" oninput="AevumPgSheet.edited()">
                    </div>
                    <div class="row">
                        <label>Acc. 2:</label><input type="text" id="armor_cloak_acc2" style="width:125px;" oninput="AevumPgSheet.edited()">
                        <label>Effetto 2:</label><input type="text" id="armor_cloak_eff2" style="flex:1; min-width:140px;" oninput="AevumPgSheet.edited()">
                    </div>
                </div>
            </div>
        `;
    },

    buildStaticSubgrids() {
        const skillsContainer = document.getElementById("skillsContainer");
        skillsContainer.innerHTML = "";
        for (const [cat, skills] of Object.entries(window.AevumData.SKILLS_BY_CATEGORY)) {
            const catDiv = document.createElement("div");
            catDiv.className = "skill-category";
            catDiv.innerHTML = `<h4>${cat}</h4>`;
            skills.forEach((sk) => {
                this.skillState[sk] = 0;
                const row = document.createElement("div");
                row.className = "skill-row";
                const diceHtml = window.AevumData.DICE_SVG.map((svg, idx) =>
                    `<span onclick="AevumPgSheet.setDiceLevel('${sk}', ${idx + 1})">${svg}</span>`
                ).join("");
                row.innerHTML = `<span>${sk}</span><div class="dice-group" id="dice_group_${sk}">${diceHtml}</div>`;
                catDiv.appendChild(row);
            });
            skillsContainer.appendChild(catDiv);
        }

        const resContainer = document.getElementById("resContainer");
        resContainer.innerHTML = "";
        ["VIG", "RIF", "INT", "PRE"].forEach((r) => {
            const div = document.createElement("div");
            div.className = "res-row";
            div.innerHTML = `
                <label>${r}:</label>
                <input type="text" id="res_${r}_1" placeholder="B" oninput="AevumPgSheet.calcResSum('${r}'); AevumPgSheet.edited();"> +
                <input type="text" id="res_${r}_2" placeholder="A" oninput="AevumPgSheet.calcResSum('${r}'); AevumPgSheet.edited();"> +
                <input type="text" id="res_${r}_3" placeholder="M" oninput="AevumPgSheet.calcResSum('${r}'); AevumPgSheet.edited();"> +
                <input type="text" id="res_${r}_4" placeholder="Al" oninput="AevumPgSheet.calcResSum('${r}'); AevumPgSheet.edited();"> =
                <input type="text" id="res_${r}_sum" style="font-weight:700; background:var(--bg-slate);" readonly placeholder="Tot"> /
                <input type="text" id="res_${r}_spesi" placeholder="Spe" oninput="AevumPgSheet.edited();">
            `;
            resContainer.appendChild(div);
        });

        const bpContainer = document.getElementById("bodyPointsContainer");
        bpContainer.innerHTML = "";
        for (let r = 0; r < 6; r++) {
            const rowDiv = document.createElement("div");
            rowDiv.className = "body-row";
            for (let d = 1; d <= 10; d++) {
                const dotIndex = r * 10 + d;
                const dot = document.createElement("div");
                dot.className = "body-dot";
                dot.dataset.index = dotIndex;
                dot.onclick = () => this.setBodyPoints(dotIndex);
                rowDiv.appendChild(dot);
            }

            const debuffGroup = document.createElement("div");
            debuffGroup.className = "debuff-group";
            if (r < 5) {
                window.AevumData.DEBUFF_ICONS.forEach((deb, idx) => {
                    const key = `r${r}_c${idx}`;
                    const el = document.createElement("span");
                    el.className = "debuff-icon";
                    el.id = `debuff_${key}`;
                    el.textContent = deb.icon;
                    el.title = `${deb.name} (Riga ${r + 1})`;
                    el.onclick = () => this.toggleDebuff(key);
                    debuffGroup.appendChild(el);
                });
            } else {
                const key = "r5_skull";
                const el = document.createElement("span");
                el.className = "debuff-icon";
                el.id = `debuff_${key}`;
                el.textContent = "💀";
                el.title = "Morte";
                el.onclick = () => this.toggleDebuff(key);
                debuffGroup.appendChild(el);
            }
            rowDiv.appendChild(debuffGroup);
            bpContainer.appendChild(rowDiv);
        }
    },

    changeRoleType(newType) {
        const badge = document.getElementById("pgRoleBadge");
        if (badge) {
            badge.className = `cat-badge ${newType}`;
            badge.textContent = newType === "pg" ? "PG" : "PNG";
        }
        window.AevumApp.updateActiveTabEntityType(newType);
        this.edited();
    },

    toggleCustom(kind) {
        if (kind === "species") {
            document.getElementById("species_custom").style.display =
                document.getElementById("species_select").value === "custom" ? "inline-block" : "none";
        } else if (kind === "origin") {
            document.getElementById("origin_custom").style.display =
                document.getElementById("origin_select").value === "custom" ? "inline-block" : "none";
        } else if (kind === "vocation") {
            document.getElementById("vocation_custom").style.display =
                document.getElementById("vocation_select").value === "custom" ? "inline-block" : "none";
        } else if (kind === "reagentCap") {
            document.getElementById("reagentMaxCap_custom").style.display =
                document.getElementById("reagentMaxCap_select").value === "custom" ? "inline-block" : "none";
        }
    },

    toggleShieldCloak() {
        const type = document.getElementById("armor_shield_cloak_type").value;
        document.getElementById("shieldFields").style.display = type === "Scudo" ? "inline-flex" : "none";
        document.getElementById("shieldAccRow").style.display = type === "Scudo" ? "flex" : "none";
        document.getElementById("cloakAccContainer").style.display = type === "Cappa" ? "flex" : "none";
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
            ? `<img src="${this.portraitBase64}" alt="Ritratto">`
            : `<span class="portrait-placeholder">Nessun Ritratto</span>`;
    },

    calcResSum(r) {
        const v1 = parseInt(document.getElementById(`res_${r}_1`).value, 10) || 0;
        const v2 = parseInt(document.getElementById(`res_${r}_2`).value, 10) || 0;
        const v3 = parseInt(document.getElementById(`res_${r}_3`).value, 10) || 0;
        const v4 = parseInt(document.getElementById(`res_${r}_4`).value, 10) || 0;
        document.getElementById(`res_${r}_sum`).value = v1 + v2 + v3 + v4;
        let total = 0;
        ["VIG", "RIF", "INT", "PRE"].forEach((k) => {
            total += parseInt(document.getElementById(`res_${k}_sum`).value, 10) || 0;
        });
        document.getElementById("totalResSum").textContent = total;
    },

    setBodyPoints(idx) {
        this.bodyPointsCount = (this.bodyPointsCount === idx && idx === 1) ? 0 : idx;
        this.updateBodyPointsUI();
        this.edited();
    },

    updateBodyPointsUI() {
        const dots = document.querySelectorAll("#bodyPointsContainer .body-dot");
        dots.forEach((dot) => {
            const idx = parseInt(dot.dataset.index, 10);
            dot.classList.toggle("filled", idx <= this.bodyPointsCount);
        });
        const ro = document.getElementById("bodyPointsReadout");
        if (ro) ro.textContent = this.bodyPointsCount;
    },

    toggleDebuff(key) {
        this.debuffsState[key] = !this.debuffsState[key];
        this.updateDebuffsUI();
        this.edited();
    },

    updateDebuffsUI() {
        document.querySelectorAll("#bodyPointsContainer .debuff-icon").forEach((icon) => {
            const key = icon.id.replace("debuff_", "");
            icon.classList.toggle("active", Boolean(this.debuffsState[key]));
        });
    },

    setDiceLevel(sk, level) {
        this.skillState[sk] = (this.skillState[sk] === level) ? 0 : level;
        this.updateDiceUI(sk);
        this.edited();
    },

    updateDiceUI(sk) {
        const group = document.getElementById(`dice_group_${sk}`);
        if (!group) return;
        group.querySelectorAll(".dice-icon").forEach((icon, idx) => {
            icon.classList.toggle("active", idx + 1 === this.skillState[sk]);
        });
    },

    addMadnessRow(val = "") {
        const container = document.getElementById("madnessList");
        const rows = container.querySelectorAll(".madness-row");
        if (rows.length >= 6) return;
        const idx = rows.length;
        const div = document.createElement("div");
        div.className = "dynamic-row madness-row";
        if (idx === 5) {
            div.innerHTML = `
                <span class="mono" style="width:45px; color:var(--accent-gold); font-weight:700;">LV. 6</span>
                <span style="flex:1; color:var(--danger); font-style:italic; font-weight:600;">Rilassati. Sei nelle mani del Giudice, ora</span>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove(); AevumPgSheet.renumberMadness(); AevumPgSheet.edited();">🗑</button>
            `;
        } else {
            div.innerHTML = `
                <span class="mono" style="width:45px; color:var(--accent-gold); font-weight:700;">LV. ${idx + 1}</span>
                <input type="text" placeholder="Descrizione scarica di follia..." value="${this.escAttr(val)}" style="flex:1;" oninput="AevumPgSheet.edited()">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove(); AevumPgSheet.renumberMadness(); AevumPgSheet.edited();">🗑</button>
            `;
        }
        container.appendChild(div);
        this.renumberMadness();
    },

    renumberMadness() {
        const rows = document.querySelectorAll("#madnessList .madness-row");
        rows.forEach((row, i) => {
            const lbl = row.querySelector("span.mono");
            if (lbl) lbl.textContent = `LV. ${i + 1}`;
        });
        const btn = document.getElementById("addMadnessBtn");
        if (btn) btn.style.display = rows.length >= 6 ? "none" : "inline-flex";
    },

    addAmmoRow(type = "", qty = "") {
        const container = document.getElementById("ammoList");
        const div = document.createElement("div");
        div.className = "dynamic-row";
        div.innerHTML = `
            <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove(); AevumPgSheet.edited();">🗑</button>
            <input type="text" placeholder="Tipo (es. Frecce)" value="${this.escAttr(type)}" style="flex:1;" oninput="AevumPgSheet.edited()">
            <input type="text" placeholder="Qtà" value="${this.escAttr(qty)}" class="mono-input" style="width:65px; text-align:center;" oninput="AevumPgSheet.edited()">
        `;
        container.appendChild(div);
    },

    addPocketRow(pocketType, name = "", enc = "") {
        const container = document.getElementById(pocketType === "side" ? "sidePocketList" : "centralPocketList");
        const div = document.createElement("div");
        div.className = "dynamic-row";
        div.innerHTML = `
            <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove(); AevumPgSheet.calcPocket('${pocketType}'); AevumPgSheet.edited();">🗑</button>
            <input type="text" placeholder="Oggetto" value="${this.escAttr(name)}" style="flex:1;" oninput="AevumPgSheet.edited()">
            <input type="number" placeholder="Ing." value="${this.escAttr(enc)}" class="mono-input" style="width:72px; text-align:center;" oninput="AevumPgSheet.calcPocket('${pocketType}'); AevumPgSheet.edited();">
        `;
        container.appendChild(div);
        this.calcPocket(pocketType);
    },

    calcPocket(pocketType) {
        const listId = pocketType === "side" ? "sidePocketList" : "centralPocketList";
        const sumId = pocketType === "side" ? "sidePocketSum" : "centralPocketSum";
        const limit = pocketType === "side" ? 8 : 22;
        let total = 0;
        document.querySelectorAll(`#${listId} input[type='number']`).forEach((inp) => {
            total += parseFloat(inp.value) || 0;
        });
        const el = document.getElementById(sumId);
        if (el) {
            el.textContent = total;
            el.style.color = total > limit ? "var(--danger)" : "var(--accent-aether)";
        }
    },

    addMasteryRow(type = "Manovra", name = "", cost = "", effect = "") {
        const container = document.getElementById("masteryList");
        const card = document.createElement("div");
        card.className = "sub-card mastery-card";
        card.innerHTML = `
            <div class="sub-card-top">
                <select class="mastery-type" onchange="AevumPgSheet.edited()">
                    <option value="Manovra" ${type === "Manovra" ? "selected" : ""}>Manovra</option>
                    <option value="Sinergia" ${type === "Sinergia" ? "selected" : ""}>Sinergia</option>
                    <option value="Contrasto" ${type === "Contrasto" ? "selected" : ""}>Contrasto</option>
                    <option value="Attiva" ${type === "Attiva" ? "selected" : ""}>Attiva</option>
                    <option value="Passiva" ${type === "Passiva" ? "selected" : ""}>Passiva</option>
                </select>
                <input type="text" class="mastery-name" placeholder="Nome Maestria..." value="${this.escAttr(name)}" style="flex:2; min-width:130px; font-weight:600;" oninput="AevumPgSheet.edited()">
                <div class="field-group">
                    <label>Costo:</label>
                    <input type="number" class="mastery-cost mono-input" placeholder="0" value="${this.escAttr(cost)}" style="width:58px; text-align:center;" oninput="AevumPgSheet.calcMasterySum(); AevumPgSheet.edited();">
                </div>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.mastery-card').remove(); AevumPgSheet.calcMasterySum(); AevumPgSheet.edited();">🗑</button>
            </div>
            <textarea class="mastery-effect" rows="2" placeholder="Descrizione effetto..." oninput="AevumPgSheet.edited()">${this.escHtml(effect)}</textarea>
        `;
        container.appendChild(card);
        this.calcMasterySum();
    },

    calcMasterySum() {
        let total = 0;
        document.querySelectorAll("#masteryList .mastery-cost").forEach((inp) => {
            total += parseFloat(inp.value) || 0;
        });
        const el = document.getElementById("masterySum");
        if (el) el.textContent = total;
    },

    addReagentRow(name = "", qty = "") {
        const container = document.getElementById("reagentsList");
        const div = document.createElement("div");
        div.className = "dynamic-row";
        div.innerHTML = `
            <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove(); AevumPgSheet.calcReagentsSum(); AevumPgSheet.edited();">🗑</button>
            <input type="text" placeholder="Reagente" value="${this.escAttr(name)}" style="flex:1;" oninput="AevumPgSheet.edited()">
            <input type="number" placeholder="Qtà" value="${this.escAttr(qty)}" class="mono-input" style="width:68px; text-align:center;" oninput="AevumPgSheet.calcReagentsSum(); AevumPgSheet.edited();">
        `;
        container.appendChild(div);
        this.calcReagentsSum();
    },

    calcReagentsSum() {
        let total = 0;
        document.querySelectorAll("#reagentsList input[type='number']").forEach((inp) => {
            total += parseFloat(inp.value) || 0;
        });
        const el = document.getElementById("reagentSum");
        if (el) el.textContent = total;
    },

    addArtificeRow(name = "", level = "", reagents = "", isHidden = false) {
        const container = document.getElementById("artificesList");
        const div = document.createElement("div");
        div.className = "dynamic-row";
        div.dataset.hidden = isHidden ? "true" : "false";
        div.innerHTML = `
            <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove(); AevumPgSheet.edited();">🗑</button>
            <button type="button" class="eye-toggle-btn ${isHidden ? "hidden-state" : ""}" onclick="AevumPgSheet.toggleArtificeEye(this)">${isHidden ? "👁️‍🗨️" : "👁️"}</button>
            <input type="text" placeholder="Artificio" value="${this.escAttr(name)}" style="flex:1.4;" oninput="AevumPgSheet.edited()">
            <input type="text" placeholder="Liv." value="${this.escAttr(level)}" class="mono-input" style="width:48px; text-align:center;" oninput="AevumPgSheet.edited()">
            <input type="text" placeholder="Reagenti" value="${this.escAttr(reagents)}" style="flex:1;" oninput="AevumPgSheet.edited()">
        `;
        container.appendChild(div);
    },

    toggleArtificeEye(btn) {
        const row = btn.parentElement;
        const nextHidden = row.dataset.hidden !== "true";
        row.dataset.hidden = nextHidden ? "true" : "false";
        btn.textContent = nextHidden ? "👁️‍🗨️" : "👁️";
        btn.classList.toggle("hidden-state", nextHidden);
        this.edited();
    },

    collectData(existingId) {
        const speciesSel = document.getElementById("species_select").value;
        const originSel = document.getElementById("origin_select").value;
        const vocationSel = document.getElementById("vocation_select").value;

        const resData = {};
        ["VIG", "RIF", "INT", "PRE"].forEach((r) => {
            resData[r] = [
                document.getElementById(`res_${r}_1`).value,
                document.getElementById(`res_${r}_2`).value,
                document.getElementById(`res_${r}_3`).value,
                document.getElementById(`res_${r}_4`).value,
                document.getElementById(`res_${r}_spesi`).value
            ];
        });

        const madnessList = [];
        document.querySelectorAll("#madnessList .madness-row").forEach((row, idx) => {
            if (idx === 5) madnessList.push("Rilassati. Sei nelle mani del Giudice, ora");
            else {
                const inp = row.querySelector("input");
                if (inp && inp.value.trim()) madnessList.push(inp.value.trim());
            }
        });

        const ammoList = [];
        document.querySelectorAll("#ammoList .dynamic-row").forEach((row) => {
            const inputs = row.querySelectorAll("input");
            if (inputs[0].value || inputs[1].value) ammoList.push({ type: inputs[0].value, qty: inputs[1].value });
        });

        const masteryList = [];
        document.querySelectorAll("#masteryList .mastery-card").forEach((card) => {
            const type = card.querySelector(".mastery-type").value;
            const name = card.querySelector(".mastery-name").value;
            const cost = card.querySelector(".mastery-cost").value;
            const effect = card.querySelector(".mastery-effect").value;
            if (name || cost || effect) masteryList.push({ type, name, cost, effect });
        });

        const sidePocketList = [];
        document.querySelectorAll("#sidePocketList .dynamic-row").forEach((row) => {
            const inputs = row.querySelectorAll("input");
            if (inputs[0].value || inputs[1].value) sidePocketList.push({ name: inputs[0].value, enc: inputs[1].value });
        });

        const centralPocketList = [];
        document.querySelectorAll("#centralPocketList .dynamic-row").forEach((row) => {
            const inputs = row.querySelectorAll("input");
            if (inputs[0].value || inputs[1].value) centralPocketList.push({ name: inputs[0].value, enc: inputs[1].value });
        });

        const reagents = [];
        document.querySelectorAll("#reagentsList .dynamic-row").forEach((row) => {
            const inputs = row.querySelectorAll("input");
            if (inputs[0].value || inputs[1].value) reagents.push({ name: inputs[0].value, qty: inputs[1].value });
        });

        const artifices = [];
        document.querySelectorAll("#artificesList .dynamic-row").forEach((row) => {
            const inputs = row.querySelectorAll("input");
            if (inputs[0].value || inputs[1].value || inputs[2].value) {
                artifices.push({
                    name: inputs[0].value,
                    level: inputs[1].value,
                    reagents: inputs[2].value,
                    hidden: row.dataset.hidden === "true"
                });
            }
        });

        return {
            id: existingId,
            entityType: document.getElementById("pg_entity_type").value,
            name: document.getElementById("name").value.trim(),
            portrait: this.portraitBase64,
            species_select: speciesSel,
            species_val: speciesSel === "custom" ? document.getElementById("species_custom").value : speciesSel,
            level: document.getElementById("level").value,
            cless_tot: document.getElementById("cless_tot").value,
            cless_spese: document.getElementById("cless_spese").value,
            movimento_base: document.getElementById("movimento_base").value,
            movimento_att: document.getElementById("movimento_att").value,
            origin_select: originSel,
            origin_val: originSel === "custom" ? document.getElementById("origin_custom").value : originSel,
            origin_domanda: document.getElementById("origin_domanda").value,
            vocation_select: vocationSel,
            vocation_val: vocationSel === "custom" ? document.getElementById("vocation_custom").value : vocationSel,
            character_title: document.getElementById("character_title").value,
            vocation_privilegi: document.getElementById("vocation_privilegi").value,
            body_points: this.bodyPointsCount,
            debuffs_state: { ...this.debuffsState },
            mind_curr: document.getElementById("mind_curr").value,
            mind_max: document.getElementById("mind_max").value,
            madness_list: madnessList,
            res: resData,
            w1_name: document.getElementById("w1_name").value,
            w1_damage: document.getElementById("w1_damage").value,
            w1_type: document.getElementById("w1_type").value,
            w1_integrity: document.getElementById("w1_integrity").value,
            w1_range: document.getElementById("w1_range").value,
            w1_crit: document.getElementById("w1_crit").value,
            w1_mod1: document.getElementById("w1_mod1").value,
            w1_mod2: document.getElementById("w1_mod2").value,
            w2_name: document.getElementById("w2_name").value,
            w2_damage: document.getElementById("w2_damage").value,
            w2_type: document.getElementById("w2_type").value,
            w2_integrity: document.getElementById("w2_integrity").value,
            w2_range: document.getElementById("w2_range").value,
            w2_crit: document.getElementById("w2_crit").value,
            w2_mod1: document.getElementById("w2_mod1").value,
            w2_mod2: document.getElementById("w2_mod2").value,
            ammo_list: ammoList,
            armor_head_int: document.getElementById("armor_head_int").value,
            armor_head_acc1: document.getElementById("armor_head_acc1").value,
            armor_head_eff1: document.getElementById("armor_head_eff1").value,
            armor_head_acc2: document.getElementById("armor_head_acc2").value,
            armor_head_eff2: document.getElementById("armor_head_eff2").value,
            armor_chest_int: document.getElementById("armor_chest_int").value,
            armor_chest_acc1: document.getElementById("armor_chest_acc1").value,
            armor_chest_eff1: document.getElementById("armor_chest_eff1").value,
            armor_chest_acc2: document.getElementById("armor_chest_acc2").value,
            armor_chest_eff2: document.getElementById("armor_chest_eff2").value,
            armor_arms_int: document.getElementById("armor_arms_int").value,
            armor_arms_acc1: document.getElementById("armor_arms_acc1").value,
            armor_arms_eff1: document.getElementById("armor_arms_eff1").value,
            armor_arms_acc2: document.getElementById("armor_arms_acc2").value,
            armor_arms_eff2: document.getElementById("armor_arms_eff2").value,
            armor_legs_int: document.getElementById("armor_legs_int").value,
            armor_legs_acc1: document.getElementById("armor_legs_acc1").value,
            armor_legs_eff1: document.getElementById("armor_legs_eff1").value,
            armor_legs_acc2: document.getElementById("armor_legs_acc2").value,
            armor_legs_eff2: document.getElementById("armor_legs_eff2").value,
            armor_shield_cloak_type: document.getElementById("armor_shield_cloak_type").value,
            armor_sc_int: document.getElementById("armor_sc_int").value,
            armor_sc_dmg: document.getElementById("armor_sc_dmg").value,
            armor_sc_tp: document.getElementById("armor_sc_tp").value,
            armor_sc_rng: document.getElementById("armor_sc_rng").value,
            armor_sc_acc: document.getElementById("armor_sc_acc").value,
            armor_sc_eff: document.getElementById("armor_sc_eff").value,
            armor_cloak_acc1: document.getElementById("armor_cloak_acc1").value,
            armor_cloak_eff1: document.getElementById("armor_cloak_eff1").value,
            armor_cloak_acc2: document.getElementById("armor_cloak_acc2").value,
            armor_cloak_eff2: document.getElementById("armor_cloak_eff2").value,
            mastery_list: masteryList,
            side_pocket_list: sidePocketList,
            central_pocket_list: centralPocketList,
            reagent_max_cap_select: document.getElementById("reagentMaxCap_select").value,
            reagent_max_cap_custom: document.getElementById("reagentMaxCap_custom").value,
            artifice_bloodline: document.getElementById("artifice_bloodline").value,
            artifice_safe_lv: document.getElementById("artifice_safe_lv").value,
            auri: document.getElementById("auri").value,
            crune: document.getElementById("crune").value,
            placche: document.getElementById("placche").value,
            note: document.getElementById("note").value,
            skills: { ...this.skillState },
            reagents,
            artifices
        };
    },

    hydrate(c) {
        this.isHydrating = true;
        const d = c || {};

        document.getElementById("name").value = d.name || "";
        document.getElementById("level").value = d.level || "";
        this.portraitBase64 = d.portrait || "";
        this.updatePortraitUI();

        const specSel = document.getElementById("species_select");
        const specCust = document.getElementById("species_custom");
        if (d.species_select === "custom") {
            specSel.value = "custom"; specCust.style.display = "inline-block"; specCust.value = d.species_val || "";
        } else {
            specSel.value = d.species_select || "-"; specCust.style.display = "none";
        }

        document.getElementById("cless_tot").value = d.cless_tot || "";
        document.getElementById("cless_spese").value = d.cless_spese || "";
        document.getElementById("movimento_base").value = d.movimento_base || "";
        document.getElementById("movimento_att").value = d.movimento_att || "";

        const origSel = document.getElementById("origin_select");
        const origCust = document.getElementById("origin_custom");
        if (d.origin_select === "custom") {
            origSel.value = "custom"; origCust.style.display = "inline-block"; origCust.value = d.origin_val || "";
        } else {
            origSel.value = d.origin_select || "-"; origCust.style.display = "none";
        }
        document.getElementById("origin_domanda").value = d.origin_domanda || "";

        const vocSel = document.getElementById("vocation_select");
        const vocCust = document.getElementById("vocation_custom");
        if (d.vocation_select === "custom") {
            vocSel.value = "custom"; vocCust.style.display = "inline-block"; vocCust.value = d.vocation_val || "";
        } else {
            vocSel.value = d.vocation_select || "-"; vocCust.style.display = "none";
        }
        document.getElementById("character_title").value = d.character_title || "";
        document.getElementById("vocation_privilegi").value = d.vocation_privilegi || "";

        this.bodyPointsCount = d.body_points || 0;
        this.updateBodyPointsUI();

        this.debuffsState = { ...(d.debuffs_state || {}) };
        this.updateDebuffsUI();

        document.getElementById("mind_curr").value = d.mind_curr || "";
        document.getElementById("mind_max").value = d.mind_max || "";

        const madnessCont = document.getElementById("madnessList");
        madnessCont.innerHTML = "";
        if (d.madness_list && d.madness_list.length) {
            d.madness_list.forEach((m) => this.addMadnessRow(m));
        }
        this.renumberMadness();

        ["VIG", "RIF", "INT", "PRE"].forEach((k) => {
            const vals = (d.res && d.res[k]) || ["", "", "", "", ""];
            document.getElementById(`res_${k}_1`).value = vals[0] || "";
            document.getElementById(`res_${k}_2`).value = vals[1] || "";
            document.getElementById(`res_${k}_3`).value = vals[2] || "";
            document.getElementById(`res_${k}_4`).value = vals[3] || "";
            document.getElementById(`res_${k}_spesi`).value = vals[4] || "";
            this.calcResSum(k);
        });

        ["w1", "w2"].forEach((w) => {
            document.getElementById(`${w}_name`).value = d[`${w}_name`] || "";
            document.getElementById(`${w}_damage`).value = d[`${w}_damage`] || "";
            document.getElementById(`${w}_type`).value = d[`${w}_type`] || "";
            document.getElementById(`${w}_integrity`).value = d[`${w}_integrity`] || "";
            document.getElementById(`${w}_range`).value = d[`${w}_range`] || "";
            document.getElementById(`${w}_crit`).value = d[`${w}_crit`] || "";
            document.getElementById(`${w}_mod1`).value = d[`${w}_mod1`] || "";
            document.getElementById(`${w}_mod2`).value = d[`${w}_mod2`] || "";
        });

        const ammoCont = document.getElementById("ammoList");
        ammoCont.innerHTML = "";
        if (d.ammo_list && d.ammo_list.length) d.ammo_list.forEach((a) => this.addAmmoRow(a.type, a.qty));
        else this.addAmmoRow();

        ["head", "chest", "arms", "legs"].forEach((part) => {
            document.getElementById(`armor_${part}_int`).value = d[`armor_${part}_int`] || "";
            document.getElementById(`armor_${part}_acc1`).value = d[`armor_${part}_acc1`] || "";
            document.getElementById(`armor_${part}_eff1`).value = d[`armor_${part}_eff1`] || "";
            document.getElementById(`armor_${part}_acc2`).value = d[`armor_${part}_acc2`] || "";
            document.getElementById(`armor_${part}_eff2`).value = d[`armor_${part}_eff2`] || "";
        });

        document.getElementById("armor_shield_cloak_type").value = d.armor_shield_cloak_type || "Scudo";
        document.getElementById("armor_sc_int").value = d.armor_sc_int || "";
        document.getElementById("armor_sc_dmg").value = d.armor_sc_dmg || "";
        document.getElementById("armor_sc_tp").value = d.armor_sc_tp || "";
        document.getElementById("armor_sc_rng").value = d.armor_sc_rng || "";
        document.getElementById("armor_sc_acc").value = d.armor_sc_acc || "";
        document.getElementById("armor_sc_eff").value = d.armor_sc_eff || "";
        document.getElementById("armor_cloak_acc1").value = d.armor_cloak_acc1 || "";
        document.getElementById("armor_cloak_eff1").value = d.armor_cloak_eff1 || "";
        document.getElementById("armor_cloak_acc2").value = d.armor_cloak_acc2 || "";
        document.getElementById("armor_cloak_eff2").value = d.armor_cloak_eff2 || "";
        this.toggleShieldCloak();

        const masteryCont = document.getElementById("masteryList");
        masteryCont.innerHTML = "";
        if (d.mastery_list && d.mastery_list.length) d.mastery_list.forEach((m) => this.addMasteryRow(m.type, m.name, m.cost, m.effect));
        else this.addMasteryRow();

        const sideCont = document.getElementById("sidePocketList");
        sideCont.innerHTML = "";
        if (d.side_pocket_list && d.side_pocket_list.length) d.side_pocket_list.forEach((p) => this.addPocketRow("side", p.name, p.enc));
        else this.addPocketRow("side");

        const centralCont = document.getElementById("centralPocketList");
        centralCont.innerHTML = "";
        if (d.central_pocket_list && d.central_pocket_list.length) d.central_pocket_list.forEach((p) => this.addPocketRow("central", p.name, p.enc));
        else this.addPocketRow("central");

        const reagCapSel = document.getElementById("reagentMaxCap_select");
        const reagCapCust = document.getElementById("reagentMaxCap_custom");
        if (d.reagent_max_cap_select === "custom") {
            reagCapSel.value = "custom"; reagCapCust.style.display = "inline-block"; reagCapCust.value = d.reagent_max_cap_custom || "";
        } else {
            reagCapSel.value = d.reagent_max_cap_select || "10"; reagCapCust.style.display = "none";
        }

        document.getElementById("artifice_bloodline").value = d.artifice_bloodline || "-";
        document.getElementById("artifice_safe_lv").value = d.artifice_safe_lv || "";
        document.getElementById("auri").value = d.auri || "";
        document.getElementById("crune").value = d.crune || "";
        document.getElementById("placche").value = d.placche || "";
        document.getElementById("note").value = d.note || "";

        for (const sk in this.skillState) {
            this.skillState[sk] = (d.skills && d.skills[sk]) || 0;
            this.updateDiceUI(sk);
        }

        const reagCont = document.getElementById("reagentsList");
        reagCont.innerHTML = "";
        if (d.reagents && d.reagents.length) d.reagents.forEach((r) => this.addReagentRow(r.name, r.qty));
        else this.addReagentRow();

        const artCont = document.getElementById("artificesList");
        artCont.innerHTML = "";
        if (d.artifices && d.artifices.length) d.artifices.forEach((a) => this.addArtificeRow(a.name, a.level, a.reagents, a.hidden));
        else this.addArtificeRow();

        this.calcReagentsSum();
        this.calcMasterySum();
        this.isHydrating = false;
    },

    edited() {
        if (this.isHydrating) return;
        window.AevumApp.onActiveSheetEdited();
    }
};
