<template>
  <div class="flex items-center justify-between mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="$emit('previousStep')"
    />
  </div>
  <DrawProcedureHeader
    :draw-pots="drawPots"
    :active-pot-index="activePotIndex"
  />
</template>

<script lang="ts" setup>
import { IconArrowNarrowLeft } from '@tabler/icons-vue';

defineProps<{
  drawPots: DrawPot[];
}>();

defineEmits<{
  previousStep: [];
}>();

const activePotIndex = ref(0);
</script>
