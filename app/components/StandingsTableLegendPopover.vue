<template>
  <div
    :id="popoverId"
    class="dropdown menu p-0.5 rounded-md bg-base-100 shadow-sm dropdown-right"
    popover
    :style="`position-anchor:--team-button-${popoverId}`"
  >
    <div class="flex items-center">
      <LegendColorPicker v-model="legend" />
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
import { IconEditCircle } from '@tabler/icons-vue';

defineProps<{
  popoverId: string;
}>();

const stageStore = useStageStore();

const legend = defineModel<LegendColor>('legend', { required: true });

</script>
