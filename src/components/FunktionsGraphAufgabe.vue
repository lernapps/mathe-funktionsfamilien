<script setup lang="ts">
// Exercise: a dashed target parabola is drawn; the learner sets the sliders a, d and e until their parabola lies on it.
// The component is only the input: it emits the three slider values; the explainer draws "Prüfen", checks the answer
// (FunktionsGraphAufgabe.ts) and gives the message of a typical mistake. The graph is FunktionsGraph.vue.
import { computed } from "vue";
import FunktionsGraph from "./FunktionsGraph.vue";
import { generate } from "./FunktionsGraphAufgabe.ts";

const props = defineProps<{
  /** The task text. */
  task: string;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
  /** What to look at for each of a, d and e that is still wrong. */
  hints: string[];
  /** The names of the three sliders a, d and e. */
  sliderLabels: string[];
  /** The texts of the graph, as FunktionsGraph. */
  labels: {
    graph: string;
    tabelle: string;
    reset: string;
    grundform: string;
    x: string;
    y: string;
    undefinedValue: string;
    allgemein?: string;
  };
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer the sliders give now. */
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [{ a: number; d: number; e: number }] }>();

const target = computed(() => generate(props.seed, props));
const regler = computed(() => [
  { key: "a", label: props.sliderLabels[0] ?? "a", min: -3, max: 3, step: 0.5, start: 1 },
  { key: "d", label: props.sliderLabels[1] ?? "d", min: -5, max: 5, step: 1, start: 0 },
  { key: "e", label: props.sliderLabels[2] ?? "e", min: -5, max: 5, step: 1, start: 0 },
]);
const goal = computed(() => [
  { key: "a", value: target.value.a },
  { key: "d", value: target.value.d },
  { key: "e", value: target.value.e },
]);

function change(values: Record<string, number>): void {
  emit("answer", { a: values["a"] ?? 1, d: values["d"] ?? 0, e: values["e"] ?? 0 });
}
</script>

<template>
  <div class="fga" :class="{ 'fga-checked': checked }">
    <p>{{ task }}</p>
    <FunktionsGraph
      family="quadratic"
      :regler="regler"
      :fenster="{ xmin: -7, xmax: 7, ymin: -8, ymax: 8 }"
      :tabelle-x="[-6, -4, -2, 0, 2, 4, 6]"
      :grundform="goal"
      :labels="labels"
      @change="change"
    />
  </div>
</template>
