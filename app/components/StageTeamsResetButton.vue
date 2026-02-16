<template>
  <AppTooltip
    class="tooltip-left"
    label="Remover equipes"
  >
    <AppButton
      class="btn-square btn-accent btn-soft"
      aria-label="Remove teams"
      :icon-left="IconRefresh"
      @click="resetSlots"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import type { StageTeamsForm } from './StageTeamsModal.vue';
import { IconRefresh } from '@tabler/icons-vue';

const groups = defineModel<StageTeamsForm['groups']>({ required: true });

function resetSlots() {
  groups.value.forEach((group, index) => {
    group.teams.forEach((_, slotIndex) => {
      groups.value[index]!.teams[slotIndex] = null;
    });
  });
}
</script>
