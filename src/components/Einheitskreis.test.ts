import { expect, test } from "vite-plus/test";
import { describe as describeAngle, fmt, piLabel, point, radians } from "./Einheitskreis.ts";

test("the point on the unit circle", () => {
  expect(point(0)).toEqual({ x: 1, y: 0 });
  expect(point(90).y).toBeCloseTo(1);
  expect(point(90).x).toBeCloseTo(0);
  expect(point(210).y).toBeCloseTo(-0.5);
  expect(point(60).x).toBeCloseTo(0.5);
});

test("angles as multiples of pi", () => {
  expect(piLabel(0)).toBe("0");
  expect(piLabel(30)).toBe("π/6");
  expect(piLabel(90)).toBe("π/2");
  expect(piLabel(180)).toBe("π");
  expect(piLabel(270)).toBe("3π/2");
  expect(piLabel(360)).toBe("2π");
  expect(piLabel(45)).toBe("π/4");
  expect(radians(180)).toBeCloseTo(Math.PI);
});

test("numbers with comma and true minus; the text alternative", () => {
  expect(fmt(-0.5)).toBe("−0,5");
  expect(describeAngle(90, "sin")).toContain("im Bogenmaß π/2");
  expect(describeAngle(90, "sin")).toContain("Sinus (Höhe) 1");
});
