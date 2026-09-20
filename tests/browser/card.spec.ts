import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => { await page.goto('/demo/'); await expect(page.locator('#main-card .meta-state')).toHaveText('Chiuso'); });

test('loads built bundle, resolves renamed entities, four exact service calls', async ({page}) => {
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  const card=page.locator('#main-card');
  for(const label of ['Apri','Stop','Chiudi','Pedonale']) await card.getByRole('button',{name:label,exact:true}).click();
  const calls=await page.evaluate(()=>window['calls']);
  expect(calls).toEqual(['open','stop','close','pedestrian'].map(a=>({domain:'button',service:'press',data:{entity_id:`button.centralina_cancello_${a}_button`}})));
  expect(errors).toEqual([]);
});
test('FT1 and FT2 together, unknown distinct from clear, asymmetric positions preserved',async({page})=>{
  const card=page.locator('#main-card');
  await page.evaluate(()=>window['applyScenario']('both'));
  await expect(card.locator('.photocell.blocked')).toHaveCount(2);
  await expect(card.locator('.flag')).toHaveText('FT1 e FT2 oscurate');
  await page.evaluate(()=>window['applyScenario']('closed',{ft1:'unknown'}));
  await expect(card.locator('[data-ft="1"]')).toContainText('Non disponibile');
  await expect(card.locator('[data-ft="2"]')).toContainText('Libera');
  await page.evaluate(()=>window['applyScenario']('pedestrian'));
  await expect(card.locator('.leaf-details')).toContainText('40%');
  await expect(card.locator('#left-wing-group')).toHaveAttribute('style',/scaleX\(0.80902\)/);
  await expect(card.locator('#right-wing-group')).toHaveAttribute('style',/scaleX\(1.00000\)/);
});
test('SVG nodes persist for smooth transitions and can swap motor sides',async({page})=>{
  await page.evaluate(()=>window['wing']=window['card'].shadowRoot.querySelector('#left-wing-group'));
  await page.evaluate(()=>window['applyScenario']('opening'));
  await expect(page.locator('#main-card .meta-state')).toHaveText('In apertura');
  expect(await page.evaluate(()=>window['wing']===window['card'].shadowRoot.querySelector('#left-wing-group'))).toBe(true);
  await page.evaluate(()=>{window['setCardConfig']({motor1_side:'right'});window['applyScenario']('pedestrian');});
  await expect(page.locator('#main-card #right-wing-group')).toHaveAttribute('style',/scaleX\(0.80902\)/);
});
test('STOP works during a pending open request and when UART telemetry is offline',async({page})=>{
  await page.evaluate(()=>window['holdOpen']=true);
  const card=page.locator('#main-card');
  await card.getByRole('button',{name:'Apri',exact:true}).click();
  await expect(card.getByRole('button',{name:'Apri',exact:true})).toBeDisabled();
  await card.getByRole('button',{name:'Stop',exact:true}).click();
  expect((await page.evaluate(()=>window['calls'])).length).toBe(2);
  await page.evaluate(()=>{window['releaseOpen']();window['applyScenario']('offline');});
  await expect(card.getByRole('button',{name:'Apri',exact:true})).toBeDisabled();
  await expect(card.getByRole('button',{name:'Stop',exact:true})).toBeEnabled();
  await expect(card.locator('.meta-position')).toHaveText('—');
});
test('service failure is visible and never retried, no optimistic animation',async({page})=>{
  await page.evaluate(()=>window['rejectCalls']=true);
  const card=page.locator('#main-card');
  await card.getByRole('button',{name:'Apri',exact:true}).click();
  await expect(card.getByRole('alert')).toContainText('non riuscito');
  await expect(card.locator('.meta-state')).toHaveText('Chiuso');
  expect((await page.evaluate(()=>window['calls'])).length).toBe(1);
});
test('registry rename refreshes targets without changing firmware or card config',async({page})=>{
  await page.evaluate(()=>window['renameOpen']());
  await expect.poll(()=>page.evaluate(()=>window['registryCalls'])).toBeGreaterThan(3);
  await page.locator('#main-card').getByRole('button',{name:'Apri',exact:true}).click();
  expect((await page.evaluate(()=>window['calls']))[0].data.entity_id).toBe('button.id_rinominato');
});
test('text and graphic modes work with settings disabled',async({page})=>{
  for(const mode of ['text','graphic','hybrid']){
    await page.evaluate(m=>window['setCardConfig']({settings_action:false,ui:{view_mode:m}}),mode);
    await expect(page.locator('#main-card .photocell')).toHaveCount(2);
    await expect(page.locator('#main-card .settings-btn')).toHaveCount(0);
    await expect(page.locator('#main-card .gate-svg')).toHaveCount(mode==='text'?0:1);
  }
});
test('narrow layout and light theme do not overflow',async({page})=>{
  await page.setViewportSize({width:375,height:900});
  await page.getByRole('button',{name:'Tema chiaro'}).click();
  await page.evaluate(()=>window['applyScenario']('offline'));
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  const overflow=await page.locator('#main-card').evaluate(el=>{const root=el.shadowRoot!;return [...root.querySelectorAll('.wrapper,.controls,.photocells')].some(n=>n.scrollWidth>n.clientWidth+1);});
  expect(overflow).toBe(false);
});
