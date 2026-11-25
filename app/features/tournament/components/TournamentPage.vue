<template>
  <TournamentPageHeader />
  <div
    v-if="getTournamentStageList(tournamentStore.activeTournament?.stages).length === 0"
    class="max-w-44 min-h-10 mt-4 mx-auto card card-border"
  >
    <div class="card-body text-center">
      <h1 class="text-xl font-semibold mb-0.5">Nenhuma fase</h1>
      <p>Adicione uma fase ao campeonato clicando no botão abaixo.</p>
      <StageFormModal v-slot="{ openModal }">
        <AppButton
          class="btn-primary btn-soft btn-wide mt-2 mx-auto"
          label="Adicionar"
          :icon-left="IconPlus"
          @click="openModal"
        />
      </StageFormModal>
    </div>
  </div>
  <template v-else>
    <TournamentStageNavigation />
    <TournamentGroupStage
      v-if="stageStore.activeStage && stageStore.activeStage.type === StageType.GROUP"
      v-model="stageStore.activeStage"
      :key="stageStore.activeStage.id"
    />
    <TournamentPlayoffStage
      v-else-if="stageStore.activeStage && stageStore.activeStage.type === StageType.PLAYOFF"
      v-model="stageStore.activeStage"
    />
  </template>
</template>

<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';
import { getTournamentStageList } from '../helpers/tournament';

const tournamentStore = useTournamentStore();
const stageStore = useStageStore();
</script>
