// The logic of FunktionsGraph.vue and FunktionsGraphAufgabe.vue: the function families, their terms in words, and the
// numbers of a graph. Pure functions, no browser. A family is a function of x with parameters; the sliders of a block
// change the parameters, the term, the table and the graph follow.

/** The families of the app. quadratic: a(x−d)²+e; quadraticGeneral: ax²+bx+c; power: a(x−d)^n+e; reciprocal:
 *  a/(x−d)+e; root: a√(x−d)+e; exponential: a·b^x; sine: a·sin(b·x). */
export type Family = "quadratic" | "quadraticGeneral" | "power" | "reciprocal" | "root" | "exponential" | "sine";

/** The values of the parameters by name (a, b, c, d, e, n). */
export type Values = Record<string, number>;

/** A slider: the parameter it sets, its label for the learner, its range, step and start value. */
export interface Slider {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  start: number;
}

/** The part of the plane the graph shows. */
export interface Window {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

/** The value of the family at x, or undefined where it is not defined. */
export function value(family: Family, v: Values, x: number): number | undefined {
  const a = v["a"] ?? 1;
  const b = v["b"] ?? 0;
  const c = v["c"] ?? 0;
  const d = v["d"] ?? 0;
  const e = v["e"] ?? 0;
  const n = v["n"] ?? 2;
  let y: number | undefined;
  switch (family) {
    case "quadratic":
      y = a * (x - d) ** 2 + e;
      break;
    case "quadraticGeneral":
      y = a * x * x + b * x + c;
      break;
    case "power":
      y = a * (x - d) ** n + e;
      break;
    case "reciprocal":
      y = Math.abs(x - d) < 1e-9 ? undefined : a / (x - d) + e;
      break;
    case "root":
      y = x - d < 0 ? undefined : a * Math.sqrt(x - d) + e;
      break;
    case "exponential":
      y = a * (v["b"] ?? 2) ** x;
      break;
    case "sine":
      y = a * Math.sin((v["b"] ?? 1) * x);
      break;
  }
  return y !== undefined && Number.isFinite(y) ? y : undefined;
}

/** A number as a learner reads it: decimal comma, true minus sign, at most two decimals. */
export function fmt(n: number): string {
  const r = Math.round(n * 100) / 100;
  const text = String(Object.is(r, -0) ? 0 : r).replace(".", ",");
  return text.replace("-", "−");
}

/** The sign and size of a term: "+ 2", "− 2,5", for a number after another term. */
const signed = (n: number) => (n < 0 ? `− ${fmt(-n)}` : `+ ${fmt(n)}`);

/** The factor in front: nothing for 1, a minus for −1, else the number and a dot. */
const factor = (a: number) => (a === 1 ? "" : a === -1 ? "−" : `${fmt(a)} · `);

/** The bracket (x − d) written as a learner reads it: x for d = 0, (x − 2) for d = 2, (x + 2) for d = −2. */
const shifted = (d: number) => (d === 0 ? "x" : `(x ${d < 0 ? "+" : "−"} ${fmt(Math.abs(d))})`);

/** The term of the family with the values of the sliders, as text (decimal comma, true minus sign). */
export function term(family: Family, v: Values): string {
  const a = v["a"] ?? 1;
  const d = v["d"] ?? 0;
  const e = v["e"] ?? 0;
  const tail = e === 0 ? "" : ` ${signed(e)}`;
  switch (family) {
    case "quadratic":
      return `f(x) = ${factor(a)}${shifted(d)}²${tail}`;
    case "quadraticGeneral": {
      const b = v["b"] ?? 0;
      const c = v["c"] ?? 0;
      const parts = [`${factor(a)}x²`];
      if (b !== 0) parts.push(`${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : `${fmt(Math.abs(b))} · `}x`);
      if (c !== 0) parts.push(signed(c));
      return `f(x) = ${parts.join(" ")}`;
    }
    case "power":
      return `f(x) = ${factor(a)}${shifted(d)}${superscript(v["n"] ?? 2)}${tail}`;
    case "reciprocal":
      return `f(x) = ${fmt(a)} : ${shifted(d)}${tail}`;
    case "root":
      return `f(x) = ${factor(a)}√${shifted(d)}${tail}`;
    case "exponential":
      return `f(x) = ${a === 1 ? "" : `${fmt(a)} · `}${fmt(v["b"] ?? 2)}^x`;
    case "sine":
      return `f(x) = ${factor(a)}sin(${(v["b"] ?? 1) === 1 ? "x" : `${fmt(v["b"] ?? 1)} · x`})`;
  }
}

const SUPER: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};
/** A whole number as a superscript. */
function superscript(n: number): string {
  return String(n)
    .split("")
    .map((c) => SUPER[c] ?? c)
    .join("");
}

/** The table: the x-values of the block and the function values (undefined where not defined). */
export function table(family: Family, v: Values, xs: readonly number[]): { x: number; y: number | undefined }[] {
  return xs.map((x) => ({ x, y: value(family, v, x) }));
}

/** Pieces of the curve in the window, each a list of points [x, y], broken where the function is undefined or leaves
 *  the window far (a pole of the reciprocal function). */
export function pieces(family: Family, v: Values, w: Window, steps = 240): [number, number][][] {
  const out: [number, number][][] = [];
  let current: [number, number][] = [];
  const span = w.ymax - w.ymin;
  let last: number | undefined;
  for (let i = 0; i <= steps; i++) {
    const x = w.xmin + ((w.xmax - w.xmin) * i) / steps;
    const y = value(family, v, x);
    const outside = y === undefined || y > w.ymax + span || y < w.ymin - span;
    const jump = last !== undefined && y !== undefined && Math.abs(y - last) > span * 2;
    if (outside || jump) {
      if (current.length > 1) out.push(current);
      current = [];
      if (!outside && y !== undefined) current.push([x, y]);
    } else if (y !== undefined) {
      current.push([x, y]);
    }
    last = y;
  }
  if (current.length > 1) out.push(current);
  return out;
}

/** The text alternative of the graph: the term and three values. */
export function describeGraph(family: Family, v: Values, w: Window): string {
  const xs = [w.xmin, (w.xmin + w.xmax) / 2, w.xmax].map((x) => Math.round(x));
  const points = xs
    .map((x) => {
      const y = value(family, v, x);
      return y === undefined ? `bei x = ${fmt(x)} nicht definiert` : `bei x = ${fmt(x)} ist f(x) = ${fmt(y)}`;
    })
    .join("; ");
  const shape =
    family === "quadratic"
      ? ` Scheitel bei (${fmt(v["d"] ?? 0)} | ${fmt(v["e"] ?? 0)}), nach ${(v["a"] ?? 1) < 0 ? "unten" : "oben"} geöffnet, Faktor a = ${fmt(v["a"] ?? 1)}.`
      : "";
  return `${term(family, v)}.${shape} ${points}.`;
}

/** The values of the sliders at their start. */
export function startValues(sliders: readonly Slider[]): Values {
  return Object.fromEntries(sliders.map((s) => [s.key, s.start]));
}

/** The term of a quadratic function in Scheitelform written as ax² + bx + c: b = −2ad, c = ad² + e. */
export function generalTerm(v: Values): string {
  const a = v["a"] ?? 1;
  const d = v["d"] ?? 0;
  const e = v["e"] ?? 0;
  return term("quadraticGeneral", { a, b: -2 * a * d, c: a * d * d + e });
}
