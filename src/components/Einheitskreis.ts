// The logic of Einheitskreis.vue: a point runs on the unit circle (a Ferris wheel of radius 1); its height is sin t and
// its distance from the vertical axis is cos t. Pure functions, no browser.

/** The point of the unit circle for an angle in degrees: x = cos t, y = sin t. */
export function point(degrees: number): { x: number; y: number } {
  const t = (degrees * Math.PI) / 180;
  return { x: Math.cos(t), y: Math.sin(t) };
}

/** The angle in radians. */
export const radians = (degrees: number) => (degrees * Math.PI) / 180;

/** A number as a learner reads it: decimal comma, true minus sign, at most two decimals. */
export function fmt(n: number): string {
  const r = Math.round(n * 100) / 100;
  return String(Object.is(r, -0) ? 0 : r)
    .replace(".", ",")
    .replace("-", "−");
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** The angle in radians as a multiple of π, written as a fraction: 90° is "π/2", 180° is "π", 0° is "0". Whole
 *  degrees only; angles that are no multiple of 15° give the decimal value of the radians. */
export function piLabel(degrees: number): string {
  if (degrees === 0) return "0";
  if (degrees % 15 !== 0) return fmt(radians(degrees));
  const g = gcd(Math.abs(degrees), 180);
  const num = degrees / g;
  const den = 180 / g;
  const top = num === 1 ? "π" : `${num}π`;
  return den === 1 ? top : `${top}/${den}`;
}

/** The text alternative of the whole picture for an angle. */
export function describe(degrees: number, which: "sin" | "cos"): string {
  const p = point(degrees);
  const value = which === "sin" ? p.y : p.x;
  return `Winkel ${degrees}°, im Bogenmaß ${piLabel(degrees)}. Der Punkt auf dem Einheitskreis liegt bei (${fmt(p.x)} | ${fmt(p.y)}). ${which === "sin" ? "Sinus (Höhe)" : "Kosinus (Abstand von der senkrechten Achse)"} ${fmt(value)}.`;
}
