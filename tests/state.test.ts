import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeGateStatus, computeAvailableActions } from '../src/utils/state';
import { discoverEntities, ENTITY_DEFINITIONS, validateConfig } from '../src/utils/entities';
import type { EntityMap, HomeAssistant, RegistryEntry } from '../src/types';

const entities = Object.fromEntries(Object.entries(ENTITY_DEFINITIONS).map(([key, d]) => [key, `${d.domain}.test_${key}`])) as EntityMap;
function hass(values: Record<string, string> = {}): HomeAssistant {
  const all = { online: 'on', state_code_1: '6', state_code_2: '6', position_1: '0', position_2: '0', position: '0', ft1: 'off', ft2: 'off', open_button: 'unknown', stop_button: 'unknown', close_button: 'unknown', pedestrian_button: 'unknown', ...values };
  return { connected: true, states: Object.fromEntries(Object.entries(all).map(([key, state]) => [entities[key as keyof EntityMap], { state, attributes: {} }])), callWS: async () => [] as any, callService: async () => undefined };
}

test('real closed snapshot: positions 0%, states 6, photocells clear', () => {
  const s = computeGateStatus(hass(), entities);
  assert.equal(s.label, 'Chiuso'); assert.equal(s.position, 0); assert.equal(s.ft1, false); assert.equal(s.ft2, false);
});
test('all photocell combinations including 0x0030, independently of other bits', () => {
  for (const [raw, ft1, ft2] of [[0, false, false], [16, true, false], [32, false, true], [48, true, true], [49, true, true]] as const) {
    const e = { ...entities }; delete e.ft1; delete e.ft2;
    const s = computeGateStatus(hass({ inputs_raw: `${raw}` }), e);
    assert.equal(s.ft1, ft1); assert.equal(s.ft2, ft2);
  }
});
test('unknown binary sensor is not replaced by an old raw register', () => {
  const s = computeGateStatus(hass({ ft1: 'unknown', ft2: 'unavailable', inputs_raw: '0' }), entities);
  assert.equal(s.ft1, null); assert.equal(s.ft2, null);
});
test('real pedestrian capture 40%/0% is represented without invented pedestrian mode', () => {
  const s = computeGateStatus(hass({ position_1: '40', position_2: '0', position: '20', state_code_1: '2' }), entities);
  assert.equal(s.motor1Position, 40); assert.equal(s.motor2Position, 0); assert.equal(s.position, 20); assert.equal(s.label, 'Fermo');
});
test('unknown positions never become 0%; movement codes 9/11 still work', () => {
  for (const code of ['9', '11']) {
    const s = computeGateStatus(hass({ state_code_1: code, position_1: 'unknown', position: 'unknown' }), entities);
    assert.equal(s.motor1Position, null); assert.equal(s.position, null); assert.equal(s.moving, true);
    assert.equal(s.label, code === '9' ? 'In apertura' : 'In chiusura');
  }
});
test('UART disconnected hides stale positions; STOP remains usable', () => {
  const h = hass({ online: 'off', position: '70', position_1: '80' });
  const s = computeGateStatus(h, entities);
  assert.equal(s.position, null); assert.equal(s.motor1Position, null); assert.equal(s.label, 'Centralina non collegata');
  assert.deepEqual(computeAvailableActions(h, entities, s), { open: false, close: false, pedestrian: false, stop: true });
});
test('HA connection lost blocks all actions and marks both photocells unknown', () => {
  const h = hass(); h.connected = false;
  const s = computeGateStatus(h, entities);
  assert.equal(s.ft1, null); assert.equal(s.ft2, null);
  assert.deepEqual(computeAvailableActions(h, entities, s), { open: false, close: false, pedestrian: false, stop: false });
});
test('fresh unknown buttons can be pressed, but missing/unavailable buttons cannot', () => {
  const h = hass({ close_button: 'unavailable' }); delete h.states[entities.pedestrian_button!];
  assert.deepEqual(computeAvailableActions(h, entities, computeGateStatus(h, entities)), { open: true, close: false, pedestrian: false, stop: true });
});
test('one moving leaf dominates the other stopped leaf; conflicting directions are explicit', () => {
  assert.equal(computeGateStatus(hass({ state_code_1: '2', state_code_2: '1' }), entities).label, 'In apertura');
  assert.equal(computeGateStatus(hass({ state_code_1: '1', state_code_2: '3' }), entities).label, 'Movimento ante');
});
test('text sensors can supply the state when numeric diagnostics are disabled', () => {
  const h = hass({ state_1: 'Apertura', state_2: 'Chiusa' }); delete h.states[entities.state_code_1!]; delete h.states[entities.state_code_2!];
  assert.equal(computeGateStatus(h, entities).label, 'In apertura');
});
test('all entity roles discovered after arbitrary entity-ID renaming, only on selected device', () => {
  const registry: RegistryEntry[] = Object.entries(ENTITY_DEFINITIONS).map(([key, d], n) => ({ device_id: 'mine', original_name: d.names[0], entity_id: `${d.domain}.renamed_${n}` }));
  registry.push({ device_id: 'other', original_name: 'Cancello Apri', entity_id: 'button.other_gate' });
  const result = discoverEntities({ type: 'test', device_id: 'mine' }, registry);
  assert.equal(Object.keys(result.entities).length, Object.keys(ENTITY_DEFINITIONS).length);
  assert.equal(result.ambiguous.length, 0); assert.equal(result.entities.open_button, 'button.renamed_14');
  assert.notEqual(result.entities.state_1, result.entities.state_code_1);
});
test('ambiguous buttons are never silently selected; an explicit override resolves them', () => {
  const registry = ['a', 'b'].map(id => ({ device_id: 'mine', original_name: 'Cancello Apri', entity_id: `button.${id}` }));
  const a = discoverEntities({ type: 'test', device_id: 'mine' }, registry);
  assert.equal(a.entities.open_button, undefined); assert.deepEqual(a.ambiguous, ['open_button']);
  const b = discoverEntities({ type: 'test', device_id: 'mine', entities: { open_button: 'button.b' } }, registry);
  assert.equal(b.entities.open_button, 'button.b'); assert.deepEqual(b.ambiguous, []);
});
test('legacy duplicated ID names are supported; disabled entities are excluded', () => {
  const r = discoverEntities({ type: 'test', device_id: 'mine' }, [
    { device_id: 'mine', entity_id: 'button.cancello_centralina_cancello_cancello_apri' },
    { device_id: 'mine', entity_id: 'sensor.cancello_centralina_cancello_codice_stato_anta_1' },
    { device_id: 'mine', entity_id: 'button.ignored', original_name: 'Stop', disabled_by: 'user' },
  ]);
  assert.equal(r.entities.open_button, 'button.cancello_centralina_cancello_cancello_apri');
  assert.equal(r.entities.state_code_1, 'sensor.cancello_centralina_cancello_codice_stato_anta_1');
  assert.equal(r.entities.state_1, undefined); assert.equal(r.entities.stop_button, undefined);
});
test('configuration rejects wrong command domain, invalid view and missing mapping', () => {
  assert.throws(() => validateConfig({ type: 'test' }));
  assert.throws(() => validateConfig({ type: 'test', entities: { open_button: 'switch.cancello' } }));
  assert.throws(() => validateConfig({ type: 'test', device_id: 'mine', settings_path: '//example.org' }));
  assert.doesNotThrow(() => validateConfig({ type: 'test', device_id: 'mine' }));
});

test('configured pedestrian position shows the measured leaf percentage and preserves the total', () => {
  for (const state_code_1 of ['2','4','5']) {
    const h=hass({position_1:'40',position_2:'0',position:'20',state_code_1});
    const s=computeGateStatus(h,entities,{position:40});
    assert.equal(s.label,'Posizione pedonale');
    assert.equal(s.atPedestrianPosition,true);
    assert.equal(s.displayPosition,40);
    assert.equal(s.position,20);
    assert.equal(s.motor1Position,40);
    assert.equal(s.motor2Position,0);
  }
  const unconfigured=computeGateStatus(hass({position_1:'40',position:'20',state_code_1:'5'}),entities);
  assert.equal(unconfigured.label,'Apertura parziale');
  assert.equal(unconfigured.displayPosition,20);
  assert.equal(unconfigured.atPedestrianPosition,false);
});

test('moving, unlocked, unknown, unavailable or mismatching leaves are never labeled pedestrian', () => {
  const base={position_1:'40',position_2:'0',position:'20',state_code_1:'5'};
  for (const override of [
    ...['0','1','3','6','7','8','9','10','11','12','13','14','15','unknown','unavailable'].map(state_code_1=>({state_code_1,state_1:'unknown'})),
    {state_code_2:'1'}, {state_code_2:'5'}, {state_code_2:'13'},
    {position_1:'unknown'}, {position_2:'unavailable'}, {position_1:'0'}, {position_1:'100'},
    {position_1:'50'}, {position_2:'20'}, {online:'off'},
  ]) {
    const s=computeGateStatus(hass({...base,...override}),entities,{position:40});
    assert.equal(s.atPedestrianPosition,false,JSON.stringify(override));
    assert.notEqual(s.label,'Posizione pedonale');
  }
  const disconnected=hass(base);disconnected.connected=false;
  assert.equal(computeGateStatus(disconnected,entities,{position:40}).atPedestrianPosition,false);
});

test('pedestrian motor and tolerance are configurable without forcing a fixed percentage', () => {
  const h=hass({position_1:'0',position_2:'39.5',position:'19.75',state_code_1:'6',state_code_2:'5'});
  const s=computeGateStatus(h,entities,{motor:2,position:40,tolerance:1});
  assert.equal(s.atPedestrianPosition,true);
  assert.equal(s.displayPosition,39.5);
  assert.equal(s.position,19.75);
  assert.equal(computeGateStatus(h,entities,{motor:1,position:40}).atPedestrianPosition,false);
  assert.equal(computeGateStatus(h,entities,{motor:2,position:40,tolerance:0}).atPedestrianPosition,false);
});

test('pedestrian configuration rejects invalid targets, motors and tolerance', () => {
  for (const option of [null,true,[],{position:0},{position:100},{position:NaN},{position:'40'},
    {position:40,motor:3},{position:40,motor:'1'},{position:40,tolerance:-1},{position:40,tolerance:6}]) {
    assert.throws(()=>validateConfig({type:'test',device_id:'mine',pedestrian_position:option as any}));
  }
  assert.doesNotThrow(()=>validateConfig({type:'test',device_id:'mine',pedestrian_position:{motor:2,position:40,tolerance:0}}));
});
