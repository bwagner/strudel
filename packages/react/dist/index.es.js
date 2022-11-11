import he, { useCallback as $e, useRef as ft, useEffect as Tt, useState as Oe, useMemo as Ci, useLayoutEffect as Ai } from "react";
import xr from "@uiw/react-codemirror";
import { Decoration as Pe, EditorView as Ei } from "@codemirror/view";
import { StateEffect as Fi, StateField as vi } from "@codemirror/state";
import { javascript as yr } from "@codemirror/lang-javascript";
import { tags as re } from "@lezer/highlight";
import { createTheme as br } from "@uiw/codemirror-themes";
import { useInView as Sr } from "react-hook-inview";
import { webaudioOutput as Br, getAudioContext as _r } from "@strudel.cycles/webaudio";
import * as wr from "@strudel.cycles/core";
import { isNote as kr } from "@strudel.cycles/core";
const Ir = br({
  theme: "dark",
  settings: {
    background: "#222",
    foreground: "#75baff",
    caret: "#ffcc00",
    selection: "rgba(128, 203, 196, 0.5)",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "transparent",
    gutterForeground: "#8a919966"
  },
  styles: [
    { tag: re.keyword, color: "#c792ea" },
    { tag: re.operator, color: "#89ddff" },
    { tag: re.special(re.variableName), color: "#eeffff" },
    { tag: re.typeName, color: "#c3e88d" },
    { tag: re.atom, color: "#f78c6c" },
    { tag: re.number, color: "#c3e88d" },
    { tag: re.definition(re.variableName), color: "#82aaff" },
    { tag: re.string, color: "#c3e88d" },
    { tag: re.special(re.string), color: "#c3e88d" },
    { tag: re.comment, color: "#7d8799" },
    { tag: re.variableName, color: "#c792ea" },
    { tag: re.tagName, color: "#c3e88d" },
    { tag: re.bracket, color: "#525154" },
    { tag: re.meta, color: "#ffcb6b" },
    { tag: re.attributeName, color: "#c792ea" },
    { tag: re.propertyName, color: "#c792ea" },
    { tag: re.className, color: "#decb6b" },
    { tag: re.invalid, color: "#ffffff" }
  ]
});
const kt = Fi.define(), Pr = vi.define({
  create() {
    return Pe.none;
  },
  update(e, t) {
    try {
      for (let i of t.effects)
        if (i.is(kt))
          if (i.value) {
            const u = Pe.mark({ attributes: { style: "background-color: #FFCA2880" } });
            e = Pe.set([u.range(0, t.newDoc.length)]);
          } else
            e = Pe.set([]);
      return e;
    } catch (i) {
      return console.warn("flash error", i), e;
    }
  },
  provide: (e) => Ei.decorations.from(e)
}), Lr = (e) => {
  e.dispatch({ effects: kt.of(!0) }), setTimeout(() => {
    e.dispatch({ effects: kt.of(!1) });
  }, 200);
}, ct = Fi.define(), Nr = vi.define({
  create() {
    return Pe.none;
  },
  update(e, t) {
    try {
      for (let i of t.effects)
        if (i.is(ct)) {
          const u = i.value.map(
            (n) => (n.context.locations || []).map(({ start: c, end: a }) => {
              const f = n.context.color || "#FFCA28";
              let p = t.newDoc.line(c.line).from + c.column, m = t.newDoc.line(a.line).from + a.column;
              const D = t.newDoc.length;
              return p > D || m > D ? void 0 : Pe.mark({ attributes: { style: `outline: 1.5px solid ${f};` } }).range(p, m);
            })
          ).flat().filter(Boolean) || [];
          e = Pe.set(u, !0);
        }
      return e;
    } catch {
      return Pe.set([]);
    }
  },
  provide: (e) => Ei.decorations.from(e)
}), Tr = [yr(), Ir, Nr, Pr];
function Rr({ value: e, onChange: t, onViewChanged: i, onSelectionChange: u, options: n, editorDidMount: c }) {
  const a = $e(
    (m) => {
      t?.(m);
    },
    [t]
  ), f = $e(
    (m) => {
      i?.(m);
    },
    [i]
  ), p = $e(
    (m) => {
      m.selectionSet && u && u?.(m.state.selection);
    },
    [u]
  );
  return /* @__PURE__ */ he.createElement(he.Fragment, null, /* @__PURE__ */ he.createElement(xr, {
    value: e,
    onChange: a,
    onCreateEditor: f,
    onUpdate: p,
    extensions: Tr
  }));
}
function ei(...e) {
  return e.filter(Boolean).join(" ");
}
function Mr({ view: e, pattern: t, active: i, getTime: u }) {
  const n = ft([]), c = ft();
  Tt(() => {
    if (e)
      if (t && i) {
        let f = function() {
          try {
            const p = u(), D = [Math.max(c.current || p, p - 1 / 10, 0), p + 1 / 60];
            c.current = D[1], n.current = n.current.filter((g) => g.whole.end > p);
            const F = t.queryArc(...D).filter((g) => g.hasOnset());
            n.current = n.current.concat(F), e.dispatch({ effects: ct.of(n.current) });
          } catch {
            e.dispatch({ effects: ct.of([]) });
          }
          a = requestAnimationFrame(f);
        }, a = requestAnimationFrame(f);
        return () => {
          cancelAnimationFrame(a);
        };
      } else
        n.current = [], e.dispatch({ effects: ct.of([]) });
  }, [t, i, e]);
}
const Or = "_container_3i85k_1", Vr = "_header_3i85k_5", qr = "_buttons_3i85k_9", Ur = "_button_3i85k_9", jr = "_buttonDisabled_3i85k_17", Wr = "_error_3i85k_21", Gr = "_body_3i85k_25", Ie = {
  container: Or,
  header: Vr,
  buttons: qr,
  button: Ur,
  buttonDisabled: jr,
  error: Wr,
  body: Gr
};
function ti({ type: e }) {
  return /* @__PURE__ */ he.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "sc-h-5 sc-w-5",
    viewBox: "0 0 20 20",
    fill: "currentColor"
  }, {
    refresh: /* @__PURE__ */ he.createElement("path", {
      fillRule: "evenodd",
      d: "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",
      clipRule: "evenodd"
    }),
    play: /* @__PURE__ */ he.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",
      clipRule: "evenodd"
    }),
    pause: /* @__PURE__ */ he.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",
      clipRule: "evenodd"
    })
  }[e]);
}
function zr(e, t, i = 0.05, u = 0.1, n = 0.1) {
  let c = 0, a = 0, f = 10 ** 4, p = 0.01;
  const m = (I) => i = I(i);
  n = n || u / 2;
  const D = () => {
    const I = e(), P = I + u + n;
    for (a === 0 && (a = I + p); a < P; )
      a = Math.round(a * f) / f, a >= I && t(a, i, c), a < I && console.log("TOO LATE", a), a += i, c++;
  };
  let F;
  const g = () => {
    A(), D(), F = setInterval(D, u * 1e3);
  }, A = () => F !== void 0 && clearInterval(F);
  return { setDuration: m, start: g, stop: () => {
    c = 0, a = 0, A();
  }, pause: () => A(), duration: i, getPhase: () => a };
}
class Hr {
  worker;
  pattern;
  started = !1;
  cps = 1;
  getTime;
  phase = 0;
  constructor({ interval: t, onTrigger: i, onToggle: u, onError: n, getTime: c, latency: a = 0.1, onLog: f }) {
    this.getTime = c, this.onToggle = u, this.onLog = f, this.latency = a;
    const p = (m) => Math.round(m * 1e3) / 1e3;
    this.clock = zr(
      c,
      (m, D, F) => {
        F === 0 && (this.origin = m);
        const g = p(m - this.origin);
        this.phase = g - a;
        const A = p(g + D), v = c();
        try {
          this.pattern.queryArc(g, A).forEach((x) => {
            if (x.part.begin.equals(x.whole.begin)) {
              const I = x.whole.begin + this.origin - v + a, P = x.duration * 1;
              i?.(x, I, P);
            }
          });
        } catch (C) {
          console.warn("scheduler error: ", C.message), n?.(C);
        }
      },
      t
    );
  }
  getPhase(t = !0) {
    return this.phase - (t ? this.latency : 0);
  }
  setStarted(t) {
    this.started = t, this.onToggle?.(t);
  }
  start() {
    if (!this.pattern)
      throw new Error("Scheduler: no pattern set! call .setPattern first.");
    this.onLog?.("start"), this.clock.start(), this.setStarted(!0);
  }
  pause() {
    this.onLog?.("pause"), this.clock.pause(), this.setStarted(!1);
  }
  stop() {
    this.onLog?.("stop"), this.clock.stop(), this.setStarted(!1);
  }
  setPattern(t, i = !1) {
    this.pattern = t, i && !this.started && this.start();
  }
  setCps(t = 1) {
    this.cps = t;
  }
  log(t, i, u) {
    const n = u.filter((c) => c.hasOnset());
    console.log(`${t.toFixed(4)} - ${i.toFixed(4)} ${Array(n.length).fill("I").join("")}`);
  }
}
const { isPattern: Qr, Pattern: Kr } = wr;
let It = !1;
const Yr = async (...e) => {
  It && console.warn("evalScope was called more than once."), It = !0;
  const t = await Promise.allSettled(e), i = t.filter((u) => u.status === "fulfilled").map((u) => u.value);
  t.forEach((u, n) => {
    u.status === "rejected" && console.warn(`evalScope: module with index ${n} could not be loaded:`, u.reason);
  }), Object.assign(globalThis, ...i, Kr.prototype.bootstrap());
};
function Xr(e, t = {}) {
  const { wrapExpression: i = !0, wrapAsync: u = !0 } = t;
  i && (e = `{${e}}`), u && (e = `(async ()=>${e})()`);
  const n = `"use strict";return (${e})`;
  return Function(n)();
}
const $r = async (e, t) => {
  It || await Yr(), t && (e = t(e));
  let u = await Xr(e, { wrapExpression: !!t });
  if (!Qr(u)) {
    console.log("evaluated", u);
    const n = `got "${typeof u}" instead of pattern`;
    throw new Error(n + (typeof u == "function" ? ", did you forget to call a function?" : "."));
  }
  return { mode: "javascript", pattern: u };
};
function Zr({
  interval: e,
  defaultOutput: t,
  onSchedulerError: i,
  onEvalError: u,
  beforeEval: n,
  afterEval: c,
  getTime: a,
  transpiler: f,
  onToggle: p,
  onLog: m
}) {
  const D = new Hr({
    interval: e,
    onTrigger: (C, x, I) => {
      if (!C.context.onTrigger)
        return t(C, x, I);
      const P = 1;
      return C.context.onTrigger(a() + x, C, a(), P);
    },
    onError: i,
    getTime: a,
    onToggle: p,
    onLog: (C) => m?.(`[clock] ${C}`)
  });
  return { scheduler: D, evaluate: async (C, x = !0) => {
    if (!C)
      throw new Error("no code to evaluate");
    try {
      n({ code: C });
      const { pattern: I } = await $r(C, f);
      return m?.("[eval] code updated"), D.setPattern(I, x), c({ code: C, pattern: I }), I;
    } catch (I) {
      m?.(`[eval] error: ${I.message}`, "error"), u?.(I);
    }
  }, start: () => D.start(), stop: () => D.stop(), pause: () => D.pause() };
}
var Jr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xi = {}, yi = {};
(function(e) {
  (function t(i) {
    var u, n, c, a, f, p;
    function m(E) {
      var B = {}, S, w;
      for (S in E)
        E.hasOwnProperty(S) && (w = E[S], typeof w == "object" && w !== null ? B[S] = m(w) : B[S] = w);
      return B;
    }
    function D(E, B) {
      var S, w, j, T;
      for (w = E.length, j = 0; w; )
        S = w >>> 1, T = j + S, B(E[T]) ? w = S : (j = T + 1, w -= S + 1);
      return j;
    }
    u = {
      AssignmentExpression: "AssignmentExpression",
      AssignmentPattern: "AssignmentPattern",
      ArrayExpression: "ArrayExpression",
      ArrayPattern: "ArrayPattern",
      ArrowFunctionExpression: "ArrowFunctionExpression",
      AwaitExpression: "AwaitExpression",
      BlockStatement: "BlockStatement",
      BinaryExpression: "BinaryExpression",
      BreakStatement: "BreakStatement",
      CallExpression: "CallExpression",
      CatchClause: "CatchClause",
      ChainExpression: "ChainExpression",
      ClassBody: "ClassBody",
      ClassDeclaration: "ClassDeclaration",
      ClassExpression: "ClassExpression",
      ComprehensionBlock: "ComprehensionBlock",
      ComprehensionExpression: "ComprehensionExpression",
      ConditionalExpression: "ConditionalExpression",
      ContinueStatement: "ContinueStatement",
      DebuggerStatement: "DebuggerStatement",
      DirectiveStatement: "DirectiveStatement",
      DoWhileStatement: "DoWhileStatement",
      EmptyStatement: "EmptyStatement",
      ExportAllDeclaration: "ExportAllDeclaration",
      ExportDefaultDeclaration: "ExportDefaultDeclaration",
      ExportNamedDeclaration: "ExportNamedDeclaration",
      ExportSpecifier: "ExportSpecifier",
      ExpressionStatement: "ExpressionStatement",
      ForStatement: "ForStatement",
      ForInStatement: "ForInStatement",
      ForOfStatement: "ForOfStatement",
      FunctionDeclaration: "FunctionDeclaration",
      FunctionExpression: "FunctionExpression",
      GeneratorExpression: "GeneratorExpression",
      Identifier: "Identifier",
      IfStatement: "IfStatement",
      ImportExpression: "ImportExpression",
      ImportDeclaration: "ImportDeclaration",
      ImportDefaultSpecifier: "ImportDefaultSpecifier",
      ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
      ImportSpecifier: "ImportSpecifier",
      Literal: "Literal",
      LabeledStatement: "LabeledStatement",
      LogicalExpression: "LogicalExpression",
      MemberExpression: "MemberExpression",
      MetaProperty: "MetaProperty",
      MethodDefinition: "MethodDefinition",
      ModuleSpecifier: "ModuleSpecifier",
      NewExpression: "NewExpression",
      ObjectExpression: "ObjectExpression",
      ObjectPattern: "ObjectPattern",
      PrivateIdentifier: "PrivateIdentifier",
      Program: "Program",
      Property: "Property",
      PropertyDefinition: "PropertyDefinition",
      RestElement: "RestElement",
      ReturnStatement: "ReturnStatement",
      SequenceExpression: "SequenceExpression",
      SpreadElement: "SpreadElement",
      Super: "Super",
      SwitchStatement: "SwitchStatement",
      SwitchCase: "SwitchCase",
      TaggedTemplateExpression: "TaggedTemplateExpression",
      TemplateElement: "TemplateElement",
      TemplateLiteral: "TemplateLiteral",
      ThisExpression: "ThisExpression",
      ThrowStatement: "ThrowStatement",
      TryStatement: "TryStatement",
      UnaryExpression: "UnaryExpression",
      UpdateExpression: "UpdateExpression",
      VariableDeclaration: "VariableDeclaration",
      VariableDeclarator: "VariableDeclarator",
      WhileStatement: "WhileStatement",
      WithStatement: "WithStatement",
      YieldExpression: "YieldExpression"
    }, c = {
      AssignmentExpression: ["left", "right"],
      AssignmentPattern: ["left", "right"],
      ArrayExpression: ["elements"],
      ArrayPattern: ["elements"],
      ArrowFunctionExpression: ["params", "body"],
      AwaitExpression: ["argument"],
      BlockStatement: ["body"],
      BinaryExpression: ["left", "right"],
      BreakStatement: ["label"],
      CallExpression: ["callee", "arguments"],
      CatchClause: ["param", "body"],
      ChainExpression: ["expression"],
      ClassBody: ["body"],
      ClassDeclaration: ["id", "superClass", "body"],
      ClassExpression: ["id", "superClass", "body"],
      ComprehensionBlock: ["left", "right"],
      ComprehensionExpression: ["blocks", "filter", "body"],
      ConditionalExpression: ["test", "consequent", "alternate"],
      ContinueStatement: ["label"],
      DebuggerStatement: [],
      DirectiveStatement: [],
      DoWhileStatement: ["body", "test"],
      EmptyStatement: [],
      ExportAllDeclaration: ["source"],
      ExportDefaultDeclaration: ["declaration"],
      ExportNamedDeclaration: ["declaration", "specifiers", "source"],
      ExportSpecifier: ["exported", "local"],
      ExpressionStatement: ["expression"],
      ForStatement: ["init", "test", "update", "body"],
      ForInStatement: ["left", "right", "body"],
      ForOfStatement: ["left", "right", "body"],
      FunctionDeclaration: ["id", "params", "body"],
      FunctionExpression: ["id", "params", "body"],
      GeneratorExpression: ["blocks", "filter", "body"],
      Identifier: [],
      IfStatement: ["test", "consequent", "alternate"],
      ImportExpression: ["source"],
      ImportDeclaration: ["specifiers", "source"],
      ImportDefaultSpecifier: ["local"],
      ImportNamespaceSpecifier: ["local"],
      ImportSpecifier: ["imported", "local"],
      Literal: [],
      LabeledStatement: ["label", "body"],
      LogicalExpression: ["left", "right"],
      MemberExpression: ["object", "property"],
      MetaProperty: ["meta", "property"],
      MethodDefinition: ["key", "value"],
      ModuleSpecifier: [],
      NewExpression: ["callee", "arguments"],
      ObjectExpression: ["properties"],
      ObjectPattern: ["properties"],
      PrivateIdentifier: [],
      Program: ["body"],
      Property: ["key", "value"],
      PropertyDefinition: ["key", "value"],
      RestElement: ["argument"],
      ReturnStatement: ["argument"],
      SequenceExpression: ["expressions"],
      SpreadElement: ["argument"],
      Super: [],
      SwitchStatement: ["discriminant", "cases"],
      SwitchCase: ["test", "consequent"],
      TaggedTemplateExpression: ["tag", "quasi"],
      TemplateElement: [],
      TemplateLiteral: ["quasis", "expressions"],
      ThisExpression: [],
      ThrowStatement: ["argument"],
      TryStatement: ["block", "handler", "finalizer"],
      UnaryExpression: ["argument"],
      UpdateExpression: ["argument"],
      VariableDeclaration: ["declarations"],
      VariableDeclarator: ["id", "init"],
      WhileStatement: ["test", "body"],
      WithStatement: ["object", "body"],
      YieldExpression: ["argument"]
    }, a = {}, f = {}, p = {}, n = {
      Break: a,
      Skip: f,
      Remove: p
    };
    function F(E, B) {
      this.parent = E, this.key = B;
    }
    F.prototype.replace = function(B) {
      this.parent[this.key] = B;
    }, F.prototype.remove = function() {
      return Array.isArray(this.parent) ? (this.parent.splice(this.key, 1), !0) : (this.replace(null), !1);
    };
    function g(E, B, S, w) {
      this.node = E, this.path = B, this.wrap = S, this.ref = w;
    }
    function A() {
    }
    A.prototype.path = function() {
      var B, S, w, j, T, W;
      function V(R, H) {
        if (Array.isArray(H))
          for (w = 0, j = H.length; w < j; ++w)
            R.push(H[w]);
        else
          R.push(H);
      }
      if (!this.__current.path)
        return null;
      for (T = [], B = 2, S = this.__leavelist.length; B < S; ++B)
        W = this.__leavelist[B], V(T, W.path);
      return V(T, this.__current.path), T;
    }, A.prototype.type = function() {
      var E = this.current();
      return E.type || this.__current.wrap;
    }, A.prototype.parents = function() {
      var B, S, w;
      for (w = [], B = 1, S = this.__leavelist.length; B < S; ++B)
        w.push(this.__leavelist[B].node);
      return w;
    }, A.prototype.current = function() {
      return this.__current.node;
    }, A.prototype.__execute = function(B, S) {
      var w, j;
      return j = void 0, w = this.__current, this.__current = S, this.__state = null, B && (j = B.call(this, S.node, this.__leavelist[this.__leavelist.length - 1].node)), this.__current = w, j;
    }, A.prototype.notify = function(B) {
      this.__state = B;
    }, A.prototype.skip = function() {
      this.notify(f);
    }, A.prototype.break = function() {
      this.notify(a);
    }, A.prototype.remove = function() {
      this.notify(p);
    }, A.prototype.__initialize = function(E, B) {
      this.visitor = B, this.root = E, this.__worklist = [], this.__leavelist = [], this.__current = null, this.__state = null, this.__fallback = null, B.fallback === "iteration" ? this.__fallback = Object.keys : typeof B.fallback == "function" && (this.__fallback = B.fallback), this.__keys = c, B.keys && (this.__keys = Object.assign(Object.create(this.__keys), B.keys));
    };
    function v(E) {
      return E == null ? !1 : typeof E == "object" && typeof E.type == "string";
    }
    function C(E, B) {
      return (E === u.ObjectExpression || E === u.ObjectPattern) && B === "properties";
    }
    function x(E, B) {
      for (var S = E.length - 1; S >= 0; --S)
        if (E[S].node === B)
          return !0;
      return !1;
    }
    A.prototype.traverse = function(B, S) {
      var w, j, T, W, V, R, H, X, ie, te, Y, ge;
      for (this.__initialize(B, S), ge = {}, w = this.__worklist, j = this.__leavelist, w.push(new g(B, null, null, null)), j.push(new g(null, null, null, null)); w.length; ) {
        if (T = w.pop(), T === ge) {
          if (T = j.pop(), R = this.__execute(S.leave, T), this.__state === a || R === a)
            return;
          continue;
        }
        if (T.node) {
          if (R = this.__execute(S.enter, T), this.__state === a || R === a)
            return;
          if (w.push(ge), j.push(T), this.__state === f || R === f)
            continue;
          if (W = T.node, V = W.type || T.wrap, te = this.__keys[V], !te)
            if (this.__fallback)
              te = this.__fallback(W);
            else
              throw new Error("Unknown node type " + V + ".");
          for (X = te.length; (X -= 1) >= 0; )
            if (H = te[X], Y = W[H], !!Y) {
              if (Array.isArray(Y)) {
                for (ie = Y.length; (ie -= 1) >= 0; )
                  if (!!Y[ie] && !x(j, Y[ie])) {
                    if (C(V, te[X]))
                      T = new g(Y[ie], [H, ie], "Property", null);
                    else if (v(Y[ie]))
                      T = new g(Y[ie], [H, ie], null, null);
                    else
                      continue;
                    w.push(T);
                  }
              } else if (v(Y)) {
                if (x(j, Y))
                  continue;
                w.push(new g(Y, H, null, null));
              }
            }
        }
      }
    }, A.prototype.replace = function(B, S) {
      var w, j, T, W, V, R, H, X, ie, te, Y, ge, ye;
      function N(Te) {
        var He, Qe, Z, De;
        if (Te.ref.remove()) {
          for (Qe = Te.ref.key, De = Te.ref.parent, He = w.length; He--; )
            if (Z = w[He], Z.ref && Z.ref.parent === De) {
              if (Z.ref.key < Qe)
                break;
              --Z.ref.key;
            }
        }
      }
      for (this.__initialize(B, S), Y = {}, w = this.__worklist, j = this.__leavelist, ge = {
        root: B
      }, R = new g(B, null, null, new F(ge, "root")), w.push(R), j.push(R); w.length; ) {
        if (R = w.pop(), R === Y) {
          if (R = j.pop(), V = this.__execute(S.leave, R), V !== void 0 && V !== a && V !== f && V !== p && R.ref.replace(V), (this.__state === p || V === p) && N(R), this.__state === a || V === a)
            return ge.root;
          continue;
        }
        if (V = this.__execute(S.enter, R), V !== void 0 && V !== a && V !== f && V !== p && (R.ref.replace(V), R.node = V), (this.__state === p || V === p) && (N(R), R.node = null), this.__state === a || V === a)
          return ge.root;
        if (T = R.node, !!T && (w.push(Y), j.push(R), !(this.__state === f || V === f))) {
          if (W = T.type || R.wrap, ie = this.__keys[W], !ie)
            if (this.__fallback)
              ie = this.__fallback(T);
            else
              throw new Error("Unknown node type " + W + ".");
          for (H = ie.length; (H -= 1) >= 0; )
            if (ye = ie[H], te = T[ye], !!te)
              if (Array.isArray(te)) {
                for (X = te.length; (X -= 1) >= 0; )
                  if (!!te[X]) {
                    if (C(W, ie[H]))
                      R = new g(te[X], [ye, X], "Property", new F(te, X));
                    else if (v(te[X]))
                      R = new g(te[X], [ye, X], null, new F(te, X));
                    else
                      continue;
                    w.push(R);
                  }
              } else
                v(te) && w.push(new g(te, ye, null, new F(T, ye)));
        }
      }
      return ge.root;
    };
    function I(E, B) {
      var S = new A();
      return S.traverse(E, B);
    }
    function P(E, B) {
      var S = new A();
      return S.replace(E, B);
    }
    function M(E, B) {
      var S;
      return S = D(B, function(j) {
        return j.range[0] > E.range[0];
      }), E.extendedRange = [E.range[0], E.range[1]], S !== B.length && (E.extendedRange[1] = B[S].range[0]), S -= 1, S >= 0 && (E.extendedRange[0] = B[S].range[1]), E;
    }
    function y(E, B, S) {
      var w = [], j, T, W, V;
      if (!E.range)
        throw new Error("attachComments needs range information");
      if (!S.length) {
        if (B.length) {
          for (W = 0, T = B.length; W < T; W += 1)
            j = m(B[W]), j.extendedRange = [0, E.range[0]], w.push(j);
          E.leadingComments = w;
        }
        return E;
      }
      for (W = 0, T = B.length; W < T; W += 1)
        w.push(M(m(B[W]), S));
      return V = 0, I(E, {
        enter: function(R) {
          for (var H; V < w.length && (H = w[V], !(H.extendedRange[1] > R.range[0])); )
            H.extendedRange[1] === R.range[0] ? (R.leadingComments || (R.leadingComments = []), R.leadingComments.push(H), w.splice(V, 1)) : V += 1;
          if (V === w.length)
            return n.Break;
          if (w[V].extendedRange[0] > R.range[1])
            return n.Skip;
        }
      }), V = 0, I(E, {
        leave: function(R) {
          for (var H; V < w.length && (H = w[V], !(R.range[1] < H.extendedRange[0])); )
            R.range[1] === H.extendedRange[0] ? (R.trailingComments || (R.trailingComments = []), R.trailingComments.push(H), w.splice(V, 1)) : V += 1;
          if (V === w.length)
            return n.Break;
          if (w[V].extendedRange[0] > R.range[1])
            return n.Skip;
        }
      }), E;
    }
    return i.Syntax = u, i.traverse = I, i.replace = P, i.attachComments = y, i.VisitorKeys = c, i.VisitorOption = n, i.Controller = A, i.cloneEnvironment = function() {
      return t({});
    }, i;
  })(e);
})(yi);
var ht = {}, bi = { exports: {} };
(function() {
  function e(a) {
    if (a == null)
      return !1;
    switch (a.type) {
      case "ArrayExpression":
      case "AssignmentExpression":
      case "BinaryExpression":
      case "CallExpression":
      case "ConditionalExpression":
      case "FunctionExpression":
      case "Identifier":
      case "Literal":
      case "LogicalExpression":
      case "MemberExpression":
      case "NewExpression":
      case "ObjectExpression":
      case "SequenceExpression":
      case "ThisExpression":
      case "UnaryExpression":
      case "UpdateExpression":
        return !0;
    }
    return !1;
  }
  function t(a) {
    if (a == null)
      return !1;
    switch (a.type) {
      case "DoWhileStatement":
      case "ForInStatement":
      case "ForStatement":
      case "WhileStatement":
        return !0;
    }
    return !1;
  }
  function i(a) {
    if (a == null)
      return !1;
    switch (a.type) {
      case "BlockStatement":
      case "BreakStatement":
      case "ContinueStatement":
      case "DebuggerStatement":
      case "DoWhileStatement":
      case "EmptyStatement":
      case "ExpressionStatement":
      case "ForInStatement":
      case "ForStatement":
      case "IfStatement":
      case "LabeledStatement":
      case "ReturnStatement":
      case "SwitchStatement":
      case "ThrowStatement":
      case "TryStatement":
      case "VariableDeclaration":
      case "WhileStatement":
      case "WithStatement":
        return !0;
    }
    return !1;
  }
  function u(a) {
    return i(a) || a != null && a.type === "FunctionDeclaration";
  }
  function n(a) {
    switch (a.type) {
      case "IfStatement":
        return a.alternate != null ? a.alternate : a.consequent;
      case "LabeledStatement":
      case "ForStatement":
      case "ForInStatement":
      case "WhileStatement":
      case "WithStatement":
        return a.body;
    }
    return null;
  }
  function c(a) {
    var f;
    if (a.type !== "IfStatement" || a.alternate == null)
      return !1;
    f = a.consequent;
    do {
      if (f.type === "IfStatement" && f.alternate == null)
        return !0;
      f = n(f);
    } while (f);
    return !1;
  }
  bi.exports = {
    isExpression: e,
    isStatement: i,
    isIterationStatement: t,
    isSourceElement: u,
    isProblematicIfStatement: c,
    trailingStatement: n
  };
})();
var Rt = { exports: {} };
(function() {
  var e, t, i, u, n, c;
  t = {
    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
  }, e = {
    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
  };
  function a(x) {
    return 48 <= x && x <= 57;
  }
  function f(x) {
    return 48 <= x && x <= 57 || 97 <= x && x <= 102 || 65 <= x && x <= 70;
  }
  function p(x) {
    return x >= 48 && x <= 55;
  }
  i = [
    5760,
    8192,
    8193,
    8194,
    8195,
    8196,
    8197,
    8198,
    8199,
    8200,
    8201,
    8202,
    8239,
    8287,
    12288,
    65279
  ];
  function m(x) {
    return x === 32 || x === 9 || x === 11 || x === 12 || x === 160 || x >= 5760 && i.indexOf(x) >= 0;
  }
  function D(x) {
    return x === 10 || x === 13 || x === 8232 || x === 8233;
  }
  function F(x) {
    if (x <= 65535)
      return String.fromCharCode(x);
    var I = String.fromCharCode(Math.floor((x - 65536) / 1024) + 55296), P = String.fromCharCode((x - 65536) % 1024 + 56320);
    return I + P;
  }
  for (u = new Array(128), c = 0; c < 128; ++c)
    u[c] = c >= 97 && c <= 122 || c >= 65 && c <= 90 || c === 36 || c === 95;
  for (n = new Array(128), c = 0; c < 128; ++c)
    n[c] = c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c === 36 || c === 95;
  function g(x) {
    return x < 128 ? u[x] : t.NonAsciiIdentifierStart.test(F(x));
  }
  function A(x) {
    return x < 128 ? n[x] : t.NonAsciiIdentifierPart.test(F(x));
  }
  function v(x) {
    return x < 128 ? u[x] : e.NonAsciiIdentifierStart.test(F(x));
  }
  function C(x) {
    return x < 128 ? n[x] : e.NonAsciiIdentifierPart.test(F(x));
  }
  Rt.exports = {
    isDecimalDigit: a,
    isHexDigit: f,
    isOctalDigit: p,
    isWhiteSpace: m,
    isLineTerminator: D,
    isIdentifierStartES5: g,
    isIdentifierPartES5: A,
    isIdentifierStartES6: v,
    isIdentifierPartES6: C
  };
})();
var Si = { exports: {} };
(function() {
  var e = Rt.exports;
  function t(g) {
    switch (g) {
      case "implements":
      case "interface":
      case "package":
      case "private":
      case "protected":
      case "public":
      case "static":
      case "let":
        return !0;
      default:
        return !1;
    }
  }
  function i(g, A) {
    return !A && g === "yield" ? !1 : u(g, A);
  }
  function u(g, A) {
    if (A && t(g))
      return !0;
    switch (g.length) {
      case 2:
        return g === "if" || g === "in" || g === "do";
      case 3:
        return g === "var" || g === "for" || g === "new" || g === "try";
      case 4:
        return g === "this" || g === "else" || g === "case" || g === "void" || g === "with" || g === "enum";
      case 5:
        return g === "while" || g === "break" || g === "catch" || g === "throw" || g === "const" || g === "yield" || g === "class" || g === "super";
      case 6:
        return g === "return" || g === "typeof" || g === "delete" || g === "switch" || g === "export" || g === "import";
      case 7:
        return g === "default" || g === "finally" || g === "extends";
      case 8:
        return g === "function" || g === "continue" || g === "debugger";
      case 10:
        return g === "instanceof";
      default:
        return !1;
    }
  }
  function n(g, A) {
    return g === "null" || g === "true" || g === "false" || i(g, A);
  }
  function c(g, A) {
    return g === "null" || g === "true" || g === "false" || u(g, A);
  }
  function a(g) {
    return g === "eval" || g === "arguments";
  }
  function f(g) {
    var A, v, C;
    if (g.length === 0 || (C = g.charCodeAt(0), !e.isIdentifierStartES5(C)))
      return !1;
    for (A = 1, v = g.length; A < v; ++A)
      if (C = g.charCodeAt(A), !e.isIdentifierPartES5(C))
        return !1;
    return !0;
  }
  function p(g, A) {
    return (g - 55296) * 1024 + (A - 56320) + 65536;
  }
  function m(g) {
    var A, v, C, x, I;
    if (g.length === 0)
      return !1;
    for (I = e.isIdentifierStartES6, A = 0, v = g.length; A < v; ++A) {
      if (C = g.charCodeAt(A), 55296 <= C && C <= 56319) {
        if (++A, A >= v || (x = g.charCodeAt(A), !(56320 <= x && x <= 57343)))
          return !1;
        C = p(C, x);
      }
      if (!I(C))
        return !1;
      I = e.isIdentifierPartES6;
    }
    return !0;
  }
  function D(g, A) {
    return f(g) && !n(g, A);
  }
  function F(g, A) {
    return m(g) && !c(g, A);
  }
  Si.exports = {
    isKeywordES5: i,
    isKeywordES6: u,
    isReservedWordES5: n,
    isReservedWordES6: c,
    isRestrictedWord: a,
    isIdentifierNameES5: f,
    isIdentifierNameES6: m,
    isIdentifierES5: D,
    isIdentifierES6: F
  };
})();
(function() {
  ht.ast = bi.exports, ht.code = Rt.exports, ht.keyword = Si.exports;
})();
var Ye = {}, Et = {}, ot = {}, lt = {}, ii;
function eu() {
  if (ii)
    return lt;
  ii = 1;
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  return lt.encode = function(t) {
    if (0 <= t && t < e.length)
      return e[t];
    throw new TypeError("Must be between 0 and 63: " + t);
  }, lt.decode = function(t) {
    var i = 65, u = 90, n = 97, c = 122, a = 48, f = 57, p = 43, m = 47, D = 26, F = 52;
    return i <= t && t <= u ? t - i : n <= t && t <= c ? t - n + D : a <= t && t <= f ? t - a + F : t == p ? 62 : t == m ? 63 : -1;
  }, lt;
}
var ri;
function Bi() {
  if (ri)
    return ot;
  ri = 1;
  var e = eu(), t = 5, i = 1 << t, u = i - 1, n = i;
  function c(f) {
    return f < 0 ? (-f << 1) + 1 : (f << 1) + 0;
  }
  function a(f) {
    var p = (f & 1) === 1, m = f >> 1;
    return p ? -m : m;
  }
  return ot.encode = function(p) {
    var m = "", D, F = c(p);
    do
      D = F & u, F >>>= t, F > 0 && (D |= n), m += e.encode(D);
    while (F > 0);
    return m;
  }, ot.decode = function(p, m, D) {
    var F = p.length, g = 0, A = 0, v, C;
    do {
      if (m >= F)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (C = e.decode(p.charCodeAt(m++)), C === -1)
        throw new Error("Invalid base64 digit: " + p.charAt(m - 1));
      v = !!(C & n), C &= u, g = g + (C << A), A += t;
    } while (v);
    D.value = a(g), D.rest = m;
  }, ot;
}
var Ft = {}, ui;
function tt() {
  return ui || (ui = 1, function(e) {
    function t(y, E, B) {
      if (E in y)
        return y[E];
      if (arguments.length === 3)
        return B;
      throw new Error('"' + E + '" is a required argument.');
    }
    e.getArg = t;
    var i = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, u = /^data:.+\,.+$/;
    function n(y) {
      var E = y.match(i);
      return E ? {
        scheme: E[1],
        auth: E[2],
        host: E[3],
        port: E[4],
        path: E[5]
      } : null;
    }
    e.urlParse = n;
    function c(y) {
      var E = "";
      return y.scheme && (E += y.scheme + ":"), E += "//", y.auth && (E += y.auth + "@"), y.host && (E += y.host), y.port && (E += ":" + y.port), y.path && (E += y.path), E;
    }
    e.urlGenerate = c;
    function a(y) {
      var E = y, B = n(y);
      if (B) {
        if (!B.path)
          return y;
        E = B.path;
      }
      for (var S = e.isAbsolute(E), w = E.split(/\/+/), j, T = 0, W = w.length - 1; W >= 0; W--)
        j = w[W], j === "." ? w.splice(W, 1) : j === ".." ? T++ : T > 0 && (j === "" ? (w.splice(W + 1, T), T = 0) : (w.splice(W, 2), T--));
      return E = w.join("/"), E === "" && (E = S ? "/" : "."), B ? (B.path = E, c(B)) : E;
    }
    e.normalize = a;
    function f(y, E) {
      y === "" && (y = "."), E === "" && (E = ".");
      var B = n(E), S = n(y);
      if (S && (y = S.path || "/"), B && !B.scheme)
        return S && (B.scheme = S.scheme), c(B);
      if (B || E.match(u))
        return E;
      if (S && !S.host && !S.path)
        return S.host = E, c(S);
      var w = E.charAt(0) === "/" ? E : a(y.replace(/\/+$/, "") + "/" + E);
      return S ? (S.path = w, c(S)) : w;
    }
    e.join = f, e.isAbsolute = function(y) {
      return y.charAt(0) === "/" || i.test(y);
    };
    function p(y, E) {
      y === "" && (y = "."), y = y.replace(/\/$/, "");
      for (var B = 0; E.indexOf(y + "/") !== 0; ) {
        var S = y.lastIndexOf("/");
        if (S < 0 || (y = y.slice(0, S), y.match(/^([^\/]+:\/)?\/*$/)))
          return E;
        ++B;
      }
      return Array(B + 1).join("../") + E.substr(y.length + 1);
    }
    e.relative = p;
    var m = function() {
      var y = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in y);
    }();
    function D(y) {
      return y;
    }
    function F(y) {
      return A(y) ? "$" + y : y;
    }
    e.toSetString = m ? D : F;
    function g(y) {
      return A(y) ? y.slice(1) : y;
    }
    e.fromSetString = m ? D : g;
    function A(y) {
      if (!y)
        return !1;
      var E = y.length;
      if (E < 9 || y.charCodeAt(E - 1) !== 95 || y.charCodeAt(E - 2) !== 95 || y.charCodeAt(E - 3) !== 111 || y.charCodeAt(E - 4) !== 116 || y.charCodeAt(E - 5) !== 111 || y.charCodeAt(E - 6) !== 114 || y.charCodeAt(E - 7) !== 112 || y.charCodeAt(E - 8) !== 95 || y.charCodeAt(E - 9) !== 95)
        return !1;
      for (var B = E - 10; B >= 0; B--)
        if (y.charCodeAt(B) !== 36)
          return !1;
      return !0;
    }
    function v(y, E, B) {
      var S = x(y.source, E.source);
      return S !== 0 || (S = y.originalLine - E.originalLine, S !== 0) || (S = y.originalColumn - E.originalColumn, S !== 0 || B) || (S = y.generatedColumn - E.generatedColumn, S !== 0) || (S = y.generatedLine - E.generatedLine, S !== 0) ? S : x(y.name, E.name);
    }
    e.compareByOriginalPositions = v;
    function C(y, E, B) {
      var S = y.generatedLine - E.generatedLine;
      return S !== 0 || (S = y.generatedColumn - E.generatedColumn, S !== 0 || B) || (S = x(y.source, E.source), S !== 0) || (S = y.originalLine - E.originalLine, S !== 0) || (S = y.originalColumn - E.originalColumn, S !== 0) ? S : x(y.name, E.name);
    }
    e.compareByGeneratedPositionsDeflated = C;
    function x(y, E) {
      return y === E ? 0 : y === null ? 1 : E === null ? -1 : y > E ? 1 : -1;
    }
    function I(y, E) {
      var B = y.generatedLine - E.generatedLine;
      return B !== 0 || (B = y.generatedColumn - E.generatedColumn, B !== 0) || (B = x(y.source, E.source), B !== 0) || (B = y.originalLine - E.originalLine, B !== 0) || (B = y.originalColumn - E.originalColumn, B !== 0) ? B : x(y.name, E.name);
    }
    e.compareByGeneratedPositionsInflated = I;
    function P(y) {
      return JSON.parse(y.replace(/^\)]}'[^\n]*\n/, ""));
    }
    e.parseSourceMapInput = P;
    function M(y, E, B) {
      if (E = E || "", y && (y[y.length - 1] !== "/" && E[0] !== "/" && (y += "/"), E = y + E), B) {
        var S = n(B);
        if (!S)
          throw new Error("sourceMapURL could not be parsed");
        if (S.path) {
          var w = S.path.lastIndexOf("/");
          w >= 0 && (S.path = S.path.substring(0, w + 1));
        }
        E = f(c(S), E);
      }
      return a(E);
    }
    e.computeSourceURL = M;
  }(Ft)), Ft;
}
var vt = {}, ni;
function _i() {
  if (ni)
    return vt;
  ni = 1;
  var e = tt(), t = Object.prototype.hasOwnProperty, i = typeof Map < "u";
  function u() {
    this._array = [], this._set = i ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  return u.fromArray = function(c, a) {
    for (var f = new u(), p = 0, m = c.length; p < m; p++)
      f.add(c[p], a);
    return f;
  }, u.prototype.size = function() {
    return i ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, u.prototype.add = function(c, a) {
    var f = i ? c : e.toSetString(c), p = i ? this.has(c) : t.call(this._set, f), m = this._array.length;
    (!p || a) && this._array.push(c), p || (i ? this._set.set(c, m) : this._set[f] = m);
  }, u.prototype.has = function(c) {
    if (i)
      return this._set.has(c);
    var a = e.toSetString(c);
    return t.call(this._set, a);
  }, u.prototype.indexOf = function(c) {
    if (i) {
      var a = this._set.get(c);
      if (a >= 0)
        return a;
    } else {
      var f = e.toSetString(c);
      if (t.call(this._set, f))
        return this._set[f];
    }
    throw new Error('"' + c + '" is not in the set.');
  }, u.prototype.at = function(c) {
    if (c >= 0 && c < this._array.length)
      return this._array[c];
    throw new Error("No element indexed by " + c);
  }, u.prototype.toArray = function() {
    return this._array.slice();
  }, vt.ArraySet = u, vt;
}
var xt = {}, si;
function tu() {
  if (si)
    return xt;
  si = 1;
  var e = tt();
  function t(u, n) {
    var c = u.generatedLine, a = n.generatedLine, f = u.generatedColumn, p = n.generatedColumn;
    return a > c || a == c && p >= f || e.compareByGeneratedPositionsInflated(u, n) <= 0;
  }
  function i() {
    this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  return i.prototype.unsortedForEach = function(n, c) {
    this._array.forEach(n, c);
  }, i.prototype.add = function(n) {
    t(this._last, n) ? (this._last = n, this._array.push(n)) : (this._sorted = !1, this._array.push(n));
  }, i.prototype.toArray = function() {
    return this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
  }, xt.MappingList = i, xt;
}
var ai;
function wi() {
  if (ai)
    return Et;
  ai = 1;
  var e = Bi(), t = tt(), i = _i().ArraySet, u = tu().MappingList;
  function n(c) {
    c || (c = {}), this._file = t.getArg(c, "file", null), this._sourceRoot = t.getArg(c, "sourceRoot", null), this._skipValidation = t.getArg(c, "skipValidation", !1), this._sources = new i(), this._names = new i(), this._mappings = new u(), this._sourcesContents = null;
  }
  return n.prototype._version = 3, n.fromSourceMap = function(a) {
    var f = a.sourceRoot, p = new n({
      file: a.file,
      sourceRoot: f
    });
    return a.eachMapping(function(m) {
      var D = {
        generated: {
          line: m.generatedLine,
          column: m.generatedColumn
        }
      };
      m.source != null && (D.source = m.source, f != null && (D.source = t.relative(f, D.source)), D.original = {
        line: m.originalLine,
        column: m.originalColumn
      }, m.name != null && (D.name = m.name)), p.addMapping(D);
    }), a.sources.forEach(function(m) {
      var D = m;
      f !== null && (D = t.relative(f, m)), p._sources.has(D) || p._sources.add(D);
      var F = a.sourceContentFor(m);
      F != null && p.setSourceContent(m, F);
    }), p;
  }, n.prototype.addMapping = function(a) {
    var f = t.getArg(a, "generated"), p = t.getArg(a, "original", null), m = t.getArg(a, "source", null), D = t.getArg(a, "name", null);
    this._skipValidation || this._validateMapping(f, p, m, D), m != null && (m = String(m), this._sources.has(m) || this._sources.add(m)), D != null && (D = String(D), this._names.has(D) || this._names.add(D)), this._mappings.add({
      generatedLine: f.line,
      generatedColumn: f.column,
      originalLine: p != null && p.line,
      originalColumn: p != null && p.column,
      source: m,
      name: D
    });
  }, n.prototype.setSourceContent = function(a, f) {
    var p = a;
    this._sourceRoot != null && (p = t.relative(this._sourceRoot, p)), f != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[t.toSetString(p)] = f) : this._sourcesContents && (delete this._sourcesContents[t.toSetString(p)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  }, n.prototype.applySourceMap = function(a, f, p) {
    var m = f;
    if (f == null) {
      if (a.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      m = a.file;
    }
    var D = this._sourceRoot;
    D != null && (m = t.relative(D, m));
    var F = new i(), g = new i();
    this._mappings.unsortedForEach(function(A) {
      if (A.source === m && A.originalLine != null) {
        var v = a.originalPositionFor({
          line: A.originalLine,
          column: A.originalColumn
        });
        v.source != null && (A.source = v.source, p != null && (A.source = t.join(p, A.source)), D != null && (A.source = t.relative(D, A.source)), A.originalLine = v.line, A.originalColumn = v.column, v.name != null && (A.name = v.name));
      }
      var C = A.source;
      C != null && !F.has(C) && F.add(C);
      var x = A.name;
      x != null && !g.has(x) && g.add(x);
    }, this), this._sources = F, this._names = g, a.sources.forEach(function(A) {
      var v = a.sourceContentFor(A);
      v != null && (p != null && (A = t.join(p, A)), D != null && (A = t.relative(D, A)), this.setSourceContent(A, v));
    }, this);
  }, n.prototype._validateMapping = function(a, f, p, m) {
    if (f && typeof f.line != "number" && typeof f.column != "number")
      throw new Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
      );
    if (!(a && "line" in a && "column" in a && a.line > 0 && a.column >= 0 && !f && !p && !m)) {
      if (a && "line" in a && "column" in a && f && "line" in f && "column" in f && a.line > 0 && a.column >= 0 && f.line > 0 && f.column >= 0 && p)
        return;
      throw new Error("Invalid mapping: " + JSON.stringify({
        generated: a,
        source: p,
        original: f,
        name: m
      }));
    }
  }, n.prototype._serializeMappings = function() {
    for (var a = 0, f = 1, p = 0, m = 0, D = 0, F = 0, g = "", A, v, C, x, I = this._mappings.toArray(), P = 0, M = I.length; P < M; P++) {
      if (v = I[P], A = "", v.generatedLine !== f)
        for (a = 0; v.generatedLine !== f; )
          A += ";", f++;
      else if (P > 0) {
        if (!t.compareByGeneratedPositionsInflated(v, I[P - 1]))
          continue;
        A += ",";
      }
      A += e.encode(v.generatedColumn - a), a = v.generatedColumn, v.source != null && (x = this._sources.indexOf(v.source), A += e.encode(x - F), F = x, A += e.encode(v.originalLine - 1 - m), m = v.originalLine - 1, A += e.encode(v.originalColumn - p), p = v.originalColumn, v.name != null && (C = this._names.indexOf(v.name), A += e.encode(C - D), D = C)), g += A;
    }
    return g;
  }, n.prototype._generateSourcesContent = function(a, f) {
    return a.map(function(p) {
      if (!this._sourcesContents)
        return null;
      f != null && (p = t.relative(f, p));
      var m = t.toSetString(p);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, m) ? this._sourcesContents[m] : null;
    }, this);
  }, n.prototype.toJSON = function() {
    var a = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (a.file = this._file), this._sourceRoot != null && (a.sourceRoot = this._sourceRoot), this._sourcesContents && (a.sourcesContent = this._generateSourcesContent(a.sources, a.sourceRoot)), a;
  }, n.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, Et.SourceMapGenerator = n, Et;
}
var Xe = {}, yt = {}, oi;
function iu() {
  return oi || (oi = 1, function(e) {
    e.GREATEST_LOWER_BOUND = 1, e.LEAST_UPPER_BOUND = 2;
    function t(i, u, n, c, a, f) {
      var p = Math.floor((u - i) / 2) + i, m = a(n, c[p], !0);
      return m === 0 ? p : m > 0 ? u - p > 1 ? t(p, u, n, c, a, f) : f == e.LEAST_UPPER_BOUND ? u < c.length ? u : -1 : p : p - i > 1 ? t(i, p, n, c, a, f) : f == e.LEAST_UPPER_BOUND ? p : i < 0 ? -1 : i;
    }
    e.search = function(u, n, c, a) {
      if (n.length === 0)
        return -1;
      var f = t(
        -1,
        n.length,
        u,
        n,
        c,
        a || e.GREATEST_LOWER_BOUND
      );
      if (f < 0)
        return -1;
      for (; f - 1 >= 0 && c(n[f], n[f - 1], !0) === 0; )
        --f;
      return f;
    };
  }(yt)), yt;
}
var bt = {}, li;
function ru() {
  if (li)
    return bt;
  li = 1;
  function e(u, n, c) {
    var a = u[n];
    u[n] = u[c], u[c] = a;
  }
  function t(u, n) {
    return Math.round(u + Math.random() * (n - u));
  }
  function i(u, n, c, a) {
    if (c < a) {
      var f = t(c, a), p = c - 1;
      e(u, f, a);
      for (var m = u[a], D = c; D < a; D++)
        n(u[D], m) <= 0 && (p += 1, e(u, p, D));
      e(u, p + 1, D);
      var F = p + 1;
      i(u, n, c, F - 1), i(u, n, F + 1, a);
    }
  }
  return bt.quickSort = function(u, n) {
    i(u, n, 0, u.length - 1);
  }, bt;
}
var ci;
function uu() {
  if (ci)
    return Xe;
  ci = 1;
  var e = tt(), t = iu(), i = _i().ArraySet, u = Bi(), n = ru().quickSort;
  function c(m, D) {
    var F = m;
    return typeof m == "string" && (F = e.parseSourceMapInput(m)), F.sections != null ? new p(F, D) : new a(F, D);
  }
  c.fromSourceMap = function(m, D) {
    return a.fromSourceMap(m, D);
  }, c.prototype._version = 3, c.prototype.__generatedMappings = null, Object.defineProperty(c.prototype, "_generatedMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
    }
  }), c.prototype.__originalMappings = null, Object.defineProperty(c.prototype, "_originalMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
    }
  }), c.prototype._charIsMappingSeparator = function(D, F) {
    var g = D.charAt(F);
    return g === ";" || g === ",";
  }, c.prototype._parseMappings = function(D, F) {
    throw new Error("Subclasses must implement _parseMappings");
  }, c.GENERATED_ORDER = 1, c.ORIGINAL_ORDER = 2, c.GREATEST_LOWER_BOUND = 1, c.LEAST_UPPER_BOUND = 2, c.prototype.eachMapping = function(D, F, g) {
    var A = F || null, v = g || c.GENERATED_ORDER, C;
    switch (v) {
      case c.GENERATED_ORDER:
        C = this._generatedMappings;
        break;
      case c.ORIGINAL_ORDER:
        C = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var x = this.sourceRoot;
    C.map(function(I) {
      var P = I.source === null ? null : this._sources.at(I.source);
      return P = e.computeSourceURL(x, P, this._sourceMapURL), {
        source: P,
        generatedLine: I.generatedLine,
        generatedColumn: I.generatedColumn,
        originalLine: I.originalLine,
        originalColumn: I.originalColumn,
        name: I.name === null ? null : this._names.at(I.name)
      };
    }, this).forEach(D, A);
  }, c.prototype.allGeneratedPositionsFor = function(D) {
    var F = e.getArg(D, "line"), g = {
      source: e.getArg(D, "source"),
      originalLine: F,
      originalColumn: e.getArg(D, "column", 0)
    };
    if (g.source = this._findSourceIndex(g.source), g.source < 0)
      return [];
    var A = [], v = this._findMapping(
      g,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      t.LEAST_UPPER_BOUND
    );
    if (v >= 0) {
      var C = this._originalMappings[v];
      if (D.column === void 0)
        for (var x = C.originalLine; C && C.originalLine === x; )
          A.push({
            line: e.getArg(C, "generatedLine", null),
            column: e.getArg(C, "generatedColumn", null),
            lastColumn: e.getArg(C, "lastGeneratedColumn", null)
          }), C = this._originalMappings[++v];
      else
        for (var I = C.originalColumn; C && C.originalLine === F && C.originalColumn == I; )
          A.push({
            line: e.getArg(C, "generatedLine", null),
            column: e.getArg(C, "generatedColumn", null),
            lastColumn: e.getArg(C, "lastGeneratedColumn", null)
          }), C = this._originalMappings[++v];
    }
    return A;
  }, Xe.SourceMapConsumer = c;
  function a(m, D) {
    var F = m;
    typeof m == "string" && (F = e.parseSourceMapInput(m));
    var g = e.getArg(F, "version"), A = e.getArg(F, "sources"), v = e.getArg(F, "names", []), C = e.getArg(F, "sourceRoot", null), x = e.getArg(F, "sourcesContent", null), I = e.getArg(F, "mappings"), P = e.getArg(F, "file", null);
    if (g != this._version)
      throw new Error("Unsupported version: " + g);
    C && (C = e.normalize(C)), A = A.map(String).map(e.normalize).map(function(M) {
      return C && e.isAbsolute(C) && e.isAbsolute(M) ? e.relative(C, M) : M;
    }), this._names = i.fromArray(v.map(String), !0), this._sources = i.fromArray(A, !0), this._absoluteSources = this._sources.toArray().map(function(M) {
      return e.computeSourceURL(C, M, D);
    }), this.sourceRoot = C, this.sourcesContent = x, this._mappings = I, this._sourceMapURL = D, this.file = P;
  }
  a.prototype = Object.create(c.prototype), a.prototype.consumer = c, a.prototype._findSourceIndex = function(m) {
    var D = m;
    if (this.sourceRoot != null && (D = e.relative(this.sourceRoot, D)), this._sources.has(D))
      return this._sources.indexOf(D);
    var F;
    for (F = 0; F < this._absoluteSources.length; ++F)
      if (this._absoluteSources[F] == m)
        return F;
    return -1;
  }, a.fromSourceMap = function(D, F) {
    var g = Object.create(a.prototype), A = g._names = i.fromArray(D._names.toArray(), !0), v = g._sources = i.fromArray(D._sources.toArray(), !0);
    g.sourceRoot = D._sourceRoot, g.sourcesContent = D._generateSourcesContent(
      g._sources.toArray(),
      g.sourceRoot
    ), g.file = D._file, g._sourceMapURL = F, g._absoluteSources = g._sources.toArray().map(function(B) {
      return e.computeSourceURL(g.sourceRoot, B, F);
    });
    for (var C = D._mappings.toArray().slice(), x = g.__generatedMappings = [], I = g.__originalMappings = [], P = 0, M = C.length; P < M; P++) {
      var y = C[P], E = new f();
      E.generatedLine = y.generatedLine, E.generatedColumn = y.generatedColumn, y.source && (E.source = v.indexOf(y.source), E.originalLine = y.originalLine, E.originalColumn = y.originalColumn, y.name && (E.name = A.indexOf(y.name)), I.push(E)), x.push(E);
    }
    return n(g.__originalMappings, e.compareByOriginalPositions), g;
  }, a.prototype._version = 3, Object.defineProperty(a.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function f() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
  }
  a.prototype._parseMappings = function(D, F) {
    for (var g = 1, A = 0, v = 0, C = 0, x = 0, I = 0, P = D.length, M = 0, y = {}, E = {}, B = [], S = [], w, j, T, W, V; M < P; )
      if (D.charAt(M) === ";")
        g++, M++, A = 0;
      else if (D.charAt(M) === ",")
        M++;
      else {
        for (w = new f(), w.generatedLine = g, W = M; W < P && !this._charIsMappingSeparator(D, W); W++)
          ;
        if (j = D.slice(M, W), T = y[j], T)
          M += j.length;
        else {
          for (T = []; M < W; )
            u.decode(D, M, E), V = E.value, M = E.rest, T.push(V);
          if (T.length === 2)
            throw new Error("Found a source, but no line and column");
          if (T.length === 3)
            throw new Error("Found a source and line, but no column");
          y[j] = T;
        }
        w.generatedColumn = A + T[0], A = w.generatedColumn, T.length > 1 && (w.source = x + T[1], x += T[1], w.originalLine = v + T[2], v = w.originalLine, w.originalLine += 1, w.originalColumn = C + T[3], C = w.originalColumn, T.length > 4 && (w.name = I + T[4], I += T[4])), S.push(w), typeof w.originalLine == "number" && B.push(w);
      }
    n(S, e.compareByGeneratedPositionsDeflated), this.__generatedMappings = S, n(B, e.compareByOriginalPositions), this.__originalMappings = B;
  }, a.prototype._findMapping = function(D, F, g, A, v, C) {
    if (D[g] <= 0)
      throw new TypeError("Line must be greater than or equal to 1, got " + D[g]);
    if (D[A] < 0)
      throw new TypeError("Column must be greater than or equal to 0, got " + D[A]);
    return t.search(D, F, v, C);
  }, a.prototype.computeColumnSpans = function() {
    for (var D = 0; D < this._generatedMappings.length; ++D) {
      var F = this._generatedMappings[D];
      if (D + 1 < this._generatedMappings.length) {
        var g = this._generatedMappings[D + 1];
        if (F.generatedLine === g.generatedLine) {
          F.lastGeneratedColumn = g.generatedColumn - 1;
          continue;
        }
      }
      F.lastGeneratedColumn = 1 / 0;
    }
  }, a.prototype.originalPositionFor = function(D) {
    var F = {
      generatedLine: e.getArg(D, "line"),
      generatedColumn: e.getArg(D, "column")
    }, g = this._findMapping(
      F,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      e.compareByGeneratedPositionsDeflated,
      e.getArg(D, "bias", c.GREATEST_LOWER_BOUND)
    );
    if (g >= 0) {
      var A = this._generatedMappings[g];
      if (A.generatedLine === F.generatedLine) {
        var v = e.getArg(A, "source", null);
        v !== null && (v = this._sources.at(v), v = e.computeSourceURL(this.sourceRoot, v, this._sourceMapURL));
        var C = e.getArg(A, "name", null);
        return C !== null && (C = this._names.at(C)), {
          source: v,
          line: e.getArg(A, "originalLine", null),
          column: e.getArg(A, "originalColumn", null),
          name: C
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, a.prototype.hasContentsOfAllSources = function() {
    return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(D) {
      return D == null;
    }) : !1;
  }, a.prototype.sourceContentFor = function(D, F) {
    if (!this.sourcesContent)
      return null;
    var g = this._findSourceIndex(D);
    if (g >= 0)
      return this.sourcesContent[g];
    var A = D;
    this.sourceRoot != null && (A = e.relative(this.sourceRoot, A));
    var v;
    if (this.sourceRoot != null && (v = e.urlParse(this.sourceRoot))) {
      var C = A.replace(/^file:\/\//, "");
      if (v.scheme == "file" && this._sources.has(C))
        return this.sourcesContent[this._sources.indexOf(C)];
      if ((!v.path || v.path == "/") && this._sources.has("/" + A))
        return this.sourcesContent[this._sources.indexOf("/" + A)];
    }
    if (F)
      return null;
    throw new Error('"' + A + '" is not in the SourceMap.');
  }, a.prototype.generatedPositionFor = function(D) {
    var F = e.getArg(D, "source");
    if (F = this._findSourceIndex(F), F < 0)
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    var g = {
      source: F,
      originalLine: e.getArg(D, "line"),
      originalColumn: e.getArg(D, "column")
    }, A = this._findMapping(
      g,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      e.getArg(D, "bias", c.GREATEST_LOWER_BOUND)
    );
    if (A >= 0) {
      var v = this._originalMappings[A];
      if (v.source === g.source)
        return {
          line: e.getArg(v, "generatedLine", null),
          column: e.getArg(v, "generatedColumn", null),
          lastColumn: e.getArg(v, "lastGeneratedColumn", null)
        };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, Xe.BasicSourceMapConsumer = a;
  function p(m, D) {
    var F = m;
    typeof m == "string" && (F = e.parseSourceMapInput(m));
    var g = e.getArg(F, "version"), A = e.getArg(F, "sections");
    if (g != this._version)
      throw new Error("Unsupported version: " + g);
    this._sources = new i(), this._names = new i();
    var v = {
      line: -1,
      column: 0
    };
    this._sections = A.map(function(C) {
      if (C.url)
        throw new Error("Support for url field in sections not implemented.");
      var x = e.getArg(C, "offset"), I = e.getArg(x, "line"), P = e.getArg(x, "column");
      if (I < v.line || I === v.line && P < v.column)
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return v = x, {
        generatedOffset: {
          generatedLine: I + 1,
          generatedColumn: P + 1
        },
        consumer: new c(e.getArg(C, "map"), D)
      };
    });
  }
  return p.prototype = Object.create(c.prototype), p.prototype.constructor = c, p.prototype._version = 3, Object.defineProperty(p.prototype, "sources", {
    get: function() {
      for (var m = [], D = 0; D < this._sections.length; D++)
        for (var F = 0; F < this._sections[D].consumer.sources.length; F++)
          m.push(this._sections[D].consumer.sources[F]);
      return m;
    }
  }), p.prototype.originalPositionFor = function(D) {
    var F = {
      generatedLine: e.getArg(D, "line"),
      generatedColumn: e.getArg(D, "column")
    }, g = t.search(
      F,
      this._sections,
      function(v, C) {
        var x = v.generatedLine - C.generatedOffset.generatedLine;
        return x || v.generatedColumn - C.generatedOffset.generatedColumn;
      }
    ), A = this._sections[g];
    return A ? A.consumer.originalPositionFor({
      line: F.generatedLine - (A.generatedOffset.generatedLine - 1),
      column: F.generatedColumn - (A.generatedOffset.generatedLine === F.generatedLine ? A.generatedOffset.generatedColumn - 1 : 0),
      bias: D.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, p.prototype.hasContentsOfAllSources = function() {
    return this._sections.every(function(D) {
      return D.consumer.hasContentsOfAllSources();
    });
  }, p.prototype.sourceContentFor = function(D, F) {
    for (var g = 0; g < this._sections.length; g++) {
      var A = this._sections[g], v = A.consumer.sourceContentFor(D, !0);
      if (v)
        return v;
    }
    if (F)
      return null;
    throw new Error('"' + D + '" is not in the SourceMap.');
  }, p.prototype.generatedPositionFor = function(D) {
    for (var F = 0; F < this._sections.length; F++) {
      var g = this._sections[F];
      if (g.consumer._findSourceIndex(e.getArg(D, "source")) !== -1) {
        var A = g.consumer.generatedPositionFor(D);
        if (A) {
          var v = {
            line: A.line + (g.generatedOffset.generatedLine - 1),
            column: A.column + (g.generatedOffset.generatedLine === A.line ? g.generatedOffset.generatedColumn - 1 : 0)
          };
          return v;
        }
      }
    }
    return {
      line: null,
      column: null
    };
  }, p.prototype._parseMappings = function(D, F) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var g = 0; g < this._sections.length; g++)
      for (var A = this._sections[g], v = A.consumer._generatedMappings, C = 0; C < v.length; C++) {
        var x = v[C], I = A.consumer._sources.at(x.source);
        I = e.computeSourceURL(A.consumer.sourceRoot, I, this._sourceMapURL), this._sources.add(I), I = this._sources.indexOf(I);
        var P = null;
        x.name && (P = A.consumer._names.at(x.name), this._names.add(P), P = this._names.indexOf(P));
        var M = {
          source: I,
          generatedLine: x.generatedLine + (A.generatedOffset.generatedLine - 1),
          generatedColumn: x.generatedColumn + (A.generatedOffset.generatedLine === x.generatedLine ? A.generatedOffset.generatedColumn - 1 : 0),
          originalLine: x.originalLine,
          originalColumn: x.originalColumn,
          name: P
        };
        this.__generatedMappings.push(M), typeof M.originalLine == "number" && this.__originalMappings.push(M);
      }
    n(this.__generatedMappings, e.compareByGeneratedPositionsDeflated), n(this.__originalMappings, e.compareByOriginalPositions);
  }, Xe.IndexedSourceMapConsumer = p, Xe;
}
var St = {}, hi;
function nu() {
  if (hi)
    return St;
  hi = 1;
  var e = wi().SourceMapGenerator, t = tt(), i = /(\r?\n)/, u = 10, n = "$$$isSourceNode$$$";
  function c(a, f, p, m, D) {
    this.children = [], this.sourceContents = {}, this.line = a ?? null, this.column = f ?? null, this.source = p ?? null, this.name = D ?? null, this[n] = !0, m != null && this.add(m);
  }
  return c.fromStringWithSourceMap = function(f, p, m) {
    var D = new c(), F = f.split(i), g = 0, A = function() {
      var P = y(), M = y() || "";
      return P + M;
      function y() {
        return g < F.length ? F[g++] : void 0;
      }
    }, v = 1, C = 0, x = null;
    return p.eachMapping(function(P) {
      if (x !== null)
        if (v < P.generatedLine)
          I(x, A()), v++, C = 0;
        else {
          var M = F[g] || "", y = M.substr(0, P.generatedColumn - C);
          F[g] = M.substr(P.generatedColumn - C), C = P.generatedColumn, I(x, y), x = P;
          return;
        }
      for (; v < P.generatedLine; )
        D.add(A()), v++;
      if (C < P.generatedColumn) {
        var M = F[g] || "";
        D.add(M.substr(0, P.generatedColumn)), F[g] = M.substr(P.generatedColumn), C = P.generatedColumn;
      }
      x = P;
    }, this), g < F.length && (x && I(x, A()), D.add(F.splice(g).join(""))), p.sources.forEach(function(P) {
      var M = p.sourceContentFor(P);
      M != null && (m != null && (P = t.join(m, P)), D.setSourceContent(P, M));
    }), D;
    function I(P, M) {
      if (P === null || P.source === void 0)
        D.add(M);
      else {
        var y = m ? t.join(m, P.source) : P.source;
        D.add(new c(
          P.originalLine,
          P.originalColumn,
          y,
          M,
          P.name
        ));
      }
    }
  }, c.prototype.add = function(f) {
    if (Array.isArray(f))
      f.forEach(function(p) {
        this.add(p);
      }, this);
    else if (f[n] || typeof f == "string")
      f && this.children.push(f);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + f
      );
    return this;
  }, c.prototype.prepend = function(f) {
    if (Array.isArray(f))
      for (var p = f.length - 1; p >= 0; p--)
        this.prepend(f[p]);
    else if (f[n] || typeof f == "string")
      this.children.unshift(f);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + f
      );
    return this;
  }, c.prototype.walk = function(f) {
    for (var p, m = 0, D = this.children.length; m < D; m++)
      p = this.children[m], p[n] ? p.walk(f) : p !== "" && f(p, {
        source: this.source,
        line: this.line,
        column: this.column,
        name: this.name
      });
  }, c.prototype.join = function(f) {
    var p, m, D = this.children.length;
    if (D > 0) {
      for (p = [], m = 0; m < D - 1; m++)
        p.push(this.children[m]), p.push(f);
      p.push(this.children[m]), this.children = p;
    }
    return this;
  }, c.prototype.replaceRight = function(f, p) {
    var m = this.children[this.children.length - 1];
    return m[n] ? m.replaceRight(f, p) : typeof m == "string" ? this.children[this.children.length - 1] = m.replace(f, p) : this.children.push("".replace(f, p)), this;
  }, c.prototype.setSourceContent = function(f, p) {
    this.sourceContents[t.toSetString(f)] = p;
  }, c.prototype.walkSourceContents = function(f) {
    for (var p = 0, m = this.children.length; p < m; p++)
      this.children[p][n] && this.children[p].walkSourceContents(f);
    for (var D = Object.keys(this.sourceContents), p = 0, m = D.length; p < m; p++)
      f(t.fromSetString(D[p]), this.sourceContents[D[p]]);
  }, c.prototype.toString = function() {
    var f = "";
    return this.walk(function(p) {
      f += p;
    }), f;
  }, c.prototype.toStringWithSourceMap = function(f) {
    var p = {
      code: "",
      line: 1,
      column: 0
    }, m = new e(f), D = !1, F = null, g = null, A = null, v = null;
    return this.walk(function(C, x) {
      p.code += C, x.source !== null && x.line !== null && x.column !== null ? ((F !== x.source || g !== x.line || A !== x.column || v !== x.name) && m.addMapping({
        source: x.source,
        original: {
          line: x.line,
          column: x.column
        },
        generated: {
          line: p.line,
          column: p.column
        },
        name: x.name
      }), F = x.source, g = x.line, A = x.column, v = x.name, D = !0) : D && (m.addMapping({
        generated: {
          line: p.line,
          column: p.column
        }
      }), F = null, D = !1);
      for (var I = 0, P = C.length; I < P; I++)
        C.charCodeAt(I) === u ? (p.line++, p.column = 0, I + 1 === P ? (F = null, D = !1) : D && m.addMapping({
          source: x.source,
          original: {
            line: x.line,
            column: x.column
          },
          generated: {
            line: p.line,
            column: p.column
          },
          name: x.name
        })) : p.column++;
    }), this.walkSourceContents(function(C, x) {
      m.setSourceContent(C, x);
    }), { code: p.code, map: m };
  }, St.SourceNode = c, St;
}
var fi;
function su() {
  return fi || (fi = 1, Ye.SourceMapGenerator = wi().SourceMapGenerator, Ye.SourceMapConsumer = uu().SourceMapConsumer, Ye.SourceNode = nu().SourceNode), Ye;
}
const au = "escodegen", ou = "ECMAScript code generator", lu = "http://github.com/estools/escodegen", cu = "escodegen.js", hu = {
  esgenerate: "./bin/esgenerate.js",
  escodegen: "./bin/escodegen.js"
}, fu = [
  "LICENSE.BSD",
  "README.md",
  "bin",
  "escodegen.js",
  "package.json"
], pu = "2.0.0", du = {
  node: ">=6.0"
}, Du = [
  {
    name: "Yusuke Suzuki",
    email: "utatane.tea@gmail.com",
    web: "http://github.com/Constellation"
  }
], mu = {
  type: "git",
  url: "http://github.com/estools/escodegen.git"
}, gu = {
  estraverse: "^5.2.0",
  esutils: "^2.0.2",
  esprima: "^4.0.1",
  optionator: "^0.8.1"
}, Cu = {
  "source-map": "~0.6.1"
}, Au = {
  acorn: "^7.3.1",
  bluebird: "^3.4.7",
  "bower-registry-client": "^1.0.0",
  chai: "^4.2.0",
  "chai-exclude": "^2.0.2",
  "commonjs-everywhere": "^0.9.7",
  gulp: "^3.8.10",
  "gulp-eslint": "^3.0.1",
  "gulp-mocha": "^3.0.1",
  semver: "^5.1.0"
}, Eu = "BSD-2-Clause", Fu = {
  test: "gulp travis",
  "unit-test": "gulp test",
  lint: "gulp lint",
  release: "node tools/release.js",
  "build-min": "./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
  build: "./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js"
}, vu = {
  name: au,
  description: ou,
  homepage: lu,
  main: cu,
  bin: hu,
  files: fu,
  version: pu,
  engines: du,
  maintainers: Du,
  repository: mu,
  dependencies: gu,
  optionalDependencies: Cu,
  devDependencies: Au,
  license: Eu,
  scripts: Fu
};
(function(e) {
  (function() {
    var t, i, u, n, c, a, f, p, m, D, F, g, A, v, C, x, I, P, M, y, E, B, S, w, j, T;
    c = yi, a = ht, t = c.Syntax;
    function W(r) {
      return ne.Expression.hasOwnProperty(r.type);
    }
    function V(r) {
      return ne.Statement.hasOwnProperty(r.type);
    }
    i = {
      Sequence: 0,
      Yield: 1,
      Assignment: 1,
      Conditional: 2,
      ArrowFunction: 2,
      LogicalOR: 3,
      LogicalAND: 4,
      BitwiseOR: 5,
      BitwiseXOR: 6,
      BitwiseAND: 7,
      Equality: 8,
      Relational: 9,
      BitwiseSHIFT: 10,
      Additive: 11,
      Multiplicative: 12,
      Exponentiation: 13,
      Await: 14,
      Unary: 14,
      Postfix: 15,
      OptionalChaining: 16,
      Call: 17,
      New: 18,
      TaggedTemplate: 19,
      Member: 20,
      Primary: 21
    }, u = {
      "||": i.LogicalOR,
      "&&": i.LogicalAND,
      "|": i.BitwiseOR,
      "^": i.BitwiseXOR,
      "&": i.BitwiseAND,
      "==": i.Equality,
      "!=": i.Equality,
      "===": i.Equality,
      "!==": i.Equality,
      is: i.Equality,
      isnt: i.Equality,
      "<": i.Relational,
      ">": i.Relational,
      "<=": i.Relational,
      ">=": i.Relational,
      in: i.Relational,
      instanceof: i.Relational,
      "<<": i.BitwiseSHIFT,
      ">>": i.BitwiseSHIFT,
      ">>>": i.BitwiseSHIFT,
      "+": i.Additive,
      "-": i.Additive,
      "*": i.Multiplicative,
      "%": i.Multiplicative,
      "/": i.Multiplicative,
      "**": i.Exponentiation
    };
    var R = 1, H = 1 << 1, X = 1 << 2, ie = 1 << 3, te = 1 << 4, Y = 1 << 5, ge = H | X, ye = R | H, N = R | H | X, Te = R, He = X, Qe = R | X, Z = R, De = R | Y, nt = 0, lr = R | te, cr = R | ie;
    function zt() {
      return {
        indent: null,
        base: null,
        parse: null,
        comment: !1,
        format: {
          indent: {
            style: "    ",
            base: 0,
            adjustMultilineComment: !1
          },
          newline: `
`,
          space: " ",
          json: !1,
          renumber: !1,
          hexadecimal: !1,
          quotes: "single",
          escapeless: !1,
          compact: !1,
          parentheses: !0,
          semicolons: !0,
          safeConcatenation: !1,
          preserveBlankLines: !1
        },
        moz: {
          comprehensionExpressionStartsWithAssignment: !1,
          starlessGenerator: !1
        },
        sourceMap: null,
        sourceMapRoot: null,
        sourceMapWithCode: !1,
        directive: !1,
        raw: !0,
        verbatim: null,
        sourceCode: null
      };
    }
    function Re(r, o) {
      var s = "";
      for (o |= 0; o > 0; o >>>= 1, r += r)
        o & 1 && (s += r);
      return s;
    }
    function hr(r) {
      return /[\r\n]/g.test(r);
    }
    function le(r) {
      var o = r.length;
      return o && a.code.isLineTerminator(r.charCodeAt(o - 1));
    }
    function Ht(r, o) {
      var s;
      for (s in o)
        o.hasOwnProperty(s) && (r[s] = o[s]);
      return r;
    }
    function st(r, o) {
      var s, l;
      function d(b) {
        return typeof b == "object" && b instanceof Object && !(b instanceof RegExp);
      }
      for (s in o)
        o.hasOwnProperty(s) && (l = o[s], d(l) ? d(r[s]) ? st(r[s], l) : r[s] = st({}, l) : r[s] = l);
      return r;
    }
    function fr(r) {
      var o, s, l, d, b;
      if (r !== r)
        throw new Error("Numeric literal whose value is NaN");
      if (r < 0 || r === 0 && 1 / r < 0)
        throw new Error("Numeric literal whose value is negative");
      if (r === 1 / 0)
        return m ? "null" : D ? "1e400" : "1e+400";
      if (o = "" + r, !D || o.length < 3)
        return o;
      for (s = o.indexOf("."), !m && o.charCodeAt(0) === 48 && s === 1 && (s = 0, o = o.slice(1)), l = o, o = o.replace("e+", "e"), d = 0, (b = l.indexOf("e")) > 0 && (d = +l.slice(b + 1), l = l.slice(0, b)), s >= 0 && (d -= l.length - s - 1, l = +(l.slice(0, s) + l.slice(s + 1)) + ""), b = 0; l.charCodeAt(l.length + b - 1) === 48; )
        --b;
      return b !== 0 && (d -= b, l = l.slice(0, b)), d !== 0 && (l += "e" + d), (l.length < o.length || F && r > 1e12 && Math.floor(r) === r && (l = "0x" + r.toString(16)).length < o.length) && +l === r && (o = l), o;
    }
    function Qt(r, o) {
      return (r & -2) === 8232 ? (o ? "u" : "\\u") + (r === 8232 ? "2028" : "2029") : r === 10 || r === 13 ? (o ? "" : "\\") + (r === 10 ? "n" : "r") : String.fromCharCode(r);
    }
    function pr(r) {
      var o, s, l, d, b, _, k, L;
      if (s = r.toString(), r.source) {
        if (o = s.match(/\/([^/]*)$/), !o)
          return s;
        for (l = o[1], s = "", k = !1, L = !1, d = 0, b = r.source.length; d < b; ++d)
          _ = r.source.charCodeAt(d), L ? (s += Qt(_, L), L = !1) : (k ? _ === 93 && (k = !1) : _ === 47 ? s += "\\" : _ === 91 && (k = !0), s += Qt(_, L), L = _ === 92);
        return "/" + s + "/" + l;
      }
      return s;
    }
    function dr(r, o) {
      var s;
      return r === 8 ? "\\b" : r === 12 ? "\\f" : r === 9 ? "\\t" : (s = r.toString(16).toUpperCase(), m || r > 255 ? "\\u" + "0000".slice(s.length) + s : r === 0 && !a.code.isDecimalDigit(o) ? "\\0" : r === 11 ? "\\x0B" : "\\x" + "00".slice(s.length) + s);
    }
    function Dr(r) {
      if (r === 92)
        return "\\\\";
      if (r === 10)
        return "\\n";
      if (r === 13)
        return "\\r";
      if (r === 8232)
        return "\\u2028";
      if (r === 8233)
        return "\\u2029";
      throw new Error("Incorrectly classified character");
    }
    function mr(r) {
      var o, s, l, d;
      for (d = g === "double" ? '"' : "'", o = 0, s = r.length; o < s; ++o)
        if (l = r.charCodeAt(o), l === 39) {
          d = '"';
          break;
        } else if (l === 34) {
          d = "'";
          break;
        } else
          l === 92 && ++o;
      return d + r + d;
    }
    function gr(r) {
      var o = "", s, l, d, b = 0, _ = 0, k, L;
      for (s = 0, l = r.length; s < l; ++s) {
        if (d = r.charCodeAt(s), d === 39)
          ++b;
        else if (d === 34)
          ++_;
        else if (d === 47 && m)
          o += "\\";
        else if (a.code.isLineTerminator(d) || d === 92) {
          o += Dr(d);
          continue;
        } else if (!a.code.isIdentifierPartES5(d) && (m && d < 32 || !m && !A && (d < 32 || d > 126))) {
          o += dr(d, r.charCodeAt(s + 1));
          continue;
        }
        o += String.fromCharCode(d);
      }
      if (k = !(g === "double" || g === "auto" && _ < b), L = k ? "'" : '"', !(k ? b : _))
        return L + o + L;
      for (r = o, o = L, s = 0, l = r.length; s < l; ++s)
        d = r.charCodeAt(s), (d === 39 && k || d === 34 && !k) && (o += "\\"), o += String.fromCharCode(d);
      return o + L;
    }
    function Kt(r) {
      var o, s, l, d = "";
      for (o = 0, s = r.length; o < s; ++o)
        l = r[o], d += Array.isArray(l) ? Kt(l) : l;
      return d;
    }
    function J(r, o) {
      if (!B)
        return Array.isArray(r) ? Kt(r) : r;
      if (o == null) {
        if (r instanceof n)
          return r;
        o = {};
      }
      return o.loc == null ? new n(null, null, B, r, o.name || null) : new n(o.loc.start.line, o.loc.start.column, B === !0 ? o.loc.source || null : B, r, o.name || null);
    }
    function ce() {
      return C || " ";
    }
    function U(r, o) {
      var s, l, d, b;
      return s = J(r).toString(), s.length === 0 ? [o] : (l = J(o).toString(), l.length === 0 ? [r] : (d = s.charCodeAt(s.length - 1), b = l.charCodeAt(0), (d === 43 || d === 45) && d === b || a.code.isIdentifierPartES5(d) && a.code.isIdentifierPartES5(b) || d === 47 && b === 105 ? [r, ce(), o] : a.code.isWhiteSpace(d) || a.code.isLineTerminator(d) || a.code.isWhiteSpace(b) || a.code.isLineTerminator(b) ? [r, o] : [r, C, o]));
    }
    function fe(r) {
      return [f, r];
    }
    function ue(r) {
      var o;
      o = f, f += p, r(f), f = o;
    }
    function Cr(r) {
      var o;
      for (o = r.length - 1; o >= 0 && !a.code.isLineTerminator(r.charCodeAt(o)); --o)
        ;
      return r.length - 1 - o;
    }
    function Ar(r, o) {
      var s, l, d, b, _, k, L, Q;
      for (s = r.split(/\r\n|[\r\n]/), k = Number.MAX_VALUE, l = 1, d = s.length; l < d; ++l) {
        for (b = s[l], _ = 0; _ < b.length && a.code.isWhiteSpace(b.charCodeAt(_)); )
          ++_;
        k > _ && (k = _);
      }
      for (typeof o < "u" ? (L = f, s[1][k] === "*" && (o += " "), f = o) : (k & 1 && --k, L = f), l = 1, d = s.length; l < d; ++l)
        Q = J(fe(s[l].slice(k))), s[l] = B ? Q.join("") : Q;
      return f = L, s.join(`
`);
    }
    function Be(r, o) {
      if (r.type === "Line") {
        if (le(r.value))
          return "//" + r.value;
        var s = "//" + r.value;
        return w || (s += `
`), s;
      }
      return y.format.indent.adjustMultilineComment && /[\n\r]/.test(r.value) ? Ar("/*" + r.value + "*/", o) : "/*" + r.value + "*/";
    }
    function Yt(r, o) {
      var s, l, d, b, _, k, L, Q, ae, Me, Ue, Zt, Jt, be;
      if (r.leadingComments && r.leadingComments.length > 0) {
        if (b = o, w) {
          for (d = r.leadingComments[0], o = [], Q = d.extendedRange, ae = d.range, Ue = S.substring(Q[0], ae[0]), be = (Ue.match(/\n/g) || []).length, be > 0 ? (o.push(Re(`
`, be)), o.push(fe(Be(d)))) : (o.push(Ue), o.push(Be(d))), Me = ae, s = 1, l = r.leadingComments.length; s < l; s++)
            d = r.leadingComments[s], ae = d.range, Zt = S.substring(Me[1], ae[0]), be = (Zt.match(/\n/g) || []).length, o.push(Re(`
`, be)), o.push(fe(Be(d))), Me = ae;
          Jt = S.substring(ae[1], Q[1]), be = (Jt.match(/\n/g) || []).length, o.push(Re(`
`, be));
        } else
          for (d = r.leadingComments[0], o = [], P && r.type === t.Program && r.body.length === 0 && o.push(`
`), o.push(Be(d)), le(J(o).toString()) || o.push(`
`), s = 1, l = r.leadingComments.length; s < l; ++s)
            d = r.leadingComments[s], L = [Be(d)], le(J(L).toString()) || L.push(`
`), o.push(fe(L));
        o.push(fe(b));
      }
      if (r.trailingComments)
        if (w)
          d = r.trailingComments[0], Q = d.extendedRange, ae = d.range, Ue = S.substring(Q[0], ae[0]), be = (Ue.match(/\n/g) || []).length, be > 0 ? (o.push(Re(`
`, be)), o.push(fe(Be(d)))) : (o.push(Ue), o.push(Be(d)));
        else
          for (_ = !le(J(o).toString()), k = Re(" ", Cr(J([f, o, p]).toString())), s = 0, l = r.trailingComments.length; s < l; ++s)
            d = r.trailingComments[s], _ ? (s === 0 ? o = [o, p] : o = [o, k], o.push(Be(d, k))) : o = [o, fe(Be(d))], s !== l - 1 && !le(J(o).toString()) && (o = [o, `
`]);
      return o;
    }
    function qe(r, o, s) {
      var l, d = 0;
      for (l = r; l < o; l++)
        S[l] === `
` && d++;
      for (l = 1; l < d; l++)
        s.push(v);
    }
    function se(r, o, s) {
      return o < s ? ["(", r, ")"] : r;
    }
    function Xt(r) {
      var o, s, l;
      for (l = r.split(/\r\n|\n/), o = 1, s = l.length; o < s; o++)
        l[o] = v + f + l[o];
      return l;
    }
    function Er(r, o) {
      var s, l, d;
      return s = r[y.verbatim], typeof s == "string" ? l = se(Xt(s), i.Sequence, o) : (l = Xt(s.content), d = s.precedence != null ? s.precedence : i.Sequence, l = se(l, d, o)), J(l, r);
    }
    function ne() {
    }
    ne.prototype.maybeBlock = function(r, o) {
      var s, l, d = this;
      return l = !y.comment || !r.leadingComments, r.type === t.BlockStatement && l ? [C, this.generateStatement(r, o)] : r.type === t.EmptyStatement && l ? ";" : (ue(function() {
        s = [
          v,
          fe(d.generateStatement(r, o))
        ];
      }), s);
    }, ne.prototype.maybeBlockSuffix = function(r, o) {
      var s = le(J(o).toString());
      return r.type === t.BlockStatement && (!y.comment || !r.leadingComments) && !s ? [o, C] : s ? [o, f] : [o, v, f];
    };
    function me(r) {
      return J(r.name, r);
    }
    function Ke(r, o) {
      return r.async ? "async" + (o ? ce() : C) : "";
    }
    function at(r) {
      var o = r.generator && !y.moz.starlessGenerator;
      return o ? "*" + C : "";
    }
    function $t(r) {
      var o = r.value, s = "";
      return o.async && (s += Ke(o, !r.computed)), o.generator && (s += at(o) ? "*" : ""), s;
    }
    ne.prototype.generatePattern = function(r, o, s) {
      return r.type === t.Identifier ? me(r) : this.generateExpression(r, o, s);
    }, ne.prototype.generateFunctionParams = function(r) {
      var o, s, l, d;
      if (d = !1, r.type === t.ArrowFunctionExpression && !r.rest && (!r.defaults || r.defaults.length === 0) && r.params.length === 1 && r.params[0].type === t.Identifier)
        l = [Ke(r, !0), me(r.params[0])];
      else {
        for (l = r.type === t.ArrowFunctionExpression ? [Ke(r, !1)] : [], l.push("("), r.defaults && (d = !0), o = 0, s = r.params.length; o < s; ++o)
          d && r.defaults[o] ? l.push(this.generateAssignment(r.params[o], r.defaults[o], "=", i.Assignment, N)) : l.push(this.generatePattern(r.params[o], i.Assignment, N)), o + 1 < s && l.push("," + C);
        r.rest && (r.params.length && l.push("," + C), l.push("..."), l.push(me(r.rest))), l.push(")");
      }
      return l;
    }, ne.prototype.generateFunctionBody = function(r) {
      var o, s;
      return o = this.generateFunctionParams(r), r.type === t.ArrowFunctionExpression && (o.push(C), o.push("=>")), r.expression ? (o.push(C), s = this.generateExpression(r.body, i.Assignment, N), s.toString().charAt(0) === "{" && (s = ["(", s, ")"]), o.push(s)) : o.push(this.maybeBlock(r.body, cr)), o;
    }, ne.prototype.generateIterationForStatement = function(r, o, s) {
      var l = ["for" + (o.await ? ce() + "await" : "") + C + "("], d = this;
      return ue(function() {
        o.left.type === t.VariableDeclaration ? ue(function() {
          l.push(o.left.kind + ce()), l.push(d.generateStatement(o.left.declarations[0], nt));
        }) : l.push(d.generateExpression(o.left, i.Call, N)), l = U(l, r), l = [U(
          l,
          d.generateExpression(o.right, i.Assignment, N)
        ), ")"];
      }), l.push(this.maybeBlock(o.body, s)), l;
    }, ne.prototype.generatePropertyKey = function(r, o) {
      var s = [];
      return o && s.push("["), s.push(this.generateExpression(r, i.Assignment, N)), o && s.push("]"), s;
    }, ne.prototype.generateAssignment = function(r, o, s, l, d) {
      return i.Assignment < l && (d |= R), se(
        [
          this.generateExpression(r, i.Call, d),
          C + s + C,
          this.generateExpression(o, i.Assignment, d)
        ],
        i.Assignment,
        l
      );
    }, ne.prototype.semicolon = function(r) {
      return !I && r & Y ? "" : ";";
    }, ne.Statement = {
      BlockStatement: function(r, o) {
        var s, l, d = ["{", v], b = this;
        return ue(function() {
          r.body.length === 0 && w && (s = r.range, s[1] - s[0] > 2 && (l = S.substring(s[0] + 1, s[1] - 1), l[0] === `
` && (d = ["{"]), d.push(l)));
          var _, k, L, Q;
          for (Q = Z, o & ie && (Q |= te), _ = 0, k = r.body.length; _ < k; ++_)
            w && (_ === 0 && (r.body[0].leadingComments && (s = r.body[0].leadingComments[0].extendedRange, l = S.substring(s[0], s[1]), l[0] === `
` && (d = ["{"])), r.body[0].leadingComments || qe(r.range[0], r.body[0].range[0], d)), _ > 0 && !r.body[_ - 1].trailingComments && !r.body[_].leadingComments && qe(r.body[_ - 1].range[1], r.body[_].range[0], d)), _ === k - 1 && (Q |= Y), r.body[_].leadingComments && w ? L = b.generateStatement(r.body[_], Q) : L = fe(b.generateStatement(r.body[_], Q)), d.push(L), le(J(L).toString()) || w && _ < k - 1 && r.body[_ + 1].leadingComments || d.push(v), w && _ === k - 1 && (r.body[_].trailingComments || qe(r.body[_].range[1], r.range[1], d));
        }), d.push(fe("}")), d;
      },
      BreakStatement: function(r, o) {
        return r.label ? "break " + r.label.name + this.semicolon(o) : "break" + this.semicolon(o);
      },
      ContinueStatement: function(r, o) {
        return r.label ? "continue " + r.label.name + this.semicolon(o) : "continue" + this.semicolon(o);
      },
      ClassBody: function(r, o) {
        var s = ["{", v], l = this;
        return ue(function(d) {
          var b, _;
          for (b = 0, _ = r.body.length; b < _; ++b)
            s.push(d), s.push(l.generateExpression(r.body[b], i.Sequence, N)), b + 1 < _ && s.push(v);
        }), le(J(s).toString()) || s.push(v), s.push(f), s.push("}"), s;
      },
      ClassDeclaration: function(r, o) {
        var s, l;
        return s = ["class"], r.id && (s = U(s, this.generateExpression(r.id, i.Sequence, N))), r.superClass && (l = U("extends", this.generateExpression(r.superClass, i.Unary, N)), s = U(s, l)), s.push(C), s.push(this.generateStatement(r.body, De)), s;
      },
      DirectiveStatement: function(r, o) {
        return y.raw && r.raw ? r.raw + this.semicolon(o) : mr(r.directive) + this.semicolon(o);
      },
      DoWhileStatement: function(r, o) {
        var s = U("do", this.maybeBlock(r.body, Z));
        return s = this.maybeBlockSuffix(r.body, s), U(s, [
          "while" + C + "(",
          this.generateExpression(r.test, i.Sequence, N),
          ")" + this.semicolon(o)
        ]);
      },
      CatchClause: function(r, o) {
        var s, l = this;
        return ue(function() {
          var d;
          r.param ? (s = [
            "catch" + C + "(",
            l.generateExpression(r.param, i.Sequence, N),
            ")"
          ], r.guard && (d = l.generateExpression(r.guard, i.Sequence, N), s.splice(2, 0, " if ", d))) : s = ["catch"];
        }), s.push(this.maybeBlock(r.body, Z)), s;
      },
      DebuggerStatement: function(r, o) {
        return "debugger" + this.semicolon(o);
      },
      EmptyStatement: function(r, o) {
        return ";";
      },
      ExportDefaultDeclaration: function(r, o) {
        var s = ["export"], l;
        return l = o & Y ? De : Z, s = U(s, "default"), V(r.declaration) ? s = U(s, this.generateStatement(r.declaration, l)) : s = U(s, this.generateExpression(r.declaration, i.Assignment, N) + this.semicolon(o)), s;
      },
      ExportNamedDeclaration: function(r, o) {
        var s = ["export"], l, d = this;
        return l = o & Y ? De : Z, r.declaration ? U(s, this.generateStatement(r.declaration, l)) : (r.specifiers && (r.specifiers.length === 0 ? s = U(s, "{" + C + "}") : r.specifiers[0].type === t.ExportBatchSpecifier ? s = U(s, this.generateExpression(r.specifiers[0], i.Sequence, N)) : (s = U(s, "{"), ue(function(b) {
          var _, k;
          for (s.push(v), _ = 0, k = r.specifiers.length; _ < k; ++_)
            s.push(b), s.push(d.generateExpression(r.specifiers[_], i.Sequence, N)), _ + 1 < k && s.push("," + v);
        }), le(J(s).toString()) || s.push(v), s.push(f + "}")), r.source ? s = U(s, [
          "from" + C,
          this.generateExpression(r.source, i.Sequence, N),
          this.semicolon(o)
        ]) : s.push(this.semicolon(o))), s);
      },
      ExportAllDeclaration: function(r, o) {
        return [
          "export" + C,
          "*" + C,
          "from" + C,
          this.generateExpression(r.source, i.Sequence, N),
          this.semicolon(o)
        ];
      },
      ExpressionStatement: function(r, o) {
        var s, l;
        function d(k) {
          var L;
          return k.slice(0, 5) !== "class" ? !1 : (L = k.charCodeAt(5), L === 123 || a.code.isWhiteSpace(L) || a.code.isLineTerminator(L));
        }
        function b(k) {
          var L;
          return k.slice(0, 8) !== "function" ? !1 : (L = k.charCodeAt(8), L === 40 || a.code.isWhiteSpace(L) || L === 42 || a.code.isLineTerminator(L));
        }
        function _(k) {
          var L, Q, ae;
          if (k.slice(0, 5) !== "async" || !a.code.isWhiteSpace(k.charCodeAt(5)))
            return !1;
          for (Q = 6, ae = k.length; Q < ae && a.code.isWhiteSpace(k.charCodeAt(Q)); ++Q)
            ;
          return Q === ae || k.slice(Q, Q + 8) !== "function" ? !1 : (L = k.charCodeAt(Q + 8), L === 40 || a.code.isWhiteSpace(L) || L === 42 || a.code.isLineTerminator(L));
        }
        return s = [this.generateExpression(r.expression, i.Sequence, N)], l = J(s).toString(), l.charCodeAt(0) === 123 || d(l) || b(l) || _(l) || M && o & te && r.expression.type === t.Literal && typeof r.expression.value == "string" ? s = ["(", s, ")" + this.semicolon(o)] : s.push(this.semicolon(o)), s;
      },
      ImportDeclaration: function(r, o) {
        var s, l, d = this;
        return r.specifiers.length === 0 ? [
          "import",
          C,
          this.generateExpression(r.source, i.Sequence, N),
          this.semicolon(o)
        ] : (s = [
          "import"
        ], l = 0, r.specifiers[l].type === t.ImportDefaultSpecifier && (s = U(s, [
          this.generateExpression(r.specifiers[l], i.Sequence, N)
        ]), ++l), r.specifiers[l] && (l !== 0 && s.push(","), r.specifiers[l].type === t.ImportNamespaceSpecifier ? s = U(s, [
          C,
          this.generateExpression(r.specifiers[l], i.Sequence, N)
        ]) : (s.push(C + "{"), r.specifiers.length - l === 1 ? (s.push(C), s.push(this.generateExpression(r.specifiers[l], i.Sequence, N)), s.push(C + "}" + C)) : (ue(function(b) {
          var _, k;
          for (s.push(v), _ = l, k = r.specifiers.length; _ < k; ++_)
            s.push(b), s.push(d.generateExpression(r.specifiers[_], i.Sequence, N)), _ + 1 < k && s.push("," + v);
        }), le(J(s).toString()) || s.push(v), s.push(f + "}" + C)))), s = U(s, [
          "from" + C,
          this.generateExpression(r.source, i.Sequence, N),
          this.semicolon(o)
        ]), s);
      },
      VariableDeclarator: function(r, o) {
        var s = o & R ? N : ge;
        return r.init ? [
          this.generateExpression(r.id, i.Assignment, s),
          C,
          "=",
          C,
          this.generateExpression(r.init, i.Assignment, s)
        ] : this.generatePattern(r.id, i.Assignment, s);
      },
      VariableDeclaration: function(r, o) {
        var s, l, d, b, _, k = this;
        s = [r.kind], _ = o & R ? Z : nt;
        function L() {
          for (b = r.declarations[0], y.comment && b.leadingComments ? (s.push(`
`), s.push(fe(k.generateStatement(b, _)))) : (s.push(ce()), s.push(k.generateStatement(b, _))), l = 1, d = r.declarations.length; l < d; ++l)
            b = r.declarations[l], y.comment && b.leadingComments ? (s.push("," + v), s.push(fe(k.generateStatement(b, _)))) : (s.push("," + C), s.push(k.generateStatement(b, _)));
        }
        return r.declarations.length > 1 ? ue(L) : L(), s.push(this.semicolon(o)), s;
      },
      ThrowStatement: function(r, o) {
        return [U(
          "throw",
          this.generateExpression(r.argument, i.Sequence, N)
        ), this.semicolon(o)];
      },
      TryStatement: function(r, o) {
        var s, l, d, b;
        if (s = ["try", this.maybeBlock(r.block, Z)], s = this.maybeBlockSuffix(r.block, s), r.handlers)
          for (l = 0, d = r.handlers.length; l < d; ++l)
            s = U(s, this.generateStatement(r.handlers[l], Z)), (r.finalizer || l + 1 !== d) && (s = this.maybeBlockSuffix(r.handlers[l].body, s));
        else {
          for (b = r.guardedHandlers || [], l = 0, d = b.length; l < d; ++l)
            s = U(s, this.generateStatement(b[l], Z)), (r.finalizer || l + 1 !== d) && (s = this.maybeBlockSuffix(b[l].body, s));
          if (r.handler)
            if (Array.isArray(r.handler))
              for (l = 0, d = r.handler.length; l < d; ++l)
                s = U(s, this.generateStatement(r.handler[l], Z)), (r.finalizer || l + 1 !== d) && (s = this.maybeBlockSuffix(r.handler[l].body, s));
            else
              s = U(s, this.generateStatement(r.handler, Z)), r.finalizer && (s = this.maybeBlockSuffix(r.handler.body, s));
        }
        return r.finalizer && (s = U(s, ["finally", this.maybeBlock(r.finalizer, Z)])), s;
      },
      SwitchStatement: function(r, o) {
        var s, l, d, b, _, k = this;
        if (ue(function() {
          s = [
            "switch" + C + "(",
            k.generateExpression(r.discriminant, i.Sequence, N),
            ")" + C + "{" + v
          ];
        }), r.cases)
          for (_ = Z, d = 0, b = r.cases.length; d < b; ++d)
            d === b - 1 && (_ |= Y), l = fe(this.generateStatement(r.cases[d], _)), s.push(l), le(J(l).toString()) || s.push(v);
        return s.push(fe("}")), s;
      },
      SwitchCase: function(r, o) {
        var s, l, d, b, _, k = this;
        return ue(function() {
          for (r.test ? s = [
            U("case", k.generateExpression(r.test, i.Sequence, N)),
            ":"
          ] : s = ["default:"], d = 0, b = r.consequent.length, b && r.consequent[0].type === t.BlockStatement && (l = k.maybeBlock(r.consequent[0], Z), s.push(l), d = 1), d !== b && !le(J(s).toString()) && s.push(v), _ = Z; d < b; ++d)
            d === b - 1 && o & Y && (_ |= Y), l = fe(k.generateStatement(r.consequent[d], _)), s.push(l), d + 1 !== b && !le(J(l).toString()) && s.push(v);
        }), s;
      },
      IfStatement: function(r, o) {
        var s, l, d, b = this;
        return ue(function() {
          s = [
            "if" + C + "(",
            b.generateExpression(r.test, i.Sequence, N),
            ")"
          ];
        }), d = o & Y, l = Z, d && (l |= Y), r.alternate ? (s.push(this.maybeBlock(r.consequent, Z)), s = this.maybeBlockSuffix(r.consequent, s), r.alternate.type === t.IfStatement ? s = U(s, ["else ", this.generateStatement(r.alternate, l)]) : s = U(s, U("else", this.maybeBlock(r.alternate, l)))) : s.push(this.maybeBlock(r.consequent, l)), s;
      },
      ForStatement: function(r, o) {
        var s, l = this;
        return ue(function() {
          s = ["for" + C + "("], r.init ? r.init.type === t.VariableDeclaration ? s.push(l.generateStatement(r.init, nt)) : (s.push(l.generateExpression(r.init, i.Sequence, ge)), s.push(";")) : s.push(";"), r.test && (s.push(C), s.push(l.generateExpression(r.test, i.Sequence, N))), s.push(";"), r.update && (s.push(C), s.push(l.generateExpression(r.update, i.Sequence, N))), s.push(")");
        }), s.push(this.maybeBlock(r.body, o & Y ? De : Z)), s;
      },
      ForInStatement: function(r, o) {
        return this.generateIterationForStatement("in", r, o & Y ? De : Z);
      },
      ForOfStatement: function(r, o) {
        return this.generateIterationForStatement("of", r, o & Y ? De : Z);
      },
      LabeledStatement: function(r, o) {
        return [r.label.name + ":", this.maybeBlock(r.body, o & Y ? De : Z)];
      },
      Program: function(r, o) {
        var s, l, d, b, _;
        for (b = r.body.length, s = [P && b > 0 ? `
` : ""], _ = lr, d = 0; d < b; ++d)
          !P && d === b - 1 && (_ |= Y), w && (d === 0 && (r.body[0].leadingComments || qe(r.range[0], r.body[d].range[0], s)), d > 0 && !r.body[d - 1].trailingComments && !r.body[d].leadingComments && qe(r.body[d - 1].range[1], r.body[d].range[0], s)), l = fe(this.generateStatement(r.body[d], _)), s.push(l), d + 1 < b && !le(J(l).toString()) && (w && r.body[d + 1].leadingComments || s.push(v)), w && d === b - 1 && (r.body[d].trailingComments || qe(r.body[d].range[1], r.range[1], s));
        return s;
      },
      FunctionDeclaration: function(r, o) {
        return [
          Ke(r, !0),
          "function",
          at(r) || ce(),
          r.id ? me(r.id) : "",
          this.generateFunctionBody(r)
        ];
      },
      ReturnStatement: function(r, o) {
        return r.argument ? [U(
          "return",
          this.generateExpression(r.argument, i.Sequence, N)
        ), this.semicolon(o)] : ["return" + this.semicolon(o)];
      },
      WhileStatement: function(r, o) {
        var s, l = this;
        return ue(function() {
          s = [
            "while" + C + "(",
            l.generateExpression(r.test, i.Sequence, N),
            ")"
          ];
        }), s.push(this.maybeBlock(r.body, o & Y ? De : Z)), s;
      },
      WithStatement: function(r, o) {
        var s, l = this;
        return ue(function() {
          s = [
            "with" + C + "(",
            l.generateExpression(r.object, i.Sequence, N),
            ")"
          ];
        }), s.push(this.maybeBlock(r.body, o & Y ? De : Z)), s;
      }
    }, Ht(ne.prototype, ne.Statement), ne.Expression = {
      SequenceExpression: function(r, o, s) {
        var l, d, b;
        for (i.Sequence < o && (s |= R), l = [], d = 0, b = r.expressions.length; d < b; ++d)
          l.push(this.generateExpression(r.expressions[d], i.Assignment, s)), d + 1 < b && l.push("," + C);
        return se(l, i.Sequence, o);
      },
      AssignmentExpression: function(r, o, s) {
        return this.generateAssignment(r.left, r.right, r.operator, o, s);
      },
      ArrowFunctionExpression: function(r, o, s) {
        return se(this.generateFunctionBody(r), i.ArrowFunction, o);
      },
      ConditionalExpression: function(r, o, s) {
        return i.Conditional < o && (s |= R), se(
          [
            this.generateExpression(r.test, i.LogicalOR, s),
            C + "?" + C,
            this.generateExpression(r.consequent, i.Assignment, s),
            C + ":" + C,
            this.generateExpression(r.alternate, i.Assignment, s)
          ],
          i.Conditional,
          o
        );
      },
      LogicalExpression: function(r, o, s) {
        return this.BinaryExpression(r, o, s);
      },
      BinaryExpression: function(r, o, s) {
        var l, d, b, _, k, L;
        return _ = u[r.operator], d = r.operator === "**" ? i.Postfix : _, b = r.operator === "**" ? _ : _ + 1, _ < o && (s |= R), k = this.generateExpression(r.left, d, s), L = k.toString(), L.charCodeAt(L.length - 1) === 47 && a.code.isIdentifierPartES5(r.operator.charCodeAt(0)) ? l = [k, ce(), r.operator] : l = U(k, r.operator), k = this.generateExpression(r.right, b, s), r.operator === "/" && k.toString().charAt(0) === "/" || r.operator.slice(-1) === "<" && k.toString().slice(0, 3) === "!--" ? (l.push(ce()), l.push(k)) : l = U(l, k), r.operator === "in" && !(s & R) ? ["(", l, ")"] : se(l, _, o);
      },
      CallExpression: function(r, o, s) {
        var l, d, b;
        for (l = [this.generateExpression(r.callee, i.Call, ye)], r.optional && l.push("?."), l.push("("), d = 0, b = r.arguments.length; d < b; ++d)
          l.push(this.generateExpression(r.arguments[d], i.Assignment, N)), d + 1 < b && l.push("," + C);
        return l.push(")"), s & H ? se(l, i.Call, o) : ["(", l, ")"];
      },
      ChainExpression: function(r, o, s) {
        i.OptionalChaining < o && (s |= H);
        var l = this.generateExpression(r.expression, i.OptionalChaining, s);
        return se(l, i.OptionalChaining, o);
      },
      NewExpression: function(r, o, s) {
        var l, d, b, _, k;
        if (d = r.arguments.length, k = s & X && !x && d === 0 ? Qe : Te, l = U(
          "new",
          this.generateExpression(r.callee, i.New, k)
        ), !(s & X) || x || d > 0) {
          for (l.push("("), b = 0, _ = d; b < _; ++b)
            l.push(this.generateExpression(r.arguments[b], i.Assignment, N)), b + 1 < _ && l.push("," + C);
          l.push(")");
        }
        return se(l, i.New, o);
      },
      MemberExpression: function(r, o, s) {
        var l, d;
        return l = [this.generateExpression(r.object, i.Call, s & H ? ye : Te)], r.computed ? (r.optional && l.push("?."), l.push("["), l.push(this.generateExpression(r.property, i.Sequence, s & H ? N : Qe)), l.push("]")) : (!r.optional && r.object.type === t.Literal && typeof r.object.value == "number" && (d = J(l).toString(), d.indexOf(".") < 0 && !/[eExX]/.test(d) && a.code.isDecimalDigit(d.charCodeAt(d.length - 1)) && !(d.length >= 2 && d.charCodeAt(0) === 48) && l.push(" ")), l.push(r.optional ? "?." : "."), l.push(me(r.property))), se(l, i.Member, o);
      },
      MetaProperty: function(r, o, s) {
        var l;
        return l = [], l.push(typeof r.meta == "string" ? r.meta : me(r.meta)), l.push("."), l.push(typeof r.property == "string" ? r.property : me(r.property)), se(l, i.Member, o);
      },
      UnaryExpression: function(r, o, s) {
        var l, d, b, _, k;
        return d = this.generateExpression(r.argument, i.Unary, N), C === "" ? l = U(r.operator, d) : (l = [r.operator], r.operator.length > 2 ? l = U(l, d) : (_ = J(l).toString(), k = _.charCodeAt(_.length - 1), b = d.toString().charCodeAt(0), ((k === 43 || k === 45) && k === b || a.code.isIdentifierPartES5(k) && a.code.isIdentifierPartES5(b)) && l.push(ce()), l.push(d))), se(l, i.Unary, o);
      },
      YieldExpression: function(r, o, s) {
        var l;
        return r.delegate ? l = "yield*" : l = "yield", r.argument && (l = U(
          l,
          this.generateExpression(r.argument, i.Yield, N)
        )), se(l, i.Yield, o);
      },
      AwaitExpression: function(r, o, s) {
        var l = U(
          r.all ? "await*" : "await",
          this.generateExpression(r.argument, i.Await, N)
        );
        return se(l, i.Await, o);
      },
      UpdateExpression: function(r, o, s) {
        return r.prefix ? se(
          [
            r.operator,
            this.generateExpression(r.argument, i.Unary, N)
          ],
          i.Unary,
          o
        ) : se(
          [
            this.generateExpression(r.argument, i.Postfix, N),
            r.operator
          ],
          i.Postfix,
          o
        );
      },
      FunctionExpression: function(r, o, s) {
        var l = [
          Ke(r, !0),
          "function"
        ];
        return r.id ? (l.push(at(r) || ce()), l.push(me(r.id))) : l.push(at(r) || C), l.push(this.generateFunctionBody(r)), l;
      },
      ArrayPattern: function(r, o, s) {
        return this.ArrayExpression(r, o, s, !0);
      },
      ArrayExpression: function(r, o, s, l) {
        var d, b, _ = this;
        return r.elements.length ? (b = l ? !1 : r.elements.length > 1, d = ["[", b ? v : ""], ue(function(k) {
          var L, Q;
          for (L = 0, Q = r.elements.length; L < Q; ++L)
            r.elements[L] ? (d.push(b ? k : ""), d.push(_.generateExpression(r.elements[L], i.Assignment, N))) : (b && d.push(k), L + 1 === Q && d.push(",")), L + 1 < Q && d.push("," + (b ? v : C));
        }), b && !le(J(d).toString()) && d.push(v), d.push(b ? f : ""), d.push("]"), d) : "[]";
      },
      RestElement: function(r, o, s) {
        return "..." + this.generatePattern(r.argument);
      },
      ClassExpression: function(r, o, s) {
        var l, d;
        return l = ["class"], r.id && (l = U(l, this.generateExpression(r.id, i.Sequence, N))), r.superClass && (d = U("extends", this.generateExpression(r.superClass, i.Unary, N)), l = U(l, d)), l.push(C), l.push(this.generateStatement(r.body, De)), l;
      },
      MethodDefinition: function(r, o, s) {
        var l, d;
        return r.static ? l = ["static" + C] : l = [], r.kind === "get" || r.kind === "set" ? d = [
          U(r.kind, this.generatePropertyKey(r.key, r.computed)),
          this.generateFunctionBody(r.value)
        ] : d = [
          $t(r),
          this.generatePropertyKey(r.key, r.computed),
          this.generateFunctionBody(r.value)
        ], U(l, d);
      },
      Property: function(r, o, s) {
        return r.kind === "get" || r.kind === "set" ? [
          r.kind,
          ce(),
          this.generatePropertyKey(r.key, r.computed),
          this.generateFunctionBody(r.value)
        ] : r.shorthand ? r.value.type === "AssignmentPattern" ? this.AssignmentPattern(r.value, i.Sequence, N) : this.generatePropertyKey(r.key, r.computed) : r.method ? [
          $t(r),
          this.generatePropertyKey(r.key, r.computed),
          this.generateFunctionBody(r.value)
        ] : [
          this.generatePropertyKey(r.key, r.computed),
          ":" + C,
          this.generateExpression(r.value, i.Assignment, N)
        ];
      },
      ObjectExpression: function(r, o, s) {
        var l, d, b, _ = this;
        return r.properties.length ? (l = r.properties.length > 1, ue(function() {
          b = _.generateExpression(r.properties[0], i.Sequence, N);
        }), !l && !hr(J(b).toString()) ? ["{", C, b, C, "}"] : (ue(function(k) {
          var L, Q;
          if (d = ["{", v, k, b], l)
            for (d.push("," + v), L = 1, Q = r.properties.length; L < Q; ++L)
              d.push(k), d.push(_.generateExpression(r.properties[L], i.Sequence, N)), L + 1 < Q && d.push("," + v);
        }), le(J(d).toString()) || d.push(v), d.push(f), d.push("}"), d)) : "{}";
      },
      AssignmentPattern: function(r, o, s) {
        return this.generateAssignment(r.left, r.right, "=", o, s);
      },
      ObjectPattern: function(r, o, s) {
        var l, d, b, _, k, L = this;
        if (!r.properties.length)
          return "{}";
        if (_ = !1, r.properties.length === 1)
          k = r.properties[0], k.type === t.Property && k.value.type !== t.Identifier && (_ = !0);
        else
          for (d = 0, b = r.properties.length; d < b; ++d)
            if (k = r.properties[d], k.type === t.Property && !k.shorthand) {
              _ = !0;
              break;
            }
        return l = ["{", _ ? v : ""], ue(function(Q) {
          var ae, Me;
          for (ae = 0, Me = r.properties.length; ae < Me; ++ae)
            l.push(_ ? Q : ""), l.push(L.generateExpression(r.properties[ae], i.Sequence, N)), ae + 1 < Me && l.push("," + (_ ? v : C));
        }), _ && !le(J(l).toString()) && l.push(v), l.push(_ ? f : ""), l.push("}"), l;
      },
      ThisExpression: function(r, o, s) {
        return "this";
      },
      Super: function(r, o, s) {
        return "super";
      },
      Identifier: function(r, o, s) {
        return me(r);
      },
      ImportDefaultSpecifier: function(r, o, s) {
        return me(r.id || r.local);
      },
      ImportNamespaceSpecifier: function(r, o, s) {
        var l = ["*"], d = r.id || r.local;
        return d && l.push(C + "as" + ce() + me(d)), l;
      },
      ImportSpecifier: function(r, o, s) {
        var l = r.imported, d = [l.name], b = r.local;
        return b && b.name !== l.name && d.push(ce() + "as" + ce() + me(b)), d;
      },
      ExportSpecifier: function(r, o, s) {
        var l = r.local, d = [l.name], b = r.exported;
        return b && b.name !== l.name && d.push(ce() + "as" + ce() + me(b)), d;
      },
      Literal: function(r, o, s) {
        var l;
        if (r.hasOwnProperty("raw") && E && y.raw)
          try {
            if (l = E(r.raw).body[0].expression, l.type === t.Literal && l.value === r.value)
              return r.raw;
          } catch {
          }
        return r.regex ? "/" + r.regex.pattern + "/" + r.regex.flags : r.value === null ? "null" : typeof r.value == "string" ? gr(r.value) : typeof r.value == "number" ? fr(r.value) : typeof r.value == "boolean" ? r.value ? "true" : "false" : pr(r.value);
      },
      GeneratorExpression: function(r, o, s) {
        return this.ComprehensionExpression(r, o, s);
      },
      ComprehensionExpression: function(r, o, s) {
        var l, d, b, _, k = this;
        return l = r.type === t.GeneratorExpression ? ["("] : ["["], y.moz.comprehensionExpressionStartsWithAssignment && (_ = this.generateExpression(r.body, i.Assignment, N), l.push(_)), r.blocks && ue(function() {
          for (d = 0, b = r.blocks.length; d < b; ++d)
            _ = k.generateExpression(r.blocks[d], i.Sequence, N), d > 0 || y.moz.comprehensionExpressionStartsWithAssignment ? l = U(l, _) : l.push(_);
        }), r.filter && (l = U(l, "if" + C), _ = this.generateExpression(r.filter, i.Sequence, N), l = U(l, ["(", _, ")"])), y.moz.comprehensionExpressionStartsWithAssignment || (_ = this.generateExpression(r.body, i.Assignment, N), l = U(l, _)), l.push(r.type === t.GeneratorExpression ? ")" : "]"), l;
      },
      ComprehensionBlock: function(r, o, s) {
        var l;
        return r.left.type === t.VariableDeclaration ? l = [
          r.left.kind,
          ce(),
          this.generateStatement(r.left.declarations[0], nt)
        ] : l = this.generateExpression(r.left, i.Call, N), l = U(l, r.of ? "of" : "in"), l = U(l, this.generateExpression(r.right, i.Sequence, N)), ["for" + C + "(", l, ")"];
      },
      SpreadElement: function(r, o, s) {
        return [
          "...",
          this.generateExpression(r.argument, i.Assignment, N)
        ];
      },
      TaggedTemplateExpression: function(r, o, s) {
        var l = ye;
        s & H || (l = Te);
        var d = [
          this.generateExpression(r.tag, i.Call, l),
          this.generateExpression(r.quasi, i.Primary, He)
        ];
        return se(d, i.TaggedTemplate, o);
      },
      TemplateElement: function(r, o, s) {
        return r.value.raw;
      },
      TemplateLiteral: function(r, o, s) {
        var l, d, b;
        for (l = ["`"], d = 0, b = r.quasis.length; d < b; ++d)
          l.push(this.generateExpression(r.quasis[d], i.Primary, N)), d + 1 < b && (l.push("${" + C), l.push(this.generateExpression(r.expressions[d], i.Sequence, N)), l.push(C + "}"));
        return l.push("`"), l;
      },
      ModuleSpecifier: function(r, o, s) {
        return this.Literal(r, o, s);
      },
      ImportExpression: function(r, o, s) {
        return se([
          "import(",
          this.generateExpression(r.source, i.Assignment, N),
          ")"
        ], i.Call, o);
      }
    }, Ht(ne.prototype, ne.Expression), ne.prototype.generateExpression = function(r, o, s) {
      var l, d;
      return d = r.type || t.Property, y.verbatim && r.hasOwnProperty(y.verbatim) ? Er(r, o) : (l = this[d](r, o, s), y.comment && (l = Yt(r, l)), J(l, r));
    }, ne.prototype.generateStatement = function(r, o) {
      var s, l;
      return s = this[r.type](r, o), y.comment && (s = Yt(r, s)), l = J(s).toString(), r.type === t.Program && !P && v === "" && l.charAt(l.length - 1) === `
` && (s = B ? J(s).replaceRight(/\s+$/, "") : l.replace(/\s+$/, "")), J(s, r);
    };
    function Fr(r) {
      var o;
      if (o = new ne(), V(r))
        return o.generateStatement(r, Z);
      if (W(r))
        return o.generateExpression(r, i.Sequence, N);
      throw new Error("Unknown node type: " + r.type);
    }
    function vr(r, o) {
      var s = zt(), l, d;
      return o != null ? (typeof o.indent == "string" && (s.format.indent.style = o.indent), typeof o.base == "number" && (s.format.indent.base = o.base), o = st(s, o), p = o.format.indent.style, typeof o.base == "string" ? f = o.base : f = Re(p, o.format.indent.base)) : (o = s, p = o.format.indent.style, f = Re(p, o.format.indent.base)), m = o.format.json, D = o.format.renumber, F = m ? !1 : o.format.hexadecimal, g = m ? "double" : o.format.quotes, A = o.format.escapeless, v = o.format.newline, C = o.format.space, o.format.compact && (v = C = p = f = ""), x = o.format.parentheses, I = o.format.semicolons, P = o.format.safeConcatenation, M = o.directive, E = m ? null : o.parse, B = o.sourceMap, S = o.sourceCode, w = o.format.preserveBlankLines && S !== null, y = o, B && (e.browser ? n = Jr.sourceMap.SourceNode : n = su().SourceNode), l = Fr(r), B ? (d = l.toStringWithSourceMap({
        file: o.file,
        sourceRoot: o.sourceMapRoot
      }), o.sourceContent && d.map.setSourceContent(
        o.sourceMap,
        o.sourceContent
      ), o.sourceMapWithCode ? d : d.map.toString()) : (d = { code: l.toString(), map: null }, o.sourceMapWithCode ? d : d.code);
    }
    j = {
      indent: {
        style: "",
        base: 0
      },
      renumber: !0,
      hexadecimal: !0,
      quotes: "auto",
      escapeless: !0,
      compact: !0,
      parentheses: !1,
      semicolons: !1
    }, T = zt().format, e.version = vu.version, e.generate = vr, e.attachComments = c.attachComments, e.Precedence = st({}, i), e.browser = !1, e.FORMAT_MINIFY = j, e.FORMAT_DEFAULTS = T;
  })();
})(xi);
var xu = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239], ki = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938], yu = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F", Ii = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC", Bt = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, _t = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", bu = {
  5: _t,
  "5module": _t + " export import",
  6: _t + " const class extends export import super"
}, Su = /^in(stanceof)?$/, Bu = new RegExp("[" + Ii + "]"), _u = new RegExp("[" + Ii + yu + "]");
function Pt(e, t) {
  for (var i = 65536, u = 0; u < t.length; u += 2) {
    if (i += t[u], i > e)
      return !1;
    if (i += t[u + 1], i >= e)
      return !0;
  }
}
function we(e, t) {
  return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && Bu.test(String.fromCharCode(e)) : t === !1 ? !1 : Pt(e, ki);
}
function je(e, t) {
  return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && _u.test(String.fromCharCode(e)) : t === !1 ? !1 : Pt(e, ki) || Pt(e, xu);
}
var $ = function(t, i) {
  i === void 0 && (i = {}), this.label = t, this.keyword = i.keyword, this.beforeExpr = !!i.beforeExpr, this.startsExpr = !!i.startsExpr, this.isLoop = !!i.isLoop, this.isAssign = !!i.isAssign, this.prefix = !!i.prefix, this.postfix = !!i.postfix, this.binop = i.binop || null, this.updateContext = null;
};
function Ce(e, t) {
  return new $(e, { beforeExpr: !0, binop: t });
}
var Ae = { beforeExpr: !0 }, de = { startsExpr: !0 }, Mt = {};
function K(e, t) {
  return t === void 0 && (t = {}), t.keyword = e, Mt[e] = new $(e, t);
}
var h = {
  num: new $("num", de),
  regexp: new $("regexp", de),
  string: new $("string", de),
  name: new $("name", de),
  privateId: new $("privateId", de),
  eof: new $("eof"),
  bracketL: new $("[", { beforeExpr: !0, startsExpr: !0 }),
  bracketR: new $("]"),
  braceL: new $("{", { beforeExpr: !0, startsExpr: !0 }),
  braceR: new $("}"),
  parenL: new $("(", { beforeExpr: !0, startsExpr: !0 }),
  parenR: new $(")"),
  comma: new $(",", Ae),
  semi: new $(";", Ae),
  colon: new $(":", Ae),
  dot: new $("."),
  question: new $("?", Ae),
  questionDot: new $("?."),
  arrow: new $("=>", Ae),
  template: new $("template"),
  invalidTemplate: new $("invalidTemplate"),
  ellipsis: new $("...", Ae),
  backQuote: new $("`", de),
  dollarBraceL: new $("${", { beforeExpr: !0, startsExpr: !0 }),
  eq: new $("=", { beforeExpr: !0, isAssign: !0 }),
  assign: new $("_=", { beforeExpr: !0, isAssign: !0 }),
  incDec: new $("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
  prefix: new $("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  logicalOR: Ce("||", 1),
  logicalAND: Ce("&&", 2),
  bitwiseOR: Ce("|", 3),
  bitwiseXOR: Ce("^", 4),
  bitwiseAND: Ce("&", 5),
  equality: Ce("==/!=/===/!==", 6),
  relational: Ce("</>/<=/>=", 7),
  bitShift: Ce("<</>>/>>>", 8),
  plusMin: new $("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
  modulo: Ce("%", 10),
  star: Ce("*", 10),
  slash: Ce("/", 10),
  starstar: new $("**", { beforeExpr: !0 }),
  coalesce: Ce("??", 1),
  _break: K("break"),
  _case: K("case", Ae),
  _catch: K("catch"),
  _continue: K("continue"),
  _debugger: K("debugger"),
  _default: K("default", Ae),
  _do: K("do", { isLoop: !0, beforeExpr: !0 }),
  _else: K("else", Ae),
  _finally: K("finally"),
  _for: K("for", { isLoop: !0 }),
  _function: K("function", de),
  _if: K("if"),
  _return: K("return", Ae),
  _switch: K("switch"),
  _throw: K("throw", Ae),
  _try: K("try"),
  _var: K("var"),
  _const: K("const"),
  _while: K("while", { isLoop: !0 }),
  _with: K("with"),
  _new: K("new", { beforeExpr: !0, startsExpr: !0 }),
  _this: K("this", de),
  _super: K("super", de),
  _class: K("class", de),
  _extends: K("extends", Ae),
  _export: K("export"),
  _import: K("import", de),
  _null: K("null", de),
  _true: K("true", de),
  _false: K("false", de),
  _in: K("in", { beforeExpr: !0, binop: 7 }),
  _instanceof: K("instanceof", { beforeExpr: !0, binop: 7 }),
  _typeof: K("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _void: K("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _delete: K("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
}, Fe = /\r\n?|\n|\u2028|\u2029/, wu = new RegExp(Fe.source, "g");
function We(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function Pi(e, t, i) {
  i === void 0 && (i = e.length);
  for (var u = t; u < i; u++) {
    var n = e.charCodeAt(u);
    if (We(n))
      return u < i - 1 && n === 13 && e.charCodeAt(u + 1) === 10 ? u + 2 : u + 1;
  }
  return -1;
}
var Li = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Ee = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, Ni = Object.prototype, ku = Ni.hasOwnProperty, Iu = Ni.toString, it = Object.hasOwn || function(e, t) {
  return ku.call(e, t);
}, pi = Array.isArray || function(e) {
  return Iu.call(e) === "[object Array]";
};
function Ve(e) {
  return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$");
}
function Le(e) {
  return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var Pu = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, Je = function(t, i) {
  this.line = t, this.column = i;
};
Je.prototype.offset = function(t) {
  return new Je(this.line, this.column + t);
};
var mt = function(t, i, u) {
  this.start = i, this.end = u, t.sourceFile !== null && (this.source = t.sourceFile);
};
function Ti(e, t) {
  for (var i = 1, u = 0; ; ) {
    var n = Pi(e, u, t);
    if (n < 0)
      return new Je(i, t - u);
    ++i, u = n;
  }
}
var Lt = {
  ecmaVersion: null,
  sourceType: "script",
  onInsertedSemicolon: null,
  onTrailingComma: null,
  allowReserved: null,
  allowReturnOutsideFunction: !1,
  allowImportExportEverywhere: !1,
  allowAwaitOutsideFunction: null,
  allowSuperOutsideMethod: null,
  allowHashBang: !1,
  locations: !1,
  onToken: null,
  onComment: null,
  ranges: !1,
  program: null,
  sourceFile: null,
  directSourceFile: null,
  preserveParens: !1
}, di = !1;
function Lu(e) {
  var t = {};
  for (var i in Lt)
    t[i] = e && it(e, i) ? e[i] : Lt[i];
  if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!di && typeof console == "object" && console.warn && (di = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5), e.allowHashBang == null && (t.allowHashBang = t.ecmaVersion >= 14), pi(t.onToken)) {
    var u = t.onToken;
    t.onToken = function(n) {
      return u.push(n);
    };
  }
  return pi(t.onComment) && (t.onComment = Nu(t, t.onComment)), t;
}
function Nu(e, t) {
  return function(i, u, n, c, a, f) {
    var p = {
      type: i ? "Block" : "Line",
      value: u,
      start: n,
      end: c
    };
    e.locations && (p.loc = new mt(this, a, f)), e.ranges && (p.range = [n, c]), t.push(p);
  };
}
var et = 1, Ge = 2, Ot = 4, Ri = 8, Mi = 16, Oi = 32, Vt = 64, Vi = 128, rt = 256, qt = et | Ge | rt;
function Ut(e, t) {
  return Ge | (e ? Ot : 0) | (t ? Ri : 0);
}
var pt = 0, jt = 1, _e = 2, qi = 3, Ui = 4, ji = 5, oe = function(t, i, u) {
  this.options = t = Lu(t), this.sourceFile = t.sourceFile, this.keywords = Ve(bu[t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5]);
  var n = "";
  t.allowReserved !== !0 && (n = Bt[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3], t.sourceType === "module" && (n += " await")), this.reservedWords = Ve(n);
  var c = (n ? n + " " : "") + Bt.strict;
  this.reservedWordsStrict = Ve(c), this.reservedWordsStrictBind = Ve(c + " " + Bt.strictBind), this.input = String(i), this.containsEsc = !1, u ? (this.pos = u, this.lineStart = this.input.lastIndexOf(`
`, u - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(Fe).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = h.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = t.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), this.pos === 0 && t.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(et), this.regexpState = null, this.privateNameStack = [];
}, Se = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, canAwait: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 }, allowNewDotTarget: { configurable: !0 }, inClassStaticBlock: { configurable: !0 } };
oe.prototype.parse = function() {
  var t = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(t);
};
Se.inFunction.get = function() {
  return (this.currentVarScope().flags & Ge) > 0;
};
Se.inGenerator.get = function() {
  return (this.currentVarScope().flags & Ri) > 0 && !this.currentVarScope().inClassFieldInit;
};
Se.inAsync.get = function() {
  return (this.currentVarScope().flags & Ot) > 0 && !this.currentVarScope().inClassFieldInit;
};
Se.canAwait.get = function() {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e];
    if (t.inClassFieldInit || t.flags & rt)
      return !1;
    if (t.flags & Ge)
      return (t.flags & Ot) > 0;
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
Se.allowSuper.get = function() {
  var e = this.currentThisScope(), t = e.flags, i = e.inClassFieldInit;
  return (t & Vt) > 0 || i || this.options.allowSuperOutsideMethod;
};
Se.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & Vi) > 0;
};
Se.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
Se.allowNewDotTarget.get = function() {
  var e = this.currentThisScope(), t = e.flags, i = e.inClassFieldInit;
  return (t & (Ge | rt)) > 0 || i;
};
Se.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & rt) > 0;
};
oe.extend = function() {
  for (var t = [], i = arguments.length; i--; )
    t[i] = arguments[i];
  for (var u = this, n = 0; n < t.length; n++)
    u = t[n](u);
  return u;
};
oe.parse = function(t, i) {
  return new this(i, t).parse();
};
oe.parseExpressionAt = function(t, i, u) {
  var n = new this(u, t, i);
  return n.nextToken(), n.parseExpression();
};
oe.tokenizer = function(t, i) {
  return new this(i, t);
};
Object.defineProperties(oe.prototype, Se);
var pe = oe.prototype, Tu = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
pe.strictDirective = function(e) {
  if (this.options.ecmaVersion < 5)
    return !1;
  for (; ; ) {
    Ee.lastIndex = e, e += Ee.exec(this.input)[0].length;
    var t = Tu.exec(this.input.slice(e));
    if (!t)
      return !1;
    if ((t[1] || t[2]) === "use strict") {
      Ee.lastIndex = e + t[0].length;
      var i = Ee.exec(this.input), u = i.index + i[0].length, n = this.input.charAt(u);
      return n === ";" || n === "}" || Fe.test(i[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(n) || n === "!" && this.input.charAt(u + 1) === "=");
    }
    e += t[0].length, Ee.lastIndex = e, e += Ee.exec(this.input)[0].length, this.input[e] === ";" && e++;
  }
};
pe.eat = function(e) {
  return this.type === e ? (this.next(), !0) : !1;
};
pe.isContextual = function(e) {
  return this.type === h.name && this.value === e && !this.containsEsc;
};
pe.eatContextual = function(e) {
  return this.isContextual(e) ? (this.next(), !0) : !1;
};
pe.expectContextual = function(e) {
  this.eatContextual(e) || this.unexpected();
};
pe.canInsertSemicolon = function() {
  return this.type === h.eof || this.type === h.braceR || Fe.test(this.input.slice(this.lastTokEnd, this.start));
};
pe.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
};
pe.semicolon = function() {
  !this.eat(h.semi) && !this.insertSemicolon() && this.unexpected();
};
pe.afterTrailingComma = function(e, t) {
  if (this.type === e)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
};
pe.expect = function(e) {
  this.eat(e) || this.unexpected();
};
pe.unexpected = function(e) {
  this.raise(e ?? this.start, "Unexpected token");
};
var gt = function() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
pe.checkPatternErrors = function(e, t) {
  if (!!e) {
    e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
    var i = t ? e.parenthesizedAssign : e.parenthesizedBind;
    i > -1 && this.raiseRecoverable(i, t ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
pe.checkExpressionErrors = function(e, t) {
  if (!e)
    return !1;
  var i = e.shorthandAssign, u = e.doubleProto;
  if (!t)
    return i >= 0 || u >= 0;
  i >= 0 && this.raise(i, "Shorthand property assignments are valid only in destructuring patterns"), u >= 0 && this.raiseRecoverable(u, "Redefinition of __proto__ property");
};
pe.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
pe.isSimpleAssignTarget = function(e) {
  return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
};
var q = oe.prototype;
q.parseTopLevel = function(e) {
  var t = /* @__PURE__ */ Object.create(null);
  for (e.body || (e.body = []); this.type !== h.eof; ) {
    var i = this.parseStatement(null, !0, t);
    e.body.push(i);
  }
  if (this.inModule)
    for (var u = 0, n = Object.keys(this.undefinedExports); u < n.length; u += 1) {
      var c = n[u];
      this.raiseRecoverable(this.undefinedExports[c].start, "Export '" + c + "' is not defined");
    }
  return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program");
};
var Wt = { kind: "loop" }, Ru = { kind: "switch" };
q.isLet = function(e) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return !1;
  Ee.lastIndex = this.pos;
  var t = Ee.exec(this.input), i = this.pos + t[0].length, u = this.input.charCodeAt(i);
  if (u === 91 || u === 92 || u > 55295 && u < 56320)
    return !0;
  if (e)
    return !1;
  if (u === 123)
    return !0;
  if (we(u, !0)) {
    for (var n = i + 1; je(u = this.input.charCodeAt(n), !0); )
      ++n;
    if (u === 92 || u > 55295 && u < 56320)
      return !0;
    var c = this.input.slice(i, n);
    if (!Su.test(c))
      return !0;
  }
  return !1;
};
q.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return !1;
  Ee.lastIndex = this.pos;
  var e = Ee.exec(this.input), t = this.pos + e[0].length, i;
  return !Fe.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(je(i = this.input.charCodeAt(t + 8)) || i > 55295 && i < 56320));
};
q.parseStatement = function(e, t, i) {
  var u = this.type, n = this.startNode(), c;
  switch (this.isLet(e) && (u = h._var, c = "let"), u) {
    case h._break:
    case h._continue:
      return this.parseBreakContinueStatement(n, u.keyword);
    case h._debugger:
      return this.parseDebuggerStatement(n);
    case h._do:
      return this.parseDoStatement(n);
    case h._for:
      return this.parseForStatement(n);
    case h._function:
      return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(n, !1, !e);
    case h._class:
      return e && this.unexpected(), this.parseClass(n, !0);
    case h._if:
      return this.parseIfStatement(n);
    case h._return:
      return this.parseReturnStatement(n);
    case h._switch:
      return this.parseSwitchStatement(n);
    case h._throw:
      return this.parseThrowStatement(n);
    case h._try:
      return this.parseTryStatement(n);
    case h._const:
    case h._var:
      return c = c || this.value, e && c !== "var" && this.unexpected(), this.parseVarStatement(n, c);
    case h._while:
      return this.parseWhileStatement(n);
    case h._with:
      return this.parseWithStatement(n);
    case h.braceL:
      return this.parseBlock(!0, n);
    case h.semi:
      return this.parseEmptyStatement(n);
    case h._export:
    case h._import:
      if (this.options.ecmaVersion > 10 && u === h._import) {
        Ee.lastIndex = this.pos;
        var a = Ee.exec(this.input), f = this.pos + a[0].length, p = this.input.charCodeAt(f);
        if (p === 40 || p === 46)
          return this.parseExpressionStatement(n, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), u === h._import ? this.parseImport(n) : this.parseExport(n, i);
    default:
      if (this.isAsyncFunction())
        return e && this.unexpected(), this.next(), this.parseFunctionStatement(n, !0, !e);
      var m = this.value, D = this.parseExpression();
      return u === h.name && D.type === "Identifier" && this.eat(h.colon) ? this.parseLabeledStatement(n, m, D, e) : this.parseExpressionStatement(n, D);
  }
};
q.parseBreakContinueStatement = function(e, t) {
  var i = t === "break";
  this.next(), this.eat(h.semi) || this.insertSemicolon() ? e.label = null : this.type !== h.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
  for (var u = 0; u < this.labels.length; ++u) {
    var n = this.labels[u];
    if ((e.label == null || n.name === e.label.name) && (n.kind != null && (i || n.kind === "loop") || e.label && i))
      break;
  }
  return u === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, i ? "BreakStatement" : "ContinueStatement");
};
q.parseDebuggerStatement = function(e) {
  return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
};
q.parseDoStatement = function(e) {
  return this.next(), this.labels.push(Wt), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(h._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(h.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
};
q.parseForStatement = function(e) {
  this.next();
  var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(Wt), this.enterScope(0), this.expect(h.parenL), this.type === h.semi)
    return t > -1 && this.unexpected(t), this.parseFor(e, null);
  var i = this.isLet();
  if (this.type === h._var || this.type === h._const || i) {
    var u = this.startNode(), n = i ? "let" : this.value;
    return this.next(), this.parseVar(u, !0, n), this.finishNode(u, "VariableDeclaration"), (this.type === h._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && u.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === h._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, u)) : (t > -1 && this.unexpected(t), this.parseFor(e, u));
  }
  var c = this.isContextual("let"), a = !1, f = new gt(), p = this.parseExpression(t > -1 ? "await" : !0, f);
  return this.type === h._in || (a = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (this.options.ecmaVersion >= 9 && (this.type === h._in ? t > -1 && this.unexpected(t) : e.await = t > -1), c && a && this.raise(p.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(p, !1, f), this.checkLValPattern(p), this.parseForIn(e, p)) : (this.checkExpressionErrors(f, !0), t > -1 && this.unexpected(t), this.parseFor(e, p));
};
q.parseFunctionStatement = function(e, t, i) {
  return this.next(), this.parseFunction(e, Ze | (i ? 0 : Nt), !1, t);
};
q.parseIfStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(h._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
};
q.parseReturnStatement = function(e) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(h.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
};
q.parseSwitchStatement = function(e) {
  this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(h.braceL), this.labels.push(Ru), this.enterScope(0);
  for (var t, i = !1; this.type !== h.braceR; )
    if (this.type === h._case || this.type === h._default) {
      var u = this.type === h._case;
      t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), u ? t.test = this.parseExpression() : (i && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), i = !0, t.test = null), this.expect(h.colon);
    } else
      t || this.unexpected(), t.consequent.push(this.parseStatement(null));
  return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
};
q.parseThrowStatement = function(e) {
  return this.next(), Fe.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var Mu = [];
q.parseTryStatement = function(e) {
  if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === h._catch) {
    var t = this.startNode();
    if (this.next(), this.eat(h.parenL)) {
      t.param = this.parseBindingAtom();
      var i = t.param.type === "Identifier";
      this.enterScope(i ? Oi : 0), this.checkLValPattern(t.param, i ? Ui : _e), this.expect(h.parenR);
    } else
      this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0);
    t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
  }
  return e.finalizer = this.eat(h._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
};
q.parseVarStatement = function(e, t) {
  return this.next(), this.parseVar(e, !1, t), this.semicolon(), this.finishNode(e, "VariableDeclaration");
};
q.parseWhileStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), this.labels.push(Wt), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
};
q.parseWithStatement = function(e) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
};
q.parseEmptyStatement = function(e) {
  return this.next(), this.finishNode(e, "EmptyStatement");
};
q.parseLabeledStatement = function(e, t, i, u) {
  for (var n = 0, c = this.labels; n < c.length; n += 1) {
    var a = c[n];
    a.name === t && this.raise(i.start, "Label '" + t + "' is already declared");
  }
  for (var f = this.type.isLoop ? "loop" : this.type === h._switch ? "switch" : null, p = this.labels.length - 1; p >= 0; p--) {
    var m = this.labels[p];
    if (m.statementStart === e.start)
      m.statementStart = this.start, m.kind = f;
    else
      break;
  }
  return this.labels.push({ name: t, kind: f, statementStart: this.start }), e.body = this.parseStatement(u ? u.indexOf("label") === -1 ? u + "label" : u : "label"), this.labels.pop(), e.label = i, this.finishNode(e, "LabeledStatement");
};
q.parseExpressionStatement = function(e, t) {
  return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
};
q.parseBlock = function(e, t, i) {
  for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(h.braceL), e && this.enterScope(0); this.type !== h.braceR; ) {
    var u = this.parseStatement(null);
    t.body.push(u);
  }
  return i && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
};
q.parseFor = function(e, t) {
  return e.init = t, this.expect(h.semi), e.test = this.type === h.semi ? null : this.parseExpression(), this.expect(h.semi), e.update = this.type === h.parenR ? null : this.parseExpression(), this.expect(h.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
};
q.parseForIn = function(e, t) {
  var i = this.type === h._in;
  return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!i || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(
    t.start,
    (i ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ), e.left = t, e.right = i ? this.parseExpression() : this.parseMaybeAssign(), this.expect(h.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, i ? "ForInStatement" : "ForOfStatement");
};
q.parseVar = function(e, t, i) {
  for (e.declarations = [], e.kind = i; ; ) {
    var u = this.startNode();
    if (this.parseVarId(u, i), this.eat(h.eq) ? u.init = this.parseMaybeAssign(t) : i === "const" && !(this.type === h._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : u.id.type !== "Identifier" && !(t && (this.type === h._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : u.init = null, e.declarations.push(this.finishNode(u, "VariableDeclarator")), !this.eat(h.comma))
      break;
  }
  return e;
};
q.parseVarId = function(e, t) {
  e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? jt : _e, !1);
};
var Ze = 1, Nt = 2, Wi = 4;
q.parseFunction = function(e, t, i, u, n) {
  this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !u) && (this.type === h.star && t & Nt && this.unexpected(), e.generator = this.eat(h.star)), this.options.ecmaVersion >= 8 && (e.async = !!u), t & Ze && (e.id = t & Wi && this.type !== h.name ? null : this.parseIdent(), e.id && !(t & Nt) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? jt : _e : qi));
  var c = this.yieldPos, a = this.awaitPos, f = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Ut(e.async, e.generator)), t & Ze || (e.id = this.type === h.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, i, !1, n), this.yieldPos = c, this.awaitPos = a, this.awaitIdentPos = f, this.finishNode(e, t & Ze ? "FunctionDeclaration" : "FunctionExpression");
};
q.parseFunctionParams = function(e) {
  this.expect(h.parenL), e.params = this.parseBindingList(h.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
q.parseClass = function(e, t) {
  this.next();
  var i = this.strict;
  this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
  var u = this.enterClassBody(), n = this.startNode(), c = !1;
  for (n.body = [], this.expect(h.braceL); this.type !== h.braceR; ) {
    var a = this.parseClassElement(e.superClass !== null);
    a && (n.body.push(a), a.type === "MethodDefinition" && a.kind === "constructor" ? (c && this.raise(a.start, "Duplicate constructor in the same class"), c = !0) : a.key && a.key.type === "PrivateIdentifier" && Ou(u, a) && this.raiseRecoverable(a.key.start, "Identifier '#" + a.key.name + "' has already been declared"));
  }
  return this.strict = i, this.next(), e.body = this.finishNode(n, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
};
q.parseClassElement = function(e) {
  if (this.eat(h.semi))
    return null;
  var t = this.options.ecmaVersion, i = this.startNode(), u = "", n = !1, c = !1, a = "method", f = !1;
  if (this.eatContextual("static")) {
    if (t >= 13 && this.eat(h.braceL))
      return this.parseClassStaticBlock(i), i;
    this.isClassElementNameStart() || this.type === h.star ? f = !0 : u = "static";
  }
  if (i.static = f, !u && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === h.star) && !this.canInsertSemicolon() ? c = !0 : u = "async"), !u && (t >= 9 || !c) && this.eat(h.star) && (n = !0), !u && !c && !n) {
    var p = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? a = p : u = p);
  }
  if (u ? (i.computed = !1, i.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), i.key.name = u, this.finishNode(i.key, "Identifier")) : this.parseClassElementName(i), t < 13 || this.type === h.parenL || a !== "method" || n || c) {
    var m = !i.static && dt(i, "constructor"), D = m && e;
    m && a !== "method" && this.raise(i.key.start, "Constructor can't have get/set modifier"), i.kind = m ? "constructor" : a, this.parseClassMethod(i, n, c, D);
  } else
    this.parseClassField(i);
  return i;
};
q.isClassElementNameStart = function() {
  return this.type === h.name || this.type === h.privateId || this.type === h.num || this.type === h.string || this.type === h.bracketL || this.type.keyword;
};
q.parseClassElementName = function(e) {
  this.type === h.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
};
q.parseClassMethod = function(e, t, i, u) {
  var n = e.key;
  e.kind === "constructor" ? (t && this.raise(n.start, "Constructor can't be a generator"), i && this.raise(n.start, "Constructor can't be an async method")) : e.static && dt(e, "prototype") && this.raise(n.start, "Classes may not have a static property named prototype");
  var c = e.value = this.parseMethod(t, i, u);
  return e.kind === "get" && c.params.length !== 0 && this.raiseRecoverable(c.start, "getter should have no params"), e.kind === "set" && c.params.length !== 1 && this.raiseRecoverable(c.start, "setter should have exactly one param"), e.kind === "set" && c.params[0].type === "RestElement" && this.raiseRecoverable(c.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
};
q.parseClassField = function(e) {
  if (dt(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && dt(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(h.eq)) {
    var t = this.currentThisScope(), i = t.inClassFieldInit;
    t.inClassFieldInit = !0, e.value = this.parseMaybeAssign(), t.inClassFieldInit = i;
  } else
    e.value = null;
  return this.semicolon(), this.finishNode(e, "PropertyDefinition");
};
q.parseClassStaticBlock = function(e) {
  e.body = [];
  var t = this.labels;
  for (this.labels = [], this.enterScope(rt | Vt); this.type !== h.braceR; ) {
    var i = this.parseStatement(null);
    e.body.push(i);
  }
  return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
};
q.parseClassId = function(e, t) {
  this.type === h.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, _e, !1)) : (t === !0 && this.unexpected(), e.id = null);
};
q.parseClassSuper = function(e) {
  e.superClass = this.eat(h._extends) ? this.parseExprSubscripts(!1) : null;
};
q.enterClassBody = function() {
  var e = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  return this.privateNameStack.push(e), e.declared;
};
q.exitClassBody = function() {
  for (var e = this.privateNameStack.pop(), t = e.declared, i = e.used, u = this.privateNameStack.length, n = u === 0 ? null : this.privateNameStack[u - 1], c = 0; c < i.length; ++c) {
    var a = i[c];
    it(t, a.name) || (n ? n.used.push(a) : this.raiseRecoverable(a.start, "Private field '#" + a.name + "' must be declared in an enclosing class"));
  }
};
function Ou(e, t) {
  var i = t.key.name, u = e[i], n = "true";
  return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (n = (t.static ? "s" : "i") + t.kind), u === "iget" && n === "iset" || u === "iset" && n === "iget" || u === "sget" && n === "sset" || u === "sset" && n === "sget" ? (e[i] = "true", !1) : u ? !0 : (e[i] = n, !1);
}
function dt(e, t) {
  var i = e.computed, u = e.key;
  return !i && (u.type === "Identifier" && u.name === t || u.type === "Literal" && u.value === t);
}
q.parseExport = function(e, t) {
  if (this.next(), this.eat(h.star))
    return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== h.string && this.unexpected(), e.source = this.parseExprAtom(), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
  if (this.eat(h._default)) {
    this.checkExport(t, "default", this.lastTokStart);
    var i;
    if (this.type === h._function || (i = this.isAsyncFunction())) {
      var u = this.startNode();
      this.next(), i && this.next(), e.declaration = this.parseFunction(u, Ze | Wi, !1, i);
    } else if (this.type === h._class) {
      var n = this.startNode();
      e.declaration = this.parseClass(n, "nullableID");
    } else
      e.declaration = this.parseMaybeAssign(), this.semicolon();
    return this.finishNode(e, "ExportDefaultDeclaration");
  }
  if (this.shouldParseExportStatement())
    e.declaration = this.parseStatement(null), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null;
  else {
    if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from"))
      this.type !== h.string && this.unexpected(), e.source = this.parseExprAtom();
    else {
      for (var c = 0, a = e.specifiers; c < a.length; c += 1) {
        var f = a[c];
        this.checkUnreserved(f.local), this.checkLocalExport(f.local), f.local.type === "Literal" && this.raise(f.local.start, "A string literal cannot be used as an exported binding without `from`.");
      }
      e.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(e, "ExportNamedDeclaration");
};
q.checkExport = function(e, t, i) {
  !e || (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), it(e, t) && this.raiseRecoverable(i, "Duplicate export '" + t + "'"), e[t] = !0);
};
q.checkPatternExport = function(e, t) {
  var i = t.type;
  if (i === "Identifier")
    this.checkExport(e, t, t.start);
  else if (i === "ObjectPattern")
    for (var u = 0, n = t.properties; u < n.length; u += 1) {
      var c = n[u];
      this.checkPatternExport(e, c);
    }
  else if (i === "ArrayPattern")
    for (var a = 0, f = t.elements; a < f.length; a += 1) {
      var p = f[a];
      p && this.checkPatternExport(e, p);
    }
  else
    i === "Property" ? this.checkPatternExport(e, t.value) : i === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : i === "RestElement" ? this.checkPatternExport(e, t.argument) : i === "ParenthesizedExpression" && this.checkPatternExport(e, t.expression);
};
q.checkVariableExport = function(e, t) {
  if (!!e)
    for (var i = 0, u = t; i < u.length; i += 1) {
      var n = u[i];
      this.checkPatternExport(e, n.id);
    }
};
q.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
q.parseExportSpecifiers = function(e) {
  var t = [], i = !0;
  for (this.expect(h.braceL); !this.eat(h.braceR); ) {
    if (i)
      i = !1;
    else if (this.expect(h.comma), this.afterTrailingComma(h.braceR))
      break;
    var u = this.startNode();
    u.local = this.parseModuleExportName(), u.exported = this.eatContextual("as") ? this.parseModuleExportName() : u.local, this.checkExport(
      e,
      u.exported,
      u.exported.start
    ), t.push(this.finishNode(u, "ExportSpecifier"));
  }
  return t;
};
q.parseImport = function(e) {
  return this.next(), this.type === h.string ? (e.specifiers = Mu, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === h.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
};
q.parseImportSpecifiers = function() {
  var e = [], t = !0;
  if (this.type === h.name) {
    var i = this.startNode();
    if (i.local = this.parseIdent(), this.checkLValSimple(i.local, _e), e.push(this.finishNode(i, "ImportDefaultSpecifier")), !this.eat(h.comma))
      return e;
  }
  if (this.type === h.star) {
    var u = this.startNode();
    return this.next(), this.expectContextual("as"), u.local = this.parseIdent(), this.checkLValSimple(u.local, _e), e.push(this.finishNode(u, "ImportNamespaceSpecifier")), e;
  }
  for (this.expect(h.braceL); !this.eat(h.braceR); ) {
    if (t)
      t = !1;
    else if (this.expect(h.comma), this.afterTrailingComma(h.braceR))
      break;
    var n = this.startNode();
    n.imported = this.parseModuleExportName(), this.eatContextual("as") ? n.local = this.parseIdent() : (this.checkUnreserved(n.imported), n.local = n.imported), this.checkLValSimple(n.local, _e), e.push(this.finishNode(n, "ImportSpecifier"));
  }
  return e;
};
q.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === h.string) {
    var e = this.parseLiteral(this.value);
    return Pu.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
  }
  return this.parseIdent(!0);
};
q.adaptDirectivePrologue = function(e) {
  for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
    e[t].directive = e[t].expression.raw.slice(1, -1);
};
q.isDirectiveCandidate = function(e) {
  return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && (this.input[e.start] === '"' || this.input[e.start] === "'");
};
var xe = oe.prototype;
xe.toAssignable = function(e, t, i) {
  if (this.options.ecmaVersion >= 6 && e)
    switch (e.type) {
      case "Identifier":
        this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        e.type = "ObjectPattern", i && this.checkPatternErrors(i, !0);
        for (var u = 0, n = e.properties; u < n.length; u += 1) {
          var c = n[u];
          this.toAssignable(c, t), c.type === "RestElement" && (c.argument.type === "ArrayPattern" || c.argument.type === "ObjectPattern") && this.raise(c.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
        break;
      case "ArrayExpression":
        e.type = "ArrayPattern", i && this.checkPatternErrors(i, !0), this.toAssignableList(e.elements, t);
        break;
      case "SpreadElement":
        e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(e.expression, t, i);
        break;
      case "ChainExpression":
        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!t)
          break;
      default:
        this.raise(e.start, "Assigning to rvalue");
    }
  else
    i && this.checkPatternErrors(i, !0);
  return e;
};
xe.toAssignableList = function(e, t) {
  for (var i = e.length, u = 0; u < i; u++) {
    var n = e[u];
    n && this.toAssignable(n, t);
  }
  if (i) {
    var c = e[i - 1];
    this.options.ecmaVersion === 6 && t && c && c.type === "RestElement" && c.argument.type !== "Identifier" && this.unexpected(c.argument.start);
  }
  return e;
};
xe.parseSpread = function(e) {
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
};
xe.parseRestBinding = function() {
  var e = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== h.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
};
xe.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case h.bracketL:
        var e = this.startNode();
        return this.next(), e.elements = this.parseBindingList(h.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
      case h.braceL:
        return this.parseObj(!0);
    }
  return this.parseIdent();
};
xe.parseBindingList = function(e, t, i) {
  for (var u = [], n = !0; !this.eat(e); )
    if (n ? n = !1 : this.expect(h.comma), t && this.type === h.comma)
      u.push(null);
    else {
      if (i && this.afterTrailingComma(e))
        break;
      if (this.type === h.ellipsis) {
        var c = this.parseRestBinding();
        this.parseBindingListItem(c), u.push(c), this.type === h.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(e);
        break;
      } else {
        var a = this.parseMaybeDefault(this.start, this.startLoc);
        this.parseBindingListItem(a), u.push(a);
      }
    }
  return u;
};
xe.parseBindingListItem = function(e) {
  return e;
};
xe.parseMaybeDefault = function(e, t, i) {
  if (i = i || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(h.eq))
    return i;
  var u = this.startNodeAt(e, t);
  return u.left = i, u.right = this.parseMaybeAssign(), this.finishNode(u, "AssignmentPattern");
};
xe.checkLValSimple = function(e, t, i) {
  t === void 0 && (t = pt);
  var u = t !== pt;
  switch (e.type) {
    case "Identifier":
      this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (u ? "Binding " : "Assigning to ") + e.name + " in strict mode"), u && (t === _e && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), i && (it(i, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), i[e.name] = !0), t !== ji && this.declareName(e.name, t, e.start));
      break;
    case "ChainExpression":
      this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      u && this.raiseRecoverable(e.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return u && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, i);
    default:
      this.raise(e.start, (u ? "Binding" : "Assigning to") + " rvalue");
  }
};
xe.checkLValPattern = function(e, t, i) {
  switch (t === void 0 && (t = pt), e.type) {
    case "ObjectPattern":
      for (var u = 0, n = e.properties; u < n.length; u += 1) {
        var c = n[u];
        this.checkLValInnerPattern(c, t, i);
      }
      break;
    case "ArrayPattern":
      for (var a = 0, f = e.elements; a < f.length; a += 1) {
        var p = f[a];
        p && this.checkLValInnerPattern(p, t, i);
      }
      break;
    default:
      this.checkLValSimple(e, t, i);
  }
};
xe.checkLValInnerPattern = function(e, t, i) {
  switch (t === void 0 && (t = pt), e.type) {
    case "Property":
      this.checkLValInnerPattern(e.value, t, i);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(e.left, t, i);
      break;
    case "RestElement":
      this.checkLValPattern(e.argument, t, i);
      break;
    default:
      this.checkLValPattern(e, t, i);
  }
};
var ve = function(t, i, u, n, c) {
  this.token = t, this.isExpr = !!i, this.preserveSpace = !!u, this.override = n, this.generator = !!c;
}, ee = {
  b_stat: new ve("{", !1),
  b_expr: new ve("{", !0),
  b_tmpl: new ve("${", !1),
  p_stat: new ve("(", !1),
  p_expr: new ve("(", !0),
  q_tmpl: new ve("`", !0, !0, function(e) {
    return e.tryReadTemplateToken();
  }),
  f_stat: new ve("function", !1),
  f_expr: new ve("function", !0),
  f_expr_gen: new ve("function", !0, !1, null, !0),
  f_gen: new ve("function", !1, !1, null, !0)
}, ze = oe.prototype;
ze.initialContext = function() {
  return [ee.b_stat];
};
ze.curContext = function() {
  return this.context[this.context.length - 1];
};
ze.braceIsBlock = function(e) {
  var t = this.curContext();
  return t === ee.f_expr || t === ee.f_stat ? !0 : e === h.colon && (t === ee.b_stat || t === ee.b_expr) ? !t.isExpr : e === h._return || e === h.name && this.exprAllowed ? Fe.test(this.input.slice(this.lastTokEnd, this.start)) : e === h._else || e === h.semi || e === h.eof || e === h.parenR || e === h.arrow ? !0 : e === h.braceL ? t === ee.b_stat : e === h._var || e === h._const || e === h.name ? !1 : !this.exprAllowed;
};
ze.inGeneratorContext = function() {
  for (var e = this.context.length - 1; e >= 1; e--) {
    var t = this.context[e];
    if (t.token === "function")
      return t.generator;
  }
  return !1;
};
ze.updateContext = function(e) {
  var t, i = this.type;
  i.keyword && e === h.dot ? this.exprAllowed = !1 : (t = i.updateContext) ? t.call(this, e) : this.exprAllowed = i.beforeExpr;
};
ze.overrideContext = function(e) {
  this.curContext() !== e && (this.context[this.context.length - 1] = e);
};
h.parenR.updateContext = h.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var e = this.context.pop();
  e === ee.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
};
h.braceL.updateContext = function(e) {
  this.context.push(this.braceIsBlock(e) ? ee.b_stat : ee.b_expr), this.exprAllowed = !0;
};
h.dollarBraceL.updateContext = function() {
  this.context.push(ee.b_tmpl), this.exprAllowed = !0;
};
h.parenL.updateContext = function(e) {
  var t = e === h._if || e === h._for || e === h._with || e === h._while;
  this.context.push(t ? ee.p_stat : ee.p_expr), this.exprAllowed = !0;
};
h.incDec.updateContext = function() {
};
h._function.updateContext = h._class.updateContext = function(e) {
  e.beforeExpr && e !== h._else && !(e === h.semi && this.curContext() !== ee.p_stat) && !(e === h._return && Fe.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === h.colon || e === h.braceL) && this.curContext() === ee.b_stat) ? this.context.push(ee.f_expr) : this.context.push(ee.f_stat), this.exprAllowed = !1;
};
h.backQuote.updateContext = function() {
  this.curContext() === ee.q_tmpl ? this.context.pop() : this.context.push(ee.q_tmpl), this.exprAllowed = !1;
};
h.star.updateContext = function(e) {
  if (e === h._function) {
    var t = this.context.length - 1;
    this.context[t] === ee.f_expr ? this.context[t] = ee.f_expr_gen : this.context[t] = ee.f_gen;
  }
  this.exprAllowed = !0;
};
h.name.updateContext = function(e) {
  var t = !1;
  this.options.ecmaVersion >= 6 && e !== h.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
};
var G = oe.prototype;
G.checkPropClash = function(e, t, i) {
  if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
    var u = e.key, n;
    switch (u.type) {
      case "Identifier":
        n = u.name;
        break;
      case "Literal":
        n = String(u.value);
        break;
      default:
        return;
    }
    var c = e.kind;
    if (this.options.ecmaVersion >= 6) {
      n === "__proto__" && c === "init" && (t.proto && (i ? i.doubleProto < 0 && (i.doubleProto = u.start) : this.raiseRecoverable(u.start, "Redefinition of __proto__ property")), t.proto = !0);
      return;
    }
    n = "$" + n;
    var a = t[n];
    if (a) {
      var f;
      c === "init" ? f = this.strict && a.init || a.get || a.set : f = a.init || a[c], f && this.raiseRecoverable(u.start, "Redefinition of property");
    } else
      a = t[n] = {
        init: !1,
        get: !1,
        set: !1
      };
    a[c] = !0;
  }
};
G.parseExpression = function(e, t) {
  var i = this.start, u = this.startLoc, n = this.parseMaybeAssign(e, t);
  if (this.type === h.comma) {
    var c = this.startNodeAt(i, u);
    for (c.expressions = [n]; this.eat(h.comma); )
      c.expressions.push(this.parseMaybeAssign(e, t));
    return this.finishNode(c, "SequenceExpression");
  }
  return n;
};
G.parseMaybeAssign = function(e, t, i) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(e);
    this.exprAllowed = !1;
  }
  var u = !1, n = -1, c = -1, a = -1;
  t ? (n = t.parenthesizedAssign, c = t.trailingComma, a = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new gt(), u = !0);
  var f = this.start, p = this.startLoc;
  (this.type === h.parenL || this.type === h.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
  var m = this.parseMaybeConditional(e, t);
  if (i && (m = i.call(this, m, f, p)), this.type.isAssign) {
    var D = this.startNodeAt(f, p);
    return D.operator = this.value, this.type === h.eq && (m = this.toAssignable(m, !1, t)), u || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= m.start && (t.shorthandAssign = -1), this.type === h.eq ? this.checkLValPattern(m) : this.checkLValSimple(m), D.left = m, this.next(), D.right = this.parseMaybeAssign(e), a > -1 && (t.doubleProto = a), this.finishNode(D, "AssignmentExpression");
  } else
    u && this.checkExpressionErrors(t, !0);
  return n > -1 && (t.parenthesizedAssign = n), c > -1 && (t.trailingComma = c), m;
};
G.parseMaybeConditional = function(e, t) {
  var i = this.start, u = this.startLoc, n = this.parseExprOps(e, t);
  if (this.checkExpressionErrors(t))
    return n;
  if (this.eat(h.question)) {
    var c = this.startNodeAt(i, u);
    return c.test = n, c.consequent = this.parseMaybeAssign(), this.expect(h.colon), c.alternate = this.parseMaybeAssign(e), this.finishNode(c, "ConditionalExpression");
  }
  return n;
};
G.parseExprOps = function(e, t) {
  var i = this.start, u = this.startLoc, n = this.parseMaybeUnary(t, !1, !1, e);
  return this.checkExpressionErrors(t) || n.start === i && n.type === "ArrowFunctionExpression" ? n : this.parseExprOp(n, i, u, -1, e);
};
G.parseExprOp = function(e, t, i, u, n) {
  var c = this.type.binop;
  if (c != null && (!n || this.type !== h._in) && c > u) {
    var a = this.type === h.logicalOR || this.type === h.logicalAND, f = this.type === h.coalesce;
    f && (c = h.logicalAND.binop);
    var p = this.value;
    this.next();
    var m = this.start, D = this.startLoc, F = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, n), m, D, c, n), g = this.buildBinary(t, i, e, F, p, a || f);
    return (a && this.type === h.coalesce || f && (this.type === h.logicalOR || this.type === h.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(g, t, i, u, n);
  }
  return e;
};
G.buildBinary = function(e, t, i, u, n, c) {
  u.type === "PrivateIdentifier" && this.raise(u.start, "Private identifier can only be left side of binary expression");
  var a = this.startNodeAt(e, t);
  return a.left = i, a.operator = n, a.right = u, this.finishNode(a, c ? "LogicalExpression" : "BinaryExpression");
};
G.parseMaybeUnary = function(e, t, i, u) {
  var n = this.start, c = this.startLoc, a;
  if (this.isContextual("await") && this.canAwait)
    a = this.parseAwait(u), t = !0;
  else if (this.type.prefix) {
    var f = this.startNode(), p = this.type === h.incDec;
    f.operator = this.value, f.prefix = !0, this.next(), f.argument = this.parseMaybeUnary(null, !0, p, u), this.checkExpressionErrors(e, !0), p ? this.checkLValSimple(f.argument) : this.strict && f.operator === "delete" && f.argument.type === "Identifier" ? this.raiseRecoverable(f.start, "Deleting local variable in strict mode") : f.operator === "delete" && Gi(f.argument) ? this.raiseRecoverable(f.start, "Private fields can not be deleted") : t = !0, a = this.finishNode(f, p ? "UpdateExpression" : "UnaryExpression");
  } else if (!t && this.type === h.privateId)
    (u || this.privateNameStack.length === 0) && this.unexpected(), a = this.parsePrivateIdent(), this.type !== h._in && this.unexpected();
  else {
    if (a = this.parseExprSubscripts(e, u), this.checkExpressionErrors(e))
      return a;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var m = this.startNodeAt(n, c);
      m.operator = this.value, m.prefix = !1, m.argument = a, this.checkLValSimple(a), this.next(), a = this.finishNode(m, "UpdateExpression");
    }
  }
  if (!i && this.eat(h.starstar))
    if (t)
      this.unexpected(this.lastTokStart);
    else
      return this.buildBinary(n, c, a, this.parseMaybeUnary(null, !1, !1, u), "**", !1);
  else
    return a;
};
function Gi(e) {
  return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && Gi(e.expression);
}
G.parseExprSubscripts = function(e, t) {
  var i = this.start, u = this.startLoc, n = this.parseExprAtom(e, t);
  if (n.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return n;
  var c = this.parseSubscripts(n, i, u, !1, t);
  return e && c.type === "MemberExpression" && (e.parenthesizedAssign >= c.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= c.start && (e.parenthesizedBind = -1), e.trailingComma >= c.start && (e.trailingComma = -1)), c;
};
G.parseSubscripts = function(e, t, i, u, n) {
  for (var c = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, a = !1; ; ) {
    var f = this.parseSubscript(e, t, i, u, c, a, n);
    if (f.optional && (a = !0), f === e || f.type === "ArrowFunctionExpression") {
      if (a) {
        var p = this.startNodeAt(t, i);
        p.expression = f, f = this.finishNode(p, "ChainExpression");
      }
      return f;
    }
    e = f;
  }
};
G.parseSubscript = function(e, t, i, u, n, c, a) {
  var f = this.options.ecmaVersion >= 11, p = f && this.eat(h.questionDot);
  u && p && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var m = this.eat(h.bracketL);
  if (m || p && this.type !== h.parenL && this.type !== h.backQuote || this.eat(h.dot)) {
    var D = this.startNodeAt(t, i);
    D.object = e, m ? (D.property = this.parseExpression(), this.expect(h.bracketR)) : this.type === h.privateId && e.type !== "Super" ? D.property = this.parsePrivateIdent() : D.property = this.parseIdent(this.options.allowReserved !== "never"), D.computed = !!m, f && (D.optional = p), e = this.finishNode(D, "MemberExpression");
  } else if (!u && this.eat(h.parenL)) {
    var F = new gt(), g = this.yieldPos, A = this.awaitPos, v = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var C = this.parseExprList(h.parenR, this.options.ecmaVersion >= 8, !1, F);
    if (n && !p && !this.canInsertSemicolon() && this.eat(h.arrow))
      return this.checkPatternErrors(F, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = g, this.awaitPos = A, this.awaitIdentPos = v, this.parseArrowExpression(this.startNodeAt(t, i), C, !0, a);
    this.checkExpressionErrors(F, !0), this.yieldPos = g || this.yieldPos, this.awaitPos = A || this.awaitPos, this.awaitIdentPos = v || this.awaitIdentPos;
    var x = this.startNodeAt(t, i);
    x.callee = e, x.arguments = C, f && (x.optional = p), e = this.finishNode(x, "CallExpression");
  } else if (this.type === h.backQuote) {
    (p || c) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var I = this.startNodeAt(t, i);
    I.tag = e, I.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(I, "TaggedTemplateExpression");
  }
  return e;
};
G.parseExprAtom = function(e, t) {
  this.type === h.slash && this.readRegexp();
  var i, u = this.potentialArrowAt === this.start;
  switch (this.type) {
    case h._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), i = this.startNode(), this.next(), this.type === h.parenL && !this.allowDirectSuper && this.raise(i.start, "super() call outside constructor of a subclass"), this.type !== h.dot && this.type !== h.bracketL && this.type !== h.parenL && this.unexpected(), this.finishNode(i, "Super");
    case h._this:
      return i = this.startNode(), this.next(), this.finishNode(i, "ThisExpression");
    case h.name:
      var n = this.start, c = this.startLoc, a = this.containsEsc, f = this.parseIdent(!1);
      if (this.options.ecmaVersion >= 8 && !a && f.name === "async" && !this.canInsertSemicolon() && this.eat(h._function))
        return this.overrideContext(ee.f_expr), this.parseFunction(this.startNodeAt(n, c), 0, !1, !0, t);
      if (u && !this.canInsertSemicolon()) {
        if (this.eat(h.arrow))
          return this.parseArrowExpression(this.startNodeAt(n, c), [f], !1, t);
        if (this.options.ecmaVersion >= 8 && f.name === "async" && this.type === h.name && !a && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
          return f = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(h.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(n, c), [f], !0, t);
      }
      return f;
    case h.regexp:
      var p = this.value;
      return i = this.parseLiteral(p.value), i.regex = { pattern: p.pattern, flags: p.flags }, i;
    case h.num:
    case h.string:
      return this.parseLiteral(this.value);
    case h._null:
    case h._true:
    case h._false:
      return i = this.startNode(), i.value = this.type === h._null ? null : this.type === h._true, i.raw = this.type.keyword, this.next(), this.finishNode(i, "Literal");
    case h.parenL:
      var m = this.start, D = this.parseParenAndDistinguishExpression(u, t);
      return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(D) && (e.parenthesizedAssign = m), e.parenthesizedBind < 0 && (e.parenthesizedBind = m)), D;
    case h.bracketL:
      return i = this.startNode(), this.next(), i.elements = this.parseExprList(h.bracketR, !0, !0, e), this.finishNode(i, "ArrayExpression");
    case h.braceL:
      return this.overrideContext(ee.b_expr), this.parseObj(!1, e);
    case h._function:
      return i = this.startNode(), this.next(), this.parseFunction(i, 0);
    case h._class:
      return this.parseClass(this.startNode(), !1);
    case h._new:
      return this.parseNew();
    case h.backQuote:
      return this.parseTemplate();
    case h._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();
    default:
      this.unexpected();
  }
};
G.parseExprImport = function() {
  var e = this.startNode();
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import");
  var t = this.parseIdent(!0);
  switch (this.type) {
    case h.parenL:
      return this.parseDynamicImport(e);
    case h.dot:
      return e.meta = t, this.parseImportMeta(e);
    default:
      this.unexpected();
  }
};
G.parseDynamicImport = function(e) {
  if (this.next(), e.source = this.parseMaybeAssign(), !this.eat(h.parenR)) {
    var t = this.start;
    this.eat(h.comma) && this.eat(h.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
  }
  return this.finishNode(e, "ImportExpression");
};
G.parseImportMeta = function(e) {
  this.next();
  var t = this.containsEsc;
  return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
};
G.parseLiteral = function(e) {
  var t = this.startNode();
  return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal");
};
G.parseParenExpression = function() {
  this.expect(h.parenL);
  var e = this.parseExpression();
  return this.expect(h.parenR), e;
};
G.parseParenAndDistinguishExpression = function(e, t) {
  var i = this.start, u = this.startLoc, n, c = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var a = this.start, f = this.startLoc, p = [], m = !0, D = !1, F = new gt(), g = this.yieldPos, A = this.awaitPos, v;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== h.parenR; )
      if (m ? m = !1 : this.expect(h.comma), c && this.afterTrailingComma(h.parenR, !0)) {
        D = !0;
        break;
      } else if (this.type === h.ellipsis) {
        v = this.start, p.push(this.parseParenItem(this.parseRestBinding())), this.type === h.comma && this.raise(this.start, "Comma is not permitted after the rest element");
        break;
      } else
        p.push(this.parseMaybeAssign(!1, F, this.parseParenItem));
    var C = this.lastTokEnd, x = this.lastTokEndLoc;
    if (this.expect(h.parenR), e && !this.canInsertSemicolon() && this.eat(h.arrow))
      return this.checkPatternErrors(F, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = g, this.awaitPos = A, this.parseParenArrowList(i, u, p, t);
    (!p.length || D) && this.unexpected(this.lastTokStart), v && this.unexpected(v), this.checkExpressionErrors(F, !0), this.yieldPos = g || this.yieldPos, this.awaitPos = A || this.awaitPos, p.length > 1 ? (n = this.startNodeAt(a, f), n.expressions = p, this.finishNodeAt(n, "SequenceExpression", C, x)) : n = p[0];
  } else
    n = this.parseParenExpression();
  if (this.options.preserveParens) {
    var I = this.startNodeAt(i, u);
    return I.expression = n, this.finishNode(I, "ParenthesizedExpression");
  } else
    return n;
};
G.parseParenItem = function(e) {
  return e;
};
G.parseParenArrowList = function(e, t, i, u) {
  return this.parseArrowExpression(this.startNodeAt(e, t), i, !1, u);
};
var Vu = [];
G.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var e = this.startNode(), t = this.parseIdent(!0);
  if (this.options.ecmaVersion >= 6 && this.eat(h.dot)) {
    e.meta = t;
    var i = this.containsEsc;
    return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), i && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
  }
  var u = this.start, n = this.startLoc, c = this.type === h._import;
  return e.callee = this.parseSubscripts(this.parseExprAtom(), u, n, !0, !1), c && e.callee.type === "ImportExpression" && this.raise(u, "Cannot use new with import()"), this.eat(h.parenL) ? e.arguments = this.parseExprList(h.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = Vu, this.finishNode(e, "NewExpression");
};
G.parseTemplateElement = function(e) {
  var t = e.isTagged, i = this.startNode();
  return this.type === h.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), i.value = {
    raw: this.value,
    cooked: null
  }) : i.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
    cooked: this.value
  }, this.next(), i.tail = this.type === h.backQuote, this.finishNode(i, "TemplateElement");
};
G.parseTemplate = function(e) {
  e === void 0 && (e = {});
  var t = e.isTagged;
  t === void 0 && (t = !1);
  var i = this.startNode();
  this.next(), i.expressions = [];
  var u = this.parseTemplateElement({ isTagged: t });
  for (i.quasis = [u]; !u.tail; )
    this.type === h.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(h.dollarBraceL), i.expressions.push(this.parseExpression()), this.expect(h.braceR), i.quasis.push(u = this.parseTemplateElement({ isTagged: t }));
  return this.next(), this.finishNode(i, "TemplateLiteral");
};
G.isAsyncProp = function(e) {
  return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === h.name || this.type === h.num || this.type === h.string || this.type === h.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === h.star) && !Fe.test(this.input.slice(this.lastTokEnd, this.start));
};
G.parseObj = function(e, t) {
  var i = this.startNode(), u = !0, n = {};
  for (i.properties = [], this.next(); !this.eat(h.braceR); ) {
    if (u)
      u = !1;
    else if (this.expect(h.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(h.braceR))
      break;
    var c = this.parseProperty(e, t);
    e || this.checkPropClash(c, n, t), i.properties.push(c);
  }
  return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression");
};
G.parseProperty = function(e, t) {
  var i = this.startNode(), u, n, c, a;
  if (this.options.ecmaVersion >= 9 && this.eat(h.ellipsis))
    return e ? (i.argument = this.parseIdent(!1), this.type === h.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(i, "RestElement")) : (i.argument = this.parseMaybeAssign(!1, t), this.type === h.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(i, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (i.method = !1, i.shorthand = !1, (e || t) && (c = this.start, a = this.startLoc), e || (u = this.eat(h.star)));
  var f = this.containsEsc;
  return this.parsePropertyName(i), !e && !f && this.options.ecmaVersion >= 8 && !u && this.isAsyncProp(i) ? (n = !0, u = this.options.ecmaVersion >= 9 && this.eat(h.star), this.parsePropertyName(i, t)) : n = !1, this.parsePropertyValue(i, e, u, n, c, a, t, f), this.finishNode(i, "Property");
};
G.parsePropertyValue = function(e, t, i, u, n, c, a, f) {
  if ((i || u) && this.type === h.colon && this.unexpected(), this.eat(h.colon))
    e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, a), e.kind = "init";
  else if (this.options.ecmaVersion >= 6 && this.type === h.parenL)
    t && this.unexpected(), e.kind = "init", e.method = !0, e.value = this.parseMethod(i, u);
  else if (!t && !f && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== h.comma && this.type !== h.braceR && this.type !== h.eq) {
    (i || u) && this.unexpected(), e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(!1);
    var p = e.kind === "get" ? 0 : 1;
    if (e.value.params.length !== p) {
      var m = e.value.start;
      e.kind === "get" ? this.raiseRecoverable(m, "getter should have no params") : this.raiseRecoverable(m, "setter should have exactly one param");
    } else
      e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
  } else
    this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((i || u) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = n), e.kind = "init", t ? e.value = this.parseMaybeDefault(n, c, this.copyNode(e.key)) : this.type === h.eq && a ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start), e.value = this.parseMaybeDefault(n, c, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.shorthand = !0) : this.unexpected();
};
G.parsePropertyName = function(e) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(h.bracketL))
      return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(h.bracketR), e.key;
    e.computed = !1;
  }
  return e.key = this.type === h.num || this.type === h.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
G.initFunction = function(e) {
  e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
};
G.parseMethod = function(e, t, i) {
  var u = this.startNode(), n = this.yieldPos, c = this.awaitPos, a = this.awaitIdentPos;
  return this.initFunction(u), this.options.ecmaVersion >= 6 && (u.generator = e), this.options.ecmaVersion >= 8 && (u.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(Ut(t, u.generator) | Vt | (i ? Vi : 0)), this.expect(h.parenL), u.params = this.parseBindingList(h.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(u, !1, !0, !1), this.yieldPos = n, this.awaitPos = c, this.awaitIdentPos = a, this.finishNode(u, "FunctionExpression");
};
G.parseArrowExpression = function(e, t, i, u) {
  var n = this.yieldPos, c = this.awaitPos, a = this.awaitIdentPos;
  return this.enterScope(Ut(i, !1) | Mi), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!i), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, u), this.yieldPos = n, this.awaitPos = c, this.awaitIdentPos = a, this.finishNode(e, "ArrowFunctionExpression");
};
G.parseFunctionBody = function(e, t, i, u) {
  var n = t && this.type !== h.braceL, c = this.strict, a = !1;
  if (n)
    e.body = this.parseMaybeAssign(u), e.expression = !0, this.checkParams(e, !1);
  else {
    var f = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
    (!c || f) && (a = this.strictDirective(this.end), a && f && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var p = this.labels;
    this.labels = [], a && (this.strict = !0), this.checkParams(e, !c && !a && !t && !i && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, ji), e.body = this.parseBlock(!1, void 0, a && !c), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = p;
  }
  this.exitScope();
};
G.isSimpleParamList = function(e) {
  for (var t = 0, i = e; t < i.length; t += 1) {
    var u = i[t];
    if (u.type !== "Identifier")
      return !1;
  }
  return !0;
};
G.checkParams = function(e, t) {
  for (var i = /* @__PURE__ */ Object.create(null), u = 0, n = e.params; u < n.length; u += 1) {
    var c = n[u];
    this.checkLValInnerPattern(c, jt, t ? null : i);
  }
};
G.parseExprList = function(e, t, i, u) {
  for (var n = [], c = !0; !this.eat(e); ) {
    if (c)
      c = !1;
    else if (this.expect(h.comma), t && this.afterTrailingComma(e))
      break;
    var a = void 0;
    i && this.type === h.comma ? a = null : this.type === h.ellipsis ? (a = this.parseSpread(u), u && this.type === h.comma && u.trailingComma < 0 && (u.trailingComma = this.start)) : a = this.parseMaybeAssign(!1, u), n.push(a);
  }
  return n;
};
G.checkUnreserved = function(e) {
  var t = e.start, i = e.end, u = e.name;
  if (this.inGenerator && u === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && u === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), this.currentThisScope().inClassFieldInit && u === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (u === "arguments" || u === "await") && this.raise(t, "Cannot use " + u + " in class static initialization block"), this.keywords.test(u) && this.raise(t, "Unexpected keyword '" + u + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, i).indexOf("\\") !== -1)) {
    var n = this.strict ? this.reservedWordsStrict : this.reservedWords;
    n.test(u) && (!this.inAsync && u === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + u + "' is reserved"));
  }
};
G.parseIdent = function(e, t) {
  var i = this.startNode();
  return this.type === h.name ? i.name = this.value : this.type.keyword ? (i.name = this.type.keyword, (i.name === "class" || i.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop()) : this.unexpected(), this.next(!!e), this.finishNode(i, "Identifier"), e || (this.checkUnreserved(i), i.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = i.start)), i;
};
G.parsePrivateIdent = function() {
  var e = this.startNode();
  return this.type === h.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e), e;
};
G.parseYield = function(e) {
  this.yieldPos || (this.yieldPos = this.start);
  var t = this.startNode();
  return this.next(), this.type === h.semi || this.canInsertSemicolon() || this.type !== h.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(h.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
};
G.parseAwait = function(e) {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
};
var Dt = oe.prototype;
Dt.raise = function(e, t) {
  var i = Ti(this.input, e);
  t += " (" + i.line + ":" + i.column + ")";
  var u = new SyntaxError(t);
  throw u.pos = e, u.loc = i, u.raisedAt = this.pos, u;
};
Dt.raiseRecoverable = Dt.raise;
Dt.curPosition = function() {
  if (this.options.locations)
    return new Je(this.curLine, this.pos - this.lineStart);
};
var Ne = oe.prototype, qu = function(t) {
  this.flags = t, this.var = [], this.lexical = [], this.functions = [], this.inClassFieldInit = !1;
};
Ne.enterScope = function(e) {
  this.scopeStack.push(new qu(e));
};
Ne.exitScope = function() {
  this.scopeStack.pop();
};
Ne.treatFunctionsAsVarInScope = function(e) {
  return e.flags & Ge || !this.inModule && e.flags & et;
};
Ne.declareName = function(e, t, i) {
  var u = !1;
  if (t === _e) {
    var n = this.currentScope();
    u = n.lexical.indexOf(e) > -1 || n.functions.indexOf(e) > -1 || n.var.indexOf(e) > -1, n.lexical.push(e), this.inModule && n.flags & et && delete this.undefinedExports[e];
  } else if (t === Ui) {
    var c = this.currentScope();
    c.lexical.push(e);
  } else if (t === qi) {
    var a = this.currentScope();
    this.treatFunctionsAsVar ? u = a.lexical.indexOf(e) > -1 : u = a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1, a.functions.push(e);
  } else
    for (var f = this.scopeStack.length - 1; f >= 0; --f) {
      var p = this.scopeStack[f];
      if (p.lexical.indexOf(e) > -1 && !(p.flags & Oi && p.lexical[0] === e) || !this.treatFunctionsAsVarInScope(p) && p.functions.indexOf(e) > -1) {
        u = !0;
        break;
      }
      if (p.var.push(e), this.inModule && p.flags & et && delete this.undefinedExports[e], p.flags & qt)
        break;
    }
  u && this.raiseRecoverable(i, "Identifier '" + e + "' has already been declared");
};
Ne.checkLocalExport = function(e) {
  this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
};
Ne.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
Ne.currentVarScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & qt)
      return t;
  }
};
Ne.currentThisScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & qt && !(t.flags & Mi))
      return t;
  }
};
var Ct = function(t, i, u) {
  this.type = "", this.start = i, this.end = 0, t.options.locations && (this.loc = new mt(t, u)), t.options.directSourceFile && (this.sourceFile = t.options.directSourceFile), t.options.ranges && (this.range = [i, 0]);
}, ut = oe.prototype;
ut.startNode = function() {
  return new Ct(this, this.start, this.startLoc);
};
ut.startNodeAt = function(e, t) {
  return new Ct(this, e, t);
};
function zi(e, t, i, u) {
  return e.type = t, e.end = i, this.options.locations && (e.loc.end = u), this.options.ranges && (e.range[1] = i), e;
}
ut.finishNode = function(e, t) {
  return zi.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
};
ut.finishNodeAt = function(e, t, i, u) {
  return zi.call(this, e, t, i, u);
};
ut.copyNode = function(e) {
  var t = new Ct(this, e.start, this.startLoc);
  for (var i in e)
    t[i] = e[i];
  return t;
};
var Hi = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", Qi = Hi + " Extended_Pictographic", Ki = Qi, Yi = Ki + " EBase EComp EMod EPres ExtPict", Uu = Yi, ju = {
  9: Hi,
  10: Qi,
  11: Ki,
  12: Yi,
  13: Uu
}, Di = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", Xi = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", $i = Xi + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", Zi = $i + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", Ji = Zi + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", Wu = Ji + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", Gu = {
  9: Xi,
  10: $i,
  11: Zi,
  12: Ji,
  13: Wu
}, er = {};
function zu(e) {
  var t = er[e] = {
    binary: Ve(ju[e] + " " + Di),
    nonBinary: {
      General_Category: Ve(Di),
      Script: Ve(Gu[e])
    }
  };
  t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (var wt = 0, mi = [9, 10, 11, 12, 13]; wt < mi.length; wt += 1) {
  var Hu = mi[wt];
  zu(Hu);
}
var O = oe.prototype, ke = function(t) {
  this.parser = t, this.validFlags = "gim" + (t.options.ecmaVersion >= 6 ? "uy" : "") + (t.options.ecmaVersion >= 9 ? "s" : "") + (t.options.ecmaVersion >= 13 ? "d" : ""), this.unicodeProperties = er[t.options.ecmaVersion >= 13 ? 13 : t.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = [];
};
ke.prototype.reset = function(t, i, u) {
  var n = u.indexOf("u") !== -1;
  this.start = t | 0, this.source = i + "", this.flags = u, this.switchU = n && this.parser.options.ecmaVersion >= 6, this.switchN = n && this.parser.options.ecmaVersion >= 9;
};
ke.prototype.raise = function(t) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + t);
};
ke.prototype.at = function(t, i) {
  i === void 0 && (i = !1);
  var u = this.source, n = u.length;
  if (t >= n)
    return -1;
  var c = u.charCodeAt(t);
  if (!(i || this.switchU) || c <= 55295 || c >= 57344 || t + 1 >= n)
    return c;
  var a = u.charCodeAt(t + 1);
  return a >= 56320 && a <= 57343 ? (c << 10) + a - 56613888 : c;
};
ke.prototype.nextIndex = function(t, i) {
  i === void 0 && (i = !1);
  var u = this.source, n = u.length;
  if (t >= n)
    return n;
  var c = u.charCodeAt(t), a;
  return !(i || this.switchU) || c <= 55295 || c >= 57344 || t + 1 >= n || (a = u.charCodeAt(t + 1)) < 56320 || a > 57343 ? t + 1 : t + 2;
};
ke.prototype.current = function(t) {
  return t === void 0 && (t = !1), this.at(this.pos, t);
};
ke.prototype.lookahead = function(t) {
  return t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t);
};
ke.prototype.advance = function(t) {
  t === void 0 && (t = !1), this.pos = this.nextIndex(this.pos, t);
};
ke.prototype.eat = function(t, i) {
  return i === void 0 && (i = !1), this.current(i) === t ? (this.advance(i), !0) : !1;
};
O.validateRegExpFlags = function(e) {
  for (var t = e.validFlags, i = e.flags, u = 0; u < i.length; u++) {
    var n = i.charAt(u);
    t.indexOf(n) === -1 && this.raise(e.start, "Invalid regular expression flag"), i.indexOf(n, u + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag");
  }
};
O.validateRegExpPattern = function(e) {
  this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && e.groupNames.length > 0 && (e.switchN = !0, this.regexp_pattern(e));
};
O.regexp_pattern = function(e) {
  e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames.length = 0, e.backReferenceNames.length = 0, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"), (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
  for (var t = 0, i = e.backReferenceNames; t < i.length; t += 1) {
    var u = i[t];
    e.groupNames.indexOf(u) === -1 && e.raise("Invalid named capture referenced");
  }
};
O.regexp_disjunction = function(e) {
  for (this.regexp_alternative(e); e.eat(124); )
    this.regexp_alternative(e);
  this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(123) && e.raise("Lone quantifier brackets");
};
O.regexp_alternative = function(e) {
  for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
    ;
};
O.regexp_eatTerm = function(e) {
  return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
};
O.regexp_eatAssertion = function(e) {
  var t = e.pos;
  if (e.lastAssertionIsQuantifiable = !1, e.eat(94) || e.eat(36))
    return !0;
  if (e.eat(92)) {
    if (e.eat(66) || e.eat(98))
      return !0;
    e.pos = t;
  }
  if (e.eat(40) && e.eat(63)) {
    var i = !1;
    if (this.options.ecmaVersion >= 9 && (i = e.eat(60)), e.eat(61) || e.eat(33))
      return this.regexp_disjunction(e), e.eat(41) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !i, !0;
  }
  return e.pos = t, !1;
};
O.regexp_eatQuantifier = function(e, t) {
  return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1;
};
O.regexp_eatQuantifierPrefix = function(e, t) {
  return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
};
O.regexp_eatBracedQuantifier = function(e, t) {
  var i = e.pos;
  if (e.eat(123)) {
    var u = 0, n = -1;
    if (this.regexp_eatDecimalDigits(e) && (u = e.lastIntValue, e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue), e.eat(125)))
      return n !== -1 && n < u && !t && e.raise("numbers out of order in {} quantifier"), !0;
    e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = i;
  }
  return !1;
};
O.regexp_eatAtom = function(e) {
  return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
};
O.regexp_eatReverseSolidusAtomEscape = function(e) {
  var t = e.pos;
  if (e.eat(92)) {
    if (this.regexp_eatAtomEscape(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
O.regexp_eatUncapturingGroup = function(e) {
  var t = e.pos;
  if (e.eat(40)) {
    if (e.eat(63) && e.eat(58)) {
      if (this.regexp_disjunction(e), e.eat(41))
        return !0;
      e.raise("Unterminated group");
    }
    e.pos = t;
  }
  return !1;
};
O.regexp_eatCapturingGroup = function(e) {
  if (e.eat(40)) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(41))
      return e.numCapturingParens += 1, !0;
    e.raise("Unterminated group");
  }
  return !1;
};
O.regexp_eatExtendedAtom = function(e) {
  return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
};
O.regexp_eatInvalidBracedQuantifier = function(e) {
  return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
};
O.regexp_eatSyntaxCharacter = function(e) {
  var t = e.current();
  return tr(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function tr(e) {
  return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
O.regexp_eatPatternCharacters = function(e) {
  for (var t = e.pos, i = 0; (i = e.current()) !== -1 && !tr(i); )
    e.advance();
  return e.pos !== t;
};
O.regexp_eatExtendedPatternCharacter = function(e) {
  var t = e.current();
  return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
};
O.regexp_groupSpecifier = function(e) {
  if (e.eat(63)) {
    if (this.regexp_eatGroupName(e)) {
      e.groupNames.indexOf(e.lastStringValue) !== -1 && e.raise("Duplicate capture group name"), e.groupNames.push(e.lastStringValue);
      return;
    }
    e.raise("Invalid group");
  }
};
O.regexp_eatGroupName = function(e) {
  if (e.lastStringValue = "", e.eat(60)) {
    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62))
      return !0;
    e.raise("Invalid capture group name");
  }
  return !1;
};
O.regexp_eatRegExpIdentifierName = function(e) {
  if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
    for (e.lastStringValue += Le(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
      e.lastStringValue += Le(e.lastIntValue);
    return !0;
  }
  return !1;
};
O.regexp_eatRegExpIdentifierStart = function(e) {
  var t = e.pos, i = this.options.ecmaVersion >= 11, u = e.current(i);
  return e.advance(i), u === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (u = e.lastIntValue), Qu(u) ? (e.lastIntValue = u, !0) : (e.pos = t, !1);
};
function Qu(e) {
  return we(e, !0) || e === 36 || e === 95;
}
O.regexp_eatRegExpIdentifierPart = function(e) {
  var t = e.pos, i = this.options.ecmaVersion >= 11, u = e.current(i);
  return e.advance(i), u === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, i) && (u = e.lastIntValue), Ku(u) ? (e.lastIntValue = u, !0) : (e.pos = t, !1);
};
function Ku(e) {
  return je(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
O.regexp_eatAtomEscape = function(e) {
  return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
};
O.regexp_eatBackReference = function(e) {
  var t = e.pos;
  if (this.regexp_eatDecimalEscape(e)) {
    var i = e.lastIntValue;
    if (e.switchU)
      return i > e.maxBackReference && (e.maxBackReference = i), !0;
    if (i <= e.numCapturingParens)
      return !0;
    e.pos = t;
  }
  return !1;
};
O.regexp_eatKGroupName = function(e) {
  if (e.eat(107)) {
    if (this.regexp_eatGroupName(e))
      return e.backReferenceNames.push(e.lastStringValue), !0;
    e.raise("Invalid named reference");
  }
  return !1;
};
O.regexp_eatCharacterEscape = function(e) {
  return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
};
O.regexp_eatCControlLetter = function(e) {
  var t = e.pos;
  if (e.eat(99)) {
    if (this.regexp_eatControlLetter(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
O.regexp_eatZero = function(e) {
  return e.current() === 48 && !At(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
};
O.regexp_eatControlEscape = function(e) {
  var t = e.current();
  return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
};
O.regexp_eatControlLetter = function(e) {
  var t = e.current();
  return ir(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
function ir(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
O.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
  t === void 0 && (t = !1);
  var i = e.pos, u = t || e.switchU;
  if (e.eat(117)) {
    if (this.regexp_eatFixedHexDigits(e, 4)) {
      var n = e.lastIntValue;
      if (u && n >= 55296 && n <= 56319) {
        var c = e.pos;
        if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
          var a = e.lastIntValue;
          if (a >= 56320 && a <= 57343)
            return e.lastIntValue = (n - 55296) * 1024 + (a - 56320) + 65536, !0;
        }
        e.pos = c, e.lastIntValue = n;
      }
      return !0;
    }
    if (u && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && Yu(e.lastIntValue))
      return !0;
    u && e.raise("Invalid unicode escape"), e.pos = i;
  }
  return !1;
};
function Yu(e) {
  return e >= 0 && e <= 1114111;
}
O.regexp_eatIdentityEscape = function(e) {
  if (e.switchU)
    return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(47) ? (e.lastIntValue = 47, !0) : !1;
  var t = e.current();
  return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
O.regexp_eatDecimalEscape = function(e) {
  e.lastIntValue = 0;
  var t = e.current();
  if (t >= 49 && t <= 57) {
    do
      e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
    while ((t = e.current()) >= 48 && t <= 57);
    return !0;
  }
  return !1;
};
O.regexp_eatCharacterClassEscape = function(e) {
  var t = e.current();
  if (Xu(t))
    return e.lastIntValue = -1, e.advance(), !0;
  if (e.switchU && this.options.ecmaVersion >= 9 && (t === 80 || t === 112)) {
    if (e.lastIntValue = -1, e.advance(), e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125))
      return !0;
    e.raise("Invalid property name");
  }
  return !1;
};
function Xu(e) {
  return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
O.regexp_eatUnicodePropertyValueExpression = function(e) {
  var t = e.pos;
  if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
    var i = e.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(e)) {
      var u = e.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(e, i, u), !0;
    }
  }
  if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
    var n = e.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(e, n), !0;
  }
  return !1;
};
O.regexp_validateUnicodePropertyNameAndValue = function(e, t, i) {
  it(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(i) || e.raise("Invalid property value");
};
O.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
  e.unicodeProperties.binary.test(t) || e.raise("Invalid property name");
};
O.regexp_eatUnicodePropertyName = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; rr(t = e.current()); )
    e.lastStringValue += Le(t), e.advance();
  return e.lastStringValue !== "";
};
function rr(e) {
  return ir(e) || e === 95;
}
O.regexp_eatUnicodePropertyValue = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; $u(t = e.current()); )
    e.lastStringValue += Le(t), e.advance();
  return e.lastStringValue !== "";
};
function $u(e) {
  return rr(e) || At(e);
}
O.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
  return this.regexp_eatUnicodePropertyValue(e);
};
O.regexp_eatCharacterClass = function(e) {
  if (e.eat(91)) {
    if (e.eat(94), this.regexp_classRanges(e), e.eat(93))
      return !0;
    e.raise("Unterminated character class");
  }
  return !1;
};
O.regexp_classRanges = function(e) {
  for (; this.regexp_eatClassAtom(e); ) {
    var t = e.lastIntValue;
    if (e.eat(45) && this.regexp_eatClassAtom(e)) {
      var i = e.lastIntValue;
      e.switchU && (t === -1 || i === -1) && e.raise("Invalid character class"), t !== -1 && i !== -1 && t > i && e.raise("Range out of order in character class");
    }
  }
};
O.regexp_eatClassAtom = function(e) {
  var t = e.pos;
  if (e.eat(92)) {
    if (this.regexp_eatClassEscape(e))
      return !0;
    if (e.switchU) {
      var i = e.current();
      (i === 99 || sr(i)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
    }
    e.pos = t;
  }
  var u = e.current();
  return u !== 93 ? (e.lastIntValue = u, e.advance(), !0) : !1;
};
O.regexp_eatClassEscape = function(e) {
  var t = e.pos;
  if (e.eat(98))
    return e.lastIntValue = 8, !0;
  if (e.switchU && e.eat(45))
    return e.lastIntValue = 45, !0;
  if (!e.switchU && e.eat(99)) {
    if (this.regexp_eatClassControlLetter(e))
      return !0;
    e.pos = t;
  }
  return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
};
O.regexp_eatClassControlLetter = function(e) {
  var t = e.current();
  return At(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
O.regexp_eatHexEscapeSequence = function(e) {
  var t = e.pos;
  if (e.eat(120)) {
    if (this.regexp_eatFixedHexDigits(e, 2))
      return !0;
    e.switchU && e.raise("Invalid escape"), e.pos = t;
  }
  return !1;
};
O.regexp_eatDecimalDigits = function(e) {
  var t = e.pos, i = 0;
  for (e.lastIntValue = 0; At(i = e.current()); )
    e.lastIntValue = 10 * e.lastIntValue + (i - 48), e.advance();
  return e.pos !== t;
};
function At(e) {
  return e >= 48 && e <= 57;
}
O.regexp_eatHexDigits = function(e) {
  var t = e.pos, i = 0;
  for (e.lastIntValue = 0; ur(i = e.current()); )
    e.lastIntValue = 16 * e.lastIntValue + nr(i), e.advance();
  return e.pos !== t;
};
function ur(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function nr(e) {
  return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
O.regexp_eatLegacyOctalEscapeSequence = function(e) {
  if (this.regexp_eatOctalDigit(e)) {
    var t = e.lastIntValue;
    if (this.regexp_eatOctalDigit(e)) {
      var i = e.lastIntValue;
      t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + i * 8 + e.lastIntValue : e.lastIntValue = t * 8 + i;
    } else
      e.lastIntValue = t;
    return !0;
  }
  return !1;
};
O.regexp_eatOctalDigit = function(e) {
  var t = e.current();
  return sr(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
};
function sr(e) {
  return e >= 48 && e <= 55;
}
O.regexp_eatFixedHexDigits = function(e, t) {
  var i = e.pos;
  e.lastIntValue = 0;
  for (var u = 0; u < t; ++u) {
    var n = e.current();
    if (!ur(n))
      return e.pos = i, !1;
    e.lastIntValue = 16 * e.lastIntValue + nr(n), e.advance();
  }
  return !0;
};
var Gt = function(t) {
  this.type = t.type, this.value = t.value, this.start = t.start, this.end = t.end, t.options.locations && (this.loc = new mt(t, t.startLoc, t.endLoc)), t.options.ranges && (this.range = [t.start, t.end]);
}, z = oe.prototype;
z.next = function(e) {
  !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Gt(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
z.getToken = function() {
  return this.next(), new Gt(this);
};
typeof Symbol < "u" && (z[Symbol.iterator] = function() {
  var e = this;
  return {
    next: function() {
      var t = e.getToken();
      return {
        done: t.type === h.eof,
        value: t
      };
    }
  };
});
z.nextToken = function() {
  var e = this.curContext();
  if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(h.eof);
  if (e.override)
    return e.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
z.readToken = function(e) {
  return we(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
};
z.fullCharCodeAtPos = function() {
  var e = this.input.charCodeAt(this.pos);
  if (e <= 55295 || e >= 56320)
    return e;
  var t = this.input.charCodeAt(this.pos + 1);
  return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
};
z.skipBlockComment = function() {
  var e = this.options.onComment && this.curPosition(), t = this.pos, i = this.input.indexOf("*/", this.pos += 2);
  if (i === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = i + 2, this.options.locations)
    for (var u = void 0, n = t; (u = Pi(this.input, n, this.pos)) > -1; )
      ++this.curLine, n = this.lineStart = u;
  this.options.onComment && this.options.onComment(
    !0,
    this.input.slice(t + 2, i),
    t,
    this.pos,
    e,
    this.curPosition()
  );
};
z.skipLineComment = function(e) {
  for (var t = this.pos, i = this.options.onComment && this.curPosition(), u = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !We(u); )
    u = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    !1,
    this.input.slice(t + e, this.pos),
    t,
    this.pos,
    i,
    this.curPosition()
  );
};
z.skipSpace = function() {
  e:
    for (; this.pos < this.input.length; ) {
      var e = this.input.charCodeAt(this.pos);
      switch (e) {
        case 32:
        case 160:
          ++this.pos;
          break;
        case 13:
          this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
        case 10:
        case 8232:
        case 8233:
          ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
          break;
        case 47:
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break e;
          }
          break;
        default:
          if (e > 8 && e < 14 || e >= 5760 && Li.test(String.fromCharCode(e)))
            ++this.pos;
          else
            break e;
      }
    }
};
z.finishToken = function(e, t) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var i = this.type;
  this.type = e, this.value = t, this.updateContext(i);
};
z.readToken_dot = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e >= 48 && e <= 57)
    return this.readNumber(!0);
  var t = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(h.ellipsis)) : (++this.pos, this.finishToken(h.dot));
};
z.readToken_slash = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(h.assign, 2) : this.finishOp(h.slash, 1);
};
z.readToken_mult_modulo_exp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), i = 1, u = e === 42 ? h.star : h.modulo;
  return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++i, u = h.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(h.assign, i + 1) : this.finishOp(u, i);
};
z.readToken_pipe_amp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t === e) {
    if (this.options.ecmaVersion >= 12) {
      var i = this.input.charCodeAt(this.pos + 2);
      if (i === 61)
        return this.finishOp(h.assign, 3);
    }
    return this.finishOp(e === 124 ? h.logicalOR : h.logicalAND, 2);
  }
  return t === 61 ? this.finishOp(h.assign, 2) : this.finishOp(e === 124 ? h.bitwiseOR : h.bitwiseAND, 1);
};
z.readToken_caret = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(h.assign, 2) : this.finishOp(h.bitwiseXOR, 1);
};
z.readToken_plus_min = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || Fe.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(h.incDec, 2) : t === 61 ? this.finishOp(h.assign, 2) : this.finishOp(h.plusMin, 1);
};
z.readToken_lt_gt = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), i = 1;
  return t === e ? (i = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + i) === 61 ? this.finishOp(h.assign, i + 1) : this.finishOp(h.bitShift, i)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (i = 2), this.finishOp(h.relational, i));
};
z.readToken_eq_excl = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(h.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(h.arrow)) : this.finishOp(e === 61 ? h.eq : h.prefix, 1);
};
z.readToken_question = function() {
  var e = this.options.ecmaVersion;
  if (e >= 11) {
    var t = this.input.charCodeAt(this.pos + 1);
    if (t === 46) {
      var i = this.input.charCodeAt(this.pos + 2);
      if (i < 48 || i > 57)
        return this.finishOp(h.questionDot, 2);
    }
    if (t === 63) {
      if (e >= 12) {
        var u = this.input.charCodeAt(this.pos + 2);
        if (u === 61)
          return this.finishOp(h.assign, 3);
      }
      return this.finishOp(h.coalesce, 2);
    }
  }
  return this.finishOp(h.question, 1);
};
z.readToken_numberSign = function() {
  var e = this.options.ecmaVersion, t = 35;
  if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), we(t, !0) || t === 92))
    return this.finishToken(h.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + Le(t) + "'");
};
z.getTokenFromCode = function(e) {
  switch (e) {
    case 46:
      return this.readToken_dot();
    case 40:
      return ++this.pos, this.finishToken(h.parenL);
    case 41:
      return ++this.pos, this.finishToken(h.parenR);
    case 59:
      return ++this.pos, this.finishToken(h.semi);
    case 44:
      return ++this.pos, this.finishToken(h.comma);
    case 91:
      return ++this.pos, this.finishToken(h.bracketL);
    case 93:
      return ++this.pos, this.finishToken(h.bracketR);
    case 123:
      return ++this.pos, this.finishToken(h.braceL);
    case 125:
      return ++this.pos, this.finishToken(h.braceR);
    case 58:
      return ++this.pos, this.finishToken(h.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(h.backQuote);
    case 48:
      var t = this.input.charCodeAt(this.pos + 1);
      if (t === 120 || t === 88)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (t === 111 || t === 79)
          return this.readRadixNumber(8);
        if (t === 98 || t === 66)
          return this.readRadixNumber(2);
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(!1);
    case 34:
    case 39:
      return this.readString(e);
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
      return this.readToken_pipe_amp(e);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(e);
    case 60:
    case 62:
      return this.readToken_lt_gt(e);
    case 61:
    case 33:
      return this.readToken_eq_excl(e);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(h.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + Le(e) + "'");
};
z.finishOp = function(e, t) {
  var i = this.input.slice(this.pos, this.pos + t);
  return this.pos += t, this.finishToken(e, i);
};
z.readRegexp = function() {
  for (var e, t, i = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(i, "Unterminated regular expression");
    var u = this.input.charAt(this.pos);
    if (Fe.test(u) && this.raise(i, "Unterminated regular expression"), e)
      e = !1;
    else {
      if (u === "[")
        t = !0;
      else if (u === "]" && t)
        t = !1;
      else if (u === "/" && !t)
        break;
      e = u === "\\";
    }
    ++this.pos;
  }
  var n = this.input.slice(i, this.pos);
  ++this.pos;
  var c = this.pos, a = this.readWord1();
  this.containsEsc && this.unexpected(c);
  var f = this.regexpState || (this.regexpState = new ke(this));
  f.reset(i, n, a), this.validateRegExpFlags(f), this.validateRegExpPattern(f);
  var p = null;
  try {
    p = new RegExp(n, a);
  } catch {
  }
  return this.finishToken(h.regexp, { pattern: n, flags: a, value: p });
};
z.readInt = function(e, t, i) {
  for (var u = this.options.ecmaVersion >= 12 && t === void 0, n = i && this.input.charCodeAt(this.pos) === 48, c = this.pos, a = 0, f = 0, p = 0, m = t ?? 1 / 0; p < m; ++p, ++this.pos) {
    var D = this.input.charCodeAt(this.pos), F = void 0;
    if (u && D === 95) {
      n && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), f === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), p === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), f = D;
      continue;
    }
    if (D >= 97 ? F = D - 97 + 10 : D >= 65 ? F = D - 65 + 10 : D >= 48 && D <= 57 ? F = D - 48 : F = 1 / 0, F >= e)
      break;
    f = D, a = a * e + F;
  }
  return u && f === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === c || t != null && this.pos - c !== t ? null : a;
};
function Zu(e, t) {
  return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function ar(e) {
  return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
}
z.readRadixNumber = function(e) {
  var t = this.pos;
  this.pos += 2;
  var i = this.readInt(e);
  return i == null && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (i = ar(this.input.slice(t, this.pos)), ++this.pos) : we(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(h.num, i);
};
z.readNumber = function(e) {
  var t = this.pos;
  !e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
  var i = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
  i && this.strict && this.raise(t, "Invalid number");
  var u = this.input.charCodeAt(this.pos);
  if (!i && !e && this.options.ecmaVersion >= 11 && u === 110) {
    var n = ar(this.input.slice(t, this.pos));
    return ++this.pos, we(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(h.num, n);
  }
  i && /[89]/.test(this.input.slice(t, this.pos)) && (i = !1), u === 46 && !i && (++this.pos, this.readInt(10), u = this.input.charCodeAt(this.pos)), (u === 69 || u === 101) && !i && (u = this.input.charCodeAt(++this.pos), (u === 43 || u === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), we(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var c = Zu(this.input.slice(t, this.pos), i);
  return this.finishToken(h.num, c);
};
z.readCodePoint = function() {
  var e = this.input.charCodeAt(this.pos), t;
  if (e === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var i = ++this.pos;
    t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(i, "Code point out of bounds");
  } else
    t = this.readHexChar(4);
  return t;
};
z.readString = function(e) {
  for (var t = "", i = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var u = this.input.charCodeAt(this.pos);
    if (u === e)
      break;
    u === 92 ? (t += this.input.slice(i, this.pos), t += this.readEscapedChar(!1), i = this.pos) : u === 8232 || u === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (We(u) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return t += this.input.slice(i, this.pos++), this.finishToken(h.string, t);
};
var or = {};
z.tryReadTemplateToken = function() {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (e) {
    if (e === or)
      this.readInvalidTemplateToken();
    else
      throw e;
  }
  this.inTemplateElement = !1;
};
z.invalidStringToken = function(e, t) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw or;
  this.raise(e, t);
};
z.readTmplToken = function() {
  for (var e = "", t = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var i = this.input.charCodeAt(this.pos);
    if (i === 96 || i === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === h.template || this.type === h.invalidTemplate) ? i === 36 ? (this.pos += 2, this.finishToken(h.dollarBraceL)) : (++this.pos, this.finishToken(h.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(h.template, e));
    if (i === 92)
      e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
    else if (We(i)) {
      switch (e += this.input.slice(t, this.pos), ++this.pos, i) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          e += `
`;
          break;
        default:
          e += String.fromCharCode(i);
          break;
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
    } else
      ++this.pos;
  }
};
z.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{")
          break;
      case "`":
        return this.finishToken(h.invalidTemplate, this.input.slice(this.start, this.pos));
    }
  this.raise(this.start, "Unterminated template");
};
z.readEscapedChar = function(e) {
  var t = this.input.charCodeAt(++this.pos);
  switch (++this.pos, t) {
    case 110:
      return `
`;
    case 114:
      return "\r";
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    case 117:
      return Le(this.readCodePoint());
    case 116:
      return "	";
    case 98:
      return "\b";
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 13:
      this.input.charCodeAt(this.pos) === 10 && ++this.pos;
    case 10:
      return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
    case 56:
    case 57:
      if (this.strict && this.invalidStringToken(
        this.pos - 1,
        "Invalid escape sequence"
      ), e) {
        var i = this.pos - 1;
        return this.invalidStringToken(
          i,
          "Invalid escape sequence in template string"
        ), null;
      }
    default:
      if (t >= 48 && t <= 55) {
        var u = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], n = parseInt(u, 8);
        return n > 255 && (u = u.slice(0, -1), n = parseInt(u, 8)), this.pos += u.length - 1, t = this.input.charCodeAt(this.pos), (u !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(
          this.pos - 1 - u.length,
          e ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(n);
      }
      return We(t) ? "" : String.fromCharCode(t);
  }
};
z.readHexChar = function(e) {
  var t = this.pos, i = this.readInt(16, e);
  return i === null && this.invalidStringToken(t, "Bad character escape sequence"), i;
};
z.readWord1 = function() {
  this.containsEsc = !1;
  for (var e = "", t = !0, i = this.pos, u = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var n = this.fullCharCodeAtPos();
    if (je(n, u))
      this.pos += n <= 65535 ? 1 : 2;
    else if (n === 92) {
      this.containsEsc = !0, e += this.input.slice(i, this.pos);
      var c = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var a = this.readCodePoint();
      (t ? we : je)(a, u) || this.invalidStringToken(c, "Invalid Unicode escape"), e += Le(a), i = this.pos;
    } else
      break;
    t = !1;
  }
  return e + this.input.slice(i, this.pos);
};
z.readWord = function() {
  var e = this.readWord1(), t = h.name;
  return this.keywords.test(e) && (t = Mt[e]), this.finishToken(t, e);
};
var Ju = "8.8.1";
oe.acorn = {
  Parser: oe,
  version: Ju,
  defaultOptions: Lt,
  Position: Je,
  SourceLocation: mt,
  getLineInfo: Ti,
  Node: Ct,
  TokenType: $,
  tokTypes: h,
  keywordTypes: Mt,
  TokContext: ve,
  tokContexts: ee,
  isIdentifierChar: je,
  isIdentifierStart: we,
  Token: Gt,
  isNewLine: We,
  lineBreak: Fe,
  lineBreakG: wu,
  nonASCIIwhitespace: Li
};
function en(e, t) {
  return oe.parse(e, t);
}
class tn {
  constructor() {
    this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.context = {
      skip: () => this.should_skip = !0,
      remove: () => this.should_remove = !0,
      replace: (t) => this.replacement = t
    };
  }
  replace(t, i, u, n) {
    t && (u !== null ? t[i][u] = n : t[i] = n);
  }
  remove(t, i, u) {
    t && (u !== null ? t[i].splice(u, 1) : delete t[i]);
  }
}
class rn extends tn {
  constructor(t, i) {
    super(), this.enter = t, this.leave = i;
  }
  visit(t, i, u, n) {
    if (t) {
      if (this.enter) {
        const c = this.should_skip, a = this.should_remove, f = this.replacement;
        this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.enter.call(this.context, t, i, u, n), this.replacement && (t = this.replacement, this.replace(i, u, n, t)), this.should_remove && this.remove(i, u, n);
        const p = this.should_skip, m = this.should_remove;
        if (this.should_skip = c, this.should_remove = a, this.replacement = f, p)
          return t;
        if (m)
          return null;
      }
      for (const c in t) {
        const a = t[c];
        if (typeof a == "object")
          if (Array.isArray(a))
            for (let f = 0; f < a.length; f += 1)
              a[f] !== null && typeof a[f].type == "string" && (this.visit(a[f], t, c, f) || f--);
          else
            a !== null && typeof a.type == "string" && this.visit(a, t, c, null);
      }
      if (this.leave) {
        const c = this.replacement, a = this.should_remove;
        this.replacement = null, this.should_remove = !1, this.leave.call(this.context, t, i, u, n), this.replacement && (t = this.replacement, this.replace(i, u, n, t)), this.should_remove && this.remove(i, u, n);
        const f = this.should_remove;
        if (this.replacement = c, this.should_remove = a, f)
          return null;
      }
    }
    return t;
  }
}
function un(e, { enter: t, leave: i }) {
  return new rn(t, i).visit(e, null);
}
function nn(e, t = {}) {
  const { wrapAsync: i = !1, addReturn: u = !0, simpleLocs: n = !1 } = t;
  let c = en(e, {
    ecmaVersion: 2022,
    allowAwaitOutsideFunction: !0,
    locations: !0
  });
  un(c, {
    enter(p, m, D, F) {
      if (an(p, m)) {
        const { quasis: g, start: A, end: v } = p, { raw: C } = g[0].value;
        return this.skip(), this.replace(gi(C, p, n));
      }
      if (sn(p)) {
        const { value: g, start: A, end: v } = p;
        return this.skip(), this.replace(gi(g, p, n));
      }
      if (p.type === "Identifier" && kr(p.name))
        return this.skip(), this.replace({ type: "Literal", value: p.name });
    },
    leave(p, m, D, F) {
    }
  });
  const { body: a } = c;
  if (!a?.[a.length - 1]?.expression)
    throw new Error("unexpected ast format without body expression");
  if (u) {
    const { expression: p } = a[a.length - 1];
    a[a.length - 1] = {
      type: "ReturnStatement",
      argument: p
    };
  }
  const f = xi.generate(c);
  return i ? `(async ()=>{${f}})()` : f;
}
function sn(e, t, i) {
  const { raw: u, type: n } = e;
  return n !== "Literal" ? !1 : u[0] === '"';
}
function an(e, t) {
  return e.type === "TemplateLiteral" && t.type !== "TaggedTemplateExpression";
}
function gi(e, t, i) {
  let u;
  const { start: n, end: c } = t;
  if (i)
    u = [
      {
        type: "Literal",
        value: n
      },
      {
        type: "Literal",
        value: c
      }
    ];
  else {
    const {
      loc: {
        start: { line: a, column: f },
        end: { line: p, column: m }
      }
    } = t;
    u = [
      {
        type: "ArrayExpression",
        elements: [a, f, n].map((D) => ({
          type: "Literal",
          value: D
        }))
      },
      {
        type: "ArrayExpression",
        elements: [p, m, c].map((D) => ({
          type: "Literal",
          value: D
        }))
      }
    ];
  }
  return {
    type: "CallExpression",
    callee: {
      type: "MemberExpression",
      object: {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "mini"
        },
        arguments: [{ type: "Literal", value: e }],
        optional: !1
      },
      property: {
        type: "Identifier",
        name: "withMiniLocation"
      }
    },
    arguments: u,
    optional: !1
  };
}
function on({
  defaultOutput: e,
  interval: t,
  getTime: i,
  evalOnMount: u = !1,
  initialCode: n = "",
  autolink: c = !1,
  afterEval: a,
  onEvalError: f,
  onLog: p
}) {
  const [m, D] = Oe(), [F, g] = Oe(), [A, v] = Oe(n), [C, x] = Oe(A), [I, P] = Oe(), [M, y] = Oe(!1), E = A !== C, { scheduler: B, evaluate: S, start: w, stop: j, pause: T } = Ci(
    () => Zr({
      interval: t,
      onLog: p,
      defaultOutput: e,
      onSchedulerError: D,
      onEvalError: (X) => {
        g(X), f?.(X);
      },
      getTime: i,
      transpiler: nn,
      beforeEval: ({ code: X }) => {
        v(X);
      },
      afterEval: ({ pattern: X, code: ie }) => {
        x(ie), P(X), g(), D(), c && (window.location.hash = "#" + encodeURIComponent(btoa(ie))), a?.();
      },
      onToggle: (X) => y(X)
    }),
    [e, t, i]
  ), W = $e(async (X = !0) => S(A, X), [S, A]), V = ft();
  return Tt(() => {
    !V.current && u && A && (V.current = !0, W());
  }, [W, u, A]), {
    code: A,
    setCode: v,
    error: m || F,
    schedulerError: m,
    scheduler: B,
    evalError: F,
    evaluate: S,
    activateCode: W,
    activeCode: C,
    isDirty: E,
    pattern: I,
    started: M,
    start: w,
    stop: j,
    pause: T,
    togglePlay: async () => {
      M ? B.pause() : await W();
    }
  };
}
const ln = () => _r().currentTime;
function En({ tune: e, hideOutsideView: t = !1, init: i, enableKeyboard: u }) {
  const {
    code: n,
    setCode: c,
    evaluate: a,
    activateCode: f,
    error: p,
    isDirty: m,
    activeCode: D,
    pattern: F,
    started: g,
    scheduler: A,
    togglePlay: v,
    stop: C
  } = on({
    initialCode: e,
    defaultOutput: Br,
    getTime: ln
  }), [x, I] = Oe(), [P, M] = Sr({
    threshold: 0.01
  }), y = ft(), E = Ci(() => ((M || !t) && (y.current = !0), M || y.current), [M, t]);
  return Mr({
    view: x,
    pattern: F,
    active: g && !D?.includes("strudel disable-highlighting"),
    getTime: () => A.getPhase()
  }), Ai(() => {
    if (u) {
      const B = async (S) => {
        (S.ctrlKey || S.altKey) && (S.code === "Enter" ? (S.preventDefault(), Lr(x), await f()) : S.code === "Period" && (C(), S.preventDefault()));
      };
      return window.addEventListener("keydown", B, !0), () => window.removeEventListener("keydown", B, !0);
    }
  }, [u, F, n, a, C, x]), /* @__PURE__ */ he.createElement("div", {
    className: Ie.container,
    ref: P
  }, /* @__PURE__ */ he.createElement("div", {
    className: Ie.header
  }, /* @__PURE__ */ he.createElement("div", {
    className: Ie.buttons
  }, /* @__PURE__ */ he.createElement("button", {
    className: ei(Ie.button, g ? "sc-animate-pulse" : ""),
    onClick: () => v()
  }, /* @__PURE__ */ he.createElement(ti, {
    type: g ? "pause" : "play"
  })), /* @__PURE__ */ he.createElement("button", {
    className: ei(m ? Ie.button : Ie.buttonDisabled),
    onClick: () => f()
  }, /* @__PURE__ */ he.createElement(ti, {
    type: "refresh"
  }))), p && /* @__PURE__ */ he.createElement("div", {
    className: Ie.error
  }, p.message)), /* @__PURE__ */ he.createElement("div", {
    className: Ie.body
  }, E && /* @__PURE__ */ he.createElement(Rr, {
    value: n,
    onChange: c,
    onViewChanged: I
  })));
}
function Fn(e) {
  return Tt(() => (window.addEventListener("message", e), () => window.removeEventListener("message", e)), [e]), $e((t) => window.postMessage(t, "*"), []);
}
const vn = (e) => Ai(() => (window.addEventListener("keydown", e, !0), () => window.removeEventListener("keydown", e, !0)), [e]);
export {
  Rr as CodeMirror,
  En as MiniRepl,
  ei as cx,
  Lr as flash,
  Mr as useHighlighting,
  vn as useKeydown,
  Fn as usePostMessage,
  on as useStrudel
};
