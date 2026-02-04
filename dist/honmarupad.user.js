// ==UserScript==
// @name         本丸ぱっど
// @namespace    sanipad/honmarupad
// @version      2026-02-04.12:21
// @author       AzamiHaru
// @description  ブラウザ版「刀剣乱舞ONLINE」のゲーム画面を調整するユーザースクリプトです。このスクリプトはブラウザの表示（DOM）のみを調整します。ゲームデータや通信内容には一切触れていません。ブラウザの標準機能で実現できる表示制御をスクリプトで代行しているだけですが、各位の判断で自己責任のもとご利用ください。
// @license      Custom (See LICENSE file)
// @icon         https://sanipad.pages.dev/favicon.svg
// @homepageURL  https://sanipad.pages.dev/
// @supportURL   https://github.com/AzamiHaruCat/honmarupad/issues
// @downloadURL  https://raw.githubusercontent.com/AzamiHaruCat/honmarupad/main/dist/honmarupad.user.js
// @updateURL    https://raw.githubusercontent.com/AzamiHaruCat/honmarupad/main/dist/honmarupad.user.js
// @match        https://play.games.dmm.com/game/tohken
// @run-at       document-start
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  const t$3 = globalThis, e$7 = t$3.ShadowRoot && (void 0 === t$3.ShadyCSS || t$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$5 = new WeakMap();
  let n$3 = class n {
    constructor(t2, e2, o2) {
      if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t2, this.t = e2;
    }
    get styleSheet() {
      let t2 = this.o;
      const s2 = this.t;
      if (e$7 && void 0 === t2) {
        const e2 = void 0 !== s2 && 1 === s2.length;
        e2 && (t2 = o$5.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$5.set(s2, t2));
      }
      return t2;
    }
    toString() {
      return this.cssText;
    }
  };
  const r$5 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$4 = (t2, ...e2) => {
    const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
      if (true === t3._$cssResult$) return t3.cssText;
      if ("number" == typeof t3) return t3;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s2) + t2[o3 + 1], t2[0]);
    return new n$3(o2, t2, s$2);
  }, S$1 = (s2, o2) => {
    if (e$7) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
    else for (const e2 of o2) {
      const o3 = document.createElement("style"), n3 = t$3.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
    }
  }, c$2 = e$7 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
    let e2 = "";
    for (const s2 of t3.cssRules) e2 += s2.cssText;
    return r$5(e2);
  })(t2) : t2;
  const { is: i$3, defineProperty: e$6, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$4, getOwnPropertySymbols: o$4, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
    switch (s2) {
      case Boolean:
        t2 = t2 ? l$1 : null;
        break;
      case Object:
      case Array:
        t2 = null == t2 ? t2 : JSON.stringify(t2);
    }
    return t2;
  }, fromAttribute(t2, s2) {
    let i3 = t2;
    switch (s2) {
      case Boolean:
        i3 = null !== t2;
        break;
      case Number:
        i3 = null === t2 ? null : Number(t2);
        break;
      case Object:
      case Array:
        try {
          i3 = JSON.parse(t2);
        } catch (t3) {
          i3 = null;
        }
    }
    return i3;
  } }, f$1 = (t2, s2) => !i$3(t2, s2), b$1 = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
  Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= new WeakMap();
  let y$1 = class y extends HTMLElement {
    static addInitializer(t2) {
      this._$Ei(), (this.l ??= []).push(t2);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t2, s2 = b$1) {
      if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
        const i3 = Symbol(), h2 = this.getPropertyDescriptor(t2, i3, s2);
        void 0 !== h2 && e$6(this.prototype, t2, h2);
      }
    }
    static getPropertyDescriptor(t2, s2, i3) {
      const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
        return this[s2];
      }, set(t3) {
        this[s2] = t3;
      } };
      return { get: e2, set(s3) {
        const h2 = e2?.call(this);
        r2?.call(this, s3), this.requestUpdate(t2, h2, i3);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t2) {
      return this.elementProperties.get(t2) ?? b$1;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d$1("elementProperties"))) return;
      const t2 = n$2(this);
      t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d$1("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
        const t3 = this.properties, s2 = [...r$4(t3), ...o$4(t3)];
        for (const i3 of s2) this.createProperty(i3, t3[i3]);
      }
      const t2 = this[Symbol.metadata];
      if (null !== t2) {
        const s2 = litPropertyMetadata.get(t2);
        if (void 0 !== s2) for (const [t3, i3] of s2) this.elementProperties.set(t3, i3);
      }
      this._$Eh = new Map();
      for (const [t3, s2] of this.elementProperties) {
        const i3 = this._$Eu(t3, s2);
        void 0 !== i3 && this._$Eh.set(i3, t3);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s2) {
      const i3 = [];
      if (Array.isArray(s2)) {
        const e2 = new Set(s2.flat(1 / 0).reverse());
        for (const s3 of e2) i3.unshift(c$2(s3));
      } else void 0 !== s2 && i3.push(c$2(s2));
      return i3;
    }
    static _$Eu(t2, s2) {
      const i3 = s2.attribute;
      return false === i3 ? void 0 : "string" == typeof i3 ? i3 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
    }
    addController(t2) {
      (this._$EO ??= new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
    }
    removeController(t2) {
      this._$EO?.delete(t2);
    }
    _$E_() {
      const t2 = new Map(), s2 = this.constructor.elementProperties;
      for (const i3 of s2.keys()) this.hasOwnProperty(i3) && (t2.set(i3, this[i3]), delete this[i3]);
      t2.size > 0 && (this._$Ep = t2);
    }
    createRenderRoot() {
      const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S$1(t2, this.constructor.elementStyles), t2;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
    }
    enableUpdating(t2) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t2) => t2.hostDisconnected?.());
    }
    attributeChangedCallback(t2, s2, i3) {
      this._$AK(t2, i3);
    }
    _$ET(t2, s2) {
      const i3 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i3);
      if (void 0 !== e2 && true === i3.reflect) {
        const h2 = (void 0 !== i3.converter?.toAttribute ? i3.converter : u$1).toAttribute(s2, i3.type);
        this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
      }
    }
    _$AK(t2, s2) {
      const i3 = this.constructor, e2 = i3._$Eh.get(t2);
      if (void 0 !== e2 && this._$Em !== e2) {
        const t3 = i3.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$1;
        this._$Em = e2;
        const r2 = h2.fromAttribute(s2, t3.type);
        this[e2] = r2 ?? this._$Ej?.get(e2) ?? r2, this._$Em = null;
      }
    }
    requestUpdate(t2, s2, i3, e2 = false, h2) {
      if (void 0 !== t2) {
        const r2 = this.constructor;
        if (false === e2 && (h2 = this[t2]), i3 ??= r2.getPropertyOptions(t2), !((i3.hasChanged ?? f$1)(h2, s2) || i3.useDefault && i3.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(r2._$Eu(t2, i3)))) return;
        this.C(t2, s2, i3);
      }
      false === this.isUpdatePending && (this._$ES = this._$EP());
    }
    C(t2, s2, { useDefault: i3, reflect: e2, wrapped: h2 }, r2) {
      i3 && !(this._$Ej ??= new Map()).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i3 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ??= new Set()).add(t2));
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t3) {
        Promise.reject(t3);
      }
      const t2 = this.scheduleUpdate();
      return null != t2 && await t2, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t4, s3] of this._$Ep) this[t4] = s3;
          this._$Ep = void 0;
        }
        const t3 = this.constructor.elementProperties;
        if (t3.size > 0) for (const [s3, i3] of t3) {
          const { wrapped: t4 } = i3, e2 = this[s3];
          true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i3, e2);
        }
      }
      let t2 = false;
      const s2 = this._$AL;
      try {
        t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EM();
      } catch (s3) {
        throw t2 = false, this._$EM(), s3;
      }
      t2 && this._$AE(s2);
    }
    willUpdate(t2) {
    }
    _$AE(t2) {
      this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
    }
    _$EM() {
      this._$AL = new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t2) {
      return true;
    }
    update(t2) {
      this._$Eq &&= this._$Eq.forEach((t3) => this._$ET(t3, this[t3])), this._$EM();
    }
    updated(t2) {
    }
    firstUpdated(t2) {
    }
  };
  y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = new Map(), y$1[d$1("finalized")] = new Map(), p$1?.({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ??= []).push("2.1.2");
  const t$2 = globalThis, i$2 = (t2) => t2, s$1 = t$2.trustedTypes, e$5 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h = "$lit$", o$3 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$3, r$3 = `<${n$1}>`, l = document, c = () => l.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u = Array.isArray, d = (t2) => u(t2) || "function" == typeof t2?.[Symbol.iterator], f = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m = />/g, p = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i3, ...s2) => ({ _$litType$: t2, strings: i3, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = new WeakMap(), P = l.createTreeWalker(l, 129);
  function V(t2, i3) {
    if (!u(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== e$5 ? e$5.createHTML(i3) : i3;
  }
  const N = (t2, i3) => {
    const s2 = t2.length - 1, e2 = [];
    let n3, l2 = 2 === i3 ? "<svg>" : 3 === i3 ? "<math>" : "", c2 = v;
    for (let i4 = 0; i4 < s2; i4++) {
      const s3 = t2[i4];
      let a2, u2, d2 = -1, f2 = 0;
      for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p) : void 0 !== u2[3] && (c2 = p) : c2 === p ? ">" === u2[0] ? (c2 = n3 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p : c2 === _ || c2 === m ? c2 = v : (c2 = p, n3 = void 0);
      const x2 = c2 === p && t2[i4 + 1].startsWith("/>") ? " " : "";
      l2 += c2 === v ? s3 + r$3 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h + s3.slice(d2) + o$3 + x2) : s3 + o$3 + (-2 === d2 ? i4 : x2);
    }
    return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i3 ? "</svg>" : 3 === i3 ? "</math>" : "")), e2];
  };
  class S {
    constructor({ strings: t2, _$litType$: i3 }, e2) {
      let r2;
      this.parts = [];
      let l2 = 0, a2 = 0;
      const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i3);
      if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i3 || 3 === i3) {
        const t3 = this.el.content.firstChild;
        t3.replaceWith(...t3.childNodes);
      }
      for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
        if (1 === r2.nodeType) {
          if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h)) {
            const i4 = v2[a2++], s2 = r2.getAttribute(t3).split(o$3), e3 = /([.?@])?(.*)/.exec(i4);
            d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
          } else t3.startsWith(o$3) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
          if (y2.test(r2.tagName)) {
            const t3 = r2.textContent.split(o$3), i4 = t3.length - 1;
            if (i4 > 0) {
              r2.textContent = s$1 ? s$1.emptyScript : "";
              for (let s2 = 0; s2 < i4; s2++) r2.append(t3[s2], c()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
              r2.append(t3[i4], c());
            }
          }
        } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(o$3, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$3.length - 1;
        }
        l2++;
      }
    }
    static createElement(t2, i3) {
      const s2 = l.createElement("template");
      return s2.innerHTML = t2, s2;
    }
  }
  function M(t2, i3, s2 = t2, e2) {
    if (i3 === E) return i3;
    let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
    const o2 = a(i3) ? void 0 : i3._$litDirective$;
    return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i3 = M(t2, h2._$AS(t2, i3.values), h2, e2)), i3;
  }
  class R {
    constructor(t2, i3) {
      this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i3;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t2) {
      const { el: { content: i3 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? l).importNode(i3, true);
      P.currentNode = e2;
      let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
      for (; void 0 !== r2; ) {
        if (o2 === r2.index) {
          let i4;
          2 === r2.type ? i4 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i4 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i4 = new Z(h2, this, t2)), this._$AV.push(i4), r2 = s2[++n3];
        }
        o2 !== r2?.index && (h2 = P.nextNode(), o2++);
      }
      return P.currentNode = l, e2;
    }
    p(t2) {
      let i3 = 0;
      for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t2[i3])), i3++;
    }
  }
  class k {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t2, i3, s2, e2) {
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i3, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
    }
    get parentNode() {
      let t2 = this._$AA.parentNode;
      const i3 = this._$AM;
      return void 0 !== i3 && 11 === t2?.nodeType && (t2 = i3.parentNode), t2;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t2, i3 = this) {
      t2 = M(this, t2, i3), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
    }
    O(t2) {
      return this._$AA.parentNode.insertBefore(t2, this._$AB);
    }
    T(t2) {
      this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
    }
    _(t2) {
      this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l.createTextNode(t2)), this._$AH = t2;
    }
    $(t2) {
      const { values: i3, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
      if (this._$AH?._$AD === e2) this._$AH.p(i3);
      else {
        const t3 = new R(e2, this), s3 = t3.u(this.options);
        t3.p(i3), this.T(s3), this._$AH = t3;
      }
    }
    _$AC(t2) {
      let i3 = C.get(t2.strings);
      return void 0 === i3 && C.set(t2.strings, i3 = new S(t2)), i3;
    }
    k(t2) {
      u(this._$AH) || (this._$AH = [], this._$AR());
      const i3 = this._$AH;
      let s2, e2 = 0;
      for (const h2 of t2) e2 === i3.length ? i3.push(s2 = new k(this.O(c()), this.O(c()), this, this.options)) : s2 = i3[e2], s2._$AI(h2), e2++;
      e2 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i3.length = e2);
    }
    _$AR(t2 = this._$AA.nextSibling, s2) {
      for (this._$AP?.(false, true, s2); t2 !== this._$AB; ) {
        const s3 = i$2(t2).nextSibling;
        i$2(t2).remove(), t2 = s3;
      }
    }
    setConnected(t2) {
      void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
    }
  }
  class H {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t2, i3, s2, e2, h2) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i3, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
    }
    _$AI(t2, i3 = this, s2, e2) {
      const h2 = this.strings;
      let o2 = false;
      if (void 0 === h2) t2 = M(this, t2, i3, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
      else {
        const e3 = t2;
        let n3, r2;
        for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M(this, e3[s2 + n3], i3, n3), r2 === E && (r2 = this._$AH[n3]), o2 ||= !a(r2) || r2 !== this._$AH[n3], r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
      }
      o2 && !e2 && this.j(t2);
    }
    j(t2) {
      t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
    }
  }
  class I extends H {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t2) {
      this.element[this.name] = t2 === A ? void 0 : t2;
    }
  }
  class L extends H {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t2) {
      this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
    }
  }
  class z extends H {
    constructor(t2, i3, s2, e2, h2) {
      super(t2, i3, s2, e2, h2), this.type = 5;
    }
    _$AI(t2, i3 = this) {
      if ((t2 = M(this, t2, i3, 0) ?? A) === E) return;
      const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
      e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
    }
    handleEvent(t2) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
    }
  }
  class Z {
    constructor(t2, i3, s2) {
      this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t2) {
      M(this, t2);
    }
  }
  const B = t$2.litHtmlPolyfillSupport;
  B?.(S, k), (t$2.litHtmlVersions ??= []).push("3.3.2");
  const D = (t2, i3, s2) => {
    const e2 = s2?.renderBefore ?? i3;
    let h2 = e2._$litPart$;
    if (void 0 === h2) {
      const t3 = s2?.renderBefore ?? null;
      e2._$litPart$ = h2 = new k(i3.insertBefore(c(), t3), t3, void 0, s2 ?? {});
    }
    return h2._$AI(t2), h2;
  };
  const s = globalThis;
  let i$1 = class i extends y$1 {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t2 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t2.firstChild, t2;
    }
    update(t2) {
      const r2 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return E;
    }
  };
  i$1._$litElement$ = true, i$1["finalized"] = true, s.litElementHydrateSupport?.({ LitElement: i$1 });
  const o$2 = s.litElementPolyfillSupport;
  o$2?.({ LitElement: i$1 });
  (s.litElementVersions ??= []).push("4.2.2");
  const t$1 = (t2) => (e2, o2) => {
    void 0 !== o2 ? o2.addInitializer(() => {
      customElements.define(t2, e2);
    }) : customElements.define(t2, e2);
  };
  const o$1 = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$2 = (t2 = o$1, e2, r2) => {
    const { kind: n3, metadata: i3 } = r2;
    let s2 = globalThis.litPropertyMetadata.get(i3);
    if (void 0 === s2 && globalThis.litPropertyMetadata.set(i3, s2 = new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
      const { name: o2 } = r2;
      return { set(r3) {
        const n4 = e2.get.call(this);
        e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
      }, init(e3) {
        return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
      } };
    }
    if ("setter" === n3) {
      const { name: o2 } = r2;
      return function(r3) {
        const n4 = this[o2];
        e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
      };
    }
    throw Error("Unsupported decorator location: " + n3);
  };
  function n2(t2) {
    return (e2, o2) => "object" == typeof o2 ? r$2(t2, e2, o2) : ((t3, e3, o3) => {
      const r2 = e3.hasOwnProperty(o3);
      return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
    })(t2, e2, o2);
  }
  function r$1(r2) {
    return n2({ ...r2, state: true, attribute: false });
  }
  const e$4 = (e2, t2, c2) => (c2.configurable = true, c2.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e2, t2, c2), c2);
  function e$3(e2, r2) {
    return (n3, s2, i3) => {
      const o2 = (t2) => t2.renderRoot?.querySelector(e2) ?? null;
      return e$4(n3, s2, { get() {
        return o2(this);
      } });
    };
  }
  let e$2;
  function r(r2) {
    return (n3, o2) => e$4(n3, o2, { get() {
      return (this.renderRoot ?? (e$2 ??= document.createDocumentFragment())).querySelectorAll(r2);
    } });
  }
  const sleep = (msec = 0) => new Promise((resolve) => setTimeout(resolve, msec));
  const skipFrame = () => Promise.race([new Promise(requestAnimationFrame), sleep(20)]);
  const isAppWindow = () => window.matchMedia("(display-mode: standalone), (display-mode: minimal-ui)").matches;
  const windowHasName = !!window.name;
  const isPopupWindow = () => windowHasName && window === window.top;
  class AspectFitController {
    constructor(host, options) {
      this.options = {
        width: 0,
        height: 0,
        scrollTarget: "head"
      };
      this.scale = 1;
      this.#scrollingPromise = null;
      this.#isResizing = false;
      this.handleResize = () => {
        clearTimeout(this.#resizeTimer);
        this.#resizeTimer = window.setTimeout(this.adjust, 200);
      };
      this.hideScrollbar = () => {
        const value = this.isScrollable ? "" : "hidden";
        document.body.style.overflow = value;
      };
      this.adjust = async () => {
        if (this.#isResizing) return;
        this.hideScrollbar();
        await skipFrame();
        const { width, height } = this.options;
        const { clientWidth, clientHeight } = document.documentElement;
        if (clientWidth === 0 || clientHeight === 0) return;
        const screenRatio = clientWidth / clientHeight;
        this.scale = screenRatio > this.aspectRatio ? clientHeight / height : clientWidth / width;
        if (this.isScrollable) {
          this.#host.style.transform = "";
        } else {
          const isMaximized = window.outerWidth >= screen.availWidth && window.outerHeight >= screen.availHeight;
          if (!isMaximized && (isAppWindow() || isPopupWindow())) {
            const { clientWidth: clientWidth2, clientHeight: clientHeight2 } = document.documentElement;
            if (Math.abs(clientWidth2 - width * this.scale) > 1 || Math.abs(clientHeight2 - height * this.scale) > 1) {
              await this.resize(100 * this.scale);
              clearTimeout(this.#resizeTimer);
            }
          }
          this.#host.style.transform = `scale(${this.scale})`;
        }
        this.#host.requestUpdate();
        await this.#host.updateComplete;
        await this.scrollToTarget();
      };
      this.resize = async (percent) => {
        if (!(isAppWindow() || isPopupWindow())) return;
        if (this.#isResizing) return;
        this.hideScrollbar();
        await skipFrame();
        const { width, height } = this.options;
        const targetWidth = Math.round(width * percent / 100);
        const targetHeight = Math.round(height * percent / 100);
        const getMargin = () => ({
          width: window.outerWidth - document.documentElement.clientWidth,
          height: window.outerHeight - document.documentElement.clientHeight
        });
        const initialMargin = getMargin();
        const sizeMatch = Math.abs(window.outerWidth - (targetWidth + initialMargin.width)) < 1 && Math.abs(window.outerHeight - (targetHeight + initialMargin.height)) < 1;
        if (sizeMatch) return;
        this.#isResizing = true;
        try {
          window.resizeBy(-1, -1);
          window.resizeBy(1, 1);
          await sleep(100);
          const margin = getMargin();
          window.resizeTo(targetWidth + margin.width, targetHeight + margin.height);
          await sleep(100);
        } finally {
          this.#isResizing = false;
        }
      };
      this.scrollToTarget = () => {
        const target = this.options.scrollTarget;
        const rect = this.#host.getBoundingClientRect();
        const top = target === "body" ? window.scrollY + rect.y || 0 : target === "foot" ? window.scrollY + rect.y + rect.height || 0 : 0;
        let left = 0;
        if (target === "body") {
          left = window.scrollX + rect.x;
          const { clientWidth } = document.documentElement;
          if (rect.width < clientWidth) {
            left -= (clientWidth - rect.width) / 2;
          }
          left = Math.max(0, left);
        }
        window.scrollTo({ top, left, behavior: "smooth" });
        return this.waitForScroll();
      };
      this.waitForScroll = () => {
        if (this.#scrollingPromise) return this.#scrollingPromise;
        return this.#scrollingPromise = (async () => {
          let lastX = window.scrollX;
          let lastY = window.scrollY;
          let frameCount = 0;
          while (true) {
            await skipFrame();
            const currentX = window.scrollX;
            const currentY = window.scrollY;
            if (currentX !== lastX || currentY !== lastY) {
              lastX = currentX;
              lastY = currentY;
              frameCount = 0;
            } else if (frameCount++ < 5) {
              continue;
            } else {
              break;
            }
          }
          this.#scrollingPromise = null;
        })();
      };
      (this.#host = host).addController(this);
      this.setDimension(options.width, options.height);
      this.setTarget(options.scrollTarget);
    }
    #host;
    #scrollingPromise;
    #resizeTimer;
    #isResizing;
    get isScrollable() {
      return this.options.scrollTarget !== "body";
    }
    hostConnected() {
      window.addEventListener("resize", this.handleResize);
    }
    hostDisconnected() {
      window.removeEventListener("resize", this.handleResize);
      clearTimeout(this.#resizeTimer);
    }
    setDimension(width, height) {
      Object.assign(this.options, { width, height });
      this.aspectRatio = width / height;
    }
    setTarget(value) {
      this.options.scrollTarget = value;
    }
  }
  var __defProp$8 = Object.defineProperty;
  var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
  var __typeError$7 = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$8 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$8(target, key, result);
    return result;
  };
  var __accessCheck$7 = (obj, member, msg) => member.has(obj) || __typeError$7("Cannot " + msg);
  var __privateGet$7 = (obj, member, getter) => (__accessCheck$7(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd$7 = (obj, member, value) => member.has(obj) ? __typeError$7("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet$2 = (obj, member, value, setter) => (__accessCheck$7(obj, member, "write to private field"), member.set(obj, value), value);
  var __privateMethod$3 = (obj, member, method) => (__accessCheck$7(obj, member, "access private method"), method);
  var _observer, _SanipadArea_instances, header_get, target_get, startObserving_fn;
  const TAG_NAME$8 = "sanipad-area";
  const TARGET_WIDTH = 1136;
  const TARGET_HEIGHT = 660;
  const STYLE$8 = i$4`
  :host {
    display: block;
    width: ${TARGET_WIDTH}px;
    height: ${TARGET_HEIGHT}px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    transform-origin: 50% 0;
    contain: layout;
  }
  :host(:not([ready])) {
    display: none;
  }
  ::slotted(*) {
    position: absolute;
  }
`;
  let SanipadArea = class extends i$1 {
    constructor() {
      super(...arguments);
      __privateAdd$7(this, _SanipadArea_instances);
      this.ready = false;
      this.fitWidth = TARGET_WIDTH;
      this.fitHeight = TARGET_HEIGHT;
      this.fitTarget = isAppWindow() || isPopupWindow() ? "body" : "head";
      this._fit = new AspectFitController(this, {
        width: this.fitWidth,
        height: this.fitHeight,
        scrollTarget: this.fitTarget
      });
      __privateAdd$7(this, _observer);
    }
    adjust() {
      return this._fit.adjust();
    }
    resize(percent) {
      return this._fit.resize(percent);
    }
    connectedCallback() {
      super.connectedCallback();
      __privateMethod$3(this, _SanipadArea_instances, startObserving_fn).call(this);
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      __privateGet$7(this, _observer)?.disconnect();
    }
    updated(changedProperties) {
      const target = __privateGet$7(this, _SanipadArea_instances, target_get);
      if (!target) return;
      if (changedProperties.has("fitWidth") || changedProperties.has("fitHeight") || changedProperties.has("fitTarget")) {
        this._fit.setDimension(this.fitWidth, this.fitHeight);
        this._fit.setTarget(this.fitTarget);
        this._fit.adjust();
      }
      const computedStyle = window.getComputedStyle(target);
      const { paddingTop } = computedStyle;
      this.style.top = `calc(${target.offsetTop}px + ${paddingTop})`;
      Object.assign(target.style, {
        contain: "layout paint",
        transformOrigin: `50% ${paddingTop}`,
        transform: this.style.transform
      });
    }
    render() {
      return b`<slot></slot>`;
    }
  };
  _observer = new WeakMap();
  _SanipadArea_instances = new WeakSet();
  header_get = function() {
    return document.querySelector("header");
  };
  target_get = function() {
    return document.querySelector("main:has(#game_frame)");
  };
  startObserving_fn = function() {
    const complete = () => {
      __privateGet$7(this, _observer)?.disconnect();
      Object.assign(__privateGet$7(this, _SanipadArea_instances, header_get)?.style ?? {}, {
        position: "relative",
        zIndex: "1"
      });
      this.ready = true;
      this.adjust();
    };
    if (__privateGet$7(this, _SanipadArea_instances, target_get)) {
      complete();
    } else {
      __privateSet$2(this, _observer, new MutationObserver(() => {
        if (__privateGet$7(this, _SanipadArea_instances, target_get)) complete();
      }));
      __privateGet$7(this, _observer).observe(document.body, { childList: true, subtree: true });
    }
  };
  SanipadArea.styles = STYLE$8;
  __decorateClass$8([
    n2({ type: Boolean, reflect: true })
  ], SanipadArea.prototype, "ready", 2);
  __decorateClass$8([
    n2({ type: Number })
  ], SanipadArea.prototype, "fitWidth", 2);
  __decorateClass$8([
    n2({ type: Number })
  ], SanipadArea.prototype, "fitHeight", 2);
  __decorateClass$8([
    n2()
  ], SanipadArea.prototype, "fitTarget", 2);
  SanipadArea = __decorateClass$8([
    t$1(TAG_NAME$8)
  ], SanipadArea);
  var __defProp$7 = Object.defineProperty;
  var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
  var __typeError$6 = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$7 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$7(target, key, result);
    return result;
  };
  var __accessCheck$6 = (obj, member, msg) => member.has(obj) || __typeError$6("Cannot " + msg);
  var __privateGet$6 = (obj, member, getter) => (__accessCheck$6(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd$6 = (obj, member, value) => member.has(obj) ? __typeError$6("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var _handleMouseDown;
  const TAG_NAME$7 = "sanipad-dialog";
  const STYLE$7 = i$4`
  :host {
    display: contents;
    pointer-events: auto;
  }
  dialog {
    color: #333;
    background: #fff;
    padding: 1em;
    border: 0;
    border-radius: 0.5em;
    box-shadow: 0 10px 25px #0002;
    overflow: visible;
    &::backdrop {
      background-color: #8888;
    }
  }
  form {
    max-width: min(60vw, 40em);
    max-height: 80vh;
    overflow: auto;
    padding: 0.5em;
  }
  button {
    all: unset;
    display: flex;
    cursor: pointer;
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    color: #fff;
    background: #333;
    &:is(:hover, :active, :focus) {
      background: #666;
    }
    &:is(:focus-visible, :active) {
      outline: 2px solid #4f88;
    }
  }
  ::slotted(:is(*, #_)) {
    border-color: #8888;
  }
  ::slotted(:is(h1, h2, h3, h4, h5, h6, #_)) {
    color: #666;
  }
  ::slotted(:is(h1, h2, h3, h4, h5, h6):first-child) {
    margin-top: 0;
    font-size: 1.4rem;
  }
  ::slotted(h1) {
    font-size: 1.4rem;
    border-bottom: 3px double;
  }
  ::slotted(h2) {
    font-size: 1.3rem;
    border-bottom: 1px solid;
  }
  ::slotted(h3) {
    font-size: 1.2rem;
    border-bottom: 1px dashed;
  }
  ::slotted(h4) {
    font-size: 1.1rem;
  }
  ::slotted(h5) {
    font-size: 1rem;
  }
  ::slotted(h6) {
    font-size: 0.9rem;
  }
  ::slotted(p) {
    text-align: justify;
  }
`;
  let SanipadDialog = class extends i$1 {
    constructor() {
      super(...arguments);
      this.open = false;
      __privateAdd$6(this, _handleMouseDown, (e2) => {
        const rect = this._dialog.getBoundingClientRect();
        if (e2.clientX < rect.x || e2.clientX > rect.x + rect.width || e2.clientY < rect.y || e2.clientY > rect.y + rect.height) {
          this.hide();
        }
      });
    }
    render() {
      return b`
      <dialog @close=${() => this.hide()} @mousedown=${__privateGet$6(this, _handleMouseDown)}>
        <form method="dialog">
          <slot></slot>
          <button aria-label="ダイアログを閉じる">
            <ui-icon type="close"></ui-icon>
          </button>
        </form>
      </dialog>
    `;
    }
    updated(changedProperties) {
      if (changedProperties.has("open")) {
        if (this._dialog.open) {
          if (!this.open) this._dialog.close();
        } else {
          if (this.open) this._dialog.showModal();
        }
      }
    }
    show() {
      this.open = true;
    }
    hide() {
      this.open = false;
    }
  };
  _handleMouseDown = new WeakMap();
  SanipadDialog.styles = STYLE$7;
  __decorateClass$7([
    e$3("dialog")
  ], SanipadDialog.prototype, "_dialog", 2);
  __decorateClass$7([
    n2({ type: Boolean })
  ], SanipadDialog.prototype, "open", 2);
  SanipadDialog = __decorateClass$7([
    t$1(TAG_NAME$7)
  ], SanipadDialog);
  var __defProp$6 = Object.defineProperty;
  var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
  var __typeError$5 = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$6 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$6(target, key, result);
    return result;
  };
  var __accessCheck$5 = (obj, member, msg) => member.has(obj) || __typeError$5("Cannot " + msg);
  var __privateGet$5 = (obj, member, getter) => (__accessCheck$5(obj, member, "read from private field"), member.get(obj));
  var __privateAdd$5 = (obj, member, value) => member.has(obj) ? __typeError$5("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var _activate, _inactivate;
  const TAG_NAME$6 = "sanipad-honmarupad";
  const STYLE$6 = i$4`
  :host {
    display: contents;
    font:
      14px / 1.5 Verdana,
      'Noto Sans JP',
      sans-serif;
    pointer-events: none;
  }
`;
  let SanipadHonmarupad = class extends i$1 {
    constructor() {
      super(...arguments);
      this._isActive = false;
      __privateAdd$5(this, _activate, () => {
        if (!this.matches(":focus")) window.focus();
        this._isActive = true;
      });
      __privateAdd$5(this, _inactivate, () => {
        this._isActive = false;
      });
    }
    connectedCallback() {
      super.connectedCallback();
      window.addEventListener("blur", __privateGet$5(this, _inactivate));
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener("blur", __privateGet$5(this, _inactivate));
    }
    render() {
      return b`
      <sanipad-area id="area">
        <sanipad-menu
          id="menu"
          ?active=${this._isActive}
          @focusin=${__privateGet$5(this, _activate)}
          @mouseenter=${__privateGet$5(this, _activate)}
        ></sanipad-menu>
        <sanipad-timer id="timer" ?active=${this._isActive}></sanipad-timer>
      </sanipad-area>
    `;
    }
  };
  _activate = new WeakMap();
  _inactivate = new WeakMap();
  SanipadHonmarupad.styles = STYLE$6;
  __decorateClass$6([
    r$1()
  ], SanipadHonmarupad.prototype, "_isActive", 2);
  SanipadHonmarupad = __decorateClass$6([
    t$1(TAG_NAME$6)
  ], SanipadHonmarupad);
  const t = { CHILD: 2 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
  class i2 {
    constructor(t2) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t2, e2, i3) {
      this._$Ct = t2, this._$AM = e2, this._$Ci = i3;
    }
    _$AS(t2, e2) {
      return this.update(t2, e2);
    }
    update(t2, e2) {
      return this.render(...e2);
    }
  }
  class e extends i2 {
    constructor(i3) {
      if (super(i3), this.it = A, i3.type !== t.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r2) {
      if (r2 === A || null == r2) return this._t = void 0, this.it = r2;
      if (r2 === E) return r2;
      if ("string" != typeof r2) throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (r2 === this.it) return this._t;
      this.it = r2;
      const s2 = [r2];
      return s2.raw = s2, this._t = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
    }
  }
  e.directiveName = "unsafeHTML", e.resultType = 1;
  const o = e$1(e);
  const HELP_MD = "# 本丸ぱっど\r\n\r\nブラウザ版「刀剣乱舞ONLINE」のゲーム画面を調整するユーザースクリプトです。\r\n\r\nこのスクリプトはブラウザの表示（DOM）のみを調整します。ゲームデータや通信内容には一切触れていません。ブラウザの標準機能で実現できる表示制御をスクリプトで代行しているだけですが、各位の判断で自己責任のもとご利用ください。\r\n\r\n## 使い方\r\n\r\nゲーム画面の**一番下**にマウスカーソルを近づけてください。メニューボタンが表示されます。\r\n\r\n- **トップ** / **お知らせ** … スクロールバーを表示し、最上部のDMMメニューやゲーム画面下のお知らせまでスクロールします。\r\n\r\n- **集中モード** … スクロールバーを消し、ゲーム画面をウィンドウ幅いっぱいに拡大・縮小します。\r\n  ※ウィンドウが「アプリモード」でない場合に表示されます。\r\n\r\n- **100%** ～ **50%** … スクロールバーを消し、指定倍率のゲーム画面に合わせてウィンドウをリサイズします。\r\n  ※ウィンドウが「アプリモード」の場合に利用できます。\r\n\r\n- **使い方** … この説明文を表示します。\r\n\r\n## アプリモードとは\r\n\r\n本丸ぱっどはリサイズを活用できるアプリモードでの利用を想定しています。\r\n\r\nChrome系ブラウザの機能で、サイトを単独のアプリのようにインストールすることができます。アプリモードで起動すると、タブやアドレスバーのないシンプルなウィンドウが開きます。\r\n\r\nEdgeでのアプリ化の手順：\r\n\r\n1. 右上の「…」アイコンをクリック（または「Alt + F」）\r\n2. 「その他のツール」→「アプリ」→「このサイトをアプリとしてインストール」\r\n\r\nChromeでのアプリ化の手順：\r\n\r\n1. 右上の「︙」アイコンをクリック（または「Alt + F」）\r\n2. 「キャスト、保存、共有」→「ページをアプリとしてインストール」\r\n\r\nブラウザのアップデートにより手順が変わる場合があります。\r\n";
  const BUTTON_STYLE = i$4`
  :where(button) {
    all: unset;
    display: inline-flex;

    &:is([hidden], #_#_#_#_#_) {
      display: none;
    }

    align-items: baseline;
    justify-content: center;

    &:where(:has(ui-icon)) {
      align-items: center;
    }

    margin: 2px;
    padding: 0.2em;
    border: 1px solid #aaa;
    border-radius: 0.25em / 35%;
    color: #333;
    background: #fff;
    box-shadow: 0 1px 2px -1px #8888;
    box-sizing: border-box;
    contain: paint;

    cursor: pointer;
    user-select: none;
    pointer-events: auto;

    &:is([disabled], #_#_#_#_#_) {
      cursor: default;
      pointer-events: none;
      filter: contrast(25%) brightness(150%);
    }

    &:where(:not([disabled])) {
      transition:
        all 0.2s ease-out,
        outline 0s;

      &:where(:hover, :active, :focus) {
        color: #820;
        background: #fec;
        border-color: currentColor;
      }

      &:where(:focus-visible, :active) {
        outline: 2px solid #4f88;
      }
    }

    :where(kbd) {
      all: unset;
      text-decoration: underline;
    }
  }
`;
  const parseSimpleMarkdown = (text) => {
    return text.replace(/\r\n?/g, "\n").replace(/&(?!(?:\w+|#(?:[0-9]+|x[0-9a-f]+));)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/^(#{1,6}) (.*)$/gm, hN).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>').replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br>").replace(/^/, "<p>").replace(/$/, "</p>").replace(/<br>(<h[1-6]>)/g, "</p>$1").replace(/(<\/h[1-6]>)<br>/g, "$1<p>").replace(/<p>\s*<\/p>|<p>(<h[1-6]>)|(<\/h[1-6]>)<\/p>/g, "$1$2").replace(/(?:<(p|br)>- (?:(?!<\/?p>).)+<\/p>)+/g, ul).replace(/(?:<(p|br)>\d+\. (?:(?!<\/?p>).)+<\/p>)+/g, ol).replace(/(<li>(?:(?!<(\/li|p)>).)+)<\/p>/g, "$1");
  };
  const hN = (_2, $1, $2) => `<h${$1.length}>${$2.trim()}</h${$1.length}>`;
  const ul = ($0) => `<ul>${$0.replace(/<br>- /g, "</p><p>- ").replace(/<p>- (.+?)<\/p>/g, "<li>$1</li>")}</ul>`;
  const ol = ($0) => `<ol>${$0.replace(/<br>\d+\. /g, "</p><p>1. ").replace(/<p>\d+\. (.+?)<\/p>/g, "<li>$1</li>")}</ol>`;
  var __defProp$5 = Object.defineProperty;
  var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
  var __typeError$4 = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$5 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$5(target, key, result);
    return result;
  };
  var __accessCheck$4 = (obj, member, msg) => member.has(obj) || __typeError$4("Cannot " + msg);
  var __privateGet$4 = (obj, member, getter) => (__accessCheck$4(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd$4 = (obj, member, value) => member.has(obj) ? __typeError$4("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateMethod$2 = (obj, member, method) => (__accessCheck$4(obj, member, "access private method"), method);
  var _handleFocusOut, _SanipadMenu_instances, renderZoomButton_fn, changeTarget_fn;
  const TAG_NAME$5 = "sanipad-menu";
  const HELP_CONTENT = b`${o(parseSimpleMarkdown(HELP_MD))}`;
  const STYLE$5 = i$4`
  :host {
    display: flex;
    align-items: end;
    gap: 5px;
    padding: 15px 5px 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    user-select: none;
    pointer-events: auto;
    transition: opacity 0.3s ease;
  }
  :host(:not([active])) {
    opacity: 0;
    padding-top: 0;
  }
  button {
    margin: 0;
    height: 20px;
    &:hover {
      height: 30px;
    }
  }
`;
  let SanipadMenu = class extends i$1 {
    constructor() {
      super(...arguments);
      __privateAdd$4(this, _SanipadMenu_instances);
      this.active = false;
      __privateAdd$4(this, _handleFocusOut, (_e) => {
        if (!this.matches(":hover, :active, :focus")) {
          this._dialog.open = false;
        }
      });
    }
    get parentArea() {
      return this.closest("sanipad-area");
    }
    get fitTarget() {
      return this.parentArea.fitTarget;
    }
    set fitTarget(val) {
      this.parentArea.fitTarget = val;
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("blur", __privateGet$4(this, _handleFocusOut), { capture: true });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("blur", __privateGet$4(this, _handleFocusOut), { capture: true });
    }
    render() {
      return b`
      <button type="button" @click=${() => __privateMethod$2(this, _SanipadMenu_instances, changeTarget_fn).call(this, "head")}>
        <ui-icon type="arrow-up"></ui-icon>
        トップ
      </button>
      <button type="button" @click=${() => __privateMethod$2(this, _SanipadMenu_instances, changeTarget_fn).call(this, "foot")}>
        <ui-icon type="arrow-down"></ui-icon>
        お知らせ
      </button>
      ${__privateMethod$2(this, _SanipadMenu_instances, renderZoomButton_fn).call(this)}
      <button type="button" @click=${() => this._dialog.show()}>
        <ui-icon type="help"></ui-icon>
        使い方
      </button>
      <sanipad-dialog>${HELP_CONTENT}</sanipad-dialog>
    `;
    }
  };
  _handleFocusOut = new WeakMap();
  _SanipadMenu_instances = new WeakSet();
  renderZoomButton_fn = function() {
    if (!(isAppWindow() || isPopupWindow())) {
      if (this.fitTarget !== "body") return null;
      return b`
        <button type="button" @click=${() => __privateMethod$2(this, _SanipadMenu_instances, changeTarget_fn).call(this, "body")}>
          <ui-icon type="zoom-in"></ui-icon>
          集中モード
        </button>
      `;
    }
    return [100, 90, 80, 70, 60, 50].map((percent) => {
      const labelText = `${percent}%`;
      const key = labelText.slice(-3, -2);
      const labelHTML = o(labelText.replace(key, `<kbd>${key}</kbd>`));
      return b`
        <button
          type="button"
          accesskey=${String(percent).slice(-2, -1)}
          title="ショートカット: Alt + ${key}"
          @click=${() => {
      __privateMethod$2(this, _SanipadMenu_instances, changeTarget_fn).call(this, "body");
      this.parentArea.resize(percent);
    }}
        >
          <ui-icon type="zoom-in"></ui-icon>
          ${labelHTML}
        </button>
      `;
    });
  };
  changeTarget_fn = function(value) {
    if (this.fitTarget === value) {
      this.parentArea.adjust();
    } else {
      this.fitTarget = value;
      this.requestUpdate();
    }
  };
  SanipadMenu.styles = [STYLE$5, BUTTON_STYLE];
  __decorateClass$5([
    e$3("sanipad-dialog")
  ], SanipadMenu.prototype, "_dialog", 2);
  __decorateClass$5([
    n2({ type: Boolean, reflect: true })
  ], SanipadMenu.prototype, "active", 2);
  SanipadMenu = __decorateClass$5([
    t$1(TAG_NAME$5)
  ], SanipadMenu);
  const context = new AudioContext();
  (() => {
    const unlock = async () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keyup", unlock);
      if (context.state === "suspended") await context.resume();
    };
    window.addEventListener("click", unlock);
    window.addEventListener("keyup", unlock);
  })();
  const setFrequency = (frequency, data, { startTime, duration = 1, bend = 1 }) => {
    startTime ??= context.currentTime;
    Object.entries(data).forEach(([pos, freq]) => {
      if (Number(pos) === 0) {
        frequency.setValueAtTime(freq * bend, startTime);
      } else {
        frequency.exponentialRampToValueAtTime(
          freq * bend,
          startTime + duration * Number(pos)
        );
      }
    });
  };
  let reverbBuffer;
  const createReverb = (length = 1) => {
    length *= context.sampleRate;
    if (!reverbBuffer) {
      reverbBuffer = context.createBuffer(2, length, context.sampleRate);
      for (let channel = 0; channel < 2; channel++) {
        const data = reverbBuffer.getChannelData(channel);
        for (let i3 = 0; i3 < length; i3++) {
          data[i3] = (Math.random() * 2 - 1) * Math.pow(1 - i3 / length, 2);
        }
      }
    }
    const convolver = context.createConvolver();
    convolver.buffer = reverbBuffer;
    return convolver;
  };
  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const noteToFreq = (note) => {
    const match = /^([A-G]#?)(\d)$/.exec(note);
    if (!match) return 440;
    const [, name, octaveStr] = match;
    const octave = parseInt(octaveStr, 10);
    const semitones = notes.indexOf(name) + (octave - 4) * 12 - 9;
    return 440 * Math.pow(2, semitones / 12);
  };
  const playBeep = async (frequency = 880, options = {}) => {
    if (context.state !== "running") return;
    if (typeof frequency === "string") frequency = noteToFreq(frequency);
    const { type = "sine", duration = 0.2, volume = 0.3 } = options;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, context.currentTime);
    gain.gain.setValueAtTime(volume, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-4, context.currentTime + duration);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + duration);
    await sleep(duration * 1e3);
  };
  const playBeeps = async (freqs, options = {}) => {
    if (context.state !== "running") return;
    const { delay = 0.1 } = options;
    const lastIndex = freqs.length - 1;
    for (let i3 = 0; i3 < freqs.length; i3++) {
      const promise = playBeep(freqs[i3], options);
      await (i3 === lastIndex ? promise : sleep(delay * 1e3));
    }
  };
  const playBell = async (baseFreq, options = {}) => {
    if (context.state !== "running") return;
    baseFreq = typeof baseFreq === "string" ? noteToFreq(baseFreq) : baseFreq ?? 880;
    const { duration = 2, volume = 0.3 } = options;
    const now = context.currentTime;
    const mainGain = context.createGain();
    mainGain.connect(context.destination);
    const ratios = [1, 1.5, 2, 2.51, 3.2];
    const oscs = ratios.map((ratio, i3) => {
      const osc = context.createOscillator();
      const g2 = context.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq * ratio, now);
      g2.gain.setValueAtTime(volume * 0.6 / (i3 + 1), now);
      g2.gain.exponentialRampToValueAtTime(1e-3, now + duration / (i3 + 1));
      osc.connect(g2);
      return { osc, g: g2 };
    });
    const masterEnv = context.createGain();
    oscs.forEach(({ g: g2 }) => g2.connect(masterEnv));
    masterEnv.gain.setValueAtTime(0, now);
    masterEnv.gain.linearRampToValueAtTime(volume, now + 5e-3);
    masterEnv.gain.exponentialRampToValueAtTime(1e-3, now + duration);
    const hpFilter = context.createBiquadFilter();
    hpFilter.type = "highpass";
    hpFilter.frequency.value = 150;
    masterEnv.connect(hpFilter);
    hpFilter.connect(mainGain);
    const reverb = createReverb(3);
    const reverbGain = context.createGain();
    reverbGain.gain.value = 0.3;
    masterEnv.connect(mainGain);
    masterEnv.connect(reverb);
    reverb.connect(reverbGain);
    reverbGain.connect(mainGain);
    oscs.forEach(({ osc }) => {
      osc.start(now);
      osc.stop(now + duration);
    });
    await sleep(duration * 1e3);
  };
  const playBells = async (baseFreqs, options = {}) => {
    if (context.state !== "running") return;
    const { duration = 2 } = options;
    const { delay = duration * 0.3 } = options;
    const lastIndex = baseFreqs.length - 1;
    for (let i3 = 0; i3 < baseFreqs.length; i3++) {
      const promise = playBell(baseFreqs[i3], { ...options, duration });
      await (i3 === lastIndex ? promise : sleep(delay * 1e3));
    }
  };
  const playBirdChirp = async (baseFreq, options = {}) => {
    if (context.state !== "running") return;
    baseFreq ??= 3e3 + Math.random() * 1e3;
    const { duration = 0.05 + Math.random() * 0.1, volume = 0.3 } = options;
    const now = context.currentTime;
    const mainGain = context.createGain();
    mainGain.connect(context.destination);
    const osc = context.createOscillator();
    osc.type = "sine";
    setFrequency(
      osc.frequency,
      {
        0: baseFreq,
        0.2: baseFreq * 1.5,
        0.5: baseFreq * 0.8,
        1: baseFreq * 1.2
      },
      { startTime: now, duration }
    );
    const env = context.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(volume, now + 0.01);
    env.gain.exponentialRampToValueAtTime(0.01, now + duration);
    const reverb = createReverb();
    const reverbGain = context.createGain();
    reverbGain.gain.value = 0.1;
    osc.connect(env);
    env.connect(mainGain);
    env.connect(reverb);
    reverb.connect(reverbGain);
    reverbGain.connect(mainGain);
    osc.start(now);
    osc.stop(now + duration);
    await sleep(duration * 1e3);
  };
  const playBirdSong = async (baseFreq, options = {}) => {
    if (context.state !== "running") return;
    baseFreq ??= 3500;
    const { duration = 0.5 } = options;
    const promises = [];
    for (let i3 = 0; i3 < 3; i3++) {
      const isLast = i3 >= 2;
      const dur = duration * (isLast ? 0.4 : 0.3) + Math.random() * 0.1;
      const freq = baseFreq + (isLast ? 1e3 : 0) + Math.random() * 500;
      promises.push(playBirdChirp(freq, { ...options, duration: dur }));
      if (i3 < 2) await sleep(30 + Math.random() * 80);
    }
    await Promise.all(promises);
  };
  const playMeow = async ({ duration, bend, volume } = {}) => {
    if (context.state !== "running") return;
    duration ??= 1 + Math.random() * 0.4;
    bend ??= 0.9 + Math.random() * 0.2;
    volume ??= 0.2 + Math.random() * 0.2;
    const now = context.currentTime;
    const mainGain = context.createGain();
    mainGain.connect(context.destination);
    const oscs = [
      { type: "sawtooth", detune: 0, gain: 0.6 },
      { type: "square", detune: 5, gain: 0.3 },
      { type: "triangle", detune: -5, gain: 0.4 }
    ].map((params) => {
      return createCatOscillator({ ...params, startTime: now, duration, bend });
    });
    const filters = [
      { qValue: 5, data: { 0: 3400, 0.25: 2300, 0.5: 1200, 1: 550 } },
      { qValue: 4, data: { 0: 4e3, 1: 400 } },
      { qValue: 6, data: { 0: 1800, 1: 800 } }
    ].map(({ qValue, data }) => {
      const filter = context.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = qValue;
      setFrequency(filter.frequency, data, { startTime: now, duration, bend });
      return filter;
    });
    const hpFilter = context.createBiquadFilter();
    hpFilter.type = "highpass";
    hpFilter.frequency.value = 200;
    const filterMix = context.createGain();
    filters.forEach((f2) => f2.connect(filterMix));
    filterMix.gain.value = Math.sqrt(filters.length);
    filterMix.connect(hpFilter);
    const lfo = context.createOscillator();
    lfo.frequency.setValueAtTime(32, now);
    const lfoGain = context.createGain();
    lfoGain.gain.setValueAtTime(0.2, now);
    lfo.connect(lfoGain);
    const env = context.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(volume, now + duration * 0.1);
    env.gain.exponentialRampToValueAtTime(volume / 2, now + duration * 0.5);
    env.gain.exponentialRampToValueAtTime(0.01, now + duration);
    const reverb = createReverb();
    const reverbGain = context.createGain();
    reverbGain.gain.value = 0.15;
    env.connect(mainGain);
    env.connect(reverb);
    reverb.connect(reverbGain);
    reverbGain.connect(mainGain);
    hpFilter.connect(env);
    oscs.forEach(({ osc, g: g2 }) => {
      lfoGain.connect(g2.gain);
      filters.forEach((f2) => g2.connect(f2));
      osc.start(now);
      osc.stop(now + duration);
    });
    await sleep(duration * 1e3);
  };
  const createCatOscillator = ({
    type = "sine",
    startTime,
    duration = 1,
    detune = 0,
    gain = 0.5,
    bend = 1
  }) => {
    startTime ??= context.currentTime;
    const osc = context.createOscillator();
    osc.type = type;
    osc.detune.setValueAtTime(detune, startTime);
    setFrequency(
      osc.frequency,
      { 0: 680, 0.1: 760, 0.6: 600, 0.8: 440, 1: 150 },
      { startTime, duration, bend }
    );
    const g2 = context.createGain();
    g2.gain.setValueAtTime(gain, startTime);
    osc.connect(g2);
    return { osc, g: g2 };
  };
  const NOTIFICATION_SOUNDS = Object.freeze({
    Bell: "🔔",
    Song: "🕊️",
    Meow: "🐱"
  });
  class NotificationController {
    constructor(host, hasCompleted) {
      this.soundOptions = NOTIFICATION_SOUNDS;
      this.#interval = null;
      this.sound = "Bell";
      (this.#host = host).addController(this);
      this.#hasCompleted = hasCompleted;
    }
    #host;
    #interval;
    #hasCompleted;
    hostDisconnected() {
      this.stop();
    }
    get isPlaying() {
      return this.#interval !== null;
    }
    play() {
      if (this.#interval) return;
      this.#executeSound();
      this.#interval = setInterval(() => {
        if (this.#hasCompleted()) {
          this.#executeSound();
        } else {
          this.stop();
        }
      }, 3600);
    }
    stop() {
      if (this.#interval) {
        clearInterval(this.#interval);
        this.#interval = null;
        this.#host.requestUpdate();
      }
    }
    #executeSound() {
      const currentInterval = this.#interval;
      switch (this.sound) {
        case "Bell":
          playBells(["G6", "G6", "G6"], { duration: 2, delay: 0.3 });
          break;
        case "Song":
          playBirdSong(2500 + Math.random() * 1500, { volume: 0.1 + Math.random() * 0.2 });
          sleep((1 + Math.random()) * 700).then(() => {
            if (this.#interval === currentInterval) {
              playBirdSong(3e3 + Math.random() * 1e3, {
                volume: 0.05 + Math.random() * 0.1
              });
            }
          });
          break;
        case "Meow":
          playMeow({ volume: 0.2 + Math.random() * 0.2 });
          sleep((1 + Math.random()) * 700).then(() => {
            if (this.#interval === currentInterval) {
              playMeow({
                duration: 0.5 + Math.random() * 0.5,
                volume: 0.1 + Math.random() * 0.1,
                bend: 0.8 + Math.random() * 0.4
              });
            }
          });
          break;
      }
    }
  }
  class MultiTimerController {
    #host;
    #notification;
    #lastCompletedState = false;
    #timerId = null;
    get soundOptions() {
      return this.#notification.soundOptions;
    }
    constructor(host) {
      (this.#host = host).addController(this);
      this.#notification = new NotificationController(host, () => this.hasCompletedItems);
    }
    hostConnected() {
      this.#timerId = setInterval(this.#updateTitle, 100);
    }
    hostDisconnected() {
      if (this.#timerId) clearInterval(this.#timerId);
      this.#timerId = null;
    }
    hostUpdated() {
      const currentCompleted = this.hasCompletedItems;
      if (currentCompleted !== this.#lastCompletedState || currentCompleted) {
        this.checkStatus();
        this.#lastCompletedState = currentCompleted;
      }
    }
    get items() {
      return Array.from(this.#host._items);
    }
    get timers() {
      return Array.from(this.#host._items, (it) => it._timer);
    }
    get hasCompletedItems() {
      return this.items.some((it) => it._timer.isCompleted);
    }
    get sound() {
      return this.#notification.sound;
    }
    set sound(value) {
      this.#notification.sound = value;
    }
    playSound() {
      this.#notification.stop();
      this.#notification.play();
    }
    stopAllNotifications() {
      this.#notification.stop();
    }
    checkStatus() {
      if (this.hasCompletedItems) {
        this.#notification.play();
      } else {
        this.#notification.stop();
      }
    }
    #updateTitle = () => {
      const timer = this.timers.reduce(
        (previousValue, currentValue) => {
          if (!previousValue.isRunning) return currentValue;
          if (!currentValue.isRunning) return previousValue;
          return currentValue.endTime < previousValue.endTime ? currentValue : previousValue;
        }
      );
      const remaining = timer.isRunning ? ` ⌛️ ${timer.formatRemaining()}` : "";
      document.title = document.title.replace(/\s*⌛️.+$|$/, remaining);
    };
  }
  const getKey = (origin) => {
    return origin.id ? `${origin.localName}#${origin.id}` : origin.localName;
  };
  class StorageController {
    #host;
    #timers = {};
    constructor(host) {
      (this.#host = host).addController(this);
    }
    hostConnected() {
      this.#host.addEventListener("request-save", this.#handleSave);
    }
    hostDisconnected() {
      this.#host.removeEventListener("request-save", this.#handleSave);
      Object.values(this.#timers).forEach(clearTimeout);
      this.#timers = {};
    }
    #handleSave = (e2) => {
      e2.stopPropagation();
      const { immediate } = e2.detail;
      if (immediate) this.save();
      else this.requestSave();
    };
    #clearTimer() {
      const key = getKey(this.#host);
      if (this.#timers[key]) {
        clearTimeout(this.#timers[key]);
        delete this.#timers[key];
      }
      return key;
    }
    requestSave() {
      const key = this.#clearTimer();
      this.#timers[key] = setTimeout(() => this.save(), 200);
    }
    save() {
      const key = this.#clearTimer();
      const data = this.#host.serialize();
      if (data !== null) {
        try {
          const serializedData = JSON.stringify(data);
          localStorage.setItem(key, serializedData);
        } catch (error) {
          console.error("[StorageController] 保存に失敗しました:", error);
        }
      } else {
        localStorage.removeItem(key);
      }
    }
    load() {
      const key = getKey(this.#host);
      try {
        const data = localStorage.getItem(key);
        if (data) this.#host.unserialize(JSON.parse(data));
      } catch (error) {
        console.error("[StorageController] 復元に失敗しました:", error);
      }
    }
  }
  class RequestSaveEvent extends CustomEvent {
    constructor(detail) {
      super("request-save", { bubbles: true, composed: true, detail });
    }
  }
  const requestSave = (origin, immediate = false) => {
    origin.dispatchEvent(new RequestSaveEvent({ immediate }));
  };
  const INPUT_STYLE = i$4`
  :where(
    input:not(
      [type='hidden'],
      [type='checkbox'],
      [type='radio'],
      [type='button'],
      [type='submit'],
      [type='reset']
    )
  ) {
    all: unset;
    display: inline-block;

    &:is([hidden], #_#_#_#_#_) {
      display: none;
    }

    margin: 2px;
    padding: 0.2em;
    border: 1px solid #aaa;
    border-radius: 1px;
    color: #333;
    background: #fff;
    box-sizing: border-box;
    contain: paint;

    &::selection {
      color: currentColor;
      background: #cef;
    }

    cursor: text;
    pointer-events: auto;

    &:is([disabled], #_#_#_#_#_) {
      cursor: default;
      pointer-events: none;
      filter: contrast(25%) brightness(150%);
    }

    &:where(:not([disabled])) {
      transition:
        all 0.2s ease-out,
        outline 0s;

      &:where(:focus-visible, :active) {
        outline: 2px solid #4f88;
      }
    }
  }
`;
  var __defProp$4 = Object.defineProperty;
  var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
  var __typeError$3 = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$4 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$4(target, key, result);
    return result;
  };
  var __accessCheck$3 = (obj, member, msg) => member.has(obj) || __typeError$3("Cannot " + msg);
  var __privateGet$3 = (obj, member, getter) => (__accessCheck$3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd$3 = (obj, member, value) => member.has(obj) ? __typeError$3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateMethod$1 = (obj, member, method) => (__accessCheck$3(obj, member, "access private method"), method);
  var _SanipadTimer_instances, renderItem_fn, renderDialogContent_fn, renderSoundSelect_fn, _handleSoundClick, _handleLabelChange, _handleStart, _handleStartIfEnter, _handleStop, _applyPreset$1, _handleItemClick, _handleTimerDone, _updateTimer;
  const TAG_NAME$4 = "sanipad-timer";
  const DEFAULT_LABELS = Object.freeze(
    Array.from("壱弐参四五六七八九十", (c2) => `砂時計 ${c2}`)
  );
  const STYLE$4 = i$4`
  :host {
    display: flex;
    align-items: end;
    justify-content: space-around;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    padding: 0 20px 30px;
  }
  :host([active]) {
    pointer-events: auto;
  }
  h1 {
    display: flex;
    input {
      flex: 1;
      min-width: 10em;
    }
  }
  button {
    min-width: 5em;
  }
  label {
    display: flex;
  }
  .inputs,
  .buttons,
  .sounds {
    display: flex;
    gap: 0.5em;
    margin: 0.5em 0;
  }
  .start {
    flex: 1;
    gap: 0.5em;
  }
  .close {
    margin-left: auto;
  }
`;
  let SanipadTimer = class extends i$1 {
    constructor() {
      super(...arguments);
      __privateAdd$3(this, _SanipadTimer_instances);
      this._multiTimer = new MultiTimerController(this);
      this._storage = new StorageController(this);
      this.active = false;
      this._labels = Array.from(DEFAULT_LABELS);
      this._currentItem = null;
      __privateAdd$3(this, _handleSoundClick, () => {
        sleep(10).then(() => this._multiTimer.playSound());
      });
      __privateAdd$3(this, _handleLabelChange, () => {
        const item = this._currentItem;
        if (!item) return;
        const input = this._labelInput;
        const newLabel = input.value.trim() || DEFAULT_LABELS[Array.from(this._items).indexOf(item)];
        item.label = newLabel;
        input.value = newLabel;
        this._labels = Array.from(this._items, (it) => it.label);
        this._storage.requestSave();
      });
      __privateAdd$3(this, _handleStart, () => {
        const timer = this._currentItem?._timer;
        if (!timer || timer.remaining > 0 || timer.total <= 0) return;
        playBeeps(["C5", "G5"]);
        timer.start();
        this._dialog.hide();
        this.requestUpdate();
        this._storage.requestSave();
      });
      __privateAdd$3(this, _handleStartIfEnter, (e2) => {
        if (e2.key === "Enter") __privateGet$3(this, _handleStart).call(this);
      });
      __privateAdd$3(this, _handleStop, () => {
        const timer = this._currentItem?._timer;
        if (!timer) return;
        playBeeps(["F5", "A4"]);
        timer.reset();
        this.requestUpdate();
        this.updateComplete.then(() => this._timeInput.focus());
        this._storage.requestSave();
      });
      __privateAdd$3(this, _applyPreset$1, (e2) => {
        const item = this._currentItem;
        if (!item) return;
        const { label, seconds } = e2.detail;
        item.label = label;
        item._timer.total = seconds * 1e3;
        this._labelInput.value = label;
        this._labels = Array.from(this._items, (it) => it.label);
        this._storage.requestSave();
      });
      __privateAdd$3(this, _handleItemClick, (e2) => {
        const target = e2.currentTarget;
        this._currentItem = target;
        target.blur();
        this._dialog.show();
        this.updateComplete.then(() => this._timeInput.focus());
      });
      __privateAdd$3(this, _handleTimerDone, () => {
        this.requestUpdate();
        this._storage.requestSave();
      });
      __privateAdd$3(this, _updateTimer, () => {
        const item = this._currentItem;
        if (!item) return;
        const { hours, minutes } = this._timeInput;
        item._timer.total = (hours * 60 + minutes) * 6e4;
        this.requestUpdate();
      });
    }
    serialize() {
      const timers = this._multiTimer.timers.map((timer, i3) => ({
        label: this._labels[i3],
        ...timer.serialize()
      }));
      return { timers, sound: this._multiTimer.sound };
    }
    unserialize(value) {
      this._multiTimer.timers.forEach((timer, i3) => {
        const data = value.timers[i3];
        if (data) {
          timer.unserialize(data);
          this._labels[i3] = data.label ?? this._labels[i3];
        }
      });
      this._multiTimer.sound = value.sound;
      this.requestUpdate();
    }
    render() {
      return b`
      ${this._labels.map((label, i3) => __privateMethod$1(this, _SanipadTimer_instances, renderItem_fn).call(this, label || DEFAULT_LABELS[i3]))}
      <sanipad-dialog>${__privateMethod$1(this, _SanipadTimer_instances, renderDialogContent_fn).call(this)}</sanipad-dialog>
    `;
    }
    firstUpdated(_changedProperties) {
      this.updateComplete.then(() => this._storage.load());
    }
  };
  _SanipadTimer_instances = new WeakSet();
  renderItem_fn = function(label) {
    return b`
      <sanipad-timer-item
        label=${label}
        ?active=${this.active}
        @click=${__privateGet$3(this, _handleItemClick)}
        @timer-done=${__privateGet$3(this, _handleTimerDone)}
      ></sanipad-timer-item>
    `;
  };
  renderDialogContent_fn = function() {
    const item = this._currentItem;
    if (!item) return null;
    const totalMinutes = Math.floor(item._timer.total / 6e4);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const isWorking = item._timer.remaining > 0;
    const isAvailable = !isWorking && item._timer.total > 0;
    return b`
      <h1>
        <input
          type="text"
          name="label"
          .value=${item.label}
          @change=${__privateGet$3(this, _handleLabelChange)}
        />
      </h1>
      <div class="sounds">通知音(共通): ${__privateMethod$1(this, _SanipadTimer_instances, renderSoundSelect_fn).call(this)}</div>
      <div class="inputs">
        <ui-time-input
          autofocus
          hours=${hours}
          minutes=${minutes}
          ?disabled=${isWorking}
          @input=${__privateGet$3(this, _updateTimer)}
          @keydown=${__privateGet$3(this, _handleStartIfEnter)}
        ></ui-time-input>
        <button
          class="start"
          type="button"
          ?disabled=${!isAvailable}
          @click=${__privateGet$3(this, _handleStart)}
        >
          開始
          <small>(${item._timer.formatCompletion()} 完了予定)</small>
        </button>
      </div>
      <div class="buttons">
        <button
          class="stop"
          type="button"
          ?hidden=${!isWorking}
          @click=${__privateGet$3(this, _handleStop)}
        >
          停止
        </button>
        <button class="close" type="button" @click=${() => this._dialog.hide()}>
          閉じる
        </button>
      </div>
      ${!isWorking ? b`
            <h2>既定値から入力</h2>
            <sanipad-timer-presets
              @apply-preset=${__privateGet$3(this, _applyPreset$1)}
            ></sanipad-timer-presets>
          ` : ""}
    `;
  };
  renderSoundSelect_fn = function() {
    return Object.entries(this._multiTimer.soundOptions).map(
      ([key, icon]) => b`
        <label>
          <input
            type="radio"
            name="sound"
            .checked=${this._multiTimer.sound === key}
            @click="${__privateGet$3(this, _handleSoundClick)}"
            @change=${() => {
      this._multiTimer.sound = key;
      this._storage.requestSave();
    }}
          />${icon}
        </label>
      `
    );
  };
  _handleSoundClick = new WeakMap();
  _handleLabelChange = new WeakMap();
  _handleStart = new WeakMap();
  _handleStartIfEnter = new WeakMap();
  _handleStop = new WeakMap();
  _applyPreset$1 = new WeakMap();
  _handleItemClick = new WeakMap();
  _handleTimerDone = new WeakMap();
  _updateTimer = new WeakMap();
  SanipadTimer.styles = [STYLE$4, BUTTON_STYLE, INPUT_STYLE];
  __decorateClass$4([
    n2({ type: Boolean, reflect: true })
  ], SanipadTimer.prototype, "active", 2);
  __decorateClass$4([
    e$3("sanipad-dialog")
  ], SanipadTimer.prototype, "_dialog", 2);
  __decorateClass$4([
    e$3("ui-time-input")
  ], SanipadTimer.prototype, "_timeInput", 2);
  __decorateClass$4([
    e$3('input[name="label"]')
  ], SanipadTimer.prototype, "_labelInput", 2);
  __decorateClass$4([
    r("sanipad-timer-item")
  ], SanipadTimer.prototype, "_items", 2);
  __decorateClass$4([
    r$1()
  ], SanipadTimer.prototype, "_labels", 2);
  __decorateClass$4([
    r$1()
  ], SanipadTimer.prototype, "_currentItem", 2);
  SanipadTimer = __decorateClass$4([
    t$1(TAG_NAME$4)
  ], SanipadTimer);
  class TimerController {
    constructor(host) {
      this.#timerId = null;
      this.total = 0;
      this.remaining = 0;
      this.endTime = 0;
      this.start = (msec) => {
        this.#clearTimer();
        if (typeof msec === "number") this.total = msec || 0;
        this.endTime = Date.now() + this.total;
        this.#setTimer();
      };
      this.restart = () => {
        this.#clearTimer();
        this.endTime = Date.now() + this.remaining;
        this.#setTimer();
      };
      this.resume = () => {
        this.#clearTimer();
        this.#setTimer();
      };
      this.stop = () => {
        this.#clearTimer();
        this.remaining = Math.max(0, this.endTime - Date.now());
        this.#host.requestUpdate();
      };
      this.reset = () => {
        this.#clearTimer();
        this.remaining = 0;
        this.endTime = 0;
        this.#host.requestUpdate();
      };
      this.formatRemaining = () => {
        const seconds = Math.floor(this.remaining / 1e3);
        if (seconds <= 0) return "0s";
        const h2 = Math.floor(seconds / 3600);
        const m2 = Math.floor(seconds % 3600 / 60);
        const s2 = seconds % 60;
        const parts = [];
        if (h2 > 0) parts.push(h2 + "h");
        if (m2 > 0) parts.push(m2 + "m");
        if (h2 < 1) parts.push(s2 + "s");
        return parts.join(" ");
      };
      this.formatCompletion = () => {
        const d2 = new Date();
        d2.setTime(
          this.remaining > 0 ? this.remaining + Date.now() : this.endTime || this.total + Date.now()
        );
        return d2.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });
      };
      (this.#host = host).addController(this);
    }
    #host;
    #timerId;
    get isCompleted() {
      return this.endTime > 0 && !this.isRunning;
    }
    get isRunning() {
      return this.remaining > 0;
    }
    serialize() {
      const { total, remaining, endTime } = this;
      return { total, remaining, endTime };
    }
    unserialize(value) {
      this.total = value.total;
      this.remaining = value.remaining;
      this.endTime = value.endTime;
      if (this.isRunning) this.resume();
      this.#host.requestUpdate();
    }
    hostDisconnected() {
      this.stop();
    }
    #setTimer() {
      let lastRemaining = "";
      const update = () => {
        this.remaining = this.endTime - Date.now();
        if (this.remaining <= 0) {
          this.stop();
          this.#host.dispatchEvent(new CustomEvent("timer-done"));
        }
        const remaining = this.formatRemaining();
        if (remaining !== lastRemaining) {
          lastRemaining = remaining;
          this.#host.requestUpdate();
        }
      };
      update();
      if (this.remaining > 0) {
        this.#clearTimer();
        this.#timerId = window.setInterval(update, 100);
      }
    }
    #clearTimer() {
      if (this.#timerId) {
        clearInterval(this.#timerId);
        this.#timerId = null;
      }
    }
  }
  const HOURGLASS_SVG = '<svg id="hourglass" viewBox="-40 -40 80 80" style="paint-order: stroke"\r\n  xmlns="http://www.w3.org/2000/svg">\r\n  <g>\r\n    <path\r\n      d="M-25 25l0 4c2 6 48 6 50 0l0-4c-2-6-48-6-50 0z"\r\n      fill="#a98"\r\n      stroke="#333"\r\n      stroke-width="2"\r\n    />\r\n    <path d="M-25 25c2 6 48 6 50 0-2-6-48-6-50 0z" fill="#cba" />\r\n  </g>\r\n  <path\r\n    d="M-16-14c4 9 11 10 16 14 5-4 12-5 16-14-5-4-27-4-32 0zM-17 24c5 2 29 2 34 0-4-6-9-6-17-12-8 6-13 6-17 12z"\r\n    fill="#fc4"\r\n  />\r\n  <path\r\n    d="M-20-25c0 21 15 21 15 25 0 4-15 4-15 25 2 4 38 4 40 0 0-21-15-21-15-25 0-4 15-4 15-25"\r\n    fill="#8ac8"\r\n    stroke="#333"\r\n    stroke-width="1"\r\n    style="paint-order: fill"\r\n  />\r\n  <g>\r\n    <path\r\n      d="M-25-29l0 4c2 4 48 4 50 0l0-4c-2-4-48-4-50 0z"\r\n      fill="#a98"\r\n      stroke="#333"\r\n      stroke-width="2"\r\n    />\r\n    <path d="M-25-29c2 4 48 4 50 0-2-4-48-4-50 0z" fill="#cba" />\r\n  </g>\r\n</svg>\r\n';
  var __defProp$3 = Object.defineProperty;
  var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
  var __typeError$2 = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$3 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$3(target, key, result);
    return result;
  };
  var __accessCheck$2 = (obj, member, msg) => member.has(obj) || __typeError$2("Cannot " + msg);
  var __privateGet$2 = (obj, member, getter) => (__accessCheck$2(obj, member, "read from private field"), member.get(obj));
  var __privateAdd$2 = (obj, member, value) => member.has(obj) ? __typeError$2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet$1 = (obj, member, value, setter) => (__accessCheck$2(obj, member, "write to private field"), member.set(obj, value), value);
  var _hiddenTimer, _handleClick;
  const TAG_NAME$3 = "sanipad-timer-item";
  const HOURGLASS_TEMPLATE = b`${o(HOURGLASS_SVG)}`;
  const STYLE$3 = i$4`
  :host {
    display: block;
    width: 8em;
    white-space: nowrap;
    transition:
      opacity 0.1s ease-out,
      transform 0.1s ease-out;
  }
  :host(:not([active], [completed])) {
    opacity: 0;
    transform: translateY(30px);
  }
  [hidden] {
    display: none !important;
  }
  button {
    all: unset;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    position: relative;
    cursor: pointer;
  }
  svg {
    display: block;
    width: 80px;
    height: 80px;
    pointer-events: auto;
    filter: contrast(130%);
    transition: padding 0.2s ease-in;
  }
  :host(:not([completed], [running])) {
    :hover svg {
      padding-bottom: 10px;
    }
    :is(:hover, :active, :focus, :host([completed])) svg {
      animation: sway 0.5s ease-in infinite;
    }
  }
  span {
    display: flex;
    flex-flow: column;
    align-items: center;
    width: fit-content;
    filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff)
      drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff);
  }
  .remaining,
  .completion,
  .completed {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
  .remaining {
    top: 20px;
    font-weight: bold;
    text-decoration: underline;
  }
  .completion {
    top: 45px;
    font-size: 85%;
    flex-flow: row;
  }
  .completed {
    top: 20px;
    font-weight: bold;
    strong {
      display: block;
      color: #e40;
      border: 1px solid currentColor;
      border-radius: 80% / 100%;
      padding: 0 0.5em;
    }
  }
  @keyframes sway {
    0%,
    100% {
      transform-origin: 50%;
    }
    25% {
      transform-origin: 50% 25%;
      transform: rotate(5deg);
    }
    75% {
      transform-origin: 50% 75%;
      transform: rotate(-5deg);
    }
  }
`;
  let SanipadTimerItem = class extends i$1 {
    constructor() {
      super(...arguments);
      this._timer = new TimerController(this);
      this.active = false;
      this.label = "";
      this.completed = false;
      this.running = false;
      this._hidden = true;
      __privateAdd$2(this, _hiddenTimer);
      __privateAdd$2(this, _handleClick, (e2) => {
        if (this.completed) {
          e2.stopPropagation();
          this._timer.endTime = 0;
          this.requestUpdate();
          requestSave(this);
          this.blur();
        }
      });
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      clearTimeout(__privateGet$2(this, _hiddenTimer));
    }
    willUpdate(changedProperties) {
      if (changedProperties.has("active") && this.active) {
        clearTimeout(__privateGet$2(this, _hiddenTimer));
        this._hidden = false;
      }
      this.completed = this._timer.isCompleted;
      this.running = this._timer.isRunning;
    }
    render() {
      const status = this.completed ? b`<span class="completed">
          <time>${this._timer.formatCompletion()}</time>
          <strong>完了</strong>
        </span>` : this.running ? b`
            <span class="remaining">${this._timer.formatRemaining()}</span>
            <span class="completion">
              <time>${this._timer.formatCompletion()}</time>完了
            </span>
          ` : null;
      return b`
      <button
        type="button"
        aria-label="${this.label} タイマー"
        ?hidden=${this._hidden && !this.completed}
        @click=${__privateGet$2(this, _handleClick)}
      >
        <main class="visual">${HOURGLASS_TEMPLATE}</main>
        <main class="status">
          <span class="label">${this.label}</span>
          ${status}
        </main>
      </button>
    `;
    }
    updated(changedProperties) {
      if (changedProperties.has("active") && !this.active) {
        clearTimeout(__privateGet$2(this, _hiddenTimer));
        __privateSet$1(this, _hiddenTimer, setTimeout(() => this._hidden = true, 200));
      }
    }
  };
  _hiddenTimer = new WeakMap();
  _handleClick = new WeakMap();
  SanipadTimerItem.styles = STYLE$3;
  __decorateClass$3([
    n2({ type: Boolean, reflect: true })
  ], SanipadTimerItem.prototype, "active", 2);
  __decorateClass$3([
    n2({ type: String, reflect: true })
  ], SanipadTimerItem.prototype, "label", 2);
  __decorateClass$3([
    n2({ type: Boolean, reflect: true })
  ], SanipadTimerItem.prototype, "completed", 2);
  __decorateClass$3([
    n2({ type: Boolean, reflect: true })
  ], SanipadTimerItem.prototype, "running", 2);
  __decorateClass$3([
    e$3("button")
  ], SanipadTimerItem.prototype, "_button", 2);
  __decorateClass$3([
    r$1()
  ], SanipadTimerItem.prototype, "_hidden", 2);
  SanipadTimerItem = __decorateClass$3([
    t$1(TAG_NAME$3)
  ], SanipadTimerItem);
  const PRESETS = {
    維新の記憶: {
      "鳥羽・伏見の戦い": 10 * 60,
      世直し一揆: 30 * 60,
      甲州勝沼の戦い: 20 * 60,
      白河戦線: 1 * 60 * 60
    },
    江戸の記憶: {
      公武合体運動: 1.5 * 60 * 60,
      加役方人足寄場: 3 * 60 * 60,
      享保の大飢饉: 2 * 60 * 60,
      天下泰平: 2.5 * 60 * 60
    },
    織豊の記憶: {
      美濃国の決戦: 4 * 60 * 60,
      反旗を翻した原因: 3 * 60 * 60,
      安土城の警備: 10 * 60 * 60,
      天下布武: 8 * 60 * 60
    },
    戦国の記憶: {
      長篠城攻城戦: 2 * 60 * 60,
      西上作戦: 5 * 60 * 60,
      甲相駿三国同盟: 12 * 60 * 60,
      比叡山延暦寺: 6 * 60 * 60
    },
    武家の記憶: {
      鎌倉防衛戦: 12 * 60 * 60,
      元寇防塁: 18 * 60 * 60,
      流鏑馬揃え: 15 * 60 * 60,
      奥州合戦: 24 * 60 * 60
    },
    その他: {
      内番: 20 * 60 * 60,
      修行: 96 * 60 * 60,
      自動周回: 60 * 60
    }
  };
  var __defProp$2 = Object.defineProperty;
  var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
  var __typeError$1 = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$2 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$2(target, key, result);
    return result;
  };
  var __accessCheck$1 = (obj, member, msg) => member.has(obj) || __typeError$1("Cannot " + msg);
  var __privateGet$1 = (obj, member, getter) => (__accessCheck$1(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd$1 = (obj, member, value) => member.has(obj) ? __typeError$1("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateMethod = (obj, member, method) => (__accessCheck$1(obj, member, "access private method"), method);
  var _SanipadTimerPresets_instances, renderCategory_fn, renderButton_fn, _applyPreset, _closeOtherDetails;
  const TAG_NAME$2 = "sanipad-timer-presets";
  const STYLE$2 = i$4`
  ul,
  li,
  details,
  summary {
    all: unset;
  }
  :host {
    display: block;
    user-select: none;
  }
  :host > ul {
    display: grid;
    gap: 0.5em;
    grid-template: repeat(5, auto) / auto 1fr;
    & > :has([open]) {
      grid-column: 2;
      grid-row: 1 / -1;
    }
    & > :where(:nth-child(1)) {
      grid-row: 1;
    }
    & > :where(:nth-child(2)) {
      grid-row: 2;
    }
    & > :where(:nth-child(3)) {
      grid-row: 3;
    }
    & > :where(:nth-child(4)) {
      grid-row: 4;
    }
    & > :where(:nth-child(5)) {
      grid-row: 5;
    }
  }
  details {
    display: block;
    border: 1px solid #ccc;
    border-radius: 1px;
    summary {
      display: flex;
      padding: 0.2em 0;
      padding-right: 0.5em;
      cursor: pointer;
    }
    ul {
      display: block;
      margin: 0.5em;
    }
    li {
      display: flex;
    }
  }
  button {
    flex: 1;
    justify-content: space-between;
    gap: 0.5em;
    padding: 0.2em 0.5em;
  }
  ui-icon {
    display: none;
  }
  details[open] ui-icon.open {
    display: inline-block;
  }
  details:not([open]) ui-icon.close {
    display: inline-block;
  }
`;
  class ApplyPresetEvent extends CustomEvent {
    constructor(label, seconds) {
      super("apply-preset", { detail: { label, seconds } });
    }
  }
  let SanipadTimerPresets = class extends i$1 {
    constructor() {
      super(...arguments);
      __privateAdd$1(this, _SanipadTimerPresets_instances);
      __privateAdd$1(this, _applyPreset, (label, seconds) => {
        this.dispatchEvent(new ApplyPresetEvent(label, seconds));
        this._details.forEach((el) => el.open = false);
      });
      __privateAdd$1(this, _closeOtherDetails, (e2) => {
        const target = e2.target;
        this._details.forEach((details) => {
          if (details.open && !details.contains(target)) {
            details.open = false;
          }
        });
      });
    }
    render() {
      return b`
      <ul>
        ${Object.entries(PRESETS).map(
      ([category, data]) => b` <li>${__privateMethod(this, _SanipadTimerPresets_instances, renderCategory_fn).call(this, category, data)}</li> `
    )}
      </ul>
    `;
    }
  };
  _SanipadTimerPresets_instances = new WeakSet();
  renderCategory_fn = function(category, data) {
    return b`
      <details>
        <summary @click=${__privateGet$1(this, _closeOtherDetails)}>
          <ui-icon class="close" type="arrow-right"></ui-icon>
          <ui-icon class="open" type="arrow-down"></ui-icon>
          ${category}
        </summary>
        <ul>
          ${Object.entries(data).map(
    ([label, sec]) => b`<li>${__privateMethod(this, _SanipadTimerPresets_instances, renderButton_fn).call(this, label, sec)}</li>`
  )}
        </ul>
      </details>
    `;
  };
  renderButton_fn = function(label, sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor(sec % 3600 / 60);
    const time = [`${hours}h`, `${minutes}m`].filter((s2) => s2[0] !== "0").join(" ");
    return b`
      <button @click=${() => __privateGet$1(this, _applyPreset).call(this, label, sec)}>
        ${label} <small>(${time})</small>
      </button>
    `;
  };
  _applyPreset = new WeakMap();
  _closeOtherDetails = new WeakMap();
  SanipadTimerPresets.styles = [STYLE$2, BUTTON_STYLE];
  __decorateClass$2([
    r("details")
  ], SanipadTimerPresets.prototype, "_details", 2);
  SanipadTimerPresets = __decorateClass$2([
    t$1(TAG_NAME$2)
  ], SanipadTimerPresets);
  var __defProp$1 = Object.defineProperty;
  var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __decorateClass$1 = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp$1(target, key, result);
    return result;
  };
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
  var _isUserAction, _doneUserAction, _handleFocusout;
  const TAG_NAME$1 = "ui-time-input";
  const STYLE$1 = i$4`
  :host {
    display: inline-flex;
    gap: 0.5em;
  }
  input {
    width: 3em;
  }
`;
  let TimeInput = class extends i$1 {
    constructor() {
      super(...arguments);
      this.autofocus = false;
      this.disabled = false;
      this.readonly = false;
      this.hours = 0;
      this.minutes = 0;
      __privateAdd(this, _isUserAction, false);
      __privateAdd(this, _doneUserAction, false);
      __privateAdd(this, _handleFocusout, (e2) => {
        if (this.contains(e2.relatedTarget)) return;
        if (__privateGet(this, _doneUserAction)) {
          __privateSet(this, _doneUserAction, false);
          const { hours, minutes } = this;
          this.dispatchEvent(new CustomEvent("change", { detail: { hours, minutes } }));
        }
      });
    }
    connectedCallback() {
      super.connectedCallback();
      super.addEventListener("focusout", __privateGet(this, _handleFocusout));
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      super.removeEventListener("focusout", __privateGet(this, _handleFocusout));
    }
    focus(options) {
      this.updateComplete.then(() => this._hoursInput?.focus(options));
    }
    willUpdate(changedProperties) {
      if (changedProperties.has("hours") || changedProperties.has("minutes")) {
        const step = parseInt(this._minutesInput?.step || "1");
        let { hours, minutes } = this;
        if (hours > 99) {
          hours = 99;
        } else if (hours < 0) {
          hours = 0;
        }
        if (minutes >= 60) {
          if (hours < 99) {
            hours++;
            minutes = 0;
          } else {
            minutes = 59;
          }
        } else if (minutes < 0) {
          if (hours > 0) {
            hours--;
            minutes = 60 - step;
          } else {
            minutes = 0;
          }
        }
        this.hours = hours;
        this.minutes = minutes;
        if (__privateGet(this, _isUserAction)) {
          __privateSet(this, _isUserAction, false);
          __privateSet(this, _doneUserAction, true);
          this.updateComplete.then(() => {
            const { hours: hours2, minutes: minutes2 } = this;
            this.dispatchEvent(new CustomEvent("input", { detail: { hours: hours2, minutes: minutes2 } }));
          });
        }
      }
    }
    render() {
      return b`
      <label>
        <input
          name="hours"
          type="number"
          min="0"
          max="99"
          step="1"
          value="0"
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @focus=${(e2) => e2.target.select()}
          @input=${() => {
      this.hours = Number(this._hoursInput.value);
      __privateSet(this, _isUserAction, true);
    }}
        />h
      </label>
      <label>
        <input
          name="minutes"
          type="number"
          min="-10"
          max="60"
          step="10"
          value="0"
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @focus=${(e2) => e2.target.select()}
          @input=${() => {
      this.minutes = Number(this._minutesInput.value);
      __privateSet(this, _isUserAction, true);
    }}
        />m
      </label>
    `;
    }
    updated(_changedProperties) {
      if (Number(this._hoursInput.value) !== this.hours) {
        this._hoursInput.value = String(this.hours);
      }
      if (Number(this._minutesInput.value) !== this.minutes) {
        this._minutesInput.value = String(this.minutes);
      }
    }
  };
  _isUserAction = new WeakMap();
  _doneUserAction = new WeakMap();
  _handleFocusout = new WeakMap();
  TimeInput.styles = [STYLE$1, INPUT_STYLE];
  __decorateClass$1([
    e$3('input[name="hours"]')
  ], TimeInput.prototype, "_hoursInput", 2);
  __decorateClass$1([
    e$3('input[name="minutes"]')
  ], TimeInput.prototype, "_minutesInput", 2);
  __decorateClass$1([
    n2({ type: Boolean })
  ], TimeInput.prototype, "autofocus", 2);
  __decorateClass$1([
    n2({ type: Boolean })
  ], TimeInput.prototype, "disabled", 2);
  __decorateClass$1([
    n2({ type: Boolean })
  ], TimeInput.prototype, "readonly", 2);
  __decorateClass$1([
    n2({ type: Number })
  ], TimeInput.prototype, "hours", 2);
  __decorateClass$1([
    n2({ type: Number })
  ], TimeInput.prototype, "minutes", 2);
  TimeInput = __decorateClass$1([
    t$1(TAG_NAME$1)
  ], TimeInput);
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };
  const TAG_NAME = "ui-icon";
  const STYLE = i$4`
  :host {
    display: inline-flex;
    vertical-align: middle;
    width: 1.5em;
    height: 1.5em;
  }
  svg {
    vertical-align: middle;
    flex: 1;
    place-self: center;
    justify-self: stretch;
    fill: currentColor;
  }
  path {
    transform-box: view-box;
    transform-origin: center;
  }
`;
  const PATH_ATTRS = new class PathAttrs {
    constructor() {
      this.arrowhead = { d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" };
      this["arrow-up"] = this.arrowhead;
      this["arrow-down"] = { ...this.arrowhead, transform: "rotate(180)" };
      this["arrow-left"] = { ...this.arrowhead, transform: "rotate(-90)" };
      this["arrow-right"] = { ...this.arrowhead, transform: "rotate(90)" };
      this.close = {
        d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      };
      this.swap = {
        d: "M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
      };
      this["swap-vertical"] = this.swap;
      this["swap-horizontal"] = { ...this.swap, transform: "rotate(90)" };
      this["zoom-in"] = {
        d: "M11 4C7.13 4 4 7.13 4 11s3.13 7 7 7c1.56 0 2.99-.51 4.15-1.37l2.14 2.14c.39.39 1.03.39 1.42 0s.39-1.03 0-1.42l-2.14-2.14C17.49 13.99 18 12.56 18 11c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm3-5.5h-2.5V8h-1v2.5H8v1h2.5V14h1v-2.5H14v-1z"
      };
      this.help = {
        d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z",
        transform: "scale(0.8)"
      };
      this.settings = {
        d: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.41 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z",
        transform: "scale(0.8)"
      };
      this.error = {
        d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
        fill: "#ff4444"
      };
    }
  }();
  let UIIcon = class extends i$1 {
    render() {
      const key = this.type in PATH_ATTRS ? this.type : "error";
      return b`<svg viewBox="0 0 24 24" role="presentation">
      <path
        d="${PATH_ATTRS[key].d}"
        transform="${PATH_ATTRS[key].transform ?? null}"
        fill=${PATH_ATTRS[key].fill ?? null}
      />
    </svg>`;
    }
    firstUpdated() {
      this.setAttribute("role", "presentation");
    }
  };
  UIIcon.styles = STYLE;
  __decorateClass([
    n2({ reflect: true })
  ], UIIcon.prototype, "type", 2);
  UIIcon = __decorateClass([
    t$1(TAG_NAME)
  ], UIIcon);
  const main = () => {
    document.body.append(document.createElement("sanipad-honmarupad"));
  };
  if (document.readyState === "complete") {
    main();
  } else {
    window.addEventListener("DOMContentLoaded", main, { once: true });
  }

})();