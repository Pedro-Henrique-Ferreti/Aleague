<template>
  <AppModal>
    <template #trigger="{ open }">
      <div class="tooltip" data-tip="Editar horários">
        <AppButton
          class="btn-sm btn-square"
          :icon-left="IconCalendarWeek"
          @click="open"
        />
      </div>
    </template>
  </AppModal>
</template>

<script lang="ts" setup>
import { IconCalendarWeek } from '@tabler/icons-vue';

defineProps<{
  stageId: TournamentStage['id'];
}>();

const tournamentStore = useTournamentStore();
</script>
