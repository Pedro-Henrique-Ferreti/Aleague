<template>
  <div class="text-center">
    <div class="text-xl font-semibold mb-0.5">Nenhuma partida disponível</div>
    <template v-if="allowCreateMatchweeks">
      <p>Clique no botão abaixo para gerar as partidas.</p>
      <AppButton
        class="btn-accent btn-wide mt-2"
        label="Gerar partidas"
        :class="$attrs.class"
        :icon-left="IconRefresh"
        @click="createStageMatchweeks(activeTournamentId!, stage.id)"
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
import { allTeamsAssigned } from '~/helpers/stage';

const { createStageMatchweeks, activeTournamentId } = useTournamentStore();

const props = defineProps<{
  stage: TournamentGroupsStage;
}>();

const allowCreateMatchweeks = computed(() => allTeamsAssigned(props.stage));
</script>
