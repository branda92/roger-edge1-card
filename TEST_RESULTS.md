# Verifiche — Roger EDGE1 Card 1.0.0

Eseguite il 20 settembre 2026 sul bundle preparato per la pubblicazione GitHub. Ambiente locale: Node.js 24.19.0, npm 9.6.5 e Google Chrome.

- `npm test`: **14 test superati**. Stato chiuso osservato (codici 6, posizioni 0%), combinazioni FT1/FT2 incluse 0x0030, valori sconosciuti, anta 1 al 40% con anta 2 chiusa, stati di movimento 9/11 con posizione sconosciuta, perdita UART/HA, disponibilità dei pulsanti, stati discordanti, sensori testuali, associazione al dispositivo, ID rinominati, ambiguità, ID legacy e validazione configurazione.
- `npm run build`: **TypeScript strict e bundle Vite completati**. La distribuzione è un unico modulo JavaScript con Lit incluso.
- `npm run test:browser`: **8 test superati** in Google Chrome con Playwright. Quattro comandi sul target esatto, entrambe le FT oscurate, dati sconosciuti, posizioni asimmetriche, persistenza dei nodi SVG durante l'animazione, scambio destra/sinistra, Stop durante una richiesta Apri pendente, errori dei servizi senza retry, ID rinominati, tre modalità visuali e layout mobile senza overflow.
- `npm ci --ignore-scripts`: installazione riproducibile dal lockfile, **0 vulnerabilità segnalate** dall'audit al momento della verifica.
- Distribuzione: manifest `hacs.json`, nome del bundle e collegamenti locali nella documentazione verificati. Licenza MIT e quattro testi di licenza delle dipendenze incorporati nel JavaScript.
- Preparazione pubblica: gli otto file sorgente della card sono identici alla versione già preparata; gli esempi usano un segnaposto per l'ID del dispositivo. Configurazioni personali, archivi precedenti e dipendenze installate non sono inclusi nel repository.
- Verifica visiva: anteprime precedentemente acquisite dalla demo simulata, in `preview/`; ricontrollata l'immagine con entrambe le fotocellule oscurate. Il collaudo browser è stato ripetuto sul bundle destinato al repository.

Il bundle `dist/roger-edge1-card.js` è di **68.372 byte**. SHA-256:

```text
9cef341902d64e5abdf68c468c2b0be183d3ee5192ef132eaca7ff53e0490067
```

## Limiti

Home Assistant è simulato nella pagina di anteprima: le chiamate ai servizi sono registrate in memoria. Nessuna chiamata è stata inviata alla centralina reale, nessuna dashboard live modificata e nessun firmware ricompilato o caricato durante questo lavoro.

Gli esempi pubblici richiedono di inserire il proprio ID dispositivo o gli ID delle proprie entità. La card può risolvere questi ultimi al caricamento tramite il registro di Home Assistant. La compatibilità del registro era stata controllata sul codice ufficiale HA 2026.9.3; la prova completa nell'installazione dell'utente resta da fare.

La struttura di distribuzione segue i requisiti documentati per i repository personalizzati HACS di tipo Dashboard. Non è stata eseguita un'installazione HACS nell'istanza Home Assistant reale durante la pubblicazione.
