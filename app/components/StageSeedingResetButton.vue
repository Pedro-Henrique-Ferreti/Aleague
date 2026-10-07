<template>
  <AppTooltip label="Remover equipes">
    <AppButton
      class="btn-square btn-accent btn-soft"
      aria-label="Remove teams"
      :icon-left="IconTrash"
      @click="resetSlots"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import { IconTrash } from '@tabler/icons-vue';

const groups = defineModel<StageSeedingForm['groups']>({ required: true });

function resetSlots() {
  for (const group of groups.value) {
    group.teams = createArray(group.teams.length, null);
  }
}
</script>
