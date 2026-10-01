import type { ColumnLightState, ColumnLightsConfig, ColumnLightsState, HassEntity, HomeAssistant } from "../types";

const validNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const clamp = (v: number, max: number) => Math.max(0, Math.min(max, v));
const tuple = (v: unknown, size: number): v is number[] => Array.isArray(v) && v.length === size && v.every(validNumber);

// HA normally supplies rgb_color for color-capable lights; never use raw strings as CSS.
export function lightColor(attributes: HassEntity["attributes"]): string {
  let rgb: number[] = [255, 224, 178]; // Warm white when a master light exposes no color.
  if (tuple(attributes.rgb_color, 3)) rgb = attributes.rgb_color;
  else if (tuple(attributes.rgbw_color, 4)) {
    const [r, g, b, w] = attributes.rgbw_color;
    rgb = [r + w, g + w, b + w];
  } else if (tuple(attributes.hs_color, 2)) {
    const [h, s] = attributes.hs_color;
    const hue = ((h % 360) + 360) % 360 / 60;
    const sat = clamp(s, 100) / 100;
    const x = sat * (1 - Math.abs(hue % 2 - 1));
    const pairs = [[sat,x,0],[x,sat,0],[0,sat,x],[0,x,sat],[x,0,sat],[sat,0,x]];
    rgb = pairs[Math.floor(hue)].map(c => (c + 1 - sat) * 255);
  } else if (validNumber(attributes.color_temp_kelvin)) {
    const t = Math.max(1000, Math.min(40000, attributes.color_temp_kelvin)) / 100;
    rgb = [t <= 66 ? 255 : 329.698727446 * (t - 60) ** -0.1332047592,
      t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * (t - 60) ** -0.0755148492,
      t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307];
  }
  return `rgb(${rgb.map(c => Math.round(clamp(c, 255))).join(", ")})`;
}

export function readColumnLight(hass: HomeAssistant | undefined, entity: string, colorEntity?: string): ColumnLightState {
  const source = hass?.states[entity];
  const colorSource = colorEntity ? hass?.states[colorEntity] : source;
  const known = (e?: HassEntity) => e?.state === "on" || e?.state === "off";
  const state = !hass || hass.connected === false || !known(source) ? "unavailable"
    : source!.state === "off" ? "off"
    : colorEntity && !known(colorSource) ? "unavailable"
    : colorSource?.state === "off" ? "off" : "on";
  const brightness = (e?: HassEntity) => validNumber(e?.attributes.brightness) ? clamp(e!.attributes.brightness, 255) / 255 : 1;
  return { entity, state, color: lightColor(colorSource?.attributes ?? {}),
    brightness: state === "on" ? brightness(source) * (colorEntity && colorEntity !== entity ? brightness(colorSource) : 1) : 0 };
}

export function columnLights(hass: HomeAssistant | undefined, config?: ColumnLightsConfig): ColumnLightsState {
  if (!config) return {};
  const left = config.entity ?? config.left;
  const right = config.entity ?? config.right;
  return { left: left ? readColumnLight(hass, left, config.color_entity) : undefined,
    right: right ? readColumnLight(hass, right, config.color_entity) : undefined };
}

export function lightControlAvailable(hass: HomeAssistant | undefined, entity: string): boolean {
  return !!hass && hass.connected !== false && ["on", "off"].includes(hass.states[entity]?.state);
}

export function validateColumnLights(config: ColumnLightsConfig | undefined): void {
  if (config === undefined) return;
  if (!config || typeof config !== "object" || Array.isArray(config)) throw new Error("column_lights: indica entity oppure left/right.");
  if (!config.entity && !config.left && !config.right) throw new Error("column_lights: indica almeno una luce.");
  if (config.entity && (config.left || config.right)) throw new Error("column_lights: usa entity oppure left/right, non entrambi.");
  if (config.color_entity && !config.entity) throw new Error("column_lights.color_entity richiede entity: è il segmento di colore della luce comune.");
  for (const key of ["entity", "left", "right", "color_entity", "preset_entity"] as const) {
    const value = config[key];
    if (value !== undefined && (typeof value !== "string" || !new RegExp(`^${key === "preset_entity" ? "select" : "light"}\\.[a-z0-9_]+$`).test(value)))
      throw new Error(`column_lights.${key}: ID entità non valido.`);
  }
  if (config.show_controls !== undefined && typeof config.show_controls !== "boolean") throw new Error("column_lights.show_controls: usa true o false.");
}
