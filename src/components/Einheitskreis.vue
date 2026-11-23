<script setup lang="ts">
// A point runs on the unit circle (a Ferris wheel); its height (sine) or its distance from the vertical axis (cosine)
// is drawn as a graph beside it. The slider turns the point in steps of 15°; the angle is shown in degrees and in
// radians. Its logic is in Einheitskreis.ts. Without JavaScript the page shows the nojs text of the block.
import { computed, ref } from "vue";
import { describe, fmt, piLabel, point, radians } from "./Einheitskreis.ts";

const props = defineProps<{
  /** Which function the graph beside the circle shows. */
  funktion: "sin" | "cos";
  /** The texts: the angle, the value, the circle, the graph, the slider and the unit. */
  labels: { winkel: string; wert: string; kreis: string; graph: string; regler: string; einheit: string };
}>();

const degrees = ref(30);
const p = computed(() => point(degrees.value));
const value = computed(() => (props.funktion === "sin" ? p.value.y : p.value.x));
const alt = computed(() => describe(degrees.value, props.funktion));

// the circle: centre (70, 75), radius 55
const cx = 70;
const cy = 75;
const r = 55;
const px = computed(() => cx + r * p.value.x);
const py = computed(() => cy - r * p.value.y);
// the graph: x from 0 to 2π over 160 px, y from −1 to 1 over 110 px, origin at (165, 75)
const gx0 = 165;
const gw = 160;
const gx = (t: number) => gx0 + (t / (2 * Math.PI)) * gw;
const gy = (v: number) => 75 - v * 55;
const curve = computed(() => {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * 2 * Math.PI;
    const v = props.funktion === "sin" ? Math.sin(t) : Math.cos(t);
    pts.push(`${i ? "L" : "M"}${gx(t).toFixed(1)} ${gy(v).toFixed(1)}`);
  }
  return pts.join(" ");
});
const tx = computed(() => gx(radians(degrees.value)));
const ty = computed(() => gy(value.value));
const marks = [0, 90, 180, 270, 360];
</script>

<template>
  <div class="ek">
    <svg viewBox="0 0 340 150" role="img" :aria-label="`${labels.kreis}, ${labels.graph}: ${alt}`" class="ek-svg">
      <g class="ek-axes">
        <line :x1="cx - 62" :x2="cx + 62" :y1="cy" :y2="cy" />
        <line :x1="cx" :x2="cx" :y1="cy - 62" :y2="cy + 62" />
        <line :x1="gx0" :x2="gx0 + gw + 6" :y1="75" :y2="75" />
        <line :x1="gx0" :x2="gx0" :y1="12" :y2="138" />
      </g>
      <circle :cx="cx" :cy="cy" :r="r" class="ek-circle" />
      <line :x1="cx" :y1="cy" :x2="px" :y2="py" class="ek-radius" />
      <!-- sine: the height; cosine: the distance from the vertical axis -->
      <line v-if="funktion === 'sin'" :x1="px" :x2="px" :y1="cy" :y2="py" class="ek-proj" />
      <line v-else :x1="cx" :x2="px" :y1="cy" :y2="cy" class="ek-proj" />
      <line v-if="funktion === 'sin'" :x1="px" :x2="tx" :y1="py" :y2="ty" class="ek-link" />
      <circle :cx="px" :cy="py" r="5" class="ek-point" />
      <path :d="curve" class="ek-curve" />
      <circle :cx="tx" :cy="ty" r="5" class="ek-point" />
      <g class="ek-labels">
        <text v-for="m in marks" :key="m" :x="gx(radians(m))" y="148" text-anchor="middle">{{ piLabel(m) }}</text>
        <text :x="gx0 - 4" y="22" text-anchor="end">1</text>
        <text :x="gx0 - 4" y="132" text-anchor="end">−1</text>
      </g>
    </svg>
    <p class="ek-read" aria-live="polite">
      {{ labels.winkel }}: <strong>{{ degrees }}{{ labels.einheit }}</strong> = <strong>{{ piLabel(degrees) }}</strong
      >. {{ labels.wert }}: <strong>{{ fmt(value) }}</strong>
    </p>
    <label class="ek-slider">
      <span>{{ labels.regler }}</span>
      <input
        v-model.number="degrees"
        type="range"
        min="0"
        max="360"
        step="15"
        :aria-valuetext="`${degrees}${labels.einheit}`"
      />
    </label>
  </div>
</template>

<style scoped>
.ek {
  margin: 1rem 0;
  max-width: 100%;
  min-width: 0;
}

.ek-svg {
  width: 100%;
  max-width: 30rem;
  height: auto;
  border: 1px solid var(--page-border);
  background: var(--page-surface);
}

.ek-axes line {
  stroke: var(--page-muted);
  stroke-width: 1;
}

.ek-circle {
  fill: none;
  stroke: var(--page-text);
  stroke-width: 1.5;
}

.ek-radius {
  stroke: var(--page-accent);
  stroke-width: 2;
}

.ek-proj {
  stroke: var(--page-accent);
  stroke-width: 3;
}

.ek-link {
  stroke: var(--page-muted);
  stroke-width: 1;
  stroke-dasharray: 4 3;
}

.ek-curve {
  fill: none;
  stroke: var(--page-accent);
  stroke-width: 2.5;
}

.ek-point {
  fill: var(--page-accent);
  stroke: var(--page-surface);
  stroke-width: 1.5;
}

.ek-labels text {
  fill: var(--page-muted);
  font-size: 11px;
}

.ek-read {
  margin: 0.5rem 0;
}

.ek-slider {
  display: grid;
  grid-template-columns: minmax(7rem, 11rem) minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
}

.ek-slider input {
  width: 100%;
  min-width: 0;
  height: 2rem;
}

@media (max-width: 30rem) {
  .ek-slider {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
