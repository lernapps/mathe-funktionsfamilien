// Logic of the short self-test on a recap page: a question with options, immediate feedback, no "Prüfen" and no
// score. It is not an exercise of the app, it only shows learners whether they can do it. Pure functions.
export type Option = { text: string; correct: boolean; info: string };

/** The feedback for the chosen option: whether it is right and the text to show. */
export function feedback(
  options: Option[],
  index: number,
  right: string,
  wrong: string,
): { right: boolean; text: string } {
  const chosen = options[index];
  if (!chosen) return { right: false, text: "" };
  return { right: chosen.correct, text: `${chosen.correct ? right : wrong} ${chosen.info}` };
}

/** Whether exactly one option is right (a test with none or two right options is a content mistake). */
export function isValid(options: Option[]): boolean {
  return options.filter((o) => o.correct).length === 1;
}

/** A fixed shuffle of the options, the same on the server and in the browser: the right option is not always first.
 *  The seed comes from the question text. Returns the options with their original index. */
export function shuffled<T>(options: T[], seed: number): { option: T; index: number }[] {
  const items = options.map((option, index) => ({ option, index }));
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [items[i], items[j]] = [items[j] as { option: T; index: number }, items[i] as { option: T; index: number }];
  }
  return items;
}
