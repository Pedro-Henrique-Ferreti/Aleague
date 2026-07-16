<template>
  <div
    :id="popoverId"
    class="dropdown menu p-0.5 rounded-md bg-base-100 shadow-sm dropdown-right"
    popover
    :style="`position-anchor:--team-button-${popoverId}`"
  >
    <div class="flex flex-row">
      <button
        v-for="color in COLOR_OPTIONS"
        :key="color"
        class="flex items-center justify-center size-1.75 cursor-pointer"
        aria-label="Cor da legenda"
        @click.stop="legend === color ? legend = LegendColor.NONE : legend = color"
      >
        <component
          :is="color === legend ? IconCircleDotFilled : IconCircleFilled"
          :style="`fill:${LEGEND_COLOR_VALUES[color]}`"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconCircleDotFilled, IconCircleFilled } from '@tabler/icons-vue';

defineProps<{
  popoverId: string;
}>();

const COLOR_OPTIONS: ReadonlyArray<LegendColor> = [
  LegendColor.GREEN,
  LegendColor.BLUE,
  LegendColor.RED,
  LegendColor.ORANGE,
];

const legend = defineModel<LegendColor>('legend', { required: true });
</script>
