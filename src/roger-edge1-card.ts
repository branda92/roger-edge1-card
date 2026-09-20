/** Roger EDGE1 Card — adapted from CB19 ESPHome Card (MIT), Zoltán Szőke. */
import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import type { CardUiConfig, ControlName, EntityKey, EntityMap, GateStatus, HomeAssistant, RegistryEntry, RogerEdge1CardConfig } from "./types";
import { discoverEntities, validateConfig } from "./utils/entities";
import { computeAvailableActions, computeGateStatus } from "./utils/state";
import { renderGateSvg } from "./gate-svg";
import { resolveUiConfig } from "./utils/ui-config";

const BUTTON_KEYS: Record<ControlName, EntityKey> = { open: "open_button", stop: "stop_button", close: "close_button", pedestrian: "pedestrian_button" };
const LABELS: Record<ControlName, string> = { open: "Apri", stop: "Stop", close: "Chiudi", pedestrian: "Pedonale" };

@customElement("roger-edge1-card")
export class RogerEdge1Card extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: RogerEdge1CardConfig;
  @state() private _entities: EntityMap = {};
  @state() private _message = "";
  @state() private _discoveryMessage = "";
  @state() private _loading = false;
  @state() private _pending = new Set<ControlName>();
  private _ui: CardUiConfig = resolveUiConfig({ type: "custom:roger-edge1-card" });
  private _generation = 0;
  private _loadRequested = true;
  private _unsubscribe?: () => void;
  private _subscribing = false;
  static styles = [cardStyles];

  public setConfig(config: RogerEdge1CardConfig): void {
    validateConfig(config);
    this._generation++;
    this._config = { motor1_side: "left", settings_action: "device_page", ...config };
    this._ui = resolveUiConfig(this._config);
    this._entities = { ...config.entities };
    this._discoveryMessage = "";
    this._message = "";
    this._loadRequested = true;
    this._loading = false;
  }
  public getCardSize() { return this._ui.view_mode === "text" ? 4 : 6; }
  public getGridOptions() { return { columns: 12, min_columns: 6 }; }
  public static getStubConfig() { return { device_id: "", motor1_side: "left" }; }

  public connectedCallback(): void {
    super.connectedCallback();
    this._loadRequested = true;
    this.requestUpdate();
  }
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._generation++;
    this._loading = false;
    this._unsubscribe?.();
    this._unsubscribe = undefined;
  }
  protected updated(changes: PropertyValues): void {
    if (!this.isConnected || !this.hass || !this._config?.device_id) return;
    const oldHass = changes.get("hass") as HomeAssistant | undefined;
    if (oldHass && (oldHass.connection !== this.hass.connection || (oldHass.connected === false && this.hass.connected !== false))) {
      this._unsubscribe?.(); this._unsubscribe = undefined; this._loadRequested = true;
    }
    if (this.hass.connected === false) return;
    if (this._loadRequested && !this._loading) void this._loadEntities();
    if (!this._unsubscribe && !this._subscribing && this.hass.connection) void this._subscribeRegistry();
  }
  private async _subscribeRegistry() {
    const connection = this.hass?.connection;
    if (!connection) return;
    this._subscribing = true;
    try {
      const unsubscribe = await connection.subscribeEvents(() => {
        this._loadRequested = true;
        this.requestUpdate();
      }, "entity_registry_updated");
      if (!this.isConnected || connection !== this.hass?.connection) unsubscribe();
      else this._unsubscribe = unsubscribe;
    } catch { /* Manual retry is available when subscriptions are restricted. */ }
    finally { this._subscribing = false; }
  }
  private async _loadEntities() {
    if (!this.hass || !this._config) return;
    const generation = this._generation;
    const config = this._config;
    this._loadRequested = false;
    this._loading = true;
    try {
      const registry = await this.hass.callWS<RegistryEntry[]>({ type: "config/entity_registry/list" });
      if (generation !== this._generation) return;
      const result = discoverEntities(config, registry);
      this._entities = result.entities;
      this._discoveryMessage = result.ambiguous.length
        ? `Entità ambigue: ${result.ambiguous.join(", ")}. Indicale nella mappa entities.` : "";
    } catch {
      if (generation === this._generation) this._discoveryMessage = "Impossibile leggere le entità. Riprova oppure configura entities nel YAML della card.";
    } finally {
      if (generation === this._generation) this._loading = false;
    }
  }
  private async _press(action: ControlName) {
    const hass = this.hass;
    const status = computeGateStatus(hass, this._entities);
    if (!hass || this._pending.has(action) || !computeAvailableActions(hass, this._entities, status)[action]) return;
    const id = this._entities[BUTTON_KEYS[action]];
    if (!id) return;
    this._message = "";
    this._pending = new Set([...this._pending, action]);
    try {
      await hass.callService("button", "press", { entity_id: id });
      // A service response is not proof of gate motion; the visual stays telemetry-driven.
    } catch {
      this._message = `Invio di «${LABELS[action]}» non riuscito. Controlla la connessione.`;
    } finally {
      const pending = new Set(this._pending); pending.delete(action); this._pending = pending;
    }
  }
  private _openSettings() {
    if (!this._config || this._config.settings_action === false) return;
    if (this._config.settings_action === "more_info") {
      const entityId = this._config.settings_entity || this._entities.cover || this._entities.parameter_80;
      if (entityId) this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId } }));
      return;
    }
    const path = this._config.settings_path || (this._config.device_id ? `/config/devices/device/${this._config.device_id}` : "");
    if (path) {
      window.history.pushState(null, "", path);
      window.dispatchEvent(new Event("location-changed"));
    } else {
      this._message = "Indica device_id o settings_path per aprire il dispositivo.";
    }
  }
  private _settingsButton(where: "header" | "graphic") {
    const target = this._ui.header.settings_button_position;
    if (!this._ui.settings_button.enabled || this._config?.settings_action === false || target === "none") return nothing;
    const effective = !this._ui.header.enabled && target === "header" ? "graphic" : target;
    if (where !== effective) return nothing;
    return html`<button class="settings-btn" title="Impostazioni dispositivo" aria-label="Impostazioni dispositivo" @click=${this._openSettings}><ha-icon icon="mdi:cog"></ha-icon></button>`;
  }
  private _percent(n: number | null) { return n === null ? "—" : `${Math.round(n)}%`; }
  private _buttonStyle(action: ControlName) {
    const c = this._ui.colors;
    const tune = this._ui.icon_tune;
    return [
      `--roger-button-default-bg:${c.button_default[action]}`,
      `--roger-button-active-bg:${c.button_active[action]}`,
      `--roger-button-available-bg:${c.button_available[action]}`,
      `--roger-icon-default-color:${c.icon_default[action]}`,
      `--roger-icon-active-color:${c.icon_active[action]}`,
      `--roger-icon-available-color:${c.icon_available[action]}`,
      `--roger-icon-x:${tune.x + tune[`${action}_x`]}px`,
      `--roger-icon-y:${tune.y + tune[`${action}_y`]}px`,
    ].join(";");
  }
  private _controls(status: GateStatus) {
    if (!this._ui.controls.enabled) return nothing;
    const available = computeAvailableActions(this.hass, this._entities, status);
    const active: Record<ControlName, boolean> = { open: status.opening, close: status.closing, stop: status.stopped, pedestrian: false };
    // The EDGE1 does not report a distinct pedestrian state: never infer it from an ACK or a percentage.
    const visible = (["open", "stop", "close", "pedestrian"] as ControlName[]).filter(action => {
      const setting = this._ui.controls[`show_${action}`];
      return setting === "auto" ? !!this._entities.pedestrian_button : setting;
    });
    if (!visible.length) return nothing;
    return html`<div class="controls-wrap"><div class="controls" style=${`grid-template-columns:repeat(${visible.length},minmax(0,1fr))`}>
      ${visible.map(action => html`<button
        class=${`icon-btn ${action} ${active[action] ? `is-active effect-${this._ui.effects.active_action}` : ""} ${available[action] ? "is-available" : ""} ${this._ui.controls.available_action_tint ? "tint-enabled" : ""}`}
        style=${this._buttonStyle(action)} title=${LABELS[action]} aria-label=${LABELS[action]}
        ?disabled=${!available[action] || this._pending.has(action)} aria-busy=${this._pending.has(action)}
        @click=${() => this._press(action)}>
        <ha-icon icon=${this._ui.icons[action]}></ha-icon><span>${LABELS[action]}</span>
      </button>`)}
    </div></div>`;
  }
  private _photocells(status: GateStatus) {
    return html`<div class="photocells" aria-label="Fotocellule">
      ${([1, 2] as const).map(n => {
        const value = n === 1 ? status.ft1 : status.ft2;
        return html`<div class=${`photocell ${value === true ? "blocked" : value === false ? "clear" : "unknown"}`} data-ft=${n}>
          <ha-icon icon="mdi:laser"></ha-icon><span>FT${n}</span><strong>${value === true ? "Oscurata" : value === false ? "Libera" : "Non disponibile"}</strong>
        </div>`;
      })}
    </div>`;
  }
  private _leafDetails(status: GateStatus) {
    return html`<div class="leaf-details">
      <div><span>Anta 1</span><strong>${this._percent(status.motor1Position)}</strong><small>${status.state1}</small></div>
      <div><span>Anta 2</span><strong>${this._percent(status.motor2Position)}</strong><small>${status.state2}</small></div>
    </div>`;
  }
  private _configurationNotice() {
    if (this._loading) return html`<div class="notice">Riconoscimento entità…</div>`;
    const missing = (["online", "position_1", "position_2", "open_button", "stop_button", "close_button", "pedestrian_button"] as EntityKey[]).filter(key => !this._entities[key]);
    if (!this._entities.state_1 && !this._entities.state_code_1) missing.push("state_1");
    if (!this._entities.state_2 && !this._entities.state_code_2) missing.push("state_2");
    if (!this._entities.ft1 && !this._entities.inputs_raw) missing.push("ft1");
    if (!this._entities.ft2 && !this._entities.inputs_raw) missing.push("ft2");
    const message = this._discoveryMessage || (missing.length ? `Entità da configurare: ${missing.join(", ")}.` : "");
    return message ? html`<div class="notice">${message} ${this._config?.device_id ? html`<button class="retry" @click=${() => { this._loadRequested = true; this.requestUpdate(); }}>Rileggi entità</button>` : nothing}</div>` : nothing;
  }
  protected render() {
    if (!this._config) return nothing;
    const status = computeGateStatus(this.hass, this._entities);
    const ui = this._ui;
    const style = `--roger-card-padding:${ui.padding.card};--roger-visual-padding:${ui.padding.visual};--roger-controls-top:${ui.padding.controls_top};--roger-header-bottom:${ui.padding.header_bottom};--roger-content-gap:${ui.padding.content_gap}`;
    const ftWarning = status.ft1 && status.ft2 ? "FT1 e FT2 oscurate" : status.ft1 ? "FT1 oscurata" : status.ft2 ? "FT2 oscurata" : "";
    return html`<ha-card><div class="wrapper" style=${style}>
      ${ui.header.enabled ? html`<div class="header-row"><div class="header-main"><div class="header-title">${ui.header.title}</div>
        ${ui.header.show_state || ui.header.show_position ? html`<div class="header-meta">${ui.header.show_state ? status.label : ""}${ui.header.show_state && ui.header.show_position ? " · " : ""}${ui.header.show_position ? this._percent(status.position) : ""}</div>` : nothing}
      </div>${this._settingsButton("header")}</div>` : nothing}
      ${ui.view_mode === "text" ? html`<div class="text-panel"><div class="text-panel-main">${status.label} · ${this._percent(status.position)}</div>${this._settingsButton("graphic")}</div>` : html`
        <div class="visual-box">${renderGateSvg(status, this._config.motor1_side ?? "left")}
          ${ftWarning ? html`<div class="overlay-badges"><div class="flag warn"><ha-icon icon="mdi:laser"></ha-icon>${ftWarning}</div></div>` : nothing}
          ${this._settingsButton("graphic")}
        </div>
        <div class="meta-row" role="status"><span class=${`connection-dot ${status.online === true ? "connected" : "disconnected"}`}></span><span class="meta-state">${status.label}</span><span class="meta-separator">·</span><span class="meta-position">${this._percent(status.position)}</span></div>`}
      ${ui.view_mode !== "graphic" ? this._leafDetails(status) : nothing}
      ${this._photocells(status)}
      ${this._controls(status)}
      ${this._message ? html`<div class="notice error" role="alert">${this._message}</div>` : nothing}
      ${this._configurationNotice()}
      ${this._config.show_debug ? html`<details class="debug-box"><summary>Diagnostica e associazioni</summary><div>Ultimo esito: ${status.lastResult || "—"}</div>${Object.entries(this._entities).map(([key, id]) => html`<div><strong>${key}:</strong> ${id}</div>`)}</details>` : nothing}
    </div></ha-card>`;
  }
}

declare global { interface Window { customCards?: Array<Record<string, unknown>>; } }
window.customCards = window.customCards || [];
window.customCards.push({ type: "roger-edge1-card", name: "Roger EDGE1 — Cancello", preview: true, description: "Due ante, Apri/Stop/Chiudi/Pedonale, fotocellule FT1 e FT2." });
