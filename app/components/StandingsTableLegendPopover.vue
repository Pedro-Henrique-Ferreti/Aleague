<template>
  <div
    :id="popoverId"
    class="dropdown menu p-0.5 rounded-md bg-base-100 shadow-sm dropdown-right"
    popover
    :style="`position-anchor:--team-button-${popoverId}`"
  >
    <div class="flex flex-row items-center">
      <BaseButton
        v-for="color in Object.values(LegendColor)"
        :key="color"
        class="legend-button"
        aria-label="Cor da legenda"
        :class="[color === LegendColor.NONE ? 'legend-button--reset' : 'legend-button--color']"
        :style="color !== LegendColor.NONE && `color: ${color}`"
        @click.stop="legend = color"
      >
        <component
          :is="getButtonIcon(color)"
          class="size-1.5"
        />
      </BaseButton>
      <BaseButton
        v-tooltip="'Editar legendas'"
        class="btn btn-sm btn-square btn-ghost ml-0.5"
        aria-label="Editar legendas"
        @click.stop="stageStore.legendsModalIsOpen = true"
      >
        <IconEditCircle />
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconEditCircle, IconSquareRoundedCheckFilled, IconSquareRoundedFilled, IconSquareRoundedX } from '@tabler/icons-vue';

defineProps<{
  popoverId: string;
}>();

const stageStore = useStageStore();

const legend = defineModel<LegendColor>('legend', { required: true });

function getButtonIcon(color: LegendColor) {
  if (color === LegendColor.NONE) return IconSquareRoundedX;

  return color === legend.value ? IconSquareRoundedCheckFilled : IconSquareRoundedFilled;
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
