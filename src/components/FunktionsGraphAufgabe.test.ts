import { expect, test } from "vite-plus/test";
import {
  about,
  check,
  describe,
  generate,
  mistakes,
  params,
  reason,
  show,
  solution,
  wrong,
} from "./FunktionsGraphAufgabe.ts";

const props = {
  task: "Stelle die Regler so ein, dass deine Parabel auf der gestrichelten liegt.",
  mistakes: ["Vorzeichen von d.", "Vorzeichen von e.", "Vorzeichen von a."],
  hints: ["Prüfe a.", "Prüfe d.", "Prüfe e."],
};

test("the target is right; each sign mistake is wrong and distinct", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(task.d).not.toBe(0);
    expect(task.e).not.toBe(0);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    const wrongs = mistakes(task);
    for (const answer of wrongs) if (answer) expect(check(task, answer)).toBe(false);
    expect(new Set(wrongs.map((m) => JSON.stringify(m))).size).toBe(3);
    expect(Object.keys(params(task, props, "de"))).toEqual(["a", "d", "e"]);
  }
  expect(about.mistakes.length).toBe(mistakes(generate(1)).length);
});

test("each typical mistake gets its message; another wrong answer none", () => {
  const task = { a: 2, d: 3, e: -1 };
  expect(reason(task, { a: 2, d: -3, e: -1 }, props)).toBe("Vorzeichen von d.");
  expect(reason(task, { a: 2, d: 3, e: 1 }, props)).toBe("Vorzeichen von e.");
  expect(reason(task, { a: -2, d: 3, e: -1 }, props)).toBe("Vorzeichen von a.");
  expect(reason(task, { a: 1, d: 0, e: 0 }, props)).toBe("Prüfe a. Prüfe d. Prüfe e.");
  expect(reason(task, { a: 2, d: 3, e: 0 }, props)).toBe("Prüfe e.");
  expect(reason(task, { a: 2, d: 3, e: -1 }, { task: "t" })).toBeUndefined();
});

test("describe states the target; show writes the numbers with a true minus", () => {
  const task = { a: 0.5, d: -2, e: 1 };
  expect(describe(task, props, "de").solution).toBe("a = 0,5, d = −2, e = 1");
  expect(show({ a: 1, d: 2, e: -3 })).toBe("a = 1, d = 2, e = −3");
});
