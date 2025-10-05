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
      v-if="showStageControls"
      v-model="roundId"
      :stages="tournament.stages"
    />
    <template v-for="(stage, index) in tournament.stages">
      <TournamentGroups
        v-if="stage.type === TournamentStageType.GROUPS && stage.id === roundId"
        v-model="(tournament.stages[index] as TournamentGroupsStage)"
      />
      <TournamentPlayoffs
        v-else-if="stage.type === TournamentStageType.PLAYOFFS && stage.id === roundId"
        :model-value="stage"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { allTeamsAssigned } from '~/helpers/stage';

const tournament = defineModel<Tournament>({ required: true });

const roundId = ref(tournament.value.stages[0]?.id);

const activeStage = computed(() => (
  tournament.value.stages.find((stage) => stage.id === roundId.value)
));

watch(() => tournament.value.stages.length, (length) => {
  if (length === 0) {
    roundId.value = undefined;
    return;
  }

  roundId.value = tournament.value.stages[tournament.value.stages.length - 1]?.id;
});

const showStageControls = computed(() => (
  tournament.value.stages.length > 1 || tournament.value.stages[0]?.type === TournamentStageType.PLAYOFFS
));
</script>
