# Ævum: I Frammenti dell'Anima — Gestore PG, PNG & Creature (PWA)

Applicazione web progressiva (PWA) installabile su desktop e mobile e utilizzabile offline per gestire **PG**, **PNG** e **Creature** di *Ævum: I Frammenti dell'Anima*.

## Come pubblicare su GitHub come pagina da scaricare
1. Carica tutti i file di questa cartella nella radice del tuo repository GitHub (`main`).
2. **Download del progetto**: gli utenti possono scaricare l'intero pacchetto direttamente dal repository tramite **Code → Download ZIP**, oppure puoi pubblicare una **GitHub Release** allegando il file `.zip`.
3. **Pubblicazione come pagina web (GitHub Pages)**:
   - Vai su **Settings → Pages** nel repository.
   - Imposta **Source** su **Deploy from a branch**, seleziona il branch `main` e la cartella `/(root)`, poi salva.
   - L'applicazione sarà raggiungibile su `https://<tuo-utente>.github.io/<nome-repo>/` e installabile come PWA dal browser.

## Come precaricare le creature del manuale
Apri `js/data.js` e inserisci gli oggetti creatura dentro l'array `DEFAULT_CREATURES` (esportandoli prima dall'app con *Esporta Scheda Attiva* e incollando il JSON nell'array).
