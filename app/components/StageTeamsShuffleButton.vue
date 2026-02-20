<template>
  <AppTooltip label="Embaralhar equipes">
    <AppButton
      class="btn-square btn-accent btn-soft"
      aria-label="Shuffle teams"
      :icon-left="IconArrowsShuffle"
      @click="shuffleTeams"
    />
  </AppTooltip>
</template>

<script lang="ts" setup>
import { IconArrowsShuffle } from '@tabler/icons-vue';

const groups = defineModel<StageTeamsForm['groups']>({ required: true });

function shuffleTeams() {
  const teams = groups.value.flatMap(group => group.teams);

  teams.sort(() => Math.random() - 0.5);

  for (let i = 0; i < groups.value.length; i += 1) {
    groups.value[i]!.teams = teams.splice(0, groups.value[i]!.teams.length);
  }
}
</script>
