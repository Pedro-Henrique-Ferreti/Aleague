<template>
  <header class="grid gap-1 mb-2 tablet-lg:grid-cols-[2fr_1fr] desktop:grid-cols-2">
    <TournamentProfileCard :tournament="tournament" />
    <div
      v-if="activeStage"
      class="flex justify-end gap-1"
    >
      <TournamentStageModal />
      <TournamentStageModal :stage="activeStage" />
      <EditStageTeams
        v-if="activeStage.type === TournamentStageType.GROUPS && allTeamsAssigned(activeStage)"
        :allow-empty-slots="activeStage.matchweeks.length === 0"
        :stage="activeStage"
      />
      <DeleteStageButton :stage-id="activeStage.id" />
    </div>
  </header>
  <div
    v-if="tournament.stages.length === 0"
    class="max-w-44 min-h-10 mt-4 mx-auto card card-border"
  >
    <div class="card-body text-center">
      <h1 class="text-xl font-semibold mb-0.5">Nenhuma fase</h1>
      <p>Adicione uma fase ao campeonato clicando no botão abaixo.</p>
      <TournamentStageModal class="btn-wide mt-2 mx-auto" />
    </div>
  </div>
  <template v-else>
    <TournamentStageControls
      ref="controlsRef"
      :stages="tournament.stages"
    />
    <template v-for="stage, index in tournament.stages">
      <TournamentGroups
        v-if="stage.type === TournamentStageType.GROUPS && activeStage?.id === stage.id"
        v-model="(tournament.stages[index] as TournamentGroupsStage)"
      />
      <TournamentPlayoffs
        v-else-if="stage.type === TournamentStageType.PLAYOFFS && activeStage?.id === stage.id"
        v-model="(tournament.stages[index] as TournamentPlayoffsStage)"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { allTeamsAssigned } from '~/helpers/stage';
import TournamentStageControls from './TournamentStageControls.vue';

const tournament = defineModel<Tournament>({ required: true });

const controls = useTemplateRef<typeof TournamentStageControls>('controlsRef');

const activeStage = computed(() => tournament.value.stages.find((stage) => (
  stage.id === controls.value?.roundId || (
    stage.type === TournamentStageType.PLAYOFFS && stage.rounds.find((round) => round.id === controls.value?.roundId)
  )
)));
</script>
