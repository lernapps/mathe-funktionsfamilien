// The logic of FunktionsGraphAufgabe.vue: a target parabola f(x) = a·(x − d)² + e is drawn dashed; the learner sets the
// sliders a, d and e until their parabola lies on it. A task is the target (a, d, e); an answer is the three values of
// the sliders. Pure functions, which the build tests over fixed seeds (the exercise contract).

/** The props the logic needs: the task text and the app's message for each typical mistake. */
export interface Props {
  task: string;
  mistakes?: readonly string[];
}

export interface Task {
  a: number;
  d: number;
  e: number;
}

/** The values of the three sliders. */
export type Answer = Task;

/** A small seeded random generator (mulberry32). */
function random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FACTORS = [-2, -1, -0.5, 0.5, 1, 2];
const SHIFTS = [-3, -2, -1, 1, 2, 3];
const HEIGHTS = [-3, -2, -1, 1, 2, 3];

/** The task of `seed`: d and e are never 0, so that each sign mistake gives another answer. */
export function generate(seed: number, _props?: Props): Task {
  const next = random(seed);
  const pick = (xs: number[]) => xs[Math.floor(next() * xs.length)] ?? xs[0] ?? 1;
  return { a: pick(FACTORS), d: pick(SHIFTS), e: pick(HEIGHTS) };
}

/** Whether the sliders give the target parabola. */
export function check(task: Task, answer: Answer): boolean {
  return answer.a === task.a && answer.d === task.d && answer.e === task.e;
}

/** The right answer: the target. */
export function solution(task: Task): Answer {
  return { ...task };
}

/** A wrong answer: the shift to the other side. */
export function wrong(task: Task): Answer {
  return { ...task, d: -task.d };
}

/** The answer of each typical mistake of about.mistakes: d with the wrong sign, e with the wrong sign, a with the wrong sign. */
export function mistakes(task: Task): (Answer | undefined)[] {
  return [wrong(task), { ...task, e: -task.e }, { ...task, a: -task.a }];
}

/** The app's message for a wrong answer, from the props: that of its typical mistake, or none. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = mistakes(task).findIndex((m) => m !== undefined && check(m, answer));
  return index < 0 ? undefined : props.mistakes?.[index];
}

const number = (n: number) => String(n).replace(".", ",").replace("-", "−");

/** An answer as text. */
export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return `a = ${number(answer.a)}, d = ${number(answer.d)}, e = ${number(answer.e)}`;
}

/** The task as a learner sees it, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return {
    task: `${props.task} Die gestrichelte Zielparabel hat den Scheitel (${number(task.d)} | ${number(task.e)}) und den Faktor a = ${number(task.a)}.`,
    solution: show(solution(task)),
  };
}

/** The task as a learner reads it: the prop task. */
export function template(props: Props, _lang: string): string {
  return props.task;
}

/** What sets a task: the target values. */
export function params(task: Task, _props: Props, _lang: string): Record<string, number> {
  return { a: task.a, d: task.d, e: task.e };
}

/** What the exercise is, for a tutor. */
export const about = {
  task: "Eine gestrichelte Zielparabel f(x) = a · (x − d)² + e ist gezeichnet. Das Kind stellt die drei Regler a, d und e so ein, dass seine Parabel genau auf der gestrichelten liegt, und drückt „Prüfen“.",
  answer: "Die drei Reglerwerte a, d und e.",
  correct: "Richtig, wenn a, d und e genau die Werte der Zielparabel sind.",
  mistakes: [
    "d mit falschem Vorzeichen: nach links statt nach rechts verschoben (oder umgekehrt), weil (x − d) für ein positives d nach rechts verschiebt.",
    "e mit falschem Vorzeichen: nach oben statt nach unten verschoben.",
    "a mit falschem Vorzeichen: die Parabel ist nach der falschen Seite geöffnet (gespiegelt).",
  ],
};
