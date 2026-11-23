import { expect, test } from "vite-plus/test";
import { describeGraph, fmt, pieces, startValues, table, term, value } from "./FunktionsGraph.ts";

test("the numbers are written with comma and true minus", () => {
  expect(fmt(2.5)).toBe("2,5");
  expect(fmt(-3)).toBe("−3");
  expect(fmt(-0.001)).toBe("0");
});

test("the quadratic family: shifted, stretched, mirrored", () => {
  expect(value("quadratic", { a: 1, d: 0, e: 0 }, 3)).toBe(9);
  expect(value("quadratic", { a: 1, d: 2, e: 0 }, 2)).toBe(0);
  expect(value("quadratic", { a: 2, d: 0, e: 1 }, 2)).toBe(9);
  expect(value("quadratic", { a: -1, d: 0, e: 0 }, 2)).toBe(-4);
});

test("the term follows the sliders", () => {
  expect(term("quadratic", { a: 1, d: 0, e: 0 })).toBe("f(x) = x²");
  expect(term("quadratic", { a: 1, d: 2, e: 0 })).toBe("f(x) = (x − 2)²");
  expect(term("quadratic", { a: 1, d: -2, e: 0 })).toBe("f(x) = (x + 2)²");
  expect(term("quadratic", { a: -2, d: 1, e: -1.5 })).toBe("f(x) = −2 · (x − 1)² − 1,5");
  expect(term("quadratic", { a: -1, d: 0, e: 3 })).toBe("f(x) = −x² + 3");
  expect(term("quadraticGeneral", { a: 1, b: -4, c: 3 })).toBe("f(x) = x² − 4 · x + 3");
});

test("the other families are undefined where they must be", () => {
  expect(value("reciprocal", { a: 1, d: 0, e: 0 }, 0)).toBeUndefined();
  expect(value("root", { a: 1, d: 0, e: 0 }, -1)).toBeUndefined();
  expect(value("root", { a: 1, d: 0, e: 0 }, 4)).toBe(2);
  expect(value("power", { a: 1, d: 0, e: 0, n: 3 }, -2)).toBe(-8);
  expect(value("exponential", { a: 100, b: 1.05 }, 2)).toBeCloseTo(110.25);
  expect(value("sine", { a: 2, b: 1 }, Math.PI / 2)).toBeCloseTo(2);
});

test("the table and the text alternative", () => {
  const rows = table("quadratic", { a: 1, d: 0, e: 0 }, [-1, 0, 1]);
  expect(rows).toEqual([
    { x: -1, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ]);
  const w = { xmin: -4, xmax: 4, ymin: -2, ymax: 10 };
  expect(describeGraph("quadratic", { a: 1, d: 0, e: 0 }, w)).toBe(
    "f(x) = x². Scheitel bei (0 | 0), nach oben geöffnet, Faktor a = 1. bei x = −4 ist f(x) = 16; bei x = 0 ist f(x) = 0; bei x = 4 ist f(x) = 16.",
  );
  expect(startValues([{ key: "a", label: "a", min: -3, max: 3, step: 0.5, start: 1 }])).toEqual({ a: 1 });
});

test("the reciprocal curve breaks at the pole", () => {
  const w = { xmin: -4, xmax: 4, ymin: -6, ymax: 6 };
  expect(pieces("reciprocal", { a: 1, d: 0, e: 0 }, w).length).toBeGreaterThanOrEqual(2);
  expect(pieces("quadratic", { a: 1, d: 0, e: 0 }, w).length).toBe(1);
});
