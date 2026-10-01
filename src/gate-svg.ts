import { html } from "lit";
import { renderGateArt } from "./gate-art";
import type { GateStatus, MotorSide } from "./types";

function wingStyle(position: number | null, side: MotorSide): string {
  const scale = position === null ? 1 : Math.max(0.035, Math.cos(Math.max(0, Math.min(100, position)) * Math.PI / 200));
  return `transform-box:fill-box;transform-origin:${side} center;transform:scaleX(${scale.toFixed(5)});opacity:${position === null ? 0.18 : 1}`;
}
export function renderGateSvg(status: GateStatus, motor1Side: MotorSide) {
  const left = motor1Side === "left" ? status.motor1Position : status.motor2Position;
  const right = motor1Side === "right" ? status.motor1Position : status.motor2Position;
  const svg = renderGateArt(wingStyle(left, "left"), wingStyle(right, "right"));
  return html`<div class="gate-svg-wrap" role="img" aria-label=${`${status.label}. Anta 1: ${status.motor1Position ?? "sconosciuta"}. Anta 2: ${status.motor2Position ?? "sconosciuta"}.`}>${svg}</div>`;
}
