import type { EntityKey, EntityMap, RegistryEntry, RogerEdge1CardConfig } from "../types";

export const ENTITY_DEFINITIONS: Record<EntityKey, { domain: string; names: string[] }> = {
  cover: { domain: "cover", names: ["Cancello"] },
  position: { domain: "sensor", names: ["Posizione Cancello", "Posizione"] },
  position_1: { domain: "sensor", names: ["Posizione Anta 1"] },
  position_2: { domain: "sensor", names: ["Posizione Anta 2"] },
  state_1: { domain: "sensor", names: ["Stato Anta 1"] },
  state_2: { domain: "sensor", names: ["Stato Anta 2"] },
  state_code_1: { domain: "sensor", names: ["Codice Stato Anta 1"] },
  state_code_2: { domain: "sensor", names: ["Codice Stato Anta 2"] },
  online: { domain: "binary_sensor", names: ["EDGE1 Collegata", "Collegata"] },
  ft1: { domain: "binary_sensor", names: ["FT1 Oscurata"] },
  ft2: { domain: "binary_sensor", names: ["FT2 Oscurata"] },
  inputs_raw: { domain: "sensor", names: ["EDGE1 Ingressi Raw 0x1711", "Ingressi Raw 0x1711"] },
  last_result: { domain: "sensor", names: ["EDGE1 Ultimo Esito Comando", "Ultimo Esito Comando"] },
  parameter_80: { domain: "select", names: ["Parametro 80"] },
  open_button: { domain: "button", names: ["Cancello Apri", "Apri"] },
  stop_button: { domain: "button", names: ["Cancello Stop", "Stop"] },
  close_button: { domain: "button", names: ["Cancello Chiudi", "Chiudi"] },
  pedestrian_button: { domain: "button", names: ["Cancello Pedonale", "Pedonale"] },
};
const normalize = (value: string) => value.toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

export function validateConfig(config: RogerEdge1CardConfig): void {
  if (!config || (!config.device_id && !Object.keys(config.entities ?? {}).length)) {
    throw new Error("Indica device_id oppure la mappa entities della centralina.");
  }
  if (config.device_id && !/^[a-zA-Z0-9_-]+$/.test(config.device_id)) throw new Error("device_id non valido.");
  if (config.motor1_side && !["left", "right"].includes(config.motor1_side)) throw new Error("motor1_side: usa left o right.");
  if (config.ui?.view_mode && !["graphic", "text", "hybrid"].includes(config.ui.view_mode)) throw new Error("ui.view_mode: usa graphic, text o hybrid.");
  const pedestrian = config.pedestrian_position;
  if (pedestrian !== undefined) {
    if (!pedestrian || typeof pedestrian !== "object" || Array.isArray(pedestrian)) throw new Error("pedestrian_position: indica position e, se necessario, motor e tolerance.");
    if (pedestrian.motor !== undefined && ![1, 2].includes(pedestrian.motor)) throw new Error("pedestrian_position.motor: usa 1 o 2.");
    if (!Number.isFinite(pedestrian.position) || pedestrian.position <= 0 || pedestrian.position >= 100) throw new Error("pedestrian_position.position: indica una percentuale maggiore di 0 e minore di 100.");
    if (pedestrian.tolerance !== undefined && (!Number.isFinite(pedestrian.tolerance) || pedestrian.tolerance < 0 || pedestrian.tolerance > 5)) throw new Error("pedestrian_position.tolerance: indica un valore tra 0 e 5 punti percentuali.");
  }
  for (const [key, id] of Object.entries(config.entities ?? {})) {
    const definition = ENTITY_DEFINITIONS[key as EntityKey];
    if (!definition || typeof id !== "string" || !new RegExp(`^${definition.domain}\\.[a-z0-9_]+$`).test(id)) {
      throw new Error(`Entità non valida per ${key}: ${id}`);
    }
  }
  if (config.settings_path && (!config.settings_path.startsWith("/") || config.settings_path.startsWith("//"))) {
    throw new Error("settings_path deve essere un percorso locale di Home Assistant.");
  }
}

// Match only this device; the longest alias distinguishes code and text sensors.
export function discoverEntities(config: RogerEdge1CardConfig, registry: RegistryEntry[]): {
  entities: EntityMap; ambiguous: EntityKey[];
} {
  const candidates = new Map<EntityKey, string[]>();
  for (const entry of registry) {
    if (!config.device_id || entry.device_id !== config.device_id || entry.disabled_by) continue;
    const domain = entry.entity_id.split(".")[0];
    const names = [entry.original_name, entry.name, entry.entity_id.split(".")[1]].map(v => normalize(v ?? ""));
    const scores = (Object.entries(ENTITY_DEFINITIONS) as [EntityKey, typeof ENTITY_DEFINITIONS[EntityKey]][])
      .filter(([, d]) => d.domain === domain)
      .map(([key, d]) => ({ key, score: Math.max(0, ...d.names.map(name => {
        const alias = normalize(name);
        return Math.max(0, ...names.map((n, index) => n === alias || n.endsWith(`_${alias}`)
          ? alias.length + (index === 0 ? 1000 : index === 1 ? 500 : 0) : 0));
      })) })).filter(v => v.score > 0).sort((a, b) => b.score - a.score);
    if (!scores.length || scores[0].score === scores[1]?.score) continue;
    const key = scores[0].key;
    candidates.set(key, [...(candidates.get(key) ?? []), entry.entity_id]);
  }
  const entities: EntityMap = {};
  const ambiguous: EntityKey[] = [];
  for (const [key, ids] of candidates) {
    if (ids.length === 1) entities[key] = ids[0];
    else if (!config.entities?.[key]) ambiguous.push(key);
  }
  return { entities: { ...entities, ...config.entities }, ambiguous };
}
