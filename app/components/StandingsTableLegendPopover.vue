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
        class="size-1.75 cursor-pointer flex justify-center items-center"
        aria-label="Cor da legenda"
        @click.stop="legend = color"
      >
        <IconSquareRoundedX
          v-if="color === LegendColor.NONE"
          class="text-gray-400 hover:text-gray-600 transition-colors size-1.5"
        />
        <component
          v-else
          :is="color === legend ? IconSquareRoundedCheckFilled : IconSquareRoundedFilled"
          class="size-1.5"
          :style="`color: ${color}`"
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
</script>
