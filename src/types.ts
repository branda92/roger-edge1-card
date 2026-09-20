export type MotorSide = "left" | "right";
export type SettingsAction = "device_page" | "more_info" | false;
export type ViewMode = "graphic" | "text" | "hybrid";
export type SettingsButtonPosition = "header" | "graphic" | "none";
export type ActiveEffect = "none" | "pulse" | "blink" | "glow";
export type ControlName = "open" | "stop" | "close" | "pedestrian";
export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
export interface RogerEdge1CardConfig {
  type: string;
  device_id?: string;
  motor1_side?: MotorSide;
  show_debug?: boolean;
  settings_action?: SettingsAction;
  settings_path?: string;
  settings_entity?: string;
  entities?: Partial<GateEntities>;
  ui?: DeepPartial<CardUiConfig>;
}
export interface GateEntities {
  cover: string;
  position: string;
  position_1: string;
  position_2: string;
  state_1: string;
  state_2: string;
  state_code_1: string;
  state_code_2: string;
  online: string;
  ft1: string;
  ft2: string;
  inputs_raw: string;
  last_result: string;
  parameter_80: string;
  open_button: string;
  stop_button: string;
  close_button: string;
  pedestrian_button: string;
}
export type EntityMap = Partial<GateEntities>;
export type EntityKey = keyof GateEntities;
export interface RegistryEntry {
  entity_id: string;
  device_id?: string | null;
  original_name?: string | null;
  name?: string | null;
  disabled_by?: string | null;
}
export interface HassEntity {
  state: string;
  attributes: Record<string, any>;
}
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  connected?: boolean;
  callService(domain: string, service: string, data: Record<string, unknown>): Promise<unknown>;
  callWS<T>(message: Record<string, unknown>): Promise<T>;
  connection?: { subscribeEvents(callback: () => void, eventType: string): Promise<() => void> };
}
export interface GateStatus {
  position: number | null;
  motor1Position: number | null;
  motor2Position: number | null;
  state1: string;
  state2: string;
  label: string;
  opening: boolean;
  closing: boolean;
  moving: boolean;
  fullyOpened: boolean;
  fullyClosed: boolean;
  stopped: boolean;
  online: boolean | null;
  ft1: boolean | null;
  ft2: boolean | null;
  lastResult: string;
}
export type AvailableActions = Record<ControlName, boolean>;

export interface CardUiConfig {
  view_mode: ViewMode;

  header: {
    enabled: boolean;
    title: string;
    show_state: boolean;
    show_position: boolean;
    settings_button_position: SettingsButtonPosition;
  };

  settings_button: {
    enabled: boolean;
  };

  controls: {
    enabled: boolean;
    show_open: boolean;
    show_stop: boolean;
    show_close: boolean;
    show_pedestrian: boolean | "auto";
    available_action_tint: boolean;
  };

  icons: {
    open: string;
    stop: string;
    close: string;
    pedestrian: string;
  };

  icon_tune: {
    x: number;
    y: number;
    open_x: number;
    open_y: number;
    stop_x: number;
    stop_y: number;
    close_x: number;
    close_y: number;
    pedestrian_x: number;
    pedestrian_y: number;
  };

  colors: {
    button_default: Record<ControlName, string>;
    button_active: Record<ControlName, string>;
    button_available: Record<ControlName, string>;
    icon_default: Record<ControlName, string>;
    icon_active: Record<ControlName, string>;
    icon_available: Record<ControlName, string>;
  };

  effects: {
    active_action: ActiveEffect;
  };

  padding: {
    card: string;
    visual: string;
    controls_top: string;
    header_bottom: string;
    content_gap: string;
  };
}