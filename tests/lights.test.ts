import { test } from "node:test";
import assert from "node:assert/strict";
import type { HomeAssistant } from "../src/types";
import { columnLights, lightColor, lightControlAvailable, readColumnLight, validateColumnLights } from "../src/utils/lights";

const hass = (state = "on", attributes: Record<string, unknown> = {}): HomeAssistant => ({
  connected: true, states: { "light.columns": { state, attributes } },
  callService: async () => {}, callWS: async <T>() => [] as T,
});

test("shared light illuminates both columns with real color and brightness; opt-in only", () => {
  const h = hass("on", { rgb_color: [12, 140, 255], brightness: 128 });
  assert.deepEqual(columnLights(h), {});
  const lights = columnLights(h, { entity: "light.columns" });
  assert.deepEqual(lights.left, lights.right);
  assert.equal(lights.left?.color, "rgb(12, 140, 255)");
  assert.equal(lights.left?.brightness, 128 / 255);
});

test("off, unknown, missing and disconnected lights never glow", () => {
  for (const state of ["off", "unknown", "unavailable"]) {
    const s = readColumnLight(hass(state, { brightness: 255 }), "light.columns");
    assert.equal(s.brightness, 0);
    assert.equal(s.state, state === "off" ? "off" : "unavailable");
  }
  const h = hass(); h.connected = false;
  assert.equal(readColumnLight(h, "light.columns").state, "unavailable");
  assert.equal(readColumnLight(hass(), "light.missing").state, "unavailable");
  assert.equal(lightControlAvailable(h, "light.columns"), false);
  assert.equal(lightControlAvailable(hass("off"), "light.columns"), true);
});

test("master power gates mirrored segment color and combines brightness without double counting", () => {
  const h = hass("on", { brightness: 128 });
  h.states["light.segment"] = { state: "on", attributes: { brightness: 128, rgb_color: [255, 40, 0] } };
  const s = readColumnLight(h, "light.columns", "light.segment");
  assert.equal(s.color, "rgb(255, 40, 0)");
  assert.equal(s.brightness, (128 / 255) ** 2);
  assert.equal(readColumnLight(h, "light.columns", "light.columns").brightness, 128 / 255);
  h.states["light.columns"].state = "off";
  assert.equal(readColumnLight(h, "light.columns", "light.segment").brightness, 0);
  h.states["light.columns"].state = "on";
  h.states["light.segment"].state = "unavailable";
  assert.equal(readColumnLight(h, "light.columns", "light.segment").state, "unavailable");
  assert.equal(lightControlAvailable(h, "light.columns"), true);
});

test("independent columns do not borrow the other side's light", () => {
  const h = hass("on", { rgb_color: [255, 0, 0] });
  h.states["light.right"] = { state: "off", attributes: { rgb_color: [0, 0, 255] } };
  const s = columnLights(h, { left: "light.columns", right: "light.right" });
  assert.equal(s.left?.state, "on"); assert.equal(s.right?.state, "off");
  assert.equal(columnLights(h, { left: "light.columns" }).right, undefined);
});

test("color and brightness attributes are finite and CSS-safe, including white/HS fallbacks", () => {
  assert.equal(lightColor({ rgb_color: [999, -1, 20.4] }), "rgb(255, 0, 20)");
  assert.equal(lightColor({ rgbw_color: [0, 0, 0, 255] }), "rgb(255, 255, 255)");
  assert.equal(lightColor({ hs_color: [240, 100] }), "rgb(0, 0, 255)");
  assert.equal(lightColor({ rgb_color: "red;display:none" }), "rgb(255, 224, 178)");
  assert.equal(lightColor({ rgb_color: [NaN, 0, 0] }), "rgb(255, 224, 178)");
  assert.match(lightColor({ color_temp_kelvin: 4000 }), /^rgb\(255, \d+, \d+\)$/);
  assert.equal(readColumnLight(hass("on", { brightness: -20 }), "light.columns").brightness, 0);
  assert.equal(readColumnLight(hass("on", { brightness: 999 }), "light.columns").brightness, 1);
});

test("column configuration rejects wrong domains, ambiguous targets and invalid types", () => {
  for (const c of [null, [], false, {}, { entity: "switch.columns" }, { entity: "light.columns", left: "light.other" },
    { left: "light.columns", color_entity: "light.segment" }, { entity: "light.columns", show_controls: "false" },
    { entity: "light.columns", preset_entity: "light.preset" }]) assert.throws(() => validateColumnLights(c as any));
  assert.doesNotThrow(() => validateColumnLights({ entity: "light.columns", color_entity: "light.segment", preset_entity: "select.preset" }));
});
