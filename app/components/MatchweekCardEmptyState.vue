<template>
  <div class="text-center">
    <div class="text-xl font-semibold mb-0.5">Nenhuma partida disponível</div>
    <template v-if="stageHasAllTeams">
      <p>Clique no botão abaixo para gerar as partidas.</p>
      <AppButton
        class="btn-accent btn-wide mt-2"
        label="Gerar partidas"
        :class="$attrs.class"
        :icon-left="IconRefresh"
      />
    </template>
    <template v-else>
      <p>Adicione todas as equipes antes de gerar as partidas.</p>
      <EditStageTeams
        class="btn-wide mt-2"
        :stage="stage"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { IconRefresh } from '@tabler/icons-vue';

const props = defineProps<{
  stage: TournamentGroupsStage;
}>();

const stageHasAllTeams = computed(() => (
  props.stage.groups.every((g) => g.standings.every((s) => s.team !== null))
));
</script>
