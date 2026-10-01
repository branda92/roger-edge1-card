# Registro delle modifiche

## 1.1.0 — 20 settembre 2026

- Riconoscimento opzionale della posizione pedonale configurata: il riepilogo mostra la percentuale della sola anta pedonale quando le ante sono ferme nella posizione prevista.
- Nessuna inferenza dal comando inviato; stati in movimento, sconosciuti o scollegati conservano le proprie indicazioni.
- Testi FT1/FT2 centrati nei rispettivi riquadri e icona delle fotocellule incorporata in SVG, anche nell’avviso sul cancello.
- Nuovi test per percentuali, tolleranza, dati mancanti e allineamento nelle card strette.

## 1.0.0 — 20 settembre 2026

- Prima pubblicazione della card Roger EDGE1, adattata alla telemetria e ai pulsanti di `esphome-roger-edge1` v0.3.0.
- Visualizzazione indipendente delle ante e dei sensori FT1/FT2, compreso il registro `0x0030` con entrambe oscurate.
- Riconoscimento delle entità per dispositivo e possibilità di configurare associazioni esplicite.
- Comandi Apri, Stop, Chiudi e Pedonale, con gestione di connessioni interrotte e richieste pendenti.
- Bundle JavaScript pronto all’uso, manifest per repository personalizzato HACS, demo, esempi e documentazione in italiano.
- Grafica derivata da CB19 ESPHome Card di Zoltán Szőke. Licenze e attribuzioni incluse nel bundle.
