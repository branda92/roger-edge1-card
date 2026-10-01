# Verifiche — Roger EDGE1 Card 1.2.0

Eseguite il 1 ottobre 2026. Ambiente locale: Node.js 24.19.0, npm 9.6.5, TypeScript strict, Vite e Google Chrome.

- `npm test`: **24 test superati**. Conservati i casi delle ante, delle fotocellule (incluso `0x0030`), della posizione pedonale e dell'associazione delle entità. Aggiunti sei test su luce condivisa, colonne indipendenti, luce master/segmento, perdita di connessione, attributi colore/luminosità e validazione YAML.
- `npm run build`: compilazione TypeScript strict e bundle Vite completati.
- `npm run test:browser`: **17 test superati** su Home Assistant simulato. Oltre agli undici casi precedenti, verificati: singolo comando WLED per entrambe le colonne, colore e intensità del disegno, assenza di stato ottimistico, dettaglio nativo della luce, scelta e aggiornamento del preset, errori senza retry, Stop indipendente da una richiesta WLED pendente, stato non disponibile, perdita HA e UART, luci separate, gradienti indipendenti fra più card, tre viste, tema chiaro e layout mobile.
- Dopo la modifica finale del destinatario del pannello nativo al master WLED, ricompilato il bundle 1.2.0 e ripetuto con esito positivo il test mirato `native light dialog` (dettaglio master e preset).
- Verifica visiva nel browser: strisce sotto i cappelli delle due colonne e illuminazione verso il basso, nelle varianti bianco caldo e blu. Acquisizioni in `preview/colonne-wled.png` e `preview/colonne-wled-blu.png`; le altre immagini si riferiscono alle versioni precedenti.
- Gli ID negli esempi e nella demo sono segnaposto o sintetici. Nessun indirizzo dell'impianto reale o credenziale è necessario nel bundle.

Il bundle `dist/roger-edge1-card.js` è di **80.946 byte**. SHA-256:

```text
648bb6bbe3033fc2cde3b742a16b94032c5c4466f82d2168ec3f8a354123cded
```

## Limiti

Home Assistant e WLED sono simulati durante i test. Le chiamate ai servizi sono registrate in memoria: nessun comando è stato inviato a luci o cancello reali, nessuna dashboard live è stata modificata e nessun firmware installato.

Il test del pannello nativo verifica l'evento `hass-more-info` e il suo destinatario; il pannello completo appartiene a Home Assistant e non è riprodotto nella demo.

La luce grafica segue gli attributi disponibili in HA. Il master WLED può esporre soltanto luminosità: per leggere il colore di due colonne specchiate occorre configurare un segmento tramite `color_entity`. In assenza di colore viene usato un bianco caldo indicativo. Gli effetti animati WLED non vengono riprodotti LED per LED. Il supporto ai preset richiede l'ID esplicito di un'entità `select` con le opzioni disponibili.

La versione 1.2.0 va verificata nell'installazione reale dopo l'aggiornamento della risorsa HACS. Il componente ESPHome e le automazioni esistenti non sono stati modificati.
