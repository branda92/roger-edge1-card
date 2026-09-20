import type { AvailableActions, EntityMap, GateStatus, HomeAssistant, PedestrianPositionConfig } from "../types";

const STATE_NAMES = ["Sconosciuto", "Apertura", "Stop durante apertura", "Chiusura", "Stop durante chiusura",
  "Aperta", "Chiusa", "Sbloccata", "Posizione sconosciuta", "Apertura (pos. sconosciuta)",
  "Stop apertura (pos. sconosciuta)", "Chiusura (pos. sconosciuta)",
  "Stop chiusura / aperta (pos. sconosciuta)", "Chiusa (pos. sconosciuta)",
  "Sbloccata (pos. sconosciuta)", "Stato non documentato (15)"];
export const safeState = (hass: HomeAssistant | undefined, id?: string): string => id ? hass?.states[id]?.state ?? "" : "";
export function numberState(hass: HomeAssistant | undefined, id?: string): number | null {
  const value = safeState(hass, id).trim();
  if (!value || ["unknown", "unavailable"].includes(value)) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
function position(hass: HomeAssistant | undefined, id?: string) {
  const n = numberState(hass, id);
  return n !== null && n >= 0 && n <= 100 ? n : null;
}
function binary(hass: HomeAssistant | undefined, id?: string): boolean | null {
  const value = safeState(hass, id);
  return value === "on" ? true : value === "off" ? false : null;
}
function stateCode(hass: HomeAssistant | undefined, id?: string, textId?: string): number | null {
  const n = numberState(hass, id);
  if (n !== null && Number.isInteger(n) && n >= 0 && n < 16) return n;
  const index = STATE_NAMES.indexOf(safeState(hass, textId));
  return index < 0 ? null : index;
}

export function computeGateStatus(hass: HomeAssistant | undefined, e: EntityMap, pedestrian?: PedestrianPositionConfig): GateStatus {
  const connected = !!hass && hass.connected !== false;
  const online = connected ? binary(hass, e.online) : false;
  const c1 = stateCode(hass, e.state_code_1, e.state_1);
  const c2 = stateCode(hass, e.state_code_2, e.state_2);
  const codes = [c1, c2];
  const opening = online === true && codes.some(v => v === 1 || v === 9);
  const closing = online === true && codes.some(v => v === 3 || v === 11);
  const moving = opening || closing;
  const stopped = online === true && !moving && codes.some(v => v === 2 || v === 4 || v === 10 || v === 12);
  const fullyClosed = online === true && codes.every(v => v === 6 || v === 13);
  const fullyOpened = online === true && codes.every(v => v === 5);
  const p1 = online === true ? position(hass, e.position_1) : null;
  const p2 = online === true ? position(hass, e.position_2) : null;
  const total = online === true ? position(hass, e.position) ?? (p1 !== null && p2 !== null ? (p1 + p2) / 2 : null) : null;
  const motor2 = pedestrian?.motor === 2;
  const pedestrianPosition = motor2 ? p2 : p1;
  const otherPosition = motor2 ? p1 : p2;
  const pedestrianCode = motor2 ? c2 : c1;
  const otherCode = motor2 ? c1 : c2;
  const tolerance = pedestrian?.tolerance ?? 1;
  // Recognize a configured stationary position, never the cause of the movement.
  const atPedestrianPosition = !!pedestrian && online === true && !moving
    && pedestrianCode !== null && [2, 4, 5].includes(pedestrianCode) && otherCode === 6
    && pedestrianPosition !== null && otherPosition !== null
    && pedestrianPosition > 0 && pedestrianPosition < 100
    && Math.abs(pedestrianPosition - pedestrian.position) <= tolerance
    && otherPosition <= tolerance;
  let label = "Stato non disponibile";
  if (online === false) label = "Centralina non collegata";
  else if (online === true) {
    if (opening && closing) label = "Movimento ante";
    else if (opening) label = "In apertura";
    else if (closing) label = "In chiusura";
    else if (atPedestrianPosition) label = "Posizione pedonale";
    else if (stopped) label = "Fermo";
    else if (fullyClosed) label = "Chiuso";
    else if (fullyOpened) label = "Aperto";
    else if (codes.some(v => v === 7 || v === 14)) label = "Anta sbloccata";
    else if (codes.every(v => v === 5 || v === 6)) label = "Apertura parziale";
    else if (codes.some(v => v !== null && v >= 8)) label = "Posizione sconosciuta";
  }
  const raw = connected ? numberState(hass, e.inputs_raw) : null;
  const validRaw = raw !== null && Number.isInteger(raw) && raw >= 0 && raw <= 0xffff;
  // Never replace an unknown configured binary sensor with potentially stale raw data.
  const ft = (id: string | undefined, mask: number) => !connected ? null : id
    ? binary(hass, id) : validRaw ? ((raw! & mask) !== 0) : null;
  return { position: total, displayPosition: atPedestrianPosition ? pedestrianPosition : total,
    atPedestrianPosition, motor1Position: p1, motor2Position: p2,
    state1: online === true && c1 !== null ? STATE_NAMES[c1] : "Non disponibile",
    state2: online === true && c2 !== null ? STATE_NAMES[c2] : "Non disponibile",
    label, opening, closing, moving, fullyClosed, fullyOpened, stopped, online,
    ft1: ft(e.ft1, 0x0010), ft2: ft(e.ft2, 0x0020), lastResult: safeState(hass, e.last_result) };
}

export function computeAvailableActions(hass: HomeAssistant | undefined, e: EntityMap, status: GateStatus): AvailableActions {
  // ESPHome buttons start as unknown before the first press: that is valid.
  const usable = (id?: string) => !!hass && hass.connected !== false && !!id && !!hass.states[id] && hass.states[id].state !== "unavailable";
  return {
    open: status.online === true && usable(e.open_button),
    close: status.online === true && usable(e.close_button),
    pedestrian: status.online === true && usable(e.pedestrian_button),
    // UART status may be stale; STOP remains available while ESPHome is reachable.
    stop: usable(e.stop_button),
  };
}
