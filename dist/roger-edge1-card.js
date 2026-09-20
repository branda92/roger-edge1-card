/*! Roger EDGE1 Card 1.1.0
MIT License

Copyright (c) 2026 Zoltán Szőke
Copyright (c) 2026 branda92 — adattamento Roger EDGE1

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Attribuzioni

Questa versione adatta grafica, stili e configurazione visuale di:

- **CB19 ESPHome Card**, https://github.com/szokezoltan95/CB19-esphome-card
- Autore: Zoltán Szőke, copyright 2026.
- Licenza MIT, testo integrale nel file `LICENSE`.
- Commit di riferimento: `0e4505aa464b7efa0c71c459b80dbd4bb4f23415`.

Adattamento Roger EDGE1: copyright 2026 branda92.

Le modifiche per Roger EDGE1, le fotocellule, la scoperta delle entità, i test e la documentazione sono distribuiti sotto la stessa licenza MIT. Questo adattamento non è una versione ufficiale del progetto CB19.

Il bundle include le librerie Lit, LitElement, lit-html e @lit/reactive-element, distribuite con licenza BSD-3-Clause; i rispettivi testi integrali sono in `licenses/`. Gli strumenti di compilazione e test non sono inclusi nel bundle eseguito in Home Assistant.

I testi completi delle licenze di distribuzione sono incorporati anche nel bundle `dist/roger-edge1-card.js`, per conservarli nelle installazioni manuali e tramite HACS.

lit-LICENSE
BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

lit-element-LICENSE
BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

lit-html-LICENSE
BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


lit-reactive-element-LICENSE
BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, tt = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, et = Symbol(), dt = /* @__PURE__ */ new WeakMap();
let kt = class {
  constructor(t, i, o) {
    if (this._$cssResult$ = !0, o !== et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (tt && t === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (t = dt.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && dt.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const jt = (e) => new kt(typeof e == "string" ? e : e + "", void 0, et), Dt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((o, s, n) => o + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[n + 1], e[0]);
  return new kt(i, e, et);
}, Bt = (e, t) => {
  if (tt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const o = document.createElement("style"), s = W.litNonce;
    s !== void 0 && o.setAttribute("nonce", s), o.textContent = i.cssText, e.appendChild(o);
  }
}, pt = tt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const o of t.cssRules) i += o.cssText;
  return jt(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Lt, defineProperty: Ft, getOwnPropertyDescriptor: qt, getOwnPropertyNames: Wt, getOwnPropertySymbols: Gt, getPrototypeOf: Vt } = Object, w = globalThis, ht = w.trustedTypes, Zt = ht ? ht.emptyScript : "", Kt = w.reactiveElementPolyfillSupport, T = (e, t) => e, G = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Zt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, it = (e, t) => !Lt(e, t), ut = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let k = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ut) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const o = Symbol(), s = this.getPropertyDescriptor(t, o, i);
      s !== void 0 && Ft(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, o) {
    const { get: s, set: n } = qt(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: s, set(r) {
      const l = s?.call(this);
      n?.call(this, r), this.requestUpdate(t, l, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const i = this.properties, o = [...Wt(i), ...Gt(i)];
      for (const s of o) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [o, s] of i) this.elementProperties.set(o, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const s = this._$Eu(i, o);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const s of o) i.unshift(pt(s));
    } else t !== void 0 && i.push(pt(t));
    return i;
  }
  static _$Eu(t, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Bt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, o) {
    this._$AK(t, o);
  }
  _$ET(t, i) {
    const o = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, o);
    if (s !== void 0 && o.reflect === !0) {
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : G).toAttribute(i, o.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const o = this.constructor, s = o._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = o.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : G;
      this._$Em = s;
      const l = r.fromAttribute(i, n.type);
      this[s] = l ?? this._$Ej?.get(s) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, i, o, s = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (n = this[t]), o ?? (o = r.getPropertyOptions(t)), !((o.hasChanged ?? it)(n, i) || o.useDefault && o.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, o)))) return;
      this.C(t, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: o, reflect: s, wrapped: n }, r) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [s, n] of o) {
        const { wrapped: r } = n, l = this[s];
        r !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, n, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, k[T("elementProperties")] = /* @__PURE__ */ new Map(), k[T("finalized")] = /* @__PURE__ */ new Map(), Kt?.({ ReactiveElement: k }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, _t = (e) => e, V = N.trustedTypes, gt = V ? V.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Pt = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, zt = "?" + x, Yt = `<${zt}>`, C = document, j = () => C.createComment(""), D = (e) => e === null || typeof e != "object" && typeof e != "function", ot = Array.isArray, Jt = (e) => ot(e) || typeof e?.[Symbol.iterator] == "function", J = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ft = /-->/g, mt = />/g, E = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bt = /'/g, vt = /"/g, Mt = /^(?:script|style|textarea|title)$/i, Ot = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), g = Ot(1), Xt = Ot(2), P = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), yt = /* @__PURE__ */ new WeakMap(), S = C.createTreeWalker(C, 129);
function Ut(e, t) {
  if (!ot(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gt !== void 0 ? gt.createHTML(t) : t;
}
const Qt = (e, t) => {
  const i = e.length - 1, o = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = R;
  for (let l = 0; l < i; l++) {
    const a = e[l];
    let _, h, d = -1, m = 0;
    for (; m < a.length && (r.lastIndex = m, h = r.exec(a), h !== null); ) m = r.lastIndex, r === R ? h[1] === "!--" ? r = ft : h[1] !== void 0 ? r = mt : h[2] !== void 0 ? (Mt.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = E) : h[3] !== void 0 && (r = E) : r === E ? h[0] === ">" ? (r = s ?? R, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, _ = h[1], r = h[3] === void 0 ? E : h[3] === '"' ? vt : bt) : r === vt || r === bt ? r = E : r === ft || r === mt ? r = R : (r = E, s = void 0);
    const f = r === E && e[l + 1].startsWith("/>") ? " " : "";
    n += r === R ? a + Yt : d >= 0 ? (o.push(_), a.slice(0, d) + Pt + a.slice(d) + x + f) : a + x + (d === -2 ? l : f);
  }
  return [Ut(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class B {
  constructor({ strings: t, _$litType$: i }, o) {
    let s;
    this.parts = [];
    let n = 0, r = 0;
    const l = t.length - 1, a = this.parts, [_, h] = Qt(t, i);
    if (this.el = B.createElement(_, o), S.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = S.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Pt)) {
          const m = h[r++], f = s.getAttribute(d).split(x), b = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: n, name: b[2], strings: f, ctor: b[1] === "." ? ee : b[1] === "?" ? ie : b[1] === "@" ? oe : Z }), s.removeAttribute(d);
        } else d.startsWith(x) && (a.push({ type: 6, index: n }), s.removeAttribute(d));
        if (Mt.test(s.tagName)) {
          const d = s.textContent.split(x), m = d.length - 1;
          if (m > 0) {
            s.textContent = V ? V.emptyScript : "";
            for (let f = 0; f < m; f++) s.append(d[f], j()), S.nextNode(), a.push({ type: 2, index: ++n });
            s.append(d[m], j());
          }
        }
      } else if (s.nodeType === 8) if (s.data === zt) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(x, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += x.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const o = C.createElement("template");
    return o.innerHTML = t, o;
  }
}
function z(e, t, i = e, o) {
  if (t === P) return t;
  let s = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const n = D(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(e), s._$AT(e, i, o)), o !== void 0 ? (i._$Co ?? (i._$Co = []))[o] = s : i._$Cl = s), s !== void 0 && (t = z(e, s._$AS(e, t.values), s, o)), t;
}
class te {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: o } = this._$AD, s = (t?.creationScope ?? C).importNode(i, !0);
    S.currentNode = s;
    let n = S.nextNode(), r = 0, l = 0, a = o[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let _;
        a.type === 2 ? _ = new L(n, n.nextSibling, this, t) : a.type === 1 ? _ = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (_ = new se(n, this, t)), this._$AV.push(_), a = o[++l];
      }
      r !== a?.index && (n = S.nextNode(), r++);
    }
    return S.currentNode = C, s;
  }
  p(t) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, i), i += o.strings.length - 2) : o._$AI(t[i])), i++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, o, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = o, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = z(this, t, i), D(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== P && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Jt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && D(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: o } = t, s = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = B.createElement(Ut(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const n = new te(s, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = yt.get(t.strings);
    return i === void 0 && yt.set(t.strings, i = new B(t)), i;
  }
  k(t) {
    ot(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, s = 0;
    for (const n of t) s === i.length ? i.push(o = new L(this.O(j()), this.O(j()), this, this.options)) : o = i[s], o._$AI(n), s++;
    s < i.length && (this._$AR(o && o._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const o = _t(t).nextSibling;
      _t(t).remove(), t = o;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Z {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, o, s, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = p;
  }
  _$AI(t, i = this, o, s) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = z(this, t, i, 0), r = !D(t) || t !== this._$AH && t !== P, r && (this._$AH = t);
    else {
      const l = t;
      let a, _;
      for (t = n[0], a = 0; a < n.length - 1; a++) _ = z(this, l[o + a], i, a), _ === P && (_ = this._$AH[a]), r || (r = !D(_) || _ !== this._$AH[a]), _ === p ? t = p : t !== p && (t += (_ ?? "") + n[a + 1]), this._$AH[a] = _;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ee extends Z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class ie extends Z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class oe extends Z {
  constructor(t, i, o, s, n) {
    super(t, i, o, s, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = z(this, t, i, 0) ?? p) === P) return;
    const o = this._$AH, s = t === p && o !== p || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, n = t !== p && (o === p || s);
    s && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class se {
  constructor(t, i, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    z(this, t);
  }
}
const ne = N.litHtmlPolyfillSupport;
ne?.(B, L), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const re = (e, t, i) => {
  const o = i?.renderBefore ?? t;
  let s = o._$litPart$;
  if (s === void 0) {
    const n = i?.renderBefore ?? null;
    o._$litPart$ = s = new L(t.insertBefore(j(), n), n, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis;
class I extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const t = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = re(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return P;
  }
}
I._$litElement$ = !0, I.finalized = !0, H.litElementHydrateSupport?.({ LitElement: I });
const ae = H.litElementPolyfillSupport;
ae?.({ LitElement: I });
(H.litElementVersions ?? (H.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: it }, de = (e = ce, t, i) => {
  const { kind: o, metadata: s } = i;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), o === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), o === "accessor") {
    const { name: r } = i;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(r, a, e, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, e, l), l;
    } };
  }
  if (o === "setter") {
    const { name: r } = i;
    return function(l) {
      const a = this[r];
      t.call(this, l), this.requestUpdate(r, a, e, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function Rt(e) {
  return (t, i) => typeof i == "object" ? de(e, t, i) : ((o, s, n) => {
    const r = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, o), r ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(e) {
  return Rt({ ...e, state: !0, attribute: !1 });
}
const pe = Dt`
  :host {
    display: block;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ha-card {
    display: block;
    overflow: hidden;
    border-radius: 16px;
  }

  .wrapper {
    position: relative;
    display: grid;
    gap: var(--roger-content-gap, 6px);
    padding: var(--roger-card-padding, 8px 10px 8px);
    width: 100%;
    isolation: isolate;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: var(--roger-header-bottom, 4px);
  }

  .header-main {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .header-title {
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 16px;
    font-size: 0.76rem;
    line-height: 1;
    color: var(--secondary-text-color);
    flex-wrap: wrap;
  }

  .visual-box {
    position: relative;
    width: 100%;
    min-height: 88px;
    padding: var(--roger-visual-padding, 10px 14px 6px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .gate-svg-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gate-svg {
    display: block;
    width: 100%;
    max-width: none;
    height: auto;
    max-height: 96px;
  }

  .overlay-badges {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay-badges-inner {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 80%;
  }

  .flag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 999px;
    font-size: 0.72rem;
    line-height: 1;
    font-weight: 600;
    white-space: nowrap;
    backdrop-filter: blur(4px);
  }

  .flag.warn {
    background: color-mix(
      in srgb,
      var(--warning-color, #ff9800) 22%,
      var(--card-background-color)
    );
    color: var(--warning-color, #ff9800);
  }

  .flag.error {
    background: color-mix(
      in srgb,
      var(--error-color) 22%,
      var(--card-background-color)
    );
    color: var(--error-color);
  }

  .settings-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 5;
    appearance: none;
    border: none;
    background: none;
    color: var(--secondary-text-color);
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.12s ease, transform 0.12s ease;
  }

  .settings-btn:hover {
    color: var(--primary-text-color);
    transform: scale(1.08);
  }

  .settings-btn ha-icon {
    width: 20px;
    height: 20px;
    display: block;
  }

  .meta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 18px;
    font-size: 0.82rem;
    line-height: 1;
  }

  .meta-state {
    font-weight: 600;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .meta-separator {
    color: var(--secondary-text-color);
  }

  .meta-position {
    color: var(--secondary-text-color);
    white-space: nowrap;
  }

  .text-panel {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .text-panel-main {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    color: var(--primary-text-color);
  }

  .text-panel-sub {
    font-size: 0.82rem;
    color: var(--secondary-text-color);
    line-height: 1.35;
  }

  .controls-wrap {
    margin-top: var(--roger-controls-top, 2px);
  }

  .controls {
    display: grid;
    gap: 8px;
  }

.icon-btn {
  position: relative;
  appearance: none;
  border: none;
  border-radius: 10px;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: var(--roger-button-default-bg, var(--secondary-background-color));
  color: var(--roger-icon-default-color, var(--primary-text-color));
  transition:
    transform 0.08s ease,
    background 0.12s ease,
    filter 0.12s ease,
    color 0.12s ease,
    box-shadow 0.12s ease;
}

  .icon-btn:hover {
    filter: brightness(1.06);
  }

  .icon-btn:active {
    filter: brightness(0.94);
    transform: scale(0.97);
  }

  .icon-btn ha-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    transform: translate(
      calc(-50% + var(--roger-icon-x, 0px)),
      calc(-50% + var(--roger-icon-y, 0px))
    );
  }

  .icon-btn {
    color: var(--roger-icon-default-color, var(--primary-text-color));
  }

.icon-btn.is-available.tint-enabled {
  background: var(--roger-button-available-bg, var(--secondary-background-color));
  color: var(--roger-icon-available-color, var(--roger-icon-default-color, var(--primary-text-color)));
}

.icon-btn.is-active {
  background: var(--roger-button-active-bg, var(--secondary-background-color));
  color: var(--roger-icon-active-color, var(--roger-icon-default-color, var(--primary-text-color)));
}

.icon-btn.is-active.effect-pulse {
  animation: button-pulse 1.25s ease-in-out infinite;
}

.icon-btn.is-active.effect-blink {
  animation: button-blink 1s steps(2, start) infinite;
}

.icon-btn.is-active.effect-glow {
  box-shadow: 0 0 0 1px
      color-mix(in srgb, var(--roger-active-color, #3b82f6) 35%, transparent),
    0 0 12px
      color-mix(in srgb, var(--roger-active-color, #3b82f6) 28%, transparent);
}

.icon-btn.is-available:not(.is-active) {
  animation: none !important;
  box-shadow: none;
}

  @keyframes button-pulse {
    0% {
      filter: brightness(0.95);
    }
    50% {
      filter: brightness(1.18);
    }
    100% {
      filter: brightness(0.95);
    }
  }

  @keyframes button-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.55;
    }
    100% {
      opacity: 1;
    }
  }

  .debug-box {
    background: var(--secondary-background-color);
    border-radius: 12px;
    padding: 10px 12px;
    font-size: 0.78rem;
    line-height: 1.45;
    word-break: break-word;
    margin-top: 2px;
  }

  .header-row .settings-btn { position: static; flex-shrink: 0; }
  .settings-btn { width: 40px; height: 40px; border-radius: 10px; }
  .text-panel { position: relative; padding-right: 42px; }
  .gate-svg { max-height: 116px; }
  #left-wing-group, #right-wing-group { transition: transform 500ms linear, opacity 200ms; }
  .meta-row { flex-wrap: wrap; line-height: 1.4; gap: 7px; }
  .meta-state { white-space: normal; }
  .connection-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .connection-dot.connected { background: var(--success-color, #42b883); }
  .connection-dot.disconnected { background: var(--secondary-text-color); }
  .leaf-details { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 8px 0; }
  .leaf-details > div { display: grid; grid-template-columns: 1fr auto; gap: 4px; font-size: 12px; min-width: 0; }
  .leaf-details span, .leaf-details small { color: var(--secondary-text-color); }
  .leaf-details strong { font-size: 13px; }
  .leaf-details small { grid-column: 1 / -1; font-size: 11px; line-height: 1.4; }
  .photocells { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px; margin: 2px 0 8px; }
  .photocell { display: grid; grid-template-columns: 16px minmax(0,1fr) 16px; align-items: center; gap: 5px; min-width: 0; padding: 8px 5px; border-radius: 9px; background: var(--secondary-background-color); font-size: 11px; text-align: center; }
  .photocell-icon { display: block; width: 16px; height: 16px; flex-shrink: 0; }
  .photocell-text { grid-column: 2; justify-self: center; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 2px 4px; min-width: 0; max-width: 100%; line-height: 1.4; }
  .photocell strong { font-weight: 500; }
  .photocell.clear { color: var(--success-color, #42b883); background: color-mix(in srgb, var(--success-color, #42b883) 9%, var(--card-background-color)); }
  .photocell.blocked { color: var(--warning-color, #ff9800); background: color-mix(in srgb, var(--warning-color, #ff9800) 14%, var(--card-background-color)); }
  .photocell.unknown { color: var(--secondary-text-color); }
  .icon-btn { min-height: 54px; flex-direction: column; gap: 5px; padding: 9px 2px; font: inherit; font-size: 11px; }
  .icon-btn ha-icon { position: static; --mdc-icon-size: 21px; width: 21px; height: 21px; transform: translate(var(--roger-icon-x, 0px), var(--roger-icon-y, 0px)); }
  .icon-btn:disabled { opacity: .35; cursor: not-allowed; animation: none; filter: none; }
  button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); outline-offset: 2px; }
  .notice { font-size: 12px; line-height: 1.5; color: var(--secondary-text-color); overflow-wrap: anywhere; padding-top: 6px; }
  .notice.error { color: var(--error-color, #ef5350); }
  .retry { font: inherit; color: var(--primary-color); border: 0; background: none; cursor: pointer; min-height: 36px; }
  details summary { cursor: pointer; padding: 4px 0; }
  @media (prefers-reduced-motion: reduce) {
    #left-wing-group, #right-wing-group, .icon-btn { transition: none; animation: none !important; }
  }
`, Tt = {
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
  pedestrian_button: { domain: "button", names: ["Cancello Pedonale", "Pedonale"] }
}, $t = (e) => e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
function he(e) {
  if (!e || !e.device_id && !Object.keys(e.entities ?? {}).length)
    throw new Error("Indica device_id oppure la mappa entities della centralina.");
  if (e.device_id && !/^[a-zA-Z0-9_-]+$/.test(e.device_id)) throw new Error("device_id non valido.");
  if (e.motor1_side && !["left", "right"].includes(e.motor1_side)) throw new Error("motor1_side: usa left o right.");
  if (e.ui?.view_mode && !["graphic", "text", "hybrid"].includes(e.ui.view_mode)) throw new Error("ui.view_mode: usa graphic, text o hybrid.");
  const t = e.pedestrian_position;
  if (t !== void 0) {
    if (!t || typeof t != "object" || Array.isArray(t)) throw new Error("pedestrian_position: indica position e, se necessario, motor e tolerance.");
    if (t.motor !== void 0 && ![1, 2].includes(t.motor)) throw new Error("pedestrian_position.motor: usa 1 o 2.");
    if (!Number.isFinite(t.position) || t.position <= 0 || t.position >= 100) throw new Error("pedestrian_position.position: indica una percentuale maggiore di 0 e minore di 100.");
    if (t.tolerance !== void 0 && (!Number.isFinite(t.tolerance) || t.tolerance < 0 || t.tolerance > 5)) throw new Error("pedestrian_position.tolerance: indica un valore tra 0 e 5 punti percentuali.");
  }
  for (const [i, o] of Object.entries(e.entities ?? {})) {
    const s = Tt[i];
    if (!s || typeof o != "string" || !new RegExp(`^${s.domain}\\.[a-z0-9_]+$`).test(o))
      throw new Error(`Entità non valida per ${i}: ${o}`);
  }
  if (e.settings_path && (!e.settings_path.startsWith("/") || e.settings_path.startsWith("//")))
    throw new Error("settings_path deve essere un percorso locale di Home Assistant.");
}
function ue(e, t) {
  const i = /* @__PURE__ */ new Map();
  for (const n of t) {
    if (!e.device_id || n.device_id !== e.device_id || n.disabled_by) continue;
    const r = n.entity_id.split(".")[0], l = [n.original_name, n.name, n.entity_id.split(".")[1]].map((h) => $t(h ?? "")), a = Object.entries(Tt).filter(([, h]) => h.domain === r).map(([h, d]) => ({ key: h, score: Math.max(0, ...d.names.map((m) => {
      const f = $t(m);
      return Math.max(0, ...l.map((b, $) => b === f || b.endsWith(`_${f}`) ? f.length + ($ === 0 ? 1e3 : $ === 1 ? 500 : 0) : 0));
    })) })).filter((h) => h.score > 0).sort((h, d) => d.score - h.score);
    if (!a.length || a[0].score === a[1]?.score) continue;
    const _ = a[0].key;
    i.set(_, [...i.get(_) ?? [], n.entity_id]);
  }
  const o = {}, s = [];
  for (const [n, r] of i)
    r.length === 1 ? o[n] = r[0] : e.entities?.[n] || s.push(n);
  return { entities: { ...o, ...e.entities }, ambiguous: s };
}
const Q = [
  "Sconosciuto",
  "Apertura",
  "Stop durante apertura",
  "Chiusura",
  "Stop durante chiusura",
  "Aperta",
  "Chiusa",
  "Sbloccata",
  "Posizione sconosciuta",
  "Apertura (pos. sconosciuta)",
  "Stop apertura (pos. sconosciuta)",
  "Chiusura (pos. sconosciuta)",
  "Stop chiusura / aperta (pos. sconosciuta)",
  "Chiusa (pos. sconosciuta)",
  "Sbloccata (pos. sconosciuta)",
  "Stato non documentato (15)"
], K = (e, t) => t ? e?.states[t]?.state ?? "" : "";
function st(e, t) {
  const i = K(e, t).trim();
  if (!i || ["unknown", "unavailable"].includes(i)) return null;
  const o = Number(i);
  return Number.isFinite(o) ? o : null;
}
function X(e, t) {
  const i = st(e, t);
  return i !== null && i >= 0 && i <= 100 ? i : null;
}
function xt(e, t) {
  const i = K(e, t);
  return i === "on" ? !0 : i === "off" ? !1 : null;
}
function wt(e, t, i) {
  const o = st(e, t);
  if (o !== null && Number.isInteger(o) && o >= 0 && o < 16) return o;
  const s = Q.indexOf(K(e, i));
  return s < 0 ? null : s;
}
function At(e, t, i) {
  const o = !!e && e.connected !== !1, s = o ? xt(e, t.online) : !1, n = wt(e, t.state_code_1, t.state_1), r = wt(e, t.state_code_2, t.state_2), l = [n, r], a = s === !0 && l.some((u) => u === 1 || u === 9), _ = s === !0 && l.some((u) => u === 3 || u === 11), h = a || _, d = s === !0 && !h && l.some((u) => u === 2 || u === 4 || u === 10 || u === 12), m = s === !0 && l.every((u) => u === 6 || u === 13), f = s === !0 && l.every((u) => u === 5), b = s === !0 ? X(e, t.position_1) : null, $ = s === !0 ? X(e, t.position_2) : null, nt = s === !0 ? X(e, t.position) ?? (b !== null && $ !== null ? (b + $) / 2 : null) : null, F = i?.motor === 2, O = F ? $ : b, rt = F ? b : $, at = F ? r : n, Nt = F ? n : r, lt = i?.tolerance ?? 1, Y = !!i && s === !0 && !h && at !== null && [2, 4, 5].includes(at) && Nt === 6 && O !== null && rt !== null && O > 0 && O < 100 && Math.abs(O - i.position) <= lt && rt <= lt;
  let v = "Stato non disponibile";
  s === !1 ? v = "Centralina non collegata" : s === !0 && (a && _ ? v = "Movimento ante" : a ? v = "In apertura" : _ ? v = "In chiusura" : Y ? v = "Posizione pedonale" : d ? v = "Fermo" : m ? v = "Chiuso" : f ? v = "Aperto" : l.some((u) => u === 7 || u === 14) ? v = "Anta sbloccata" : l.every((u) => u === 5 || u === 6) ? v = "Apertura parziale" : l.some((u) => u !== null && u >= 8) && (v = "Posizione sconosciuta"));
  const U = o ? st(e, t.inputs_raw) : null, Ht = U !== null && Number.isInteger(U) && U >= 0 && U <= 65535, ct = (u, It) => o ? u ? xt(e, u) : Ht ? (U & It) !== 0 : null : null;
  return {
    position: nt,
    displayPosition: Y ? O : nt,
    atPedestrianPosition: Y,
    motor1Position: b,
    motor2Position: $,
    state1: s === !0 && n !== null ? Q[n] : "Non disponibile",
    state2: s === !0 && r !== null ? Q[r] : "Non disponibile",
    label: v,
    opening: a,
    closing: _,
    moving: h,
    fullyClosed: m,
    fullyOpened: f,
    stopped: d,
    online: s,
    ft1: ct(t.ft1, 16),
    ft2: ct(t.ft2, 32),
    lastResult: K(e, t.last_result)
  };
}
function Et(e, t, i) {
  const o = (s) => !!e && e.connected !== !1 && !!s && !!e.states[s] && e.states[s].state !== "unavailable";
  return {
    open: i.online === !0 && o(t.open_button),
    close: i.online === !0 && o(t.close_button),
    pedestrian: i.online === !0 && o(t.pedestrian_button),
    // UART status may be stale; STOP remains available while ESPHome is reachable.
    stop: o(t.stop_button)
  };
}
function _e(e, t) {
  return Xt`
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20517.43 6772.07"
  class="gate-svg"
  aria-hidden="true"
>
  <defs>
    <style>
      .str0 { stroke:#2B2A29; stroke-width:99.32; stroke-miterlimit:22.9256; }
      .str1 { stroke:#2B2A29; stroke-width:148.99; stroke-miterlimit:22.9256; }
      .str2 { stroke:#2B2A29; stroke-width:7.57; stroke-miterlimit:22.9256; }

      .fil0 { fill:#9D9E9E; }
      .fil1 { fill:#C5C6C6; }
      .fil2 { fill:#B2B3B3; }
      .fil3 { fill:#2B2A29; }
    </style>
  </defs>

  <g id="gate-root">
    <g id="left-post-group">
      <rect id="left-post-body"
            class="fil1 str1"
            x="421"
            y="466.29"
            width="1623.1"
            height="6231.29"/>
      <rect id="left-post-cap"
            class="fil2 str1"
            x="74.49"
            y="74.49"
            width="2316.12"
            height="391.8"
            rx="99.32"
            ry="67.09"/>
    </g>

    <g id="right-post-group">
      <rect id="right-post-body"
            class="fil1 str1"
            x="18473.32"
            y="466.29"
            width="1623.1"
            height="6231.29"/>
      <rect id="right-post-cap"
            class="fil2 str1"
            x="18126.81"
            y="74.49"
            width="2316.12"
            height="391.8"
            rx="99.32"
            ry="67.09"/>
    </g>

    <g id="left-hinges-group">
      <rect id="left-hinge-top"
            class="fil3 str2"
            x="2012.77"
            y="1560.41"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
      <rect id="left-hinge-bottom"
            class="fil3 str2"
            x="2012.77"
            y="5982.87"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
    </g>

    <g id="right-hinges-group">
      <rect id="right-hinge-top"
            class="fil3 str2"
            x="18025.94"
            y="1560.41"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
      <rect id="right-hinge-bottom"
            class="fil3 str2"
            x="18025.94"
            y="5982.87"
            width="478.72"
            height="249.55"
            rx="117.57"
            ry="72.64"/>
    </g>

    <g id="left-wing-group" data-pivot-x="2252.13" data-pivot-y="3896.42" style=${e}>
      <path id="left-wing"
            class="fil0 str0"
            d="M2291.97 6394.06l7908.31 0 0 -6158.64c-1504.09,11.92 -2611.12,191.81 -4376.13,633.47 -1765.02,441.65 -3532.17,499.72 -3532.17,499.72l0 5025.46zm729.68 -4521.93l6416.05 0c59.47,0 108.13,32.88 108.13,73.05l0 199.92c0,40.18 -48.66,73.04 -108.13,73.04l-6416.05 0c-59.47,0 -108.13,-32.87 -108.13,-73.04l0 -199.92c0,-40.18 48.66,-73.05 108.13,-73.05zm0 2807.1l6416.05 0c59.47,0 108.13,32.88 108.13,73.04l0 199.93c0,40.18 -48.66,73.04 -108.13,73.04l-6416.05 0c-59.47,0 -108.13,-32.87 -108.13,-73.04l0 -199.93c0,-40.17 48.66,-73.04 108.13,-73.04zm0 -935.7l6416.05 0c59.47,0 108.13,32.87 108.13,73.04l0 199.92c0,40.18 -48.66,73.05 -108.13,73.05l-6416.05 0c-59.47,0 -108.13,-32.88 -108.13,-73.05l0 -199.92c0,-40.18 48.66,-73.04 108.13,-73.04zm0 -935.71l6416.05 0c59.47,0 108.13,32.88 108.13,73.05l0 199.92c0,40.18 -48.66,73.04 -108.13,73.04l-6416.05 0c-59.47,0 -108.13,-32.87 -108.13,-73.04l0 -199.92c0,-40.18 48.66,-73.05 108.13,-73.05zm0 2807.11l6416.05 0c59.47,0 108.13,32.87 108.13,73.04l0 199.92c0,40.18 -48.66,73.05 -108.13,73.05l-6416.05 0c-59.47,0 -108.13,-32.88 -108.13,-73.05l0 -199.92c0,-40.18 48.66,-73.04 108.13,-73.04z"/>
    </g>

    <g id="right-wing-group" data-pivot-x="18265.30" data-pivot-y="3896.42" style=${t}>
      <path id="right-wing"
            class="fil0 str0"
            d="M18225.46 6394.06l-7908.31 0 0 -6158.64c1504.09,11.92 2611.12,191.81 4376.13,633.47 1765.02,441.65 3532.17,499.72 3532.17,499.72l0 5025.46zm-729.68 -4521.93l-6416.05 0c-59.47,0 -108.13,32.88 -108.13,73.05l0 199.92c0,40.18 48.66,73.04 108.13,73.04l6416.05 0c59.47,0 108.13,-32.87 108.13,-73.04l0 -199.92c0,-40.18 -48.66,-73.05 -108.13,-73.05zm0 2807.1l-6416.05 0c-59.47,0 -108.13,32.88 -108.13,73.04l0 199.93c0,40.18 48.66,73.04 108.13,73.04l6416.05 0c59.47,0 108.13,-32.87 108.13,-73.04l0 -199.93c0,-40.17 -48.66,-73.04 -108.13,-73.04zm0 -935.7l-6416.05 0c-59.47,0 -108.13,32.87 -108.13,73.04l0 199.92c0,40.18 48.66,73.05 108.13,73.05l6416.05 0c59.47,0 108.13,-32.88 108.13,-73.05l0 -199.92c0,-40.18 -48.66,-73.04 -108.13,-73.04zm0 -935.71l-6416.05 0c-59.47,0 -108.13,32.88 -108.13,73.05l0 199.92c0,40.18 48.66,73.04 108.13,73.04l6416.05 0c59.47,0 108.13,-32.87 108.13,-73.04l0 -199.92c0,-40.18 -48.66,-73.05 -108.13,-73.05zm0 2807.11l-6416.05 0c-59.47,0 -108.13,32.87 -108.13,73.04l0 199.92c0,40.18 48.66,73.05 108.13,73.05l6416.05 0c59.47,0 108.13,-32.88 108.13,-73.05l0 -199.92c0,-40.18 -48.66,-73.04 -108.13,-73.04z"/>
    </g>
  </g>
</svg>
`;
}
function St(e, t) {
  const i = e === null ? 1 : Math.max(0.035, Math.cos(Math.max(0, Math.min(100, e)) * Math.PI / 200));
  return `transform-box:fill-box;transform-origin:${t} center;transform:scaleX(${i.toFixed(5)});opacity:${e === null ? 0.18 : 1}`;
}
function ge(e, t) {
  const i = t === "left" ? e.motor1Position : e.motor2Position, o = t === "right" ? e.motor1Position : e.motor2Position, s = _e(St(i, "left"), St(o, "right"));
  return g`<div class="gate-svg-wrap" role="img" aria-label=${`${e.label}. Anta 1: ${e.motor1Position ?? "sconosciuta"}. Anta 2: ${e.motor2Position ?? "sconosciuta"}.`}>${s}</div>`;
}
const c = {
  view_mode: "hybrid",
  header: {
    enabled: !0,
    title: "Centralina Cancello",
    show_state: !1,
    show_position: !1,
    settings_button_position: "header"
  },
  settings_button: {
    enabled: !0
  },
  controls: {
    enabled: !0,
    show_open: !0,
    show_stop: !0,
    show_close: !0,
    show_pedestrian: "auto",
    available_action_tint: !0
  },
  icons: {
    open: "mdi:arrow-expand-horizontal",
    stop: "mdi:stop",
    close: "mdi:arrow-collapse-horizontal",
    pedestrian: "mdi:walk"
  },
  icon_tune: {
    x: 0,
    y: 0,
    open_x: 0,
    open_y: 0,
    stop_x: 0,
    stop_y: 0,
    close_x: 0,
    close_y: 0,
    pedestrian_x: 0,
    pedestrian_y: 0
  },
  colors: {
    button_default: {
      open: "var(--secondary-background-color)",
      stop: "var(--secondary-background-color)",
      close: "var(--secondary-background-color)",
      pedestrian: "var(--secondary-background-color)"
    },
    button_active: {
      open: "color-mix(in srgb, #22c55e 18%, var(--secondary-background-color))",
      stop: "color-mix(in srgb, #ef4444 18%, var(--secondary-background-color))",
      close: "color-mix(in srgb, #f59e0b 18%, var(--secondary-background-color))",
      pedestrian: "color-mix(in srgb, #3b82f6 18%, var(--secondary-background-color))"
    },
    button_available: {
      open: "color-mix(in srgb, #16a34a 12%, var(--secondary-background-color))",
      stop: "color-mix(in srgb, #dc2626 12%, var(--secondary-background-color))",
      close: "color-mix(in srgb, #d97706 12%, var(--secondary-background-color))",
      pedestrian: "color-mix(in srgb, #2563eb 12%, var(--secondary-background-color))"
    },
    icon_default: {
      open: "var(--primary-text-color)",
      stop: "var(--primary-text-color)",
      close: "var(--primary-text-color)",
      pedestrian: "var(--primary-text-color)"
    },
    icon_active: {
      open: "var(--primary-text-color)",
      stop: "var(--primary-text-color)",
      close: "var(--primary-text-color)",
      pedestrian: "var(--primary-text-color)"
    },
    icon_available: {
      open: "var(--primary-text-color)",
      stop: "var(--primary-text-color)",
      close: "var(--primary-text-color)",
      pedestrian: "var(--primary-text-color)"
    }
  },
  effects: {
    active_action: "pulse"
  },
  padding: {
    card: "16px",
    visual: "10px 14px 6px",
    controls_top: "2px",
    header_bottom: "4px",
    content_gap: "6px"
  }
};
function Ct(e) {
  const t = e.ui ?? {};
  return {
    view_mode: t.view_mode ?? c.view_mode,
    header: {
      enabled: t.header?.enabled ?? c.header.enabled,
      title: t.header?.title ?? c.header.title,
      show_state: t.header?.show_state ?? c.header.show_state,
      show_position: t.header?.show_position ?? c.header.show_position,
      settings_button_position: t.header?.settings_button_position ?? c.header.settings_button_position
    },
    settings_button: {
      enabled: t.settings_button?.enabled ?? c.settings_button.enabled
    },
    controls: {
      enabled: t.controls?.enabled ?? c.controls.enabled,
      show_open: t.controls?.show_open ?? c.controls.show_open,
      show_stop: t.controls?.show_stop ?? c.controls.show_stop,
      show_close: t.controls?.show_close ?? c.controls.show_close,
      show_pedestrian: t.controls?.show_pedestrian ?? c.controls.show_pedestrian,
      available_action_tint: t.controls?.available_action_tint ?? c.controls.available_action_tint
    },
    icons: {
      open: t.icons?.open ?? c.icons.open,
      stop: t.icons?.stop ?? c.icons.stop,
      close: t.icons?.close ?? c.icons.close,
      pedestrian: t.icons?.pedestrian ?? c.icons.pedestrian
    },
    icon_tune: {
      x: t.icon_tune?.x ?? c.icon_tune.x,
      y: t.icon_tune?.y ?? c.icon_tune.y,
      open_x: t.icon_tune?.open_x ?? c.icon_tune.open_x,
      open_y: t.icon_tune?.open_y ?? c.icon_tune.open_y,
      stop_x: t.icon_tune?.stop_x ?? c.icon_tune.stop_x,
      stop_y: t.icon_tune?.stop_y ?? c.icon_tune.stop_y,
      close_x: t.icon_tune?.close_x ?? c.icon_tune.close_x,
      close_y: t.icon_tune?.close_y ?? c.icon_tune.close_y,
      pedestrian_x: t.icon_tune?.pedestrian_x ?? c.icon_tune.pedestrian_x,
      pedestrian_y: t.icon_tune?.pedestrian_y ?? c.icon_tune.pedestrian_y
    },
    colors: {
      button_default: {
        ...c.colors.button_default,
        ...t.colors?.button_default ?? {}
      },
      button_active: {
        ...c.colors.button_active,
        ...t.colors?.button_active ?? {}
      },
      button_available: {
        ...c.colors.button_available,
        ...t.colors?.button_available ?? {}
      },
      icon_default: {
        ...c.colors.icon_default,
        ...t.colors?.icon_default ?? {}
      },
      icon_active: {
        ...c.colors.icon_active,
        ...t.colors?.icon_active ?? {}
      },
      icon_available: {
        ...c.colors.icon_available,
        ...t.colors?.icon_available ?? {}
      }
    },
    effects: {
      active_action: t.effects?.active_action ?? c.effects.active_action
    },
    padding: {
      card: t.padding?.card ?? c.padding.card,
      visual: t.padding?.visual ?? c.padding.visual,
      controls_top: t.padding?.controls_top ?? c.padding.controls_top,
      header_bottom: t.padding?.header_bottom ?? c.padding.header_bottom,
      content_gap: t.padding?.content_gap ?? c.padding.content_gap
    }
  };
}
var fe = Object.defineProperty, me = Object.getOwnPropertyDescriptor, A = (e, t, i, o) => {
  for (var s = o > 1 ? void 0 : o ? me(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (s = (o ? r(t, i, s) : r(s)) || s);
  return o && s && fe(t, i, s), s;
};
const be = { open: "open_button", stop: "stop_button", close: "close_button", pedestrian: "pedestrian_button" }, q = { open: "Apri", stop: "Stop", close: "Chiudi", pedestrian: "Pedonale" };
let y = class extends I {
  constructor() {
    super(...arguments), this._entities = {}, this._message = "", this._discoveryMessage = "", this._loading = !1, this._pending = /* @__PURE__ */ new Set(), this._ui = Ct({}), this._generation = 0, this._loadRequested = !0, this._subscribing = !1;
  }
  setConfig(e) {
    he(e), this._generation++, this._config = { motor1_side: "left", settings_action: "device_page", ...e }, this._ui = Ct(this._config), this._entities = { ...e.entities }, this._discoveryMessage = "", this._message = "", this._loadRequested = !0, this._loading = !1;
  }
  getCardSize() {
    return this._ui.view_mode === "text" ? 4 : 6;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  static getStubConfig() {
    return { device_id: "", motor1_side: "left" };
  }
  connectedCallback() {
    super.connectedCallback(), this._loadRequested = !0, this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._generation++, this._loading = !1, this._unsubscribe?.(), this._unsubscribe = void 0;
  }
  updated(e) {
    if (!this.isConnected || !this.hass || !this._config?.device_id) return;
    const t = e.get("hass");
    t && (t.connection !== this.hass.connection || t.connected === !1 && this.hass.connected !== !1) && (this._unsubscribe?.(), this._unsubscribe = void 0, this._loadRequested = !0), this.hass.connected !== !1 && (this._loadRequested && !this._loading && this._loadEntities(), !this._unsubscribe && !this._subscribing && this.hass.connection && this._subscribeRegistry());
  }
  async _subscribeRegistry() {
    const e = this.hass?.connection;
    if (e) {
      this._subscribing = !0;
      try {
        const t = await e.subscribeEvents(() => {
          this._loadRequested = !0, this.requestUpdate();
        }, "entity_registry_updated");
        !this.isConnected || e !== this.hass?.connection ? t() : this._unsubscribe = t;
      } catch {
      } finally {
        this._subscribing = !1;
      }
    }
  }
  async _loadEntities() {
    if (!this.hass || !this._config) return;
    const e = this._generation, t = this._config;
    this._loadRequested = !1, this._loading = !0;
    try {
      const i = await this.hass.callWS({ type: "config/entity_registry/list" });
      if (e !== this._generation) return;
      const o = ue(t, i);
      this._entities = o.entities, this._discoveryMessage = o.ambiguous.length ? `Entità ambigue: ${o.ambiguous.join(", ")}. Indicale nella mappa entities.` : "";
    } catch {
      e === this._generation && (this._discoveryMessage = "Impossibile leggere le entità. Riprova oppure configura entities nel YAML della card.");
    } finally {
      e === this._generation && (this._loading = !1);
    }
  }
  async _press(e) {
    const t = this.hass, i = At(t, this._entities, this._config?.pedestrian_position);
    if (!t || this._pending.has(e) || !Et(t, this._entities, i)[e]) return;
    const o = this._entities[be[e]];
    if (o) {
      this._message = "", this._pending = /* @__PURE__ */ new Set([...this._pending, e]);
      try {
        await t.callService("button", "press", { entity_id: o });
      } catch {
        this._message = `Invio di «${q[e]}» non riuscito. Controlla la connessione.`;
      } finally {
        const s = new Set(this._pending);
        s.delete(e), this._pending = s;
      }
    }
  }
  _openSettings() {
    if (!this._config || this._config.settings_action === !1) return;
    if (this._config.settings_action === "more_info") {
      const t = this._config.settings_entity || this._entities.cover || this._entities.parameter_80;
      t && this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: t } }));
      return;
    }
    const e = this._config.settings_path || (this._config.device_id ? `/config/devices/device/${this._config.device_id}` : "");
    e ? (window.history.pushState(null, "", e), window.dispatchEvent(new Event("location-changed"))) : this._message = "Indica device_id o settings_path per aprire il dispositivo.";
  }
  _settingsButton(e) {
    const t = this._ui.header.settings_button_position;
    if (!this._ui.settings_button.enabled || this._config?.settings_action === !1 || t === "none") return p;
    const i = !this._ui.header.enabled && t === "header" ? "graphic" : t;
    return e !== i ? p : g`<button class="settings-btn" title="Impostazioni dispositivo" aria-label="Impostazioni dispositivo" @click=${this._openSettings}><ha-icon icon="mdi:cog"></ha-icon></button>`;
  }
  _percent(e) {
    return e === null ? "—" : `${Math.round(e)}%`;
  }
  _buttonStyle(e) {
    const t = this._ui.colors, i = this._ui.icon_tune;
    return [
      `--roger-button-default-bg:${t.button_default[e]}`,
      `--roger-button-active-bg:${t.button_active[e]}`,
      `--roger-button-available-bg:${t.button_available[e]}`,
      `--roger-icon-default-color:${t.icon_default[e]}`,
      `--roger-icon-active-color:${t.icon_active[e]}`,
      `--roger-icon-available-color:${t.icon_available[e]}`,
      `--roger-icon-x:${i.x + i[`${e}_x`]}px`,
      `--roger-icon-y:${i.y + i[`${e}_y`]}px`
    ].join(";");
  }
  _controls(e) {
    if (!this._ui.controls.enabled) return p;
    const t = Et(this.hass, this._entities, e), i = { open: e.opening, close: e.closing, stop: e.stopped, pedestrian: !1 }, o = ["open", "stop", "close", "pedestrian"].filter((s) => {
      const n = this._ui.controls[`show_${s}`];
      return n === "auto" ? !!this._entities.pedestrian_button : n;
    });
    return o.length ? g`<div class="controls-wrap"><div class="controls" style=${`grid-template-columns:repeat(${o.length},minmax(0,1fr))`}>
      ${o.map((s) => g`<button
        class=${`icon-btn ${s} ${i[s] ? `is-active effect-${this._ui.effects.active_action}` : ""} ${t[s] ? "is-available" : ""} ${this._ui.controls.available_action_tint ? "tint-enabled" : ""}`}
        style=${this._buttonStyle(s)} title=${q[s]} aria-label=${q[s]}
        ?disabled=${!t[s] || this._pending.has(s)} aria-busy=${this._pending.has(s)}
        @click=${() => this._press(s)}>
        <ha-icon icon=${this._ui.icons[s]}></ha-icon><span>${q[s]}</span>
      </button>`)}
    </div></div>` : p;
  }
  _photocellIcon() {
    return g`<svg class="photocell-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
      <path d="M3 7v10M21 7v10"></path><path d="M7 12h10" stroke-dasharray="2 3"></path>
    </svg>`;
  }
  _photocells(e) {
    return g`<div class="photocells" aria-label="Fotocellule">
      ${[1, 2].map((t) => {
      const i = t === 1 ? e.ft1 : e.ft2;
      return g`<div class=${`photocell ${i === !0 ? "blocked" : i === !1 ? "clear" : "unknown"}`} data-ft=${t}>
          ${this._photocellIcon()}<span class="photocell-text"><span>FT${t}</span> <strong>${i === !0 ? "Oscurata" : i === !1 ? "Libera" : "Non disponibile"}</strong></span>
        </div>`;
    })}
    </div>`;
  }
  _leafDetails(e) {
    return g`<div class="leaf-details">
      <div><span>Anta 1</span><strong>${this._percent(e.motor1Position)}</strong><small>${e.state1}</small></div>
      <div><span>Anta 2</span><strong>${this._percent(e.motor2Position)}</strong><small>${e.state2}</small></div>
    </div>`;
  }
  _configurationNotice() {
    if (this._loading) return g`<div class="notice">Riconoscimento entità…</div>`;
    const e = ["online", "position_1", "position_2", "open_button", "stop_button", "close_button", "pedestrian_button"].filter((i) => !this._entities[i]);
    !this._entities.state_1 && !this._entities.state_code_1 && e.push("state_1"), !this._entities.state_2 && !this._entities.state_code_2 && e.push("state_2"), !this._entities.ft1 && !this._entities.inputs_raw && e.push("ft1"), !this._entities.ft2 && !this._entities.inputs_raw && e.push("ft2");
    const t = this._discoveryMessage || (e.length ? `Entità da configurare: ${e.join(", ")}.` : "");
    return t ? g`<div class="notice">${t} ${this._config?.device_id ? g`<button class="retry" @click=${() => {
      this._loadRequested = !0, this.requestUpdate();
    }}>Rileggi entità</button>` : p}</div>` : p;
  }
  render() {
    if (!this._config) return p;
    const e = At(this.hass, this._entities, this._config.pedestrian_position), t = this._ui, i = `--roger-card-padding:${t.padding.card};--roger-visual-padding:${t.padding.visual};--roger-controls-top:${t.padding.controls_top};--roger-header-bottom:${t.padding.header_bottom};--roger-content-gap:${t.padding.content_gap}`, o = e.ft1 && e.ft2 ? "FT1 e FT2 oscurate" : e.ft1 ? "FT1 oscurata" : e.ft2 ? "FT2 oscurata" : "";
    return g`<ha-card><div class="wrapper" style=${i}>
      ${t.header.enabled ? g`<div class="header-row"><div class="header-main"><div class="header-title">${t.header.title}</div>
        ${t.header.show_state || t.header.show_position ? g`<div class="header-meta">${t.header.show_state ? e.label : ""}${t.header.show_state && t.header.show_position ? " · " : ""}${t.header.show_position ? this._percent(e.displayPosition) : ""}</div>` : p}
      </div>${this._settingsButton("header")}</div>` : p}
      ${t.view_mode === "text" ? g`<div class="text-panel"><div class="text-panel-main">${e.label} · ${this._percent(e.displayPosition)}</div>${this._settingsButton("graphic")}</div>` : g`
        <div class="visual-box">${ge(e, this._config.motor1_side ?? "left")}
          ${o ? g`<div class="overlay-badges"><div class="flag warn">${this._photocellIcon()}${o}</div></div>` : p}
          ${this._settingsButton("graphic")}
        </div>
        <div class="meta-row" role="status"><span class=${`connection-dot ${e.online === !0 ? "connected" : "disconnected"}`}></span><span class="meta-state">${e.label}</span><span class="meta-separator">·</span><span class="meta-position">${this._percent(e.displayPosition)}</span></div>`}
      ${t.view_mode !== "graphic" ? this._leafDetails(e) : p}
      ${this._photocells(e)}
      ${this._controls(e)}
      ${this._message ? g`<div class="notice error" role="alert">${this._message}</div>` : p}
      ${this._configurationNotice()}
      ${this._config.show_debug ? g`<details class="debug-box"><summary>Diagnostica e associazioni</summary><div>Ultimo esito: ${e.lastResult || "—"}</div>${Object.entries(this._entities).map(([s, n]) => g`<div><strong>${s}:</strong> ${n}</div>`)}</details>` : p}
    </div></ha-card>`;
  }
};
y.styles = [pe];
A([
  Rt({ attribute: !1 })
], y.prototype, "hass", 2);
A([
  M()
], y.prototype, "_config", 2);
A([
  M()
], y.prototype, "_entities", 2);
A([
  M()
], y.prototype, "_message", 2);
A([
  M()
], y.prototype, "_discoveryMessage", 2);
A([
  M()
], y.prototype, "_loading", 2);
A([
  M()
], y.prototype, "_pending", 2);
y = A([
  le("roger-edge1-card")
], y);
window.customCards = window.customCards || [];
window.customCards.push({ type: "roger-edge1-card", name: "Roger EDGE1 — Cancello", preview: !0, description: "Due ante, Apri/Stop/Chiudi/Pedonale, fotocellule FT1 e FT2." });
export {
  y as RogerEdge1Card
};
