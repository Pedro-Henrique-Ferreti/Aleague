<template>
  <div class="flex items-center justify-between mb-1">
    <AppButton
      class="btn-ghost px-0.5"
      label="Voltar"
      :icon-left="IconArrowNarrowLeft"
      @click="seedingDraw.previousStep"
    />
  </div>
  <DrawProcedureHeader
    :draw-pots="seedingDraw.pots.value"
    :active-pot-index="seedingDraw.activePotIndex.value"
  />
  <DrawProcedureSeedingGroups :groups="seedingDraw.procedureForm.value.groups" />
</template>

<script lang="ts" setup>
import { IconArrowNarrowLeft } from '@tabler/icons-vue';

defineProps<{
  seedingDraw: ReturnType<typeof useSeedingDraw>;
}>();
</script>
