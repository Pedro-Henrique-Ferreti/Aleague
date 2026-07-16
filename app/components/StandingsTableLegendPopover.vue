<template>
  <div
    :id="popoverId"
    class="dropdown menu p-0.5 rounded-md bg-base-100 shadow-sm dropdown-right"
    popover
    :style="`position-anchor:--team-button-${popoverId}`"
  >
    <div class="flex flex-row items-center">
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
      <button
        v-tooltip="'Editar legendas'"
        class="btn btn-sm btn-square btn-ghost ml-0.25"
        aria-label="Editar legendas"
        @click.stop="stageStore.legendsModalIsOpen = true"
      >
        <IconEditCircle />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconCircleDotFilled, IconCircleFilled, IconEditCircle } from '@tabler/icons-vue';

defineProps<{
  popoverId: string;
}>();

const stageStore = useStageStore();

const COLOR_OPTIONS: ReadonlyArray<LegendColor> = [
  LegendColor.GREEN,
  LegendColor.BLUE,
  LegendColor.RED,
  LegendColor.ORANGE,
];

const legend = defineModel<LegendColor>('legend', { required: true });
</script>
