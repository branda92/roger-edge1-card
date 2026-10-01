# Verifiche — Roger EDGE1 Card 1.1.0

Eseguite il 20 settembre 2026 sul bundle preparato per la pubblicazione GitHub. Ambiente locale: Node.js 24.19.0, npm 9.6.5 e Google Chrome.

- `npm test`: **18 test superati**. Stato chiuso osservato (codici 6, posizioni 0%), combinazioni FT1/FT2 incluse 0x0030, valori sconosciuti, stati di movimento 9/11, perdita UART/HA, disponibilità dei pulsanti, stati discordanti, sensori testuali, associazione al dispositivo, ID rinominati, ambiguità, ID legacy e validazione configurazione. La posizione pedonale viene riconosciuta solo se configurata, con ante ferme e dati disponibili; sono verificati entrambi i motori, la tolleranza, i dati discordanti e la conservazione della percentuale complessiva.
- `npm run build`: **TypeScript strict e bundle Vite completati**. La distribuzione è un unico modulo JavaScript con Lit incluso.
- `npm run test:browser`: **11 test superati** in Google Chrome con Playwright. Quattro comandi sul target esatto, entrambe le FT oscurate, dati sconosciuti, posizioni asimmetriche, persistenza dei nodi SVG durante l'animazione, scambio destra/sinistra, Stop durante una richiesta Apri pendente, errori dei servizi senza retry, ID rinominati, tre modalità visuali e layout mobile senza overflow. Verificati anche riepilogo pedonale al 40%, dettagli ante invariati, ritorno allo stato ordinario durante il movimento e assenza di aggiornamenti ottimistici al comando Pedonale. I testi FT1/FT2 risultano centrati entro 1 pixel e le icone SVG visibili con larghezze della card di 280, 375 e 500 pixel.
- `npm ci --ignore-scripts`: installazione riproducibile dal lockfile, **0 vulnerabilità segnalate** dall'audit al momento della verifica.
- Distribuzione: manifest `hacs.json`, nome del bundle e collegamenti locali nella documentazione verificati. Licenza MIT e quattro testi di licenza delle dipendenze incorporati nel JavaScript.
- Preparazione pubblica: gli esempi usano un segnaposto per l'ID del dispositivo. Configurazioni personali, archivi precedenti e dipendenze installate non sono inclusi nel repository.
- Verifica visiva: nuova acquisizione e controllo nel browser delle anteprime `preview/card-parziale.png` (posizione pedonale al 40%) e `preview/card-ft1-ft2.png` (entrambe oscurate), con testi centrati e icone incorporate. Le altre immagini in `preview/` documentano la versione 1.0.0.

Il bundle `dist/roger-edge1-card.js` è di **70.117 byte**. SHA-256:

```text
d21130bfb20a443ada584c8faf993eea189b720d96e4532a238608162b7bbe4b
```

## Limiti

Home Assistant è simulato nella pagina di anteprima: le chiamate ai servizi sono registrate in memoria. Nessuna chiamata è stata inviata alla centralina reale, nessuna dashboard live modificata e nessun firmware ricompilato o caricato durante questo lavoro.

Gli esempi pubblici richiedono di inserire il proprio ID dispositivo o gli ID delle proprie entità. La card può risolvere questi ultimi al caricamento tramite il registro di Home Assistant. La compatibilità del registro era stata controllata sul codice ufficiale HA 2026.9.3. L'utente ha mostrato la versione 1.0.0 funzionante in Home Assistant; le modifiche 1.1.0 sono state collaudate localmente su dati simulati.

La struttura di distribuzione segue i requisiti documentati per i repository personalizzati HACS di tipo Dashboard. Non è stata eseguita un'installazione HACS nell'istanza Home Assistant reale durante la pubblicazione.
