<script setup lang="ts">
// The graph of a function family with sliders: the term, the table and the graph change together. The sliders are
// native range inputs (arrow keys, Home and End work; the value stands beside each); the term is announced politely
// when it changes. Its logic is in FunktionsGraph.ts. Without JavaScript the page shows the nojs text of the block.
import { computed, reactive, useId } from "vue";
import { describeGraph, fmt, generalTerm, pieces, startValues, table, term } from "./FunktionsGraph.ts";
import type { Slider } from "./FunktionsGraph.ts";

const props = defineProps<{
  /** The family of functions. */
  family: "quadratic" | "quadraticGeneral" | "power" | "reciprocal" | "root" | "exponential" | "sine";
  /** The sliders, each for one parameter. */
  regler: { key: string; label: string; min: number; max: number; step: number; start: number }[];
  /** The part of the plane shown. */
  fenster: { xmin: number; xmax: number; ymin: number; ymax: number };
  /** The x-values of the table. */
  tabelleX: number[];
  /** The parameters of the basic form, drawn dashed for comparison; none: no comparison. */
  grundform?: { key: string; value: number }[];
  /** A second curve of another family, drawn dashed with its own table column (for example linear against exponential). */
  vergleich?: {
    family: "quadratic" | "quadraticGeneral" | "power" | "reciprocal" | "root" | "exponential" | "sine" | "linear";
    werte: { key: string; value: number }[];
  };
  /** Parameters that stay fixed (no slider), for example the factor a of a trajectory. */
  fest?: { key: string; value: number }[];
  /** The x-axis is labelled in multiples of π (for the sine family). */
  piAchse?: boolean;
  /** The x-values of the table as the learner reads them (for example "π/2"), one for each of tabelleX. */
  tabelleLabels?: string[];
  /** Measured points drawn as marks (a measurement series to fit the curve to). */
  punkte?: { x: number; y: number }[];
  /** Show the term written out as ax² + bx + c below the term (for quadratic only). */
  allgemein?: boolean;
  /** The texts: the graph, the table, the reset button, the basic form and the two table headers. */
  labels: {
    graph: string;
    tabelle: string;
    reset: string;
    grundform: string;
    x: string;
    y: string;
    undefinedValue: string;
    allgemein?: string;
    vergleichY?: string;
    vergleichTerm?: string;
    punkte?: string;
    eigene?: string;
  };
}>();

const emit = defineEmits<{ change: [Record<string, number>] }>();
const uid = useId();
const fixedValues = () => Object.fromEntries((props.fest ?? []).map((f) => [f.key, f.value]));
const values = reactive({ ...fixedValues(), ...startValues(props.regler) });
const base = computed(() => ({
  ...fixedValues(),
  ...Object.fromEntries((props.grundform ?? []).map((g) => [g.key, g.value])),
}));

const W = 340;
const H = 250;
const left = 34;
const bottom = 26;
const top = 10;
const right = 10;
const sx = (x: number) =>
  left + ((x - props.fenster.xmin) / (props.fenster.xmax - props.fenster.xmin)) * (W - left - right);
const sy = (y: number) =>
  H - bottom - ((y - props.fenster.ymin) / (props.fenster.ymax - props.fenster.ymin)) * (H - bottom - top);

const ticks = (min: number, max: number) => {
  const range = max - min;
  let step = 1;
  if (range > 30) {
    // a round step (1, 2 or 5 times a power of ten) that gives about six marks
    const raw = range / 6;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    const ratio = raw / magnitude;
    step = magnitude * (ratio <= 1 ? 1 : ratio <= 2 ? 2 : ratio <= 5 ? 5 : 10);
  } else if (range > 14) {
    step = 2;
  }
  const out: number[] = [];
  for (let t = Math.ceil(min / step) * step; t <= max + 1e-9; t += step) out.push(Math.round(t * 1000) / 1000);
  return out;
};
const piTicks = computed(() => {
  const out: number[] = [];
  for (let k = Math.ceil(props.fenster.xmin / (Math.PI / 2)); k * (Math.PI / 2) <= props.fenster.xmax + 1e-9; k++) {
    out.push(k * (Math.PI / 2));
  }
  return out;
});
const piText = (t: number) => {
  const k = Math.round(t / (Math.PI / 2));
  if (k === 0) return "0";
  const num = Math.abs(k) % 2 === 0 ? Math.abs(k) / 2 : Math.abs(k);
  const den = Math.abs(k) % 2 === 0 ? 1 : 2;
  const top = num === 1 ? "π" : `${num}π`;
  return `${k < 0 ? "−" : ""}${den === 1 ? top : `${top}/${den}`}`;
};
const xticks = computed(() => (props.piAchse ? piTicks.value : ticks(props.fenster.xmin, props.fenster.xmax)));
const yticks = computed(() => ticks(props.fenster.ymin, props.fenster.ymax));

const path = (ps: [number, number][][]) =>
  ps
    .map((p) =>
      p
        .map(
          ([x, y], i) =>
            `${i ? "L" : "M"}${sx(x).toFixed(1)} ${Math.max(top - 20, Math.min(H - bottom + 20, sy(y))).toFixed(1)}`,
        )
        .join(" "),
    )
    .join(" ");

const curve = computed(() => path(pieces(props.family, { ...values }, props.fenster)));
const compareValues = computed(() => Object.fromEntries((props.vergleich?.werte ?? []).map((g) => [g.key, g.value])));
const baseCurve = computed(() => {
  if (props.vergleich) return path(pieces(props.vergleich.family, compareValues.value, props.fenster));
  return props.grundform?.length ? path(pieces(props.family, base.value, props.fenster)) : "";
});
const compareTerm = computed(() => (props.vergleich ? term(props.vergleich.family, compareValues.value) : ""));
const compareRows = computed(() =>
  props.vergleich ? table(props.vergleich.family, compareValues.value, props.tabelleX) : [],
);
const termText = computed(() => term(props.family, { ...values }));
const generalText = computed(() => generalTerm({ ...values }));
const rows = computed(() => table(props.family, { ...values }, props.tabelleX));
const alt = computed(() => {
  const own = describeGraph(props.family, { ...values }, props.fenster);
  // the dashed curve in words too, for those who cannot see it (only in the text alternative, not on the page)
  if (props.vergleich) return `${own} ${props.labels.grundform}: ${compareTerm.value}.`;
  return props.grundform?.length
    ? `${own} ${props.labels.grundform}: ${describeGraph(props.family, base.value, props.fenster)}`
    : own;
});
const pointsText = computed(() => (props.punkte ?? []).map((pt) => `(${fmt(pt.x)} | ${fmt(pt.y)})`).join(", "));
const clipId = `clip-${uid}`;

function reset(): void {
  Object.assign(values, fixedValues(), startValues(props.regler));
  emit("change", { ...values });
}
/** A table value: two decimals for amounts of 100 and more (money), else as fmt. */
const cell = (n: number) => {
  const text = fmt(n);
  return Math.abs(n) >= 100 && /,\d$/.test(text) ? `${text}0` : text;
};
const inputValue = (s: Slider) => values[s.key] ?? s.start;
function set(s: Slider, event: Event): void {
  values[s.key] = Number((event.target as HTMLInputElement).value);
  emit("change", { ...values });
}
</script>

<template>
  <div class="fg">
    <p class="fg-term" aria-live="polite">{{ termText }}</p>
    <p v-if="allgemein" class="fg-general" aria-live="polite">{{ labels.allgemein ?? "" }} {{ generalText }}</p>
    <div class="fg-view">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        role="img"
        :aria-label="`${labels.graph}: ${alt}${pointsText ? ` ${labels.punkte ?? ''}: ${pointsText}.` : ''}`"
        class="fg-svg"
      >
        <defs>
          <clipPath :id="clipId">
            <rect :x="left" :y="top" :width="W - left - right" :height="H - bottom - top" />
          </clipPath>
        </defs>
        <g class="fg-grid">
          <line v-for="t in xticks" :key="`gx${t}`" :x1="sx(t)" :x2="sx(t)" :y1="top" :y2="H - bottom" />
          <line v-for="t in yticks" :key="`gy${t}`" :x1="left" :x2="W - right" :y1="sy(t)" :y2="sy(t)" />
        </g>
        <g class="fg-axes">
          <line v-if="fenster.ymin <= 0 && fenster.ymax >= 0" :x1="left" :x2="W - right" :y1="sy(0)" :y2="sy(0)" />
          <line v-if="fenster.xmin <= 0 && fenster.xmax >= 0" :x1="sx(0)" :x2="sx(0)" :y1="top" :y2="H - bottom" />
        </g>
        <g class="fg-labels">
          <text v-for="t in xticks" :key="`tx${t}`" :x="sx(t)" :y="H - bottom + 14" text-anchor="middle">
            {{ piAchse ? piText(t) : fmt(t) }}
          </text>
          <text v-for="t in yticks" :key="`ty${t}`" :x="left - 4" :y="sy(t) + 4" text-anchor="end">{{ fmt(t) }}</text>
          <text :x="W - right" :y="H - bottom - 4" text-anchor="end"><tspan font-style="italic">x</tspan></text>
          <text :x="left + 4" :y="top + 10">f(x)</text>
        </g>
        <g :clip-path="`url(#${clipId})`">
          <path v-if="baseCurve" :d="baseCurve" class="fg-base" />
          <path :d="curve" class="fg-curve" />
        </g>
        <g v-if="punkte?.length" class="fg-points">
          <rect
            v-for="(pt, i) in punkte"
            :key="i"
            :x="sx(pt.x) - 3.5"
            :y="sy(pt.y) - 3.5"
            width="7"
            height="7"
            :transform="`rotate(45 ${sx(pt.x)} ${sy(pt.y)})`"
          />
        </g>
      </svg>
      <table class="fg-table">
        <caption>
          {{
            labels.tabelle
          }}
        </caption>
        <thead>
          <tr>
            <th scope="col">{{ labels.x }}</th>
            <th scope="col">{{ labels.y }}</th>
            <th v-if="vergleich" scope="col">{{ labels.vergleichY ?? "" }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rows" :key="r.x">
            <td>{{ tabelleLabels?.[i] ?? fmt(r.x) }}</td>
            <td>{{ r.y === undefined ? labels.undefinedValue : cell(r.y) }}</td>
            <td v-if="vergleich">
              {{ compareRows[i]?.y === undefined ? labels.undefinedValue : cell(compareRows[i]?.y ?? 0) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="baseCurve" class="fg-legend">
      <svg width="34" height="8" aria-hidden="true"><line x1="0" x2="34" y1="4" y2="4" class="fg-base" /></svg>
      {{ labels.grundform }}
    </p>
    <p v-if="vergleich && labels.eigene" class="fg-legend">
      <svg width="34" height="8" aria-hidden="true"><line x1="0" x2="34" y1="4" y2="4" class="fg-curve" /></svg>
      {{ labels.eigene }}
    </p>
    <div class="fg-sliders">
      <label v-for="s in regler" :key="s.key" class="fg-slider">
        <span class="fg-slider-label">{{ s.label }}</span>
        <input
          type="range"
          :min="s.min"
          :max="s.max"
          :step="s.step"
          :value="inputValue(s)"
          :aria-valuetext="fmt(inputValue(s))"
          @input="set(s, $event)"
        />
        <output class="fg-slider-value">{{ fmt(inputValue(s)) }}</output>
      </label>
    </div>
    <button type="button" class="fg-reset" @click="reset">{{ labels.reset }}</button>
  </div>
</template>

<style scoped>
.fg {
  margin: 1rem 0;
  max-width: 100%;
  min-width: 0;
}

.fg-term {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.fg-general {
  margin: 0 0 0.5rem;
  overflow-wrap: anywhere;
}

.fg-view {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-start;
}

.fg-svg {
  flex: 1 1 18rem;
  min-width: 0;
  max-width: 28rem;
  width: 100%;
  height: auto;
  border: 1px solid var(--page-border);
  background: var(--page-surface);
}

.fg-grid line {
  stroke: var(--page-border);
  stroke-width: 0.5;
}

.fg-axes line {
  stroke: var(--page-text);
  stroke-width: 1.2;
}

.fg-labels text {
  fill: var(--page-muted);
  font-size: 10px;
}

.fg-curve {
  fill: none;
  stroke: var(--page-accent);
  stroke-width: 2.5;
}

.fg-points rect {
  fill: var(--page-surface);
  stroke: var(--page-text);
  stroke-width: 1.8;
}

.fg-base {
  fill: none;
  stroke: var(--page-muted);
  stroke-width: 1.5;
  stroke-dasharray: 5 4;
}

.fg-table {
  flex: 0 1 9rem;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.fg-table caption {
  text-align: left;
  font-size: 0.9rem;
  color: var(--page-muted);
  padding-bottom: 0.25rem;
}

.fg-table th,
.fg-table td {
  border: 1px solid var(--page-border);
  padding: 0.2rem 0.6rem;
  text-align: right;
}

.fg-legend {
  margin: 0.4rem 0 0;
  font-size: 0.9rem;
  color: var(--page-muted);
}

.fg-sliders {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.fg-slider {
  display: grid;
  grid-template-columns: minmax(7rem, 11rem) minmax(0, 1fr) 3.5rem;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
}

.fg-slider input {
  width: 100%;
  min-width: 0;
  height: 2rem;
}

.fg-slider-value {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  text-align: right;
}

.fg-reset {
  margin-top: 0.5rem;
  min-height: 44px;
  padding: 0.4rem 1rem;
}

@media (max-width: 30rem) {
  .fg-slider {
    grid-template-columns: minmax(0, 1fr) 3.5rem;
  }

  .fg-slider-label {
    grid-column: 1 / -1;
  }

  .fg-slider input {
    grid-column: 1;
  }
}
</style>
