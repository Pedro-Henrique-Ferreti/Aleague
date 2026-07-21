<template>
  <fieldset
    class="flex items-center"
    role="radiogroup"
    aria-label="Cor da legenda"
    @click.stop
  >
    <label
      v-for="[name, color] in Object.entries(LegendColor)"
      :key="color"
      class="legend-button"
      :for="getId(name)"
      :class="[color === LegendColor.NONE ? 'legend-button--reset' : 'legend-button--color']"
      :style="color !== LegendColor.NONE && `color: ${color}`"
    >
      <input
        v-model="legend"
        :id="getId(name)"
        type="radio"
        class="sr-only"
        name="legend-color"
        :value="color"
        :aria-label="LEGEND_COLOR_ARIA_LABELS[color]"
      >
      <component
        :is="getButtonIcon(color)"
        class="size-1.5"
      />
    </label>
  </fieldset>
</template>

<script lang="ts" setup>
import { IconSquareRoundedCheckFilled, IconSquareRoundedFilled, IconSquareRoundedX } from '@tabler/icons-vue';

const id = useId();

const legend = defineModel<LegendColor>();

function getButtonIcon(color: LegendColor) {
  if (color === LegendColor.NONE) return IconSquareRoundedX;

  return color === legend.value ? IconSquareRoundedCheckFilled : IconSquareRoundedFilled;
}

function getId(color: string) {
  return `${id}-${color}`;
}
</script>

<style scoped>
@reference '@/assets/css/main.css';

.legend-button {
  @apply size-1.75 flex justify-center items-center cursor-pointer;

  &.legend-button--color {
    @apply hover:opacity-70 transition-opacity;
  }
  &.legend-button--reset {
    @apply text-gray-400 hover:text-gray-600 transition-colors;
  }
}
</style>
